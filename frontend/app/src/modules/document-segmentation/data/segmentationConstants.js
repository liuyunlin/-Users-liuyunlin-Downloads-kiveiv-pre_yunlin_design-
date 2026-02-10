export const SEGMENTATION_TABS = [
  {
    id: 'seg-docs',
    label: '切分文档',
    description: '文档列表与状态管理，选择文档进入切分策略配置。'
  },
  {
    id: 'seg-results',
    label: '切分结果',
    description: '按文档查看切分结果、状态与溯源/版本操作。'
  },
  {
    id: 'seg-tags',
    label: '标签管理',
    description: '全局标签统计与合并/重命名/删除。'
  },
  {
    id: 'seg-search',
    label: '语义搜索',
    description: '基于向量检索的跨文档切片搜索。'
  },
  {
    id: 'seg-vector',
    label: '向量化入口',
    description: '向量化批处理与统计信息。'
  }
]

export const SEGMENTATION_FLOW_TABS = SEGMENTATION_TABS.filter((tab) =>
  ['seg-docs', 'seg-results', 'seg-vector'].includes(tab.id)
)

export const SEGMENTATION_OPS_TABS = SEGMENTATION_TABS.filter((tab) =>
  ['seg-tags', 'seg-search'].includes(tab.id)
)

export const STRATEGY_META = {
  id: 'seg-strategy',
  label: '切分策略配置',
  description: '配置切分参数并确认执行。'
}

export const STRATEGIES = [
  {
    id: 'fixed',
    name: '固定长度切分',
    description: '稳定边界，适合长文档批量处理。',
    detail: '按长度切分后进行小切片合并与溢出修复。'
  },
  {
    id: 'semantic',
    name: '语义边界切分',
    description: '基于语义边界优化切分结果。',
    detail: '适合知识密集或语义连续型内容。'
  },
  {
    id: 'structured',
    name: '结构化切分',
    description: '依据标题/表格/层级信号切分。',
    detail: '适合结构化文档与规范类内容。'
  }
]

export const STEP_FLOW = [
  { id: 'select', label: '确认文档' },
  { id: 'strategy', label: '策略配置' },
  { id: 'confirm', label: '确认执行' }
]

export const SEGMENTATION_DURATION = 24_000
export const VECTORIZATION_DURATION = 20_000
export const PROGRESS_INTERVAL = 500

export const statusLabels = {
  not_processed: '未切分',
  processing: '切分中',
  processed: '已完成',
  error: '失败'
}

export const statusStyles = {
  not_processed: 'kiveiv-chip',
  processing: 'kiveiv-chip kiveiv-chip-accent',
  processed: 'kiveiv-chip',
  error: 'bg-red-100 text-red-700'
}

export const vectorStatusLabels = {
  not_processed: '未向量化',
  processing: '向量化中',
  processed: '已向量化',
  error: '失败'
}

export const vectorStatusStyles = {
  not_processed: 'kiveiv-chip',
  processing: 'kiveiv-chip kiveiv-chip-accent',
  processed: 'kiveiv-chip',
  error: 'bg-red-100 text-red-700'
}

export const chunkStatusLabels = {
  '-1': '废弃',
  0: '初始',
  1: '已确认',
  2: '已向量化'
}

export const chunkStatusStyles = {
  '-1': 'kiveiv-chip opacity-60',
  0: 'kiveiv-chip',
  1: 'kiveiv-chip',
  2: 'kiveiv-chip kiveiv-chip-accent'
}
