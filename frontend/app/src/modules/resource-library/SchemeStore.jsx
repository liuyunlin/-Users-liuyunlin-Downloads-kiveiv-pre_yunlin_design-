import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const SchemeContext = createContext(null)

const STORAGE_KEY = 'kiveiv.scheme.library.v1'

const safeLoad = (key, fallback) => {
  if (typeof window === 'undefined') return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return parsed ?? fallback
  } catch (_error) {
    return fallback
  }
}

const deepClone = (value) => JSON.parse(JSON.stringify(value))

const formatDateTime = (value) => {
  const date = value ? new Date(value) : new Date()
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

const buildDefaultSchemes = () => {
  const now = Date.now()
  return [
    {
      id: 'SCH-DEFAULT',
      name: '默认方案（推荐）',
      description: '适用于大多数知识库：PDF + Excel 均衡切分，开箱即用。',
      tags: ['推荐', '均衡'],
      updatedAt: formatDateTime(now),
      pipelines: {
        parsing: {
          preset: 'balanced',
          model: { provider: 'MinerU', baseUrl: '', apiKey: '', remark: '' }
        },
        segmentation: {
          preset: 'balanced',
          byFileType: {
            pdf: {
              strategyId: 'semantic',
              strategyName: '语义边界切分',
              chunkSize: 800,
              overlap: 120,
              minTokens: 200,
              maxTokens: 1200,
              enableClean: true,
              enableMap: true,
              enableTags: true,
              enableValidation: true
            },
            excel: {
              strategyId: 'structured',
              strategyName: '表格结构切分',
              chunkSize: 600,
              overlap: 0,
              minTokens: 120,
              maxTokens: 900,
              enableClean: true,
              enableMap: false,
              enableTags: true,
              enableValidation: true
            }
          }
        },
        index: {
          preset: 'balanced',
          mode: 'hybrid',
          model: { provider: 'OpenAI', name: 'gpt-4o-mini', baseUrl: '', apiKey: '', remark: '' }
        },
        qa: {
          preset: 'balanced',
          model: { provider: 'OpenAI', name: 'gpt-4o-mini', baseUrl: '', apiKey: '', remark: '' }
        }
      },
      tools: [
        {
          id: 'tool-doc-search',
          name: 'DocSearch',
          type: 'retrieval',
          enabled: true,
          config: { baseUrl: '', apiKey: '', timeout: '30s', remark: '' }
        },
        {
          id: 'tool-web-search',
          name: 'WebSearch',
          type: 'search',
          enabled: false,
          config: { baseUrl: '', apiKey: '', timeout: '30s', remark: '' }
        }
      ]
    },
    {
      id: 'SCH-QUALITY',
      name: '高精度方案',
      description: '更严格的切分与验证，适合质量敏感知识库。',
      tags: ['高精度'],
      updatedAt: formatDateTime(now),
      pipelines: {
        parsing: {
          preset: 'quality',
          model: { provider: 'MinerU', baseUrl: '', apiKey: '', remark: '' }
        },
        segmentation: {
          preset: 'quality',
          byFileType: {
            pdf: {
              strategyId: 'semantic',
              strategyName: '语义边界切分',
              chunkSize: 700,
              overlap: 180,
              minTokens: 220,
              maxTokens: 1100,
              enableClean: true,
              enableMap: true,
              enableTags: true,
              enableValidation: true
            },
            excel: {
              strategyId: 'structured',
              strategyName: '表格结构切分',
              chunkSize: 520,
              overlap: 0,
              minTokens: 140,
              maxTokens: 880,
              enableClean: true,
              enableMap: true,
              enableTags: true,
              enableValidation: true
            }
          }
        },
        index: {
          preset: 'quality',
          mode: 'graph',
          model: { provider: 'OpenAI', name: 'gpt-4o', baseUrl: '', apiKey: '', remark: '' }
        },
        qa: {
          preset: 'quality',
          model: { provider: 'OpenAI', name: 'gpt-4o', baseUrl: '', apiKey: '', remark: '' }
        }
      },
      tools: [
        {
          id: 'tool-doc-search',
          name: 'DocSearch',
          type: 'retrieval',
          enabled: true,
          config: { baseUrl: '', apiKey: '', timeout: '45s', remark: '' }
        },
        {
          id: 'tool-web-search',
          name: 'WebSearch',
          type: 'search',
          enabled: true,
          config: { baseUrl: '', apiKey: '', timeout: '45s', remark: '' }
        }
      ]
    }
  ]
}

const normalizeSchemes = (value) => {
  const defaults = buildDefaultSchemes()
  const defaultMap = new Map(defaults.map((item) => [item.id, item]))
  if (!Array.isArray(value) || !value.length) return defaults

  const seen = new Set()
  const normalized = value
    .filter(Boolean)
    .map((scheme) => ({
      ...scheme,
      id: scheme.id || `SCH-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
      name: scheme.name || '未命名方案',
      updatedAt: scheme.updatedAt || formatDateTime()
    }))

  const stable = []
  ;['SCH-DEFAULT', 'SCH-QUALITY'].forEach((id) => {
    const existing = normalized.find((item) => item.id === id)
    if (existing) {
      stable.push(existing)
      seen.add(id)
    } else if (defaultMap.has(id)) {
      stable.push(defaultMap.get(id))
      seen.add(id)
    }
  })

  return [...stable, ...normalized.filter((item) => !seen.has(item.id))]
}

export function SchemeProvider({ children }) {
  const [schemes, setSchemes] = useState(() => normalizeSchemes(safeLoad(STORAGE_KEY, null)))

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(schemes))
  }, [schemes])

  const getScheme = (id) => schemes.find((scheme) => scheme.id === id) || null

  const createScheme = (payload = {}) => {
    const now = Date.now()
    const id = payload.id || `SCH-${now}-${Math.random().toString(16).slice(2, 6)}`
    const next = {
      id,
      name: payload.name || '新方案',
      description: payload.description || '',
      tags: Array.isArray(payload.tags) ? payload.tags : [],
      pipelines: payload.pipelines || deepClone(buildDefaultSchemes()[0].pipelines),
      tools: Array.isArray(payload.tools) ? payload.tools : deepClone(buildDefaultSchemes()[0].tools),
      updatedAt: formatDateTime(now)
    }
    setSchemes((prev) => [next, ...prev])
    return id
  }

  const duplicateScheme = (id) => {
    const source = getScheme(id)
    if (!source) return null
    const now = Date.now()
    const nextId = `SCH-${now}-${Math.random().toString(16).slice(2, 6)}`
    const copied = {
      ...deepClone(source),
      id: nextId,
      name: `${source.name}（副本）`,
      updatedAt: formatDateTime(now)
    }
    setSchemes((prev) => [copied, ...prev])
    return nextId
  }

  const updateScheme = (id, patch) => {
    if (!id || !patch) return
    setSchemes((prev) =>
      prev.map((scheme) =>
        scheme.id === id
          ? {
              ...scheme,
              ...(typeof patch === 'function' ? patch(scheme) : patch),
              updatedAt: formatDateTime()
            }
          : scheme
      )
    )
  }

  const deleteScheme = (id) => {
    if (!id) return
    setSchemes((prev) => prev.filter((scheme) => scheme.id !== id))
  }

  const snapshotScheme = (id) => {
    const source = getScheme(id)
    if (!source) return null
    return { ...deepClone(source), snapshotAt: formatDateTime() }
  }

  const value = useMemo(
    () => ({
      schemes,
      setSchemes,
      getScheme,
      createScheme,
      duplicateScheme,
      updateScheme,
      deleteScheme,
      snapshotScheme
    }),
    [schemes]
  )

  return <SchemeContext.Provider value={value}>{children}</SchemeContext.Provider>
}

export function useSchemeStore() {
  const context = useContext(SchemeContext)
  if (!context) {
    throw new Error('useSchemeStore 必须在 SchemeProvider 中使用')
  }
  return context
}
