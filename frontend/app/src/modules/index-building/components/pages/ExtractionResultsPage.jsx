import { useMemo, useState } from 'react'
import { EXTRACTION_METHOD_LABELS, EXTRACTION_SOURCE_LABELS, EXTRACTION_TYPE_LABELS } from '../../data/indexBuildingConstants.js'
import { TaskListTable } from '../../../shared/components/TaskListTable.jsx'

export function ExtractionResultsPage({
  tasks,
  statusLabels,
  statusStyles,
  onOpenTaskDetail,
  onOpenProgress
}) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const total = tasks.length
  const running = tasks.filter((task) => task.status === 'running').length
  const completed = tasks.filter((task) => task.status === 'completed').length
  const failed = tasks.filter((task) => task.status === 'failed').length

  const filteredTasks = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return tasks.filter((task) => {
      if (statusFilter !== 'all' && task.status !== statusFilter) return false
      if (!keyword) return true
      const haystack = [
        task.name,
        task.docName,
        task.id,
        task.model,
        task.tags?.join(' ')
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(keyword)
    })
  }, [tasks, query, statusFilter])

  const statusOptions = [
    { id: 'all', label: '全部' },
    { id: 'queued', label: '排队中' },
    { id: 'running', label: '进行中' },
    { id: 'completed', label: '已完成' },
    { id: 'failed', label: '失败' }
  ]

  return (
    <section className="section-stack">
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: '任务总数', value: total },
          { label: '进行中', value: running },
          { label: '已完成', value: completed },
          { label: '失败', value: failed }
        ].map((item) => (
          <div key={item.label} className="kiveiv-card p-4">
            <p className="text-xs kiveiv-subtle">{item.label}</p>
            <p className="mt-2 text-2xl font-medium" style={{ color: 'var(--kiveiv-text)' }}>{item.value}</p>
          </div>
        ))}
      </div>

      <TaskListTable
        listTitle="任务列表"
        listMeta={`筛选结果 ${filteredTasks.length} / ${tasks.length}`}
        query={query}
        onQueryChange={setQuery}
        statusOptions={statusOptions}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        onResetFilters={() => {
          setQuery('')
          setStatusFilter('all')
        }}
      >
        <table className="kiveiv-table">
          <thead>
            <tr>
              <th className="text-left">任务</th>
              <th className="text-left">方式</th>
              <th className="text-left">类型</th>
              <th className="text-left">来源</th>
              <th className="text-left">标签</th>
              <th className="text-left">模型</th>
              <th className="text-left">状态</th>
              <th className="text-left">进度</th>
              <th className="text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <div className="kiveiv-table-title">{task.name}</div>
                  <div className="text-xs kiveiv-subtle">{task.id} · {task.docName}</div>
                </td>
                <td className="text-xs kiveiv-muted">
                  {EXTRACTION_METHOD_LABELS[task.method] || '-'}
                </td>
                <td className="text-xs kiveiv-muted">
                  {EXTRACTION_TYPE_LABELS[task.type]}
                </td>
                <td className="text-xs kiveiv-muted">
                  {EXTRACTION_SOURCE_LABELS[task.source]}
                </td>
                <td className="text-xs kiveiv-muted">
                  <div className="flex flex-wrap gap-1">
                    {task.tags?.length ? (
                      task.tags.map((tag) => (
                        <span key={tag} className="kiveiv-chip">{tag}</span>
                      ))
                    ) : (
                      <span className="text-xs kiveiv-subtle">-</span>
                    )}
                  </div>
                </td>
                <td className="text-xs kiveiv-muted">{task.model}</td>
                <td>
                  <span className={statusStyles[task.status]}>{statusLabels[task.status]}</span>
                </td>
                <td className="text-xs kiveiv-muted">
                  {task.status === 'running' ? (
                    <div className="w-28">
                      <div className="flex items-center justify-between text-[12px] kiveiv-subtle">
                        <span>进行中</span>
                        <span>{task.progress || 0}%</span>
                      </div>
                      <div className="mt-1 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all"
                          style={{ width: `${task.progress || 0}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs kiveiv-subtle">{task.status === 'completed' ? '100%' : '-'}</span>
                  )}
                </td>
                <td className="text-xs kiveiv-muted">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => onOpenTaskDetail(task)}
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      查看详情
                    </button>
                    {task.status === 'running' && (
                      <button
                        type="button"
                        onClick={() => onOpenProgress(task.id)}
                        className="font-medium text-gray-500 hover:text-gray-800"
                      >
                        查看进度
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!filteredTasks.length && (
              <tr>
                <td colSpan={9} className="py-6 text-center text-xs kiveiv-subtle">
                  暂无符合条件的任务，请调整筛选条件或创建新任务。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TaskListTable>
    </section>
  )
}
