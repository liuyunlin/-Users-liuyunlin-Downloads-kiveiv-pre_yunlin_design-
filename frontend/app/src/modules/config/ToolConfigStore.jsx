import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { QA_TOOLS } from '../intelligent-qa/data/qaMockData.js'

const ToolConfigContext = createContext(null)

const STORAGE_KEY = 'kiveiv.tools.config'

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

const buildDefaultTools = () => QA_TOOLS.map((tool) => ({ ...tool, config: tool.config || {} }))

const DEFAULT_TOOL_CONFIG = {
  baseUrl: '',
  apiKey: '',
  timeout: '30s',
  remark: ''
}

export function ToolConfigProvider({ children }) {
  const [tools, setTools] = useState(() => safeLoad(STORAGE_KEY, buildDefaultTools()))

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tools))
  }, [tools])

  const toggleTool = (id) => {
    setTools((prev) => prev.map((tool) => (
      tool.id === id ? { ...tool, enabled: !tool.enabled } : tool
    )))
  }

  const addTool = (payload) => {
    if (!payload?.name) return
    const now = new Date()
    const id = payload.id || `tool-${now.getTime()}`
    setTools((prev) => [
      {
        id,
        name: payload.name,
        type: payload.type || 'search',
        enabled: payload.enabled ?? true,
        config: payload.config || { ...DEFAULT_TOOL_CONFIG }
      },
      ...prev
    ])
  }

  const deleteTool = (id) => {
    setTools((prev) => prev.filter((tool) => tool.id !== id))
  }

  const updateToolConfig = (id, config) => {
    setTools((prev) => prev.map((tool) => (
      tool.id === id ? { ...tool, config: { ...DEFAULT_TOOL_CONFIG, ...config } } : tool
    )))
  }

  const resetTools = () => {
    setTools(buildDefaultTools())
  }

  const value = useMemo(
    () => ({
      tools,
      setTools,
      toggleTool,
      addTool,
      deleteTool,
      updateToolConfig,
      resetTools
    }),
    [tools]
  )

  return (
    <ToolConfigContext.Provider value={value}>
      {children}
    </ToolConfigContext.Provider>
  )
}

export function useToolConfigStore() {
  const context = useContext(ToolConfigContext)
  if (!context) {
    throw new Error('useToolConfigStore 必须在 ToolConfigProvider 中使用')
  }
  return context
}
