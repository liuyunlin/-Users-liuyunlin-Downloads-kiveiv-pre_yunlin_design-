import { useEffect, useMemo, useRef, useState } from 'react'
import { OverlayDrawer } from '../../shared/components/OverlayDrawer.jsx'
import { useSchemeStore } from '../../resource-library/SchemeStore.jsx'
import { SchemeEditorDrawer } from '../../resource-library/SchemeEditorDrawer.jsx'

const DEFAULT_FORM = {
  name: '',
  description: '',
  visibility: '私有',
  type: 'general',
  pinned: false,
  coverPreset: 'sky',
  defaultSchemeId: 'SCH-DEFAULT',
  llmModel: 'gpt-4.1-mini',
  embeddingModel: 'text-embedding-3-small',
  parseMethod: 'chunk',
  chunkRule: 'paragraph',
  chunkPreset: 'default',
  modelParagraphDetection: true,
  maxParagraphDepth: 3,
  maxChunkSize: 1200,
  splitLength: 800,
  indexSize: 64,
  qaMinScore: 0.7,
  qaMaxPairs: 30,
  qaExtractTables: true,
  layoutMode: 'vertical',
  indexMode: 'hybrid',
  defaultTopK: 5
}

const COVER_PRESETS = [
  { id: 'sky', label: '云蓝封面' },
  { id: 'mint', label: '青绿封面' },
  { id: 'ink', label: '墨黑封面' },
  { id: 'slate', label: '灰蓝封面' }
]

const LLM_OPTIONS = ['gpt-4.1-mini', 'gpt-4.1', 'qwen-max', 'deepseek-chat']
const EMBEDDING_OPTIONS = ['text-embedding-3-small', 'text-embedding-3-large', 'bge-m3']

