import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { KNOWLEDGE_BASES, KNOWLEDGE_BASE_FILES } from './data/knowledgeBaseMockData.js'

const KnowledgeBaseContext = createContext(null)

const STORAGE_KEYS = {
  bases: 'kiveiv.kb.list',
  files: 'kiveiv.kb.files',
  active: 'kiveiv.kb.active'
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

export function KnowledgeBaseProvider({ children }) {
  const [knowledgeBases, setKnowledgeBases] = useState(() => safeLoad(STORAGE_KEYS.bases, KNOWLEDGE_BASES))
  const [filesByBase, setFilesByBase] = useState(() => safeLoad(STORAGE_KEYS.files, KNOWLEDGE_BASE_FILES))
  const [activeKnowledgeBaseId, setActiveKnowledgeBaseId] = useState(() => safeLoad(STORAGE_KEYS.active, ''))

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.bases, JSON.stringify(knowledgeBases))
  }, [knowledgeBases])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.files, JSON.stringify(filesByBase))
  }, [filesByBase])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.active, JSON.stringify(activeKnowledgeBaseId))
  }, [activeKnowledgeBaseId])

  const createKnowledgeBase = (payload = {}) => {
    const now = new Date()
    const id = `KB-${now.getTime()}`
    const {
      name,
      description,
      visibility = '私有',
      owner = 'kiveiv',
      type = 'general',
      pinned = false,
      coverPreset = 'sky',
      defaultSchemeId = 'SCH-DEFAULT',
      llmModel = 'gpt-4.1-mini',
      embeddingModel = 'text-embedding-3-small',
      parseMethod = 'chunk',
      chunkRule = 'paragraph',
      chunkPreset = 'default',
      modelParagraphDetection = true,
      maxParagraphDepth = 3,
      maxChunkSize = 1200,
      splitLength = 800,
      indexSize = 64,
      qaMinScore = 0.7,
      qaMaxPairs = 30,
      qaExtractTables = true,
      layoutMode = 'vertical',
      vectorModel: vectorModelInput,
      indexMode = 'hybrid',
      defaultTopK = 5
    } = payload
    const vectorModel = vectorModelInput || ''
    const newBase = {
      id,
      name: name || `知识库-${knowledgeBases.length + 1}`,
      description: description || '这个知识库还没有介绍~',
      owner,
      visibility,
      pinned: Boolean(pinned),
      coverPreset,
      defaultSchemeId,
      schemeSelectionByFileType: {
        pdf: defaultSchemeId,
        docx: defaultSchemeId,
        ppt: defaultSchemeId,
        md: defaultSchemeId,
        excel: defaultSchemeId,
        image: defaultSchemeId
      },
      llmModel,
      embeddingModel,
      parseMethod,
      chunkRule,
      chunkPreset,
      modelParagraphDetection: Boolean(modelParagraphDetection),
      maxParagraphDepth: Number(maxParagraphDepth) || 3,
      maxChunkSize: Number(maxChunkSize) || 1200,
      splitLength: Number(splitLength) || 800,
      indexSize: Number(indexSize) || 64,
      qaMinScore: Number(qaMinScore) || 0.7,
      qaMaxPairs: Number(qaMaxPairs) || 30,
      qaExtractTables: Boolean(qaExtractTables),
      layoutMode,
      vectorModel,
      vectorModelLocked: false,
      indexMode,
      defaultTopK,
      updatedAt: formatTime(now),
      typeLabel: type === 'vertical' ? '垂类知识库' : '通用知识库'
    }
    setKnowledgeBases((prev) => [newBase, ...prev])
    setFilesByBase((prev) => ({ ...prev, [id]: [] }))
    setActiveKnowledgeBaseId(id)
    return id
  }

  const deleteKnowledgeBases = (ids) => {
    if (!ids?.length) return null
    const deletedBases = knowledgeBases.filter((base) => ids.includes(base.id))
    const deletedFiles = {}
    ids.forEach((id) => {
      deletedFiles[id] = filesByBase[id] || []
    })
    setKnowledgeBases((prev) => prev.filter((base) => !ids.includes(base.id)))
    setFilesByBase((prev) => {
      const next = { ...prev }
      ids.forEach((id) => {
        delete next[id]
      })
      return next
    })
    setActiveKnowledgeBaseId((prev) => (ids.includes(prev) ? '' : prev))
    return { bases: deletedBases, filesByBase: deletedFiles }
  }

  const updateKnowledgeBaseFiles = (baseId, files) => {
    setFilesByBase((prev) => ({ ...prev, [baseId]: files }))
  }

  const updateKnowledgeBase = (baseId, updates) => {
    if (!baseId) return
    setKnowledgeBases((prev) =>
      prev.map((base) =>
        base.id === baseId
          ? {
              ...base,
              ...updates,
              updatedAt: formatTime(new Date())
            }
          : base
      )
    )
  }

  const restoreKnowledgeBases = (snapshot) => {
    if (!snapshot?.bases?.length) return
    setKnowledgeBases((prev) => {
      const existing = new Set(prev.map((base) => base.id))
      const restored = snapshot.bases.filter((base) => !existing.has(base.id))
      return [...restored, ...prev]
    })
    setFilesByBase((prev) => {
      const next = { ...prev }
      Object.entries(snapshot.filesByBase || {}).forEach(([id, files]) => {
        if (!next[id]) next[id] = files
      })
      return next
    })
  }

  const value = useMemo(
    () => ({
      knowledgeBases,
      setKnowledgeBases,
      filesByBase,
      setFilesByBase,
      activeKnowledgeBaseId,
      setActiveKnowledgeBaseId,
      createKnowledgeBase,
      deleteKnowledgeBases,
      restoreKnowledgeBases,
      updateKnowledgeBaseFiles,
      updateKnowledgeBase
    }),
    [knowledgeBases, filesByBase, activeKnowledgeBaseId]
  )

  return (
    <KnowledgeBaseContext.Provider value={value}>
      {children}
    </KnowledgeBaseContext.Provider>
  )
}

export function useKnowledgeBaseStore() {
  const context = useContext(KnowledgeBaseContext)
  if (!context) {
    throw new Error('useKnowledgeBaseStore 必须在 KnowledgeBaseProvider 中使用')
  }
  return context
}

function formatTime(date) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
