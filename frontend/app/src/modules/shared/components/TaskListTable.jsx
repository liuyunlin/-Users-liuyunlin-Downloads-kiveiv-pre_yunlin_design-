export function TaskListTable({
  title,
  description,
  headerActions,
  listTitle = '任务列表',
  listMeta,
  tableToolbar,
  query = '',
  onQueryChange,
  queryPlaceholder = '搜索任务名、文档名、标签或模型',
  statusOptions = [],
  statusFilter = 'all',
  onStatusFilterChange,
  onResetFilters,
  extraFilters,
  children
}) {
  const showSearch = typeof onQueryChange === 'function'
  const showStatusFilters = Boolean(statusOptions?.length)
  const showFilters = showSearch || showStatusFilters || extraFilters

  const hasTitle = Boolean(title)
  const hasDescription = Boolean(description)
  const showHeader = hasTitle || hasDescription || headerActions

  return (
    <section className="kiveiv-stack-section">
      {showHeader && (
        hasTitle || hasDescription ? (
          <header className="lg:flex lg:items-start lg:justify-between">
            <div className="min-w-0 flex-1">
              {title && <h3 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h3>}
              {description && <p className="kiveiv-gap-title-body text-sm kiveiv-muted">{description}</p>}
            </div>
            {headerActions && <div className="mt-4 flex items-center gap-3 lg:mt-0 lg:ml-4">{headerActions}</div>}
          </header>
        ) : (
          <div className="flex justify-end">{headerActions}</div>
        )
      )}

      <div className="kiveiv-card">
        <div className="flex items-center justify-between border-b px-4 py-3" style={{ borderColor: 'var(--kiveiv-border)' }}>
          <h4 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{listTitle}</h4>
          {listMeta && <span className="text-xs kiveiv-subtle">{listMeta}</span>}
        </div>

        {tableToolbar && (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b px-4 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
            {tableToolbar}
          </div>
        )}

        {showFilters && (
          <div className="flex flex-wrap items-center gap-3 border-b px-4 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
            {showSearch && (
              <div className="kiveiv-search-wrap flex flex-1 items-center">
                <span className="kiveiv-search-icon">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z" />
                </svg>
                </span>
                <input
                  value={query}
                  onChange={(event) => onQueryChange(event.target.value)}
                  placeholder={queryPlaceholder}
                  className="kiveiv-input kiveiv-input-search w-full"
                />
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2">
              {showStatusFilters && statusOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onStatusFilterChange?.(option.id)}
                  className={`${statusFilter === option.id ? 'kiveiv-chip kiveiv-chip-accent' : 'kiveiv-chip'}`}
                >
                  {option.label}
                </button>
              ))}
              {extraFilters}
              {onResetFilters && (
                <button
                  type="button"
                  onClick={onResetFilters}
                  className="kiveiv-btn-secondary kiveiv-btn-sm"
                >
                  清空筛选
                </button>
              )}
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          {children}
        </div>
      </div>
    </section>
  )
}
