import { INITIAL_CHUNKS_BY_DOC, INITIAL_SYSTEM_TAGS, INITIAL_TAG_STATS } from '../modules/document-segmentation/data/segmentationMock.js'

const DEMO_SEED_VERSION = '2026-02-07-flow-v1'
const INDEX_VERSION = 'v2'

const deepClone = (value) => JSON.parse(JSON.stringify(value))

const DEMO_BASES = [
  {
    id: 'KB-DEMO-001',
    name: '合同与交付演示库',
    description: '用于演示上传-解析-切分-索引-问答全链路。',
    owner: 'demo-owner',
    visibility: '团队',
    pinned: true,
    coverPreset: 'sky',
    llmModel: 'gpt-4.1-mini',
    embeddingModel: 'text-embedding-3-small',
    parseMethod: 'chunk',
    chunkRule: 'paragraph',
    chunkPreset: 'default',
    modelParagraphDetection: true,
    maxParagraphDepth: 3,
    maxChunkSize: 1200,
    splitLength: 800,
    indexSize: 64,
    qaMinScore: 0.72,
    qaMaxPairs: 40,
    qaExtractTables: true,
    layoutMode: 'vertical',
    vectorModel: 'text-embedding-3-small',
    indexMode: 'hybrid',
    defaultTopK: 6,
    updatedAt: '2026-02-07 10:20',
    typeLabel: '通用知识库'
  },
  {
    id: 'KB-DEMO-002',
    name: '政策问答演示库',
    description: '用于演示问答对提取和外搜联动。',
    owner: 'demo-owner',
    visibility: '私有',
    pinned: false,
    coverPreset: 'mint',
    llmModel: 'gpt-4.1',
    embeddingModel: 'text-embedding-3-large',
    parseMethod: 'qa',
    chunkRule: 'module',
    chunkPreset: 'custom',
    modelParagraphDetection: true,
    maxParagraphDepth: 4,
    maxChunkSize: 1000,
    splitLength: 700,
    indexSize: 96,
    qaMinScore: 0.78,
    qaMaxPairs: 60,
    qaExtractTables: false,
    layoutMode: 'horizontal',
    vectorModel: 'text-embedding-3-large',
    indexMode: 'graph',
    defaultTopK: 8,
    updatedAt: '2026-02-07 10:18',
    typeLabel: '行业知识库'
  }
]

const DEMO_FILES_BY_BASE = {
  'KB-DEMO-001': [
    {
      id: 'DOC-001',
      name: '合同模板.md',
      mode: 'Pipeline',
      size: '1.2 MB',
      updatedAt: '2026-02-07 10:00',
      status: '已解析',
      enabled: true,
      type: 'MD',
      sourceType: '本地文件',
      parsePolicy: '自动识别（推荐）',
      tags: [{ key: '文档类型', value: '模板' }, { key: '来源', value: '内网' }]
    },
    {
      id: 'DOC-002',
      name: '交付规范.pdf',
      mode: 'Pipeline',
      size: '2.8 MB',
      updatedAt: '2026-02-07 10:05',
      status: '已解析',
      enabled: true,
      type: 'PDF',
      sourceType: '本地文件',
      parsePolicy: '自动识别（推荐）',
      tags: [{ key: '文档类型', value: '规范' }]
    },
    {
      id: 'DOC-003',
      name: '项目说明书.docx',
      mode: 'Pipeline',
      size: '3.1 MB',
      updatedAt: '2026-02-07 10:09',
      status: '解析中',
      enabled: true,
      type: 'DOCX',
      sourceType: '本地文件',
      parsePolicy: '自动识别（推荐）',
      tags: [{ key: '来源', value: '外部' }]
    },
    {
      id: 'DOC-004',
      name: '运维手册.pdf',
      mode: 'Pipeline',
      size: '2.4 MB',
      updatedAt: '2026-02-07 10:12',
      status: '未解析',
      enabled: true,
      type: 'PDF',
      sourceType: '本地文件',
      parsePolicy: '自动识别（推荐）',
      tags: []
    }
  ],
  'KB-DEMO-002': [
    {
      id: 'DOC-101',
      name: '政策汇编.pdf',
      mode: 'Pipeline',
      size: '4.2 MB',
      updatedAt: '2026-02-07 10:15',
      status: '已解析',
      enabled: true,
      type: 'PDF',
      sourceType: '本地文件',
      parsePolicy: '问答对提取',
      tags: [{ key: '来源', value: '公开' }]
    }
  ]
}

