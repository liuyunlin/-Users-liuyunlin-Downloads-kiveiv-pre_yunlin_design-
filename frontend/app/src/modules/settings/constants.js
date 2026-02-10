export const SETTINGS_TABS = [
  { id: 'profile-general', name: '个人资料', group: '账号设置' },
  { id: 'model-layout', name: '文档解析模型', group: '模型管理' },
  { id: 'model-llm', name: '智能问答模型', group: '模型管理' },
  { id: 'model-chunk', name: '文本切分模型', group: '模型管理' },
  { id: 'model-index', name: '索引构建模型', group: '模型管理' }
]

export const PROFILE_DEFAULTS = {
  displayName: '柳芸琳',
  role: '产品经理',
  team: '智能知识库团队',
  email: 'yunlin@kiveiv.ai',
  phone: '+86 138-0000-1208',
  locale: 'zh-CN',
  timezone: 'Asia/Shanghai',
  digest: true,
  desktopNotice: true,
  qaToast: true,
  weeklyReport: false,
  compactMode: false,
  autoSaveDraft: true,
  includeSourceInAnswer: true,
  expertMode: false,
  logRetentionDays: 30
}

export const SETTINGS_PANELS = {
  'profile-general': [],
  'model-layout': [
    {
      id: 'layout-model',
      title: '文档解析模型',
      options: ['MinerU', 'PaddlePaddleOCR']
    }
  ],
  'model-llm': [
    {
      id: 'llm-model',
      title: '智能问答模型',
      options: ['gpt-4o', 'gpt-4o-mini', 'qwen2.5']
    }
  ],
  'model-chunk': [
    {
      id: 'chunk-llm',
      title: '文本切分 LLM',
      description: '用于语义边界切分与文本理解。',
      options: ['gpt-4o', 'gpt-4o-mini', 'qwen2.5', 'deepseek-chat']
    },
    {
      id: 'chunk-vector',
      title: '文本切分向量模型',
      description: '用于切片向量化与检索。',
      options: ['text-embedding-3-large', 'text-embedding-3-small', 'bge-large', 'm3e-large']
    }
  ],
  'model-index': [
    {
      id: 'index-model',
      title: '索引构建模型（LLM）',
      description: '索引构建使用 LLM 进行结构化与语义组织。',
      options: ['gpt-4o', 'gpt-4o-mini', 'qwen2.5', 'deepseek-chat']
    }
  ]
}

export const SETTINGS_PANEL_LIST = Object.values(SETTINGS_PANELS).flat()
