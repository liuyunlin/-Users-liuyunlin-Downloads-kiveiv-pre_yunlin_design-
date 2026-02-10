/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useRef, useState, useEffect } from 'react'
import { useKnowledgeBaseStore } from '../knowledge-base/KnowledgeBaseStore.jsx'

const DocumentStoreContext = createContext(null)

const PROCESS_DURATION = 30_000

export function DocumentStoreProvider({ children }) {
  const { filesByBase, updateKnowledgeBaseFiles } = useKnowledgeBaseStore()
  const [activeBaseId, setActiveBaseId] = useState('')
  const [documentsByBase, setDocumentsByBase] = useState(() => normalizeFilesByBase(filesByBase))
  const [uploadQueueByBase, setUploadQueueByBase] = useState({})
  const [documentContentsByBase, setDocumentContentsByBase] = useState({})
  const [activeProcessByBase, setActiveProcessByBase] = useState({})
  const [progressByBase, setProgressByBase] = useState({})
  const [isProgressVisibleByBase, setIsProgressVisibleByBase] = useState({})
  const pendingSyncRef = useRef(new Map())
  const timersRef = useRef(new Map())

  useEffect(() => {
    setDocumentsByBase((prev) => {
      const next = { ...prev }
      Object.keys(filesByBase || {}).forEach((baseId) => {
        if (!next[baseId]) {
          next[baseId] = normalizeDocuments(filesByBase[baseId] || [])
        }
      })
      Object.keys(next).forEach((baseId) => {
        if (!filesByBase?.[baseId]) {
          delete next[baseId]
        }
      })
      return next
    })
  }, [filesByBase])

  useEffect(() => {
    if (!pendingSyncRef.current.size) return
    pendingSyncRef.current.forEach((docs, baseId) => {
      updateKnowledgeBaseFiles(baseId, docs)
    })
    pendingSyncRef.current.clear()
  }, [documentsByBase, updateKnowledgeBaseFiles])

  const resolveBaseId = (baseId) => baseId || activeBaseId
  const getBaseDocuments = useCallback(
    (baseId) => documentsByBase[resolveBaseId(baseId)] || [],
    [documentsByBase, activeBaseId]
  )
  const getBaseUploadQueue = useCallback(
    (baseId) => uploadQueueByBase[resolveBaseId(baseId)] || [],
    [uploadQueueByBase, activeBaseId]
  )
  const getBaseContents = useCallback(
    (baseId) => documentContentsByBase[resolveBaseId(baseId)] || {},
    [documentContentsByBase, activeBaseId]
  )

  const setDocumentsForBase = useCallback((baseId, updater) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    setDocumentsByBase((prev) => {
      const prevDocs = prev[resolvedId] || []
      const nextDocs = typeof updater === 'function' ? updater(prevDocs) : updater
      const normalized = normalizeDocuments(nextDocs)
      pendingSyncRef.current.set(resolvedId, normalized)
      return { ...prev, [resolvedId]: normalized }
    })
  }, [activeBaseId])

  const setUploadQueueForBase = useCallback((baseId, updater) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    setUploadQueueByBase((prev) => {
      const prevQueue = prev[resolvedId] || []
      const nextQueue = typeof updater === 'function' ? updater(prevQueue) : updater
      return { ...prev, [resolvedId]: nextQueue }
    })
  }, [activeBaseId])

  const setContentsForBase = useCallback((baseId, updater) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    setDocumentContentsByBase((prev) => {
      const prevContent = prev[resolvedId] || {}
      const nextContent = typeof updater === 'function' ? updater(prevContent) : updater
      return { ...prev, [resolvedId]: nextContent }
    })
  }, [activeBaseId])

  const setProgressForBase = useCallback((baseId, value) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    setProgressByBase((prev) => ({ ...prev, [resolvedId]: value }))
  }, [activeBaseId])

  const setActiveProcessForBase = useCallback((baseId, value) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    setActiveProcessByBase((prev) => ({ ...prev, [resolvedId]: value }))
  }, [activeBaseId])

  const setProgressVisibleForBase = useCallback((baseId, value) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    setIsProgressVisibleByBase((prev) => ({ ...prev, [resolvedId]: value }))
  }, [activeBaseId])

  const startProcessing = (docIds, baseId) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId || !docIds.length) return

    setDocumentsForBase(resolvedId, (prev) =>
      prev.map((doc) =>
        docIds.includes(doc.id)
          ? { ...doc, status: '解析中', progress: 0 }
          : doc
      )
    )

    setActiveProcessForBase(resolvedId, { ids: docIds, startedAt: Date.now() })
    setProgressForBase(resolvedId, 0)
    setProgressVisibleForBase(resolvedId, true)

    const existingTimer = timersRef.current.get(resolvedId)
    if (existingTimer?.interval) clearInterval(existingTimer.interval)
    if (existingTimer?.timeout) clearTimeout(existingTimer.timeout)

    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const percent = Math.min(99, Math.round((elapsed / PROCESS_DURATION) * 100))
      setProgressForBase(resolvedId, percent)
      setDocumentsForBase(resolvedId, (prev) =>
        prev.map((doc) =>
          docIds.includes(doc.id) ? { ...doc, progress: percent, status: '解析中' } : doc
        )
      )
    }, 500)

    const timeout = setTimeout(() => {
      clearInterval(interval)
      setProgressForBase(resolvedId, 100)
      setDocumentsForBase(resolvedId, (prev) =>
        prev.map((doc) =>
          docIds.includes(doc.id)
            ? { ...doc, status: '已解析', progress: 100 }
            : doc
        )
      )
      setActiveProcessForBase(resolvedId, null)
    }, PROCESS_DURATION)

    timersRef.current.set(resolvedId, { interval, timeout })
  }

  const cancelProcessing = (baseId) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    const activeProcess = activeProcessByBase[resolvedId]
    if (!activeProcess) return
    const { ids } = activeProcess
    setDocumentsForBase(resolvedId, (prev) => prev.filter((doc) => !ids.includes(doc.id)))
    setActiveProcessForBase(resolvedId, null)
    setProgressForBase(resolvedId, 0)
    setProgressVisibleForBase(resolvedId, false)
    const timers = timersRef.current.get(resolvedId)
    if (timers?.interval) clearInterval(timers.interval)
    if (timers?.timeout) clearTimeout(timers.timeout)
    timersRef.current.delete(resolvedId)
  }

  const updateDocumentStatus = (id, status, baseId) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    setDocumentsForBase(resolvedId, (prev) =>
      prev.map((doc) => (doc.id === id ? { ...doc, status } : doc))
    )
  }

  const removeDocument = (id, baseId) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    setDocumentsForBase(resolvedId, (prev) => prev.filter((doc) => doc.id !== id))
    setContentsForBase(resolvedId, (prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }

  const saveDocumentContent = (docId, content, baseId) => {
    const resolvedId = resolveBaseId(baseId)
    if (!resolvedId) return
    setContentsForBase(resolvedId, (prev) => ({
      ...prev,
      [docId]: {
        ...(prev[docId] || {}),
        ...content,
        updatedAt: Date.now()
      }
    }))
  }

  const ensureParsedContent = useCallback((docId, generator, baseId) => {
    const resolvedId = baseId || activeBaseId
    if (!resolvedId) return
    setContentsForBase(resolvedId, (prev) => {
      if (prev[docId]?.parsedSegments) {
        return prev
      }
      const segments = typeof generator === 'function' ? generator() : []
      return {
        ...prev,
        [docId]: {
          ...(prev[docId] || {}),
          parsedSegments: segments,
          editorJSON: prev[docId]?.editorJSON,
          editorHTML: prev[docId]?.editorHTML,
          updatedAt: prev[docId]?.updatedAt || Date.now()
        }
      }
    })
  }, [activeBaseId, setContentsForBase])

  const getDocumentContent = useCallback(
    (docId, baseId) => {
      const resolvedId = baseId || activeBaseId
      if (!resolvedId) return undefined
      const contents = getBaseContents(resolvedId)
      return contents[docId]
    },
    [activeBaseId, getBaseContents]
  )

  const value = useMemo(
    () => ({
      activeBaseId,
      setActiveBaseId,
      documents: getBaseDocuments(),
      setDocuments: (updater) => setDocumentsForBase(activeBaseId, updater),
      uploadQueue: getBaseUploadQueue(),
      setUploadQueue: (updater) => setUploadQueueForBase(activeBaseId, updater),
      saveDocumentContent,
      ensureParsedContent,
      getDocumentContent,
      activeProcess: activeProcessByBase[activeBaseId] || null,
      setActiveProcess: (value) => setActiveProcessForBase(activeBaseId, value),
      progress: progressByBase[activeBaseId] || 0,
      isProgressVisible: Boolean(isProgressVisibleByBase[activeBaseId]),
      startProcessing,
      cancelProcessing,
      updateDocumentStatus,
      removeDocument,
      setIsProgressVisible: (value) => setProgressVisibleForBase(activeBaseId, value)
    }),
    [
      activeBaseId,
      getBaseDocuments,
      getBaseUploadQueue,
      startProcessing,
      cancelProcessing,
      updateDocumentStatus,
      removeDocument,
      ensureParsedContent,
      getDocumentContent,
      saveDocumentContent,
      setDocumentsForBase,
      setUploadQueueForBase,
      activeProcessByBase,
      progressByBase,
      isProgressVisibleByBase,
      setActiveProcessForBase,
      setProgressVisibleForBase
    ]
  )

  return (
    <DocumentStoreContext.Provider value={value}>
      {children}
    </DocumentStoreContext.Provider>
  )
}

