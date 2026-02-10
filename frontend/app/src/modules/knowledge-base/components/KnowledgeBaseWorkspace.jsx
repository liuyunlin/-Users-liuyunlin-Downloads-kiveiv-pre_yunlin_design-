import { useEffect, useMemo, useRef, useState } from 'react'
import { DocumentUpload } from '../../document-parsing/DocumentUpload.jsx'
import { DocumentList } from '../../document-parsing/DocumentList.jsx'
import { DocumentProcess } from '../../document-parsing/DocumentProcess.jsx'
import { DocumentViewer } from '../../document-parsing/DocumentViewer.jsx'
import { DocumentEditor } from '../../document-parsing/DocumentEditor.jsx'
import { buildSegmentsForDocument } from '../../document-parsing/sampleContent.js'
import { SegmentationPage, SEGMENTATION_FLOW_TABS } from '../../document-segmentation/index.js'
import { IndexBuildingPage, INDEX_BUILDING_TABS } from '../../index-building/index.js'
import { useDocumentStore } from '../../document-parsing/documentStore.jsx'
import { FileSystemPage } from './FileSystemPage.jsx'
import { useDocumentLifecycle } from '../hooks/useDocumentLifecycle.js'
import { useSegmentationContext } from '../../document-segmentation/SegmentationStateProvider.jsx'
import { useExtractionTasksContext } from '../../index-building/ExtractionTasksProvider.jsx'
import { INITIAL_CHUNKS_BY_DOC } from '../../document-segmentation/data/segmentationMock.js'
import { useSchemeStore } from '../../resource-library/SchemeStore.jsx'
import { SchemeEditorDrawer } from '../../resource-library/SchemeEditorDrawer.jsx'
import { SchemeConfirmDrawer } from './SchemeConfirmDrawer.jsx'
import { OverlayDrawer } from '../../shared/components/OverlayDrawer.jsx'

const DOCUMENT_SUBTABS = [
  { id: 'document-upload', label: '文档上传' },
  { id: 'document-processing', label: '文档解析' },
  { id: 'document-edit', label: '文档编辑' },
  { id: 'document-list', label: '文档列表' }
]

const INTERNAL_TABS = [
  { id: 'file-system', label: '文件系统' },
  { id: 'document-parsing', label: '文档解析', children: DOCUMENT_SUBTABS },
  { id: 'text-segmentation', label: '文本切分' },
  { id: 'index-building', label: '索引构建' }
]

const PROCESS_STEPS = [
  { id: 'upload', label: '导入', description: '上传文档' },
  { id: 'scheme', label: '方案', description: '按类型确认方案' },
  { id: 'parse', label: '解析', description: '开始解析并编辑判正' },
  { id: 'segment', label: '切分', description: '开始切分并查看结果' },
  { id: 'index', label: '索引', description: '抽取与结果管理' }
]

const DOC_OVERRIDE_STRATEGIES = [
  { id: '', label: '跟随方案（默认）' },
  { id: 'semantic', label: '语义边界切分（推荐）' },
  { id: 'structured', label: '结构化切分' }
]

const LLM_OPTIONS = ['gpt-4.1-mini', 'gpt-4.1', 'qwen-max', 'deepseek-chat']
const EMBEDDING_OPTIONS = ['text-embedding-3-small', 'text-embedding-3-large', 'bge-m3']

