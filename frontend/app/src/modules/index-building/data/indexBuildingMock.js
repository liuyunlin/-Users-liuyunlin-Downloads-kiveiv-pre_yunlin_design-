export const TAG_POOL = ['合同', '风险', '交付', '条款', '违约', '付款', '项目', '范围', '责任', '争议']

export const INITIAL_TASKS = [
  {
    id: 'ET-202602-01',
    name: '合同条款图结构抽取',
    type: 'graph',
    source: 'chunk',
    tags: ['合同', '条款', '风险'],
    model: 'gpt-4o',
    method: 'fuzzy',
    status: 'running',
    progress: 56,
    createdAt: '2026-02-02 10:12',
    updatedAt: '2026-02-02 10:23',
    docName: '合同模板.md',
    chunkCount: 28,
    resultCount: 64
  },
  {
    id: 'ET-202602-02',
    name: '交付规范结构化抽取',
    type: 'structured',
    source: 'chunk',
    tags: ['交付', '范围'],
    model: 'qwen2.5',
    method: 'precise',
    fields: [
      { id: 'F-01', name: '条款名称', type: '文本', description: '合同条款标题' },
      { id: 'F-02', name: '触发条件', type: '文本', description: '条款触发的条件说明' },
      { id: 'F-03', name: '责任主体', type: '文本', description: '责任承担方' },
      { id: 'F-04', name: '金额/比例', type: '数值', description: '涉及金额或比例' }
    ],
    reference: {
      headerText: '条款名称, 触发条件, 责任主体, 金额/比例',
      fileName: '交付规范字段.xlsx'
    },
    status: 'completed',
    progress: 100,
    createdAt: '2026-02-02 09:32',
    updatedAt: '2026-02-02 09:55',
    docName: '交付规范.md',
    chunkCount: 22,
    resultCount: 38
  },
  {
    id: 'ET-202602-03',
    name: 'Excel 自动抽取-项目清单',
    type: 'structured',
    source: 'excel',
    tags: ['项目'],
    model: 'gpt-4o-mini',
    method: 'precise',
    fields: [
      { id: 'XF-01', name: '项目名称', type: '文本', description: '项目名称' },
      { id: 'XF-02', name: '负责人', type: '文本', description: '负责人' },
      { id: 'XF-03', name: '预算金额', type: '数值', description: '预算金额' },
      { id: 'XF-04', name: '里程碑', type: '文本', description: '里程碑计划' },
      { id: 'XF-05', name: '状态', type: '文本', description: '当前状态' }
    ],
    reference: {
      headerText: '项目名称, 负责人, 预算金额, 里程碑, 状态',
      fileName: '项目清单.xlsx'
    },
    status: 'completed',
    progress: 100,
    createdAt: '2026-02-02 08:20',
    updatedAt: '2026-02-02 08:20',
    docName: '项目清单.xlsx',
    chunkCount: 0,
    resultCount: 64
  },
  {
    id: 'ET-202602-04',
    name: '付款条款图结构抽取',
    type: 'graph',
    source: 'chunk',
    tags: ['付款', '责任'],
    model: 'deepseek-chat',
    method: 'precise',
    reference: {
      promptText: '示例：请按【主体, 关系, 客体】输出与付款条款相关的三元组。',
      fileName: '付款条款三元组模板.md'
    },
    status: 'queued',
    progress: 0,
    createdAt: '2026-02-02 11:10',
    updatedAt: '2026-02-02 11:10',
    docName: '付款条款.md',
    chunkCount: 16,
    resultCount: 0
  }
]

export const GRAPH_TRIPLES = [
  {
    id: 'T-001',
    head: '合同',
    relation: '约束',
    tail: '交付时间',
    chunkId: 'C-119',
    score: 0.82
  },
  {
    id: 'T-002',
    head: '供应商',
    relation: '承担',
    tail: '违约责任',
    chunkId: 'C-124',
    score: 0.79
  },
  {
    id: 'T-003',
    head: '付款',
    relation: '触发',
    tail: '验收通过',
    chunkId: 'C-131',
    score: 0.74
  },
  {
    id: 'T-004',
    head: '风险',
    relation: '关联',
    tail: '延期交付',
    chunkId: 'C-137',
    score: 0.71
  }
]

