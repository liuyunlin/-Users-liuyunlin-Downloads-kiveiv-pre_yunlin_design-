import { useEffect, useRef, useState } from 'react'
import { VECTORIZATION_DURATION, PROGRESS_INTERVAL } from '../data/segmentationConstants.js'

export function useVectorizationProgress({
  chunksByDoc,
  setChunksByDoc,
  vectorProgressState,
  vectorProgressVisibleState,
  vectorActiveState,
  vectorActiveDocIdState,
  vectorActiveChunksState,
  vectorRunState
}) {
  const [internalVectorProgress, setInternalVectorProgress] = useState(0)
  const [internalVectorProgressVisible, setInternalVectorProgressVisible] = useState(false)
  const [internalVectorActive, setInternalVectorActive] = useState(false)
  const [internalVectorActiveDocId, setInternalVectorActiveDocId] = useState(null)
  const [internalVectorActiveChunks, setInternalVectorActiveChunks] = useState([])
  const [internalVectorRun, setInternalVectorRun] = useState(null)
  const vectorProgress = vectorProgressState?.[0] ?? internalVectorProgress
  const setVectorProgress = vectorProgressState?.[1] ?? setInternalVectorProgress
  const vectorProgressVisible = vectorProgressVisibleState?.[0] ?? internalVectorProgressVisible
  const setVectorProgressVisible = vectorProgressVisibleState?.[1] ?? setInternalVectorProgressVisible
  const vectorActive = vectorActiveState?.[0] ?? internalVectorActive
  const setVectorActive = vectorActiveState?.[1] ?? setInternalVectorActive
  const vectorActiveDocId = vectorActiveDocIdState?.[0] ?? internalVectorActiveDocId
  const setVectorActiveDocId = vectorActiveDocIdState?.[1] ?? setInternalVectorActiveDocId
  const vectorActiveChunks = vectorActiveChunksState?.[0] ?? internalVectorActiveChunks
  const setVectorActiveChunks = vectorActiveChunksState?.[1] ?? setInternalVectorActiveChunks
  const vectorRun = vectorRunState?.[0] ?? internalVectorRun
  const setVectorRun = vectorRunState?.[1] ?? setInternalVectorRun
  const vectorTimerRef = useRef(new Map())

  useEffect(() => {
    return () => {
      vectorTimerRef.current.forEach((timer) => {
        if (timer?.interval) clearInterval(timer.interval)
        if (timer?.timeout) clearTimeout(timer.timeout)
      })
      vectorTimerRef.current.clear()
    }
  }, [])

  const buildActiveChunks = (chunkIds, docId) =>
    (chunksByDoc[docId] || [])
      .filter((chunk) => chunkIds.includes(chunk.id))
      .map((chunk) => ({ id: chunk.id, name: chunk.title || `切片 ${chunk.id}` }))

  const finalizeVectorization = (run, timerKey, targetBaseId) => {
    if (!run?.docId) return
    const baseKey = targetBaseId || timerKey || 'default'
    setVectorProgress(100, baseKey)
    setChunksByDoc((prev) => {
      const next = { ...prev }
      next[run.docId] = (next[run.docId] || []).map((chunk) =>
        run.chunkIds.includes(chunk.id)
          ? { ...chunk, status: 2 }
          : chunk
      )
      return next
    }, baseKey)
    setVectorActive(false, baseKey)
    setVectorRun(null, baseKey)
    const timer = vectorTimerRef.current.get(timerKey)
    if (timer?.interval) clearInterval(timer.interval)
    if (timer?.timeout) clearTimeout(timer.timeout)
    vectorTimerRef.current.delete(timerKey)
  }

  const scheduleVectorization = (run, targetBaseId) => {
    if (!run?.chunkIds?.length || !run.docId) return
    const timerKey = run.timerKey || targetBaseId || 'default'
    const baseKey = run.baseId || targetBaseId || timerKey
    const currentTimer = vectorTimerRef.current.get(timerKey)
    if (currentTimer?.interval) clearInterval(currentTimer.interval)
    if (currentTimer?.timeout) clearTimeout(currentTimer.timeout)

    const startedAt = run.startedAt || Date.now()
    const duration = run.duration || VECTORIZATION_DURATION
    const elapsed = Date.now() - startedAt
    const remaining = Math.max(0, duration - elapsed)

    const updateProgress = () => {
      const nextElapsed = Date.now() - startedAt
      const percent = Math.min(99, Math.round((nextElapsed / duration) * 100))
      setVectorProgress(percent, baseKey)
    }

    updateProgress()
    if (remaining <= 0) {
      finalizeVectorization(run, timerKey, baseKey)
      return
    }

    const interval = setInterval(updateProgress, PROGRESS_INTERVAL)
    const timeout = setTimeout(() => {
      finalizeVectorization(run, timerKey, baseKey)
    }, remaining)

    vectorTimerRef.current.set(timerKey, { interval, timeout })
  }

  const startVectorProgress = (chunkIds, docId, timerKey = 'default', targetBaseId) => {
    if (!chunkIds.length) return
    const baseKey = targetBaseId || timerKey || 'default'
    const currentTimer = vectorTimerRef.current.get(timerKey)
    if (currentTimer?.interval) clearInterval(currentTimer.interval)
    if (currentTimer?.timeout) clearTimeout(currentTimer.timeout)

    setVectorProgress(0, baseKey)
    setVectorProgressVisible(true, baseKey)
    setVectorActive(true, baseKey)
    setVectorActiveDocId(docId, baseKey)
    setVectorActiveChunks(buildActiveChunks(chunkIds, docId), baseKey)

    const nextRun = {
      chunkIds,
      docId,
      startedAt: Date.now(),
      duration: VECTORIZATION_DURATION,
      timerKey,
      baseId: baseKey
    }
    setVectorRun(nextRun, baseKey)
    scheduleVectorization(nextRun, baseKey)
  }

  useEffect(() => {
    if (!vectorRun?.docId || !vectorRun?.chunkIds?.length) return
    const baseKey = vectorRun.baseId || vectorRun.timerKey || 'default'
    setVectorActive(true, baseKey)
    setVectorActiveDocId(vectorRun.docId, baseKey)
    setVectorActiveChunks(buildActiveChunks(vectorRun.chunkIds, vectorRun.docId), baseKey)
  }, [vectorRun, chunksByDoc, setVectorActive, setVectorActiveDocId, setVectorActiveChunks])

  useEffect(() => {
    if (!vectorRun?.docId || !vectorRun?.chunkIds?.length) return
    const timerKey = vectorRun.timerKey || vectorRun.baseId || 'default'
    const baseKey = vectorRun.baseId || timerKey
    const existingTimer = vectorTimerRef.current.get(timerKey)
    if (existingTimer?.interval || existingTimer?.timeout) return
    const chunkList = chunksByDoc[vectorRun.docId] || []
    if (chunkList.length) {
      const allDone = vectorRun.chunkIds.every((id) => chunkList.find((chunk) => chunk.id === id)?.status === 2)
      if (allDone) {
        setVectorProgress(100, baseKey)
        setVectorActive(false, baseKey)
        setVectorRun(null, baseKey)
        return
      }
    }
    scheduleVectorization(vectorRun, baseKey)
  }, [vectorRun, chunksByDoc, setVectorActive, setVectorProgress, setVectorRun])

  return {
    vectorProgress,
    vectorProgressVisible,
    setVectorProgressVisible,
    vectorActive,
    vectorActiveDocId,
    vectorActiveChunks,
    startVectorProgress
  }
}
