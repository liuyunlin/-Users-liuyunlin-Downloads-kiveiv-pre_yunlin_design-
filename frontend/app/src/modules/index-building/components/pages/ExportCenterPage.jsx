import { useMemo, useState } from 'react'

const CATEGORY_LABELS = {
  graph: '图结构数据',
  structured: '结构化数据'
}

const JOB_STATUS_LABELS = {
  completed: '已完成',
  running: '处理中',
  failed: '失败'
}

const isGraphPackage = (item) => {
  const type = (item.type || '').toLowerCase()
  return type.includes('graph') || type.includes('gexf') || type.includes('rdf')
}

export function ExportCenterPage({ packages, exportFields = [], exportJobs = [] }) {
  const [category, setCategory] = useState(null)
  const [query, setQuery] = useState('')

  const graphPackages = useMemo(
    () => packages.filter((item) => isGraphPackage(item)),
    [packages]
  )
  const structuredPackages = useMemo(
    () => packages.filter((item) => !isGraphPackage(item)),
    [packages]
  )
  const activePackages = category === 'graph' ? graphPackages : structuredPackages

  const normalizedQuery = query.trim().toLowerCase()
  const filteredPackages = activePackages.filter((item) => {
    if (!normalizedQuery) return true
    return [item.name, item.id, item.type].some((value) => value?.toLowerCase().includes(normalizedQuery))
  })

  const activeFields = useMemo(
    () => exportFields.filter((item) => item.category === category),
    [category, exportFields]
  )
  const activeJobs = useMemo(
    () => exportJobs.filter((item) => item.category === category),
    [category, exportJobs]
  )

  return (
    <section className="section-stack">
      {category ? (
        <div className="kiveiv-card p-5 space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-medium" style={{ color: 'var(--kiveiv-text)' }}>{CATEGORY_LABELS[category]}</h3>
              <p className="kiveiv-gap-title-note text-xs kiveiv-muted">搜索并选择具体任务的导出数据。</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setCategory(null)
                setQuery('')
              }}
              className="kiveiv-btn-secondary"
            >
              返回分类
            </button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[220px]">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索任务名称、文件类型或 ID"
                className="kiveiv-input w-full pl-9 text-sm"
              />
            </div>
            <div className="text-xs kiveiv-subtle">筛选结果 {filteredPackages.length}/{activePackages.length}</div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {filteredPackages.map((item) => (
              <div key={item.id} className="bento-tile">
                <div className="bento-tile-inner">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{item.name}</p>
                      <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">{item.type} · {item.size}</p>
                    </div>
                    <button type="button" className="kiveiv-btn-secondary kiveiv-btn-sm">下载</button>
                  </div>
                  <p className="kiveiv-gap-title-note text-xs kiveiv-muted">更新：{item.updatedAt}</p>
                </div>
              </div>
            ))}
            {!filteredPackages.length && (
              <div className="col-span-full kiveiv-card border-dashed p-6 text-center text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                没有匹配的导出结果。
              </div>
            )}
          </div>

          <div className="kiveiv-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>导出字段映射</h4>
              <span className="text-xs kiveiv-subtle">命中规则与库字段映射管理</span>
            </div>
            <div className="kiveiv-table-wrap mt-3 overflow-x-auto">
              <table className="kiveiv-table min-w-[760px]">
                <thead>
                  <tr>
                    <th>字段</th>
                    <th>展示名</th>
                    <th>类型</th>
                    <th>是否必填</th>
                    <th>命中规则</th>
                    <th>库字段</th>
                  </tr>
                </thead>
                <tbody>
                  {activeFields.map((item) => (
                    <tr key={item.id}>
                      <td className="text-xs">{item.fieldName}</td>
                      <td className="text-xs">{item.displayName}</td>
                      <td className="text-xs">{item.type}</td>
                      <td className="text-xs">{item.required ? '是' : '否'}</td>
                      <td className="text-xs">{item.hitRule}</td>
                      <td className="text-xs">{item.mappedTo}</td>
                    </tr>
                  ))}
                  {!activeFields.length && (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-xs kiveiv-subtle">暂无字段配置</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="kiveiv-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h4 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>导出任务历史</h4>
              <span className="text-xs kiveiv-subtle">导出任务执行与时效管理</span>
            </div>
            <div className="kiveiv-table-wrap mt-3 overflow-x-auto">
              <table className="kiveiv-table min-w-[760px]">
                <thead>
                  <tr>
                    <th>任务 ID</th>
                    <th>导出格式</th>
                    <th>记录数</th>
                    <th>触发人</th>
                    <th>触发时间</th>
                    <th>过期时间</th>
                    <th>状态</th>
                  </tr>
                </thead>
                <tbody>
                  {activeJobs.map((job) => (
                    <tr key={job.id}>
                      <td className="text-xs">{job.id}</td>
                      <td className="text-xs">{job.format}</td>
                      <td className="text-xs">{job.recordCount}</td>
                      <td className="text-xs">{job.triggerBy}</td>
                      <td className="text-xs">{job.triggeredAt}</td>
                      <td className="text-xs">{job.expiresAt}</td>
                      <td className="text-xs">{JOB_STATUS_LABELS[job.status] || job.status}</td>
                    </tr>
                  ))}
                  {!activeJobs.length && (
                    <tr>
                      <td colSpan={7} className="py-4 text-center text-xs kiveiv-subtle">暂无导出任务</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <CategoryCard
            title="图结构数据"
            description="图谱与三元组导出包。"
            count={graphPackages.length}
            actionLabel="进入图结构数据"
            onAction={() => setCategory('graph')}
            icon={(
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 7h4v4H5zM15 13h4v4h-4zM5 15h4v4H5zM15 5h4v4h-4z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l6 4M9 17l6-4" />
              </svg>
            )}
          />
          <CategoryCard
            title="结构化数据"
            description="结构化表格与字段导出包。"
            count={structuredPackages.length}
            actionLabel="进入结构化数据"
            onAction={() => setCategory('structured')}
            icon={(
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6v12M15 6v12" />
              </svg>
            )}
          />
        </div>
      )}

      <div className="kiveiv-card p-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>版本快照</h4>
          <button
            type="button"
            className="kiveiv-btn-secondary kiveiv-btn-sm"
          >
            新建快照
          </button>
        </div>
        <div className="mt-3 space-y-3">
          <div className="rounded-xl border px-3 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
            快照功能待后端联动，当前为 UI 占位。
          </div>
        </div>
      </div>
    </section>
  )
}

function CategoryCard({ title, description, count, actionLabel, onAction, icon }) {
  return (
    <div className="bento-tile">
      <div className="bento-tile-inner relative overflow-hidden p-6">
        <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full" style={{ background: 'var(--kiveiv-surface-muted)' }} />
        <div className="pointer-events-none absolute -left-8 -bottom-8 h-20 w-20 rounded-full" style={{ background: 'var(--kiveiv-surface-muted)' }} />
        <div className="relative flex h-full flex-col gap-4">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: 'var(--kiveiv-surface-muted)', color: 'var(--kiveiv-text)' }}>
              {icon}
            </span>
            <div>
              <p className="text-base font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</p>
              <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{description}</p>
            </div>
          </div>
          <div className="text-xs kiveiv-muted">已生成 {count} 个导出包</div>
          <button type="button" onClick={onAction} className="kiveiv-btn-primary w-fit">
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
