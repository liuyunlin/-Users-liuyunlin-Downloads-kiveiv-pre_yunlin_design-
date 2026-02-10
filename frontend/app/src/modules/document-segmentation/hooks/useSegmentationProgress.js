import { useEffect, useRef, useState } from 'react'
import { SEGMENTATION_DURATION, PROGRESS_INTERVAL } from '../data/segmentationConstants.js'
import { formatDate } from '../utils/segmentationUtils.js'

export function useSegmentationProgress({
  documents,
  setDocuments,
  chunksByDoc,
  segProgressState,
  segProgressVisibleState,
  segActiveDocsState,
  segRunState
}) {
  const [internalSegProgress, setInternalSegProgress] = useState(0)
  const [internalSegProgressVisible, setInternalSegProgressVisible] = useState(false)
  const [internalSegActiveDocs, setInternalSegActiveDocs] = useState([])
  const [internalSegRun, setInternalSegRun] = useState(null)
  const segProgress = segProgressState?.[0] ?? internalSegProgress
  const setSegProgress = segProgressState?.[1] ?? setInternalSegProgress
  const segProgressVisible = segProgressVisibleState?.[0] ?? internalSegProgressVisible
  const setSegProgressVisible = segProgressVisibleState?.[1] ?? setInternalSegProgressVisible
  const segActiveDocs = segActiveDocsState?.[0] ?? internalSegActiveDocs
  const setSegActiveDocs = segActiveDocsState?.[1] ?? setInternalSegActiveDocs
  const segRun = segRunState?.[0] ?? internalSegRun
  const setSegRun = segRunState?.[1] ?? setInternalSegRun
  const segTimerRef = useRef(new Map())

  useEffect(() => {
    return () => {
      segTimerRef.current.forEach((timer) => {
        if (timer?.interval) clearInterval(timer.interval)
        if (timer?.timeout) clearTimeout(timer.timeout)
      })
      segTimerRef.current.clear()
    }
  }, [])

  const buildActiveDocs = (docIds) =>
    docIds
      .map((id) => documents.find((doc) => doc.id === id))
      .filter(Boolean)
      .map((doc) => ({ id: doc.id, name: doc.name }))

  const finalizeSegmentation = (docIds, timerKey, targetBaseId) => {
    const baseKey = targetBaseId || timerKey || 'default'
    setSegProgress(100, baseKey)
    setDocuments((prev) =>
      prev.map((doc) =>
        docIds.includes(doc.id)
          ? {
              ...doc,
              status: 'processed',
              updatedAt: formatDate(new Date()),
              totalChunks: doc.totalChunks || (chunksByDoc[doc.id] || []).length
            }
          : doc
      ),
    baseKey)
    setSegRun(null, baseKey)
    const timer = segTimerRef.current.get(timerKey)
    if (timer?.interval) clearInterval(timer.interval)
    if (timer?.timeout) clearTimeout(timer.timeout)
    segTimerRef.current.delete(timerKey)
  }

  const scheduleSegmentation = (run, targetBaseId) => {
    if (!run?.docIds?.length) return
    const timerKey = run.timerKey || targetBaseId || 'default'
    const baseKey = run.baseId || targetBaseId || timerKey
    const currentTimer = segTimerRef.current.get(timerKey)
    if (currentTimer?.interval) clearInterval(currentTimer.interval)
    if (currentTimer?.timeout) clearTimeout(currentTimer.timeout)

    const startedAt = run.startedAt || Date.now()
    const duration = run.duration || SEGMENTATION_DURATION
    const elapsed = Date.now() - startedAt
    const remaining = Math.max(0, duration - elapsed)

    const updateProgress = () => {
      const nextElapsed = Date.now() - startedAt
      const percent = Math.min(99, Math.round((nextElapsed / duration) * 100))
      setSegProgress(percent, baseKey)
    }

    updateProgress()
    if (remaining <= 0) {
      finalizeSegmentation(run.docIds, timerKey, baseKey)
      return
    }

    const interval = setInterval(updateProgress, PROGRESS_INTERVAL)
    const timeout = setTimeout(() => {
      finalizeSegmentation(run.docIds, timerKey, baseKey)
    }, remaining)

    segTimerRef.current.set(timerKey, { interval, timeout })
  }

  const startSegmentationProgress = (docIds, timerKey = 'default', targetBaseId) => {
    if (!docIds.length) return
    const baseKey = targetBaseId || timerKey || 'default'
    const currentTimer = segTimerRef.current.get(timerKey)
    if (currentTimer?.interval) clearInterval(currentTimer.interval)
    if (currentTimer?.timeout) clearTimeout(currentTimer.timeout)

    setSegProgress(0, baseKey)
    setSegProgressVisible(true, baseKey)
    setSegActiveDocs(buildActiveDocs(docIds), baseKey)

    setDocuments(
      (prev) =>
        prev.map((doc) =>
          docIds.includes(doc.id)
            ? { ...doc, status: 'processing', updatedAt: formatDate(new Date()) }
            : doc
        ),
      baseKey
    )

    const nextRun = {
      docIds,
      startedAt: Date.now(),
      duration: SEGMENTATION_DURATION,
      timerKey,
      baseId: baseKey
    }
    setSegRun(nextRun, baseKey)
    scheduleSegmentation(nextRun, baseKey)
  }

  useEffect(() => {
    if (!segRun?.docIds?.length) return
    const activeItems = buildActiveDocs(segRun.docIds)
    if (activeItems.length) {
      setSegActiveDocs(activeItems)
    }
  }, [documents, segRun, setSegActiveDocs])

  useEffect(() => {
    if (!segRun?.docIds?.length) return
    const timerKey = segRun.timerKey || segRun.baseId || 'default'
    const baseKey = segRun.baseId || timerKey
    const existingTimer = segTimerRef.current.get(timerKey)
    if (existingTimer?.interval || existingTimer?.timeout) return
    const docMap = new Map(documents.map((doc) => [doc.id, doc]))
    const allKnown = segRun.docIds.every((id) => docMap.has(id))
    if (allKnown) {
      const allProcessed = segRun.docIds.every((id) => docMap.get(id)?.status === 'processed')
      if (allProcessed) {
        setSegProgress(100, baseKey)
        setSegRun(null, baseKey)
        return
      }
    }
    setDocuments(
      (prev) =>
        prev.map((doc) =>
          segRun.docIds.includes(doc.id) && doc.status !== 'processed'
            ? { ...doc, status: 'processing', updatedAt: formatDate(new Date()) }
            : doc
        ),
      baseKey
    )
    scheduleSegmentation(segRun, baseKey)
  }, [segRun, documents, setDocuments, setSegProgress, setSegRun])

  return {
    segProgress,
    segProgressVisible,
    setSegProgressVisible,
    segActiveDocs,
    startSegmentationProgress
  }
}
