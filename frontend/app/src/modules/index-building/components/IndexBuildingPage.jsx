import { useEffect, useMemo, useState } from 'react'
import { useSettingsStore } from '../../settings/SettingsStore.jsx'
import { useKnowledgeBaseStore } from '../../knowledge-base/KnowledgeBaseStore.jsx'
import { useSegmentationContext } from '../../document-segmentation/SegmentationStateProvider.jsx'
import { useDocumentLifecycle } from '../../knowledge-base/hooks/useDocumentLifecycle.js'
import { collectSavedModels } from '../../settings/modelUtils.js'
import {
  INDEX_BUILDING_TABS,
  INDEX_BUILDING_TAB_GROUPS,
  TASK_STATUS_LABELS,
  TASK_STATUS_STYLES
} from '../data/indexBuildingConstants.js'
import {
  TAG_POOL,
  GRAPH_TRIPLES,
  GRAPH_STATS,
  GRAPH_CHUNKS,
  STRUCTURED_FIELDS,
  STRUCTURED_ROWS,
  EXCEL_FIELDS,
  EXCEL_ROWS,
  EXPORT_PACKAGES,
  EXPORT_FIELDS,
  EXPORT_JOBS
} from '../data/indexBuildingMock.js'
import { TaskProgressModal } from './modals/IndexBuildingModals.jsx'
import { ExtractionEntryPage } from './pages/ExtractionEntryPage.jsx'
import { ExtractionResultsPage } from './pages/ExtractionResultsPage.jsx'
import { GraphExtractionPage } from './pages/GraphExtractionPage.jsx'
import { GraphAggregationPage } from './pages/GraphAggregationPage.jsx'
import { StructuredExtractionPage } from './pages/StructuredExtractionPage.jsx'
import { ExportCenterPage } from './pages/ExportCenterPage.jsx'
import { useExtractionTasksContext } from '../ExtractionTasksProvider.jsx'

