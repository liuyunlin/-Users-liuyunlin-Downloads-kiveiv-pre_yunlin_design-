import { useEffect, useMemo, useRef, useState } from 'react'
import { buildTaskName, createTaskId, formatDate } from '../utils/indexBuildingUtils.js'

const PROGRESS_INTERVAL = 800
const DEFAULT_DURATION = 26_000
const DURATION_JITTER = 6_000
const STORAGE_KEYS = {
  tasks: 'kiveiv.indexBuilding.tasksByBase',
  activeTask: 'kiveiv.indexBuilding.activeTaskByBase',
  progressTask: 'kiveiv.indexBuilding.progressTaskByBase',
  progressVisible: 'kiveiv.indexBuilding.progressVisibleByBase'
}

const safeLoad = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch (error) {
    return fallback
  }
}

const ensureArray = (value) => (Array.isArray(value) ? value : [])
const STORAGE_VERSION_KEY = 'kiveiv.indexBuilding.tasksVersion'
const STORAGE_VERSION = 'v2'
const buildDuration = () => DEFAULT_DURATION + Math.floor(Math.random() * DURATION_JITTER)

export function useExtractionTasks(baseId) {
  const resolvedBaseId = baseId || 'default'
  const [tasksByBase, setTasksByBase] = useState(() => safeLoad(STORAGE_KEYS.tasks, {}))
  const [activeTaskIdByBase, setActiveTaskIdByBase] = useState(() => safeLoad(STORAGE_KEYS.activeTask, {}))
  const [progressTaskIdByBase, setProgressTaskIdByBase] = useState(() => safeLoad(STORAGE_KEYS.progressTask, {}))
  const [progressVisibleByBase, setProgressVisibleByBase] = useState(() => safeLoad(STORAGE_KEYS.progressVisible, {}))
  const timersRef = useRef(new Map())

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearInterval(timer))
      timersRef.current.clear()
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.tasks, JSON.stringify(tasksByBase))
  }, [tasksByBase])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.activeTask, JSON.stringify(activeTaskIdByBase))
  }, [activeTaskIdByBase])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.progressTask, JSON.stringify(progressTaskIdByBase))
  }, [progressTaskIdByBase])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.progressVisible, JSON.stringify(progressVisibleByBase))
  }, [progressVisibleByBase])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const version = window.localStorage.getItem(STORAGE_VERSION_KEY)
    if (version === STORAGE_VERSION) return
    window.localStorage.removeItem(STORAGE_KEYS.tasks)
    window.localStorage.removeItem(STORAGE_KEYS.activeTask)
    window.localStorage.removeItem(STORAGE_KEYS.progressTask)
    window.localStorage.removeItem(STORAGE_KEYS.progressVisible)
    setTasksByBase({})
    setActiveTaskIdByBase({})
    setProgressTaskIdByBase({})
    setProgressVisibleByBase({})
    window.localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION)
  }, [])

  useEffect(() => {
    setTasksByBase((prev) => {
      if (prev[resolvedBaseId]) return prev
      return { ...prev, [resolvedBaseId]: [] }
    })
  }, [resolvedBaseId])

  const tasks = ensureArray(tasksByBase[resolvedBaseId])
  const activeTaskId = activeTaskIdByBase[resolvedBaseId] || null
  const progressTaskId = progressTaskIdByBase[resolvedBaseId] || null
  const progressVisible = Boolean(progressVisibleByBase[resolvedBaseId])

  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeTaskId) || null,
    [tasks, activeTaskId]
  )

  const progressTask = useMemo(
    () => tasks.find((task) => task.id === progressTaskId) || null,
    [tasks, progressTaskId]
  )

  const updateTasksForBase = (updater, targetBaseId) => {
    const baseKey = targetBaseId || resolvedBaseId
    setTasksByBase((prev) => {
      const currentTasks = ensureArray(prev[baseKey])
      const nextTasks = typeof updater === 'function' ? updater(currentTasks) : updater
      return { ...prev, [baseKey]: nextTasks }
    })
  }

  const updateTask = (taskId, updates, targetBaseId) => {
    updateTasksForBase((prev) => prev.map((task) => (task.id === taskId ? { ...task, ...updates } : task)), targetBaseId)
  }

  const startProgress = (taskId, targetBaseId) => {
    const baseKey = targetBaseId || resolvedBaseId
    const timerKey = `${baseKey}:${taskId}`
    const currentTask = (tasksByBase[baseKey] || []).find((task) => task.id === taskId)
    if (!currentTask || currentTask.status === 'completed' || currentTask.progress >= 100) return
    if (timersRef.current.has(timerKey)) return
    updateTasksForBase((prev) => prev.map((task) => {
      if (task.id !== taskId) return task
      const startedAt = task.startedAt ?? Date.now()
      const durationMs = task.durationMs ?? buildDuration()
      return { ...task, startedAt, durationMs }
    }), baseKey)

    const interval = setInterval(() => {
      updateTasksForBase((prev) => {
        let shouldStop = false
        const nextTasks = prev.map((task) => {
          if (task.id !== taskId) return task
          const startedAt = task.startedAt ?? Date.now()
          const durationMs = task.durationMs ?? buildDuration()
          const elapsed = Date.now() - startedAt
          const nextProgress = Math.min(99, Math.round((elapsed / durationMs) * 100))
          const isDone = elapsed >= durationMs
          if (isDone) shouldStop = true
          return {
            ...task,
            startedAt,
            durationMs,
            progress: isDone ? 100 : Math.max(task.progress || 0, nextProgress),
            status: isDone ? 'completed' : 'running',
            updatedAt: formatDate(new Date())
          }
        })
        if (shouldStop) {
          clearInterval(interval)
          timersRef.current.delete(timerKey)
        }
        return nextTasks
      }, baseKey)
    }, PROGRESS_INTERVAL)
    timersRef.current.set(timerKey, interval)
  }

  const openProgress = (taskId, targetBaseId) => {
    const baseKey = targetBaseId || resolvedBaseId
    setProgressTaskIdByBase((prev) => ({ ...prev, [baseKey]: taskId }))
    setProgressVisibleByBase((prev) => ({ ...prev, [baseKey]: true }))
    const task = (tasksByBase[baseKey] || []).find((item) => item.id === taskId)
    if (task && task.status === 'running' && task.progress < 100) {
      startProgress(taskId, baseKey)
    }
  }

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.status !== 'running' || task.progress >= 100) return
      const startedAt = task.startedAt ?? Date.now()
      const durationMs = task.durationMs ?? buildDuration()
      if (!task.startedAt || !task.durationMs) {
        updateTask(task.id, { startedAt, durationMs }, resolvedBaseId)
      }
      const elapsed = Date.now() - startedAt
      if (elapsed >= durationMs) {
        updateTask(task.id, {
          startedAt,
          durationMs,
          progress: 100,
          status: 'completed',
          updatedAt: formatDate(new Date())
        }, resolvedBaseId)
        return
      }
      startProgress(task.id, resolvedBaseId)
    })
  }, [tasks, resolvedBaseId])

  const createTask = (
    { type, source, tags, model, fields, docName, method, selection, reference, name, basedOn },
    targetBaseId,
    options = {}
  ) => {
    const baseKey = targetBaseId || resolvedBaseId
    const now = new Date()
    let nextTask = null

    updateTasksForBase((prev) => {
      if (basedOn) {
        const target = prev.find((task) => task.id === basedOn)
        if (!target) {
          const fallbackTask = {
            id: createTaskId(),
            name: name || buildTaskName(type, tags, source),
            type,
            source,
            tags,
            model,
            method,
            selection,
            reference,
            basedOn,
            status: 'running',
            progress: 0,
            startedAt: now.getTime(),
            durationMs: buildDuration(),
            createdAt: formatDate(now),
            updatedAt: formatDate(now),
            docName: docName || (source === 'excel' ? 'Excel 导入' : '切片抽取'),
            chunkCount: source === 'excel' ? 0 : 24,
            resultCount: 0,
            fields: fields || []
          }
          nextTask = fallbackTask
          return [fallbackTask, ...prev]
        }

        const updatedTask = {
          ...target,
          name: name || target.name,
          type,
          source,
          tags,
          model,
          method,
          selection,
          reference,
          basedOn,
          status: 'running',
          progress: 0,
          startedAt: now.getTime(),
          durationMs: buildDuration(),
          updatedAt: formatDate(now),
          docName: docName || target.docName,
          chunkCount: source === 'excel' ? 0 : target.chunkCount || 24,
          resultCount: 0,
          fields: fields || target.fields || []
        }
          nextTask = updatedTask
        return prev.map((task) => (task.id === basedOn ? updatedTask : task))
      }

      const newTask = {
        id: createTaskId(),
        name: name || buildTaskName(type, tags, source),
        type,
        source,
        tags,
        model,
        method,
        selection,
        reference,
        basedOn: null,
        status: source === 'excel' ? 'completed' : 'running',
        progress: source === 'excel' ? 100 : 0,
        ...(source === 'excel' ? {} : { startedAt: now.getTime(), durationMs: buildDuration() }),
        createdAt: formatDate(now),
        updatedAt: formatDate(now),
        docName: docName || (source === 'excel' ? 'Excel 导入' : '切片抽取'),
        chunkCount: source === 'excel' ? 0 : 24,
        resultCount: source === 'excel' ? 42 : 0,
        fields: fields || []
      }

      nextTask = newTask
      return [newTask, ...prev]
    }, baseKey)

    if (!nextTask) return null
    setActiveTaskIdByBase((prev) => ({ ...prev, [baseKey]: nextTask.id }))

    if (nextTask.status === 'running') {
      startProgress(nextTask.id, baseKey)
      if (!options.silent) {
        openProgress(nextTask.id, baseKey)
      }
    }

    return nextTask
  }

  return {
    tasks,
    setTasks: (updater, targetBaseId) => updateTasksForBase(updater, targetBaseId),
    activeTask,
    activeTaskId,
    setActiveTaskId: (taskId, targetBaseId) => {
      const baseKey = targetBaseId || resolvedBaseId
      setActiveTaskIdByBase((prev) => ({ ...prev, [baseKey]: taskId }))
    },
    progressTask,
    progressVisible,
    setProgressVisible: (value, targetBaseId) => {
      const baseKey = targetBaseId || resolvedBaseId
      setProgressVisibleByBase((prev) => ({ ...prev, [baseKey]: value }))
    },
    openProgress,
    createTask,
    updateTask
  }
}
