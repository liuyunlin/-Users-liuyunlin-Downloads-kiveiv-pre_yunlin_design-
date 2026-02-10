import { useEffect, useMemo, useState } from 'react'
import {
  QA_MESSAGES,
  QA_MODELS,
  QA_SESSIONS,
  QA_TOOLS
} from '../data/qaMockData.js'

const STORAGE_KEYS = {
  sessions: 'kiveiv.qa.sessions',
  messages: 'kiveiv.qa.messages',
  config: 'kiveiv.qa.config',
  activeSession: 'kiveiv.qa.activeSession',
  layout: 'kiveiv.qa.layout'
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

const defaultConfig = () => ({
  selectedModel: QA_MODELS[0]?.name || '',
  selectedTools: QA_TOOLS.filter((tool) => tool.enabled).map((tool) => tool.id),
  selectedKnowledgeBaseIds: [],
  lastSavedAt: ''
})

const defaultLayout = () => ({
  leftCollapsed: false,
  rightCollapsed: false
})

export function useQACache() {
  const [sessions, setSessions] = useState(() => safeLoad(STORAGE_KEYS.sessions, QA_SESSIONS))
  const [messages, setMessages] = useState(() => safeLoad(STORAGE_KEYS.messages, QA_MESSAGES))
  const [config, setConfig] = useState(() => safeLoad(STORAGE_KEYS.config, defaultConfig()))
  const [layout, setLayout] = useState(() => safeLoad(STORAGE_KEYS.layout, defaultLayout()))
  const [activeSessionId, setActiveSessionId] = useState(
    () => safeLoad(STORAGE_KEYS.activeSession, QA_SESSIONS[0]?.id || '')
  )

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.sessions, JSON.stringify(sessions))
  }, [sessions])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.messages, JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(config))
  }, [config])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.layout, JSON.stringify(layout))
  }, [layout])

  useEffect(() => {
    if (typeof window === 'undefined') return
    window.localStorage.setItem(STORAGE_KEYS.activeSession, JSON.stringify(activeSessionId))
  }, [activeSessionId])

  const sessionMap = useMemo(
    () => new Map(sessions.map((item) => [item.id, item])),
    [sessions]
  )

  return {
    sessions,
    setSessions,
    messages,
    setMessages,
    config,
    setConfig,
    layout,
    setLayout,
    activeSessionId,
    setActiveSessionId,
    sessionMap
  }
}