const DEMO_SEGMENTATION_BY_BASE = {
  'KB-DEMO-001': {
    documents: [
      { id: 'DOC-001', name: '合同模板.md', status: 'processed', updatedAt: '2026-02-07 10:03' },
      { id: 'DOC-002', name: '交付规范.pdf', status: 'processing', updatedAt: '2026-02-07 10:06' },
      { id: 'DOC-003', name: '项目说明书.docx', status: 'not_processed', updatedAt: '2026-02-07 10:09' },
      { id: 'DOC-004', name: '运维手册.pdf', status: 'error', updatedAt: '2026-02-07 10:12' }
    ],
    chunksByDoc: deepClone(INITIAL_CHUNKS_BY_DOC),
    tagPool: deepClone(INITIAL_TAG_STATS.map((item) => item.tag)),
    systemTagPool: deepClone(INITIAL_SYSTEM_TAGS),
    segProgress: 42,
    segProgressVisible: true,
    segActiveDocs: ['DOC-002'],
    segRun: { docIds: ['DOC-002'], startedAt: Date.now() - 4 * 60 * 1000 },
    vectorProgress: 68,
    vectorProgressVisible: false,
    vectorActive: false,
    vectorActiveDocId: null,
    vectorActiveChunks: [],
    vectorRun: null
  },
  'KB-DEMO-002': {
    documents: [{ id: 'DOC-101', name: '政策汇编.pdf', status: 'processed', updatedAt: '2026-02-07 10:15' }],
    chunksByDoc: { 'DOC-101': [] },
    tagPool: ['政策', '合规', '监管'],
    systemTagPool: deepClone(INITIAL_SYSTEM_TAGS),
    segProgress: 0,
    segProgressVisible: false,
    segActiveDocs: [],
    segRun: null,
    vectorProgress: 0,
    vectorProgressVisible: false,
    vectorActive: false,
    vectorActiveDocId: null,
    vectorActiveChunks: [],
    vectorRun: null
  }
}

const DEMO_INDEX_TASKS_BY_BASE = {
  'KB-DEMO-001': [
    {
      id: 'ET-DEMO-001',
      name: '合同模板索引构建',
      type: 'index',
      source: 'chunks',
      tags: ['合同', '模板'],
      model: 'gpt-4.1-mini',
      method: 'hybrid',
      selection: { docIds: ['DOC-001'] },
      status: 'completed',
      progress: 100,
      createdAt: '2026-02-07 10:02',
      updatedAt: '2026-02-07 10:04',
      docName: '合同模板.md',
      chunkCount: 24,
      resultCount: 186,
      fields: []
    },
    {
      id: 'ET-DEMO-002',
      name: '交付规范索引构建',
      type: 'index',
      source: 'chunks',
      tags: ['交付', '规范'],
      model: 'gpt-4.1-mini',
      method: 'hybrid',
      selection: { docIds: ['DOC-002'] },
      status: 'running',
      progress: 45,
      startedAt: Date.now() - 3 * 60 * 1000,
      durationMs: 26_000,
      createdAt: '2026-02-07 10:05',
      updatedAt: '2026-02-07 10:09',
      docName: '交付规范.pdf',
      chunkCount: 31,
      resultCount: 0,
      fields: []
    }
  ],
  'KB-DEMO-002': [
    {
      id: 'ET-DEMO-101',
      name: '政策问答索引',
      type: 'index',
      source: 'chunks',
      tags: ['政策', '问答'],
      model: 'gpt-4.1',
      method: 'graph',
      selection: { docIds: ['DOC-101'] },
      status: 'completed',
      progress: 100,
      createdAt: '2026-02-07 10:16',
      updatedAt: '2026-02-07 10:18',
      docName: '政策汇编.pdf',
      chunkCount: 19,
      resultCount: 124,
      fields: []
    }
  ]
}

const DEMO_TOOLS = [
  { id: 'tool-tavily', name: 'Tavily', type: 'search', enabled: true, config: {} },
  { id: 'tool-graph', name: 'GraphQuery', type: 'graph', enabled: true, config: {} },
  { id: 'tool-sql', name: 'SQLQuery', type: 'structured', enabled: true, config: {} },
  { id: 'tool-doc', name: 'DocSearch', type: 'document', enabled: true, config: {} }
]

