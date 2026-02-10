import { EXTRACTION_SOURCE_LABELS } from '../../data/indexBuildingConstants.js'

export function GraphExtractionPage({
  graphTasks,
  activeTask,
  statusLabels,
  statusStyles,
  triples,
  stats,
  chunks,
  onSelectTask
}) {
  if (!activeTask || activeTask.type !== 'graph') {
    return (
      <section className="section-stack">
        <div className="kiveiv-card">
          <div className="kiveiv-card-header text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>可选任务</div>
          <div className="divide-y" style={{ borderColor: 'var(--kiveiv-border)' }}>
            {graphTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between px-4 py-3 text-sm">
                <div>
                  <p className="font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{task.name}</p>
                  <p className="text-xs kiveiv-subtle">{task.id} · {task.docName}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onSelectTask(task)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                >
                  查看详情
                </button>
              </div>
            ))}
            {!graphTasks.length && (
              <div className="px-4 py-6 text-center text-xs kiveiv-subtle">暂无图结构任务。</div>
            )}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-stack">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <div className="kiveiv-card p-4">
        <h4 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>任务概览</h4>
          <div className="mt-3 grid gap-3 text-xs kiveiv-muted sm:grid-cols-2">
            <InfoItem label="任务ID" value={activeTask.id} />
            <InfoItem label="来源" value={EXTRACTION_SOURCE_LABELS[activeTask.source]} />
            <InfoItem label="状态" value={statusLabels[activeTask.status]} />
            <InfoItem label="模型" value={activeTask.model} />
            <InfoItem label="创建时间" value={activeTask.createdAt} />
            <InfoItem label="更新" value={activeTask.updatedAt} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {activeTask.tags?.length ? (
              activeTask.tags.map((tag) => (
                <span key={tag} className="kiveiv-chip">{tag}</span>
              ))
            ) : (
              <span className="text-xs kiveiv-subtle">暂无标签</span>
            )}
          </div>
        </div>

      <div className="kiveiv-card p-4">
        <h4 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>图谱统计</h4>
          <div className="mt-3 grid gap-3 text-xs kiveiv-muted sm:grid-cols-2">
            <InfoItem label="节点数" value={stats.nodes} />
            <InfoItem label="边数" value={stats.edges} />
          </div>
          <div className="mt-4">
            <p className="text-[12px] font-semibold uppercase tracking-wide kiveiv-subtle">关系类型分布</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {stats.relations.map((item) => (
                <span key={item.name} className="kiveiv-chip">{item.name} · {item.count}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="kiveiv-card p-4">
        <h3 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>三元组结果</h3>
        <div className="mt-4 overflow-x-auto">
          <table className="kiveiv-table">
            <thead>
              <tr>
                <th className="text-left">主体</th>
                <th className="text-left">关系</th>
                <th className="text-left">客体</th>
                <th className="text-left">来源切片</th>
                <th className="text-left">置信度</th>
              </tr>
            </thead>
            <tbody>
              {triples.map((item) => (
                <tr key={item.id}>
                  <td className="kiveiv-table-title">{item.head}</td>
                  <td className="text-xs kiveiv-muted">{item.relation}</td>
                  <td className="text-xs kiveiv-muted">{item.tail}</td>
                  <td className="text-xs kiveiv-subtle">{item.chunkId}</td>
                  <td className="text-xs kiveiv-subtle">{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="kiveiv-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>溯源切片</h3>
            <p className="kiveiv-gap-title-note text-xs kiveiv-muted">抽取结果的 chunk 溯源卡片。</p>
          </div>
          <span className={statusStyles[activeTask.status]}>{statusLabels[activeTask.status]}</span>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {chunks.map((chunk) => (
            <div key={chunk.id} className="bento-tile" style={{ aspectRatio: '1 / 1' }}>
              <div className="bento-tile-inner flex h-full flex-col">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[12px] kiveiv-subtle">切片 {chunk.id}</p>
                    <p className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{chunk.title}</p>
                  </div>
                  <span className="kiveiv-chip">{chunk.tokenCount} tokens</span>
                </div>
                <div className="mt-3 flex-1 text-xs leading-relaxed kiveiv-muted">{chunk.content}</div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {chunk.tags.map((tag) => (
                    <span key={tag} className="kiveiv-chip">{tag}</span>
                  ))}
                </div>
                <button type="button" className="mt-3 text-[12px] font-semibold text-blue-600 hover:text-blue-700">
                  溯源定位
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[12px] uppercase tracking-wide kiveiv-subtle">{label}</p>
      <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{value || '-'}</p>
    </div>
  )
}
