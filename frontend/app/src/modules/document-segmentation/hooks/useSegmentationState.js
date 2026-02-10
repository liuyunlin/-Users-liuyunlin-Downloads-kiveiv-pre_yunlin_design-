import { useCallback, useEffect, useMemo, useState } from 'react'
import { INITIAL_CHUNKS_BY_DOC, INITIAL_TAG_STATS, INITIAL_SYSTEM_TAGS } from '../data/segmentationMock.js'
import { buildInitialTagPool, buildInitialSystemTagPool } from '../utils/segmentationUtils.js'

const STORAGE_KEY = 'kiveiv.segmentation.byBase'

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

const deepClone = (value) => JSON.parse(JSON.stringify(value))

const buildDefaultState = () => ({
  documents: [],
  chunksByDoc: {},
  tagPool: deepClone(buildInitialTagPool(INITIAL_TAG_STATS, INITIAL_CHUNKS_BY_DOC)),
  systemTagPool: deepClone(buildInitialSystemTagPool(INITIAL_SYSTEM_TAGS, INITIAL_CHUNKS_BY_DOC)),
  segProgress: 0,
  segProgressVisible: false,
  segActiveDocs: [],
  segRun: null,
  vectorProgress: 0,
  vectorProgressVisible: false,
  vectorActive: false,
  vectorActiveDocId: null,
  vectorActiveChunks: [],
  vectorRun: null
})

const normalizeState = (state) => {
  const defaults = buildDefaultState()
  if (!state) return defaults
  return {
    documents: Array.isArray(state.documents) ? state.documents : defaults.documents,
    chunksByDoc: state.chunksByDoc || defaults.chunksByDoc,
    tagPool: Array.isArray(state.tagPool) ? state.tagPool : defaults.tagPool,
    systemTagPool: Array.isArray(state.systemTagPool) ? state.systemTagPool : defaults.systemTagPool,
    segProgress: typeof state.segProgress === 'number' ? state.segProgress : defaults.segProgress,
    segProgressVisible: state.segProgressVisible ?? defaults.segProgressVisible,
    segActiveDocs: Array.isArray(state.segActiveDocs) ? state.segActiveDocs : defaults.segActiveDocs,
    segRun: state.segRun ?? defaults.segRun,
    vectorProgress: typeof state.vectorProgress === 'number' ? state.vectorProgress : defaults.vectorProgress,
    vectorProgressVisible: state.vectorProgressVisible ?? defaults.vectorProgressVisible,
    vectorActive: state.vectorActive ?? defaults.vectorActive,
    vectorActiveDocId: state.vectorActiveDocId ?? defaults.vectorActiveDocId,
    vectorActiveChunks: Array.isArray(state.vectorActiveChunks) ? state.vectorActiveChunks : defaults.vectorActiveChunks,
    vectorRun: state.vectorRun ?? defaults.vectorRun
  }
}

export function useSegmentationState(baseId) {
  const resolvedBaseId = baseId || 'default'
  const [segmentationByBase, setSegmentationByBase] = useState(() => safeLoad(STORAGE_KEY, {}))

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(segmentationByBase))
  }, [segmentationByBase])

  useEffect(() => {
    setSegmentationByBase((prev) => {
      if (prev[resolvedBaseId]) return prev
      return { ...prev, [resolvedBaseId]: buildDefaultState() }
    })
  }, [resolvedBaseId])

  const currentState = useMemo(
    () => normalizeState(segmentationByBase[resolvedBaseId]),
    [segmentationByBase, resolvedBaseId]
  )

  const updateBaseState = useCallback((targetBaseId, updater) => {
    const baseKey = targetBaseId || resolvedBaseId
    setSegmentationByBase((prev) => {
      const current = normalizeState(prev[baseKey])
      const nextState = typeof updater === 'function' ? updater(current) : updater
      return { ...prev, [baseKey]: nextState }
    })
  }, [resolvedBaseId])

  const setDocuments = useCallback((updater, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({
      ...prev,
      documents: typeof updater === 'function' ? updater(prev.documents) : updater
    }))
  }, [updateBaseState])

  const setChunksByDoc = useCallback((updater, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({
      ...prev,
      chunksByDoc: typeof updater === 'function' ? updater(prev.chunksByDoc) : updater
    }))
  }, [updateBaseState])

  const setTagPool = useCallback((updater, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({
      ...prev,
      tagPool: typeof updater === 'function' ? updater(prev.tagPool) : updater
    }))
  }, [updateBaseState])

  const setSystemTagPool = useCallback((updater, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({
      ...prev,
      systemTagPool: typeof updater === 'function' ? updater(prev.systemTagPool) : updater
    }))
  }, [updateBaseState])

  const setSegProgress = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, segProgress: value }))
  }, [updateBaseState])

  const setSegProgressVisible = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, segProgressVisible: value }))
  }, [updateBaseState])

  const setSegActiveDocs = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, segActiveDocs: value }))
  }, [updateBaseState])

  const setSegRun = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, segRun: value }))
  }, [updateBaseState])

  const setVectorProgress = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, vectorProgress: value }))
  }, [updateBaseState])

  const setVectorProgressVisible = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, vectorProgressVisible: value }))
  }, [updateBaseState])

  const setVectorActive = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, vectorActive: value }))
  }, [updateBaseState])

  const setVectorActiveDocId = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, vectorActiveDocId: value }))
  }, [updateBaseState])

  const setVectorActiveChunks = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, vectorActiveChunks: value }))
  }, [updateBaseState])

  const setVectorRun = useCallback((value, targetBaseId) => {
    updateBaseState(targetBaseId, (prev) => ({ ...prev, vectorRun: value }))
  }, [updateBaseState])

  return {
    baseId: resolvedBaseId,
    documents: currentState.documents,
    chunksByDoc: currentState.chunksByDoc,
    tagPool: currentState.tagPool,
    systemTagPool: currentState.systemTagPool,
    segProgress: currentState.segProgress,
    segProgressVisible: currentState.segProgressVisible,
    segActiveDocs: currentState.segActiveDocs,
    segRun: currentState.segRun,
    vectorProgress: currentState.vectorProgress,
    vectorProgressVisible: currentState.vectorProgressVisible,
    vectorActive: currentState.vectorActive,
    vectorActiveDocId: currentState.vectorActiveDocId,
    vectorActiveChunks: currentState.vectorActiveChunks,
    vectorRun: currentState.vectorRun,
    setDocuments,
    setChunksByDoc,
    setTagPool,
    setSystemTagPool,
    setSegProgress,
    setSegProgressVisible,
    setSegActiveDocs,
    setSegRun,
    setVectorProgress,
    setVectorProgressVisible,
    setVectorActive,
    setVectorActiveDocId,
    setVectorActiveChunks,
    setVectorRun
  }
}