const DEMO_QA_SESSIONS = [
  {
    id: 'QA-DEMO-001',
    title: '合同风险概览',
    updatedAt: '2026-02-07 10:20',
    model: 'gpt-4.1-mini',
    pinned: true,
    sourceTags: ['kb'],
    lastMessage: '请帮我总结合同条款中的高风险项'
  },
  {
    id: 'QA-DEMO-002',
    title: '交付规范问答',
    updatedAt: '2026-02-07 10:19',
    model: 'gpt-4.1-mini',
    pinned: false,
    sourceTags: ['kb'],
    lastMessage: '验收字段有哪些？'
  }
]

const DEMO_QA_MESSAGES = [
  {
    id: 'QA-DEMO-MSG-001',
    sessionId: 'QA-DEMO-001',
    role: 'user',
    content: '请帮我总结合同条款中的高风险项',
    createdAt: '2026-02-07 10:18'
  },
  {
    id: 'QA-DEMO-MSG-002',
    sessionId: 'QA-DEMO-001',
    role: 'assistant',
    content: '高风险项主要在交付延期责任、验收标准模糊和付款里程碑不一致。',
    createdAt: '2026-02-07 10:19',
    answerType: 'qa',
    streaming: false,
    citations: [1],
    trace: {
      intent: 'risk_summary',
      strategy: 'hybrid',
      steps: [{ type: 'retrieve', label: '知识检索', detail: '从知识库命中 3 条' }],
      tools: [{ name: 'GraphQuery', status: 'success' }]
    },
    sources: [
      { id: 1, type: 'kb', taskName: '合同模板索引构建', chunkId: 'C-001', snippet: '交付延期责任描述...', score: 0.84 }
    ]
  }
]

const DEMO_QA_CONFIG = {
  selectedModel: 'gpt-4.1-mini',
  selectedTools: ['tool-tavily', 'tool-graph', 'tool-sql', 'tool-doc'],
  selectedKnowledgeBaseIds: ['KB-DEMO-001'],
  lastSavedAt: '2026-02-07 10:20'
}

export function seedDemoData({ reload = true } = {}) {
  if (typeof window === 'undefined') return
  const { localStorage } = window

  localStorage.setItem('kiveiv.kb.list', JSON.stringify(DEMO_BASES))
  localStorage.setItem('kiveiv.kb.files', JSON.stringify(DEMO_FILES_BY_BASE))
  localStorage.setItem('kiveiv.kb.active', JSON.stringify('KB-DEMO-001'))

  localStorage.setItem('kiveiv.tools.config', JSON.stringify(DEMO_TOOLS))

  localStorage.setItem('kiveiv.segmentation.byBase', JSON.stringify(DEMO_SEGMENTATION_BY_BASE))

  localStorage.setItem('kiveiv.indexBuilding.tasksByBase', JSON.stringify(DEMO_INDEX_TASKS_BY_BASE))
  localStorage.setItem('kiveiv.indexBuilding.activeTaskByBase', JSON.stringify({ 'KB-DEMO-001': 'ET-DEMO-002', 'KB-DEMO-002': 'ET-DEMO-101' }))
  localStorage.setItem('kiveiv.indexBuilding.progressTaskByBase', JSON.stringify({ 'KB-DEMO-001': 'ET-DEMO-002' }))
  localStorage.setItem('kiveiv.indexBuilding.progressVisibleByBase', JSON.stringify({ 'KB-DEMO-001': false }))
  localStorage.setItem('kiveiv.indexBuilding.tasksVersion', INDEX_VERSION)

  localStorage.setItem('kiveiv.qa.sessions', JSON.stringify(DEMO_QA_SESSIONS))
  localStorage.setItem('kiveiv.qa.messages', JSON.stringify(DEMO_QA_MESSAGES))
  localStorage.setItem('kiveiv.qa.config', JSON.stringify(DEMO_QA_CONFIG))
  localStorage.setItem('kiveiv.qa.activeSession', JSON.stringify('QA-DEMO-001'))
  localStorage.setItem('kiveiv.qa.layout', JSON.stringify({ leftCollapsed: false, rightCollapsed: false }))

  localStorage.setItem('kiveiv.demo.seed.version', DEMO_SEED_VERSION)

  if (reload) {
    window.location.reload()
  }
}

export function isDemoSeedCurrent() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem('kiveiv.demo.seed.version') === DEMO_SEED_VERSION
}
