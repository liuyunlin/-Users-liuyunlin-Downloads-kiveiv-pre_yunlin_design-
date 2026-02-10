import { useEffect, useMemo, useState } from 'react'
import { useDocumentStore } from './documentStore.jsx'
import { TaskListTable } from '../shared/components/TaskListTable.jsx'
import { useDocumentLifecycle } from '../knowledge-base/hooks/useDocumentLifecycle.js'
import { StateBadge, parseStatusTone } from '../shared/components/StateBadge.jsx'
import { ListManageDrawer } from '../shared/components/ListManageDrawer.jsx'

const PAGE_SIZE = 10

const docActionMap = {
  未解析: ['查看', '解析', '删除'],
  解析中: ['查看', '删除'],
  已解析: ['编辑', '解析', '删除']
}

const getActionsForStatus = (status) => docActionMap[status] ?? docActionMap['未解析']

export function DocumentList({ onViewDocument, onParseDocument, onViewProgress, onEditDocument }) {
  const { setDocuments, setIsProgressVisible } = useDocumentStore()
  const { documents: lifecycleDocuments } = useDocumentLifecycle()
  const documents = lifecycleDocuments
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [selectionMode, setSelectionMode] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(null)
  const [manageOpen, setManageOpen] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const statusOptions = useMemo(() => ([
    { id: 'all', label: '全部' },
    ...['未解析', '解析中', '已解析'].map((status) => ({ id: status, label: status }))
  ]), [])

  const filteredDocuments = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return documents.filter((doc) => {
      if (statusFilter !== 'all' && doc.status !== statusFilter) return false
      if (!keyword) return true
      const haystack = [doc.name, doc.id, doc.type, doc.size].filter(Boolean).join(' ').toLowerCase()
      return haystack.includes(keyword)
    })
  }, [documents, query, statusFilter])

  const totalPages = Math.max(1, Math.ceil(filteredDocuments.length / PAGE_SIZE))

  const paginatedDocuments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredDocuments.slice(start, start + PAGE_SIZE)
  }, [filteredDocuments, page])

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  const totalSize = useMemo(() => {
    if (!documents.length) return '0 MB'
    const sizeInMB = documents.reduce((acc, item) => {
      const num = parseFloat(item.size)
      if (Number.isNaN(num)) return acc
      return acc + num
    }, 0)
    return `${sizeInMB.toFixed(1)} MB`
  }, [documents])

  const hasSelection = selectedIds.size > 0

  const toggleSelection = (id) => {
    if (!selectionMode) return
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const toggleSelectPage = () => {
    if (!selectionMode) return
    const shouldSelectAll = paginatedDocuments.some((doc) => !selectedIds.has(doc.id))
    setSelectedIds((prev) => {
      const next = new Set(prev)
      paginatedDocuments.forEach((doc) => {
        if (shouldSelectAll) {
          next.add(doc.id)
        } else {
          next.delete(doc.id)
        }
      })
      return next
    })
  }

  const resetSelection = () => {
    setSelectedIds(new Set())
  }

  const toggleSelectionMode = () => {
    setSelectionMode((prev) => {
      const next = !prev
      if (!next) resetSelection()
      return next
    })
  }

  const handleDeleteConfirm = () => {
    if (!hasSelection) return
    setConfirmDelete({ ids: Array.from(selectedIds), type: 'batch' })
  }

  const removeDocuments = (ids) => {
    setDocuments((prev) => prev.filter((doc) => !ids.includes(doc.id)))
    setConfirmDelete(null)
    setSelectedIds((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => next.delete(id))
      return next
    })
  }

  const allSelectedOnPage = paginatedDocuments.length > 0 && paginatedDocuments.every((doc) => selectedIds.has(doc.id))
  const partiallySelected = !allSelectedOnPage && paginatedDocuments.some((doc) => selectedIds.has(doc.id))

  if (!documents.length) {
    return (
      <div className="kiveiv-card flex min-h-[280px] flex-col items-center justify-center border-dashed text-center" style={{ background: 'var(--kiveiv-surface-muted)' }}>
        <h2 className="text-xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>暂无文档</h2>
        <p className="kiveiv-gap-title-body text-sm kiveiv-muted">完成上传后即可在此查看文档列表。</p>
      </div>
    )
  }

  return (
    <div className="section-stack">
      <TaskListTable
        title="解析任务"
        description="管理文档解析状态与任务进度。"
        headerActions={(
          <>
            <div className="text-right text-sm text-gray-500">
              <p>共 {filteredDocuments.length} 个文档</p>
              <p>总计 {totalSize}</p>
            </div>
            <button
              type="button"
              onClick={() => setManageOpen(true)}
              className="kiveiv-btn-secondary"
            >
              筛选与批量
            </button>
          </>
        )}
        listTitle="任务列表"
        listMeta={`筛选结果 ${filteredDocuments.length} / ${documents.length}`}
        tableToolbar={(
          <>
            <span>{selectionMode ? `批量模式 · 已选 ${selectedIds.size} 个文档` : '默认模式 · 仅展示单项操作'}</span>
          </>
        )}
      >
        <table className="kiveiv-table">
          <thead>
            <tr>
              {selectionMode && (
                <th className="w-14 px-4 py-3">
                  <CircleCheckbox
                    checked={allSelectedOnPage}
                    indeterminate={partiallySelected}
                    onChange={toggleSelectPage}
                    ariaLabel="选择当前页全部文档"
                  />
                </th>
              )}
              <th className="px-6 py-3 text-left">文档名</th>
              <th className="px-6 py-3 text-left">文档 ID</th>
              <th className="px-6 py-3 text-left">文档类型</th>
              <th className="px-6 py-3 text-left">文档大小</th>
              <th className="px-6 py-3 text-left">解析状态</th>
              <th className="px-6 py-3 text-left">切分状态</th>
              <th className="px-6 py-3 text-left">索引状态</th>
              <th className="px-6 py-3 text-left">操作</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDocuments.map((doc) => (
              <tr key={doc.id}>
                {selectionMode && (
                  <td className="px-4 py-3">
                    <CircleCheckbox
                      checked={selectedIds.has(doc.id)}
                      onChange={() => toggleSelection(doc.id)}
                      ariaLabel={`选择文档 ${doc.name}`}
                    />
                  </td>
                )}
                <td className="max-w-[280px] px-6 py-3 text-sm kiveiv-table-title">
                  <span className="block truncate" title={doc.name}>{doc.name}</span>
                </td>
                <td className="max-w-[220px] px-6 py-3 text-sm kiveiv-muted">
                  <span className="block truncate" title={doc.id}>{doc.id}</span>
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm kiveiv-muted">{doc.type}</td>
                <td className="whitespace-nowrap px-6 py-3 text-sm kiveiv-muted">{doc.size}</td>
                <td className="whitespace-nowrap px-6 py-3 text-sm">
                  <StateBadge label={doc.status || '未解析'} tone={parseStatusTone(doc.status)} />
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm">
                  <StateBadge label={doc.segStatusLabel || '未切分'} tone={doc.segStatusLabel === '切分中' ? 'progress' : (doc.segStatusLabel === '切分完成' ? 'success' : 'neutral')} className={doc.segStatusStyle || ''} />
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm">
                  <StateBadge label={doc.indexStatusLabel || '未构建'} tone={doc.indexStatusLabel === '构建中' ? 'progress' : (doc.indexStatusLabel === '构建完成' ? 'success' : 'neutral')} className={doc.indexStatusStyle || ''} />
                </td>
                <td className="whitespace-nowrap px-6 py-3 text-sm">
                  <div className="flex items-center gap-3">
                    {getActionsForStatus(doc.status).map((action) => {
                      if (action === '查看') {
                        const handleView = () => {
                          if (doc.status === '解析中') {
                            setIsProgressVisible(true)
                            onViewProgress?.(doc)
                            return
                          }
                          onViewDocument?.(doc)
                        }
                        return (
                          <button
                            key="view"
                            type="button"
                            onClick={handleView}
                            className="kiveiv-kbd-link text-sm"
                          >
                            {doc.status === '解析中' ? '查看进度' : '查看'}
                          </button>
                        )
                      }

                      if (action === '解析') {
                        const handleParse = () => {
                          if (doc.status === '解析中') {
                            setIsProgressVisible(true)
                            onViewProgress?.(doc)
                            return
                          }
                          onParseDocument?.(doc)
                        }
                        return (
                          <button
                            key="parse"
                            type="button"
                            onClick={handleParse}
                            className="kiveiv-kbd-link text-sm"
                          >
                            {doc.status === '解析中' ? '查看进度' : '解析'}
                          </button>
                        )
                      }

                      if (action === '编辑') {
                        return (
                          <button
                            key="edit"
                            type="button"
                            onClick={() => onEditDocument?.(doc)}
                            className={`font-medium transition-colors ${
                              doc.status === '已解析'
                                ? 'kiveiv-kbd-link text-sm'
                                : 'text-gray-400 cursor-not-allowed'
                            }`}
                            disabled={doc.status !== '已解析'}
                          >
                            编辑
                          </button>
                        )
                      }

                      if (action === '删除') {
                        return (
                          <button
                            key="delete"
                            type="button"
                            onClick={() => setConfirmDelete({ ids: [doc.id], type: 'single', name: doc.name })}
                            className="font-medium text-red-600 transition-colors hover:text-red-500"
                          >
                            删除
                          </button>
                        )
                      }

                      return (
                        <button
                          key={action}
                          type="button"
                          className="kiveiv-kbd-link text-sm"
                        >
                          {action}
                        </button>
                      )
                    })}
                  </div>
                </td>
              </tr>
            ))}
            {!paginatedDocuments.length && (
              <tr>
                <td colSpan={selectionMode ? 9 : 8} className="px-4 py-6 text-center text-xs kiveiv-subtle">
                  暂无符合条件的文档，请调整筛选条件。
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </TaskListTable>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      <ListManageDrawer
        open={manageOpen}
        onClose={() => setManageOpen(false)}
        query={query}
        onChangeQuery={setQuery}
        onClearFilter={() => {
          setQuery('')
          setStatusFilter('all')
        }}
        queryLabel="搜索文档"
        queryPlaceholder="搜索文档名、ID、类型或大小"
        filters={(
          <div className="space-y-2">
            <p className="text-xs font-semibold kiveiv-muted">状态筛选</p>
            <div className="flex flex-wrap items-center gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setStatusFilter(option.id)}
                  className={`${statusFilter === option.id ? 'kiveiv-chip kiveiv-chip-accent' : 'kiveiv-chip'}`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
        selectionMode={selectionMode}
        selectedCount={selectedIds.size}
        onToggleSelectionMode={toggleSelectionMode}
        onSelectAll={toggleSelectPage}
        onClearSelection={resetSelection}
        onBatchDelete={handleDeleteConfirm}
        selectionHint="开启后可勾选当前页文档并执行批量操作。"
      />

      {confirmDelete && confirmDelete.type === 'single' && (
        <ConfirmDeleteModal
          title="确认删除文档"
          description={`确定要删除“${confirmDelete.name}”吗？该操作不可恢复。`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => removeDocuments(confirmDelete.ids)}
        />
      )}

      {confirmDelete && confirmDelete.type === 'batch' && (
        <ConfirmDeleteModal
          title="批量删除文档"
          description={`确定要删除选中的 ${confirmDelete.ids.length} 个文档吗？该操作不可恢复。`}
          onCancel={() => setConfirmDelete(null)}
          onConfirm={() => removeDocuments(confirmDelete.ids)}
        />
      )}
    </div>
  )
}

function CircleCheckbox({ checked, indeterminate = false, onChange, ariaLabel }) {
  return (
    <label className="inline-flex cursor-pointer items-center justify-center">
      <input
        type="checkbox"
        aria-label={ariaLabel}
        checked={checked}
        onChange={onChange}
        ref={(element) => {
          if (element) {
            element.indeterminate = indeterminate
          }
        }}
        className="sr-only"
      />
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
          checked || indeterminate ? 'border-blue-300 bg-blue-600 text-white' : 'border-gray-200 bg-white'
        }`}
      >
        {(checked || indeterminate) && (
          <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            {indeterminate ? (
              <path strokeLinecap="round" d="M6 12h12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            )}
          </svg>
        )}
      </span>
    </label>
  )
}

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) {
    return null
  }

  const visiblePages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1)

  return (
    <div className="kiveiv-banner flex flex-wrap items-center justify-between px-4 py-3 text-sm">
      <span>
        第 {page} 页，共 {totalPages} 页，每页 {PAGE_SIZE} 条
      </span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, page - 1))}
          className="kiveiv-btn-secondary kiveiv-btn-sm w-8 justify-center disabled:cursor-not-allowed disabled:opacity-60"
          disabled={page === 1}
        >
          ‹
        </button>
        {visiblePages.map((pageNumber) => (
          <button
            key={pageNumber}
            type="button"
            onClick={() => onChange(pageNumber)}
            className={`kiveiv-btn-secondary kiveiv-btn-sm w-8 justify-center font-semibold ${
              pageNumber === page ? 'bg-blue-600 text-white border-transparent' : ''
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          className="kiveiv-btn-secondary kiveiv-btn-sm w-8 justify-center disabled:cursor-not-allowed disabled:opacity-60"
          disabled={page === totalPages}
        >
          ›
        </button>
      </div>
    </div>
  )
}

function ConfirmDeleteModal({ title, description, onCancel, onConfirm }) {
  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-sm">
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h3>
              <p className="kiveiv-gap-title-body text-sm kiveiv-muted">{description}</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="kiveiv-btn-secondary"
            >
              否
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="kiveiv-btn-danger"
            >
              是
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
