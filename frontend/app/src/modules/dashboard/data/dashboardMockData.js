export const DASHBOARD_MOCK = {
  dateLabel: '2026-02-07',
  navTabs: ['Home', 'Timeline', 'Insights', 'Control', 'Campaigns'],
  overview: {
    tokenToday: 1287340,
    tokenDelta: 14.2,
    segmentedDocsToday: 46,
    segmentedDelta: 9,
    taskCompletionRate: 78,
    activeUsers: 23,
    activeKnowledgeBases: 12,
    avgLatencyMs: 1240
  },
  profitGauge: {
    percent: 24,
    fromYesterday: 6.1,
    segments: [
      { id: 'token', label: 'Token 成本', value: 46, color: '#2f6df6' },
      { id: 'infra', label: '基础设施', value: 30, color: '#8eb4ff' },
      { id: 'ops', label: '运维', value: 24, color: '#dbe8ff' }
    ]
  },
  categoryMatrix: {
    labels: ['法务', '采购', '客服', '财务', '市场', '研发'],
    weekDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    values: [
      [24, 42, 33, 40, 48, 35, 29],
      [38, 44, 55, 61, 50, 47, 36],
      [19, 33, 41, 57, 62, 54, 45],
      [14, 27, 39, 50, 58, 63, 52],
      [11, 25, 31, 47, 59, 66, 57],
      [16, 28, 35, 43, 51, 60, 54]
    ]
  },
  monthlyPerformance: [
    { month: 'Jan', value: 42 },
    { month: 'Feb', value: 63 },
    { month: 'Mar', value: 51 },
    { month: 'Apr', value: 68 },
    { month: 'May', value: 56 },
    { month: 'Jun', value: 74 }
  ],
  modelConsumption: [
    { model: 'gpt-4.1', tokens: 462300, requestCount: 321, share: 36 },
    { model: 'gpt-4.1-mini', tokens: 390560, requestCount: 684, share: 30 },
    { model: 'qwen-max', tokens: 284920, requestCount: 226, share: 22 },
    { model: 'deepseek-chat', tokens: 149560, requestCount: 167, share: 12 }
  ],
  taskStages: [
    { id: 'todo', label: 'To Do', count: 19, ratio: 19 },
    { id: 'in_progress', label: 'In Progress', count: 11, ratio: 11 },
    { id: 'review', label: 'In Review', count: 7, ratio: 7 },
    { id: 'done', label: 'Done', count: 63, ratio: 63 }
  ],
  importChannels: {
    document: { done: 128, pending: 6 },
    graph: { done: 52, pending: 3 }
  },
  taskCenterMock: [
    { id: 'TASK-001', name: '合同库批量切分', status: 'running', progress: 67, updatedAt: '2026-02-07 10:26' },
    { id: 'TASK-002', name: '风险条款向量化', status: 'queued', progress: 0, updatedAt: '2026-02-07 10:25' },
    { id: 'TASK-003', name: '图谱实体去重', status: 'completed', progress: 100, updatedAt: '2026-02-07 10:18' }
  ],
  feedbackStats: {
    likes: 342,
    dislikes: 27,
    positiveRate: 93
  },
  exportGovernance: {
    approvalRate: 96,
    tasks: [
      { id: 'EXP-01', name: '合同风险条款导出', format: 'XLSX', owner: '法务组', status: 'completed' },
      { id: 'EXP-02', name: '图谱关系快照导出', format: 'JSONL', owner: '知识运营', status: 'running' },
      { id: 'EXP-03', name: 'RAG 引用明细导出', format: 'CSV', owner: '产品组', status: 'pending' },
      { id: 'EXP-04', name: '审计追踪导出', format: 'PDF', owner: '合规组', status: 'completed' }
    ]
  },
  topBuyer: {
    name: 'Nadya F.',
    role: 'Top Buyer',
    growth: 31
  },
  recentActivities: [
    { id: 'ACT-1', time: '09:12', user: '柳芸琳', action: '完成“合同库”切分', detail: '新增 182 个切片' },
    { id: 'ACT-2', time: '10:03', user: '产品团队', action: '启动索引构建', detail: '知识库：农业政策库' },
    { id: 'ACT-3', time: '10:58', user: '运营同学', action: '发起问答请求', detail: '模型：gpt-4.1-mini' },
    { id: 'ACT-4', time: '11:24', user: '后端联调', action: '更新工具配置', detail: '新增文档检索路由' },
    { id: 'ACT-5', time: '12:07', user: '柳芸琳', action: '批量上传文档', detail: '本次 9 个 PDF' }
  ]
}
