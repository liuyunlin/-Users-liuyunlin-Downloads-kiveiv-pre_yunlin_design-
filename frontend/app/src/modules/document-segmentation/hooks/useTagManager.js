import { useMemo, useState } from 'react'
import { getNormalTags, getSystemTags, normalizeTagName } from '../utils/segmentationUtils.js'

export function useTagManager({
  initialTagPool,
  initialSystemTagPool,
  tagPoolState,
  systemTagPoolState,
  documents,
  chunksByDoc,
  setChunksByDoc,
  openModal
}) {
  const [internalTagPool, setInternalTagPool] = useState(initialTagPool)
  const [internalSystemTagPool, setInternalSystemTagPool] = useState(initialSystemTagPool)
  const tagPool = tagPoolState?.[0] ?? internalTagPool
  const setTagPool = tagPoolState?.[1] ?? setInternalTagPool
  const systemTagPool = systemTagPoolState?.[0] ?? internalSystemTagPool
  const setSystemTagPool = systemTagPoolState?.[1] ?? setInternalSystemTagPool
  const [activeTagView, setActiveTagView] = useState(null)
  const [tagEditDrafts, setTagEditDrafts] = useState({})
  const [mergeQuery, setMergeQuery] = useState('')
  const [tagModal, setTagModal] = useState(null)
  const [tagForm, setTagForm] = useState({
    name: '',
    newName: '',
    sourceTags: '',
    description: ''
  })

  const allChunks = useMemo(() => {
    const list = []
    documents.forEach((doc) => {
      const chunks = chunksByDoc[doc.id] || []
      chunks.forEach((chunk) => {
        list.push({ ...chunk, docId: doc.id, docName: doc.name })
      })
    })
    return list
  }, [documents, chunksByDoc])

  const tagStats = useMemo(() => {
    const counts = new Map(tagPool.map((tag) => [tag, 0]))
    allChunks.forEach((chunk) => {
      getNormalTags(chunk).forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      })
    })
    return tagPool.map((tag) => ({ tag, count: counts.get(tag) || 0 }))
  }, [tagPool, allChunks])

  const systemTagStats = useMemo(() => {
    const counts = new Map(systemTagPool.map((tag) => [tag.name, 0]))
    allChunks.forEach((chunk) => {
      getSystemTags(chunk).forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      })
    })
    return systemTagPool.map((tag) => ({ ...tag, usage: counts.get(tag.name) || 0 }))
  }, [systemTagPool, allChunks])

  const tagViewChunks = useMemo(() => {
    if (!activeTagView) return []
    return allChunks.filter((chunk) => {
      if (activeTagView.type === 'system') {
        return getSystemTags(chunk).includes(activeTagView.name)
      }
      return getNormalTags(chunk).includes(activeTagView.name)
    })
  }, [activeTagView, allChunks])

  const updateTagDraft = (chunkId, type, value) => {
    setTagEditDrafts((prev) => ({
      ...prev,
      [chunkId]: {
        ...(prev[chunkId] || {}),
        [type]: value
      }
    }))
  }

  const getTagDraft = (chunkId, type) => tagEditDrafts[chunkId]?.[type] || ''

  const openTagView = (name, type = 'normal') => {
    setActiveTagView({ name, type })
  }

  const closeTagView = () => {
    setActiveTagView(null)
  }

  const updateTagForm = (updates) => {
    setTagForm((prev) => ({ ...prev, ...updates }))
  }

  const openTagModal = (type, preset = {}) => {
    setTagForm({
      name: '',
      newName: '',
      sourceTags: '',
      description: '',
      ...preset
    })
    setMergeQuery('')
    setTagModal({ type })
  }

  const closeTagModal = () => {
    setTagModal(null)
  }

  const executeTagAction = (actionType, formInput = {}) => {
    const name = normalizeTagName(formInput.name || '')
    const newName = normalizeTagName(formInput.newName || '')
    const description = (formInput.description || '').trim()
    const sourceTags = (formInput.sourceTags || '')
      .split(',')
      .map((item) => normalizeTagName(item))
      .filter(Boolean)

    const requireField = (condition, message) => {
      if (condition) return true
      openModal('信息不完整', message)
      return false
    }

    if (['create', 'rename', 'delete', 'convert', 'system-create', 'system-rename', 'system-delete'].includes(actionType)) {
      if (!requireField(name, '请填写标签名称。')) return
    }
    if (['rename', 'system-rename'].includes(actionType)) {
      if (!requireField(newName, '请填写新的标签名称。')) return
    }
    if (actionType === 'merge') {
      if (!requireField(sourceTags.length, '请填写至少一个源标签。')) return
      if (!requireField(newName, '请填写合并后的标签名称。')) return
    }

    if (actionType === 'create') {
      setTagPool((prev) => (prev.includes(name) ? prev : [...prev, name]))
      openModal('创建完成', `已新增标签「${name}」。`)
    }

    if (actionType === 'rename') {
      setTagPool((prev) => prev.map((tag) => (tag === name ? newName : tag)))
      setChunksByDoc((prev) => {
        const next = {}
        Object.entries(prev).forEach(([docId, chunks]) => {
          next[docId] = chunks.map((chunk) => {
            const nextTags = (chunk.contentTags || []).map((tag) => (tag === name ? newName : tag))
            const nextUserTag = chunk.userTag === name ? newName : chunk.userTag
            return {
              ...chunk,
              contentTags: Array.from(new Set(nextTags)),
              userTag: nextUserTag
            }
          })
        })
        return next
      })
      openModal('重命名完成', `标签已更新为「${newName}」。`)
    }

    if (actionType === 'delete') {
      setTagPool((prev) => prev.filter((tag) => tag !== name))
      setChunksByDoc((prev) => {
        const next = {}
        Object.entries(prev).forEach(([docId, chunks]) => {
          next[docId] = chunks.map((chunk) => ({
            ...chunk,
            contentTags: (chunk.contentTags || []).filter((tag) => tag !== name),
            userTag: chunk.userTag === name ? '' : chunk.userTag
          }))
        })
        return next
      })
      openModal('删除完成', `已删除标签「${name}」。`)
    }

    if (actionType === 'merge') {
      const target = newName
      setTagPool((prev) => {
        const next = prev.filter((tag) => !sourceTags.includes(tag))
        if (!next.includes(target)) next.push(target)
        return next
      })
      setChunksByDoc((prev) => {
        const next = {}
        Object.entries(prev).forEach(([docId, chunks]) => {
          next[docId] = chunks.map((chunk) => {
            const nextTags = (chunk.contentTags || []).map((tag) => (sourceTags.includes(tag) ? target : tag))
            const nextUserTag = sourceTags.includes(chunk.userTag) ? target : chunk.userTag
            return {
              ...chunk,
              contentTags: Array.from(new Set(nextTags)),
              userTag: nextUserTag
            }
          })
        })
        return next
      })
      openModal('合并完成', `已合并为标签「${target}」。`)
    }

    if (actionType === 'convert') {
      setTagPool((prev) => prev.filter((tag) => tag !== name))
      setSystemTagPool((prev) => {
        if (prev.some((tag) => tag.name === name)) return prev
        return [...prev, { name, description: description || '系统标签' }]
      })
      setChunksByDoc((prev) => {
        const next = {}
        Object.entries(prev).forEach(([docId, chunks]) => {
          next[docId] = chunks.map((chunk) => {
            const nextTags = (chunk.contentTags || []).filter((tag) => tag !== name)
            const nextSystemTags = new Set(chunk.systemTags || [])
            nextSystemTags.add(name)
            return {
              ...chunk,
              contentTags: nextTags,
              userTag: chunk.userTag === name ? '' : chunk.userTag,
              systemTags: Array.from(nextSystemTags)
            }
          })
        })
        return next
      })
      openModal('转换完成', `标签「${name}」已转换为系统标签。`)
    }

    if (actionType === 'system-create') {
      setSystemTagPool((prev) => {
        if (prev.some((tag) => tag.name === name)) return prev
        return [...prev, { name, description: description || '系统标签' }]
      })
      openModal('新增完成', `已新增系统标签「${name}」。`)
    }

    if (actionType === 'system-rename') {
      setSystemTagPool((prev) =>
        prev.map((tag) => (tag.name === name ? { ...tag, name: newName } : tag))
      )
      setChunksByDoc((prev) => {
        const next = {}
        Object.entries(prev).forEach(([docId, chunks]) => {
          next[docId] = chunks.map((chunk) => ({
            ...chunk,
            systemTags: (chunk.systemTags || []).map((tag) => (tag === name ? newName : tag))
          }))
        })
        return next
      })
      openModal('改名完成', `系统标签已更新为「${newName}」。`)
    }

    if (actionType === 'system-delete') {
      setSystemTagPool((prev) => prev.filter((tag) => tag.name !== name))
      setChunksByDoc((prev) => {
        const next = {}
        Object.entries(prev).forEach(([docId, chunks]) => {
          next[docId] = chunks.map((chunk) => ({
            ...chunk,
            systemTags: (chunk.systemTags || []).filter((tag) => tag !== name)
          }))
        })
        return next
      })
      openModal('删除完成', `已删除系统标签「${name}」。`)
    }
    return true
  }

  const handleSubmitTagModal = () => {
    if (!tagModal) return
    const handled = executeTagAction(tagModal.type, tagForm)
    if (!handled) return

    setTagModal(null)
    setTagForm({ name: '', newName: '', sourceTags: '', description: '' })
  }

  const handleAddChunkTag = (docId, chunkId, tag, type) => {
    const cleanTag = normalizeTagName(tag)
    if (!cleanTag) return
    setChunksByDoc((prev) => {
      const next = { ...prev }
      next[docId] = (next[docId] || []).map((chunk) => {
        if (chunk.id !== chunkId) return chunk
        if (type === 'system') {
          const systemTags = new Set(chunk.systemTags || [])
          systemTags.add(cleanTag)
          return { ...chunk, systemTags: Array.from(systemTags) }
        }
        const contentTags = new Set(chunk.contentTags || [])
        contentTags.add(cleanTag)
        return { ...chunk, contentTags: Array.from(contentTags) }
      })
      return next
    })
  }

  const handleRemoveChunkTag = (docId, chunkId, tag, type) => {
    const cleanTag = normalizeTagName(tag)
    if (!cleanTag) return
    setChunksByDoc((prev) => {
      const next = { ...prev }
      next[docId] = (next[docId] || []).map((chunk) => {
        if (chunk.id !== chunkId) return chunk
        if (type === 'system') {
          return {
            ...chunk,
            systemTags: (chunk.systemTags || []).filter((item) => item !== cleanTag)
          }
        }
        return {
          ...chunk,
          contentTags: (chunk.contentTags || []).filter((item) => item !== cleanTag),
          userTag: chunk.userTag === cleanTag ? '' : chunk.userTag
        }
      })
      return next
    })
  }

  return {
    tagPool,
    systemTagPool,
    activeTagView,
    tagStats,
    systemTagStats,
    tagViewChunks,
    tagModal,
    tagForm,
    mergeQuery,
    setMergeQuery,
    updateTagForm,
    updateTagDraft,
    getTagDraft,
    openTagView,
    closeTagView,
    openTagModal,
    closeTagModal,
    handleSubmitTagModal,
    executeTagAction,
    handleAddChunkTag,
    handleRemoveChunkTag
  }
}