export function IndexBuildingPage({ activeTab = 'extract-entry', onTabChange, onNavigateSettings, onRequestSegmentation }) {
  const { models } = useSettingsStore()
  const { activeKnowledgeBaseId } = useKnowledgeBaseStore()
  const availableIndexModels = useMemo(() => collectSavedModels(models, 'index-model'), [models])
  const { documents: segmentationDocs, chunksByDoc } = useSegmentationContext()
  const { documents: lifecycleDocuments } = useDocumentLifecycle(activeKnowledgeBaseId)

  const {
    tasks,
    activeTask,
    setActiveTaskId,
    progressTask,
    progressVisible,
    setProgressVisible,
    openProgress,
    createTask
  } = useExtractionTasksContext()

  const [aggregationSelection, setAggregationSelection] = useState(new Set())
  const [aggregated, setAggregated] = useState(false)
  const [detailBackTarget, setDetailBackTarget] = useState(null)

  const segmentedDocuments = useMemo(() => {
    if (!lifecycleDocuments?.length) {
      return (segmentationDocs || []).map((doc) => ({
        id: doc.id,
        name: doc.name,
        source: doc.source || '切分结果',
        updatedAt: doc.updatedAt,
        totalChunks: doc.totalChunks,
        status: doc.status
      }))
    }
    return lifecycleDocuments
      .filter((doc) => doc.status === '已解析')
      .map((doc) => ({
        id: doc.id,
        name: doc.name,
        source: doc.source || '解析链路',
        updatedAt: doc.updatedAt,
        totalChunks: doc.totalChunks,
        status: doc.segStatusKey || 'not_processed',
      segStatusLabel: doc.segStatusLabel,
      segStatusStyle: doc.segStatusStyle,
      indexStatusLabel: doc.indexStatusLabel,
      indexStatusStyle: doc.indexStatusStyle,
        indexStatusKey: doc.indexStatusKey
      }))
  }, [lifecycleDocuments, segmentationDocs])

  const segmentedChunksByDoc = useMemo(() => {
    const next = {}
    segmentedDocuments.forEach((doc) => {
      if (doc.status !== 'processed' && doc.status !== 'vectorized') return
      const chunks = chunksByDoc?.[doc.id] || []
      next[doc.id] = chunks.map((chunk) => ({
        id: chunk.id,
        title: chunk.title || `切片 ${chunk.id}`,
        content: chunk.content || '',
        tokenCount: chunk.tokenCount || 0,
        tags: buildChunkTags(chunk)
      }))
    })
    return next
  }, [segmentedDocuments, chunksByDoc])

  useEffect(() => {
    setAggregationSelection(new Set())
    setAggregated(false)
    setDetailBackTarget(null)
    setActiveTaskId(null)
  }, [activeKnowledgeBaseId, setActiveTaskId])

  const activeTabMeta = useMemo(() => {
    return INDEX_BUILDING_TABS.find((tab) => tab.id === activeTab) || INDEX_BUILDING_TABS[0]
  }, [activeTab])
  const activeGroup = useMemo(() => {
    return INDEX_BUILDING_TAB_GROUPS.find((group) => group.tabs.includes(activeTab)) || INDEX_BUILDING_TAB_GROUPS[0]
  }, [activeTab])

  const graphTasks = useMemo(
    () => tasks.filter((task) => task.type === 'graph'),
    [tasks]
  )
  const structuredTasks = useMemo(
    () => tasks.filter((task) => task.type === 'structured'),
    [tasks]
  )
  const completedGraphTasks = useMemo(
    () => tasks.filter((task) => task.type === 'graph' && task.status === 'completed'),
    [tasks]
  )

  const handleOpenTaskDetail = (task, originTab = null) => {
    setActiveTaskId(task.id)
    setDetailBackTarget(originTab)
    onTabChange?.(task.type === 'graph' ? 'graph-extraction' : 'structured-extraction')
  }

  const handleToggleAggregation = (taskId) => {
    setAggregationSelection((prev) => {
      const next = new Set(prev)
      if (next.has(taskId)) next.delete(taskId)
      else next.add(taskId)
      return next
    })
    setAggregated(false)
  }

  const handleSelectAllAggregation = () => {
    if (!completedGraphTasks.length) return
    setAggregationSelection(new Set(completedGraphTasks.map((task) => task.id)))
    setAggregated(false)
  }

  const handleClearAggregation = () => {
    setAggregationSelection(new Set())
    setAggregated(false)
  }

  const handleAggregate = () => {
    if (!aggregationSelection.size) return
    setAggregated(true)
  }

  const headerAction = (() => {
    if (activeTab === 'extract-entry') {
      return (
        <button
          type="button"
          onClick={() => onTabChange?.('extract-results')}
          className="kiveiv-btn-secondary"
        >
          查看抽取结果
        </button>
      )
    }
    if (activeTab === 'extract-results') {
      return (
        <button
          type="button"
          onClick={() => onTabChange?.('extract-entry')}
          className="kiveiv-btn-secondary"
        >
          返回抽取任务入口
        </button>
      )
    }
    if ((activeTab === 'graph-extraction' || activeTab === 'structured-extraction') && activeTask) {
      const target = detailBackTarget || activeTab
      const label = target === 'extract-results' ? '返回抽取结果' : '返回任务列表'
      return (
        <button
          type="button"
          onClick={() => {
            setActiveTaskId(null)
            if (target && target !== activeTab) {
              onTabChange?.(target)
            }
          }}
          className="kiveiv-btn-secondary"
        >
          {label}
        </button>
      )
    }
    return null
  })()

  return (
    <div className="kiveiv-stack-section">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{activeTabMeta.label}</h2>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">{activeTabMeta.description}</p>
          <p className="text-xs kiveiv-subtle">
            当前分组：{activeGroup.label} · {activeGroup.description}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden items-center gap-2 lg:flex">
            {INDEX_BUILDING_TAB_GROUPS.map((group) => {
              const active = group.id === activeGroup.id
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => onTabChange?.(group.tabs[0])}
                  className={`rounded-full border px-3 py-1 text-xs transition ${
                    active ? 'border-blue-500 text-blue-600' : 'border-gray-200 text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {group.label}
                </button>
              )
            })}
          </div>
          <select
            value={activeTab}
            onChange={(event) => onTabChange?.(event.target.value)}
            className="kiveiv-select h-10 min-w-[156px] text-xs"
            aria-label="索引构建视图切换"
          >
            {INDEX_BUILDING_TAB_GROUPS.map((group) => (
              <optgroup key={group.id} label={group.label}>
                {INDEX_BUILDING_TABS.filter((tab) => group.tabs.includes(tab.id)).map((tab) => (
                  <option key={tab.id} value={tab.id}>{tab.label}</option>
                ))}
              </optgroup>
            ))}
          </select>
          {headerAction && <div>{headerAction}</div>}
        </div>
      </header>

      {activeTab === 'extract-entry' && (
        <ExtractionEntryPage
          tasks={tasks}
          segmentedDocuments={segmentedDocuments}
          segmentedChunksByDoc={segmentedChunksByDoc}
          tagOptions={TAG_POOL}
          modelName={availableIndexModels[0] || '未配置'}
          modelOptions={availableIndexModels}
          hasModel={availableIndexModels.length > 0}
          onCreateTask={createTask}
          onGoResults={() => onTabChange?.('extract-results')}
          onNavigateSettings={() => onNavigateSettings?.('model-index')}
          onRequestSegmentation={onRequestSegmentation}
        />
      )}

      {activeTab === 'extract-results' && (
        <ExtractionResultsPage
          tasks={tasks}
          statusLabels={TASK_STATUS_LABELS}
          statusStyles={TASK_STATUS_STYLES}
          onOpenTaskDetail={(task) => handleOpenTaskDetail(task, 'extract-results')}
          onOpenProgress={openProgress}
        />
      )}

      {activeTab === 'graph-extraction' && (
        <GraphExtractionPage
          graphTasks={graphTasks}
          activeTask={activeTask}
          statusLabels={TASK_STATUS_LABELS}
          statusStyles={TASK_STATUS_STYLES}
          triples={GRAPH_TRIPLES}
          stats={GRAPH_STATS}
          chunks={GRAPH_CHUNKS}
          onSelectTask={(task) => handleOpenTaskDetail(task, 'graph-extraction')}
        />
      )}

      {activeTab === 'graph-aggregation' && (
        <GraphAggregationPage
          graphTasks={completedGraphTasks}
          selectedTaskIds={aggregationSelection}
          onToggleTask={handleToggleAggregation}
          onSelectAll={handleSelectAllAggregation}
          onClearSelection={handleClearAggregation}
          onAggregate={handleAggregate}
          aggregated={aggregated}
        />
      )}

      {activeTab === 'structured-extraction' && (
        <StructuredExtractionPage
          structuredTasks={structuredTasks}
          activeTask={activeTask}
          statusLabels={TASK_STATUS_LABELS}
          statusStyles={TASK_STATUS_STYLES}
          fields={activeTask?.fields?.length ? activeTask.fields : STRUCTURED_FIELDS}
          rows={STRUCTURED_ROWS}
          excelFields={EXCEL_FIELDS}
          excelRows={EXCEL_ROWS}
          onSelectTask={(task) => handleOpenTaskDetail(task, 'structured-extraction')}
        />
      )}

      {activeTab === 'export-center' && (
        <ExportCenterPage
          packages={EXPORT_PACKAGES}
          exportFields={EXPORT_FIELDS}
          exportJobs={EXPORT_JOBS}
        />
      )}

      {progressVisible && (
        <TaskProgressModal
          task={progressTask}
          onClose={() => setProgressVisible(false)}
        />
      )}
    </div>
  )
}


function buildChunkTags(chunk) {
  const tags = new Set()
  ;(chunk.contentTags || []).forEach((tag) => tag && tags.add(tag))
  if (chunk.userTag) tags.add(chunk.userTag)
  ;(chunk.systemTags || []).forEach((tag) => tag && tags.add(tag))
  return Array.from(tags)
}
