import { useEffect, useMemo, useState } from 'react'
import { useSettingsStore } from '../../settings/SettingsStore.jsx'
import { collectSavedModels } from '../../settings/modelUtils.js'
import { useKnowledgeBaseStore } from '../../knowledge-base/KnowledgeBaseStore.jsx'
import { useDocumentStore } from '../../document-parsing/documentStore.jsx'
import { SegDocsPage } from './pages/SegDocsPage.jsx'
import { SegResultsPage } from './pages/SegResultsPage.jsx'
import { SegTagsPage } from './pages/SegTagsPage.jsx'
import { SegSearchPage } from './pages/SegSearchPage.jsx'
import { SegVectorPage } from './pages/SegVectorPage.jsx'
import {
  SEGMENTATION_TABS,
  STRATEGY_META,
  STRATEGIES,
  STEP_FLOW,
  statusLabels,
  statusStyles,
  vectorStatusLabels,
  vectorStatusStyles,
  chunkStatusLabels,
  chunkStatusStyles
} from '../data/segmentationConstants.js'
import { SEGMENTATION_CONFIGS, SEARCH_RESULTS, INITIAL_CHUNKS_BY_DOC } from '../data/segmentationMock.js'
import {
  formatDate,
  isSelectableStatus,
  isVectorSelectableChunk,
  truncateText
} from '../utils/segmentationUtils.js'
import {
  DeleteChunkConfirmModal,
  EditChunkModal,
  InfoModal,
  ModelSelectionModal,
  TagManagementModal
} from './modals/SegmentationModals.jsx'
import { useChunkFilter } from '../hooks/useChunkFilter.js'
import { useTagManager } from '../hooks/useTagManager.js'
import { useSegmentationContext } from '../SegmentationStateProvider.jsx'

