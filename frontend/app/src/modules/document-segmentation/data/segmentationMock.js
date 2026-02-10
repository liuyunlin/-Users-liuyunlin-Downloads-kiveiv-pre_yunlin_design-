export const MOCK_DOCUMENTS = [
  {
    id: 'DOC-001',
    name: '合同模板.md',
    status: 'not_processed',
    updatedAt: '2026-02-02 10:12',
    totalChunks: 0,
    source: '解析链路'
  },
  {
    id: 'DOC-002',
    name: '交付规范.md',
    status: 'processed',
    updatedAt: '2026-02-02 09:48',
    totalChunks: 28,
    source: '解析链路'
  },
  {
    id: 'DOC-003',
    name: '项目说明书.md',
    status: 'processing',
    updatedAt: '2026-02-02 10:30',
    totalChunks: 0,
    source: '解析链路'
  },
  {
    id: 'DOC-004',
    name: '运维手册.md',
    status: 'error',
    updatedAt: '2026-02-02 09:02',
    totalChunks: 0,
    source: '解析链路'
  }
]

export const INITIAL_CHUNKS_BY_DOC = {
  'DOC-001': [
    {
      id: 1001,
      sequence: 1,
      title: '合同概述',
      content: '合同概述说明了交付范围、付款节点与服务边界。',
      tokenStart: 0,
      tokenEnd: 812,
      tokenCount: 812,
      status: 1,
      isAtomic: false,
      atomicType: '-',
      contentTags: ['合同', '概述'],
      systemTags: ['交付流程'],
      userTag: '重点'
    },
    {
      id: 1002,
      sequence: 2,
      title: '条款与义务',
      content: '条款与义务包含责任主体、履约时限以及违约处理说明。',
      tokenStart: 813,
      tokenEnd: 1540,
      tokenCount: 728,
      status: 0,
      isAtomic: true,
      atomicType: 'table',
      contentTags: ['条款', '义务'],
      systemTags: ['风险提示'],
      userTag: ''
    },
    {
      id: 1003,
      sequence: 3,
      title: '付款节点',
      content: '付款节点包括预付款、阶段验收款与尾款结清要求。',
      tokenStart: 1541,
      tokenEnd: 2190,
      tokenCount: 649,
      status: 1,
      isAtomic: false,
      atomicType: '-',
      contentTags: ['付款', '节点'],
      systemTags: [],
      userTag: '重点'
    }
  ],
  'DOC-002': [
    {
      id: 2001,
      sequence: 1,
      title: '交付范围',
      content: '交付范围覆盖系统部署、培训与验收资料准备。',
      tokenStart: 0,
      tokenEnd: 620,
      tokenCount: 620,
      status: 2,
      isAtomic: false,
      atomicType: '-',
      contentTags: ['交付', '范围'],
      systemTags: ['交付流程'],
      userTag: '交付'
    },
    {
      id: 2002,
      sequence: 2,
      title: '验收流程',
      content: '验收流程包括提交材料、现场核验与报告确认。',
      tokenStart: 621,
      tokenEnd: 1180,
      tokenCount: 560,
      status: 1,
      isAtomic: true,
      atomicType: 'step',
      contentTags: ['验收', '流程'],
      systemTags: ['操作步骤'],
      userTag: ''
    },
    {
      id: 2003,
      sequence: 3,
      title: '交付里程碑',
      content: '交付里程碑覆盖需求评审、环境部署、上线切换与验收总结。',
      tokenStart: 1181,
      tokenEnd: 1780,
      tokenCount: 599,
      status: 0,
      isAtomic: false,
      atomicType: '-',
      contentTags: ['里程碑', '交付'],
      systemTags: ['交付流程'],
      userTag: '里程碑'
    },
    {
      id: 2004,
      sequence: 4,
      title: '风险与变更',
      content: '风险与变更包括需求变更控制、里程碑延期应对与责任划分。',
      tokenStart: 1781,
      tokenEnd: 2300,
      tokenCount: 519,
      status: 1,
      isAtomic: false,
      atomicType: '-',
      contentTags: ['风险', '变更'],
      systemTags: ['风险提示'],
      userTag: ''
    },
    {
      id: 2005,
      sequence: 5,
      title: '培训与交付资料',
      content: '培训安排涵盖操作培训、交付资料整理与持续支持计划。',
      tokenStart: 2301,
      tokenEnd: 2780,
      tokenCount: 479,
      status: 0,
      isAtomic: true,
      atomicType: 'table',
      contentTags: ['培训', '资料'],
      systemTags: ['操作步骤'],
      userTag: ''
    }
  ],
  'DOC-003': [],
  'DOC-004': []
}

export const SEGMENTATION_CONFIGS = {
  'DOC-001': {
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
  'DOC-002': {
    strategyId: 'structured',
    strategyName: '结构化切分',
    chunkSize: 900,
    overlap: 140,
    minTokens: 220,
    maxTokens: 1400,
    enableClean: true,
    enableMap: false,
    enableTags: true,
    enableValidation: true
  }
}

export const INITIAL_TAG_STATS = [
  { tag: '合同', count: 12 },
  { tag: '交付', count: 9 },
  { tag: '验收', count: 7 },
  { tag: '条款', count: 5 }
]

export const INITIAL_SYSTEM_TAGS = [
  { name: '交付流程', description: '交付阶段相关内容', usage: 12 },
  { name: '风险提示', description: '风险与合规类提示', usage: 8 },
  { name: '操作步骤', description: '步骤式说明内容', usage: 14 }
]

export const SEARCH_RESULTS = [
  {
    id: 'SR-001',
    doc: '交付规范.md',
    chunkId: 2002,
    score: 0.86,
    snippet: '验收流程包括提交材料、现场核验与报告确认...'
  },
  {
    id: 'SR-002',
    doc: '合同模板.md',
    chunkId: 1001,
    score: 0.79,
    snippet: '合同概述说明了交付范围、付款节点与服务边界...'
  }
]

export const VECTOR_STATS = [
  { label: '待向量化', value: 8 },
  { label: '已向量化', value: 24 },
  { label: '失败', value: 1 }
]

export const VECTOR_QUEUE = [
  { id: 2002, doc: '交付规范.md', status: '待向量化' },
  { id: 1002, doc: '合同模板.md', status: '待向量化' }
]
