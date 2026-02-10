export function SegSearchPage({
  documents,
  tagStats,
  searchQuery,
  onSearchQueryChange,
  searchTags,
  searchDocs,
  onToggleMultiSelect,
  searchResults
}) {
  return (
    <section className="section-stack">
      <div className="kiveiv-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>语义搜索</h3>
            <p className="kiveiv-gap-title-note text-xs kiveiv-muted">基于向量检索的跨文档切片搜索。</p>
          </div>
          <button type="button" className="kiveiv-btn-primary">
            搜索
          </button>
        </div>

        <div className="mt-4 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <input
              value={searchQuery}
              onChange={(event) => onSearchQueryChange(event.target.value)}
              placeholder="输入查询关键词"
              className="kiveiv-input w-64 text-xs"
            />
            <span className="text-[12px] kiveiv-subtle">支持多选文档/标签过滤</span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold kiveiv-muted">文档过滤（多选）</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {documents.map((doc) => {
                  const selected = searchDocs.includes(doc.name)
                  return (
                    <button
                      key={doc.id}
                      type="button"
                      onClick={() => onToggleMultiSelect(doc.name, 'docs')}
                      className={`kiveiv-chip transition-colors ${selected ? 'kiveiv-chip-accent' : ''}`}
                    >
                      {doc.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold kiveiv-muted">标签过滤（多选）</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {tagStats.map((tag) => {
                  const selected = searchTags.includes(tag.tag)
                  return (
                    <button
                      key={tag.tag}
                      type="button"
                      onClick={() => onToggleMultiSelect(tag.tag, 'tags')}
                      className={`kiveiv-chip transition-colors ${selected ? 'kiveiv-chip-accent' : ''}`}
                    >
                      {tag.tag}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="kiveiv-card p-6">
        <h3 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>搜索结果</h3>
        <div className="mt-4 space-y-3 text-sm kiveiv-muted">
          {searchResults.map((item) => (
            <div key={item.id} className="rounded-xl border px-3 py-3" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
              <div className="flex items-center justify-between">
                <p className="font-medium" style={{ color: 'var(--kiveiv-text)' }}>{item.doc}</p>
                <span className="text-xs kiveiv-muted">score {item.score}</span>
              </div>
              <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{item.snippet}</p>
              <button type="button" className="kiveiv-gap-title-note text-xs font-semibold text-blue-600 hover:text-blue-700">
                定位切片 #{item.chunkId}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
