import { useMemo, useState } from 'react'
import { useSchemeStore } from './SchemeStore.jsx'
import { SchemeEditorDrawer } from './SchemeEditorDrawer.jsx'

export function ResourceLibraryPage() {
  const { schemes, createScheme, duplicateScheme, updateScheme, deleteScheme, getScheme } = useSchemeStore()
  const [query, setQuery] = useState('')
  const [editor, setEditor] = useState({ open: false, schemeId: null, mode: 'edit' })

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return schemes
    return schemes.filter((scheme) => {
      const hay = [scheme.name, scheme.description, (scheme.tags || []).join(' ')].filter(Boolean).join(' ').toLowerCase()
      return hay.includes(keyword)
    })
  }, [schemes, query])

  const openEdit = (schemeId) => setEditor({ open: true, schemeId, mode: 'edit' })
  const openCreate = () => {
    const id = createScheme({ name: '新方案', tags: ['均衡'] })
    setEditor({ open: true, schemeId: id, mode: 'create' })
  }

  const activeScheme = editor.schemeId ? getScheme(editor.schemeId) : null

  return (
    <div className="section-stack h-full min-h-0 px-6 py-6 lg:px-8">
      <section className="kiveiv-card mb-6 p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>资源库</h2>
            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">管理可复用的方案（模型/工具/超参数），并按知识库绑定生效。</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="kiveiv-search-wrap">
              <span className="kiveiv-search-icon">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-3.5-3.5" />
                </svg>
              </span>
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索方案名称/标签"
                className="kiveiv-input kiveiv-input-search h-10 w-[320px] max-w-[48vw]"
              />
            </div>
            <button type="button" onClick={openCreate} className="kiveiv-btn-primary h-10 px-4 text-xs">
              + 新建方案
            </button>
          </div>
        </div>
      </section>

      <section className="kiveiv-stack-section">
        <div className="mb-3 flex items-center justify-between gap-3 text-xs kiveiv-muted">
          <span>共 {filtered.length} 个方案</span>
          <span>提示：方案更新会对绑定知识库实时生效（仅影响后续新任务）。</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filtered.map((scheme) => (
            <button
              key={scheme.id}
              type="button"
              onClick={() => openEdit(scheme.id)}
              className="kiveiv-card p-4 text-left hover:bg-[var(--kiveiv-surface-muted)]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[var(--kiveiv-text)]">{scheme.name}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-[var(--kiveiv-text-muted)]">{scheme.description || '暂无说明'}</p>
                </div>
                <span className="rounded-full bg-[var(--kiveiv-accent-soft)] px-2 py-1 text-[11px] font-semibold text-[var(--kiveiv-accent)]">
                  Scheme
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-[12px]">
                {(scheme.tags || []).slice(0, 4).map((tag) => (
                  <span key={tag} className="kiveiv-chip">{tag}</span>
                ))}
                {(scheme.tags || []).length > 4 && <span className="kiveiv-chip">+{(scheme.tags || []).length - 4}</span>}
              </div>

              <div className="mt-3 grid gap-2 text-xs kiveiv-muted sm:grid-cols-2">
                <Meta label="覆盖流程" value={pipelineSummary(scheme)} />
                <Meta label="工具" value={`${(scheme.tools || []).filter((t) => t.enabled).length}/${(scheme.tools || []).length}`} />
                <Meta label="更新时间" value={scheme.updatedAt || '--'} />
                <Meta label="ID" value={scheme.id} />
              </div>

              <div className="mt-4 flex items-center justify-end gap-3 text-xs">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    const nextId = duplicateScheme(scheme.id)
                    if (nextId) openEdit(nextId)
                  }}
                  className="kiveiv-kbd-link"
                >
                  复制
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    deleteScheme(scheme.id)
                  }}
                  className="kiveiv-kbd-link text-red-600"
                >
                  删除
                </button>
              </div>
            </button>
          ))}
          {!filtered.length && (
            <div className="kiveiv-card border-dashed p-10 text-center text-sm kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
              暂无方案，可点击右上角「新建方案」创建。
            </div>
          )}
        </div>
      </section>

      {editor.open && activeScheme && (
        <SchemeEditorDrawer
          open={editor.open}
          scheme={activeScheme}
          mode={editor.mode}
          onClose={() => setEditor({ open: false, schemeId: null, mode: 'edit' })}
          onSave={(payload) => {
            updateScheme(activeScheme.id, payload)
            setEditor({ open: false, schemeId: null, mode: 'edit' })
          }}
        />
      )}
    </div>
  )
}

function Meta({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-2 rounded-[var(--kiveiv-radius-inner)] border border-[var(--kiveiv-border)] bg-white px-3 py-2">
      <span className="text-[11px] text-[var(--kiveiv-text-subtle)]">{label}</span>
      <span className="truncate text-[11px] font-semibold text-[var(--kiveiv-text)]">{value}</span>
    </div>
  )
}

function pipelineSummary(scheme) {
  const pipelines = scheme?.pipelines || {}
  const list = []
  if (pipelines.parsing) list.push('解析')
  if (pipelines.segmentation) list.push('切分')
  if (pipelines.index) list.push('索引')
  if (pipelines.qa) list.push('问答')
  return list.length ? list.join(' / ') : '-'
}

