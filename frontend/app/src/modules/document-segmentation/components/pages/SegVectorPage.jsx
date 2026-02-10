import { useMemo, useState } from 'react'
import { TaskListTable } from '../../../shared/components/TaskListTable.jsx'

export function SegVectorPage({
  documents,
  statusStyles,
  statusLabels,
  vectorDoc,
  vectorViewEnabled,
  vectorActive,
  vectorActiveDocId,
  vectorChunks,
  vectorSelectionCount,
  vectorChunkFilterMode,
  vectorChunkSelections,
  chunkStatusStyles,
  chunkStatusLabels,
  truncateText,
  onOpenVectorDetail,
  onCloseVectorDetail,
  onToggleVectorChunk,
  onSelectAllVectorChunks,
  onClearVectorSelection,
  onRequestDeleteVectorChunks,
  onToggleVectorFilterMode,
  onOpenVectorModal,
  onDeleteVectorDoc
}) {
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const statusOptions = useMemo(() => ([
    { id: 'all', label: '全部' },
    ...Object.entries(statusLabels).map(([id, label]) => ({ id, label }))
  ]), [statusLabels])

  const filteredDocuments = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return documents.filter((doc) => {
      if (statusFilter !== 'all' && doc.status !== statusFilter) return false
      if (!keyword) return true
      const haystack = [doc.name, doc.source, doc.id].filter(Boolean).join(' ').toLowerCase()
      return haystack.includes(keyword)
    })
  }, [documents, query, statusFilter])

  const showDetail = vectorViewEnabled && vectorDoc && vectorDoc.segStatus === 'processed'

  return (
    <section className="section-stack">
      {showDetail ? (
        <div className="kiveiv-stack-section">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-medium" style={{ color: 'var(--kiveiv-text)' }}>向量化详情</h3>
              <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{vectorDoc.name}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onCloseVectorDetail}
                className="kiveiv-btn-secondary"
              >
                返回列表
              </button>
              {vectorActive && vectorActiveDocId === vectorDoc.id && (
                <span className="text-xs text-[var(--kiveiv-text-subtle)]">向量化进行中</span>
              )}
              <button
                type="button"
                onClick={onOpenVectorModal}
                disabled={!vectorSelectionCount}
                className="kiveiv-btn-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                开始向量化
              </button>
            </div>
          </div>

          <div className="kiveiv-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs kiveiv-muted">
              <div className="flex flex-wrap gap-3">
                <span>状态：{statusLabels[vectorDoc.status]}</span>
                <span>切片数：{vectorDoc.totalChunks || vectorChunks.length || 0}</span>
                <span>已选择：{vectorSelectionCount}</span>
              </div>
              <span className="text-[12px] kiveiv-subtle">仅“初始/已确认”可选</span>
            </div>
          </div>

            <div className="kiveiv-card p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-medium" style={{ color: 'var(--kiveiv-text)' }}>切片列表</h3>
                  <p className="kiveiv-gap-title-note text-xs kiveiv-muted">正方形切片卡片展示，用于确认向量化内容。</p>
                </div>
              <div className="flex flex-wrap gap-3 text-xs kiveiv-muted">
                <span>总数：{vectorChunks.length}</span>
                <span>已选：{vectorSelectionCount}</span>
              </div>
            </div>

            {vectorChunkFilterMode && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border px-3 py-2 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
                <span>已选 {vectorChunkSelections.size} / {vectorChunks.length}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={onSelectAllVectorChunks}
                    className="kiveiv-btn-secondary kiveiv-btn-sm"
                  >
                    全选
                  </button>
                  <button
                    type="button"
                    onClick={onClearVectorSelection}
                    className="kiveiv-btn-secondary kiveiv-btn-sm"
                  >
                    清空
                  </button>
                  <button
                    type="button"
                    onClick={onRequestDeleteVectorChunks}
                    disabled={!vectorChunkSelections.size}
                    className="kiveiv-btn-danger kiveiv-btn-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    删除
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {vectorChunks.map((chunk) => {
                const selectable = chunk.status !== -1 && chunk.status !== 2
                const selected = vectorChunkSelections.has(chunk.id)
                return (
                  <div
                    key={chunk.id}
                    style={{ aspectRatio: '1 / 1' }}
                    className="bento-tile"
                  >
                    <div className="bento-tile-inner flex h-full flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[12px] kiveiv-subtle">切片 #{chunk.sequence} · ID {chunk.id}</p>
                          <p className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{chunk.title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {vectorChunkFilterMode && (
                            <button
                              type="button"
                              onClick={() => onToggleVectorChunk(chunk.id)}
                              disabled={!selectable}
	                              className={`inline-flex h-5 w-5 items-center justify-center rounded border text-[12px] ${
	                                selectable
	                                  ? selected
	                                    ? 'border-blue-200 bg-blue-50 text-blue-600'
	                                    : 'border-gray-200 bg-white text-gray-400'
	                                  : 'cursor-not-allowed border-gray-200 bg-white text-gray-300 opacity-60'
	                              }`}
                            >
                              {selected ? '✓' : ''}
                            </button>
                          )}
                          <span className={chunkStatusStyles[chunk.status]}>{chunkStatusLabels[chunk.status]}</span>
                        </div>
                      </div>
                      <div className="mt-3 flex-1 text-xs leading-relaxed kiveiv-muted">
                        {truncateText(chunk.content || chunk.title || '', 140)}
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[12px] kiveiv-subtle">
                        <span>{chunk.tokenCount || '-'} tokens</span>
                        <span>{selectable ? '可向量化' : '不可选'}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
              {!vectorChunks.length && (
                <div className="col-span-full kiveiv-card border-dashed p-6 text-center text-xs kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                  暂无可展示的切片数据。
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={onToggleVectorFilterMode}
                className="kiveiv-btn-secondary"
              >
                {vectorChunkFilterMode ? '退出筛选' : '筛选'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <TaskListTable
          listTitle="任务列表"
          listMeta={`筛选结果 ${filteredDocuments.length} / ${documents.length}`}
          query={query}
          onQueryChange={setQuery}
          queryPlaceholder="搜索文档名、来源或 ID"
          statusOptions={statusOptions}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onResetFilters={() => {
            setQuery('')
            setStatusFilter('all')
          }}
        >
          <table className="kiveiv-table kiveiv-vector-table">
            <thead>
              <tr>
                <th className="text-left col-sticky-left">文件名称/ID</th>
                <th className="text-left">状态</th>
                <th className="text-left">数据量（字符）</th>
                <th className="text-left">文件格式</th>
                <th className="text-left">文件标签</th>
                <th className="text-left">上传时间</th>
                <th className="text-left">更新时间</th>
                <th className="text-left col-sticky-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => (
                <tr key={doc.id}>
                  <td className="col-sticky-left">
                    <div className="kiveiv-table-title">{doc.name}</div>
                    <div className="text-xs kiveiv-subtle">{doc.id}</div>
                  </td>
                  <td>
                    <span className={statusStyles[doc.status]}>{statusLabels[doc.status]}</span>
                  </td>
                  <td className="text-xs kiveiv-muted">{doc.charCount ? doc.charCount.toLocaleString() : '-'}</td>
                  <td className="text-xs kiveiv-muted">{doc.fileType || '-'}</td>
                  <td className="text-xs kiveiv-muted">
                    {doc.tags?.length ? doc.tags.join(' / ') : '-'}
                  </td>
                  <td className="text-xs kiveiv-muted">{doc.createdAt || '-'}</td>
                  <td className="text-xs kiveiv-muted">{doc.updatedAt || '-'}</td>
                  <td className="text-xs col-sticky-right">
                    <div className="flex items-center gap-3 whitespace-nowrap">
                      {doc.segStatus === 'processed' ? (
                        <button
                          type="button"
                          onClick={() => onOpenVectorDetail(doc.id)}
                          className="font-medium text-blue-600 hover:text-blue-700"
                        >
                          修改配置
                        </button>
                      ) : (
                        <span className="kiveiv-subtle">修改配置</span>
                      )}
                      <button
                        type="button"
                        onClick={() => onDeleteVectorDoc?.(doc.id)}
                        className="font-medium text-blue-600 hover:text-blue-700"
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {!filteredDocuments.length && (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-xs kiveiv-subtle">
                    暂无符合条件的文档，请调整筛选条件。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TaskListTable>
      )}
    </section>
  )
}
