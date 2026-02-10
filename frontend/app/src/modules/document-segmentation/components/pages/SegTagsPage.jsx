import { getNormalTags, getSystemTags } from '../../utils/segmentationUtils.js'
import { useMemo, useState } from 'react'

export function SegTagsPage({
  activeTagView,
  tagViewChunks,
  tagPool,
  systemTagPool,
  tagStats,
  systemTagStats,
  chunkStatusStyles,
  chunkStatusLabels,
  truncateText,
  onOpenTagView,
  onCloseTagView,
  onOpenTagModal,
  onUpdateTagDraft,
  onGetTagDraft,
  onAddChunkTag,
  onRemoveChunkTag,
  useInlineTagActions = false,
  onQuickTagAction
}) {
  const [inlineAction, setInlineAction] = useState('create')
  const [inlineForm, setInlineForm] = useState({
    name: '',
    newName: '',
    sourceTags: '',
    description: ''
  })
  const [inlineMergeQuery, setInlineMergeQuery] = useState('')

  const selectedMergeCount = useMemo(
    () => inlineForm.sourceTags.split(',').map((item) => item.trim()).filter(Boolean).length,
    [inlineForm.sourceTags]
  )

  const resetInlineForm = () => {
    setInlineForm({ name: '', newName: '', sourceTags: '', description: '' })
    setInlineMergeQuery('')
  }

  const actionButtons = [
    { id: 'create', label: '新增标签' },
    { id: 'merge', label: '合并标签' },
    { id: 'rename', label: '重命名' },
    { id: 'delete', label: '删除标签' },
    { id: 'convert', label: '转为系统标签' },
    { id: 'system-create', label: '新增系统标签' },
    { id: 'system-rename', label: '系统改名' },
    { id: 'system-delete', label: '系统删除' }
  ]

  const submitInlineAction = () => {
    if (!onQuickTagAction) return
    const done = onQuickTagAction(inlineAction, inlineForm)
    if (done) resetInlineForm()
  }

  return (
    <section className="section-stack">
      {activeTagView ? (
        <div className="kiveiv-stack-section">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-medium" style={{ color: 'var(--kiveiv-text)' }}>标签：{activeTagView.name}</h3>
              <p className="kiveiv-gap-title-note text-xs kiveiv-muted">
                {activeTagView.type === 'system' ? '系统标签' : '普通标签'} · 关联 {tagViewChunks.length} 个切片
              </p>
            </div>
            <button
              type="button"
              onClick={onCloseTagView}
              className="kiveiv-btn-secondary"
            >
              返回标签管理
            </button>
          </div>

            <div className="kiveiv-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>标签关联切片</h4>
                  <p className="kiveiv-gap-title-note text-xs kiveiv-muted">支持为单个切片新增/删除普通标签与系统标签。</p>
                </div>
              </div>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {tagViewChunks.map((chunk) => {
                const normalTags = getNormalTags(chunk)
                const systemTags = getSystemTags(chunk)
                const availableNormal = tagPool.filter((tag) => !normalTags.includes(tag))
                const availableSystem = systemTagPool
                  .map((tag) => tag.name)
                  .filter((tag) => !systemTags.includes(tag))
                const normalDraft = onGetTagDraft(chunk.id, 'normal')
                const systemDraft = onGetTagDraft(chunk.id, 'system')

                return (
                  <div
                    key={`${chunk.docId}-${chunk.id}`}
                    style={{ aspectRatio: '1 / 1' }}
                    className="bento-tile"
                  >
	                    <div className="bento-tile-inner flex h-full flex-col">
	                    <div className="flex items-start justify-between gap-3">
	                      <div>
	                        <p className="text-[12px] kiveiv-subtle">{chunk.docName}</p>
	                        <p className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{chunk.title}</p>
	                      </div>
	                      <span className={chunkStatusStyles[chunk.status]}>{chunkStatusLabels[chunk.status]}</span>
	                    </div>
	                    <div className="mt-3 flex-1 text-xs leading-relaxed kiveiv-muted">
	                      {truncateText(chunk.content || chunk.title || '', 140)}
	                    </div>
	
	                    <div className="mt-3 space-y-2">
	                      <div>
	                        <p className="text-[12px] font-semibold uppercase tracking-wide kiveiv-subtle">普通标签</p>
	                        <div className="mt-1 flex flex-wrap gap-1">
	                          {normalTags.length ? (
	                            normalTags.map((tag) => (
	                              <span key={tag} className="kiveiv-chip">
	                                {tag}
	                                <button
	                                  type="button"
	                                  onClick={() => onRemoveChunkTag(chunk.docId, chunk.id, tag, 'normal')}
	                                  className="text-[12px] kiveiv-subtle hover:text-gray-700"
	                                >
	                                  移除
	                                </button>
	                              </span>
	                            ))
	                          ) : (
	                            <span className="text-[12px] kiveiv-subtle">暂无普通标签</span>
	                          )}
	                        </div>
	                      </div>
	
	                      <div>
	                        <p className="text-[12px] font-semibold uppercase tracking-wide kiveiv-subtle">系统标签</p>
	                        <div className="mt-1 flex flex-wrap gap-1">
	                          {systemTags.length ? (
	                            systemTags.map((tag) => (
	                              <span key={tag} className="kiveiv-chip">
	                                {tag}
	                                <button
	                                  type="button"
	                                  onClick={() => onRemoveChunkTag(chunk.docId, chunk.id, tag, 'system')}
	                                  className="text-[12px] kiveiv-subtle hover:text-gray-700"
	                                >
	                                  移除
	                                </button>
	                              </span>
	                            ))
	                          ) : (
	                            <span className="text-[12px] kiveiv-subtle">暂无系统标签</span>
	                          )}
	                        </div>
	                      </div>

	                      <div className="space-y-2">
	                        <div className="flex items-center gap-2 text-[12px] kiveiv-muted">
	                          <select
	                            value={normalDraft}
	                            onChange={(event) => onUpdateTagDraft(chunk.id, 'normal', event.target.value)}
	                            className="kiveiv-select h-7 flex-1 px-2 text-[12px]"
                          >
                            <option value="">选择普通标签</option>
                            {availableNormal.map((tag) => (
                              <option key={tag} value={tag}>{tag}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              onAddChunkTag(chunk.docId, chunk.id, normalDraft, 'normal')
                              onUpdateTagDraft(chunk.id, 'normal', '')
                            }}
                            disabled={!normalDraft}
                            className="kiveiv-btn-primary kiveiv-btn-sm disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            添加普通标签
	                          </button>
	                        </div>
	                        <div className="flex items-center gap-2 text-[12px] kiveiv-muted">
	                          <select
	                            value={systemDraft}
                            onChange={(event) => onUpdateTagDraft(chunk.id, 'system', event.target.value)}
                            className="kiveiv-select h-7 flex-1 px-2 text-[12px]"
                          >
                            <option value="">选择系统标签</option>
                            {availableSystem.map((tag) => (
                              <option key={tag} value={tag}>{tag}</option>
                            ))}
                          </select>
                          <button
                            type="button"
                            onClick={() => {
                              onAddChunkTag(chunk.docId, chunk.id, systemDraft, 'system')
                              onUpdateTagDraft(chunk.id, 'system', '')
                            }}
                            disabled={!systemDraft}
                            className="kiveiv-btn-primary kiveiv-btn-sm disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            添加系统标签
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  </div>
                )
              })}

              {!tagViewChunks.length && (
                <div className="col-span-full kiveiv-card border-dashed p-6 text-center text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                  当前标签暂无关联切片。
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="kiveiv-card p-6">
            <h3 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>标签统计</h3>
            <div className="mt-4 flex flex-wrap gap-2 text-xs kiveiv-muted">
              {useInlineTagActions ? (
                actionButtons.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setInlineAction(item.id)}
                    className={`kiveiv-btn-secondary kiveiv-btn-sm ${inlineAction === item.id ? 'border-blue-400 text-blue-600' : ''}`}
                  >
                    {item.label}
                  </button>
                ))
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => onOpenTagModal('create')}
                    className="kiveiv-btn-secondary kiveiv-btn-sm"
                  >
                    新增标签
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTagModal('merge')}
                    className="kiveiv-btn-secondary kiveiv-btn-sm"
                  >
                    合并标签
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTagModal('rename')}
                    className="kiveiv-btn-secondary kiveiv-btn-sm"
                  >
                    重命名
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTagModal('delete')}
                    className="kiveiv-btn-secondary kiveiv-btn-sm"
                  >
                    删除标签
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenTagModal('convert')}
                    className="kiveiv-btn-secondary kiveiv-btn-sm"
                  >
                    转为系统标签
                  </button>
                </>
              )}
            </div>
            {useInlineTagActions && (
              <div className="mt-4 rounded-xl border p-3" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
                <div className="grid gap-2 sm:grid-cols-2">
                  {['create', 'system-create'].includes(inlineAction) && (
                    <input
                      value={inlineForm.name}
                      onChange={(event) => setInlineForm((prev) => ({ ...prev, name: event.target.value }))}
                      className="kiveiv-input"
                      placeholder="标签名称"
                    />
                  )}
                  {['rename', 'delete', 'convert'].includes(inlineAction) && (
                    <select
                      value={inlineForm.name}
                      onChange={(event) => setInlineForm((prev) => ({ ...prev, name: event.target.value }))}
                      className="kiveiv-select"
                    >
                      <option value="">选择标签</option>
                      {tagPool.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  )}
                  {['system-rename', 'system-delete'].includes(inlineAction) && (
                    <select
                      value={inlineForm.name}
                      onChange={(event) => setInlineForm((prev) => ({ ...prev, name: event.target.value }))}
                      className="kiveiv-select"
                    >
                      <option value="">选择系统标签</option>
                      {systemTagPool.map((tag) => (
                        <option key={tag.name} value={tag.name}>{tag.name}</option>
                      ))}
                    </select>
                  )}
                  {['rename', 'system-rename', 'merge'].includes(inlineAction) && (
                    <input
                      value={inlineForm.newName}
                      onChange={(event) => setInlineForm((prev) => ({ ...prev, newName: event.target.value }))}
                      className="kiveiv-input"
                      placeholder="新标签名称"
                    />
                  )}
                </div>
                {inlineAction === 'merge' && (
                  <div className="mt-2 space-y-2">
                    <input
                      value={inlineMergeQuery}
                      onChange={(event) => setInlineMergeQuery(event.target.value)}
                      className="kiveiv-input"
                      placeholder="筛选源标签"
                    />
                    <div className="max-h-28 overflow-y-auto rounded-lg border p-2 text-xs" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface)' }}>
                      <p className="mb-1 kiveiv-subtle">已选 {selectedMergeCount}</p>
                      {tagPool
                        .filter((tag) => tag.toLowerCase().includes(inlineMergeQuery.trim().toLowerCase()))
                        .map((tag) => {
                          const selected = inlineForm.sourceTags.split(',').map((item) => item.trim()).filter(Boolean).includes(tag)
                          return (
                            <label key={tag} className="flex items-center gap-2 py-0.5">
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={(event) => {
                                  const current = inlineForm.sourceTags.split(',').map((item) => item.trim()).filter(Boolean)
                                  const next = event.target.checked
                                    ? Array.from(new Set([...current, tag]))
                                    : current.filter((item) => item !== tag)
                                  setInlineForm((prev) => ({ ...prev, sourceTags: next.join(', ') }))
                                }}
                                className="kiveiv-check"
                              />
                              <span>{tag}</span>
                            </label>
                          )
                        })}
                    </div>
                  </div>
                )}
                {['convert', 'system-create'].includes(inlineAction) && (
                  <textarea
                    rows={2}
                    value={inlineForm.description}
                    onChange={(event) => setInlineForm((prev) => ({ ...prev, description: event.target.value }))}
                    className="kiveiv-textarea mt-2 w-full"
                    placeholder="标签说明"
                  />
                )}
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button type="button" onClick={resetInlineForm} className="kiveiv-btn-secondary kiveiv-btn-sm">清空</button>
                  <button type="button" onClick={submitInlineAction} className="kiveiv-btn-primary kiveiv-btn-sm">确认</button>
                </div>
              </div>
            )}
            <div className="mt-4 flex flex-wrap gap-2">
              {tagStats.map((item) => (
                <button
                  key={item.tag}
                  type="button"
                  onClick={() => onOpenTagView(item.tag, 'normal')}
                  className="kiveiv-chip transition-colors hover:opacity-90"
                >
                  {item.tag}
                  <span className="ml-2 kiveiv-subtle">{item.count}</span>
                </button>
              ))}
              {!tagStats.length && <span className="text-xs kiveiv-subtle">暂无标签</span>}
            </div>
          </div>

          <div className="kiveiv-card p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>系统标签</h3>
              {!useInlineTagActions && (
                <button
                  type="button"
                  onClick={() => onOpenTagModal('system-create')}
                  className="kiveiv-btn-secondary kiveiv-btn-sm"
                >
                  新增系统标签
                </button>
              )}
            </div>
            {useInlineTagActions && (
              <div className="mb-3 mt-3 flex flex-wrap gap-2">
                {actionButtons.slice(5).map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setInlineAction(item.id)}
                    className={`kiveiv-btn-secondary kiveiv-btn-sm ${inlineAction === item.id ? 'border-blue-400 text-blue-600' : ''}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
            <div className="mt-4 space-y-3 text-sm kiveiv-muted">
              {systemTagStats.map((tag) => (
                <div key={tag.name} className="rounded-xl border px-3 py-2" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
                  <div className="flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenTagView(tag.name, 'system')}
                      className="font-semibold"
                      style={{ color: 'var(--kiveiv-text)' }}
                    >
                      {tag.name}
                    </button>
	                    <div className="flex items-center gap-2 text-xs kiveiv-subtle">
	                      <span>{tag.usage}</span>
	                      <button
	                        type="button"
	                        onClick={() => onOpenTagModal('system-rename', { name: tag.name })}
	                        className="kiveiv-kbd-link"
	                      >
	                        改名
	                      </button>
	                      <button
	                        type="button"
	                        onClick={() => onOpenTagModal('system-delete', { name: tag.name })}
	                        className="kiveiv-kbd-link"
	                      >
	                        删除
	                      </button>
	                    </div>
                  </div>
                  <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{tag.description}</p>
                </div>
              ))}
              {!systemTagStats.length && (
                <div className="rounded-xl border px-3 py-3 text-xs kiveiv-subtle" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
                  暂无系统标签
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
