import { EXTRACTION_SOURCE_LABELS } from '../../data/indexBuildingConstants.js'

export function StructuredExtractionPage({
  structuredTasks,
  activeTask,
  statusLabels,
  statusStyles,
  fields,
  rows,
  excelFields,
  excelRows,
  onSelectTask
}) {
  if (!activeTask || activeTask.type !== 'structured') {
    return (
      <section className="section-stack">
        <div className="kiveiv-card">
          <div className="kiveiv-card-header text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>可选任务</div>
          <div className="divide-y" style={{ borderColor: 'var(--kiveiv-border)' }}>
            {structuredTasks.map((task) => (
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
            {!structuredTasks.length && (
              <div className="px-4 py-6 text-center text-xs kiveiv-subtle">暂无结构化任务。</div>
            )}
          </div>
        </div>
      </section>
    )
  }

  const isExcel = activeTask.source === 'excel'

  return (
    <section className="section-stack">
      <div className="kiveiv-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>任务概览</h4>
            <p className="kiveiv-gap-title-note text-xs kiveiv-muted">来源：{EXTRACTION_SOURCE_LABELS[activeTask.source]}</p>
          </div>
          <span className={statusStyles[activeTask.status]}>{statusLabels[activeTask.status]}</span>
        </div>
        <div className="mt-3 grid gap-3 text-xs kiveiv-muted sm:grid-cols-2">
          <InfoItem label="任务ID" value={activeTask.id} />
          <InfoItem label="模型" value={activeTask.model} />
          <InfoItem label="创建时间" value={activeTask.createdAt} />
          <InfoItem label="更新" value={activeTask.updatedAt} />
        </div>
      </div>

      <div className="kiveiv-card p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>字段配置</h4>
          <span className="text-xs kiveiv-subtle">{isExcel ? 'Excel 表头自动识别' : '自定义字段'}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {(isExcel ? excelFields : fields.map((field) => field.name)).map((field) => (
            <span key={field} className="kiveiv-chip">{field}</span>
          ))}
        </div>
      </div>

      <div className="kiveiv-card p-4">
        <h4 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>结构化结果预览</h4>
        <div className="mt-4 overflow-x-auto">
          <table className="kiveiv-table">
            <thead>
              <tr>
                {(isExcel
                  ? ['项目名称', '负责人', '预算', '里程碑', '状态']
                  : ['条款名称', '触发条件', '责任主体', '金额/比例']
                ).map((col) => (
                  <th key={col} className="text-left">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(isExcel ? excelRows : rows).map((row) => (
                <tr key={row.id}>
                  {isExcel ? (
                    <>
                      <td className="text-xs kiveiv-muted">{row.name}</td>
                      <td className="text-xs kiveiv-muted">{row.owner}</td>
                      <td className="text-xs kiveiv-muted">{row.budget}</td>
                      <td className="text-xs kiveiv-muted">{row.milestone}</td>
                      <td className="text-xs kiveiv-muted">{row.status}</td>
                    </>
                  ) : (
                    <>
                      <td className="text-xs kiveiv-muted">{row.clause}</td>
                      <td className="text-xs kiveiv-muted">{row.condition}</td>
                      <td className="text-xs kiveiv-muted">{row.owner}</td>
                      <td className="text-xs kiveiv-muted">{row.amount}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
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