export function KnowledgeBaseList({ bases, filesByBase = {}, onCreate, onDelete, onRestore, onUpdate, onOpen }) {
  const [query, setQuery] = useState('')
  const [createOpen, setCreateOpen] = useState(false)
  const [editTarget, setEditTarget] = useState(null)
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [deleteArmed, setDeleteArmed] = useState(false)
  const [nameError, setNameError] = useState('')
  const [form, setForm] = useState(DEFAULT_FORM)
  const [undoState, setUndoState] = useState(null)
  const [schemeEditor, setSchemeEditor] = useState({ open: false, schemeId: null, mode: 'edit' })
  const undoTimerRef = useRef(null)
  const { schemes, createScheme, updateScheme, getScheme } = useSchemeStore()

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    const matched = keyword
      ? bases.filter((base) => {
          const haystack = [base.name, base.description, base.owner, base.embeddingModel, base.vectorModel]
            .filter(Boolean)
            .join(' ')
            .toLowerCase()
          return haystack.includes(keyword)
        })
      : bases
    return [...matched].sort((left, right) => {
      if (Boolean(left.pinned) !== Boolean(right.pinned)) return left.pinned ? -1 : 1
      return normalizeTimestamp(right.updatedAt) - normalizeTimestamp(left.updatedAt)
    })
  }, [bases, query])

  const toggleSelection = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleSelectAll = () => {
    if (!filtered.length) return
    const allSelected = filtered.every((base) => selectedIds.has(base.id))
    setSelectedIds(new Set(allSelected ? [] : filtered.map((base) => base.id)))
  }

  const clearSelection = () => {
    setSelectedIds(new Set())
  }

  const openCreate = () => {
    setForm(DEFAULT_FORM)
    setNameError('')
    setEditTarget(null)
    setCreateOpen(true)
  }

  const openEdit = (base) => {
    setEditTarget(base)
    setNameError('')
    setForm({
      name: base.name || '',
      description: base.description || '',
      visibility: base.visibility || '私有',
      type: base.typeLabel?.includes('垂类') ? 'vertical' : 'general',
      pinned: Boolean(base.pinned),
      coverPreset: base.coverPreset || 'sky',
      defaultSchemeId: base.defaultSchemeId || 'SCH-DEFAULT',
      llmModel: base.llmModel || 'gpt-4.1-mini',
      embeddingModel: base.embeddingModel || base.vectorModel || 'text-embedding-3-small',
      parseMethod: base.parseMethod || 'chunk',
      chunkRule: base.chunkRule || 'paragraph',
      chunkPreset: base.chunkPreset || 'default',
      modelParagraphDetection: base.modelParagraphDetection !== false,
      maxParagraphDepth: Number(base.maxParagraphDepth || 3),
      maxChunkSize: Number(base.maxChunkSize || 1200),
      splitLength: Number(base.splitLength || 800),
      indexSize: Number(base.indexSize || 64),
      qaMinScore: Number(base.qaMinScore || 0.7),
      qaMaxPairs: Number(base.qaMaxPairs || 30),
      qaExtractTables: base.qaExtractTables !== false,
      layoutMode: base.layoutMode || 'vertical',
      indexMode: base.indexMode || 'hybrid',
      defaultTopK: Number(base.defaultTopK || 5)
    })
    setCreateOpen(true)
  }

  const closeEditor = () => {
    setCreateOpen(false)
    setEditTarget(null)
    setNameError('')
  }

  const submitForm = () => {
    const name = form.name.trim()
    if (!name) return
    const exists = bases.some((base) => {
      if (editTarget && base.id === editTarget.id) return false
      return base.name?.trim().toLowerCase() === name.toLowerCase()
    })
    if (exists) {
      setNameError('知识库名称已存在，请换一个名称。')
      return
    }

    const payload = {
      name,
      description: form.description.trim(),
      visibility: form.visibility,
      type: form.type,
      pinned: form.pinned,
      coverPreset: form.coverPreset,
      defaultSchemeId: form.defaultSchemeId || 'SCH-DEFAULT',
      llmModel: form.llmModel,
      embeddingModel: form.embeddingModel,
      parseMethod: form.parseMethod,
      chunkRule: form.chunkRule,
      chunkPreset: form.chunkPreset,
      modelParagraphDetection: Boolean(form.modelParagraphDetection),
      maxParagraphDepth: Number(form.maxParagraphDepth) || 3,
      maxChunkSize: Number(form.maxChunkSize) || 1200,
      splitLength: Number(form.splitLength) || 800,
      indexSize: Number(form.indexSize) || 64,
      qaMinScore: Number(form.qaMinScore) || 0.7,
      qaMaxPairs: Number(form.qaMaxPairs) || 30,
      qaExtractTables: Boolean(form.qaExtractTables),
      layoutMode: form.layoutMode,
      vectorModel: form.embeddingModel,
      indexMode: form.indexMode,
      defaultTopK: Number(form.defaultTopK) || 5
    }

    if (editTarget) {
      onUpdate?.(editTarget.id, {
        ...payload,
        typeLabel: payload.type === 'vertical' ? '垂类知识库' : '通用知识库'
      })
    } else {
      onCreate?.(payload)
    }
    closeEditor()
  }

  const handleDelete = () => {
    if (!selectedIds.size) return
    setDeleteArmed(true)
  }

  const clearUndoTimer = () => {
    if (undoTimerRef.current) {
      window.clearTimeout(undoTimerRef.current)
      undoTimerRef.current = null
    }
  }

  const queueUndo = (snapshot) => {
    clearUndoTimer()
    if (!snapshot?.bases?.length) return
    setUndoState({
      snapshot,
      count: snapshot.bases.length
    })
    undoTimerRef.current = window.setTimeout(() => {
      setUndoState(null)
      undoTimerRef.current = null
    }, 8000)
  }

  const confirmDeleteBases = () => {
    if (!selectedIds.size) return
    const snapshot = onDelete?.(Array.from(selectedIds))
    queueUndo(snapshot)
    setDeleteArmed(false)
    setSelectionMode(false)
    setSelectedIds(new Set())
  }

  const restoreDeleted = () => {
    if (!undoState?.snapshot) return
    onRestore?.(undoState.snapshot)
    setUndoState(null)
    clearUndoTimer()
  }

  useEffect(() => {
    return () => clearUndoTimer()
  }, [])

  return (
    <section className="section-stack kb-list-shell">
      <header className="kb-toolbar">
        <div className="kb-toolbar-row">
          <div className="kiveiv-search-wrap kb-toolbar-search">
            <span className="kiveiv-search-icon">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-3.5-3.5" />
              </svg>
            </span>
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Escape') setQuery('')
              }}
              placeholder="搜索名称、描述、模型"
              className="kiveiv-input kiveiv-input-search h-10 w-full pr-9"
            />
            {query.trim() && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-[var(--kiveiv-text-subtle)] hover:bg-[var(--kiveiv-surface-muted)] hover:text-[var(--kiveiv-text)]"
                aria-label="清空搜索"
                title="清空搜索"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <span className="kiveiv-pill-tab kb-toolbar-count px-3 py-2 text-xs text-[var(--kiveiv-text-muted)]">
            共 {filtered.length} 个知识库
          </span>
          <button
            type="button"
            onClick={() => {
              setSelectionMode((prev) => {
                const next = !prev
                if (!next) {
                  setSelectedIds(new Set())
                  setDeleteArmed(false)
                }
                return next
              })
            }}
            className="kiveiv-btn-secondary"
          >
            {selectionMode ? '退出批量' : '批量管理'}
          </button>
          <button
            type="button"
            onClick={openCreate}
            className="kiveiv-btn-primary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
            </svg>
            新建
          </button>
        </div>
      </header>

      {selectionMode && (
        <div className="kiveiv-card flex flex-wrap items-center justify-between gap-2 p-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="kiveiv-chip">已选 {selectedIds.size}</span>
            <button type="button" onClick={handleSelectAll} className="kiveiv-btn-secondary kiveiv-btn-sm">
              {filtered.length && filtered.every((base) => selectedIds.has(base.id)) ? '取消全选' : '全选当前列表'}
            </button>
            <button type="button" onClick={clearSelection} className="kiveiv-btn-secondary kiveiv-btn-sm">
              清空
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {!deleteArmed ? (
              <button
                type="button"
                onClick={handleDelete}
                disabled={!selectedIds.size}
                className={`kiveiv-btn-sm ${selectedIds.size ? 'kiveiv-btn-danger' : 'kiveiv-btn-disabled'}`}
              >
                删除所选
              </button>
            ) : (
              <>
                <span className="text-xs text-[var(--kiveiv-text-muted)]">确认删除 {selectedIds.size} 个知识库？</span>
                <button type="button" onClick={() => setDeleteArmed(false)} className="kiveiv-btn-secondary kiveiv-btn-sm">
                  取消
                </button>
                <button type="button" onClick={confirmDeleteBases} className="kiveiv-btn-danger kiveiv-btn-sm">
                  确认删除
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="kb-card-grid kb-board-grid">
        {filtered.map((base) => {
          const isSelected = selectedIds.has(base.id)
          return (
          <div
            key={base.id}
            onClick={() => {
              if (selectionMode) {
                toggleSelection(base.id)
              } else {
                onOpen?.(base)
              }
            }}
            className={`kb-card kb-board-card relative w-full cursor-pointer text-left ${base.pinned ? 'kb-card-pinned' : ''} ${selectionMode ? 'kb-card-selecting' : ''} ${isSelected ? 'kb-card-selected' : ''}`}
          >
            <div className="kb-card-inner kb-board-card-inner">
              {selectionMode && (
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation()
                    toggleSelection(base.id)
                  }}
                  className={`kb-select-handle ${isSelected ? 'kb-select-handle-active' : ''}`}
                  aria-label={isSelected ? '取消选择知识库' : '选择知识库'}
                >
                  <span className={`kb-select-check ${isSelected ? 'kb-select-check-active' : ''}`}>
                    {isSelected && (
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </span>
                  <span className="kb-select-label">{isSelected ? '已选中' : '点击选择'}</span>
                </button>
              )}
              <div className="kb-card-body kb-board-body">
                <div className={`kb-card-cover kb-card-cover-${base.coverPreset || 'sky'}`}>
                  <div className="kb-card-cover-stack" aria-hidden="true">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="kb-card-cover-doc">
                        <span className="kb-card-cover-line" />
                        <span className="kb-card-cover-line" />
                        <span className="kb-card-cover-line" />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="kb-card-head kb-board-head">
                  <span className={`kb-board-glyph kb-board-glyph-${base.coverPreset || 'sky'}`}>
                    <BoardGlyph preset={base.coverPreset} />
                  </span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      onUpdate?.(base.id, { pinned: !base.pinned })
                    }}
                    className={`inline-flex h-7 shrink-0 items-center whitespace-nowrap rounded-full border px-2 text-[11px] ${
                      base.pinned
                        ? 'border-transparent bg-[#fff3bf] text-[#b08900]'
                        : 'border-transparent bg-[var(--kiveiv-surface)] text-[var(--kiveiv-text-muted)] hover:bg-[#f4f6fb]'
                    }`}
                  >
                    {base.pinned ? '已收藏' : '置顶'}
                  </button>
                </div>

                <div className="kb-card-content kb-board-content">
                  <p className="kb-card-title">{base.name}</p>
                  <p className="kb-card-desc">{base.description || '为该知识库补充说明与用途。'}</p>
                  <div className="kb-card-meta-row">
                    <div className="kb-card-tags">
                      <span className="kb-card-tag">{base.visibility}</span>
                      <span className="kb-card-tag">{indexModeLabel(base.indexMode)}</span>
                    </div>
                    <div className="kb-card-stats">
                      <span className="kb-card-stat" title="向量模型">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <circle cx="6" cy="12" r="2" />
                          <circle cx="12" cy="7" r="2" />
                          <circle cx="18" cy="12" r="2" />
                          <circle cx="12" cy="17" r="2" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M7.6 11l2.8-2.2m3.2 0L16.4 11m-8.8 2l2.8 2.2m3.2 0L16.4 13" />
                        </svg>
                        <span className="truncate">{base.embeddingModel || base.vectorModel || '未设置模型'}</span>
                      </span>
                      <span className="kb-card-stat" title="默认召回 TopK">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 8h8M8 12h8M8 16h5" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 15l2 2 3-3" />
                        </svg>
                        <span>TopK {base.defaultTopK || 5}</span>
                      </span>
                      <span className="kb-card-stat" title="文件数量">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V8z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 3v5h5" />
                        </svg>
                        <span>{(filesByBase[base.id] || []).length} 个文件</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="kb-card-footer">
                  <span className="kb-board-time">{formatRelativeTime(base.updatedAt)}</span>
                  <div className="kb-card-actions">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        onOpen?.(base)
                      }}
                      className="kb-card-enter-btn"
                    >
                      进入
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation()
                        openEdit(base)
                      }}
                      className="kiveiv-kbd-link text-xs"
                    >
                      编辑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          )
        })}
        {!filtered.length && (
          <div className="col-span-full rounded-lg border border-dashed border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-6 py-12 text-center text-sm kiveiv-subtle">
            暂无知识库
          </div>
        )}
      </div>

      {undoState && (
        <div className="kiveiv-inline-toast rounded-[var(--kiveiv-radius-inner)] border border-[var(--kiveiv-border)] bg-white px-4 py-3 text-sm shadow-[var(--kiveiv-shadow-soft)]">
          <div className="flex items-center gap-3">
            <span className="kiveiv-muted">已删除 {undoState.count} 个知识库</span>
            <button type="button" onClick={restoreDeleted} className="kiveiv-kbd-link font-medium">
              撤销
            </button>
          </div>
        </div>
      )}

      {createOpen && (
        <EditorDrawer
          open={createOpen}
          form={form}
          setForm={setForm}
          schemes={schemes}
          onCreateScheme={() => {
            const schemeId = createScheme({ name: `${form.name?.trim() || '新知识库'} - 方案` })
            setForm((prev) => ({ ...prev, defaultSchemeId: schemeId || prev.defaultSchemeId }))
            if (schemeId) {
              setSchemeEditor({ open: true, schemeId, mode: 'create' })
            }
          }}
          coverPresets={COVER_PRESETS}
          nameError={nameError}
          onClose={closeEditor}
          onSubmit={submitForm}
          isEdit={Boolean(editTarget)}
        />
      )}

      {schemeEditor.open && schemeEditor.schemeId && (
        <SchemeEditorDrawer
          open={schemeEditor.open}
          scheme={getScheme(schemeEditor.schemeId)}
          mode={schemeEditor.mode}
          onClose={() => setSchemeEditor({ open: false, schemeId: null, mode: 'edit' })}
          onSave={(payload) => {
            updateScheme(schemeEditor.schemeId, payload)
            setSchemeEditor({ open: false, schemeId: null, mode: 'edit' })
          }}
        />
      )}

    </section>
  )
}