export const GRAPH_STATS = {
  nodes: 42,
  edges: 64,
  relations: [
    { name: '约束', count: 12 },
    { name: '承担', count: 9 },
    { name: '关联', count: 8 },
    { name: '触发', count: 7 }
  ]
}

export const GRAPH_CHUNKS = [
  {
    id: 'C-119',
    title: '交付时间约束',
    content: '合同规定交付时间为 2026 年 3 月 15 日，逾期交付将产生违约责任。',
    tags: ['合同', '交付'],
    status: 'confirmed',
    tokenCount: 360
  },
  {
    id: 'C-124',
    title: '违约责任说明',
    content: '供应商承担延期交付的赔偿责任，并需在 5 日内提交整改计划。',
    tags: ['违约', '责任'],
    status: 'confirmed',
    tokenCount: 320
  },
  {
    id: 'C-131',
    title: '付款触发条件',
    content: '付款在验收通过后 7 个工作日内完成，验收结论作为付款依据。',
    tags: ['付款', '验收'],
    status: 'confirmed',
    tokenCount: 280
  },
  {
    id: 'C-137',
    title: '风险条款描述',
    content: '风险包括供应链延迟、关键人员变更等，需建立预警与应对机制。',
    tags: ['风险'],
    status: 'initial',
    tokenCount: 300
  }
]

export const STRUCTURED_FIELDS = [
  { id: 'F-01', name: '条款名称', type: '文本', description: '合同条款标题' },
  { id: 'F-02', name: '触发条件', type: '文本', description: '条款触发的条件说明' },
  { id: 'F-03', name: '责任主体', type: '文本', description: '责任承担方' },
  { id: 'F-04', name: '金额/比例', type: '数值', description: '涉及金额或比例' }
]

export const STRUCTURED_ROWS = [
  {
    id: 'R-01',
    clause: '交付条款',
    condition: '验收通过',
    owner: '供应商',
    amount: '50%'
  },
  {
    id: 'R-02',
    clause: '违约条款',
    condition: '延期超过 7 天',
    owner: '供应商',
    amount: '合同金额 5%'
  },
  {
    id: 'R-03',
    clause: '付款条款',
    condition: '阶段验收确认',
    owner: '采购方',
    amount: '30%'
  }
]

export const EXCEL_FIELDS = ['项目名称', '负责人', '预算金额', '里程碑', '状态']

export const EXCEL_ROWS = [
  {
    id: 'E-01',
    name: '交付平台升级',
    owner: '李明',
    budget: '120 万',
    milestone: '2026-03-30',
    status: '进行中'
  },
  {
    id: 'E-02',
    name: '合同梳理',
    owner: '王珊',
    budget: '30 万',
    milestone: '2026-02-20',
    status: '已完成'
  }
]

export const EXPORT_PACKAGES = [
  {
    id: 'PK-001',
    name: '合同条款图谱',
    type: 'GraphML',
    updatedAt: '2026-02-02 10:40',
    size: '8.2MB'
  },
  {
    id: 'PK-002',
    name: '交付规范结构化表',
    type: 'CSV',
    updatedAt: '2026-02-02 09:55',
    size: '1.4MB'
  }
]

export const EXPORT_FIELDS = [
  {
    id: 'EF-001',
    category: 'graph',
    fieldName: 'head',
    displayName: '主体实体',
    type: 'string',
    required: true,
    mappedTo: 'entity_head',
    hitRule: '关键词命中'
  },
  {
    id: 'EF-002',
    category: 'graph',
    fieldName: 'relation',
    displayName: '关系类型',
    type: 'string',
    required: true,
    mappedTo: 'relation_type',
    hitRule: '关系词典命中'
  },
  {
    id: 'EF-003',
    category: 'graph',
    fieldName: 'tail',
    displayName: '客体实体',
    type: 'string',
    required: true,
    mappedTo: 'entity_tail',
    hitRule: '关键词命中'
  },
  {
    id: 'EF-004',
    category: 'structured',
    fieldName: 'clause',
    displayName: '条款名称',
    type: 'string',
    required: true,
    mappedTo: 'clause_name',
    hitRule: '字段映射命中'
  },
  {
    id: 'EF-005',
    category: 'structured',
    fieldName: 'owner',
    displayName: '责任主体',
    type: 'string',
    required: false,
    mappedTo: 'owner_name',
    hitRule: '字段映射命中'
  },
  {
    id: 'EF-006',
    category: 'structured',
    fieldName: 'amount',
    displayName: '金额/比例',
    type: 'number',
    required: false,
    mappedTo: 'amount_ratio',
    hitRule: '规则命中'
  }
]

