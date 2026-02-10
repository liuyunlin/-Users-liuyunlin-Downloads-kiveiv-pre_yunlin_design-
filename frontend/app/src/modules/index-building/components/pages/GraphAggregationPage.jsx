export function GraphAggregationPage({
  graphTasks,
  selectedTaskIds,
  onToggleTask,
  onSelectAll,
  onClearSelection,
  onAggregate,
  aggregated
}) {
  return (
    <section className="section-stack">
      <div className="kiveiv-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>聚合任务选择</h4>
            <p className="kiveiv-gap-title-note text-xs kiveiv-muted">可多选已完成图结构任务，结果自动叠加。</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <button
              type="button"
              onClick={onSelectAll}
              className="kiveiv-btn-secondary kiveiv-btn-sm"
            >
              全选
            </button>
            <button
              type="button"
              onClick={onClearSelection}
              className="kiveiv-btn-secondary kiveiv-btn-sm"
            >
              清空
            </button>
            <button
              type="button"
              onClick={onAggregate}
              disabled={!selectedTaskIds.size}
              className="kiveiv-btn-primary kiveiv-btn-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              生成聚合图谱
            </button>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {graphTasks.map((task) => {
            const selected = selectedTaskIds.has(task.id)
            return (
              <div key={task.id} className="flex items-center justify-between rounded-xl border px-3 py-2" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{task.name}</p>
                  <p className="text-xs kiveiv-subtle">{task.id} · {task.docName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onToggleTask(task.id)}
                  className={`inline-flex h-6 w-6 items-center justify-center rounded border text-[12px] ${
                    selected ? 'border-blue-600 bg-blue-600 text-white' : 'border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {selected ? '✓' : ''}
                </button>
              </div>
            )
          })}
          {!graphTasks.length && (
            <div className="kiveiv-card border-dashed p-6 text-center text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
              暂无可聚合的图结构任务。
            </div>
          )}
        </div>
      </div>

      {aggregated ? (
        <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
          <div className="kiveiv-card p-4">
            <h4 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>聚合图谱概览</h4>
            <div className="mt-3 grid gap-3 text-xs kiveiv-muted sm:grid-cols-2">
              <InfoItem label="聚合任务" value={`${selectedTaskIds.size} 个`} />
              <InfoItem label="节点数" value="128" />
              <InfoItem label="边数" value="256" />
              <InfoItem label="关系类型" value="12" />
            </div>
            <div className="mt-4 kiveiv-card border-dashed p-6 text-center text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
              Network Graph 可视化占位
            </div>
          </div>

          <div className="kiveiv-card p-4">
            <h4 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>图谱查询</h4>
            <div className="mt-3 space-y-3 text-xs kiveiv-muted">
              <input
                placeholder="输入节点/关系关键词"
                className="kiveiv-input w-full text-xs"
              />
              <div className="grid gap-2 sm:grid-cols-2">
                <input
                  placeholder="节点类型筛选"
                  className="kiveiv-input text-xs"
                />
                <input
                  placeholder="关系类型筛选"
                  className="kiveiv-input text-xs"
                />
              </div>
              <button
                type="button"
                className="kiveiv-btn-primary w-full"
              >
                查询图谱
              </button>
              <div className="rounded-xl border p-4 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
                查询结果占位，支持节点/关系列表展示。
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="kiveiv-card border-dashed p-6 text-center text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
          请选择任务并生成聚合图谱。
        </div>
      )}
    </section>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[12px] uppercase tracking-wide kiveiv-subtle">{label}</p>
      <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{value}</p>
    </div>
  )
}
