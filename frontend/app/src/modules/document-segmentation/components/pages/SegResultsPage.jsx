export function SegResultsPage({
  documents,
  statusStyles,
  statusLabels,
  hasProcessedDocs,
  resultViewEnabled,
  currentDoc,
  currentChunks,
  currentTags,
  currentConfig,
  atomicSummary,
  chunkStatusStyles,
  chunkStatusLabels,
  chunkFilterMode,
  chunkSelections,
  truncateText,
  onOpenResultsForDoc,
  onOpenStrategyForDocs,
  onCloseResultDetail,
  onToggleChunkSelection,
  onSelectAllChunks,
  onClearChunkSelection,
  onRequestDelete,
  onToggleFilterMode,
  onOpenEdit,
  onOpenModal
}) {
  return (
    <section className="section-stack">
	      {resultViewEnabled && currentDoc && currentDoc.status === 'processed' ? (
	        <div className="kiveiv-stack-section">
	          <div className="flex flex-wrap items-center justify-between gap-3">
	            <div>
	              <h3 className="text-xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{currentDoc.name}</h3>
	              <p className="kiveiv-gap-title-note text-xs kiveiv-muted">切分结果详情页</p>
	            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onCloseResultDetail}
                className="kiveiv-btn-secondary kiveiv-btn-sm"
              >
                返回结果列表
              </button>
              <button
                type="button"
                onClick={() => onOpenStrategyForDocs([currentDoc.id])}
                className="kiveiv-btn-secondary kiveiv-btn-sm"
              >
                重新切分
              </button>
            </div>
          </div>

	          <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
	            <div className="kiveiv-card p-4">
	              <h4 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>文档信息</h4>
	              <div className="mt-3 grid gap-3 text-xs kiveiv-muted sm:grid-cols-2">
	                <InfoItem label="文档 ID" value={currentDoc.id} />
	                <InfoItem label="来源" value={currentDoc.source} />
	                <InfoItem label="状态" value={statusLabels[currentDoc.status]} />
	                <InfoItem label="更新时间" value={currentDoc.updatedAt} />
                <InfoItem label="切片数" value={currentDoc.totalChunks || currentChunks.length || 0} />
                <InfoItem label="原子块" value={atomicSummary} />
              </div>
	            </div>

	            <div className="kiveiv-card p-4">
	              <h4 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>切分参数</h4>
	              <div className="mt-3 grid gap-3 text-xs kiveiv-muted sm:grid-cols-2">
	                <InfoItem label="切分策略" value={currentConfig?.strategyName || '-'} />
	                <InfoItem label="Chunk 长度" value={currentConfig?.chunkSize ? `${currentConfig.chunkSize} tokens` : '-'} />
	                <InfoItem label="Overlap" value={currentConfig?.overlap ? `${currentConfig.overlap} tokens` : '-'} />
	                <InfoItem
	                  label="Tokens 范围"
	                  value={currentConfig ? `${currentConfig.minTokens} ~ ${currentConfig.maxTokens}` : '-'}
	                />
	              </div>
	              <div className="mt-4 flex flex-wrap gap-2 text-[12px] kiveiv-muted">
	                {[
	                  { label: '清洗噪声', value: currentConfig?.enableClean },
                  { label: '结构映射', value: currentConfig?.enableMap },
                  { label: 'Tag 生成', value: currentConfig?.enableTags },
                  { label: '结果验证', value: currentConfig?.enableValidation }
                ].map((item) => (
                  <span
                    key={item.label}
                    className={item.value ? 'kiveiv-chip kiveiv-chip-accent' : 'kiveiv-chip'}
                  >
                    {item.label}{item.value ? '·开启' : '·关闭'}
                  </span>
                ))}
              </div>
	              <div className="mt-4">
	                <p className="text-[12px] font-semibold uppercase tracking-wide kiveiv-subtle">标签概览</p>
	                <div className="mt-2 flex flex-wrap gap-2">
	                  {currentTags.length ? (
                    currentTags.map((tag) => (
                      <span key={tag} className="kiveiv-chip">
                        {tag}
                      </span>
                    ))
	                  ) : (
	                    <span className="text-xs kiveiv-subtle">暂无标签</span>
	                  )}
	                </div>
	              </div>
	            </div>
	          </div>

	          <div className="kiveiv-card p-4">
	            <div className="flex flex-wrap items-center justify-between gap-3">
	              <div>
	                <h3 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>切分片段</h3>
	                <p className="kiveiv-gap-title-note text-xs kiveiv-muted">正方形切片卡片展示，支持编辑/版本/溯源。</p>
	              </div>
	              <div className="flex flex-wrap gap-3 text-xs kiveiv-muted">
	                <span>切片数：{currentChunks.length}</span>
	                <span>原子块：{atomicSummary}</span>
	              </div>
	            </div>
	            {chunkFilterMode && (
	              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border px-3 py-2 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
	                <span>已选 {chunkSelections.size} / {currentChunks.length}</span>
	                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={onSelectAllChunks}
                    className="kiveiv-btn-secondary kiveiv-btn-sm"
                  >
                    全选
                  </button>
                  <button
                    type="button"
                    onClick={onClearChunkSelection}
                    className="kiveiv-btn-secondary kiveiv-btn-sm"
                  >
                    清空
                  </button>
                  <button
                    type="button"
                    onClick={onRequestDelete}
                    disabled={!chunkSelections.size}
                    className={`kiveiv-btn-danger kiveiv-btn-sm ${chunkSelections.size ? '' : 'opacity-60 cursor-not-allowed'}`}
                  >
                    删除
                  </button>
                </div>
              </div>
	            )}
	            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
	              {currentChunks.map((chunk) => {
                const tagList = [...(chunk.contentTags || []), chunk.userTag].filter(Boolean)
                const selected = chunkSelections.has(chunk.id)
	                return (
	                  <div key={chunk.id} className="bento-tile" style={{ aspectRatio: '1 / 1' }}>
	                  <div className="bento-tile-inner flex h-full flex-col">
	                    <div className="flex items-start justify-between gap-3">
	                      <div>
	                        <p className="text-[12px] kiveiv-subtle">切片 #{chunk.sequence} · ID {chunk.id}</p>
	                        <p className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{chunk.title}</p>
	                      </div>
	                      <div className="flex items-center gap-2">
	                        {chunkFilterMode && (
	                          <button
	                            type="button"
	                            onClick={() => onToggleChunkSelection(chunk.id)}
	                            className={`inline-flex h-5 w-5 items-center justify-center rounded border text-[12px] ${
	                              selected ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white text-gray-400'
	                            }`}
	                          >
	                            {selected ? '✓' : ''}
	                          </button>
	                        )}
                        <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${chunkStatusStyles[chunk.status]}`}>
                          {chunkStatusLabels[chunk.status]}
                        </span>
	                      </div>
	                    </div>
	                    <div className="mt-3 flex-1 text-xs leading-relaxed kiveiv-muted">
	                      {truncateText(chunk.content || chunk.title || '', 140)}
	                    </div>
	                    <div className="mt-3 space-y-2">
                      <div className="flex flex-wrap gap-1">
                        {tagList.length ? (
                          tagList.map((tag) => (
                            <span key={tag} className="kiveiv-chip">
                              {tag}
                            </span>
                          ))
	                        ) : (
	                          <span className="text-[12px] kiveiv-subtle">暂无标签</span>
	                        )}
	                      </div>
	                      <div className="flex items-center justify-between text-[12px] kiveiv-subtle">
	                        <span>原子块：{chunk.isAtomic ? chunk.atomicType : '-'}</span>
	                        <span>{chunk.tokenCount || '-'} tokens</span>
	                      </div>
	                      {!chunkFilterMode && (
	                        <div className="flex items-center gap-3 text-xs">
	                          <button
	                            type="button"
	                            onClick={() => onOpenEdit(chunk, currentDoc.id)}
	                            className="kiveiv-kbd-link"
	                          >
	                            编辑
	                          </button>
	                          <button
	                            type="button"
	                            onClick={() => onOpenModal('版本记录', `切片 #${chunk.id} 的编辑历史待后端联动后开放。`)}
	                            className="kiveiv-kbd-link"
	                          >
	                            版本
	                          </button>
	                          <button
	                            type="button"
	                            onClick={() => onOpenModal('溯源定位', `切片 #${chunk.id} 的溯源定位待后端联动后开放。`)}
	                            className="kiveiv-subtle hover:text-gray-800"
	                          >
	                            溯源
	                          </button>
	                        </div>
	                      )}
	                    </div>
	                  </div>
	                  </div>
	                )
	              })}
              {!currentChunks.length && (
                <div className="col-span-full kiveiv-card border-dashed p-6 text-center text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                  暂无切分结果或文档仍在处理中。
                </div>
              )}
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onToggleFilterMode}
                className="kiveiv-btn-secondary kiveiv-btn-sm"
              >
                {chunkFilterMode ? '退出筛选' : '筛选'}
              </button>
            </div>
          </div>
        </div>
	      ) : (
	        <>
	          <div className="kiveiv-card p-4">
	            <div className="flex flex-wrap items-center justify-between gap-3">
	              <div>
	                <h3 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>已完成文档</h3>
	                <p className="kiveiv-gap-title-note text-xs kiveiv-muted">选择文档后进入切分结果详情。</p>
	              </div>
	            </div>
            <div className="mt-4 overflow-x-auto">
              <table className="kiveiv-table">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left">文档</th>
                    <th className="px-4 py-3 text-left">状态</th>
                    <th className="px-4 py-3 text-left">切片数</th>
                    <th className="px-4 py-3 text-left">操作</th>
                  </tr>
                </thead>
                <tbody>
	                  {documents.map((doc) => (
	                    <tr key={doc.id}>
	                      <td className="px-4 py-3">
	                        <div className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{doc.name}</div>
	                        <div className="text-xs kiveiv-subtle">{doc.source}</div>
	                      </td>
                      <td className="px-4 py-3">
                        <span className={statusStyles[doc.status]}>
                          {statusLabels[doc.status]}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs kiveiv-muted">{doc.totalChunks || '-'}</td>
                      <td className="px-4 py-3 text-xs kiveiv-muted">
	                        {doc.status === 'processed' ? (
	                          <button
	                            type="button"
	                            onClick={() => onOpenResultsForDoc(doc.id)}
	                            className="kiveiv-kbd-link"
	                          >
	                            查看结果
	                          </button>
	                        ) : (
	                          <span className="kiveiv-subtle">-</span>
	                        )}
	                      </td>
	                    </tr>
	                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {!hasProcessedDocs && (
            <div className="kiveiv-card border-dashed p-8 text-center text-sm kiveiv-muted" style={{ background: 'var(--kiveiv-surface-muted)' }}>
              暂无已完成的文档，请等待切分完成后查看结果。
            </div>
          )}
        </>
      )}
    </section>
  )
}

function InfoItem({ label, value }) {
  return (
    <div className="rounded-xl border px-3 py-2" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
      <p className="text-[12px] font-semibold uppercase tracking-wide kiveiv-subtle">{label}</p>
      <p className="kiveiv-gap-title-body text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{value}</p>
    </div>
  )
}
