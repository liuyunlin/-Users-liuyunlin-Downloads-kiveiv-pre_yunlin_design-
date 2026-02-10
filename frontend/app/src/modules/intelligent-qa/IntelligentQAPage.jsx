import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSettingsStore } from '../settings/SettingsStore.jsx'
import { collectSavedModels } from '../settings/modelUtils.js'
import { QA_MODELS } from './data/qaMockData.js'
import { useQACache } from './hooks/useQACache.js'
import { useKnowledgeBaseStore } from '../knowledge-base/KnowledgeBaseStore.jsx'
import { useToolConfigStore } from '../config/ToolConfigStore.jsx'

const ANSWER_TYPE_LABELS = {
  qa: '答案',
  chitchat: '闲聊',
  clarification: '澄清'
}

export function IntelligentQAPage() {
  const { models } = useSettingsStore()
  const savedModels = useMemo(() => collectSavedModels(models, 'llm-model'), [models])
  const fallbackModels = useMemo(() => QA_MODELS.map((item) => item.name), [])
  const availableModels = savedModels.length ? savedModels : fallbackModels
  const hasSavedModel = savedModels.length > 0

  const {
    sessions,
    setSessions,
    messages,
    setMessages,
    config,
    setConfig,
    layout,
    setLayout,
    activeSessionId,
    setActiveSessionId
  } = useQACache()
  const { knowledgeBases } = useKnowledgeBaseStore()
  const { tools: globalTools } = useToolConfigStore()
  const availableTools = useMemo(() => globalTools.filter((tool) => tool.enabled), [globalTools])

  const [sessionQuery, setSessionQuery] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [streamMap, setStreamMap] = useState({})
  const [feedbackByMessage, setFeedbackByMessage] = useState({})
  const [citationOpenId, setCitationOpenId] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [sessionMenuId, setSessionMenuId] = useState('')
  const [renameTargetId, setRenameTargetId] = useState('')
  const [renameDraft, setRenameDraft] = useState('')
  const [configPanelOpen, setConfigPanelOpen] = useState(false)
  const [applyNotice, setApplyNotice] = useState('')
  const [showJumpToLatest, setShowJumpToLatest] = useState(false)
  const applyNoticeTimer = useRef(null)
  const messageListRef = useRef(null)
  const messageAnchorRef = useRef(null)
  const composerTextareaRef = useRef(null)
  const shouldAutoScrollRef = useRef(true)
  const [draftConfig, setDraftConfig] = useState(() => ({
    selectedModel: config.selectedModel || availableModels[0] || '',
    selectedTools: config.selectedTools || [],
    selectedKnowledgeBaseIds: config.selectedKnowledgeBaseIds || []
  }))
  const streamingTimers = useRef(new Map())

  const activeSession = sessions.find((session) => session.id === activeSessionId) || sessions[0] || null
  const filteredSessions = useMemo(() => {
    const keyword = sessionQuery.trim().toLowerCase()
    const matched = keyword ? sessions.filter((session) => {
      return [session.title, session.lastMessage, session.model]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(keyword))
    }) : sessions
    return [...matched].sort((left, right) => {
      if (Boolean(left.pinned) !== Boolean(right.pinned)) return left.pinned ? -1 : 1
      return toTimestamp(right.updatedAt) - toTimestamp(left.updatedAt)
    })
  }, [sessionQuery, sessions])
  const pinnedSessions = useMemo(
    () => filteredSessions.filter((session) => Boolean(session.pinned)),
    [filteredSessions]
  )
  const regularSessions = useMemo(
    () => filteredSessions.filter((session) => !session.pinned),
    [filteredSessions]
  )

  const sessionMessages = useMemo(() => {
    if (!activeSession) return []
    return messages.filter((message) => message.sessionId === activeSession.id)
  }, [messages, activeSession])
  const isStreaming = useMemo(
    () => sessionMessages.some((message) => message.role === 'assistant' && message.streaming),
    [sessionMessages]
  )
  const canSend = messageInput.trim().length > 0
  const selectedKnowledgeBases = useMemo(
    () => knowledgeBases.filter((base) => (config.selectedKnowledgeBaseIds || []).includes(base.id)),
    [knowledgeBases, config.selectedKnowledgeBaseIds]
  )
  const quickPrompts = useMemo(() => {
    const primaryBase = selectedKnowledgeBases[0]?.name
    if (primaryBase) {
      return [
        `根据「${primaryBase}」总结这份资料重点`,
        `基于「${primaryBase}」给我一版可执行方案`,
        `结合「${primaryBase}」列出风险与注意事项`
      ]
    }
    return ['总结这份文档重点', '帮我写一版需求说明', '比较两个方案优劣']
  }, [selectedKnowledgeBases])
  const draftSelectedKnowledgeBases = useMemo(
    () => knowledgeBases.filter((base) => (draftConfig.selectedKnowledgeBaseIds || []).includes(base.id)),
    [knowledgeBases, draftConfig.selectedKnowledgeBaseIds]
  )
  const boundVectorModelLabel = useMemo(
    () => getVectorModelSummary(draftSelectedKnowledgeBases),
    [draftSelectedKnowledgeBases]
  )

  const syncMessageScrollState = () => {
    const container = messageListRef.current
    if (!container) return
    const threshold = 80
    const distance = container.scrollHeight - container.scrollTop - container.clientHeight
    const isNearBottom = distance <= threshold
    shouldAutoScrollRef.current = isNearBottom
    setShowJumpToLatest(!isNearBottom)
  }

  const scrollToBottom = useCallback((behavior = 'auto') => {
    const container = messageListRef.current
    if (!container) return
    if (messageAnchorRef.current) {
      messageAnchorRef.current.scrollIntoView({ behavior, block: 'end' })
    } else {
      container.scrollTop = container.scrollHeight
    }
    shouldAutoScrollRef.current = true
    setShowJumpToLatest(false)
  }, [])

  useEffect(() => {
    if (!activeSession && sessions.length) {
      setActiveSessionId(sessions[0].id)
    }
  }, [activeSession, sessions, setActiveSessionId])

  useEffect(() => {
    const syncResponsiveLayout = () => {
      if (window.innerWidth < 900) {
        setLayout((prev) => (prev.leftCollapsed ? prev : { ...prev, leftCollapsed: true }))
      }
    }
    syncResponsiveLayout()
    window.addEventListener('resize', syncResponsiveLayout)
    return () => window.removeEventListener('resize', syncResponsiveLayout)
  }, [setLayout])

  useEffect(() => {
    if (!availableModels.length) return
    if (config.selectedModel && availableModels.includes(config.selectedModel)) return
    setConfig((prev) => ({
      ...prev,
      selectedModel: availableModels[0],
      lastSavedAt: formatTime(new Date())
    }))
  }, [availableModels, config.selectedModel, setConfig])

  useEffect(() => {
    if (!knowledgeBases.length) return
    if (config.selectedKnowledgeBaseIds?.length) return
    if (config.selectedKnowledgeBaseId) {
      setConfig((prev) => ({
        ...prev,
        selectedKnowledgeBaseIds: [config.selectedKnowledgeBaseId],
        lastSavedAt: formatTime(new Date())
      }))
    }
  }, [knowledgeBases, config.selectedKnowledgeBaseId, config.selectedKnowledgeBaseIds, setConfig])

  useEffect(() => {
    setDraftConfig({
      selectedModel: config.selectedModel || availableModels[0] || '',
      selectedTools: config.selectedTools || [],
      selectedKnowledgeBaseIds: config.selectedKnowledgeBaseIds || []
    })
  }, [config.selectedModel, config.selectedTools, config.selectedKnowledgeBaseIds, availableModels])

  useEffect(() => {
    if (!knowledgeBases.length) return
    setConfig((prev) => {
      const baseSet = new Set(knowledgeBases.map((base) => base.id))
      const current = prev.selectedKnowledgeBaseIds || []
      const next = current.filter((id) => baseSet.has(id))
      if (next.length === current.length && next.every((id, index) => id === current[index])) {
        return prev
      }
      return { ...prev, selectedKnowledgeBaseIds: next, lastSavedAt: formatTime(new Date()) }
    })
  }, [knowledgeBases, setConfig])

  useEffect(() => {
    setConfig((prev) => {
      const enabledIds = new Set(availableTools.map((tool) => tool.id))
      const nextSelected = (prev.selectedTools || []).filter((id) => enabledIds.has(id))
      if (nextSelected.length === (prev.selectedTools || []).length) {
        return prev
      }
      return { ...prev, selectedTools: nextSelected, lastSavedAt: formatTime(new Date()) }
    })
  }, [availableTools, setConfig])

  useEffect(() => {
    sessionMessages.forEach((message) => {
      if (!message.streaming) return
      if (streamingTimers.current.has(message.id)) return
      streamingTimers.current.set(
        message.id,
        window.setInterval(() => {
          setStreamMap((prev) => {
            const current = prev[message.id] || 0
            const next = Math.min(message.content.length, current + 4)
            if (next >= message.content.length) {
              streamingTimers.current.delete(message.id)
              setMessages((prevMessages) =>
                prevMessages.map((item) =>
                  item.id === message.id ? { ...item, streaming: false } : item
                )
              )
            }
            return { ...prev, [message.id]: next }
          })
        }, 80)
      )
    })

    return () => {
      streamingTimers.current.forEach((timer) => window.clearInterval(timer))
      streamingTimers.current.clear()
    }
  }, [sessionMessages, setMessages])

  useEffect(() => {
    return () => {
      if (applyNoticeTimer.current) {
        window.clearTimeout(applyNoticeTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    const container = messageListRef.current
    if (!container) return
    const shouldSnap =
      shouldAutoScrollRef.current || sessionMessages.length <= 1 || !container.scrollTop
    if (shouldSnap) {
      scrollToBottom()
    }
  }, [scrollToBottom, sessionMessages])

  useEffect(() => {
    scrollToBottom()
  }, [activeSession?.id, scrollToBottom])

  useEffect(() => {
    const textarea = composerTextareaRef.current
    if (!textarea) return
    textarea.style.height = 'auto'
    const nextHeight = Math.min(textarea.scrollHeight, 220)
    textarea.style.height = `${Math.max(48, nextHeight)}px`
  }, [messageInput])

  const handleNewSession = () => {
    const now = new Date()
    const newId = `QA-SESSION-${now.getTime()}`
    const newSession = {
      id: newId,
      title: '新对话',
      updatedAt: formatTime(now),
      pinned: false,
      model: config.selectedModel || availableModels[0] || '',
      sourceTags: buildSessionSourceTags(config),
      lastMessage: '开始新的对话'
    }
    setSessions((prev) => [newSession, ...prev])
    setActiveSessionId(newId)
    setMessageInput('')
  }

  const handleSendMessage = () => {
    if (!messageInput.trim()) return
    if (!activeSession) {
      handleNewSession()
      return
    }

    const now = new Date()
    const userMessage = {
      id: `MSG-${now.getTime()}-U`,
      sessionId: activeSession.id,
      role: 'user',
      content: messageInput.trim()
    }
    const assistantMessage = buildAssistantMessage(activeSession.id, messageInput.trim(), config, globalTools)
    setMessages((prev) => [...prev, userMessage, assistantMessage])
    setSessions((prev) =>
      prev.map((session) => {
        if (session.id !== activeSession.id) return session
        const updatedTitle = session.title === '新对话' ? messageInput.trim().slice(0, 14) : session.title
        return {
          ...session,
          title: updatedTitle,
          lastMessage: assistantMessage.content,
          updatedAt: formatTime(now),
          model: config.selectedModel || session.model,
          sourceTags: buildSessionSourceTags(config)
        }
      })
    )
    setMessageInput('')
  }

  const handleChangeMessageInput = (event) => {
    setMessageInput(event.target.value)
  }

  const handleComposerKeyDown = (event) => {
    if (event.key !== 'Enter') return
    if (event.shiftKey) return
    event.preventDefault()
    handleSendMessage()
  }

  const handleStopGenerating = () => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.sessionId !== activeSession?.id || !message.streaming) return message
        const visibleLength = streamMap[message.id] || 0
        return {
          ...message,
          streaming: false,
          content: message.content.slice(0, visibleLength || message.content.length)
        }
      })
    )
    showNotice('已停止生成')
  }

  const handleRequestDelete = (event, session) => {
    event.stopPropagation()
    setDeleteTarget({ ids: [session.id], count: 1 })
  }

  const handleConfirmDelete = () => {
    if (!deleteTarget) return
    removeSessionsByIds(deleteTarget.ids)
    setDeleteTarget(null)
  }

  const removeSessionsByIds = (sessionIds = []) => {
    if (!sessionIds.length) return
    const idSet = new Set(sessionIds)
    setSessions((prev) => {
      const next = prev.filter((session) => !idSet.has(session.id))
      if (idSet.has(activeSessionId)) {
        setActiveSessionId(next[0]?.id || '')
      }
      return next
    })
    setMessages((prev) => prev.filter((message) => !idSet.has(message.sessionId)))
  }

  const handleCancelDelete = () => {
    setDeleteTarget(null)
  }

  const handleTogglePinSession = (event, sessionId) => {
    event.stopPropagation()
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, pinned: !session.pinned, updatedAt: formatTime(new Date()) }
          : session
      )
    )
  }

  const handleStartRename = (event, session) => {
    event.stopPropagation()
    setRenameTargetId(session.id)
    setRenameDraft(session.title || '')
  }

  const handleApplyRename = () => {
    const title = renameDraft.trim()
    if (!renameTargetId || !title) {
      setRenameTargetId('')
      setRenameDraft('')
      return
    }
    setSessions((prev) =>
      prev.map((session) =>
        session.id === renameTargetId
          ? { ...session, title, updatedAt: formatTime(new Date()) }
          : session
      )
    )
    setRenameTargetId('')
    setRenameDraft('')
  }

  const showNotice = useCallback((text) => {
    if (!text) return
    setApplyNotice(text)
    if (applyNoticeTimer.current) {
      window.clearTimeout(applyNoticeTimer.current)
    }
    applyNoticeTimer.current = window.setTimeout(() => {
      setApplyNotice('')
      applyNoticeTimer.current = null
    }, 2400)
  }, [])

  const handleToggleSessionMenu = (event, sessionId) => {
    event.stopPropagation()
    setSessionMenuId((prev) => (prev === sessionId ? '' : sessionId))
  }

  const handleCopyMessage = async (text) => {
    if (!text) return
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text)
      }
    } catch {
      // ignore clipboard errors in demo mode
    }
  }

  const handleSetFeedback = (messageId, value) => {
    setFeedbackByMessage((prev) => ({
      ...prev,
      [messageId]: prev[messageId] === value ? '' : value
    }))
  }

  const handleRegenerateMessage = (assistantMessageId) => {
    if (!activeSession) return
    const targetIndex = sessionMessages.findIndex((message) => message.id === assistantMessageId)
    if (targetIndex < 0) return
    const userMessage = [...sessionMessages]
      .slice(0, targetIndex)
      .reverse()
      .find((message) => message.role === 'user')
    if (!userMessage) {
      showNotice('未找到可重生成的上一条用户问题')
      return
    }
    const nextAssistant = buildAssistantMessage(activeSession.id, userMessage.content, config, globalTools)
    setMessages((prev) => [...prev, nextAssistant])
    setSessions((prev) =>
      prev.map((session) =>
        session.id === activeSession.id
          ? {
            ...session,
            lastMessage: nextAssistant.content,
            updatedAt: formatTime(new Date())
          }
          : session
      )
    )
  }

  const toggleDraftTool = (toolId) => {
    setDraftConfig((prev) => {
      const current = new Set(prev.selectedTools || [])
      if (current.has(toolId)) current.delete(toolId)
      else current.add(toolId)
      return { ...prev, selectedTools: Array.from(current) }
    })
  }

  const toggleDraftKnowledgeBase = (baseId) => {
    setDraftConfig((prev) => {
      const current = new Set(prev.selectedKnowledgeBaseIds || [])
      if (current.has(baseId)) current.delete(baseId)
      else current.add(baseId)
      return { ...prev, selectedKnowledgeBaseIds: Array.from(current) }
    })
  }

  const handleApplyConfig = () => {
    const normalize = (list = []) => [...list].sort().join('|')
    const hasChanges =
      (draftConfig.selectedModel || '') !== (config.selectedModel || '') ||
      normalize(draftConfig.selectedTools || []) !== normalize(config.selectedTools || []) ||
      normalize(draftConfig.selectedKnowledgeBaseIds || []) !== normalize(config.selectedKnowledgeBaseIds || [])

    setConfig((prev) => ({
      ...prev,
      selectedModel: draftConfig.selectedModel || availableModels[0] || prev.selectedModel,
      selectedTools: draftConfig.selectedTools || [],
      selectedKnowledgeBaseIds: draftConfig.selectedKnowledgeBaseIds || [],
      lastSavedAt: formatTime(new Date())
    }))
    setConfigPanelOpen(false)
    showNotice(hasChanges ? '配置已保存并应用到当前会话' : '当前配置无变更')
  }

  const handleAttachClick = () => {
    showNotice('上传入口即将开放，当前可先通过知识库或直接提问')
  }

  const handleResetDraftConfig = () => {
    setDraftConfig({
      selectedModel: availableModels[0] || '',
      selectedTools: availableTools.map((tool) => tool.id),
      selectedKnowledgeBaseIds: []
    })
  }

  const renderSessionItem = (session) => {
    const isActive = activeSession?.id === session.id
    return (
      <div
        key={session.id}
        onClick={() => {
          setActiveSessionId(session.id)
          setSessionMenuId('')
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setActiveSessionId(session.id)
            setSessionMenuId('')
          }
        }}
        className={`relative w-full rounded-md px-2.5 py-2 text-left transition-colors ${
          isActive
            ? 'bg-[var(--kiveiv-accent-soft)]'
            : 'hover:bg-[var(--kiveiv-surface-muted)]'
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            {renameTargetId === session.id ? (
              <input
                autoFocus
                value={renameDraft}
                onChange={(event) => setRenameDraft(event.target.value)}
                onClick={(event) => event.stopPropagation()}
                onBlur={handleApplyRename}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') handleApplyRename()
                  if (event.key === 'Escape') {
                    setRenameTargetId('')
                    setRenameDraft('')
                  }
                }}
                className="kiveiv-input h-8 w-full text-xs"
              />
            ) : (
              <p className="truncate text-sm font-medium text-[var(--kiveiv-text)]">{session.title}</p>
            )}
          </div>
          <div className="relative flex items-center gap-1">
            {session.pinned && (
              <span className="inline-flex h-6 w-6 items-center justify-center text-[var(--kiveiv-text-subtle)]" aria-label="已置顶">
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 4l6 6-4 1-2 5-2-2-5 2-1 4-2-2 4-10 6-4z" />
                </svg>
              </span>
            )}
            <button
              type="button"
              onClick={(event) => handleToggleSessionMenu(event, session.id)}
              className="inline-flex h-6 w-6 items-center justify-center rounded-md text-[var(--kiveiv-text-subtle)] hover:bg-[var(--kiveiv-surface)] hover:text-[var(--kiveiv-text)]"
              aria-label="会话操作"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <circle cx="6" cy="12" r="1.4" />
                <circle cx="12" cy="12" r="1.4" />
                <circle cx="18" cy="12" r="1.4" />
              </svg>
            </button>
            {sessionMenuId === session.id && (
              <div
                className="absolute right-0 top-7 z-10 min-w-[140px] rounded-lg border border-[var(--kiveiv-border)] bg-white p-1 shadow-[var(--kiveiv-shadow-soft)]"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={(event) => {
                    handleStartRename(event, session)
                    setSessionMenuId('')
                  }}
                  className="flex w-full items-center rounded-md px-3 py-2 text-left text-xs text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)]"
                >
                  重命名
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    handleTogglePinSession(event, session.id)
                    setSessionMenuId('')
                  }}
                  className="flex w-full items-center rounded-md px-3 py-2 text-left text-xs text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)]"
                >
                  {session.pinned ? '取消置顶' : '置顶'}
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    handleRequestDelete(event, session)
                    setSessionMenuId('')
                  }}
                  className="flex w-full items-center rounded-md px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50"
                >
                  删除
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
    <div className="qa-page-shell flex h-full min-h-0 flex-1">
      <div className="qa-floating-panel flex h-full min-h-0 w-full flex-1 overflow-hidden rounded-[22px] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] shadow-[var(--kiveiv-shadow-soft)]">
        <div
          className="qa-layout-root grid h-full min-h-0 w-full overflow-hidden"
          style={{
            gridTemplateColumns: `${layout.leftCollapsed ? '72px' : 'minmax(280px, 25%)'} minmax(0, 1fr)`
          }}
        >
      <aside className={`relative h-full min-h-0 ${layout.leftCollapsed ? '' : 'border-r border-[var(--kiveiv-border)]'} bg-white`}>
        {layout.leftCollapsed ? (
          <div className="relative flex h-full flex-col items-center justify-between pb-5 pt-5">
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleNewSession}
                className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] text-[var(--kiveiv-text-muted)] transition-colors hover:bg-[var(--kiveiv-surface-muted)]"
                title="新建对话"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              onClick={() => setLayout((prev) => ({ ...prev, leftCollapsed: false }))}
              className="inline-flex h-10 w-10 items-center justify-center rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] text-[var(--kiveiv-text-muted)] transition-colors hover:bg-[var(--kiveiv-surface-muted)]"
              title="展开历史"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <rect x="3.5" y="4.5" width="17" height="15" rx="2.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5v14M13 10h4M13 14h4" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex h-full min-h-0 flex-col px-4 pb-5 pt-5">
            <div className="qa-side-header flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--kiveiv-text)]">Chats</h3>
              <button
                type="button"
                onClick={() => setLayout((prev) => ({ ...prev, leftCollapsed: true }))}
                className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] text-[var(--kiveiv-text-muted)] transition-colors hover:bg-[var(--kiveiv-surface-muted)]"
                title="收起历史"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
                </svg>
              </button>
            </div>
            <button
              type="button"
              onClick={handleNewSession}
              className="mt-3 inline-flex h-9 items-center justify-center rounded-[var(--kiveiv-radius-control)] bg-[#17181d] px-3 text-sm font-medium text-white hover:bg-[#0f1014]"
            >
              New chat
            </button>
            <div className="kiveiv-search-wrap mt-3">
              <span className="kiveiv-search-icon">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                type="text"
                value={sessionQuery}
                onChange={(event) => setSessionQuery(event.target.value)}
                placeholder="Search chats"
                className="kiveiv-input kiveiv-input-search h-9 w-full"
              />
            </div>
            <div className="qa-side-scroll mt-4 flex-1 space-y-4 overflow-y-auto pr-1">
              <section className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--kiveiv-text-subtle)]">置顶</p>
                <div className="space-y-2">
                  {pinnedSessions.map((session) => renderSessionItem(session))}
                  {!pinnedSessions.length && (
                    <p className="rounded-[var(--kiveiv-radius-inner)] bg-[var(--kiveiv-surface-muted)] px-3 py-2 text-xs text-[var(--kiveiv-text-subtle)]">
                      暂无置顶会话
                    </p>
                  )}
                </div>
              </section>
              <section className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--kiveiv-text-subtle)]">最近对话</p>
                <div className="space-y-2">
                  {regularSessions.map((session) => renderSessionItem(session))}
                </div>
              </section>
              {!filteredSessions.length && (
                <div className="rounded-[var(--kiveiv-radius-inner)] border border-dashed border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-3 py-6 text-center text-xs text-[var(--kiveiv-text-subtle)]">
                  暂无对话
                </div>
              )}
            </div>
            <div className="qa-side-footer mt-3 border-t border-[var(--kiveiv-border)] pt-3 text-xs text-[var(--kiveiv-text-subtle)]">
              共 {filteredSessions.length} 条对话
            </div>
          </div>
        )}
      </aside>

      <section className="qa-main-column flex h-full min-h-0 flex-col overflow-hidden px-3 pt-0 pb-0 sm:px-6 sm:pt-0 sm:pb-0">
        {applyNotice && (
          <div className="mb-2 rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-3 py-2 text-xs text-[var(--kiveiv-accent)]">
            {applyNotice}
          </div>
        )}

        <div className="qa-chat-shell relative flex min-h-0 flex-1 flex-col">
          <div
            ref={messageListRef}
            onScroll={syncMessageScrollState}
            className="qa-messages flex-1 min-h-0 space-y-6 overflow-y-auto pb-4 pr-1 sm:pr-2"
          >
          {sessionMessages.map((message) => {
            const streamedLength = streamMap[message.id] || 0
            const renderedContent = message.streaming
              ? message.content.slice(0, streamedLength)
              : message.content
            const waitingFirstToken = message.role === 'assistant' && message.streaming && streamedLength === 0
            const isUser = message.role === 'user'
            return (
              <div
                key={message.id}
                className={`qa-message-row group flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="qa-avatar qa-avatar-assistant" aria-hidden="true">
                    AI
                  </div>
                )}
                <div className={`relative max-w-[90%] sm:max-w-[78%] ${isUser ? 'order-1' : ''}`}>
                  <div
                    className={`qa-message-bubble rounded-2xl px-4 py-3 text-sm leading-6 ${
                      isUser
                        ? 'bg-[var(--kiveiv-accent)] text-white shadow-[0_10px_28px_rgba(43,106,232,0.25)]'
                        : 'border border-[var(--kiveiv-border)] bg-[#f4f6fb] text-[var(--kiveiv-text)] shadow-[var(--kiveiv-shadow-soft)]'
                    } ${message.error ? 'border-red-300 bg-red-50 text-red-700' : ''}`}
                  >
                    {!isUser && (
                      <div className="mb-2 flex items-center gap-2 text-[12px] text-[var(--kiveiv-text-subtle)]">
                        <span className="rounded-full bg-white px-2 py-0.5 text-[12px] text-[var(--kiveiv-text-muted)]">
                          {ANSWER_TYPE_LABELS[message.answerType] || '回答'}
                        </span>
                      </div>
                    )}
                    <div className="qa-markdown-body whitespace-pre-wrap break-words text-inherit">
                      {waitingFirstToken ? '正在输入...' : renderedContent}
                      {message.streaming && !waitingFirstToken ? '|' : ''}
                    </div>

                    {message.role === 'assistant' && message.citations?.length > 0 && (
                      <div className="mt-2 inline-flex flex-wrap items-start gap-1">
                        {message.citations.slice(0, 4).map((citation) => (
                          <button
                            key={citation}
                            type="button"
                            onClick={() => setCitationOpenId((prev) => (prev === message.id ? '' : message.id))}
                            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[var(--kiveiv-border)] bg-white px-1 text-[11px] font-semibold leading-none text-[var(--kiveiv-text-muted)] hover:border-[var(--kiveiv-accent)] hover:text-[var(--kiveiv-accent)]"
                            aria-label={`查看引用 ${citation}`}
                          >
                            {citation}
                          </button>
                        ))}
                        {message.citations.length > 4 && (
                          <button
                            type="button"
                            onClick={() => setCitationOpenId((prev) => (prev === message.id ? '' : message.id))}
                            className="inline-flex h-5 min-w-5 items-center justify-center rounded-full border border-[var(--kiveiv-border)] bg-white px-1 text-[11px] font-semibold leading-none text-[var(--kiveiv-text-muted)] hover:border-[var(--kiveiv-accent)] hover:text-[var(--kiveiv-accent)]"
                            aria-label="查看更多引用"
                          >
                            +{message.citations.length - 4}
                          </button>
                        )}
                      </div>
                    )}

                    {message.role === 'assistant' && citationOpenId === message.id && message.sources?.length > 0 && (
                      <div className="mt-3 space-y-2 rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-white p-2.5 text-xs">
                        {message.sources.map((source) => (
                          <div key={`${message.id}-${source.id}`} className="rounded-md bg-[var(--kiveiv-surface-muted)] px-2.5 py-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate text-[var(--kiveiv-text-muted)]">{source.taskName}</span>
                              <span className="text-[var(--kiveiv-text-subtle)]">#{source.id} · {source.score}</span>
                            </div>
                            <p className="mt-1 line-clamp-2 text-[var(--kiveiv-text-note-alt)]">{source.snippet}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {message.role === 'assistant' && (
                    <div className="qa-message-toolbar pointer-events-none absolute -top-3 right-3 flex translate-y-1 items-center gap-1 rounded-full border border-[var(--kiveiv-border)] bg-white/95 px-1.5 py-1 opacity-0 shadow-[var(--kiveiv-shadow-soft)] transition-all duration-150 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => handleCopyMessage(message.content)}
                        className="inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)] hover:text-[var(--kiveiv-accent)]"
                      >
                        复制
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRegenerateMessage(message.id)}
                        className="inline-flex h-7 items-center gap-1 rounded-full px-2 text-xs text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)] hover:text-[var(--kiveiv-accent)]"
                      >
                        重新生成
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetFeedback(message.id, 'up')}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
                          feedbackByMessage[message.id] === 'up'
                            ? 'bg-[var(--kiveiv-accent-soft)] text-[var(--kiveiv-accent)]'
                            : 'text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)] hover:text-[var(--kiveiv-accent)]'
                        }`}
                        aria-label="点赞"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 10V5a3 3 0 10-6 0v5H5.5A1.5 1.5 0 004 11.5v7A1.5 1.5 0 005.5 20h9.94a2 2 0 001.91-1.41l1.87-6.2A1.8 1.8 0 0017.5 10H14z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetFeedback(message.id, 'down')}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
                          feedbackByMessage[message.id] === 'down'
                            ? 'bg-[var(--kiveiv-surface-muted)] text-[var(--kiveiv-text-muted)]'
                            : 'text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)] hover:text-[var(--kiveiv-accent)]'
                        }`}
                        aria-label="点踩"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14v5a3 3 0 106 0v-5h2.5a1.5 1.5 0 001.5-1.5v-7A1.5 1.5 0 0018.5 4H8.56a2 2 0 00-1.91 1.41l-1.87 6.2A1.8 1.8 0 006.5 14H10z" />
                        </svg>
                      </button>
                    </div>
                  )}

                  {message.answerType === 'clarification' && message.options?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.options.map((option) => (
                        <button
                          key={option}
                          type="button"
                          className="rounded-full border border-[var(--kiveiv-border)] px-3 py-1 text-xs text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)]"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {isUser && (
                  <div className="qa-avatar qa-avatar-user order-2" aria-hidden="true">
                    U
                  </div>
                )}
              </div>
            )
          })}
          {isStreaming && (
            <div className="flex items-start gap-3">
              <div className="qa-avatar qa-avatar-assistant" aria-hidden="true">AI</div>
              <div className="rounded-2xl border border-[var(--kiveiv-border)] bg-[#f4f6fb] px-4 py-3 text-sm text-[var(--kiveiv-text-muted)]">
                <span className="qa-typing-indicator">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="ml-2">正在输入...</span>
              </div>
            </div>
          )}
          <div ref={messageAnchorRef} aria-hidden="true" />
          {!sessionMessages.length && (
            <section className="qa-empty-state flex min-h-full items-center justify-center px-4 py-5">
              <div className="w-full max-w-2xl text-center">
                <h4 className="text-2xl font-semibold text-[var(--kiveiv-text)] sm:text-[28px]">今天想聊点什么？</h4>
                <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => setMessageInput(prompt)}
                      className="rounded-full border border-[var(--kiveiv-border)] bg-white px-4 py-2 text-sm text-[var(--kiveiv-text-muted)] hover:border-[var(--kiveiv-accent)] hover:text-[var(--kiveiv-accent)]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}
          </div>
          {showJumpToLatest && (
            <div className="pointer-events-none absolute bottom-24 right-4 z-[3] sm:right-6">
              <button
                type="button"
                onClick={() => scrollToBottom('smooth')}
                className="pointer-events-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--kiveiv-border)] bg-white text-[var(--kiveiv-text-muted)] shadow-[var(--kiveiv-shadow-soft)] hover:border-[var(--kiveiv-accent)] hover:text-[var(--kiveiv-accent)]"
                aria-label="滚动到底部"
                title="滚动到底部"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 10l5 5 5-5" />
                </svg>
              </button>
            </div>
          )}
          <div className="qa-composer pt-0">
            <div className="qa-composer-inner mx-auto w-full max-w-4xl">
              <div className="kiveiv-card flex items-end gap-2.5 p-2.5">
              <button
                type="button"
                onClick={handleAttachClick}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[var(--kiveiv-border)] text-[var(--kiveiv-text-muted)] hover:border-[var(--kiveiv-accent)] hover:text-[var(--kiveiv-accent)]"
                aria-label="上传文件（即将支持）"
                title="上传文件（即将支持）"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.44 11.05l-8.49 8.49a5 5 0 11-7.07-7.07l8.49-8.49a3.5 3.5 0 114.95 4.95l-8.5 8.49a2 2 0 01-2.82-2.82l7.78-7.78" />
                </svg>
              </button>
              <textarea
                ref={composerTextareaRef}
                value={messageInput}
                onChange={handleChangeMessageInput}
                placeholder="输入您的问题... (Shift+Enter 换行)"
                className="qa-composer-textarea kiveiv-input flex-1 resize-none"
                rows={1}
                onKeyDown={handleComposerKeyDown}
              />
              <button
                type="button"
                onClick={() => setConfigPanelOpen(true)}
                className="kiveiv-btn-secondary h-9 px-3 text-sm"
                title="高级设置"
              >
                高级设置
              </button>
              {isStreaming && (
                <button
                  type="button"
                  onClick={handleStopGenerating}
                  className="inline-flex h-9 items-center rounded-[var(--kiveiv-radius-control)] border border-red-300 bg-red-50 px-3 text-sm font-medium text-red-600 hover:bg-red-100"
                >
                  停止生成
                </button>
              )}
              <button
                type="button"
                onClick={handleSendMessage}
                disabled={!canSend}
                className={`kiveiv-btn-primary ${!canSend ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                发送
              </button>
            </div>
            </div>
          </div>
        </div>
      </section>
        </div>
      </div>
    </div>

      {configPanelOpen && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setConfigPanelOpen(false)
            }
          }}
        >
          <section className="qa-config-panel w-full max-w-4xl rounded-[var(--kiveiv-radius-inner)] border border-[var(--kiveiv-border)] bg-white p-4 shadow-[var(--kiveiv-shadow-soft)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-semibold text-[var(--kiveiv-text)]">模型与检索配置</h4>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--kiveiv-text-subtle)]">已保存 {config.lastSavedAt || '未保存'}</span>
                <button
                  type="button"
                  onClick={() => setConfigPanelOpen(false)}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--kiveiv-border)] text-[var(--kiveiv-text-subtle)] hover:bg-[var(--kiveiv-surface-muted)] hover:text-[var(--kiveiv-text)]"
                  aria-label="关闭配置"
                  title="关闭配置"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-3 grid gap-3 lg:grid-cols-2">
              <div className="rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface)] p-3">
                <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm font-medium text-[var(--kiveiv-text)]">智能问答模型</span>
                  <select
                    className="kiveiv-select h-9 w-full sm:min-w-[180px] sm:w-auto"
                    value={draftConfig.selectedModel}
                    onChange={(event) => {
                      const nextModel = event.target.value
                      setDraftConfig((prev) => ({ ...prev, selectedModel: nextModel }))
                    }}
                  >
                    {availableModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
                {!hasSavedModel && (
                  <div className="mt-3 flex items-center justify-between rounded-[var(--kiveiv-radius-control)] border border-dashed border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-3 py-2">
                    <span className="text-xs text-[var(--kiveiv-text-subtle)]">当前未固定问答模型，系统将自动选择可用模型。</span>
                  </div>
                )}
              </div>
              <div className="rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface)] p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-[var(--kiveiv-text)]">向量化模型</span>
                  <span className="kiveiv-pill-tab px-2.5 py-1 text-xs text-[var(--kiveiv-text-muted)]">{boundVectorModelLabel}</span>
                </div>
                <p className="mt-2 text-xs text-[var(--kiveiv-text-subtle)]">与所选知识库向量模型绑定，不可修改。</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="mb-2 rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-3 py-2">
                <p className="text-xs text-[var(--kiveiv-text-muted)]">解耦说明：工具配置与知识库配置独立生效，可分别调整，不互相覆盖。</p>
              </div>
              <h5 className="text-sm font-semibold text-[var(--kiveiv-text)]">工具配置</h5>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {availableTools.map((tool) => {
                  const checked = (draftConfig.selectedTools || []).includes(tool.id)
                  return (
                    <label
                      key={tool.id}
                      className="flex cursor-pointer items-center justify-between rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface)] px-3 py-2 hover:bg-[var(--kiveiv-surface-muted)]"
                    >
                      <span className="text-sm text-[var(--kiveiv-text)]">{tool.name}</span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDraftTool(tool.id)}
                        className="h-4 w-4 rounded border-[var(--kiveiv-border)]"
                      />
                    </label>
                  )
                })}
                {!availableTools.length && (
                  <p className="text-xs text-[var(--kiveiv-text-subtle)]">暂无已启用工具，请先到工具配置中开启。</p>
                )}
              </div>
            </div>

            <div className="mt-4">
              <h5 className="text-sm font-semibold text-[var(--kiveiv-text)]">知识库选择</h5>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {knowledgeBases.map((base) => {
                  const checked = (draftConfig.selectedKnowledgeBaseIds || []).includes(base.id)
                  return (
                    <label
                      key={base.id}
                      className="flex cursor-pointer items-center justify-between rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface)] px-3 py-2 hover:bg-[var(--kiveiv-surface-muted)]"
                    >
                      <span className="truncate text-sm text-[var(--kiveiv-text)]">{base.name}</span>
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleDraftKnowledgeBase(base.id)}
                        className="ml-2 h-4 w-4 rounded border-[var(--kiveiv-border)]"
                      />
                    </label>
                  )
                })}
                {!knowledgeBases.length && (
                  <p className="text-xs text-[var(--kiveiv-text-subtle)]">暂无知识库可选。</p>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={handleResetDraftConfig}
                className="kiveiv-btn-secondary h-9 px-3 text-sm"
              >
                重置
              </button>
              <button
                type="button"
                onClick={handleApplyConfig}
                className="kiveiv-btn-primary h-9 px-4 text-sm"
              >
                保存配置并应用
              </button>
            </div>
          </section>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="px-6 py-6">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    确认删除该对话吗？
                  </h3>
                  <p className="kiveiv-gap-title-body text-sm text-gray-500">
                    删除后无法恢复，对话记录将被移除。
                  </p>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelDelete}
                  className="inline-flex items-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  className="inline-flex items-center rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-500"
                >
                  确定
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function formatTime(date) {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

function buildSessionSourceTags(config) {
  const tags = []
  if (config.selectedKnowledgeBaseIds?.length) tags.push('kb')
  return tags
}

function buildAssistantMessage(sessionId, userText, config, toolList = []) {
  const now = new Date()
  const sources = buildSources(config)
  const citations = sources.map((source) => source.id)
  const toolNameMap = new Map(toolList.map((tool) => [tool.id, tool.name]))
  return {
    id: `MSG-${now.getTime()}-A`,
    sessionId,
    role: 'assistant',
    content: `已根据你的问题“${userText.slice(0, 12)}”生成答案，并引用 ${sources.length || 0} 条来源。`,
    streaming: true,
    answerType: 'qa',
    citations,
    trace: {
      intent: 'user_query',
      strategy: sources.length ? 'hybrid' : 'direct',
      steps: [
        { type: 'intent', label: '意图识别', detail: '基础查询' },
        { type: 'retrieval', label: '知识检索', detail: sources.length ? '已启用' : '未启用' },
        { type: 'compose', label: '答案合成', detail: `引用来源 ${sources.length} 条` }
      ],
      tools: (config.selectedTools || []).map((toolId) => ({ name: toolNameMap.get(toolId) || toolId, status: 'success' }))
    },
    sources
  }
}

function buildSources(config) {
  const sources = []
  const selected = config.selectedKnowledgeBaseIds || []
  selected.forEach((kbId, index) => {
    sources.push({
      id: index + 1,
      type: 'kb',
      taskId: kbId,
      taskName: '知识库检索结果',
      chunkId: `KB-C-${200 + index}`,
      snippet: '已从所选知识库检索到相关条款与字段摘要。',
      score: 0.8
    })
  })
  return sources
}

function toTimestamp(value) {
  if (!value) return 0
  const parsed = Date.parse(String(value).replace(' ', 'T'))
  return Number.isNaN(parsed) ? 0 : parsed
}

function getVectorModelSummary(selectedKnowledgeBases = []) {
  if (!selectedKnowledgeBases.length) return '未绑定'
  const models = selectedKnowledgeBases
    .map((base) => base.embeddingModel || base.vectorModel)
    .filter(Boolean)
  if (!models.length) return '未绑定'
  const unique = [...new Set(models)]
  if (unique.length === 1) return unique[0]
  return `${unique[0]} 等 ${unique.length} 个`
}
