export function ListManageDrawer({
  open,
  onClose,
  title = '筛选与批量',
  description = '高级操作放在二级面板，保持列表主界面专注。',
  query = '',
  queryLabel = '搜索',
  queryPlaceholder = '输入关键词筛选',
  querySummary,
  onChangeQuery,
  onClearFilter,
  filters,
  selectionMode = false,
  selectedCount = 0,
  onToggleSelectionMode,
  onSelectAll,
  onClearSelection,
  onBatchDelete,
  batchDeleteLabel = '批量删除',
  selectionHint = '开启后可在列表中勾选多项。',
  footerLabel = '完成'
}) {
  const showSearch = typeof onChangeQuery === 'function'
  const showBatch = typeof onToggleSelectionMode === 'function'
  const canBatchDelete = Boolean(selectedCount) && typeof onBatchDelete === 'function'
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" onClick={onClose}>
      <div
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--kiveiv-border)] bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-[var(--kiveiv-border)] px-6 py-5">
          <div>
            <h3 className="text-lg font-semibold text-[var(--kiveiv-text)]">{title}</h3>
            <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[var(--kiveiv-text-subtle)] hover:bg-[var(--kiveiv-surface-muted)] hover:text-[var(--kiveiv-text)]"
            aria-label="关闭弹窗"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="max-h-[70vh] space-y-5 overflow-y-auto px-6 py-5">
          {showSearch && (
            <div>
              <label className="text-xs font-semibold kiveiv-muted">{queryLabel}</label>
              <div className="kiveiv-search-wrap mt-2">
                <span className="kiveiv-search-icon">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
                    <circle cx="11" cy="11" r="7" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="m20 20-3.5-3.5" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={query}
                  onChange={(event) => onChangeQuery(event.target.value)}
                  placeholder={queryPlaceholder}
                  className="kiveiv-input kiveiv-input-search h-10 w-full"
                />
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <span className="kiveiv-muted">
                  {querySummary || (query ? `当前筛选：${query}` : '未设置筛选条件')}
                </span>
                {query && onClearFilter && (
                  <button type="button" onClick={onClearFilter} className="kiveiv-kbd-link">
                    清除筛选
                  </button>
                )}
              </div>
            </div>
          )}

          {filters && (
            <div className="kiveiv-inner-card p-3">
              {filters}
            </div>
          )}

          {showBatch && (
            <div className="kiveiv-inner-card p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-[var(--kiveiv-text)]">批量管理</span>
                <button
                  type="button"
                  onClick={onToggleSelectionMode}
                  className="kiveiv-btn-secondary h-8 px-3 text-xs"
                >
                  {selectionMode ? '退出批量' : '进入批量'}
                </button>
              </div>
              <p className="kiveiv-gap-title-note text-xs kiveiv-muted">
                {selectionMode ? `已选 ${selectedCount} 项` : selectionHint}
              </p>
              {selectionMode && (
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  {onSelectAll && (
                    <button type="button" onClick={onSelectAll} className="kiveiv-btn-secondary h-8 px-3 text-xs">
                      全选/反选
                    </button>
                  )}
                  {onClearSelection && (
                    <button type="button" onClick={onClearSelection} className="kiveiv-btn-secondary h-8 px-3 text-xs">
                      清空
                    </button>
                  )}
                  {onBatchDelete && (
                    <button
                      type="button"
                      onClick={onBatchDelete}
                      disabled={!canBatchDelete}
                      className={`kiveiv-btn-danger h-8 px-3 text-xs ${canBatchDelete ? '' : 'opacity-60 cursor-not-allowed'}`}
                    >
                      {batchDeleteLabel}
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end border-t border-[var(--kiveiv-border)] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-btn-primary"
          >
            {footerLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