export const EXPORT_JOBS = [
  {
    id: 'JOB-20260202-01',
    packageId: 'PK-001',
    category: 'graph',
    format: 'GraphML',
    recordCount: 64,
    status: 'completed',
    triggerBy: '柳芸琳',
    triggeredAt: '2026-02-02 10:41',
    expiresAt: '2026-02-09 10:41'
  },
  {
    id: 'JOB-20260202-02',
    packageId: 'PK-002',
    category: 'structured',
    format: 'CSV',
    recordCount: 38,
    status: 'completed',
    triggerBy: '柳芸琳',
    triggeredAt: '2026-02-02 09:56',
    expiresAt: '2026-02-09 09:56'
  },
  {
    id: 'JOB-20260202-03',
    packageId: 'PK-002',
    category: 'structured',
    format: 'XLSX',
    recordCount: 38,
    status: 'running',
    triggerBy: '系统任务',
    triggeredAt: '2026-02-02 11:12',
    expiresAt: '--'
  }
]

export const SEGMENTED_DOCUMENTS = [
  {
    id: 'DOC-1001',
    name: '合同模板.md',
    source: '合同库',
    status: 'processed',
    totalChunks: 28,
    updatedAt: '2026-02-02 10:08'
  },
  {
    id: 'DOC-1002',
    name: '交付规范.md',
    source: '项目规范',
    status: 'processed',
    totalChunks: 22,
    updatedAt: '2026-02-02 09:52'
  },
  {
    id: 'DOC-1003',
    name: '项目说明书.md',
    source: '项目模板',
    status: 'processed',
    totalChunks: 18,
    updatedAt: '2026-02-02 08:31'
  }
]

export const SEGMENTED_CHUNKS_BY_DOC = {
  'DOC-1001': [
    {
      id: 'CH-1001-01',
      title: '交付期限约束',
      content: '合同规定交付期限为 30 天，超期交付需提前 5 日书面告知。',
      tags: ['合同', '交付'],
      tokenCount: 320,
      status: 'confirmed'
    },
    {
      id: 'CH-1001-02',
      title: '违约责任',
      content: '供应商未按期交付构成违约，需承担合同金额 5% 的违约金。',
      tags: ['违约', '责任'],
      tokenCount: 280,
      status: 'confirmed'
    },
    {
      id: 'CH-1001-03',
      title: '付款方式',
      content: '付款分为预付款与验收款两部分，验收通过后 7 日内支付。',
      tags: ['付款', '验收'],
      tokenCount: 300,
      status: 'initial'
    }
  ],
  'DOC-1002': [
    {
      id: 'CH-1002-01',
      title: '交付范围说明',
      content: '交付内容包含系统部署、培训与上线支持，需提供交付清单。',
      tags: ['交付', '范围'],
      tokenCount: 310,
      status: 'confirmed'
    },
    {
      id: 'CH-1002-02',
      title: '验收要求',
      content: '验收应包含功能测试、性能测试与安全测试，形成验收报告。',
      tags: ['验收', '测试'],
      tokenCount: 295,
      status: 'confirmed'
    },
    {
      id: 'CH-1002-03',
      title: '风险处理',
      content: '重大风险需在 2 日内上报并形成风险应对方案。',
      tags: ['风险'],
      tokenCount: 260,
      status: 'initial'
    }
  ],
  'DOC-1003': [
    {
      id: 'CH-1003-01',
      title: '项目概况',
      content: '项目目标为提升交付效率与质量，形成统一的管理流程。',
      tags: ['项目', '交付'],
      tokenCount: 280,
      status: 'confirmed'
    },
    {
      id: 'CH-1003-02',
      title: '责任划分',
      content: '项目成员职责需明确到角色，形成责任矩阵。',
      tags: ['责任'],
      tokenCount: 250,
      status: 'confirmed'
    },
    {
      id: 'CH-1003-03',
      title: '里程碑计划',
      content: '里程碑包括需求确认、开发完成与验收上线三阶段。',
      tags: ['项目', '里程碑'],
      tokenCount: 270,
      status: 'initial'
    }
  ]
}
