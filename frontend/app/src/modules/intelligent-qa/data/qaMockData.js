export const QA_SESSIONS = [
  {
    id: 'QA-SESSION-001',
    title: '合同风险概览',
    updatedAt: '2026-02-04 10:12',
    model: 'gpt-4o',
    sourceTags: ['graph', 'structured'],
    lastMessage: '请帮我概览合同条款的核心风险'
  },
  {
    id: 'QA-SESSION-002',
    title: '交付规范结构化',
    updatedAt: '2026-02-04 09:55',
    model: 'qwen2.5',
    sourceTags: ['structured'],
    lastMessage: '交付规范中的验收字段有哪些？'
  },
  {
    id: 'QA-SESSION-003',
    title: '外搜政策检索',
    updatedAt: '2026-02-03 19:30',
    model: 'gpt-4o-mini',
    sourceTags: ['web'],
    lastMessage: '查一下最新食品安全法规更新'
  },
  {
    id: 'QA-SESSION-004',
    title: '闲聊测试',
    updatedAt: '2026-02-03 16:18',
    model: 'gpt-4o',
    sourceTags: [],
    lastMessage: '今天心情一般，想听点建议'
  },
  {
    id: 'QA-SESSION-005',
    title: '澄清问题示例',
    updatedAt: '2026-02-02 11:40',
    model: 'qwen2.5',
    sourceTags: ['graph'],
    lastMessage: '帮我看下条款风险'
  }
]

