export const INDEX_BUILDING_TABS = [
  { id: 'extract-entry', label: '抽取任务', description: '选择切片或 Excel 抽取入口。' },
  { id: 'extract-results', label: '抽取结果', description: '管理抽取任务与执行进度。' },
  { id: 'graph-extraction', label: '图结构抽取', description: '三元组抽取、统计与溯源。' },
  { id: 'graph-aggregation', label: '图谱聚合', description: '多任务聚合图谱与查询。' },
  { id: 'structured-extraction', label: '结构化抽取', description: '结构化字段配置与结果预览。' },
  { id: 'export-center', label: '结果与导出', description: '图谱/表格导出与版本管理。' }
]

export const INDEX_BUILDING_TAB_GROUPS = [
  {
    id: 'execution',
    label: '抽取执行',
    description: '任务创建与运行跟踪',
    tabs: ['extract-entry', 'extract-results']
  },
  {
    id: 'analysis',
    label: '抽取分析',
    description: '图谱与结构化结果分析',
    tabs: ['graph-extraction', 'graph-aggregation', 'structured-extraction']
  },
  {
    id: 'delivery',
    label: '导出管理',
    description: '导出字段、任务与版本管理',
    tabs: ['export-center']
  }
]

export const TASK_STATUS_LABELS = {
  queued: '排队中',
  running: '抽取中',
  completed: '已完成',
  failed: '失败'
}

export const TASK_STATUS_STYLES = {
  queued: 'kiveiv-chip',
  running: 'kiveiv-chip kiveiv-chip-accent',
  completed: 'kiveiv-chip',
  failed: 'kiveiv-chip kiveiv-chip-danger'
}

export const EXTRACTION_TYPE_LABELS = {
  graph: '图结构抽取',
  structured: '结构化抽取'
}

export const EXTRACTION_SOURCE_LABELS = {
  chunk: '切片抽取',
  excel: 'Excel 自动抽取'
}

export const EXTRACTION_METHOD_LABELS = {
  precise: '精确抽取',
  fuzzy: '模糊抽取'
}