export function SegmentationPage({
  activeTab = 'seg-docs',
  onTabChange,
  onNavigateSettings,
  tabOptions = SEGMENTATION_TABS,
  showTabSelect = true,
  useInlineTagActions = false
}) {
  const { activeKnowledgeBaseId, knowledgeBases, updateKnowledgeBase } = useKnowledgeBaseStore()
  const segmentationBaseId = activeKnowledgeBaseId || 'default'
  const { models } = useSettingsStore()
  const { documents: parsedDocuments } = useDocumentStore()
  const {
    documents,
    setDocuments,
    chunksByDoc,
    setChunksByDoc,
    tagPool,
    setTagPool,
    systemTagPool,
    setSystemTagPool,
    segProgress,
    segActiveDocs,
    setSegActiveDocs,
    segRun,
    vectorActive,
    vectorActiveDocId,
    vectorRun,
    startSegmentationProgress,
    startVectorProgress
  } = useSegmentationContext()

  const [selectedDocs, setSelectedDocs] = useState(new Set())
  const [strategyOpen, setStrategyOpen] = useState(false)
  const [strategyDocs, setStrategyDocs] = useState([])
  const [stepIndex, setStepIndex] = useState(0)
  const [strategy, setStrategy] = useState('semantic')
  const [chunkSize, setChunkSize] = useState('800')
  const [overlap, setOverlap] = useState('120')
  const [minTokens, setMinTokens] = useState('200')
  const [maxTokens, setMaxTokens] = useState('1200')
  const [enableClean, setEnableClean] = useState(true)
  const [enableMap, setEnableMap] = useState(true)
  const [enableTags, setEnableTags] = useState(true)
  const [enableValidation, setEnableValidation] = useState(true)
  const [mergeSmall, setMergeSmall] = useState(true)
  const [fixOverflow, setFixOverflow] = useState(true)
  const [lastSavedAt, setLastSavedAt] = useState('')
  const [resultDocId, setResultDocId] = useState(null)
  const [resultViewEnabled, setResultViewEnabled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchTags, setSearchTags] = useState([])
  const [searchDocs, setSearchDocs] = useState([])
  const [modalState, setModalState] = useState(null)
  const [editingChunk, setEditingChunk] = useState(null)
  const [editDraft, setEditDraft] = useState({ title: '', content: '' })
  const [vectorDocId, setVectorDocId] = useState(null)
  const [vectorViewEnabled, setVectorViewEnabled] = useState(false)
  const [vectorModalOpen, setVectorModalOpen] = useState(false)
  const [vectorQuery, setVectorQuery] = useState('')
  const [vectorModel, setVectorModel] = useState('')
  const [semanticModalOpen, setSemanticModalOpen] = useState(false)
  const [semanticQuery, setSemanticQuery] = useState('')
  const [semanticModel, setSemanticModel] = useState('')

  useEffect(() => {
    setSelectedDocs(new Set())
    setStrategyOpen(false)
    setStrategyDocs([])
    setStepIndex(0)
    setResultDocId(null)
    setResultViewEnabled(false)
    setSearchQuery('')
    setSearchTags([])
    setSearchDocs([])
    setModalState(null)
    setEditingChunk(null)
    setEditDraft({ title: '', content: '' })
    setVectorDocId(null)
    setVectorViewEnabled(false)
    setVectorModalOpen(false)
    setVectorQuery('')
    setVectorModel('')
    setSemanticModalOpen(false)
    setSemanticQuery('')
    setSemanticModel('')
    setLastSavedAt('')
  }, [segmentationBaseId])

  useEffect(() => {
    const parsed = (parsedDocuments || []).filter((doc) => doc.status === '已解析')
    const parsedIds = new Set(parsed.map((doc) => doc.id))
    setDocuments((prev) => {
      const prevMap = new Map(prev.map((doc) => [doc.id, doc]))
      const next = parsed.map((doc) => {
        const existing = prevMap.get(doc.id)
        const mdName = toMarkdownName(doc.name)
        if (existing) {
          return {
            ...existing,
            name: mdName,
            updatedAt: doc.updatedAt || existing.updatedAt,
            source: existing.source || '解析链路'
          }
        }
        return {
          id: doc.id,
          name: mdName,
          status: 'not_processed',
          updatedAt: doc.updatedAt || formatDate(new Date()),
          totalChunks: (chunksByDoc[doc.id] || []).length,
          source: '解析链路'
        }
      })
      return next
    })

    setChunksByDoc((prev) => {
      let changed = false
      const next = { ...prev }
      parsed.forEach((doc) => {
        if (!next[doc.id]) {
          next[doc.id] = buildMockChunks(doc.id, doc.name)
          changed = true
        }
      })
      Object.keys(next).forEach((docId) => {
        if (!parsedIds.has(docId)) {
          delete next[docId]
          changed = true
        }
      })
      return changed ? next : prev
    })
  }, [parsedDocuments, segmentationBaseId, setDocuments, setChunksByDoc, chunksByDoc])

  const availableSemanticModels = useMemo(() => collectSavedModels(models, 'chunk-llm'), [models])
  const availableVectorModels = useMemo(() => collectSavedModels(models, 'chunk-vector'), [models])
  const activeKnowledgeBase = useMemo(
    () => (knowledgeBases || []).find((base) => base.id === segmentationBaseId) || null,
    [knowledgeBases, segmentationBaseId]
  )
  const baseVectorModel = activeKnowledgeBase?.vectorModel || activeKnowledgeBase?.embedding || ''
  const isVectorLocked = activeKnowledgeBase?.vectorModelLocked === true || !!baseVectorModel
  const vectorModelOptions = useMemo(() => {
    if (isVectorLocked) {
      return baseVectorModel ? [baseVectorModel] : availableVectorModels
    }
    if (baseVectorModel && !availableVectorModels.includes(baseVectorModel)) {
      return [baseVectorModel, ...availableVectorModels]
    }
    return availableVectorModels
  }, [isVectorLocked, baseVectorModel, availableVectorModels])

  const activeTabMeta = useMemo(() => {
    if (strategyOpen && activeTab === 'seg-docs') return STRATEGY_META
    return tabOptions.find((tab) => tab.id === activeTab) || tabOptions[0] || SEGMENTATION_TABS[0]
  }, [activeTab, strategyOpen, tabOptions])

  useEffect(() => {
    if (!tabOptions?.length) return
    const exists = tabOptions.some((tab) => tab.id === activeTab)
    if (!exists) onTabChange?.(tabOptions[0].id)
  }, [tabOptions, activeTab, onTabChange])

  const selectedDocItems = useMemo(
    () => strategyDocs.map((docId) => documents.find((doc) => doc.id === docId)).filter(Boolean),
    [documents, strategyDocs]
  )

  const currentDoc = useMemo(() => {
    if (!resultDocId) return null
    return documents.find((doc) => doc.id === resultDocId) || null
  }, [documents, resultDocId])

  const currentChunks = useMemo(() => {
    if (!currentDoc) return []
    return chunksByDoc[currentDoc.id] || []
  }, [currentDoc, chunksByDoc])

  const currentConfig = useMemo(() => {
    if (!currentDoc) return null
    if (currentDoc.config) return currentDoc.config
    return SEGMENTATION_CONFIGS[currentDoc.id] || {
      strategyId: 'semantic',
      strategyName: STRATEGIES.find((item) => item.id === strategy)?.name || '语义边界切分',
      chunkSize: Number(chunkSize),
      overlap: Number(overlap),
      minTokens: Number(minTokens),
      maxTokens: Number(maxTokens),
      enableClean,
      enableMap,
      enableTags,
      enableValidation
    }
  }, [
    currentDoc,
    chunkSize,
    overlap,
    minTokens,
    maxTokens,
    enableClean,
    enableMap,
    enableTags,
    enableValidation,
    strategy
  ])

  const currentTags = useMemo(() => {
    const tags = new Set()
    currentChunks.forEach((chunk) => {
      if (chunk.userTag) tags.add(chunk.userTag)
      if (Array.isArray(chunk.contentTags)) {
        chunk.contentTags.forEach((tag) => {
          if (tag) tags.add(tag)
        })
      }
    })
    return Array.from(tags)
  }, [currentChunks])

  const atomicSummary = useMemo(() => {
    const atomic = currentChunks.filter((chunk) => chunk.isAtomic)
    if (!atomic.length) return '无'
    const types = Array.from(new Set(atomic.map((chunk) => chunk.atomicType).filter(Boolean)))
    return `${atomic.length} 个原子块${types.length ? `（${types.join(' / ')}）` : ''}`
  }, [currentChunks])

  const vectorDocuments = useMemo(() => {
    const guessTypeFromName = (name = '') => {
      const ext = name.includes('.') ? name.split('.').pop() : ''
      return ext ? ext.toUpperCase() : '未知'
    }
    const estimateChars = (doc, chunkList) => {
      if (typeof doc.charCount === 'number') return doc.charCount
      if (typeof doc.dataSize === 'number') return doc.dataSize
      if (chunkList.length > 0) return chunkList.length * 1200
      return 0
    }
    return documents.map((doc) => {
      const chunkList = chunksByDoc?.[doc.id] || []
      const vectorizing = vectorRun?.docId === doc.id
      const vectorized = chunkList.some((chunk) => chunk.status === 2)
      const vectorStatus = vectorizing ? 'processing' : (vectorized ? 'processed' : 'not_processed')
      const tags = Array.isArray(doc.tags)
        ? doc.tags
        : (typeof doc.tags === 'string' && doc.tags.trim() ? [doc.tags.trim()] : [])
      return {
        ...doc,
        status: vectorStatus,
        segStatus: doc.status,
        vectorized,
        fileType: doc.type || guessTypeFromName(doc.name),
        tags,
        createdAt: doc.createdAt || doc.updatedAt || '-',
        updatedAt: doc.updatedAt || '-',
        charCount: estimateChars(doc, chunkList)
      }
    })
  }, [documents, chunksByDoc, vectorRun])

  const vectorDoc = useMemo(() => {
    if (!vectorDocId) return null
    return vectorDocuments.find((doc) => doc.id === vectorDocId) || null
  }, [vectorDocuments, vectorDocId])

  const vectorChunks = useMemo(() => {
    if (!vectorDoc) return []
    return chunksByDoc[vectorDoc.id] || []
  }, [vectorDoc, chunksByDoc])

  const vectorSelectableIds = useMemo(
    () => vectorChunks.filter((chunk) => isVectorSelectableChunk(chunk.status)).map((chunk) => chunk.id),
    [vectorChunks]
  )

  const openModal = (title, description) => {
    setModalState({ title, description })
  }
  const {
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
  } = useTagManager({
    initialTagPool: tagPool,
    initialSystemTagPool: systemTagPool,
    tagPoolState: [tagPool, setTagPool],
    systemTagPoolState: [systemTagPool, setSystemTagPool],
    documents,
    chunksByDoc,
    setChunksByDoc,
    openModal
  })


  const {
    chunkFilterMode,
    chunkSelections,
    deleteChunkConfirm,
    setDeleteChunkConfirm,
    toggleChunkSelection,
    handleSelectAllChunks,
    handleClearChunkSelection,
    handleDeleteSelectedChunks,
    toggleChunkFilterMode
  } = useChunkFilter({
    currentDoc,
    currentChunks,
    setChunksByDoc,
    setDocuments,
    resultDocId
  })

  const {
    chunkFilterMode: vectorChunkFilterMode,
    chunkSelections: vectorChunkSelections,
    deleteChunkConfirm: vectorDeleteChunkConfirm,
    setDeleteChunkConfirm: setVectorDeleteChunkConfirm,
    toggleChunkSelection: toggleVectorChunkSelection,
    handleSelectAllChunks: handleSelectAllVectorChunks,
    handleClearChunkSelection: handleClearVectorSelection,
    handleDeleteSelectedChunks: handleDeleteVectorChunks,
    toggleChunkFilterMode: toggleVectorFilterMode
  } = useChunkFilter({
    currentDoc: vectorDoc,
    currentChunks: vectorChunks,
    setChunksByDoc,
    setDocuments,
    resultDocId: vectorDocId,
    selectableIds: vectorSelectableIds
  })

  const closeModal = () => {
    setModalState(null)
  }

  const handleReturnToSettings = () => {
    setVectorModalOpen(false)
    setSemanticModalOpen(false)
    onNavigateSettings?.('model-chunk')
  }

  const toggleMultiSelect = (value, setter) => {
    setter((prev) => {
      const next = new Set(prev)
      if (next.has(value)) next.delete(value)
      else next.add(value)
      return Array.from(next)
    })
  }

  const handleSearchMultiSelect = (value, type) => {
    if (type === 'docs') {
      toggleMultiSelect(value, setSearchDocs)
      return
    }
    if (type === 'tags') {
      toggleMultiSelect(value, setSearchTags)
    }
  }

  const openStrategyForDocs = (docIds) => {
    if (!docIds.length) return
    setStrategyDocs(docIds)
    setStrategyOpen(true)
    setStepIndex(0)
    onTabChange?.('seg-docs')
  }

  const resetStrategy = () => {
    setStrategyDocs([])
    setStrategyOpen(false)
    setStepIndex(0)
  }

  const openResultsForDoc = (docId) => {
    setResultDocId(docId)
    setResultViewEnabled(true)
    onTabChange?.('seg-results')
  }

  const closeResultDetail = () => {
    setResultViewEnabled(false)
    setResultDocId(null)
  }

  const openVectorDetail = (docId) => {
    setVectorDocId(docId)
    setVectorViewEnabled(true)
  }

  const handleOpenVectorModal = () => {
    if (!vectorChunkSelections.size) return
    setVectorQuery('')
    if (isVectorLocked) {
      setVectorModel(baseVectorModel)
    } else {
      setVectorModel(baseVectorModel || vectorModelOptions[0] || '')
    }
    setVectorModalOpen(true)
  }

  const handleConfirmVectorize = () => {
    if (!vectorModel) return
    setVectorModalOpen(false)
    startVectorProgress(Array.from(vectorChunkSelections), vectorDocId, segmentationBaseId, segmentationBaseId)
    if (!isVectorLocked) {
      updateKnowledgeBase?.(segmentationBaseId, {
        vectorModel,
        embedding: vectorModel,
        vectorModelLocked: true
      })
    }
    handleClearVectorSelection()
  }

  const handleDeleteVectorDoc = (docId) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== docId))
    setChunksByDoc((prev) => {
      if (!prev[docId]) return prev
      const next = { ...prev }
      delete next[docId]
      return next
    })
    if (vectorDocId === docId) {
      setVectorDocId(null)
      setVectorViewEnabled(false)
    }
  }

  const toggleSelectDoc = (docId) => {
    const doc = documents.find((item) => item.id === docId)
    if (!doc || !isSelectableStatus(doc.status)) return
    setSelectedDocs((prev) => {
      const next = new Set(prev)
      if (next.has(docId)) next.delete(docId)
      else next.add(docId)
      return next
    })
  }

  const goStep = (nextIndex) => {
    setStepIndex(Math.min(Math.max(nextIndex, 0), STEP_FLOW.length - 1))
  }

  const handleSaveStrategy = () => {
    setLastSavedAt(formatDate(new Date()))
  }

  const handleOpenStrategyFromSelection = () => {
    if (!selectedDocs.size) return
    const invalidSelection = Array.from(selectedDocs).filter((docId) => {
      const doc = documents.find((item) => item.id === docId)
      return doc && !isSelectableStatus(doc.status)
    })
    if (invalidSelection.length) {
      openModal('无法开始切分', '已完成或切分中的文档不可批量切分，请使用“重新切分”入口。')
      return
    }
    openStrategyForDocs(Array.from(selectedDocs))
  }

  const handleStartSegmentation = () => {
    if (!strategyDocs.length) return
    if (strategy === 'semantic') {
      setSemanticQuery('')
      setSemanticModel(availableSemanticModels[0] || '')
      setSemanticModalOpen(true)
      return
    }
    startSegmentationProgress(strategyDocs, segmentationBaseId, segmentationBaseId)
    setSelectedDocs(new Set())
    resetStrategy()
  }

  const handleConfirmSemantic = () => {
    if (!semanticModel) return
    setSemanticModalOpen(false)
    startSegmentationProgress(strategyDocs, segmentationBaseId, segmentationBaseId)
    setSelectedDocs(new Set())
    resetStrategy()
  }

  const handleOpenEdit = (chunk, docId) => {
    setEditingChunk({ docId, chunkId: chunk.id })
    setEditDraft({ title: chunk.title, content: chunk.content || '' })
  }

  const handleSaveEdit = () => {
    if (!editingChunk) return
    const { docId, chunkId } = editingChunk
    setChunksByDoc((prev) => {
      const next = { ...prev }
      next[docId] = (next[docId] || []).map((chunk) =>
        chunk.id === chunkId
          ? {
              ...chunk,
              title: editDraft.title,
              content: editDraft.content,
              status: 1
            }
          : chunk
      )
      return next
    })
    setEditingChunk(null)
  }

  const currentSelectionCount = selectedDocs.size
  const vectorSelectionCount = vectorChunkSelections.size
  const hasProcessedDocs = documents.some((doc) => doc.status === 'processed')
  const showSegListAction = activeTab === 'seg-docs' && !strategyOpen

	  return (
	    <div className="kiveiv-stack-section">
	      <header className="flex flex-wrap items-start justify-between gap-4">
	        <div>
	          <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{activeTabMeta.label}</h2>
	          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">{activeTabMeta.description}</p>
	        </div>
        <div className="flex flex-wrap items-center gap-2">
          {showTabSelect && (
            <select
              value={activeTab}
              onChange={(event) => onTabChange?.(event.target.value)}
              className="kiveiv-select h-10 min-w-[156px] text-xs"
              aria-label="切分视图切换"
            >
              {tabOptions.map((tab) => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
          )}
          {showSegListAction && (
            <button
              type="button"
              onClick={handleOpenStrategyFromSelection}
              disabled={!currentSelectionCount}
              className={`kiveiv-btn-primary ${currentSelectionCount ? '' : 'kiveiv-btn-disabled'}`}
            >
              开始切分
            </button>
          )}
        </div>
      </header>

      {activeTab === 'seg-docs' && (
        <SegDocsPage
          strategyOpen={strategyOpen}
          documents={documents}
          selectedDocs={selectedDocs}
          selectedDocItems={selectedDocItems}
          currentSelectionCount={currentSelectionCount}
          statusStyles={statusStyles}
          statusLabels={statusLabels}
          isSelectableStatus={isSelectableStatus}
          onToggleSelectDoc={toggleSelectDoc}
          onClearSelection={() => setSelectedDocs(new Set())}
          onOpenResultsForDoc={openResultsForDoc}
          onOpenStrategyForDocs={openStrategyForDocs}
          onResetStrategy={resetStrategy}
          stepIndex={stepIndex}
          onGoStep={goStep}
          STEP_FLOW={STEP_FLOW}
          STRATEGIES={STRATEGIES}
          strategy={strategy}
          onSetStrategy={setStrategy}
          chunkSize={chunkSize}
          onSetChunkSize={setChunkSize}
          overlap={overlap}
          onSetOverlap={setOverlap}
          minTokens={minTokens}
          onSetMinTokens={setMinTokens}
          maxTokens={maxTokens}
          onSetMaxTokens={setMaxTokens}
          enableClean={enableClean}
          onSetEnableClean={setEnableClean}
          enableMap={enableMap}
          onSetEnableMap={setEnableMap}
          enableTags={enableTags}
          onSetEnableTags={setEnableTags}
          enableValidation={enableValidation}
          onSetEnableValidation={setEnableValidation}
          mergeSmall={mergeSmall}
          onSetMergeSmall={setMergeSmall}
          fixOverflow={fixOverflow}
          onSetFixOverflow={setFixOverflow}
          onSaveStrategy={handleSaveStrategy}
          lastSavedAt={lastSavedAt}
          onStartSegmentation={handleStartSegmentation}
          segProgress={segProgress}
          segRunningDocIds={segRun?.docIds || segActiveDocs.map((item) => item.id)}
        />
      )}

      {activeTab === 'seg-results' && (
        <SegResultsPage
          documents={documents}
          statusStyles={statusStyles}
          statusLabels={statusLabels}
          hasProcessedDocs={hasProcessedDocs}
          resultViewEnabled={resultViewEnabled}
          currentDoc={currentDoc}
          currentChunks={currentChunks}
          currentTags={currentTags}
          currentConfig={currentConfig}
          atomicSummary={atomicSummary}
          chunkStatusStyles={chunkStatusStyles}
          chunkStatusLabels={chunkStatusLabels}
          chunkFilterMode={chunkFilterMode}
          chunkSelections={chunkSelections}
          truncateText={truncateText}
          onOpenResultsForDoc={openResultsForDoc}
          onOpenStrategyForDocs={openStrategyForDocs}
          onCloseResultDetail={closeResultDetail}
          onToggleChunkSelection={toggleChunkSelection}
          onSelectAllChunks={handleSelectAllChunks}
          onClearChunkSelection={handleClearChunkSelection}
          onRequestDelete={() => setDeleteChunkConfirm(true)}
          onToggleFilterMode={toggleChunkFilterMode}
          onOpenEdit={handleOpenEdit}
          onOpenModal={openModal}
        />
      )}

      {activeTab === 'seg-tags' && (
        <SegTagsPage
          activeTagView={activeTagView}
          tagViewChunks={tagViewChunks}
          tagPool={tagPool}
          systemTagPool={systemTagPool}
          tagStats={tagStats}
          systemTagStats={systemTagStats}
          chunkStatusStyles={chunkStatusStyles}
          chunkStatusLabels={chunkStatusLabels}
          truncateText={truncateText}
          onOpenTagView={openTagView}
          onCloseTagView={closeTagView}
          onOpenTagModal={openTagModal}
          onUpdateTagDraft={updateTagDraft}
          onGetTagDraft={getTagDraft}
          onAddChunkTag={handleAddChunkTag}
          onRemoveChunkTag={handleRemoveChunkTag}
          useInlineTagActions={useInlineTagActions}
          onQuickTagAction={executeTagAction}
        />
      )}

      {activeTab === 'seg-search' && (
        <SegSearchPage
          documents={documents}
          tagStats={tagStats}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchTags={searchTags}
          searchDocs={searchDocs}
          onToggleMultiSelect={handleSearchMultiSelect}
          searchResults={SEARCH_RESULTS}
        />
      )}

      {activeTab === 'seg-vector' && (
        <SegVectorPage
          documents={vectorDocuments}
          statusStyles={vectorStatusStyles}
          statusLabels={vectorStatusLabels}
          vectorDoc={vectorDoc}
          vectorViewEnabled={vectorViewEnabled}
          vectorActive={vectorActive}
          vectorActiveDocId={vectorActiveDocId}
          vectorChunks={vectorChunks}
          vectorSelectionCount={vectorSelectionCount}
          vectorChunkFilterMode={vectorChunkFilterMode}
          vectorChunkSelections={vectorChunkSelections}
          chunkStatusStyles={chunkStatusStyles}
          chunkStatusLabels={chunkStatusLabels}
          truncateText={truncateText}
          onOpenVectorDetail={openVectorDetail}
          onToggleVectorChunk={toggleVectorChunkSelection}
          onSelectAllVectorChunks={handleSelectAllVectorChunks}
          onClearVectorSelection={handleClearVectorSelection}
          onRequestDeleteVectorChunks={() => setVectorDeleteChunkConfirm(true)}
          onToggleVectorFilterMode={toggleVectorFilterMode}
          onCloseVectorDetail={() => {
            setVectorViewEnabled(false)
            setVectorDocId(null)
          }}
          onOpenVectorModal={handleOpenVectorModal}
          onDeleteVectorDoc={handleDeleteVectorDoc}
        />
      )}

      {tagModal && !useInlineTagActions && (
        <TagManagementModal
          tagModal={tagModal}
          tagForm={tagForm}
          tagPool={tagPool}
          systemTagPool={systemTagPool}
          mergeQuery={mergeQuery}
          onFormChange={updateTagForm}
          onMergeQueryChange={setMergeQuery}
          onClose={closeTagModal}
          onSubmit={handleSubmitTagModal}
        />
      )}

      {vectorModalOpen && (
        <ModelSelectionModal
          title="请确认向量化配置"
          description="向量化需要选择向量模型。"
          selectionCount={vectorSelectionCount}
          label="向量模型"
          options={vectorModelOptions}
          selected={vectorModel}
          query={vectorQuery}
          onQueryChange={setVectorQuery}
          onSelect={setVectorModel}
          emptyText="当前未配置可用的向量模型，请返回重新配置。"
          confirmText="开始向量化"
          locked={isVectorLocked}
          lockedHint={isVectorLocked ? '该知识库已绑定向量模型，后续向量化不可更改。' : ''}
          onClose={() => setVectorModalOpen(false)}
          onReturnSettings={handleReturnToSettings}
          onConfirm={handleConfirmVectorize}
        />
      )}

      {semanticModalOpen && (
        <ModelSelectionModal
          title="请确认切分模型配置"
          description="语义边界切分需要选择 LLM 模型。"
          label="语义切分模型"
          options={availableSemanticModels}
          selected={semanticModel}
          query={semanticQuery}
          onQueryChange={setSemanticQuery}
          onSelect={setSemanticModel}
          emptyText="当前未配置可用的语义切分模型，请返回重新配置。"
          confirmText="开始切分"
          onClose={() => setSemanticModalOpen(false)}
          onReturnSettings={handleReturnToSettings}
          onConfirm={handleConfirmSemantic}
        />
      )}

      {modalState && (
        <InfoModal
          title={modalState.title}
          description={modalState.description}
          onClose={closeModal}
        />
      )}

      {editingChunk && (
        <EditChunkModal
          draft={editDraft}
          onChange={setEditDraft}
          onClose={() => setEditingChunk(null)}
          onSave={handleSaveEdit}
        />
      )}

      {deleteChunkConfirm && (
        <DeleteChunkConfirmModal
          count={chunkSelections.size}
          onCancel={() => setDeleteChunkConfirm(false)}
          onConfirm={handleDeleteSelectedChunks}
        />
      )}

      {vectorDeleteChunkConfirm && (
        <DeleteChunkConfirmModal
          count={vectorChunkSelections.size}
          onCancel={() => setVectorDeleteChunkConfirm(false)}
          onConfirm={handleDeleteVectorChunks}
        />
      )}
    </div>
  )
}

function toMarkdownName(name = '') {
  if (!name) return '未命名.md'
  const lower = name.toLowerCase()
  if (lower.endsWith('.md')) return name
  const parts = name.split('.')
  if (parts.length === 1) return `${name}.md`
  parts[parts.length - 1] = 'md'
  return parts.join('.')
}

function buildMockChunks(docId, docName) {
  const template = Object.values(INITIAL_CHUNKS_BY_DOC || {})[0] || []
  if (!template.length) return []
  return template.map((chunk, index) => ({
    ...chunk,
    id: `${docId}-${index + 1}`,
    title: chunk.title || docName,
    content: chunk.content || '暂无切分内容',
    tokenStart: chunk.tokenStart ?? index * 500,
    tokenEnd: chunk.tokenEnd ?? (index + 1) * 500,
    tokenCount: chunk.tokenCount ?? 500,
    status: typeof chunk.status === 'number' ? chunk.status : 0
  }))
}