export function KnowledgeBaseWorkspace({
  knowledgeBase,
  entrySource = 'existing',
  onBack,
  onNavigateConfig,
  onNavigateOps,
  onUpdateKnowledgeBase,
  onNavigateResourceLibrary,
  resumeFromResourceLibrary,
  onResumeConsumed,
  onSetMainHeaderContent
}) {
  const [activeTab, setActiveTab] = useState(INTERNAL_TABS[0].id)
  const [activeDocumentTab, setActiveDocumentTab] = useState('document-list')
  const [activeSegmentationTab, setActiveSegmentationTab] = useState(SEGMENTATION_FLOW_TABS[0]?.id ?? 'seg-docs')
  const [activeIndexBuildingTab, setActiveIndexBuildingTab] = useState(INDEX_BUILDING_TABS[0]?.id ?? 'extract-entry')
  const [viewerDocument, setViewerDocument] = useState(null)
  const [editorDocument, setEditorDocument] = useState(null)
  const [processTargetDoc, setProcessTargetDoc] = useState(null)
  const [schemeConfirmOpen, setSchemeConfirmOpen] = useState(false)
  const [docOverrideEditor, setDocOverrideEditor] = useState({ open: false, docId: '' })
  const [docOverrideDraft, setDocOverrideDraft] = useState({ strategyId: '', llmModel: '', embeddingModel: '' })
  const [segResultDocId, setSegResultDocId] = useState(null)
  const [schemeDraftApply, setSchemeDraftApply] = useState({ fileType: '', schemeId: '' })
  const [schemeEditor, setSchemeEditor] = useState({ open: false, schemeId: null, mode: 'edit' })
  const [schemeConfirmedAt, setSchemeConfirmedAt] = useState('')
  const prevStageRef = useRef({
    uploadDone: false,
    parseDone: false,
    segmentDone: false,
    vectorDone: false
  })
  const noticeTimerRef = useRef(null)
  const toastTimerRef = useRef(new Map())
  const completedTaskRef = useRef(new Set())
  const autoSegKeyRef = useRef('')
  const autoVectorKeyRef = useRef('')
  const autoIndexKeyRef = useRef('')
  const manualFlowLockRef = useRef(false)
  const initializedBaseRef = useRef('')
  const [pipelineNotice, setPipelineNotice] = useState('')
  const [toasts, setToasts] = useState([])

  const {
    setActiveBaseId,
    setIsProgressVisible,
    documents,
    uploadQueue,
    setDocuments,
    startProcessing,
    ensureParsedContent
  } = useDocumentStore()
  const {
    documents: segDocuments,
    setDocuments: setSegDocuments,
    chunksByDoc,
    setChunksByDoc,
    vectorActive,
    segRun,
    vectorRun,
    setSegRun,
    setSegProgress,
    setSegProgressVisible,
    setSegActiveDocs,
    setVectorRun,
    setVectorActive,
    setVectorActiveDocId,
    setVectorActiveChunks,
    setVectorProgress,
    setVectorProgressVisible,
    startSegmentationProgress,
    startVectorProgress
  } = useSegmentationContext()
  const { openProgress, tasks, createTask, setTasks } = useExtractionTasksContext()
  const { documents: lifecycleDocuments } = useDocumentLifecycle(knowledgeBase?.id)
  const files = useMemo(() => lifecycleDocuments || [], [lifecycleDocuments])
  const { schemes, createScheme, duplicateScheme, updateScheme, getScheme, snapshotScheme } = useSchemeStore()

  useEffect(() => {
    if (!knowledgeBase?.id) return
    setActiveBaseId(knowledgeBase.id)
    completedTaskRef.current = new Set()
    setToasts([])
  }, [knowledgeBase?.id, setActiveBaseId])

  useEffect(() => {
    const baseId = knowledgeBase?.id || ''
    if (!baseId || initializedBaseRef.current === baseId) return
    initializedBaseRef.current = baseId
    if (entrySource === 'new') {
      setActiveTab('document-parsing')
      setActiveDocumentTab('document-upload')
      return
    }
    setActiveTab('file-system')
    setActiveDocumentTab('document-list')
  }, [knowledgeBase?.id, entrySource])

  const handleOpenDocument = (file) => {
    setActiveTab('document-parsing')
    setActiveDocumentTab('document-processing')
    setProcessTargetDoc({
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      status: file.status || '未解析'
    })
  }

  const handleViewParseProgress = (file) => {
    setActiveTab('document-parsing')
    setActiveDocumentTab('document-processing')
    setIsProgressVisible(true)
    setProcessTargetDoc({
      id: file.id,
      name: file.name,
      type: file.type,
      size: file.size,
      status: file.status || '解析中'
    })
  }

  const handleViewSegProgress = () => {
    setActiveTab('text-segmentation')
    setActiveSegmentationTab(SEGMENTATION_FLOW_TABS[0]?.id ?? 'seg-docs')
  }

  const handleViewIndexProgress = (taskId) => {
    if (!taskId) return
    setActiveTab('index-building')
    setActiveIndexBuildingTab(INDEX_BUILDING_TABS[1]?.id ?? 'extract-results')
    openProgress(taskId, knowledgeBase?.id)
  }

  const handleJumpSegmentation = () => {
    manualFlowLockRef.current = true
    setActiveTab('text-segmentation')
    setActiveSegmentationTab(SEGMENTATION_FLOW_TABS[0]?.id ?? 'seg-docs')
  }

  const handleJumpTagManagement = () => {
    manualFlowLockRef.current = true
    if (onNavigateOps) {
      onNavigateOps('seg-tags')
      return
    }
    setActiveTab('text-segmentation')
    setActiveSegmentationTab('seg-tags')
    pushPipelineNotice('已进入标签管理')
  }

  const handleJumpIndexBuilding = () => {
    manualFlowLockRef.current = true
    setActiveTab('index-building')
    setActiveIndexBuildingTab(INDEX_BUILDING_TABS[0]?.id ?? 'extract-entry')
  }

  const handleOpenEditorFromFile = (file) => {
    if (!file || file.status !== '已解析') return
    setDocuments((prev) =>
      prev.map((item) =>
        item.id === file.id
          ? {
              ...item,
              dataset: item.dataset || { basePath: '/auto' }
            }
          : item
      )
    )
    ensureParsedContent(file.id, () => buildSegmentsForDocument(file))
    setEditorDocument(file)
    setActiveTab('document-parsing')
    setActiveDocumentTab('document-edit')
  }

  const handleOpenEditorFromDocId = (docId) => {
    if (!docId) return
    const file = files.find((item) => item.id === docId)
    if (!file) return
    handleOpenEditorFromFile(file)
  }

  const handleOpenSegResultFromFile = (file) => {
    if (!file?.id) return
    setSegResultDocId(file.id)
    setActiveTab('text-segmentation')
    setActiveSegmentationTab('seg-results')
  }

  const activeOverrideDoc = useMemo(() => {
    if (!docOverrideEditor.open || !docOverrideEditor.docId) return null
    return documents.find((doc) => doc.id === docOverrideEditor.docId) || null
  }, [docOverrideEditor.open, docOverrideEditor.docId, documents])

  useEffect(() => {
    if (!docOverrideEditor.open || !activeOverrideDoc) return
    const overrides = activeOverrideDoc.pipelineOverrides || {}
    setDocOverrideDraft({
      strategyId: overrides?.segmentation?.strategyId || '',
      llmModel: overrides?.models?.llmModel || '',
      embeddingModel: overrides?.models?.embeddingModel || ''
    })
  }, [docOverrideEditor.open, activeOverrideDoc])

  const uploadDone = documents.length > 0 && uploadQueue.length === 0

  const resolveFileGroup = (docName = '') => {
    const ext = String(docName).split('.').pop()?.toLowerCase()
    if (ext === 'xls' || ext === 'xlsx') return 'excel'
    if (ext === 'doc' || ext === 'docx') return 'docx'
    if (ext === 'ppt' || ext === 'pptx') return 'ppt'
    if (ext === 'md' || ext === 'txt') return 'md'
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png') return 'image'
    return 'pdf'
  }

  const buildChunksForDoc = (doc, config) => {
    const seed = Math.abs(String(doc.id).split('').reduce((acc, ch) => acc + ch.charCodeAt(0), 0)) % 97
    const baseId = 1000 + seed * 10
    const title = String(doc.name || '').replace(/\.[^.]+$/, '')
    const chunkSize = config?.chunkSize || 800
    const overlap = config?.overlap || 0
    return Array.from({ length: 3 }, (_, index) => ({
      id: baseId + index + 1,
      sequence: index + 1,
      title: `${title} · 切片 ${index + 1}`,
      content: `基于方案切分生成的示例内容（${config?.strategyName || config?.strategyId || '切分'}）。`,
      tokenStart: index * Math.max(1, chunkSize - overlap),
      tokenEnd: index * Math.max(1, chunkSize - overlap) + chunkSize,
      tokenCount: chunkSize,
      status: index === 0 ? 1 : 0,
      isAtomic: false,
      atomicType: '-',
      contentTags: [],
      systemTags: [],
      userTag: ''
    }))
  }

  const startParsingFromSchemes = (selection) => {
    const baseId = knowledgeBase?.id
    if (!baseId) return
    const targetDocs = documents.filter((doc) => doc?.enabled !== false && doc.status === '未解析')
    if (!targetDocs.length) return

    const now = Date.now()
    const pad = (n) => String(n).padStart(2, '0')
    const ts = `${new Date(now).getFullYear()}-${pad(new Date(now).getMonth() + 1)}-${pad(new Date(now).getDate())} ${pad(new Date(now).getHours())}:${pad(new Date(now).getMinutes())}`
    setSchemeConfirmedAt(ts)

    setSchemeConfirmOpen(false)
    if (onUpdateKnowledgeBase) {
      const nextDefaultSchemeId = selection?.pdf
        || selection?.docx
        || selection?.ppt
        || selection?.md
        || selection?.excel
        || selection?.image
        || knowledgeBase?.defaultSchemeId
        || 'SCH-DEFAULT'
      onUpdateKnowledgeBase(baseId, {
        defaultSchemeId: nextDefaultSchemeId,
        schemeSelectionByFileType: { ...selection }
      })
    }
    const targetIds = targetDocs.map((doc) => doc.id)

    setDocuments((prev) =>
      prev.map((doc) => {
        if (!targetIds.includes(doc.id)) return doc
        const groupId = resolveFileGroup(doc.name)
        const schemeId = selection?.[groupId] || knowledgeBase?.defaultSchemeId || 'SCH-DEFAULT'
        const schemeSnapshot = snapshotScheme(schemeId)
        const overrides = doc.pipelineOverrides || {}
        const overrideSeg = overrides?.segmentation || null
        const baseSegConfig = schemeSnapshot?.pipelines?.segmentation?.byFileType?.[groupId] || null
        const segmentationConfig = baseSegConfig && overrideSeg?.strategyId
          ? {
              ...baseSegConfig,
              strategyId: overrideSeg.strategyId,
              strategyName: overrideSeg.strategyName || (DOC_OVERRIDE_STRATEGIES.find((item) => item.id === overrideSeg.strategyId)?.label || baseSegConfig.strategyName)
            }
          : baseSegConfig
        const baseIndexConfig = schemeSnapshot?.pipelines?.index || null
        const baseQaConfig = schemeSnapshot?.pipelines?.qa || null
        const overrideModels = overrides?.models || null
        const indexConfig = baseIndexConfig && overrideModels?.llmModel
          ? { ...baseIndexConfig, model: { ...(baseIndexConfig.model || {}), name: overrideModels.llmModel }, embeddingModel: overrideModels.embeddingModel || baseIndexConfig.embeddingModel }
          : (baseIndexConfig && overrideModels?.embeddingModel ? { ...baseIndexConfig, embeddingModel: overrideModels.embeddingModel } : baseIndexConfig)
        const qaConfig = baseQaConfig && overrideModels?.llmModel
          ? { ...baseQaConfig, model: { ...(baseQaConfig.model || {}), name: overrideModels.llmModel } }
          : baseQaConfig
        return {
          ...doc,
          schemeId,
          schemeName: schemeSnapshot?.name || schemeId,
          schemeSnapshotAt: schemeSnapshot?.snapshotAt || ts,
          fileGroup: groupId,
          parsingConfig: schemeSnapshot?.pipelines?.parsing || null,
          segmentationConfig,
          indexConfig,
          qaConfig,
          dataset: doc.dataset || { basePath: '/auto' }
        }
      })
    )

    startProcessing(targetIds, baseId)
    targetDocs.forEach((doc) => ensureParsedContent(doc.id, () => buildSegmentsForDocument(doc)))
    setIsProgressVisible(true)
    setActiveTab('document-parsing')
    setActiveDocumentTab('document-list')
    pushPipelineNotice(`已开始解析（${targetDocs.length} 个文件）`)
  }

  useEffect(() => {
    if (!resumeFromResourceLibrary?.baseId) return
    if (resumeFromResourceLibrary.baseId !== knowledgeBase?.id) return
    if (!resumeFromResourceLibrary.schemeId) {
      onResumeConsumed?.()
      return
    }
    if (onUpdateKnowledgeBase && resumeFromResourceLibrary.fileType) {
      onUpdateKnowledgeBase(knowledgeBase.id, {
        schemeSelectionByFileType: {
          ...(knowledgeBase.schemeSelectionByFileType || {}),
          [resumeFromResourceLibrary.fileType]: resumeFromResourceLibrary.schemeId
        }
      })
    }
    setSchemeConfirmOpen(true)
    onResumeConsumed?.()
  }, [resumeFromResourceLibrary, knowledgeBase?.id, knowledgeBase?.schemeSelectionByFileType, onUpdateKnowledgeBase, onResumeConsumed])

  const handleSeedDemoFlow = () => {
    const now = Date.now()
    const baseId = knowledgeBase?.id
    const demoDocs = [
      {
        id: 'DOC-001',
        name: '合同模板.md',
        type: 'MD',
        size: '1.2 MB',
        sourceType: '本地文件',
        parsePolicy: 'Pipeline',
        status: '已解析',
        progress: 100,
        enabled: true,
        updatedAt: now - 3600 * 1000,
        dataset: { basePath: '/auto' },
        tags: [{ key: '文档类型', value: '模板' }, { key: '来源', value: '内网' }]
      },
      {
        id: 'DOC-002',
        name: '交付规范.pdf',
        type: 'PDF',
        size: '2.8 MB',
        sourceType: '本地文件',
        parsePolicy: 'Pipeline',
        status: '已解析',
        progress: 100,
        enabled: true,
        updatedAt: now - 2 * 3600 * 1000,
        dataset: { basePath: '/auto' },
        tags: [{ key: '文档类型', value: '制度' }, { key: '来源', value: '外部' }]
      },
      {
        id: 'DOC-003',
        name: '项目说明书.docx',
        type: 'DOCX',
        size: '1.6 MB',
        sourceType: '本地文件',
        parsePolicy: 'Pipeline',
        status: '已解析',
        progress: 100,
        enabled: true,
        updatedAt: now - 5 * 3600 * 1000,
        dataset: { basePath: '/auto' },
        tags: [{ key: '来源', value: '内网' }, { key: '优先级', value: '高' }]
      },
      {
        id: 'DOC-004',
        name: '会议纪要.pdf',
        type: 'PDF',
        size: '0.8 MB',
        sourceType: '本地文件',
        parsePolicy: 'Pipeline',
        status: '解析中',
        progress: 48,
        enabled: true,
        updatedAt: now - 25 * 60 * 1000,
        tags: [{ key: '文档类型', value: '纪要' }]
      },
      {
        id: 'DOC-005',
        name: '供应商问答.doc',
        type: 'DOC',
        size: '1.1 MB',
        sourceType: '本地文件',
        parsePolicy: 'Pipeline',
        status: '未解析',
        progress: 0,
        enabled: true,
        updatedAt: now - 30 * 60 * 1000,
        tags: [{ key: '来源', value: '外部' }]
      }
    ]

    setDocuments(demoDocs)
    demoDocs
      .filter((doc) => doc.status === '已解析')
      .forEach((doc) => ensureParsedContent(doc.id, () => buildSegmentsForDocument(doc)))
    setIsProgressVisible(false)

    const segDocs = demoDocs
      .filter((doc) => doc.status === '已解析')
      .map((doc) => ({
        id: doc.id,
        name: doc.name.endsWith('.md') ? doc.name : `${doc.name.replace(/\.[^.]+$/, '')}.md`,
        status: doc.id === 'DOC-001' ? 'processed' : (doc.id === 'DOC-002' ? 'not_processed' : 'processing'),
        updatedAt: formatDateTime(new Date(now - 20 * 60 * 1000)),
        totalChunks: (INITIAL_CHUNKS_BY_DOC[doc.id] || []).length || 3,
        source: '解析链路'
      }))
    setSegDocuments(segDocs, baseId)
    setChunksByDoc((prev) => ({
      ...prev,
      'DOC-001': cloneChunks(INITIAL_CHUNKS_BY_DOC['DOC-001']),
      'DOC-002': cloneChunks(INITIAL_CHUNKS_BY_DOC['DOC-002']),
      'DOC-003': cloneChunks(INITIAL_CHUNKS_BY_DOC['DOC-001']).map((chunk, index) => ({
        ...chunk,
        id: 3001 + index,
        status: index === 0 ? 2 : 1,
        title: `项目切片 ${index + 1}`
      }))
    }), baseId)
    setSegRun(null, baseId)
    setSegProgress(0, baseId)
    setSegProgressVisible(false, baseId)
    setSegActiveDocs([], baseId)
    setVectorRun(null, baseId)
    setVectorActive(false, baseId)
    setVectorActiveDocId(null, baseId)
    setVectorActiveChunks([], baseId)
    setVectorProgress(0, baseId)
    setVectorProgressVisible(false, baseId)

    setTasks([
      {
        id: 'TASK-DEMO-RUN',
        name: '图谱抽取 · 合同模板',
        type: 'graph',
        source: 'segment',
        tags: ['合同', '风险'],
        model: 'gpt-4.1-mini',
        status: 'running',
        progress: 62,
        startedAt: now - 10 * 60 * 1000,
        durationMs: 20 * 60 * 1000,
        createdAt: formatDateTime(new Date(now - 15 * 60 * 1000)),
        updatedAt: formatDateTime(new Date(now - 5 * 60 * 1000)),
        docName: '合同模板.md',
        chunkCount: 12,
        resultCount: 18,
        selection: { docIds: ['DOC-001'] },
        fields: []
      },
      {
        id: 'TASK-DEMO-DONE',
        name: '结构化抽取 · 交付规范',
        type: 'structured',
        source: 'segment',
        tags: ['交付', '验收'],
        model: 'gpt-4.1-mini',
        status: 'completed',
        progress: 100,
        startedAt: now - 30 * 60 * 1000,
        durationMs: 15 * 60 * 1000,
        createdAt: formatDateTime(new Date(now - 30 * 60 * 1000)),
        updatedAt: formatDateTime(new Date(now - 12 * 60 * 1000)),
        docName: '交付规范.pdf',
        chunkCount: 16,
        resultCount: 42,
        selection: { docIds: ['DOC-002'] },
        fields: ['合同主体', '付款节点', '验收标准']
      }
    ], baseId)

    setPipelineNotice('已注入全流程演示数据：可直接演示上传/解析/切分结果/编辑器/向量化/索引。')
    setActiveTab('file-system')
  }

  const processStepIndex = (() => {
    if (schemeConfirmOpen) return 1
    if (activeTab === 'document-parsing') {
      return activeDocumentTab === 'document-upload' ? 0 : 2
    }
    if (activeTab === 'text-segmentation') return 3
    if (activeTab === 'index-building') return 4
    return 0
  })()

  const docTotal = documents.length
  const uploadingCount = uploadQueue.length
  const parsingCount = documents.filter((doc) => doc.status === '解析中').length
  const parsedCount = documents.filter((doc) => doc.status === '已解析').length
  const unparsedCount = documents.filter((doc) => doc.status === '未解析').length

  const segTotal = segDocuments.length
  const segProcessing = segDocuments.filter((doc) => doc.status === 'processing').length
  const segProcessed = segDocuments.filter((doc) => doc.status === 'processed').length
  const segError = segDocuments.filter((doc) => doc.status === 'error').length
  const schemeReady = docTotal > 0 && uploadingCount === 0
  const schemeDone = Boolean(schemeConfirmedAt)
  const indexRunning = tasks.some((task) => task.status === 'running' && task.progress < 100)
  const indexCompleted = tasks.some((task) => task.status === 'completed')

  const stepsMeta = [
    {
      id: 'upload',
      status: uploadingCount > 0 ? 'doing' : docTotal > 0 ? 'done' : 'idle',
      summary: uploadingCount > 0 ? `上传中 ${uploadingCount} 个` : docTotal > 0 ? `已上传 ${docTotal} 个` : '暂无文档',
      hint: docTotal > 0 ? '可继续上传或进入方案确认' : '先上传文档开始流程',
      onClick: () => {
        setActiveTab('document-parsing')
        setActiveDocumentTab('document-upload')
      }
    },
    {
      id: 'scheme',
      status: schemeDone ? 'done' : schemeReady ? 'ready' : docTotal > 0 ? 'blocked' : 'idle',
      summary: schemeDone ? `已确认 ${schemeConfirmedAt}` : schemeReady ? '待确认方案' : '未准备',
      hint: schemeReady ? '按文件类型确认方案后开始解析' : docTotal > 0 ? '等待上传完成' : '先上传文档',
      onClick: () => {
        setActiveTab('document-parsing')
        setActiveDocumentTab('document-upload')
        if (schemeReady) setSchemeConfirmOpen(true)
      }
    },
    {
      id: 'parse',
      status: parsingCount > 0 ? 'doing' : parsedCount > 0 ? 'done' : schemeDone ? 'ready' : 'blocked',
      summary: parsingCount > 0 ? `解析中 ${parsingCount} 个` : parsedCount > 0 ? `已解析 ${parsedCount}/${docTotal}` : '未解析',
      hint: schemeDone ? (unparsedCount > 0 ? '开始解析并在列表中编辑判正' : '解析已完成，可进入切分') : '需先完成方案确认',
      onClick: () => {
        setActiveTab('document-parsing')
        setActiveDocumentTab('document-list')
      }
    },
    {
      id: 'segment',
      status: segProcessing > 0 ? 'doing' : segProcessed > 0 ? 'done' : parsedCount > 0 ? 'ready' : 'blocked',
      summary: segProcessing > 0 ? `切分中 ${segProcessing} 个` : segProcessed > 0 ? `已完成 ${segProcessed}/${segTotal}` : '未切分',
      hint: parsedCount > 0 ? '进入文本切分开始切分并查看结果' : '需先完成解析与编辑判正',
      onClick: () => {
        setActiveTab('text-segmentation')
        setActiveSegmentationTab(SEGMENTATION_FLOW_TABS[0]?.id ?? 'seg-docs')
      }
    },
    {
      id: 'index',
      status: indexRunning ? 'doing' : indexCompleted ? 'done' : segProcessed > 0 ? 'ready' : 'blocked',
      summary: indexRunning ? '索引任务进行中' : indexCompleted ? '已生成抽取结果' : '未开始',
      hint: segProcessed > 0 ? '进入索引构建管理抽取任务与结果' : '需先完成切分',
      onClick: () => {
        setActiveTab('index-building')
        setActiveIndexBuildingTab(INDEX_BUILDING_TABS[0]?.id ?? 'extract-entry')
      }
    }
  ]

  const nextAction = (() => {
    const blockedStep = stepsMeta.find((step) => step.status === 'blocked')
    if (blockedStep) {
      return { title: '流程受阻', message: blockedStep.hint }
    }
    const readyStep = stepsMeta.find((step) => step.status === 'ready' || step.status === 'idle')
    if (readyStep) {
      return { title: '下一步建议', message: readyStep.hint }
    }
    const activeStep = stepsMeta.find((step) => step.status === 'doing')
    if (activeStep) {
      return { title: '处理中', message: activeStep.summary }
    }
    return { title: '流程完成', message: '全部步骤已完成，可前往问答模块使用。' }
  })()

  const pushPipelineNotice = (message) => {
    if (!message) return
    setPipelineNotice(message)
    if (noticeTimerRef.current) {
      window.clearTimeout(noticeTimerRef.current)
    }
    noticeTimerRef.current = window.setTimeout(() => {
      setPipelineNotice('')
      noticeTimerRef.current = null
    }, 2600)
  }

  const pushToast = (title, description = '') => {
    const id = `toast-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`
    setToasts((prev) => [...prev.slice(-2), { id, title, description }])
    const timer = window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id))
      toastTimerRef.current.delete(id)
    }, 2800)
    toastTimerRef.current.set(id, timer)
  }

  useEffect(() => {
    if (segProcessing > 0) return
    if (!segProcessed) return
    if (activeTab !== 'text-segmentation') return
    if (activeSegmentationTab !== (SEGMENTATION_FLOW_TABS[0]?.id ?? 'seg-docs')) return
    setActiveSegmentationTab('seg-results')
    pushPipelineNotice('切分完成，可在结果页查看与编辑切片')
  }, [segProcessing, segProcessed, activeTab, activeSegmentationTab])

  useEffect(() => {
    const finished = tasks.filter((task) => task.status === 'completed')
    finished.forEach((task) => {
      if (completedTaskRef.current.has(task.id)) return
      completedTaskRef.current.add(task.id)
      pushToast('任务已完成', `${task.name || task.id} 已完成，可查看结果。`)
    })
  }, [tasks])

  useEffect(() => {
    return () => {
      if (noticeTimerRef.current) {
        window.clearTimeout(noticeTimerRef.current)
      }
      toastTimerRef.current.forEach((timer) => window.clearTimeout(timer))
      toastTimerRef.current.clear()
    }
  }, [])

  const hideFlowHeader = activeTab === 'document-parsing' && activeDocumentTab === 'document-edit'

  useEffect(() => {
    if (!onSetMainHeaderContent) return undefined

    onSetMainHeaderContent(
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-9 w-9 items-center justify-center rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)]"
            title="返回知识库列表"
            aria-label="返回知识库列表"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <div className="min-w-0">
            <p className="text-xs uppercase tracking-wide text-gray-400">知识库</p>
            <p className="truncate text-base font-medium text-gray-900">{knowledgeBase?.name || '未选中'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === 'file-system' && (
            <button
              type="button"
              onClick={handleSeedDemoFlow}
              className="kiveiv-btn-secondary h-10 px-3 text-xs"
            >
              注入全流程 Mock 数据
            </button>
          )}
          <button
            type="button"
            onClick={() => onNavigateConfig?.()}
            className="kiveiv-btn-secondary h-10 px-3 text-xs"
          >
            资源库
          </button>
        </div>
      </div>
    )

    return () => {
      onSetMainHeaderContent(null)
    }
  }, [onSetMainHeaderContent, knowledgeBase?.id, knowledgeBase?.name, onBack, activeTab, onNavigateConfig, handleSeedDemoFlow])

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex min-h-0 flex-1 flex-col page-shell">
        {!hideFlowHeader && (
        <section className="mb-5">
          <div className="kiveiv-flow-wrap">
            {PROCESS_STEPS.map((step, index) => {
              const meta = stepsMeta[index]
              const isDone = index < processStepIndex
              const isCurrent = index === processStepIndex
              const flowVariant = isDone ? 'done' : isCurrent ? 'current' : 'upcoming'
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={meta?.onClick}
                  className={`kiveiv-flow-step ${index === 0 ? 'kiveiv-flow-step-first' : ''} ${index === PROCESS_STEPS.length - 1 ? 'kiveiv-flow-step-last' : ''} kiveiv-flow-${flowVariant}`}
                >
                  <span className="kiveiv-flow-index">{index + 1}</span>
                  <span className="kiveiv-flow-content">
                    <span className="kiveiv-flow-title">{step.label}</span>
                    <span className="kiveiv-flow-desc">{meta?.summary || step.description}</span>
                  </span>
                </button>
              )
            })}
          </div>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{nextAction.message}</p>
          </div>
          {pipelineNotice && (
            <div className="mt-3 rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface)] px-3 py-2 text-xs text-[var(--kiveiv-text-muted)]">
              {pipelineNotice}
            </div>
          )}
        </section>
        )}

        {activeTab === 'file-system' && (
          <FileSystemPage
            files={files}
            onUpdateFile={(fileId, patch) => {
              if (!fileId || !patch) return
              setDocuments((prev) =>
                prev.map((item) => {
                  if (item.id !== fileId) return item
                  const resolvedPatch = typeof patch === 'function' ? patch(item) : patch
                  return { ...item, ...resolvedPatch, updatedAt: formatDateTime(new Date()) }
                })
              )
            }}
            onDeleteDocuments={(ids) => {
              if (!ids?.length) return
              const idSet = new Set(ids)
              setDocuments((prev) => prev.filter((item) => !idSet.has(item.id)))
            }}
            onOpenDocument={handleOpenDocument}
            onViewProgress={handleViewParseProgress}
            onViewSegProgress={handleViewSegProgress}
            onViewIndexProgress={handleViewIndexProgress}
            onJumpSegmentation={handleJumpSegmentation}
            onJumpIndexBuilding={handleJumpIndexBuilding}
            onJumpTagManagement={handleJumpTagManagement}
            onModifyConfig={(doc) => {
              if (!doc?.id) return
              setDocOverrideEditor({ open: true, docId: doc.id })
            }}
            onEditDocument={handleOpenEditorFromFile}
            onViewSegResults={handleOpenSegResultFromFile}
            onCreate={() => {
              setActiveTab('document-parsing')
              setActiveDocumentTab('document-upload')
            }}
            onCreateGraphImport={() => {
              setActiveTab('index-building')
              setActiveIndexBuildingTab('graph-extraction')
              pushToast('已进入图谱导入通道', '请在图结构抽取页上传三元组或关系数据。')
            }}
          />
        )}

        {activeTab === 'document-parsing' && (
          <>
            {activeDocumentTab === 'document-upload' ? (
              <div className="kiveiv-stack-section">
                <DocumentUpload onStartParse={() => setSchemeConfirmOpen(true)} />
              </div>
            ) : activeDocumentTab === 'document-processing' ? (
              <DocumentProcess
                onBack={() => setActiveDocumentTab('document-list')}
                onContinueUpload={() => setActiveDocumentTab('document-upload')}
                onNavigateSettings={(tabId) => {
                  onNavigateConfig?.(tabId || 'model-layout')
                  if (tabId) setActiveDocumentTab('document-list')
                }}
                initialSelection={processTargetDoc}
                onInitialSelectionConsumed={() => setProcessTargetDoc(null)}
              />
            ) : activeDocumentTab === 'document-list' ? (
              <div className="kiveiv-stack-section">
                {schemeDone && parsedCount > 0 && (
                  <section className="kiveiv-card p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--kiveiv-text)]">解析完成</h3>
                        <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">下一步：进入切分阶段开始切分；“查看结果”将回到编辑器继续修订。</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab('text-segmentation')
                          setActiveSegmentationTab(SEGMENTATION_FLOW_TABS[0]?.id ?? 'seg-docs')
                        }}
                        className="kiveiv-btn-primary h-9 px-3 text-xs"
                      >
                        进入切分
                      </button>
                    </div>
                  </section>
                )}
                <DocumentList
                  onViewDocument={(doc) => {
                    setViewerDocument(doc)
                    setActiveDocumentTab('document-viewer')
                  }}
                  onParseDocument={() => setSchemeConfirmOpen(true)}
                  onEditDocument={(doc) => {
                    setEditorDocument(doc)
                    setActiveDocumentTab('document-edit')
                  }}
                />
              </div>
            ) : activeDocumentTab === 'document-viewer' ? (
              <DocumentViewer
                document={viewerDocument}
                onBack={() => {
                  setActiveDocumentTab('document-list')
                  setViewerDocument(null)
                }}
              />
            ) : activeDocumentTab === 'document-edit' ? (
              <DocumentEditor
                document={editorDocument}
                onBack={() => {
                  setActiveDocumentTab('document-list')
                  setEditorDocument(null)
                }}
              />
            ) : (
              <div className="flex min-h-[320px] flex-col items-center justify-center rounded-lg border border-dashed border-gray-200 bg-gray-50 text-center">
                <h2 className="text-xl font-semibold text-gray-900">文档解析</h2>
                <p className="kiveiv-gap-title-body text-sm text-gray-500">模块内容敬请期待</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'text-segmentation' && (
          <SegmentationPage
            activeTab={activeSegmentationTab}
            onTabChange={setActiveSegmentationTab}
            tabOptions={SEGMENTATION_FLOW_TABS}
            onNavigateSettings={(tabId) => {
              onNavigateConfig?.(tabId || 'model-layout')
            }}
            openResultDocId={segResultDocId}
            onOpenResultConsumed={() => setSegResultDocId(null)}
          />
        )}

        {activeTab === 'index-building' && (
          <IndexBuildingPage
            activeTab={activeIndexBuildingTab}
            onTabChange={setActiveIndexBuildingTab}
            onNavigateSettings={(tabId) => {
              onNavigateConfig?.(tabId || 'model-layout')
            }}
              onRequestSegmentation={() => {
                setActiveTab('text-segmentation')
                setActiveSegmentationTab(SEGMENTATION_FLOW_TABS[0]?.id ?? 'seg-docs')
              }}
          />
        )}
      </div>

      <SchemeConfirmDrawer
        open={schemeConfirmOpen}
        knowledgeBase={knowledgeBase}
        schemes={schemes}
        documents={documents}
        onClose={() => setSchemeConfirmOpen(false)}
        onConfirm={(selection) => startParsingFromSchemes(selection)}
        onEditScheme={({ schemeId, fileType }) => {
          if (!schemeId) return
          const nextId = duplicateScheme?.(schemeId)
          if (!nextId) return
          setSchemeDraftApply({ fileType: fileType || '', schemeId: nextId })
          setSchemeEditor({ open: true, schemeId: nextId, mode: 'create' })
        }}
        onCreateScheme={() => {
          const id = createScheme({ name: `${knowledgeBase?.name || '知识库'} - 新方案` })
          if (id) {
            setSchemeDraftApply({ fileType: '', schemeId: id })
            setSchemeEditor({ open: true, schemeId: id, mode: 'create' })
          }
        }}
        onNavigateLibrary={(payload) => {
          const baseId = knowledgeBase?.id
          if (!baseId) return
          onNavigateResourceLibrary?.({
            baseId,
            step: 'scheme',
            fileType: payload?.fileType || '',
            schemeId: payload?.schemeId || ''
          })
        }}
      />

      <OverlayDrawer
        open={docOverrideEditor.open}
        title="修改配置（可选）"
        description="留空表示跟随下一步「方案中心」的配置；只对后续新任务生效。"
        widthClassName="max-w-lg"
        onClose={() => setDocOverrideEditor({ open: false, docId: '' })}
        footer={(
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setDocOverrideDraft({ strategyId: '', llmModel: '', embeddingModel: '' })
              }}
              className="kiveiv-btn-secondary"
            >
              清除自定义
            </button>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setDocOverrideEditor({ open: false, docId: '' })}
                className="kiveiv-btn-secondary"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => {
                  const docId = docOverrideEditor.docId
                  if (!docId) return
                  const next = {
                    strategyId: docOverrideDraft.strategyId || '',
                    llmModel: docOverrideDraft.llmModel || '',
                    embeddingModel: docOverrideDraft.embeddingModel || ''
                  }
                  const hasAny = Boolean(next.strategyId || next.llmModel || next.embeddingModel)
                  const strategyName = next.strategyId
                    ? (DOC_OVERRIDE_STRATEGIES.find((item) => item.id === next.strategyId)?.label || next.strategyId)
                    : ''
                  setDocuments((prev) =>
                    prev.map((doc) => {
                      if (doc.id !== docId) return doc
                      const pipelineOverrides = hasAny
                        ? {
                            segmentation: next.strategyId ? { strategyId: next.strategyId, strategyName } : undefined,
                            models: (next.llmModel || next.embeddingModel) ? { llmModel: next.llmModel || '', embeddingModel: next.embeddingModel || '' } : undefined
                          }
                        : undefined

                      const segmentationConfig = doc.segmentationConfig && next.strategyId
                        ? { ...doc.segmentationConfig, strategyId: next.strategyId, strategyName }
                        : doc.segmentationConfig

                      const indexConfig = doc.indexConfig && (next.llmModel || next.embeddingModel)
                        ? {
                            ...doc.indexConfig,
                            ...(next.embeddingModel ? { embeddingModel: next.embeddingModel } : {}),
                            ...(next.llmModel ? { model: { ...(doc.indexConfig.model || {}), name: next.llmModel } } : {})
                          }
                        : doc.indexConfig

                      const qaConfig = doc.qaConfig && next.llmModel
                        ? { ...doc.qaConfig, model: { ...(doc.qaConfig.model || {}), name: next.llmModel } }
                        : doc.qaConfig

                      const cleaned = {}
                      if (pipelineOverrides?.segmentation) cleaned.segmentation = pipelineOverrides.segmentation
                      if (pipelineOverrides?.models) cleaned.models = pipelineOverrides.models

                      const nextDoc = {
                        ...doc,
                        segmentationConfig,
                        indexConfig,
                        qaConfig,
                        updatedAt: typeof doc.updatedAt === 'string' ? formatDateTime(Date.now()) : Date.now()
                      }
                      if (Object.keys(cleaned).length) {
                        return { ...nextDoc, pipelineOverrides: cleaned }
                      }
                      const { pipelineOverrides: _pipelineOverrides, ...rest } = nextDoc
                      return rest
                    })
                  )
                  setDocOverrideEditor({ open: false, docId: '' })
                }}
                className="kiveiv-btn-primary"
              >
                保存
              </button>
            </div>
          </div>
        )}
      >
        <div className="space-y-4">
          <div className="rounded-[var(--kiveiv-radius-inner)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-3 py-2 text-xs text-[var(--kiveiv-text-muted)]">
            当前文档：<span className="font-semibold text-[var(--kiveiv-text)]">{activeOverrideDoc?.name || '--'}</span>
            <span className="ml-2 text-[11px] text-[var(--kiveiv-text-subtle)]">ID: {activeOverrideDoc?.id || '--'}</span>
          </div>

          <label className="kiveiv-form-row">
            <span className="text-xs font-semibold kiveiv-muted">切分方式</span>
            <select
              value={docOverrideDraft.strategyId}
              onChange={(event) => setDocOverrideDraft((prev) => ({ ...prev, strategyId: event.target.value }))}
              className="kiveiv-select mt-2 w-full"
            >
              {DOC_OVERRIDE_STRATEGIES.map((item) => (
                <option key={item.id || '__default__'} value={item.id}>{item.label}</option>
              ))}
            </select>
            <span className="mt-2 block text-[11px] text-[var(--kiveiv-text-subtle)]">
              不选择则跟随方案中心：按文件类型使用对应策略。
            </span>
          </label>

          <div className="grid gap-3 md:grid-cols-2">
            <label className="kiveiv-form-row">
              <span className="text-xs font-semibold kiveiv-muted">问答模型</span>
              <select
                value={docOverrideDraft.llmModel}
                onChange={(event) => setDocOverrideDraft((prev) => ({ ...prev, llmModel: event.target.value }))}
                className="kiveiv-select mt-2 w-full"
              >
                <option value="">跟随方案（默认）</option>
                {LLM_OPTIONS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
            <label className="kiveiv-form-row">
              <span className="text-xs font-semibold kiveiv-muted">向量模型</span>
              <select
                value={docOverrideDraft.embeddingModel}
                onChange={(event) => setDocOverrideDraft((prev) => ({ ...prev, embeddingModel: event.target.value }))}
                className="kiveiv-select mt-2 w-full"
              >
                <option value="">跟随方案（默认）</option>
                {EMBEDDING_OPTIONS.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </OverlayDrawer>

      {schemeEditor.open && schemeEditor.schemeId && (
        <SchemeEditorDrawer
          open={schemeEditor.open}
          scheme={getScheme(schemeEditor.schemeId)}
          mode={schemeEditor.mode}
          onClose={() => setSchemeEditor({ open: false, schemeId: null, mode: 'edit' })}
          onSave={(payload) => {
            updateScheme(schemeEditor.schemeId, payload)
            if (onUpdateKnowledgeBase && schemeDraftApply.schemeId) {
              const baseId = knowledgeBase?.id
              if (baseId) {
                const fileType = schemeDraftApply.fileType
                const nextSelection = {
                  ...(knowledgeBase?.schemeSelectionByFileType || {}),
                  ...(fileType ? { [fileType]: schemeDraftApply.schemeId } : {})
                }
                onUpdateKnowledgeBase(baseId, {
                  schemeSelectionByFileType: nextSelection,
                  defaultSchemeId: schemeDraftApply.schemeId || knowledgeBase?.defaultSchemeId || 'SCH-DEFAULT'
                })
              }
            }
            setSchemeDraftApply({ fileType: '', schemeId: '' })
            setSchemeEditor({ open: false, schemeId: null, mode: 'edit' })
          }}
        />
      )}

      {toasts.length > 0 && (
        <div className="kiveiv-toast-stack" aria-live="polite" aria-atomic="true">
          {toasts.map((toast) => (
            <div key={toast.id} className="kiveiv-toast">
              <p className="kiveiv-toast-title">{toast.title}</p>
              {toast.description ? <p className="kiveiv-toast-desc">{toast.description}</p> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function cloneChunks(chunks = []) {
  return JSON.parse(JSON.stringify(chunks))
}

function formatDateTime(value) {
  const date = new Date(value)
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}