function EditorDrawer({ open, form, setForm, schemes, onCreateScheme, coverPresets, nameError, onClose, onSubmit, isEdit }) {
  return (
    <OverlayDrawer
      open={open}
      title={isEdit ? '编辑知识库' : '新建知识库'}
      description="在不中断知识库列表浏览的前提下完成编辑。"
      widthClassName="max-w-xl"
      onClose={onClose}
      footer={(
        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-btn-secondary"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!form.name.trim()}
            className={`kiveiv-btn-primary ${form.name.trim() ? '' : 'kiveiv-btn-disabled'}`}
          >
            {isEdit ? '保存' : '创建'}
          </button>
        </div>
      )}
    >
      <div className="space-y-4">
          <div className="kiveiv-form-row">
            <label className="text-xs font-semibold kiveiv-muted">知识库名称</label>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              placeholder="请输入知识库名称"
              className="kiveiv-input mt-2 w-full"
            />
            {nameError && <p className="kiveiv-gap-title-note text-xs text-red-500">{nameError}</p>}
          </div>
          <div className="kiveiv-form-row kiveiv-form-row-top">
            <label className="text-xs font-semibold kiveiv-muted">知识库介绍</label>
            <textarea
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              placeholder="请输入知识库简介"
              rows={3}
              className="kiveiv-textarea mt-2 w-full"
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="kiveiv-form-row">
              <label className="text-xs font-semibold kiveiv-muted">权限范围</label>
              <select
                value={form.visibility}
                onChange={(event) => setForm((prev) => ({ ...prev, visibility: event.target.value }))}
                className="kiveiv-select mt-2 w-full"
              >
                <option value="私有">私有</option>
                <option value="团队">团队</option>
                <option value="公开">公开</option>
              </select>
            </div>
            <div className="kiveiv-form-row">
              <label className="text-xs font-semibold kiveiv-muted">知识库类型</label>
              <select
                value={form.type}
                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
                className="kiveiv-select mt-2 w-full"
              >
                <option value="general">通用知识库</option>
                <option value="vertical">垂类知识库</option>
              </select>
            </div>
          </div>

          {!isEdit && (
            <div className="kiveiv-inner-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-[var(--kiveiv-text)]">默认方案</p>
                  <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">上传后会默认选中该方案（可在上传步骤2临时更换）。</p>
                </div>
                <button type="button" onClick={onCreateScheme} className="kiveiv-btn-secondary h-9 px-3 text-xs">
                  新建并编辑
                </button>
              </div>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                <label className="kiveiv-form-row md:col-span-2">
                  <span className="text-xs font-semibold kiveiv-muted">选择资源库方案</span>
                  <select
                    value={form.defaultSchemeId}
                    onChange={(event) => setForm((prev) => ({ ...prev, defaultSchemeId: event.target.value }))}
                    className="kiveiv-select mt-2 w-full"
                  >
                    {(schemes || []).map((scheme) => (
                      <option key={scheme.id} value={scheme.id}>{scheme.name}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          )}
          <div className="kiveiv-inner-card p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[var(--kiveiv-text)]">模型选择</p>
              <span className="text-xs kiveiv-muted">用于后端联调演示</span>
            </div>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="kiveiv-form-row">
                <label className="text-xs font-semibold kiveiv-muted">问答模型</label>
                <select
                  value={form.llmModel}
                  onChange={(event) => setForm((prev) => ({ ...prev, llmModel: event.target.value }))}
                  className="kiveiv-select mt-2 w-full"
                >
                  {LLM_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="kiveiv-form-row">
                <label className="text-xs font-semibold kiveiv-muted">向量模型</label>
                <select
                  value={form.embeddingModel}
                  onChange={(event) => setForm((prev) => ({ ...prev, embeddingModel: event.target.value }))}
                  className="kiveiv-select mt-2 w-full"
                >
                  {EMBEDDING_OPTIONS.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="kiveiv-inner-card p-4">
            <p className="text-sm font-semibold text-[var(--kiveiv-text)]">参数处理方式</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, parseMethod: 'chunk' }))}
                className={`${form.parseMethod === 'chunk' ? 'kiveiv-chip kiveiv-chip-accent' : 'kiveiv-chip'}`}
              >
                分块存储
              </button>
              <button
                type="button"
                onClick={() => setForm((prev) => ({ ...prev, parseMethod: 'qa' }))}
                className={`${form.parseMethod === 'qa' ? 'kiveiv-chip kiveiv-chip-accent' : 'kiveiv-chip'}`}
              >
                问答对提取
              </button>
            </div>

            {form.parseMethod === 'chunk' ? (
              <div className="mt-4 space-y-3">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="kiveiv-form-row">
                    <label className="text-xs font-semibold kiveiv-muted">分块规则</label>
                    <select
                      value={form.chunkRule}
                      onChange={(event) => setForm((prev) => ({ ...prev, chunkRule: event.target.value }))}
                      className="kiveiv-select mt-2 w-full"
                    >
                      <option value="paragraph">按段落分</option>
                      <option value="length">按长度分</option>
                      <option value="module">按模块分</option>
                    </select>
                  </div>
                  <div className="kiveiv-form-row">
                    <label className="text-xs font-semibold kiveiv-muted">参数配置方式</label>
                    <select
                      value={form.chunkPreset}
                      onChange={(event) => setForm((prev) => ({ ...prev, chunkPreset: event.target.value }))}
                      className="kiveiv-select mt-2 w-full"
                    >
                      <option value="default">默认参数（推荐）</option>
                      <option value="custom">自定义参数</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <label className="inline-flex items-center gap-2 kiveiv-muted">
                    <input
                      type="checkbox"
                      checked={Boolean(form.modelParagraphDetection)}
                      onChange={(event) => setForm((prev) => ({ ...prev, modelParagraphDetection: event.target.checked }))}
                      className="h-4 w-4 rounded border-[var(--kiveiv-border)]"
                    />
                    模型识别段落
                  </label>
                  <span className="kiveiv-muted">布局：{form.layoutMode === 'horizontal' ? '横排' : '竖排'}</span>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, layoutMode: prev.layoutMode === 'horizontal' ? 'vertical' : 'horizontal' }))}
                    className="kiveiv-kbd-link"
                  >
                    切换布局
                  </button>
                </div>
                {form.chunkPreset === 'custom' ? (
                  <div className={`grid gap-3 ${form.layoutMode === 'horizontal' ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                    <FieldNumber
                      label="最大段落深度"
                      value={form.maxParagraphDepth}
                      min={1}
                      max={12}
                      onChange={(value) => setForm((prev) => ({ ...prev, maxParagraphDepth: value }))}
                    />
                    <FieldNumber
                      label="最大分块大小"
                      value={form.maxChunkSize}
                      min={200}
                      max={8000}
                      onChange={(value) => setForm((prev) => ({ ...prev, maxChunkSize: value }))}
                    />
                    <FieldNumber
                      label="按长度分块阈值"
                      value={form.splitLength}
                      min={100}
                      max={5000}
                      onChange={(value) => setForm((prev) => ({ ...prev, splitLength: value }))}
                    />
                    <FieldNumber
                      label="索引大小"
                      value={form.indexSize}
                      min={16}
                      max={512}
                      onChange={(value) => setForm((prev) => ({ ...prev, indexSize: value }))}
                    />
                  </div>
                ) : (
                  <p className="text-xs kiveiv-muted">
                    默认值：最大段落深度 3，最大分块大小 1200，长度阈值 800，索引大小 64。
                  </p>
                )}
              </div>
            ) : (
              <div className={`mt-4 grid gap-3 ${form.layoutMode === 'horizontal' ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                <FieldNumber
                  label="提取置信度阈值"
                  value={form.qaMinScore}
                  min={0.1}
                  max={1}
                  step={0.01}
                  onChange={(value) => setForm((prev) => ({ ...prev, qaMinScore: value }))}
                />
                <FieldNumber
                  label="最大提取问答对"
                  value={form.qaMaxPairs}
                  min={5}
                  max={500}
                  onChange={(value) => setForm((prev) => ({ ...prev, qaMaxPairs: value }))}
                />
                <label className="inline-flex items-center gap-2 text-sm kiveiv-muted">
                  <input
                    type="checkbox"
                    checked={Boolean(form.qaExtractTables)}
                    onChange={(event) => setForm((prev) => ({ ...prev, qaExtractTables: event.target.checked }))}
                    className="h-4 w-4 rounded border-[var(--kiveiv-border)]"
                  />
                  提取表格中的问答对
                </label>
                <div className="flex items-center gap-2 text-xs">
                  <span className="kiveiv-muted">布局：{form.layoutMode === 'horizontal' ? '横排' : '竖排'}</span>
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, layoutMode: prev.layoutMode === 'horizontal' ? 'vertical' : 'horizontal' }))}
                    className="kiveiv-kbd-link"
                  >
                    切换布局
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-xs font-semibold kiveiv-muted">卡片封面</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {coverPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, coverPreset: preset.id }))}
                    className={`kb-cover-option kb-card-hero-${preset.id} ${form.coverPreset === preset.id ? 'kb-cover-option-active' : ''}`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
            <label className="mt-6 inline-flex items-center gap-2 text-sm kiveiv-muted">
              <input
                type="checkbox"
                checked={Boolean(form.pinned)}
                onChange={(event) => setForm((prev) => ({ ...prev, pinned: event.target.checked }))}
                className="h-4 w-4 rounded border-[var(--kiveiv-border)]"
              />
              创建后置顶
            </label>
          </div>
          <details className="rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-3 py-2">
            <summary className="cursor-pointer text-xs font-semibold kiveiv-muted">高级配置（可选）</summary>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="kiveiv-form-row">
                <label className="text-xs font-semibold kiveiv-muted">索引模式</label>
                <select
                  value={form.indexMode}
                  onChange={(event) => setForm((prev) => ({ ...prev, indexMode: event.target.value }))}
                  className="kiveiv-select mt-2 w-full"
                >
                  <option value="hybrid">混合检索（推荐）</option>
                  <option value="graph">知识图谱优先</option>
                  <option value="vector">向量检索优先</option>
                </select>
              </div>
              <div className="kiveiv-form-row">
                <label className="text-xs font-semibold kiveiv-muted">默认召回条数 TopK</label>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={form.defaultTopK}
                  onChange={(event) => setForm((prev) => ({ ...prev, defaultTopK: event.target.value }))}
                  className="kiveiv-input mt-2 w-full"
                />
              </div>
            </div>
          </details>
      </div>
    </OverlayDrawer>
  )
}

