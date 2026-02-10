export const KNOWLEDGE_BASES = [
  {
    id: 'KB-001',
    name: '测试',
    description: '这个知识库还没有介绍~',
    owner: 'loukie7',
    visibility: '私有',
    pinned: true,
    coverPreset: 'sky',
    defaultSchemeId: 'SCH-DEFAULT',
    schemeSelectionByFileType: {
      pdf: 'SCH-DEFAULT',
      docx: 'SCH-DEFAULT',
      ppt: 'SCH-DEFAULT',
      md: 'SCH-DEFAULT',
      excel: 'SCH-DEFAULT',
      image: 'SCH-DEFAULT'
    },
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
    qaMinScore: 0.7,
    qaMaxPairs: 30,
    qaExtractTables: true,
    layoutMode: 'vertical',
    vectorModel: 'text-embedding-3-small',
    indexMode: 'hybrid',
    defaultTopK: 5,
    updatedAt: '2026-02-04 16:24',
    typeLabel: '通用知识库'
  },
  {
    id: 'KB-002',
    name: '合同条款',
    description: '合同条款与风险知识库。',
    owner: 'kiveiv',
    visibility: '团队',
    pinned: false,
    coverPreset: 'mint',
    defaultSchemeId: 'SCH-QUALITY',
    schemeSelectionByFileType: {
      pdf: 'SCH-QUALITY',
      docx: 'SCH-QUALITY',
      ppt: 'SCH-QUALITY',
      md: 'SCH-QUALITY',
      excel: 'SCH-QUALITY',
      image: 'SCH-QUALITY'
    },
    llmModel: 'gpt-4.1-mini',
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
    qaMaxPairs: 50,
    qaExtractTables: false,
    layoutMode: 'horizontal',
    vectorModel: 'text-embedding-3-small',
    indexMode: 'graph',
    defaultTopK: 8,
    updatedAt: '2026-02-03 10:18',
    typeLabel: '行业知识库'
  }
]

export const KNOWLEDGE_BASE_FILES = {
  'KB-001': [
    {
      id: 'DOC-001',
      name: '合同模板.md',
      mode: 'Pineline',
      size: '1.2 MB',
      updatedAt: '2026-02-04 16:20',
      status: '已解析',
      enabled: true,
      type: 'MD',
      tags: [{ key: '文档类型', value: '模板' }, { key: '来源', value: '内网' }]
    },
    {
      id: 'DOC-002',
      name: '交付规范.pdf',
      mode: 'Pineline',
      size: '2.8 MB',
      updatedAt: '2026-02-03 15:12',
      status: '未解析',
      enabled: true,
      type: 'PDF',
      tags: []
    }
  ],
  'KB-002': [
    {
      id: 'DOC-101',
      name: '付款条款.docx',
      mode: 'Pineline',
      size: '1.6 MB',
      updatedAt: '2026-02-03 09:20',
      status: '解析中',
      enabled: true,
      type: 'DOCX',
      tags: [{ key: '部门', value: '法务' }]
    }
  ]
}
