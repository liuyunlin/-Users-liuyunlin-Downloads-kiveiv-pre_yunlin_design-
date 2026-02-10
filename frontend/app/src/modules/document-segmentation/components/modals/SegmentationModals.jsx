import { normalizeTagName } from '../../utils/segmentationUtils.js'
import { OverlayDrawer } from '../../../shared/components/OverlayDrawer.jsx'

export function TaskProgressModal({ title, statusLabel, progress, items, remainingSeconds, onClose }) {
  const isCompleted = progress >= 100
  const progressDisplay = `${progress}%`
  const remainingLabel = isCompleted ? '任务已完成' : `预计剩余 ${remainingSeconds} 秒`

  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-lg">
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'var(--kiveiv-border)' }}>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h2>
            <p className="text-sm kiveiv-muted">{statusLabel}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-modal-close"
            aria-label="关闭进度弹窗"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>
                <span>整体进度</span>
                <span>{progressDisplay}</span>
              </div>
              <div className="mt-2 h-2 overflow-hidden rounded-full" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                <div className="h-full rounded-full bg-blue-600 transition-all" style={{ width: progressDisplay }} />
              </div>
              <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">{remainingLabel}</p>
            </div>

            {items?.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wide kiveiv-subtle">当前任务</h3>
                <ul className="mt-3 space-y-2 text-sm kiveiv-muted">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center justify-between rounded-md px-3 py-2" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                      <span className="truncate pr-4" title={item.name}>{item.name}</span>
                      <span className="text-xs kiveiv-subtle">{item.id}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ModelSelector({ label, options = [], selected, query, onQueryChange, onSelect, emptyText, locked = false }) {
  const filteredOptions = options.filter((item) =>
    item.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <div className="space-y-3">
      <label className="block text-xs font-semibold kiveiv-subtle">
        {label}
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder={locked ? '该知识库已绑定模型' : '输入模型名称筛选'}
          disabled={locked}
          className={`kiveiv-input mt-2 w-full ${locked ? 'opacity-60 cursor-not-allowed' : ''}`}
        />
      </label>
      {options.length ? (
        <div className="max-h-44 space-y-2 overflow-y-auto rounded-lg border p-2 kiveiv-surface-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
          {filteredOptions.length ? (
            filteredOptions.map((model) => (
              <button
                key={model}
                type="button"
                onClick={() => {
                  if (locked) return
                  onSelect(model)
                }}
                disabled={locked}
                className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors ${
                  selected === model
                    ? 'border-blue-200 bg-blue-50'
                    : 'border-transparent hover:border-blue-200 hover:bg-blue-50/60'
                }`}
                style={{ color: 'var(--kiveiv-text)' }}
              >
                <span>{model}</span>
                {selected === model && (
                  <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))
          ) : (
            <div className="rounded-md px-3 py-3 text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface)' }}>
              未找到匹配模型，请调整关键词。
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed px-4 py-6 text-sm kiveiv-muted kiveiv-surface-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
          {emptyText || '当前未配置可用模型。'}
        </div>
      )}
      {options.length ? (
        <div className="text-xs kiveiv-muted">
          当前选择：<span className="font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{selected || '未选择'}</span>
        </div>
      ) : null}
    </div>
  )
}

export function ModelSelectionModal({
  title,
  description,
  selectionCount,
  label,
  options,
  selected,
  query,
  onQueryChange,
  onSelect,
  emptyText,
  confirmText,
  locked = false,
  lockedHint = '',
  onClose,
  onReturnSettings,
  onConfirm
}) {
  return (
    <OverlayDrawer
      open
      title={title}
      description={description}
      widthClassName="max-w-xl"
      onClose={onClose}
      footer={(
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-btn-secondary"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onReturnSettings}
            className="kiveiv-btn-secondary"
          >
            返回重新配置
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!selected}
            className={`kiveiv-btn-primary ${selected ? '' : 'kiveiv-btn-disabled'}`}
          >
            {confirmText}
          </button>
        </div>
      )}
    >
      <div className="space-y-4">
        {typeof selectionCount === 'number' && (
          <p className="text-sm kiveiv-muted">已选择 {selectionCount} 个切片。</p>
        )}
        <ModelSelector
          label={label}
          options={options}
          selected={selected}
          query={query}
          onQueryChange={onQueryChange}
          onSelect={onSelect}
          emptyText={emptyText}
          locked={locked}
        />
        {lockedHint ? (
          <p className="text-xs kiveiv-subtle">{lockedHint}</p>
        ) : null}
      </div>
    </OverlayDrawer>
  )
}

export function InfoModal({ title, description, onClose }) {
  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-md">
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h3>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">{description}</p>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="kiveiv-btn-secondary"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EditChunkModal({ draft, onChange, onClose, onSave }) {
  return (
    <OverlayDrawer
      open
      title="切片编辑"
      description="保存后切片状态将更新为“已确认”。"
      widthClassName="max-w-2xl"
      onClose={onClose}
      footer={(
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-btn-secondary"
          >
            取消
          </button>
          <button
            type="button"
            onClick={onSave}
            className="kiveiv-btn-primary"
          >
            保存
          </button>
        </div>
      )}
    >
      <div className="space-y-4">
        <label className="block text-xs font-semibold kiveiv-subtle">
          切片标题
          <input
            value={draft.title}
            onChange={(event) => onChange({ ...draft, title: event.target.value })}
            className="kiveiv-input mt-2 w-full"
          />
        </label>
        <label className="block text-xs font-semibold kiveiv-subtle">
          切片内容
          <textarea
            rows={6}
            value={draft.content}
            onChange={(event) => onChange({ ...draft, content: event.target.value })}
            className="kiveiv-textarea mt-2 w-full"
          />
        </label>
      </div>
    </OverlayDrawer>
  )
}

export function DeleteChunkConfirmModal({ count, onCancel, onConfirm }) {
  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-md">
        <div className="px-6 py-6">
          <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>确认删除切片</h3>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">
            将删除已选择的 {count} 个切片，操作不可撤销。
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="kiveiv-btn-secondary"
            >
              取消
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="kiveiv-btn-danger"
            >
              确认删除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function TagManagementModal({
  tagModal,
  tagForm,
  tagPool,
  systemTagPool,
  mergeQuery,
  onFormChange,
  onMergeQueryChange,
  onClose,
  onSubmit
}) {
  const selectedCount = tagForm.sourceTags
    .split(',')
    .map((item) => normalizeTagName(item))
    .filter(Boolean).length

  return (
    <OverlayDrawer
      open
      title={{
        create: '新增标签',
        rename: '重命名标签',
        merge: '合并标签',
        delete: '删除标签',
        convert: '转为系统标签',
        'system-create': '新增系统标签',
        'system-rename': '重命名系统标签',
        'system-delete': '删除系统标签'
      }[tagModal.type]}
      description="操作会同步到标签管理服务。"
      widthClassName="max-w-lg"
      onClose={onClose}
      footer={(
        <div className="flex justify-end gap-3">
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
            className="kiveiv-btn-primary"
          >
            确认
          </button>
        </div>
      )}
    >
      <div className="space-y-4">
            {['create', 'system-create'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                标签名称
                <input
                  value={tagForm.name}
                  onChange={(event) => onFormChange({ name: event.target.value })}
                  className="kiveiv-input mt-2 w-full"
                  placeholder="输入标签名称"
                />
              </label>
            )}

            {['rename', 'delete', 'convert'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                选择标签
                <select
                  value={tagForm.name}
                  onChange={(event) => onFormChange({ name: event.target.value })}
                  className="kiveiv-select mt-2 w-full"
                >
                  <option value="">请选择标签</option>
                  {tagPool.map((tag) => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </label>
            )}

            {['system-rename', 'system-delete'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                选择系统标签
                <select
                  value={tagForm.name}
                  onChange={(event) => onFormChange({ name: event.target.value })}
                  className="kiveiv-select mt-2 w-full"
                >
                  <option value="">请选择系统标签</option>
                  {systemTagPool.map((tag) => (
                    <option key={tag.name} value={tag.name}>{tag.name}</option>
                  ))}
                </select>
              </label>
            )}

            {['rename', 'system-rename'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                新标签名称
                <input
                  value={tagForm.newName}
                  onChange={(event) => onFormChange({ newName: event.target.value })}
                  className="kiveiv-input mt-2 w-full"
                  placeholder="输入新的标签名称"
                />
              </label>
            )}

            {tagModal.type === 'merge' && (
              <>
                <label className="block text-xs font-semibold kiveiv-subtle">
                  筛选标签
                  <input
                    value={mergeQuery}
                    onChange={(event) => onMergeQueryChange(event.target.value)}
                    className="kiveiv-input mt-2 w-full"
                    placeholder="输入关键词筛选"
                  />
                </label>
	                  <div className="rounded-xl border p-3" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
	                  <div className="flex items-center justify-between">
	                    <p className="text-xs font-semibold kiveiv-subtle">源标签（多选）</p>
	                    <div className="flex items-center gap-2 text-xs kiveiv-subtle">
	                      <span>已选 {selectedCount}</span>
	                        <button
	                          type="button"
	                          onClick={() => onFormChange({ sourceTags: '' })}
	                          className="kiveiv-kbd-link"
	                        >
	                          清空选择
	                        </button>
	                    </div>
	                  </div>
                  <div className="mt-3 max-h-32 space-y-2 overflow-y-auto">
                    {tagPool
                      .filter((tag) => tag.toLowerCase().includes(mergeQuery.trim().toLowerCase()))
                      .map((tag) => {
                        const selected = tagForm.sourceTags
                          .split(',')
                          .map((item) => normalizeTagName(item))
                          .filter(Boolean)
                          .includes(tag)
	                        return (
	                          <label key={tag} className="flex items-center gap-2 text-sm kiveiv-muted">
	                            <input
	                              type="checkbox"
	                              checked={selected}
                              onChange={(event) => {
                                const current = tagForm.sourceTags
                                  .split(',')
                                  .map((item) => normalizeTagName(item))
                                  .filter(Boolean)
                                const next = event.target.checked
                                  ? Array.from(new Set([...current, tag]))
                                  : current.filter((item) => item !== tag)
	                                onFormChange({ sourceTags: next.join(', ') })
	                              }}
	                              className="kiveiv-check"
	                            />
	                            <span>{tag}</span>
	                          </label>
	                        )
	                      })}
	                    {!tagPool.length && (
	                      <p className="text-xs kiveiv-subtle">暂无可选标签</p>
	                    )}
	                  </div>
	                </div>
	                <label className="block text-xs font-semibold kiveiv-subtle">
	                  目标标签
	                  <input
	                    value={tagForm.newName}
                    onChange={(event) => onFormChange({ newName: event.target.value })}
                    className="kiveiv-input mt-2 w-full"
                    placeholder="合并后的标签名"
                  />
                </label>
              </>
	            )}
	
            {['convert', 'system-create'].includes(tagModal.type) && (
              <label className="block text-xs font-semibold kiveiv-subtle">
                标签说明
	                <textarea
	                  rows={3}
                  value={tagForm.description}
                  onChange={(event) => onFormChange({ description: event.target.value })}
                  className="kiveiv-textarea mt-2 w-full"
                  placeholder="用于说明标签含义"
                />
              </label>
            )}
      </div>
    </OverlayDrawer>
  )
}