function indexModeLabel(mode) {
  if (mode === 'graph') return '图谱优先'
  if (mode === 'vector') return '向量优先'
  return '混合检索'
}

function FieldNumber({ label, value, min, max, step = 1, onChange }) {
  return (
    <div className="kiveiv-form-row">
      <label className="text-xs font-semibold kiveiv-muted">{label}</label>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(event) => onChange(event.target.value)}
        className="kiveiv-input mt-2 w-full"
      />
    </div>
  )
}

function normalizeTimestamp(value) {
  if (!value) return 0
  const parsed = Date.parse(String(value).replace(' ', 'T'))
  return Number.isNaN(parsed) ? 0 : parsed
}

function formatRelativeTime(value) {
  const ts = normalizeTimestamp(value)
  if (!ts) return '刚刚更新'
  const diffMs = Date.now() - ts
  const day = 24 * 60 * 60 * 1000
  if (diffMs < day) return '今天'
  if (diffMs < day * 2) return '1 天前'
  if (diffMs < day * 7) return `${Math.max(2, Math.floor(diffMs / day))} 天前`
  if (diffMs < day * 30) return `${Math.floor(diffMs / (day * 7))} 周前`
  return `${Math.floor(diffMs / (day * 30))} 个月前`
}

function BoardGlyph({ preset = 'sky' }) {
  if (preset === 'mint') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 18h16M5 15l3-8 4 5 3-3 4 6" />
      </svg>
    )
  }
  if (preset === 'ink') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <circle cx="12" cy="12" r="3.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 12h2.5M17.5 12H20M12 4v2.5M12 17.5V20" />
      </svg>
    )
  }
  if (preset === 'slate') {
    return (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 18V9m7 9V5m7 13v-6" />
      </svg>
    )
  }
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 19V7m5 12V4m5 15v-8" />
    </svg>
  )
}