export function useDocumentStore() {
  const context = useContext(DocumentStoreContext)
  if (!context) {
    throw new Error('useDocumentStore 必须在 DocumentStoreProvider 中使用')
  }
  return context
}

function normalizeDocument(doc = {}) {
  const hasProgress = typeof doc.progress === 'number'
  const normalizedProgress = hasProgress ? doc.progress : (doc.status === '已解析' ? 100 : 0)
  const normalizedStatus = doc.status === '解析中' && !hasProgress ? '已解析' : (doc.status || '未解析')
  const finalStatus = normalizedProgress >= 100 ? '已解析' : normalizedStatus
  const updatedTs = typeof doc.updatedAt === 'number' ? doc.updatedAt : Date.parse(String(doc.updatedAt || '').replace(' ', 'T'))
  const uploadTs = typeof doc.uploadedAt === 'number'
    ? doc.uploadedAt
    : (Date.parse(String(doc.uploadedAt || '').replace(' ', 'T')) || updatedTs || Date.now())
  const normalizedUpdatedAt = Number.isFinite(updatedTs)
    ? formatTime(new Date(updatedTs))
    : (doc.updatedAt || formatTime(new Date()))
  const normalizedUploadedAt = Number.isFinite(uploadTs)
    ? formatTime(new Date(uploadTs))
    : formatTime(new Date())
  const normalizedMode = (doc.mode === '通用解析' || doc.mode === '端到端解析') ? 'Pineline' : (doc.mode || 'Pineline')
  return {
    ...doc,
    status: finalStatus,
    progress: normalizedProgress,
    mode: normalizedMode,
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    enabled: typeof doc.enabled === 'boolean' ? doc.enabled : true,
    charCount: typeof doc.charCount === 'number' ? doc.charCount : 0,
    uploadedAt: normalizedUploadedAt,
    updatedAt: normalizedUpdatedAt
  }
}

function normalizeDocuments(docs = []) {
  return docs.map((doc) => normalizeDocument(doc))
}

function normalizeFilesByBase(filesByBase = {}) {
  return Object.entries(filesByBase).reduce((acc, [baseId, files]) => {
    acc[baseId] = normalizeDocuments(files || [])
    return acc
  }, {})
}

function formatTime(date) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
