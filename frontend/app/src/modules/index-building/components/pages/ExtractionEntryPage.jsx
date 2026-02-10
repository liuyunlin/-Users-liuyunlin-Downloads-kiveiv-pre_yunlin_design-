import { useEffect, useMemo, useState } from 'react'
import { EXCEL_FIELDS } from '../../data/indexBuildingMock.js'
import { OverlayDrawer } from '../../../shared/components/OverlayDrawer.jsx'

const METHOD_OPTIONS = [
  { id: 'precise', title: '精确抽取', desc: '使用参考提示词或表头进行精确抽取。' },
  { id: 'fuzzy', title: '模糊抽取', desc: '基于标签自动生成抽取提示词。' }
]

const TYPE_OPTIONS = [
  { id: 'graph', title: '图结构抽取', desc: '抽取三元组并生成图谱结构。' },
  { id: 'structured', title: '结构化抽取', desc: '抽取字段形成结构化表格。' }
]

const getMethodLabel = (value) => METHOD_OPTIONS.find((item) => item.id === value)?.title || '未选择'
const getTypeLabel = (value) => TYPE_OPTIONS.find((item) => item.id === value)?.title || '未选择'

export function ExtractionEntryPage({
  tasks = [],
  segmentedDocuments = [],
  segmentedChunksByDoc = {},
  tagOptions,
  modelName,
  modelOptions = [],
  hasModel,
  onCreateTask,
  onGoResults,
  onNavigateSettings,
  onRequestSegmentation
}) {
  const handleJumpToSegmentation = () => {
    onRequestSegmentation?.()
  }
  const [view, setView] = useState('entry')
  const [entryMode, setEntryMode] = useState('new')
  const [historyTaskId, setHistoryTaskId] = useState('')
  const [historySource, setHistorySource] = useState('chunk')
  const [activeDocId, setActiveDocId] = useState(null)
  const [docFilterMode, setDocFilterMode] = useState(false)
  const [chunkFilterMode, setChunkFilterMode] = useState(false)
  const [docSearch, setDocSearch] = useState('')
  const [docShowSelectedOnly, setDocShowSelectedOnly] = useState(false)
  const [chunkSearch, setChunkSearch] = useState('')
  const [chunkShowSelectedOnly, setChunkShowSelectedOnly] = useState(false)
  const [selectedDocs, setSelectedDocs] = useState(new Set())
  const [selectedChunks, setSelectedChunks] = useState({})

  const [configOpen, setConfigOpen] = useState(false)
  const [configLocked, setConfigLocked] = useState(false)
  const [configStep, setConfigStep] = useState(0)
  const [configMethod, setConfigMethod] = useState('')
  const [configType, setConfigType] = useState('')
  const [configTags, setConfigTags] = useState([])
  const [tagQuery, setTagQuery] = useState('')
  const [promptText, setPromptText] = useState('')
  const [headerText, setHeaderText] = useState('')
  const [referenceFileName, setReferenceFileName] = useState('')
  const [excelFileName, setExcelFileName] = useState('')
  const [excelUploadKey, setExcelUploadKey] = useState(0)
  const [excelHeaderText, setExcelHeaderText] = useState('')
  const [excelHeaderTouched, setExcelHeaderTouched] = useState(false)
  const [selectedModel, setSelectedModel] = useState(modelName)
  const [hitlConfirm, setHitlConfirm] = useState(null)

  const documents = segmentedDocuments
  const completedTasks = useMemo(
    () => tasks.filter((task) => task.status === 'completed'),
    [tasks]
  )
  const historyGraphTasks = useMemo(
    () => completedTasks.filter((task) => task.type === 'graph'),
    [completedTasks]
  )
  const historyStructuredTasks = useMemo(
    () => completedTasks.filter((task) => task.type === 'structured'),
    [completedTasks]
  )
  const historyTask = useMemo(
    () => tasks.find((task) => task.id === historyTaskId) || null,
    [tasks, historyTaskId]
  )
  const historyFieldNames = useMemo(() => {
    if (!historyTask || historyTask.type !== 'structured') return []
    if (historyTask.fields?.length) {
      return historyTask.fields.map((field) => field.name || field)
    }
    if (historyTask.reference?.headerText) {
      return historyTask.reference.headerText.split(',').map((item) => item.trim()).filter(Boolean)
    }
    return []
  }, [historyTask])
  const historyTags = historyTask?.tags || []
  const isHistoryMode = entryMode === 'history'
  const historySourceLabel = historyTask?.type === 'structured' && historySource === 'excel' ? 'Excel 抽取' : '切片抽取'

  useEffect(() => {
    setSelectedModel(modelName)
  }, [modelName])

  useEffect(() => {
    if (entryMode === 'new') {
      setHistoryTaskId('')
      setHistorySource('chunk')
      setExcelHeaderText('')
      setExcelHeaderTouched(false)
    }
  }, [entryMode])

  useEffect(() => {
    if (!historyTask || historyTask.type !== 'structured') return
    if (excelHeaderTouched) return
    setExcelHeaderText(historyFieldNames.join(', '))
  }, [historyTask, historyFieldNames, excelHeaderTouched])
  const activeDoc = useMemo(
    () => documents.find((doc) => doc.id === activeDocId) || null,
    [documents, activeDocId]
  )
  const activeChunks = useMemo(() => {
    if (!activeDocId) return []
    return segmentedChunksByDoc[activeDocId] || []
  }, [activeDocId, segmentedChunksByDoc])

  const filteredDocuments = useMemo(() => {
    const keyword = docSearch.trim().toLowerCase()
    return documents.filter((doc) => {
      if (docShowSelectedOnly && !selectedDocs.has(doc.id)) return false
      if (!keyword) return true
      return (
        doc.name.toLowerCase().includes(keyword) ||
        doc.source.toLowerCase().includes(keyword)
      )
    })
  }, [documents, docSearch, docShowSelectedOnly, selectedDocs])

  const filteredTags = useMemo(() => {
    const keyword = tagQuery.trim().toLowerCase()
    if (!keyword) return tagOptions
    return tagOptions.filter((tag) => tag.toLowerCase().includes(keyword))
  }, [tagOptions, tagQuery])

  const excelHeaderList = useMemo(() => {
    return excelHeaderText
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean)
  }, [excelHeaderText])

  const headerMismatch = useMemo(() => {
    if (!isHistoryMode || !historyFieldNames.length || !excelHeaderList.length) return false
    const missing = historyFieldNames.some((name) => !excelHeaderList.includes(name))
    const extra = excelHeaderList.some((name) => !historyFieldNames.includes(name))
    return missing || extra
  }, [excelHeaderList, historyFieldNames, isHistoryMode])

  const headerDiff = useMemo(() => {
    if (!historyFieldNames.length || !excelHeaderList.length) {
      return { extra: [], missing: [] }
    }
    const extra = excelHeaderList.filter((name) => !historyFieldNames.includes(name))
    const missing = historyFieldNames.filter((name) => !excelHeaderList.includes(name))
    return { extra, missing }
  }, [excelHeaderList, historyFieldNames])

  const renderModelSelect = (className = '') => {
    if (!hasModel) {
      return <span className="font-semibold text-gray-900">未配置</span>
    }
    if (modelOptions.length <= 1) {
      return <span className="font-semibold text-gray-900">{selectedModel}</span>
    }
    return (
      <select
        value={selectedModel}
        onChange={(event) => setSelectedModel(event.target.value)}
        className={`kiveiv-select px-2 py-1 text-xs font-semibold ${className}`}
      >
        {modelOptions.map((model) => (
          <option key={model} value={model}>
            {model}
          </option>
        ))}
      </select>
    )
  }

  const selectedChunkSet = activeDocId ? selectedChunks[activeDocId] || new Set() : new Set()
  const filteredChunks = useMemo(() => {
    const keyword = chunkSearch.trim().toLowerCase()
    return activeChunks.filter((chunk) => {
      if (chunkShowSelectedOnly && !selectedChunkSet.has(chunk.id)) return false
      if (!keyword) return true
      const tagText = chunk.tags.join(' ')
      return (
        chunk.title.toLowerCase().includes(keyword) ||
        chunk.content.toLowerCase().includes(keyword) ||
        tagText.toLowerCase().includes(keyword)
      )
    })
  }, [activeChunks, chunkSearch, chunkShowSelectedOnly, selectedChunkSet])

  const visibleDocuments = docFilterMode ? filteredDocuments : documents
  const visibleChunks = chunkFilterMode ? filteredChunks : activeChunks

  const visibleDocIds = visibleDocuments.map((doc) => doc.id)
  const selectableDocIds = visibleDocuments.filter((doc) => isSelectableDoc(doc)).map((doc) => doc.id)
  const allVisibleDocsSelected = selectableDocIds.length > 0 && selectableDocIds.every((id) => selectedDocs.has(id))
  const someVisibleDocsSelected = selectableDocIds.some((id) => selectedDocs.has(id))

  const visibleChunkIds = visibleChunks.map((chunk) => chunk.id)
  const allVisibleChunksSelected = visibleChunkIds.length > 0 && visibleChunkIds.every((id) => selectedChunkSet.has(id))
  const someVisibleChunksSelected = visibleChunkIds.some((id) => selectedChunkSet.has(id))

  const selectionSummary = useMemo(() => {
    const docCount = selectedDocs.size
    let chunkCount = 0
    Object.values(selectedChunks).forEach((set) => {
      chunkCount += set?.size || 0
    })
    return { docCount, chunkCount }
  }, [selectedDocs, selectedChunks])

  const resetConfig = () => {
    setConfigStep(0)
    setConfigMethod('')
    setConfigType('')
    setConfigTags([])
    setTagQuery('')
    setPromptText('')
    setHeaderText('')
    setReferenceFileName('')
    setConfigLocked(false)
  }

  const handleSelectDoc = (docId) => {
    const doc = documents.find((item) => item.id === docId)
    if (!doc || !isSelectableDoc(doc)) return
    setSelectedDocs((prev) => {
      const next = new Set(prev)
      if (next.has(docId)) next.delete(docId)
      else next.add(docId)
      return next
    })
  }

  const handleToggleDocs = (docIds) => {
    if (!docIds.length) return
    setSelectedDocs((prev) => {
      const next = new Set(prev)
      const filteredIds = docIds.filter((id) => selectableDocIds.includes(id))
      const allSelected = filteredIds.every((id) => next.has(id))
      if (allSelected) filteredIds.forEach((id) => next.delete(id))
      else filteredIds.forEach((id) => next.add(id))
      return next
    })
  }

  const handleClearDocSelection = () => {
    setSelectedDocs(new Set())
  }

  const handleToggleChunk = (chunkId) => {
    if (!activeDocId) return
    setSelectedChunks((prev) => {
      const next = { ...prev }
      const set = new Set(next[activeDocId] || [])
      if (set.has(chunkId)) set.delete(chunkId)
      else set.add(chunkId)
      next[activeDocId] = set
      return next
    })
  }

  const handleToggleChunks = (chunkIds) => {
    if (!activeDocId || !chunkIds.length) return
    setSelectedChunks((prev) => {
      const next = { ...prev }
      const set = new Set(next[activeDocId] || [])
      const allSelected = chunkIds.every((id) => set.has(id))
      if (allSelected) chunkIds.forEach((id) => set.delete(id))
      else chunkIds.forEach((id) => set.add(id))
      next[activeDocId] = set
      return next
    })
  }

  const handleClearChunkSelection = () => {
    if (!activeDocId) return
    setSelectedChunks((prev) => ({
      ...prev,
      [activeDocId]: new Set()
    }))
  }

  const resetSelections = () => {
    setSelectedDocs(new Set())
    setSelectedChunks({})
    setActiveDocId(null)
    setDocFilterMode(false)
    setChunkFilterMode(false)
    setDocSearch('')
    setChunkSearch('')
    setDocShowSelectedOnly(false)
    setChunkShowSelectedOnly(false)
  }

  const getDocStatusLabel = (doc) => {
    if (doc.segStatusLabel) return doc.segStatusLabel
    if (doc.status === 'processed') return '已切分'
    if (doc.status === 'vectorizing') return '向量化中'
    if (doc.status === 'vectorized') return '已向量化'
    if (doc.status === 'processing') return '切分中'
    if (doc.status === 'error') return '切分失败'
    return '未切分'
  }

  const getDocStatusStyle = (doc) => {
    if (doc.segStatusStyle) return doc.segStatusStyle
    if (doc.status === 'processed') return 'kiveiv-chip'
    if (doc.status === 'vectorizing') return 'kiveiv-chip kiveiv-chip-accent'
    if (doc.status === 'vectorized') return 'kiveiv-chip'
    if (doc.status === 'processing') return 'kiveiv-chip kiveiv-chip-accent'
    if (doc.status === 'error') return 'kiveiv-chip kiveiv-chip-danger'
    return 'kiveiv-chip'
  }

  const getIndexStatusLabel = (doc) => doc.indexStatusLabel || '未构建'
  const getIndexStatusStyle = (doc) => doc.indexStatusStyle || 'kiveiv-chip'

  function isSelectableDoc(doc) {
    return doc.status === 'processed' || doc.status === 'vectorized'
  }

  const handleSwitchEntryMode = (mode) => {
    setEntryMode(mode)
    setView('entry')
    resetSelections()
    setConfigOpen(false)
    resetConfig()
    if (mode === 'history') {
      setHistoryTaskId('')
      setHistorySource('chunk')
      setExcelHeaderText('')
      setExcelHeaderTouched(false)
    }
  }

  const handleSelectHistoryTask = (task) => {
    if (!task) return
    setHistoryTaskId(task.id)
    setHistorySource('chunk')
    setExcelHeaderText('')
    setExcelHeaderTouched(false)
  }

  const handleStartChunkExtraction = () => {
    if (view === 'chunk-detail') {
      if (!selectedChunkSet.size) return
    } else if (!selectedDocs.size) {
      return
    }
    if (isHistoryMode) {
      if (!historyTask) return
      setConfigLocked(true)
      setConfigStep(0)
      setConfigMethod(historyTask.method || '')
      setConfigType(historyTask.type || '')
      setConfigTags(historyTags)
      setTagQuery('')
      setPromptText(historyTask.reference?.promptText || '')
      setHeaderText(historyTask.reference?.headerText || historyFieldNames.join(', '))
      setReferenceFileName(historyTask.reference?.fileName || '')
    } else {
      resetConfig()
    }
    setConfigOpen(true)
  }

  const handleConfirmChunkExtraction = () => {
    if (!hasModel) return
    if (!configLocked && (!configMethod || !configType)) return
    if (configLocked && !historyTask) return

    const resolvedMethod = configLocked ? historyTask.method : configMethod
    const resolvedType = configLocked ? historyTask.type : configType
    const selection = {
      docIds: view === 'chunk-detail' ? [activeDocId] : Array.from(selectedDocs),
      chunksByDoc:
        view === 'chunk-detail'
          ? { [activeDocId]: Array.from(selectedChunkSet) }
          : {}
    }

    const reference = configLocked
      ? (historyTask.reference || {
          promptText: resolvedMethod === 'precise' && resolvedType === 'graph' ? promptText : '',
          headerText: resolvedMethod === 'precise' && resolvedType === 'structured' ? headerText : '',
          fileName: referenceFileName
        })
      : {
          promptText: resolvedMethod === 'precise' && resolvedType === 'graph' ? promptText : '',
          headerText: resolvedMethod === 'precise' && resolvedType === 'structured' ? headerText : '',
          fileName: referenceFileName
        }

    const parsedFields = resolvedType === 'structured'
      ? (configLocked && historyTask.fields?.length
        ? historyTask.fields
        : headerText
            .split(',')
            .map((item) => item.trim())
            .filter(Boolean)
            .map((name, index) => ({ id: `F-${index + 1}`, name, type: '文本', description: '' })))
      : []

    const tags = resolvedMethod === 'fuzzy' ? (configLocked ? historyTags : configTags) : historyTags

    const docName = selection.docIds.length === 1
      ? (documents.find((doc) => doc.id === selection.docIds[0])?.name || '切片抽取')
      : `多文档抽取（${selection.docIds.length}）`

    const taskPayload = {
      type: resolvedType,
      source: 'chunk',
      tags,
      model: selectedModel,
      method: resolvedMethod,
      selection,
      reference,
      docName,
      fields: parsedFields,
      name: configLocked ? historyTask.name : undefined,
      basedOn: configLocked ? historyTask.id : null
    }

    if (resolvedMethod === 'precise') {
      setHitlConfirm({
        stage: 'entity-suggestion',
        payload: taskPayload,
        entitySuggestionAccepted: null
      })
      return
    }

    submitChunkTask(taskPayload)
  }

  const submitChunkTask = (taskPayload) => {
    onCreateTask(taskPayload)
    setConfigOpen(false)
    setHitlConfirm(null)
    setSelectedDocs(new Set())
    setSelectedChunks({})
    onGoResults()
  }

  const handleHitlEntityDecision = (accepted) => {
    if (!hitlConfirm?.payload) return
    const nextPayload = {
      ...hitlConfirm.payload,
      hitl: {
        flow: 'chunk-precise',
        entitySuggestionAccepted: accepted,
        firstCheckpointProgress: 30
      }
    }
    setHitlConfirm({
      stage: 'dedup-merge',
      payload: nextPayload,
      entitySuggestionAccepted: accepted
    })
  }

  const handleHitlMergeDecision = (accepted) => {
    if (!hitlConfirm?.payload) return
    const finalPayload = {
      ...hitlConfirm.payload,
      hitl: {
        ...(hitlConfirm.payload.hitl || {}),
        mergeBySuggestion: accepted
      }
    }
    submitChunkTask(finalPayload)
  }

  const handleCloseHitlAsCancel = () => {
    if (!hitlConfirm) return
    if (hitlConfirm.stage === 'entity-suggestion') {
      handleHitlEntityDecision(false)
      return
    }
    handleHitlMergeDecision(false)
  }

  const handleToggleTag = (tag) => {
    setConfigTags((prev) => {
      if (prev.includes(tag)) return prev.filter((item) => item !== tag)
      return [...prev, tag]
    })
  }

  const handleExcelUpload = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setExcelFileName(file.name)
  }

  const handleClearExcel = () => {
    setExcelFileName('')
    setExcelUploadKey((prev) => prev + 1)
    setExcelHeaderText('')
    setExcelHeaderTouched(false)
  }

  const handleConfirmExcel = () => {
    if (!excelFileName || !hasModel) return

    if (isHistoryMode && historyTask?.type === 'structured') {
      const mergedFields = historyFieldNames.length
        ? Array.from(new Set([...historyFieldNames, ...excelHeaderList])).map((name, index) => ({
            id: `HF-${index + 1}`,
            name,
            type: '文本',
            description: ''
          }))
        : []
      onCreateTask({
        type: 'structured',
        source: 'excel',
        tags: historyTags,
        model: selectedModel,
        method: historyTask.method,
        selection: { docIds: [], chunksByDoc: {} },
        reference: {
          headerText: excelHeaderText || historyTask.reference?.headerText || '',
          fileName: excelFileName
        },
        docName: excelFileName,
        fields: mergedFields,
        name: historyTask.name,
        basedOn: historyTask.id
      })
      setExcelFileName('')
      onGoResults()
      return
    }

    onCreateTask({
      type: 'structured',
      source: 'excel',
      tags: [],
      model: selectedModel,
      method: 'precise',
      selection: { docIds: [], chunksByDoc: {} },
      reference: { fileName: excelFileName },
      docName: excelFileName
    })
    setExcelFileName('')
    onGoResults()
  }

  const configStepCount = configLocked ? 1 : 3
  const showReferenceStep = !configLocked && configStep === 2

  const canNext = () => {
    if (configLocked) return true
    if (configStep === 0) return !!configMethod
    if (configStep === 1) return !!configType
    return true
  }

  const canConfirm = () => {
    if (!hasModel) return false
    if (configLocked) return true
    if (configMethod === 'precise' && configType === 'graph') {
      return !!promptText || !!referenceFileName
    }
    if (configMethod === 'precise' && configType === 'structured') {
      return !!headerText || !!referenceFileName
    }
    if (configMethod === 'fuzzy') {
      return configTags.length > 0
    }
    return false
  }

  if (view === 'history-config') {
    if (!historyTask) {
      return (
        <section className="section-stack">
          <header className="lg:flex lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>历史任务覆盖</h3>
              <p className="kiveiv-gap-title-body text-sm kiveiv-muted">请选择历史任务后继续配置覆盖抽取。</p>
            </div>
            <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:ml-4">
              <button
                type="button"
                onClick={() => setView('entry')}
                className="kiveiv-btn-secondary"
              >
                返回选择
              </button>
            </div>
          </header>
          <div className="kiveiv-card border-dashed p-6 text-center text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
            未选择历史任务。
          </div>
        </section>
      )
    }

    return (
      <section className="section-stack">
        <header className="lg:flex lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>历史任务覆盖</h3>
            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">参数锁定，仅可更换模型与覆盖范围。</p>
          </div>
          <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:ml-4">
            <button
              type="button"
              onClick={() => setView('entry')}
              className="kiveiv-btn-secondary"
            >
              返回选择
            </button>
          </div>
        </header>

        <div className="kiveiv-card p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">已选择历史任务</p>
              <p className="mt-1 text-base font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{historyTask.name}</p>
            </div>
            <span className="kiveiv-chip kiveiv-chip-accent">
              参数锁定，仅可更换模型
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
            <span>方式：{getMethodLabel(historyTask.method)}</span>
            <span className="text-gray-300">|</span>
            <span>类型：{getTypeLabel(historyTask.type)}</span>
            <span className="text-gray-300">|</span>
            <span>覆盖路径：{historySourceLabel}</span>
          </div>
          <div className="rounded-xl border p-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
            <div className="flex items-center justify-between">
              <span>覆盖模型</span>
              {renderModelSelect()}
            </div>
          </div>
          {historyTags.length > 0 && (
            <div>
              <p className="text-[12px] text-gray-400">历史标签</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {historyTags.map((tag) => (
                  <span key={tag} className="kiveiv-chip">{tag}</span>
                ))}
              </div>
            </div>
          )}
          {historyTask.type === 'structured' && (
            <div>
              <p className="text-[12px] text-gray-400">历史字段</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {historyFieldNames.length ? (
                  historyFieldNames.map((field) => (
                    <span key={field} className="kiveiv-chip">{field}</span>
                  ))
                ) : (
                  <span className="text-[12px] text-gray-400">未记录字段</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <EntryCard
            title="切片抽取"
            description="沿用历史参数，重新选择文档与切片范围。"
            badge="主流程"
            accent="indigo"
            icon={(
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            )}
            actionLabel="进入切片抽取"
            onAction={() => {
              setHistorySource('chunk')
              setView('chunk-list')
              resetSelections()
            }}
            features={['沿用历史抽取方式/类型', '重新选择文档与切片范围', '覆盖同名抽取结果']}
          />
          <EntryCard
            title="Excel 抽取"
            description="沿用历史字段，上传 Excel 进行结构化覆盖。"
            badge="结构化"
            accent="sky"
            icon={(
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            )}
            actionLabel="进入 Excel 抽取"
            onAction={() => {
              setHistorySource('excel')
              setView('excel')
              setExcelHeaderTouched(false)
            }}
            features={['表头不一致将新增列', '仍展示进度与结果覆盖', '仅结构化任务可选']}
            disabled={historyTask.type !== 'structured'}
          />
        </div>

        {configOpen && renderConfigModal()}
        {hitlConfirm && renderHitlConfirmModal()}
      </section>
    )
  }

  if (view === 'chunk-list') {
    return (
      <section className="section-stack">
        <header className="lg:flex lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>
              {isHistoryMode ? '切片抽取（历史覆盖）' : '切片抽取'}
            </h3>
            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">
              {isHistoryMode
                ? '沿用历史抽取参数，选择文档与切片范围后覆盖任务结果。'
                : '选择已切分文档进入抽取详情，可批量选择后发起抽取。'}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:ml-4">
            <button
              type="button"
              onClick={() => {
                setView('entry')
                setDocFilterMode(false)
                setChunkFilterMode(false)
              }}
              className="kiveiv-btn-secondary"
            >
              返回入口
            </button>
            <button
              type="button"
              onClick={handleStartChunkExtraction}
              disabled={!selectedDocs.size || (isHistoryMode && !historyTask)}
              className="kiveiv-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isHistoryMode ? '开始覆盖' : '开始抽取'}
            </button>
          </div>
        </header>

        {isHistoryMode && historyTask && (
          <div className="kiveiv-banner">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide kiveiv-subtle">历史任务覆盖</p>
                <p className="kiveiv-gap-title-body text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{historyTask.name}</p>
              </div>
              <span className="kiveiv-chip kiveiv-chip-accent">
                参数锁定，仅可更换模型
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] kiveiv-muted">
              <span>方式：{getMethodLabel(historyTask.method)}</span>
              <span className="kiveiv-subtle">|</span>
              <span>类型：{getTypeLabel(historyTask.type)}</span>
              <span className="kiveiv-subtle">|</span>
              <span>标签：{historyTags.length ? historyTags.join(' · ') : '无'}</span>
            </div>
          </div>
        )}

        <section className="kiveiv-card">
          <div className="flex h-14 items-center justify-between border-b px-6" style={{ borderColor: 'var(--kiveiv-border)' }}>
            <div className="text-xs kiveiv-muted">
              <span>共 {documents.length} 个文档</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>已选择 {selectedDocs.size} 个</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDocFilterMode((prev) => !prev)}
                className="kiveiv-btn-secondary kiveiv-btn-sm"
              >
                {docFilterMode ? '收起筛选' : '筛选/选择'}
              </button>
              <button
                type="button"
                onClick={handleClearDocSelection}
                className={`kiveiv-btn-secondary kiveiv-btn-sm ${
                  selectedDocs.size ? '' : 'pointer-events-none opacity-0'
                }`}
              >
                清空选择
              </button>
            </div>
          </div>

          {docFilterMode && (
            <div className="flex flex-wrap items-center gap-3 border-b px-6 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
              <div className="flex flex-1 items-center gap-2 rounded-xl border px-3 py-2" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface)' }}>
                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                </svg>
                <input
                  value={docSearch}
                  onChange={(event) => setDocSearch(event.target.value)}
                  placeholder="搜索文档名或来源"
                  className="w-full bg-transparent text-xs kiveiv-muted outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setDocShowSelectedOnly((prev) => !prev)}
                className={`kiveiv-chip transition-colors ${docShowSelectedOnly ? 'kiveiv-chip-accent' : ''}`}
              >
                只看已选
              </button>
              <button
                type="button"
                onClick={() => handleToggleDocs(selectableDocIds)}
                className="kiveiv-btn-secondary kiveiv-btn-sm"
              >
                {allVisibleDocsSelected ? '取消全选' : '全选'}
              </button>
              <button
                type="button"
                onClick={handleClearDocSelection}
                className="kiveiv-btn-secondary kiveiv-btn-sm"
              >
                清空
              </button>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="kiveiv-table">
              <thead>
                <tr>
                  <th className="w-14 text-left">
                    {docFilterMode ? (
                      <CircleCheckbox
                        checked={allVisibleDocsSelected}
                        indeterminate={!allVisibleDocsSelected && someVisibleDocsSelected}
                        onChange={() => handleToggleDocs(selectableDocIds)}
                        ariaLabel="选择当前筛选文档"
                      />
                    ) : (
                      <span className="text-xs text-gray-300">-</span>
                    )}
                  </th>
                  <th className="text-left">文档</th>
                  <th className="text-left">切片数</th>
                  <th className="text-left">索引状态</th>
                  <th className="text-left">更新时间</th>
                  <th className="text-left">操作</th>
                </tr>
              </thead>
              <tbody>
                {visibleDocuments.map((doc) => {
                  const selected = selectedDocs.has(doc.id)
                  const selectable = isSelectableDoc(doc)
                  const isPendingSeg = doc.status !== 'processed' && doc.status !== 'vectorized'
                  return (
                    <tr key={doc.id}>
                      <td>
                        {docFilterMode ? (
                          <CircleCheckbox
                            checked={selected}
                            onChange={() => handleSelectDoc(doc.id)}
                            ariaLabel={`选择文档 ${doc.name}`}
                            disabled={!selectable}
                          />
                        ) : (
                          <span className="text-xs text-gray-300">-</span>
                        )}
                      </td>
                      <td>
                        <div className="kiveiv-table-title">{doc.name}</div>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs kiveiv-subtle">
                          <span>{doc.source}</span>
                          <span className={getDocStatusStyle(doc)}>{getDocStatusLabel(doc)}</span>
                        </div>
                      </td>
                      <td className="text-xs kiveiv-muted">{doc.totalChunks}</td>
                      <td className="text-xs kiveiv-muted">
                        <span className={getIndexStatusStyle(doc)}>{getIndexStatusLabel(doc)}</span>
                      </td>
                      <td className="text-xs kiveiv-muted">{doc.updatedAt}</td>
                      <td className="text-xs kiveiv-muted">
                        {selectable ? (
                          <button
                            type="button"
                            onClick={() => {
                              setActiveDocId(doc.id)
                              setChunkFilterMode(false)
                              setChunkSearch('')
                              setChunkShowSelectedOnly(false)
                              setView('chunk-detail')
                            }}
                            className="text-gray-900 hover:text-black"
                          >
                            查看详情
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={handleJumpToSegmentation}
                            className="text-gray-500 hover:text-gray-900"
                          >
                            {isPendingSeg ? '去切分' : '查看详情'}
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
                {!visibleDocuments.length && (
                  <tr>
                    <td colSpan={6} className="px-6 py-6 text-center text-xs text-gray-400">
                      未找到匹配文档，请调整筛选条件。
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {configOpen && renderConfigModal()}
        {hitlConfirm && renderHitlConfirmModal()}
      </section>
    )
  }

  if (view === 'chunk-detail') {
    return (
      <section className="section-stack">
        <header className="lg:flex lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>
              {isHistoryMode ? '切片抽取详情（历史覆盖）' : '切片抽取详情'}
            </h3>
            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">
              {activeDoc ? `${activeDoc.name} · ${activeDoc.source} · 更新 ${activeDoc.updatedAt}` : '请选择文档查看切片'}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:ml-4">
            <button
              type="button"
              onClick={() => {
                setView('chunk-list')
                setChunkFilterMode(false)
              }}
              className="kiveiv-btn-secondary"
            >
              返回文档列表
            </button>
            <button
              type="button"
              onClick={handleStartChunkExtraction}
              disabled={!selectedChunkSet.size || (isHistoryMode && !historyTask)}
              className="kiveiv-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isHistoryMode ? '开始覆盖' : '开始抽取'}
            </button>
          </div>
        </header>

        {isHistoryMode && historyTask && (
          <div className="kiveiv-banner">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide kiveiv-subtle">历史任务覆盖</p>
                <p className="kiveiv-gap-title-body text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{historyTask.name}</p>
              </div>
              <span className="kiveiv-chip kiveiv-chip-accent">
                参数锁定，仅可更换模型
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] kiveiv-muted">
              <span>方式：{getMethodLabel(historyTask.method)}</span>
              <span className="kiveiv-subtle">|</span>
              <span>类型：{getTypeLabel(historyTask.type)}</span>
              <span className="kiveiv-subtle">|</span>
              <span>标签：{historyTags.length ? historyTags.join(' · ') : '无'}</span>
            </div>
          </div>
        )}

        <section className="rounded-xl border border-gray-200 bg-white">
          <div className="flex h-14 items-center justify-between border-b border-gray-100 px-6">
            <div className="text-xs text-gray-600">
              <span>共 {activeChunks.length} 个切片</span>
              <span className="mx-2 text-gray-300">|</span>
              <span>已选择 {selectedChunkSet.size} 个</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setChunkFilterMode((prev) => !prev)}
                className="inline-flex items-center rounded-md border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 transition-colors hover:bg-gray-50"
              >
                {chunkFilterMode ? '收起筛选' : '筛选/选择'}
              </button>
              <button
                type="button"
                onClick={handleClearChunkSelection}
                className={`kiveiv-btn-secondary kiveiv-btn-sm ${
                  selectedChunkSet.size ? '' : 'pointer-events-none opacity-0'
                }`}
              >
                清空选择
              </button>
            </div>
          </div>

          {chunkFilterMode && (
            <div className="flex flex-wrap items-center gap-3 border-b px-6 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
              <div className="flex flex-1 items-center gap-2 rounded-xl border px-3 py-2" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface)' }}>
                <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                </svg>
                <input
                  value={chunkSearch}
                  onChange={(event) => setChunkSearch(event.target.value)}
                  placeholder="搜索切片标题、内容或标签"
                  className="w-full bg-transparent text-xs kiveiv-muted outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => setChunkShowSelectedOnly((prev) => !prev)}
                className={`kiveiv-chip transition-colors ${chunkShowSelectedOnly ? 'kiveiv-chip-accent' : ''}`}
              >
                只看已选
              </button>
              <button
                type="button"
                onClick={() => handleToggleChunks(visibleChunkIds)}
                className="kiveiv-btn-secondary kiveiv-btn-sm"
              >
                {allVisibleChunksSelected ? '取消全选' : '全选'}
              </button>
              <button
                type="button"
                onClick={handleClearChunkSelection}
                className="kiveiv-btn-secondary kiveiv-btn-sm"
              >
                清空
              </button>
            </div>
          )}

          <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleChunks.map((chunk) => {
              const selected = selectedChunkSet.has(chunk.id)
              return (
                <div
                  key={chunk.id}
                  style={{ aspectRatio: '1 / 1' }}
                  className="bento-tile"
                >
                  <div className="bento-tile-inner flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[12px] kiveiv-subtle">切片 {chunk.id}</p>
                        <p className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{chunk.title}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="kiveiv-chip">{chunk.tokenCount} tokens</span>
                        {chunkFilterMode && (
                          <CircleCheckbox
                            checked={selected}
                            onChange={() => handleToggleChunk(chunk.id)}
                            ariaLabel={`选择切片 ${chunk.id}`}
                          />
                        )}
                      </div>
                    </div>
                    <div className="mt-3 flex-1 text-xs leading-relaxed kiveiv-muted">{chunk.content}</div>
                    <div className="mt-3 flex flex-wrap gap-1">
                      {chunk.tags.map((tag) => (
                        <span key={tag} className="kiveiv-chip">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
            {!visibleChunks.length && (
              <div className="col-span-full rounded-lg border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-xs text-gray-400">
                暂无符合条件的切片，请调整筛选条件。
              </div>
            )}
          </div>
        </section>

        {configOpen && renderConfigModal()}
        {hitlConfirm && renderHitlConfirmModal()}
      </section>
    )
  }

  if (view === 'excel') {
    return (
      <section className="kiveiv-stack-section">
        <header className="lg:flex lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="text-2xl font-semibold text-gray-900">
              {isHistoryMode ? 'Excel 抽取（历史覆盖）' : 'Excel 抽取'}
            </h3>
            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">
              {isHistoryMode
                ? '沿用历史字段配置进行结构化抽取，表头不一致将新增列。'
                : '上传合规 Excel 表，系统将按表头自动抽取结构化结果。'}
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:ml-4">
            <button
              type="button"
              onClick={() => {
                setView('entry')
                setDocFilterMode(false)
                setChunkFilterMode(false)
              }}
              className="kiveiv-btn-secondary"
            >
              返回入口
            </button>
            <button
              type="button"
              onClick={handleConfirmExcel}
              disabled={!excelFileName || !hasModel || (isHistoryMode && !historyTask)}
              className="kiveiv-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isHistoryMode ? '开始覆盖' : '开始抽取'}
            </button>
          </div>
        </header>

        {isHistoryMode && historyTask && (
          <div className="kiveiv-banner">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide kiveiv-subtle">历史任务覆盖</p>
                <p className="kiveiv-gap-title-body text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{historyTask.name}</p>
              </div>
              <span className="kiveiv-chip kiveiv-chip-accent">
                参数锁定，仅可更换模型
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-[12px] kiveiv-muted">
              <span>方式：{getMethodLabel(historyTask.method)}</span>
              <span className="kiveiv-subtle">|</span>
              <span>类型：{getTypeLabel(historyTask.type)}</span>
              <span className="kiveiv-subtle">|</span>
              <span>字段：{historyFieldNames.length ? `${historyFieldNames.length} 个` : '未记录'}</span>
            </div>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
            <div>
              <h4 className="text-sm font-semibold text-gray-900">上传 Excel 文件</h4>
              <p className="kiveiv-gap-title-note text-xs text-gray-500">
                {isHistoryMode
                  ? '仅支持 xlsx / xls，结构化参数沿用历史任务。'
                  : '仅支持 xlsx / xls 格式，默认精确结构化抽取。'}
              </p>
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center text-xs text-gray-500 transition-colors hover:border-gray-300">
              <input
                key={excelUploadKey}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleExcelUpload}
                className="hidden"
              />
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-gray-400">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V8m0 0-3 3m3-3 3 3M4 16.5A2.5 2.5 0 016.5 14H7" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 14H17a2.5 2.5 0 012.5 2.5V18a2 2 0 01-2 2H6a2 2 0 01-2-2v-1.5" />
                </svg>
              </span>
              <span className="kiveiv-gap-title-body text-sm font-semibold text-gray-900">点击上传 Excel 文件</span>
              <span className="kiveiv-gap-title-note text-xs text-gray-400">建议文件大小不超过 50MB</span>
            </label>
            {excelFileName && (
              <div className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-xs text-gray-600">
                <span>已选择：{excelFileName}</span>
                <button
                  type="button"
                  onClick={handleClearExcel}
                  className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                >
                  重新选择
                </button>
              </div>
            )}
            {!hasModel && (
              <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-4 py-4 text-xs text-gray-500">
                当前未配置索引构建模型，请先返回设置完成配置。
                <button
                  type="button"
                  onClick={onNavigateSettings}
                  className="mt-3 inline-flex items-center rounded-md border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                >
                  返回配置模型
                </button>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            {isHistoryMode && historyTask && (
              <div className="rounded-lg border border-amber-100 bg-amber-50/70 p-3 text-xs text-amber-700 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-500">历史字段对比</h4>
                    <p className="kiveiv-gap-title-note text-xs text-amber-700">表头不一致将新增列，请确认。</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setExcelHeaderText(historyFieldNames.join(', '))
                      setExcelHeaderTouched(false)
                    }}
                    className="rounded-full border border-amber-200 bg-white px-3 py-1 text-[12px] font-semibold text-amber-700 hover:bg-amber-50"
                  >
                    使用历史字段
                  </button>
                </div>
                <textarea
                  value={excelHeaderText}
                  onChange={(event) => {
                    setExcelHeaderText(event.target.value)
                    setExcelHeaderTouched(true)
                  }}
                  placeholder="请输入 Excel 表头字段，逗号分隔"
                  rows={3}
                  className="w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-xs text-amber-700"
                />
                {headerMismatch && (
                  <div className="rounded-md border border-amber-200 bg-white/70 px-3 py-2 text-[12px] text-amber-700">
                    表头与历史字段不一致，确认后将新增列：
                    <div className="mt-2 flex flex-wrap gap-2">
                      {headerDiff.extra.map((field) => (
                        <span key={field} className="rounded-full bg-white px-2 py-0.5 text-[12px] text-amber-700">
                          + {field}
                        </span>
                      ))}
                      {!headerDiff.extra.length && <span className="text-[12px] text-amber-400">无新增列</span>}
                    </div>
                    {headerDiff.missing.length > 0 && (
                      <div className="mt-2 text-[12px] text-amber-600">
                        缺失字段：{headerDiff.missing.join(' · ')}
                      </div>
                    )}
                  </div>
                )}
                {historyFieldNames.length > 0 && (
                  <div>
                    <p className="text-[12px] text-amber-500">历史字段</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {historyFieldNames.map((field) => (
                        <span key={field} className="rounded-full bg-white px-2 py-0.5 text-[12px] text-amber-700">
                          {field}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">合规 Excel 格式说明</h4>
              <p className="kiveiv-gap-title-note text-xs text-gray-500">精确抽取默认按表头字段生成结构化结果。</p>
            </div>
            <ul className="space-y-2 text-xs text-gray-500">
              <li>• 第一行为表头字段，字段名称需与数据库规范一致。</li>
              <li>• 避免合并单元格、空列与重复字段名。</li>
              <li>• 建议保持一张表描述一类业务实体。</li>
            </ul>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs text-gray-500">
              示例字段：
              <div className="mt-2 flex flex-wrap gap-2">
                {EXCEL_FIELDS.map((field) => (
                  <span key={field} className="rounded-full bg-white px-2.5 py-0.5 text-[12px] text-gray-600">
                    {field}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs text-gray-500">
              <div className="flex items-center justify-between">
                <span>使用模型</span>
                {renderModelSelect()}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="kiveiv-stack-module">
      <div className="rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">索引构建模型</p>
            <p className="kiveiv-gap-title-body text-sm text-gray-600 flex flex-wrap items-center gap-2">
              <span>当前模型：</span>
              {renderModelSelect()}
            </p>
          </div>
          {!hasModel && (
            <button
              type="button"
              onClick={onNavigateSettings}
              className="inline-flex items-center rounded-md border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              去配置模型
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">任务模式</p>
            <p className="kiveiv-gap-title-body text-sm text-gray-600">新增抽取或基于历史任务覆盖结果。</p>
          </div>
          <div className="inline-flex rounded-full bg-gray-100 p-1 text-xs font-semibold text-gray-600">
            <button
              type="button"
              onClick={() => handleSwitchEntryMode('new')}
              className={`rounded-full px-4 py-2 transition-colors ${
                entryMode === 'new' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              新增抽取任务
            </button>
            <button
              type="button"
              onClick={() => handleSwitchEntryMode('history')}
              className={`rounded-full px-4 py-2 transition-colors ${
                entryMode === 'history' ? 'bg-white text-gray-900 shadow' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              历史任务覆盖
            </button>
          </div>
        </div>
      </div>

      {entryMode === 'new' ? (
        <div className="grid gap-6 lg:grid-cols-2">
          <EntryCard
            title="切片抽取"
            description="从切分后的文档与 chunk 中抽取图结构或结构化结果。"
            badge="主流程"
            accent="indigo"
            icon={(
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 5h16M4 12h16M4 19h16" />
              </svg>
            )}
            actionLabel="进入切片抽取"
            onAction={() => {
              setView('chunk-list')
              setDocFilterMode(false)
              setDocSearch('')
              setDocShowSelectedOnly(false)
              resetSelections()
            }}
            features={['支持精确/模糊抽取', '可按标签生成提示词', '抽取结果支持图谱聚合']}
          />
          <EntryCard
            title="Excel 抽取"
            description="上传合规 Excel 表，直接抽取结构化结果并支持导出。"
            badge="快速"
            accent="sky"
            icon={(
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            )}
            actionLabel="进入 Excel 抽取"
            onAction={() => {
              setView('excel')
              setDocFilterMode(false)
              setChunkFilterMode(false)
              resetSelections()
            }}
            features={['表头字段自动识别', '自动结构化入库', '支持格式校验提醒']}
          />
        </div>
      ) : (
        <div className="kiveiv-stack-section">
          <div className="grid gap-6 lg:grid-cols-2">
            <HistoryTaskList
              title="历史图结构"
              subtitle="仅展示已完成的图结构任务"
              tasks={historyGraphTasks}
              selectedId={historyTask?.type === 'graph' ? historyTask.id : ''}
              onSelect={handleSelectHistoryTask}
            />
            <HistoryTaskList
              title="历史结构化数据"
              subtitle="仅展示已完成的结构化任务"
              tasks={historyStructuredTasks}
              selectedId={historyTask?.type === 'structured' ? historyTask.id : ''}
              onSelect={handleSelectHistoryTask}
            />
          </div>

          {historyTask ? (
            <div className="kiveiv-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">已选择历史任务</p>
                  <p className="mt-1 text-base font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{historyTask.name}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setView('history-config')}
                  className="kiveiv-btn-primary"
                >
                  开始抽取
                </button>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span>方式：{getMethodLabel(historyTask.method)}</span>
                <span className="text-gray-300">|</span>
                <span>类型：{getTypeLabel(historyTask.type)}</span>
                <span className="text-gray-300">|</span>
                <span>历史模型：{historyTask.model}</span>
              </div>
            </div>
          ) : (
            <div className="kiveiv-card border-dashed p-6 text-center text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
              请选择一个已完成的历史任务后继续。
            </div>
          )}
        </div>
      )}

      {configOpen && renderConfigModal()}
      {hitlConfirm && renderHitlConfirmModal()}
    </section>
  )

  function renderConfigModal() {
    if (configLocked && historyTask) {
      const selectionText = view === 'chunk-detail'
        ? `已选 ${selectedChunkSet.size} 个切片`
        : `已选 ${selectionSummary.docCount} 个文档`
      return (
        <OverlayDrawer
          open
          title="历史抽取配置"
          description={`${selectionText} · 参数锁定，仅可更换模型`}
          widthClassName="max-w-2xl"
          onClose={() => setConfigOpen(false)}
          footer={(
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-400">历史任务：{historyTask.id}</div>
              <button
                type="button"
                onClick={handleConfirmChunkExtraction}
                disabled={!hasModel}
                className="kiveiv-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                开始覆盖
              </button>
            </div>
          )}
        >
          <div className="rounded-xl border px-4 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
            <div className="flex flex-wrap items-center gap-3">
              <span>方式：{getMethodLabel(historyTask.method)}</span>
              <span className="text-gray-300">|</span>
              <span>类型：{getTypeLabel(historyTask.type)}</span>
              <span className="text-gray-300">|</span>
              <span className="flex items-center gap-2">模型：{renderModelSelect()}</span>
            </div>
          </div>

          {historyTask.method === 'fuzzy' && (
            <div className="mt-4 rounded-xl border p-4" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>标签（沿用历史）</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {historyTags.length ? (
                  historyTags.map((tag) => (
                    <span key={tag} className="kiveiv-chip">{tag}</span>
                  ))
                ) : (
                  <span className="text-xs kiveiv-subtle">未记录标签</span>
                )}
              </div>
            </div>
          )}

          {historyTask.type === 'structured' && (
            <div className="mt-4 rounded-xl border p-4" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
              <h4 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>字段（沿用历史）</h4>
              <div className="mt-3 flex flex-wrap gap-2">
                {historyFieldNames.length ? (
                  historyFieldNames.map((field) => (
                    <span key={field} className="kiveiv-chip">{field}</span>
                  ))
                ) : (
                  <span className="text-xs kiveiv-subtle">未记录字段</span>
                )}
              </div>
            </div>
          )}

          {historyTask.method === 'precise' && historyTask.reference?.fileName && (
            <div className="mt-4 rounded-xl border px-4 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
              参考模板：{historyTask.reference.fileName}
            </div>
          )}

          {!hasModel && (
            <div className="mt-4 kiveiv-card border-dashed p-4 text-xs kiveiv-muted" style={{ background: 'var(--kiveiv-surface-muted)' }}>
              当前未配置索引构建模型，请返回设置完成配置。
              <button
                type="button"
                onClick={onNavigateSettings}
                className="mt-3 kiveiv-btn-secondary kiveiv-btn-sm"
              >
                返回重新配置
              </button>
            </div>
          )}
        </OverlayDrawer>
      )
    }

    const stepTitles = ['选择抽取方式', '选择抽取类型', '配置抽取输入']
    const selectionText = view === 'chunk-detail'
      ? `已选 ${selectedChunkSet.size} 个切片`
      : `已选 ${selectionSummary.docCount} 个文档`
    const stepProgress = Math.round(((configStep + 1) / configStepCount) * 100)
    const methodLabel = METHOD_OPTIONS.find((item) => item.id === configMethod)?.title || '未选择'
    const typeLabel = TYPE_OPTIONS.find((item) => item.id === configType)?.title || '未选择'

    return (
      <OverlayDrawer
        open
        title="切片抽取配置"
        description={`${selectionText} · ${stepTitles[configStep]}`}
        widthClassName="max-w-3xl"
        onClose={() => setConfigOpen(false)}
        footer={(
          <div className="flex items-center justify-between">
            <div className="text-xs kiveiv-subtle">步骤 {configStep + 1} / {configStepCount}</div>
            <div className="flex gap-2">
              {configStep > 0 && (
                <button
                  type="button"
                  onClick={() => setConfigStep((prev) => prev - 1)}
                  className="kiveiv-btn-secondary"
                >
                  上一步
                </button>
              )}
              {configStep < configStepCount - 1 ? (
                <button
                  type="button"
                  onClick={() => setConfigStep((prev) => prev + 1)}
                  disabled={!canNext()}
                  className="kiveiv-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  下一步
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleConfirmChunkExtraction}
                  disabled={!canConfirm()}
                  className="kiveiv-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
                >
                  开始抽取
                </button>
              )}
            </div>
          </div>
        )}
      >
        <div>

          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              {stepTitles.map((title, index) => (
                <div key={title} className="flex items-center gap-2">
                  <span
                    className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                      index < configStep
                        ? 'bg-blue-600 text-white'
                        : index === configStep
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-400'
                    }`}
                    style={index > configStep ? { background: 'var(--kiveiv-surface-muted)', border: '1px solid var(--kiveiv-border)' } : undefined}
                  >
                    {index + 1}
                  </span>
                  <span className={index === configStep ? 'font-semibold' : ''} style={index === configStep ? { color: 'var(--kiveiv-text)' } : undefined}>{title}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--kiveiv-surface-muted)' }}>
              <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: `${stepProgress}%` }} />
            </div>

            <div className="mt-4 rounded-xl border px-4 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
              <div className="flex flex-wrap items-center gap-3">
                <span>{selectionText}</span>
                <span className="text-gray-300">|</span>
                <span>方式：{methodLabel}</span>
                <span className="text-gray-300">|</span>
                <span>类型：{typeLabel}</span>
                <span className="text-gray-300">|</span>
                <span>模型：{hasModel ? selectedModel : '未配置'}</span>
              </div>
            </div>

            {configStep === 0 && (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {METHOD_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setConfigMethod(item.id)}
                    className={`rounded-xl border px-4 py-4 text-left text-sm transition-all ${
                      configMethod === item.id ? 'border-blue-200 bg-blue-50 text-gray-900' : 'text-gray-700 hover:border-blue-200'
                    }`}
                    style={configMethod === item.id ? undefined : { borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface)' }}
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="kiveiv-gap-title-note text-xs text-gray-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {configStep === 1 && (
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {TYPE_OPTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setConfigType(item.id)}
                    className={`rounded-xl border px-4 py-4 text-left text-sm transition-all ${
                      configType === item.id ? 'border-blue-200 bg-blue-50 text-gray-900' : 'text-gray-700 hover:border-blue-200'
                    }`}
                    style={configType === item.id ? undefined : { borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface)' }}
                  >
                    <p className="font-semibold">{item.title}</p>
                    <p className="kiveiv-gap-title-note text-xs text-gray-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            )}

            {showReferenceStep && (
              <div className="mt-6 space-y-4">
                {!hasModel && (
                  <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 text-xs text-gray-500">
                    当前未配置索引构建模型，请返回设置完成配置。
                    <button
                      type="button"
                      onClick={onNavigateSettings}
                      className="mt-3 rounded-md border border-gray-200 px-3 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                    >
                      返回重新配置
                    </button>
                  </div>
                )}

                {configMethod === 'precise' && configType === 'graph' && (
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <h4 className="text-sm font-semibold text-gray-900">三元组参考内容</h4>
                    <p className="kiveiv-gap-title-note text-xs text-gray-400">可输入提示词或上传 md 参考模板。</p>
                    <textarea
                      value={promptText}
                      onChange={(event) => setPromptText(event.target.value)}
                      placeholder="示例：请按【主体, 关系, 客体】输出三元组…"
                      rows={4}
                      className="mt-3 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600"
                    />
                    <label className="mt-3 inline-flex w-fit cursor-pointer items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                      <input
                        type="file"
                        accept=".md"
                        onChange={(event) => setReferenceFileName(event.target.files?.[0]?.name || '')}
                        className="hidden"
                      />
                      上传 md 模板
                    </label>
                    {referenceFileName && <p className="kiveiv-gap-title-note text-xs text-gray-600">已上传：{referenceFileName}</p>}
                  </div>
                )}

                {configMethod === 'precise' && configType === 'structured' && (
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <h4 className="text-sm font-semibold text-gray-900">字段表头参考</h4>
                    <p className="kiveiv-gap-title-note text-xs text-gray-400">可输入字段列表或上传 xlsx/xls 参考。</p>
                    <textarea
                      value={headerText}
                      onChange={(event) => setHeaderText(event.target.value)}
                      placeholder="示例：条款名称, 触发条件, 责任主体, 金额/比例"
                      rows={3}
                      className="mt-3 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs text-gray-600"
                    />
                    <label className="mt-3 inline-flex w-fit cursor-pointer items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50">
                      <input
                        type="file"
                        accept=".xlsx,.xls"
                        onChange={(event) => setReferenceFileName(event.target.files?.[0]?.name || '')}
                        className="hidden"
                      />
                      上传表头参考
                    </label>
                    {referenceFileName && <p className="kiveiv-gap-title-note text-xs text-gray-600">已上传：{referenceFileName}</p>}
                  </div>
                )}

                {configMethod === 'fuzzy' && (
                  <div className="rounded-xl border p-4" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>标签选择（默认 AND）</h4>
                        <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">系统将根据标签自动生成抽取提示词。</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>已选 {configTags.length}</span>
                        <button
                          type="button"
                          onClick={() => setConfigTags([])}
                          className="text-xs font-semibold text-gray-500 hover:text-gray-800"
                        >
                          清空
                        </button>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 rounded-xl border px-3 py-2 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface)' }}>
                      <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                      </svg>
                      <input
                        value={tagQuery}
                        onChange={(event) => setTagQuery(event.target.value)}
                        placeholder="输入关键词筛选标签"
                        className="w-full bg-transparent text-xs kiveiv-muted outline-none"
                      />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {filteredTags.map((tag) => {
                        const selected = configTags.includes(tag)
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => handleToggleTag(tag)}
                            className={`kiveiv-chip transition-colors ${selected ? 'kiveiv-chip-accent' : ''}`}
                          >
                            {tag}
                          </button>
                        )
                      })}
                      {!filteredTags.length && (
                        <span className="text-xs kiveiv-subtle">暂无匹配标签</span>
                      )}
                    </div>
                  </div>
                )}

                <div className="rounded-xl border p-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
                  <div className="flex items-center justify-between">
                    <span>使用模型</span>
                    {renderModelSelect()}
                  </div>
                </div>
              </div>
            )}

        </div>
      </OverlayDrawer>
    )
  }

  function renderHitlConfirmModal() {
    if (!hitlConfirm?.payload) return null
    const isFirstStage = hitlConfirm.stage === 'entity-suggestion'
    const firstDecision = hitlConfirm.entitySuggestionAccepted
    const suggestionItems = isFirstStage
      ? [
          '新增实体类型建议：合同主体、履约节点、风险事件',
          '新增关系建议：约束于、触发于、负责方'
        ]
      : [
          '检测到候选重复实体：北京红杉有限公司 / 红杉有限公司（北京）',
          '检测到候选重复实体：交付验收标准 / 验收标准条款'
        ]

    return (
      <OverlayDrawer
        open
        title={isFirstStage ? 'Human-in-the-loop 确认（约 30%）' : 'Human-in-the-loop 确认（实体去重）'}
        description={
          isFirstStage
            ? '模型已生成实体类型/关系扩展建议。仅可确认或取消。'
            : '模型已生成实体去重合并建议。请确认是否按建议合并。'
        }
        widthClassName="max-w-xl"
        onClose={handleCloseHitlAsCancel}
        footer={(
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                if (isFirstStage) handleHitlEntityDecision(false)
                else handleHitlMergeDecision(false)
              }}
              className="kiveiv-btn-secondary"
            >
              取消
            </button>
            <button
              type="button"
              onClick={() => {
                if (isFirstStage) handleHitlEntityDecision(true)
                else handleHitlMergeDecision(true)
              }}
              className="kiveiv-btn-primary"
            >
              确认
            </button>
          </div>
        )}
      >
        <div className="space-y-4">
          <div className="rounded-xl border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-3 text-xs kiveiv-muted">
            <div className="flex flex-wrap items-center gap-3">
              <span>流程：切片抽取 · 精确抽取</span>
              <span className="kiveiv-subtle">|</span>
              <span>模型：{hitlConfirm.payload.model || '未配置'}</span>
              {!isFirstStage && (
                <>
                  <span className="kiveiv-subtle">|</span>
                  <span>第一次确认：{firstDecision ? '按模型建议继续' : '按用户原始输入继续'}</span>
                </>
              )}
            </div>
          </div>
          <div className="rounded-xl border border-[var(--kiveiv-border)] bg-white p-4">
            <p className="text-sm font-semibold text-[var(--kiveiv-text)]">
              {isFirstStage ? '模型建议内容' : '去重合并建议'}
            </p>
            <ul className="mt-3 space-y-2 text-sm text-[var(--kiveiv-text-muted)]">
              {suggestionItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--kiveiv-accent)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-xs kiveiv-subtle">
            本版本仅支持确认或取消，不支持弹窗内对话式修改。
          </p>
        </div>
      </OverlayDrawer>
    )
  }
}

function EntryCard({ title, description, badge, icon, actionLabel, onAction, features = [], accent = 'indigo', disabled = false }) {
  const accentMap = {
    indigo: {
      badge: 'bg-gray-100 text-gray-700',
      bubble: 'bg-gray-50'
    },
    sky: {
      badge: 'bg-gray-100 text-gray-700',
      bubble: 'bg-gray-50'
    },
    emerald: {
      badge: 'bg-gray-100 text-gray-700',
      bubble: 'bg-gray-50'
    }
  }
  const palette = accentMap[accent] || accentMap.indigo

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm ${
        disabled ? 'opacity-60' : 'transition-transform hover:-translate-y-1'
      }`}
    >
      <div className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-gradient-to-b from-white via-white to-transparent opacity-70 transition-transform duration-500 group-hover:-translate-y-2" />
      <div className="relative flex h-full flex-col justify-between gap-6">
        <div className="flex items-start gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-900">
            {icon}
          </span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${palette.badge}`}>
                {badge}
              </span>
            </div>
            <p className="kiveiv-gap-title-body text-sm leading-6 text-gray-500">{description}</p>
          </div>
        </div>
        <ul className="space-y-1 text-xs text-gray-500">
          {features.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              {item}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={disabled ? undefined : onAction}
          disabled={disabled}
          className="kiveiv-btn-primary w-fit disabled:cursor-not-allowed disabled:opacity-50"
        >
          {actionLabel}
        </button>
      </div>
      <div className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${palette.bubble}`} />
      <div className={`pointer-events-none absolute -left-10 -top-6 h-24 w-24 rounded-full ${palette.bubble} opacity-70`} />
    </div>
  )
}

function HistoryTaskList({ title, subtitle, tasks, selectedId, onSelect }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 px-4 py-3">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="kiveiv-gap-title-note text-xs text-gray-400">{subtitle}</p>
      </div>
      <div className="divide-y divide-gray-100">
        {tasks.map((task) => {
          const selected = selectedId === task.id
          return (
            <button
              key={task.id}
              type="button"
              onClick={() => onSelect?.(task)}
              className={`flex w-full items-start justify-between gap-3 px-4 py-3 text-left text-sm transition-colors ${
                selected ? 'bg-gray-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{task.name}</p>
                <p className="kiveiv-gap-title-note text-xs text-gray-400">{task.id} · {task.docName}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-gray-500">
                  <span>方式：{getMethodLabel(task.method)}</span>
                  <span className="text-gray-300">|</span>
                  <span>类型：{getTypeLabel(task.type)}</span>
                </div>
                {task.tags?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {task.tags.map((tag) => (
                      <span key={tag} className="rounded-full bg-gray-100 px-2 py-0.5 text-[12px] text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <span
                className={`mt-1 flex h-4 w-4 items-center justify-center rounded-full border ${
                  selected ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
                }`}
              >
                {selected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
              </span>
            </button>
          )
        })}
        {!tasks.length && (
          <div className="px-4 py-6 text-center text-xs text-gray-400">暂无已完成任务。</div>
        )}
      </div>
    </div>
  )
}

function ActionCard({ title, description, actionLabel, onClick, disabled = false }) {
  return (
    <div
      className={`kiveiv-card p-4 transition-colors ${
        disabled ? 'border-dashed text-gray-400' : 'hover:opacity-[0.98]'
      }`}
      style={disabled ? { background: 'var(--kiveiv-surface-muted)' } : undefined}
    >
      <h4 className={`text-sm font-semibold ${disabled ? 'text-gray-400' : ''}`} style={disabled ? undefined : { color: 'var(--kiveiv-text)' }}>{title}</h4>
      <p className={`kiveiv-gap-title-note text-xs ${disabled ? 'text-gray-400' : 'kiveiv-muted'}`}>{description}</p>
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className="mt-4 kiveiv-btn-primary kiveiv-btn-sm disabled:cursor-not-allowed disabled:opacity-50"
      >
        {actionLabel}
      </button>
    </div>
  )
}

function CircleCheckbox({ checked, indeterminate = false, onChange, ariaLabel }) {
  return (
    <label className="inline-flex cursor-pointer items-center justify-center">
      <input
        type="checkbox"
        aria-label={ariaLabel}
        checked={checked}
        onChange={onChange}
        ref={(element) => {
          if (element) {
            element.indeterminate = indeterminate
          }
        }}
        className="sr-only"
      />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
          checked || indeterminate ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white'
        }`}
      >
        {(checked || indeterminate) && (
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {indeterminate ? (
              <path strokeLinecap="round" d="M6 12h12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            )}
          </svg>
        )}
      </span>
    </label>
  )
}