export const QA_MESSAGES = [
  {
    id: 'MSG-001',
    sessionId: 'QA-SESSION-001',
    role: 'user',
    content: '请帮我概览合同条款的核心风险',
    createdAt: '2026-02-04 10:10'
  },
  {
    id: 'MSG-002',
    sessionId: 'QA-SESSION-001',
    role: 'assistant',
    content: '核心风险集中在交付延期、验收标准不清与付款节点不匹配三类。',
    createdAt: '2026-02-04 10:10',
    streaming: true,
    answerType: 'qa',
    citations: [1, 2],
    trace: {
      intent: 'risk_summary',
      strategy: 'hybrid',
      steps: [
        { type: 'intent', label: '意图识别', detail: '风险概览' },
        { type: 'retrieval', label: '混合检索', detail: '向量 + 关键词' },
        { type: 'rerank', label: '重排序', detail: 'top_k=6' },
        { type: 'compose', label: '答案合成', detail: '引用来源 2 条' }
      ],
      tools: [
        { name: 'GraphQuery', status: 'success' },
        { name: 'SQLQuery', status: 'success' }
      ]
    },
    sources: [
      {
        id: 1,
        type: 'graph',
        taskId: 'ET-202602-01',
        taskName: '合同条款图结构抽取',
        chunkId: 'C-119',
        snippet: '合同规定交付期限为 30 天，超期交付需提前 5 日书面告知。',
        score: 0.82
      },
      {
        id: 2,
        type: 'structured',
        taskId: 'ET-202602-02',
        taskName: '交付规范结构化抽取',
        recordId: 'R-17',
        snippet: '验收标准：阶段验收需提供合规报告，未通过视为延期。',
        score: 0.79
      }
    ]
  },
  {
    id: 'MSG-003',
    sessionId: 'QA-SESSION-002',
    role: 'user',
    content: '交付规范中的验收字段有哪些？',
    createdAt: '2026-02-04 09:52'
  },
  {
    id: 'MSG-004',
    sessionId: 'QA-SESSION-002',
    role: 'assistant',
    content: '验收字段包含验收阶段、验收标准、验收负责人、验收时间。',
    createdAt: '2026-02-04 09:53',
    answerType: 'qa',
    citations: [1],
    trace: {
      intent: 'field_query',
      strategy: 'structured',
      steps: [
        { type: 'intent', label: '意图识别', detail: '字段查询' },
        { type: 'retrieval', label: '结构化检索', detail: '表头字段匹配' },
        { type: 'compose', label: '答案合成', detail: '引用来源 1 条' }
      ],
      tools: [{ name: 'SQLQuery', status: 'success' }]
    },
    sources: [
      {
        id: 1,
        type: 'structured',
        taskId: 'ET-202602-02',
        taskName: '交付规范结构化抽取',
        recordId: 'R-09',
        snippet: '验收字段：验收阶段、验收标准、验收负责人、验收时间。',
        score: 0.86
      }
    ]
  },
  {
    id: 'MSG-005',
    sessionId: 'QA-SESSION-003',
    role: 'user',
    content: '查一下最新食品安全法规更新',
    createdAt: '2026-02-03 19:28'
  },
  {
    id: 'MSG-006',
    sessionId: 'QA-SESSION-003',
    role: 'assistant',
    content: '我检索到外部公开信息，最新更新集中在添加剂限量与追溯要求两部分。',
    createdAt: '2026-02-03 19:29',
    answerType: 'qa',
    citations: [1],
    trace: {
      intent: 'external_search',
      strategy: 'web',
      steps: [
        { type: 'intent', label: '意图识别', detail: '外搜法规' },
        { type: 'retrieval', label: '外部搜索', detail: 'Tavily' },
        { type: 'compose', label: '答案合成', detail: '引用外搜来源' }
      ],
      tools: [{ name: 'Tavily', status: 'success' }]
    },
    sources: [
      {
        id: 1,
        type: 'web',
        taskId: 'WEB-001',
        taskName: '食品安全监管公告',
        chunkId: 'URL-2026-02',
        snippet: '新增添加剂限量指标与生产追溯要求（摘要）。',
        score: 0.72
      }
    ]
  },
  {
    id: 'MSG-007',
    sessionId: 'QA-SESSION-004',
    role: 'user',
    content: '今天心情一般，想听点建议',
    createdAt: '2026-02-03 16:16'
  },
  {
    id: 'MSG-008',
    sessionId: 'QA-SESSION-004',
    role: 'assistant',
    content: '要不要试试做点轻松的小事？比如整理书桌、散步或者听一首歌。',
    createdAt: '2026-02-03 16:17',
    answerType: 'chitchat'
  },
  {
    id: 'MSG-009',
    sessionId: 'QA-SESSION-005',
    role: 'user',
    content: '帮我看下条款风险',
    createdAt: '2026-02-02 11:38'
  },
  {
    id: 'MSG-010',
    sessionId: 'QA-SESSION-005',
    role: 'assistant',
    content: '你更关注交付风险还是付款风险？',
    createdAt: '2026-02-02 11:39',
    answerType: 'clarification',
    options: ['交付风险', '付款风险', '全部概览']
  }
]

export const QA_TOOLS = [
  { id: 'tool-tavily', name: 'Tavily', type: 'search', enabled: true },
  { id: 'tool-graph', name: 'GraphQuery', type: 'graph', enabled: true },
  { id: 'tool-sql', name: 'SQLQuery', type: 'structured', enabled: true },
  { id: 'tool-doc', name: 'DocSearch', type: 'document', enabled: false }
]

export const QA_MODELS = [
  { id: 'qa-model-1', name: 'gpt-4o', provider: 'OpenAI', status: 'active' },
  { id: 'qa-model-2', name: 'gpt-4o-mini', provider: 'OpenAI', status: 'saved' },
  { id: 'qa-model-3', name: 'qwen2.5', provider: 'AliCloud', status: 'saved' }
]

export const QA_KNOWLEDGE_SOURCES = {
  graph: [
    { id: 'ET-202602-01', name: '合同条款图谱', updatedAt: '2026-02-02 10:40' },
    { id: 'ET-202602-04', name: '付款条款图谱', updatedAt: '2026-02-01 14:20' }
  ],
  structured: [
    { id: 'ET-202602-02', name: '交付规范结构化表', updatedAt: '2026-02-02 09:55' },
    { id: 'ET-202602-03', name: '项目清单结构化表', updatedAt: '2026-02-01 11:30' }
  ]
}
