import { useMemo } from 'react'
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { Box, DollarSign, Truck } from 'lucide-react'
import { DASHBOARD_MOCK } from './data/dashboardMockData.js'
import { useExtractionTasksContext } from '../index-building/ExtractionTasksProvider.jsx'
import { useToolConfigStore } from '../config/ToolConfigStore.jsx'
import { useKnowledgeBaseStore } from '../knowledge-base/KnowledgeBaseStore.jsx'

const BLUE_SCALE = ['#e7f0ff', '#d3e3ff', '#b4d1ff', '#8eb8ff', '#5f95fb', '#2f6df6']

export function DashboardPage() {
  const data = DASHBOARD_MOCK
  const { tasks } = useExtractionTasksContext()
  const { tools } = useToolConfigStore()
  const { knowledgeBases } = useKnowledgeBaseStore()
  const runningTasks = useMemo(
    () => (tasks || []).filter((task) => task.status === 'running' || task.status === 'queued'),
    [tasks]
  )
  const exportTasks = data.exportGovernance.tasks
  const enabledTools = tools.filter((tool) => tool.enabled).length

  return (
    <div className="page-shell">
      <section className="kiveiv-card p-4 sm:p-5">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--kiveiv-border)] pb-4">
          <div className="flex items-center gap-2 rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-1.5">
            {data.navTabs.map((tab, index) => (
              <button
                key={tab}
                type="button"
                className={`rounded-full px-3 py-1.5 text-xs ${index === 0 ? 'bg-[var(--kiveiv-accent)] text-white' : 'text-[var(--kiveiv-text-muted)] hover:bg-white'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="min-w-[220px] rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface)] px-3 py-2">
            <p className="text-sm font-semibold text-[var(--kiveiv-text)]">Hi! Ayu Carmenita</p>
            <p className="text-xs text-[var(--kiveiv-text-subtle)]">Carmenita.skra@gmail.com</p>
          </div>
        </header>

        <div className="mt-4 grid gap-3 lg:grid-cols-5">
          <CapabilityCard
            title="拓扑双通道导入"
            value={`${data.importChannels.document.pending + data.importChannels.graph.pending}`}
            note="待处理导入"
            detail={`文档通道 ${data.importChannels.document.pending} · 图谱通道 ${data.importChannels.graph.pending}`}
          />
          <CapabilityCard
            title="异步任务中心"
            value={`${runningTasks.length}`}
            note="进行中任务"
            detail={runningTasks.length ? `最近任务：${runningTasks[0].name || runningTasks[0].id}` : '当前暂无运行任务'}
          />
          <CapabilityCard
            title="工具与知识库解耦"
            value={`${enabledTools}/${tools.length || 0}`}
            note="已启用工具"
            detail={`已绑定知识库 ${knowledgeBases.length} 个（独立于工具配置）`}
          />
          <CapabilityCard
            title="对话反馈模块"
            value={`${data.feedbackStats.positiveRate}%`}
            note="正向反馈率"
            detail={`点赞 ${data.feedbackStats.likes} · 点踩 ${data.feedbackStats.dislikes}`}
          />
          <CapabilityCard
            title="数据导出治理"
            value={`${exportTasks.filter((task) => task.status === 'running').length}`}
            note="导出进行中"
            detail={`总任务 ${exportTasks.length} · 审批通过率 ${data.exportGovernance.approvalRate}%`}
          />
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-3">
          <section className="kiveiv-card p-4 xl:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--kiveiv-text)]">异步任务中心</h3>
              <span className="text-xs text-[var(--kiveiv-text-subtle)]">统一承接解析 / 切分 / 向量化 / 抽取任务</span>
            </div>
            <div className="overflow-x-auto">
              <table className="kiveiv-table">
                <thead>
                  <tr>
                    <th>任务名称</th>
                    <th>状态</th>
                    <th>进度</th>
                    <th>更新时间</th>
                  </tr>
                </thead>
                <tbody>
                  {(tasks.length ? tasks.slice(0, 6) : data.taskCenterMock).map((task) => (
                    <tr key={task.id}>
                      <td>{task.name || task.id}</td>
                      <td>{task.status === 'completed' ? '已完成' : task.status === 'running' ? '进行中' : task.status === 'queued' ? '排队中' : '失败'}</td>
                      <td>{Math.round(task.progress ?? 0)}%</td>
                      <td>{task.updatedAt || task.updated_at || task.createdAt || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="kiveiv-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--kiveiv-text)]">拓扑双通道导入</h3>
              <span className="text-xs text-[var(--kiveiv-text-subtle)]">文档通道 + 图谱通道</span>
            </div>
            <div className="space-y-2">
              <ChannelRow label="文档导入通道" done={data.importChannels.document.done} pending={data.importChannels.document.pending} />
              <ChannelRow label="图谱导入通道" done={data.importChannels.graph.done} pending={data.importChannels.graph.pending} />
            </div>
            <p className="mt-3 text-xs text-[var(--kiveiv-text-subtle)]">两条通道共享任务中心、失败重试和导出记录。</p>
          </section>
        </div>

        <div className="mt-3 grid gap-3 xl:grid-cols-2">
          <section className="kiveiv-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--kiveiv-text)]">工具与知识库解耦</h3>
              <span className="text-xs text-[var(--kiveiv-text-subtle)]">工具开关不影响知识库绑定</span>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-3">
                <p className="text-xs text-[var(--kiveiv-text-subtle)]">工具集合</p>
                <p className="mt-1 text-sm font-semibold text-[var(--kiveiv-text)]">已启用 {enabledTools} / {tools.length || 0}</p>
              </div>
              <div className="rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-3">
                <p className="text-xs text-[var(--kiveiv-text-subtle)]">知识库集合</p>
                <p className="mt-1 text-sm font-semibold text-[var(--kiveiv-text)]">可引用 {knowledgeBases.length} 个</p>
              </div>
            </div>
          </section>

          <section className="kiveiv-card p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-[var(--kiveiv-text)]">数据导出治理</h3>
              <span className="text-xs text-[var(--kiveiv-text-subtle)]">格式、审批、留痕</span>
            </div>
            <div className="space-y-2">
              {exportTasks.slice(0, 4).map((task) => (
                <div key={task.id} className="flex items-center justify-between rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-3 py-2">
                  <div>
                    <p className="text-sm font-medium text-[var(--kiveiv-text)]">{task.name}</p>
                    <p className="text-xs text-[var(--kiveiv-text-subtle)]">{task.format} · {task.owner}</p>
                  </div>
                  <span className={`kiveiv-chip ${task.status === 'completed' ? '' : 'kiveiv-chip-accent'}`}>
                    {task.status === 'completed' ? '已完成' : task.status === 'running' ? '导出中' : '待审批'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1.08fr_1.92fr]">
          <div className="space-y-3">
            <div className="kiveiv-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--kiveiv-text)]">Profit</h3>
                <span className="text-[11px] text-[var(--kiveiv-text-subtle)]">Updated now</span>
              </div>
              <div className="grid gap-3 sm:grid-cols-[120px_1fr] sm:items-center">
                <div className="relative h-32 w-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={data.profitGauge.segments} dataKey="value" innerRadius={40} outerRadius={56} stroke="none">
                        {data.profitGauge.segments.map((entry) => (
                          <Cell key={entry.id} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-semibold text-[var(--kiveiv-text)]">{data.profitGauge.percent}%</span>
                    <span className="text-[11px] text-[var(--kiveiv-text-subtle)]">vs Yesterday</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {data.profitGauge.segments.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs">
                      <span className="inline-flex items-center gap-2 text-[var(--kiveiv-text-muted)]">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                        {item.label}
                      </span>
                      <span className="font-medium text-[var(--kiveiv-text)]">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="kiveiv-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--kiveiv-text)]">Top Performing Category</h3>
                <button type="button" className="kiveiv-btn-secondary h-7 px-2 text-[11px]">View all</button>
              </div>
              <p className="text-xs text-[var(--kiveiv-text-subtle)]">Stock Product</p>
              <div className="mt-3 space-y-2">
                {data.categoryMatrix.labels.map((label, rowIndex) => (
                  <div key={label} className="grid grid-cols-[60px_1fr] items-center gap-2">
                    <span className="text-[11px] text-[var(--kiveiv-text-subtle)]">{label}</span>
                    <div className="grid grid-cols-7 gap-1">
                      {data.categoryMatrix.values[rowIndex].map((value, colIndex) => (
                        <span
                          key={`${label}-${colIndex}`}
                          className="h-5 rounded-[6px]"
                          style={{ background: pickBlueShade(value) }}
                          title={`${label} / ${data.categoryMatrix.weekDays[colIndex]}: ${value}`}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="grid gap-3 sm:grid-cols-3">
              <TopStatCard label="Processed" value={String(data.overview.segmentedDocsToday)} icon={<Box className="h-4 w-4" />} />
              <TopStatCard label="Out for Delivery" value="2,948" icon={<Truck className="h-4 w-4" />} />
              <TopStatCard label="Total Revenue" value="$8.92K" icon={<DollarSign className="h-4 w-4" />} />
            </div>

            <div className="kiveiv-card p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--kiveiv-text)]">Category Performance Insight</h3>
                <button type="button" className="kiveiv-btn-secondary h-7 px-2 text-[11px]">View all</button>
              </div>
              <div className="grid gap-3 xl:grid-cols-[180px_1fr]">
                <div className="rounded-[var(--kiveiv-radius-inner)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[var(--kiveiv-border)]" />
                    <div>
                      <p className="text-sm font-semibold text-[var(--kiveiv-text)]">{data.topBuyer.name}</p>
                      <p className="text-xs text-[var(--kiveiv-accent)]">{data.topBuyer.role}</p>
                    </div>
                  </div>
                  <div className="mt-6 rounded-[var(--kiveiv-radius-control)] bg-[#0f1117] px-3 py-3 text-white">
                    <p className="text-xs opacity-70">Clothing Sales Jumped</p>
                    <p className="mt-1 text-3xl font-semibold">+{data.topBuyer.growth}%</p>
                  </div>
                </div>
                <div className="rounded-[var(--kiveiv-radius-inner)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface)] p-3">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="kiveiv-chip kiveiv-chip-accent">Electronics</span>
                    <span className="kiveiv-chip">Furniture</span>
                    <span className="kiveiv-chip">Fashion</span>
                  </div>
                  <div className="h-52">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={data.monthlyPerformance} margin={{ top: 12, right: 8, left: -12, bottom: 0 }}>
                        <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} />
                        <YAxis hide />
                        <Tooltip cursor={{ fill: '#f3f4f6' }} formatter={(value) => [`${value}%`, '完成率']} />
                        <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                          {data.monthlyPerformance.map((item, index) => (
                            <Cell key={item.month} fill={index % 2 === 0 ? '#2f6df6' : '#8eb4ff'} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <BottomKpi title="Customer Growth" value="38K" note="This is total new customers this month" />
              <BottomKpi title="Session Engagement" value="+58.4%" note="Since last analysis cycle" strong />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function CapabilityCard({ title, value, note, detail }) {
  return (
    <div className="kiveiv-card p-3">
      <p className="text-xs text-[var(--kiveiv-text-subtle)]">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-[var(--kiveiv-text)]">{value}</p>
      <p className="text-xs text-[var(--kiveiv-text-muted)]">{note}</p>
      <p className="mt-2 text-[11px] text-[var(--kiveiv-text-subtle)]">{detail}</p>
    </div>
  )
}

function ChannelRow({ label, done, pending }) {
  return (
    <div className="rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[var(--kiveiv-text)]">{label}</p>
        <span className="text-xs text-[var(--kiveiv-text-subtle)]">待处理 {pending}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-white">
        <div
          className="h-full rounded-full bg-[var(--kiveiv-accent)]"
          style={{ width: `${Math.max(8, Math.round((done / Math.max(1, done + pending)) * 100))}%` }}
        />
      </div>
      <p className="mt-1 text-xs text-[var(--kiveiv-text-subtle)]">已完成 {done}</p>
    </div>
  )
}

function TopStatCard({ label, value, icon }) {
  return (
    <div className="kiveiv-card p-3">
      <p className="text-xs text-[var(--kiveiv-text-subtle)]">{label}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-3xl font-semibold text-[var(--kiveiv-text)]">{value}</p>
        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[var(--kiveiv-accent-soft)] text-[var(--kiveiv-accent)]">{icon}</span>
      </div>
    </div>
  )
}

function BottomKpi({ title, value, note, strong = false }) {
  return (
    <div className="kiveiv-card p-4">
      <p className="text-sm font-medium text-[var(--kiveiv-text)]">{title}</p>
      <p className={`mt-2 text-5xl font-semibold ${strong ? 'text-[var(--kiveiv-accent)]' : 'text-[var(--kiveiv-text)]'}`}>{value}</p>
      <p className="mt-1 text-xs text-[var(--kiveiv-text-subtle)]">{note}</p>
    </div>
  )
}

function pickBlueShade(value) {
  if (value >= 62) return BLUE_SCALE[5]
  if (value >= 52) return BLUE_SCALE[4]
  if (value >= 42) return BLUE_SCALE[3]
  if (value >= 32) return BLUE_SCALE[2]
  if (value >= 22) return BLUE_SCALE[1]
  return BLUE_SCALE[0]
}
