import { useEffect, useMemo, useRef, useState } from 'react'
import { BatchImportModal } from '../../shared/components/BatchImportModal.jsx'

const PAGE_SIZE = 8
const QUICK_TAGS = [
  { key: '文档类型', value: '合同' },
  { key: '文档类型', value: '制度' },
  { key: '来源', value: '外部' },
  { key: '来源', value: '内网' },
  { key: '优先级', value: '高' }
]

export function FileSystemPage({
  files,
  onOpenDocument,
  onCreate,
  onCreateGraphImport,
  onUpdateFile,
  onDeleteDocuments,
  onViewProgress,
  onViewSegProgress,
  onViewIndexProgress,
  onJumpSegmentation,
  onJumpIndexBuilding,
  onJumpTagManagement,
  onEditDocument,
  onViewSegResults
}) {
  const totalFiles = files.length
  const [query, setQuery] = useState('')
  const [formatFilter, setFormatFilter] = useState('all')
  const [tagFilter, setTagFilter] = useState('all')
  const [importOpen, setImportOpen] = useState(false)
  const [batchImportOpen, setBatchImportOpen] = useState(false)
  const [tagModal, setTagModal] = useState({ open: false, fileId: '', key: '文档类型', query: '' })
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [batchConfigOpen, setBatchConfigOpen] = useState(false)
  const [batchForm, setBatchForm] = useState({ parsePolicy: '', sourceType: '', enabled: '' })
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, ids: [] })
  const [page, setPage] = useState(1)
  const tableRef = useRef(null)

  const tagKeys = useMemo(
    () => Array.from(new Set(files.flatMap((file) => (file.tags || []).map((tag) => tag.key)).filter(Boolean))),
    [files]
  )
  const filteredFiles = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    return files.filter((file) => {
      const tagText = (file.tags || []).map((tag) => `${tag.key}:${tag.value}`).join(' ')
      const haystack = [file.name, file.id, file.type, file.sourceType, tagText].filter(Boolean).join(' ').toLowerCase()
      const matchKeyword = !keyword || haystack.includes(keyword)
      const matchFormat = formatFilter === 'all' || (file.type || '').toLowerCase() === formatFilter.toLowerCase()
      const matchTag = tagFilter === 'all' || (file.tags || []).some((tag) => `${tag.key}:${tag.value}` === tagFilter)
      return matchKeyword && matchFormat && matchTag
    })
  }, [files, query, formatFilter, tagFilter])
  const totalPages = Math.max(1, Math.ceil(filteredFiles.length / PAGE_SIZE))
  const paginatedFiles = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return filteredFiles.slice(start, start + PAGE_SIZE)
  }, [filteredFiles, page])
  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])
  useEffect(() => {
    setSelectedIds((prev) => {
      const valid = new Set(filteredFiles.map((file) => file.id))
      const next = new Set(Array.from(prev).filter((id) => valid.has(id)))
      return next
    })
  }, [filteredFiles])

  useEffect(() => {
    const table = tableRef.current
    if (!table) return

    const updateStickyWidths = () => {
      const headerRow = table.querySelector('thead tr')
      if (!headerRow) return
      const headerCells = headerRow.querySelectorAll('th')
      if (!headerCells.length) return

      const selectCell = headerCells[0]
      const nameCell = headerCells[1]
      const actionCell = headerCells[headerCells.length - 1]
      if (!selectCell || !nameCell || !actionCell) return

      const selectWidth = Math.ceil(selectCell.getBoundingClientRect().width)
      const nameWidth = Math.ceil(nameCell.getBoundingClientRect().width)
      const actionWidth = Math.ceil(actionCell.getBoundingClientRect().width)

      table.style.setProperty('--kb-col-select-w', `${selectWidth}px`)
      table.style.setProperty('--kb-col-name-w', `${nameWidth}px`)
      table.style.setProperty('--kb-col-action-w', `${actionWidth}px`)
    }

    updateStickyWidths()
    const resizeObserver = new ResizeObserver(() => updateStickyWidths())
    resizeObserver.observe(table)
    window.addEventListener('resize', updateStickyWidths)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateStickyWidths)
    }
  }, [filteredFiles.length, paginatedFiles.length, query, formatFilter, tagFilter])

  const updateFile = (fileId, updater) => {
    const target = files.find((item) => item.id === fileId)
    if (!target) return
    const patch = typeof updater === 'function' ? updater(target) : updater
    onUpdateFile?.(fileId, patch)
  }

  const addTagByValue = (fileId, keyInput, valueInput) => {
    const file = files.find((item) => item.id === fileId)
    if (!file) return
    const key = keyInput.trim()
    const value = valueInput.trim()
    if (!key || !value) return
    updateFile(file.id, (prev) => {
      const tags = Array.isArray(prev.tags) ? prev.tags : []
      if (tags.some((tag) => tag.key === key && tag.value === value)) return {}
      return { tags: [...tags, { key, value }] }
    })
    setTagModal((prev) => ({ ...prev, query: '' }))
  }

  const removeTag = (fileId, targetTag) => {
    updateFile(fileId, (prev) => ({
      tags: (prev.tags || []).filter((tag) => !(tag.key === targetTag.key && tag.value === targetTag.value))
    }))
  }

  const tagOptionPool = useMemo(() => {
    const map = new Map()
    ;[...QUICK_TAGS, ...files.flatMap((file) => file.tags || [])].forEach((tag) => {
      const key = (tag?.key || '').trim()
      const value = (tag?.value || '').trim()
      if (!key || !value) return
      map.set(`${key}:${value}`, { key, value })
    })
    return Array.from(map.values())
  }, [files])

  const activeTagFile = useMemo(
    () => files.find((file) => file.id === tagModal.fileId) || null,
    [files, tagModal.fileId]
  )
  const filteredTagOptions = useMemo(() => {
    const keyword = tagModal.query.trim().toLowerCase()
    if (!keyword) return tagOptionPool
    return tagOptionPool.filter((tag) => `${tag.key}:${tag.value}`.toLowerCase().includes(keyword))
  }, [tagModal.query, tagOptionPool])
  const createTagCandidate = useMemo(() => {
    const text = tagModal.query.trim()
    if (!text || !activeTagFile) return null
    if (text.includes(':')) {
      const [left, ...rest] = text.split(':')
      const key = left.trim()
      const value = rest.join(':').trim()
      if (!key || !value) return null
      return { key, value }
    }
    if (!tagModal.key.trim()) return null
    return { key: tagModal.key.trim(), value: text }
  }, [activeTagFile, tagModal.key, tagModal.query])
  const canCreateTag = useMemo(() => {
    if (!activeTagFile || !createTagCandidate) return false
    return !(activeTagFile.tags || []).some(
      (tag) => tag.key === createTagCandidate.key && tag.value === createTagCandidate.value
    )
  }, [activeTagFile, createTagCandidate])
  const formatOptions = useMemo(
    () => ['all', ...Array.from(new Set(files.map((file) => file.type).filter(Boolean)))],
    [files]
  )
  const tagOptions = useMemo(
    () => ['all', ...Array.from(new Set(files.flatMap((file) => (file.tags || []).map((tag) => `${tag.key}:${tag.value}`))))],
    [files]
  )
  const allSelected = paginatedFiles.length > 0 && paginatedFiles.every((file) => selectedIds.has(file.id))

  const toggleSelectRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectPage = () => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        paginatedFiles.forEach((file) => next.delete(file.id))
      } else {
        paginatedFiles.forEach((file) => next.add(file.id))
      }
      return next
    })
  }

  const handleOpenDelete = (ids) => {
    if (!ids.length) return
    setDeleteConfirm({ open: true, ids })
  }

  const handleConfirmDelete = () => {
    const ids = deleteConfirm.ids || []
    if (!ids.length) return
    onDeleteDocuments?.(ids)
    setSelectedIds((prev) => {
      const next = new Set(prev)
      ids.forEach((id) => next.delete(id))
      return next
    })
    setDeleteConfirm({ open: false, ids: [] })
  }

  const openBatchConfig = () => {
    if (!selectedIds.size) return
    setBatchForm({ parsePolicy: '', sourceType: '', enabled: '' })
    setBatchConfigOpen(true)
  }

  const applyBatchConfig = () => {
    const ids = Array.from(selectedIds)
    if (!ids.length) return
    ids.forEach((id) => {
      onUpdateFile?.(id, (prev) => {
        const patch = {}
        if (batchForm.parsePolicy) patch.parsePolicy = batchForm.parsePolicy
        if (batchForm.sourceType) patch.sourceType = batchForm.sourceType
        if (batchForm.enabled) patch.enabled = batchForm.enabled === 'true'
        return patch
      })
    })
    setBatchConfigOpen(false)
  }

  return (
    <section className="kiveiv-stack-section kiveiv-content-rail">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm kiveiv-muted">
          <span className="font-semibold text-gray-900">文件 ({filteredFiles.length}/{totalFiles})</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
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
              onChange={(event) => {
                setQuery(event.target.value)
                setPage(1)
              }}
              placeholder="搜索文件名/ID/标签"
              className="kiveiv-input kiveiv-input-search h-10 w-[320px] max-w-[48vw]"
            />
          </div>
          <select
            value={formatFilter}
            onChange={(event) => {
              setFormatFilter(event.target.value)
              setPage(1)
            }}
            className="kiveiv-select h-10 min-w-[120px]"
          >
            {formatOptions.map((format) => (
              <option key={format} value={format}>
                {format === 'all' ? '全部格式' : format}
              </option>
            ))}
          </select>
          <select
            value={tagFilter}
            onChange={(event) => {
              setTagFilter(event.target.value)
              setPage(1)
            }}
            className="kiveiv-select h-10 min-w-[160px]"
          >
            {tagOptions.map((tag) => (
              <option key={tag} value={tag}>
                {tag === 'all' ? '全部标签' : tag}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => setImportOpen(true)}
            className="kiveiv-btn-primary"
          >
            <svg className="mr-1 h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
            </svg>
            新建/导入
          </button>
          <button
            type="button"
            onClick={() => setBatchImportOpen(true)}
            className="kiveiv-btn-secondary"
          >
            批量导入
          </button>
        </div>
      </div>

      {selectedIds.size > 0 && (
        <div className="kiveiv-banner flex items-center justify-between gap-2 px-3 py-2 text-xs">
          <span>已选择 {selectedIds.size} 个文档</span>
          <div className="flex items-center gap-2">
            <button type="button" onClick={openBatchConfig} className="kiveiv-btn-secondary kiveiv-btn-sm">批量修改配置</button>
            <button type="button" onClick={() => handleOpenDelete(Array.from(selectedIds))} className="kiveiv-btn-secondary kiveiv-btn-sm">批量删除</button>
          </div>
        </div>
      )}

      <div className="bento-card w-full">
        <div className="bento-card-inner w-full">
          <div className="w-full overflow-x-auto overflow-y-hidden rounded-[12px] border border-gray-100">
            <table ref={tableRef} className="kiveiv-table kiveiv-table-fixed-edges">
            <colgroup>
              <col style={{ width: '56px' }} />
              <col style={{ width: '230px' }} />
              <col style={{ minWidth: '110px' }} />
              <col style={{ minWidth: '110px' }} />
              <col style={{ minWidth: '96px' }} />
              <col style={{ minWidth: '260px' }} />
              <col style={{ minWidth: '140px' }} />
              <col style={{ minWidth: '140px' }} />
              <col style={{ width: '260px' }} />
            </colgroup>
            <thead>
              <tr>
              <th className="kiveiv-sticky-header kiveiv-sticky-left-1 py-3 text-left">
                <input type="checkbox" checked={allSelected} onChange={toggleSelectPage} />
              </th>
              <th className="kiveiv-sticky-header kiveiv-sticky-left-2 py-3 text-left">
                文件名称 / ID
              </th>
              <th className="py-3 text-left">状态</th>
              <th className="py-3 text-left">数据量</th>
              <th className="py-3 text-left">文件格式</th>
              <th className="py-3 text-left">文件标签</th>
              <th className="py-3 text-left">上传时间</th>
              <th className="py-3 text-left">更新时间</th>
              <th className="kiveiv-sticky-header kiveiv-sticky-right-1 py-3 text-left">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedFiles.map((file) => {
              const canSegment = file.status === '已解析'
              const canIndex = file.segStatusKey === 'processed' || file.segStatusKey === 'vectorized'
              const showSegProgress = file.segStatusKey === 'processing'
              const showIndexProgress = file.indexStatusKey === 'building' && file.indexTask?.id
              const segResultLabel = file.segStatusKey === 'error'
                ? '切分失败'
                : (file.segStatusKey === 'processed' || file.segStatusKey === 'vectorized')
                  ? '切分成功'
                  : '待切分'
              return (
                <tr key={file.id}>
                  <td className="kiveiv-sticky-left-1 py-3">
                    <input
                      type="checkbox"
                      checked={selectedIds.has(file.id)}
                      onChange={() => toggleSelectRow(file.id)}
                    />
                  </td>
                  <td className="kiveiv-sticky-left-2 kiveiv-table-title">
                    <button type="button" onClick={() => onOpenDocument?.(file)} className="text-left hover:text-gray-700">
                      <span className="block">{file.name}</span>
                      <span className="mt-1 block text-[11px] font-normal text-[var(--kiveiv-text-subtle)]">ID: {file.id}</span>
                    </button>
                  </td>
                  <td className="py-3">
                    <span className={`kiveiv-chip ${file.segStatusKey === 'error' ? 'kiveiv-chip-danger' : ''}`}>
                      {segResultLabel}
                    </span>
                  </td>
                  <td className="py-3">{formatCharCount(file.charCount || estimateChars(file))} 字符</td>
                  <td className="py-3">{file.type || '未知'}</td>
                  <td className="py-3">
                    <div className="flex max-w-[240px] flex-wrap items-center gap-1.5">
                      {(file.tags || []).map((tag) => (
                        <span
                          key={`${file.id}-${tag.key}-${tag.value}`}
                          className={`kiveiv-chip ${isTagMatched(tag, query, tagFilter) ? 'kiveiv-chip-accent' : ''}`}
                        >
                          {tag.key}:{tag.value}
                          {isTagMatched(tag, query, tagFilter) && <em className="ml-1 not-italic">命中</em>}
                          <button
                            type="button"
                            onClick={() => removeTag(file.id, tag)}
                            className="ml-1 text-[11px] text-[var(--kiveiv-text-subtle)] hover:text-[var(--kiveiv-text)]"
                            title="移除标签"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                      <button
                        type="button"
                        onClick={() => setTagModal({ open: true, fileId: file.id, key: tagKeys[0] || '文档类型', query: '' })}
                        className="inline-flex h-6 items-center rounded-full border border-[var(--kiveiv-border)] px-2 text-xs text-[var(--kiveiv-text-muted)] hover:border-[var(--kiveiv-accent)] hover:text-[var(--kiveiv-accent)]"
                      >
                        + 添加标签
                      </button>
                    </div>
                  </td>
                  <td className="py-3">{file.uploadedAt || file.createdAt || file.updatedAt || '--'}</td>
                  <td className="py-3">{file.updatedAt}</td>
                  <td className="kiveiv-sticky-right-1 py-3 text-xs">
                    <div className="flex flex-wrap items-center gap-3 text-gray-700">
                      {file.status === '解析中' && (
                        <button type="button" onClick={() => onViewProgress?.(file)} className="text-gray-900 hover:text-black">
                          解析进度
                        </button>
                      )}
                      {showSegProgress && (
                        <button type="button" onClick={() => onViewSegProgress?.(file)} className="text-gray-900 hover:text-black">
                          切分进度
                        </button>
                      )}
                      {showIndexProgress && (
                        <button type="button" onClick={() => onViewIndexProgress?.(file.indexTask?.id)} className="text-gray-900 hover:text-black">
                          索引进度
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => onEditDocument?.(file)}
                        className={`text-gray-900 hover:text-black ${file.status === '已解析' ? '' : 'pointer-events-none text-gray-300'}`}
                      >
                        修改配置
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOpenDelete([file.id])}
                        className="text-red-500 hover:text-red-600"
                      >
                        删除文档
                      </button>
                      <button
                        type="button"
                        onClick={() => onViewSegResults?.(file)}
                        className={`text-gray-900 hover:text-black ${file.segStatusKey !== 'not_processed' ? '' : 'pointer-events-none text-gray-300'}`}
                      >
                        切分结果
                      </button>
                      <button
                        type="button"
                        onClick={() => onJumpSegmentation?.(file)}
                        className={`text-gray-900 hover:text-black ${canSegment ? '' : 'pointer-events-none text-gray-300'}`}
                      >
                        去切分
                      </button>
                      <button
                        type="button"
                        onClick={() => onJumpIndexBuilding?.(file)}
                        className={`text-gray-900 hover:text-black ${canIndex ? '' : 'pointer-events-none text-gray-300'}`}
                      >
                        去索引
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {!paginatedFiles.length && (
              <tr>
                <td colSpan={9} className="py-16 text-center text-sm kiveiv-subtle">
                  {filteredFiles.length ? '暂无数据' : '无匹配结果，请调整搜索条件'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <BatchImportModal
        open={batchImportOpen}
        title="批量导入"
        dataTypeOptions={[
          { label: '实体数据', value: 'entities' },
          { label: '关系数据', value: 'relations' },
          { label: '字典/枚举', value: 'dictionary' }
        ]}
        getTemplateUrl={(type) => `/api/batch-import/template?type=${encodeURIComponent(type)}`}
        onClose={() => setBatchImportOpen(false)}
      />
    </div>
  </div>

      {totalPages > 1 && (
        <div className="kiveiv-banner flex flex-wrap items-center justify-between px-4 py-3 text-sm">
          <span>第 {page} 页，共 {totalPages} 页，每页 {PAGE_SIZE} 条</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
              className="kiveiv-btn-secondary kiveiv-btn-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              上一页
            </button>
            <button
              type="button"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
              className="kiveiv-btn-secondary kiveiv-btn-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              下一页
            </button>
          </div>
        </div>
      )}

      {importOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/30 px-4">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">新建/导入数据</h3>
                <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">按默认策略导入，后续可在文档解析中调整。</p>
              </div>
              <button
                type="button"
                onClick={() => setImportOpen(false)}
                className="kiveiv-subtle hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <button
                type="button"
                onClick={() => {
                  setImportOpen(false)
                  onCreate?.()
                }}
                className="kiveiv-select-card flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <span className="kiveiv-select-icon">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="4" y="3" width="16" height="18" rx="2" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h8M8 11h8M8 15h5" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">导入文本文档数据</p>
                    <p className="kiveiv-gap-title-note text-xs kiveiv-muted">支持 PDF、DOCX、MD、TXT，默认“自动解析”策略</p>
                  </div>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setImportOpen(false)
                  onCreateGraphImport?.()
                }}
                className="kiveiv-select-card flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <span className="kiveiv-select-icon">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="7" cy="12" r="2.5" />
                      <circle cx="17" cy="7" r="2.5" />
                      <circle cx="17" cy="17" r="2.5" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.2 10.9 14.8 8.1M9.2 13.1 14.8 15.9" />
                    </svg>
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">拓扑图谱导入通道</p>
                    <p className="kiveiv-gap-title-note text-xs kiveiv-muted">支持三元组/节点关系数据导入，进入图谱抽取与聚合流程</p>
                  </div>
                </div>
              </button>
            </div>

            <div className="mt-4 rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-3">
              <p className="text-sm font-semibold text-[var(--kiveiv-text)]">双通道导入策略（统一）</p>
              <ul className="mt-2 grid gap-1 text-xs text-[var(--kiveiv-text-muted)] md:grid-cols-2">
                <li>1. 文档通道：自动解析并进入切分阶段</li>
                <li>2. 图谱通道：直接进入图结构抽取/聚合</li>
                <li>3. 失败任务：统一进入任务中心重试</li>
                <li>4. 导入记录：在导出治理中可追溯</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {tagModal.open && activeTagFile && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25 px-4">
          <div className="relative w-full max-w-[560px] rounded-2xl border border-[var(--kiveiv-border)] bg-white p-5 shadow-[var(--kiveiv-shadow-soft)]">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-[var(--kiveiv-text)]">标签（{(activeTagFile.tags || []).length}）</h3>
                <p className="text-xs text-[var(--kiveiv-text-subtle)]">文件：{activeTagFile.name}</p>
              </div>
              <button
                type="button"
                onClick={() => setTagModal({ open: false, fileId: '', key: '文档类型', query: '' })}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--kiveiv-text-subtle)] hover:bg-[var(--kiveiv-surface-muted)]"
                aria-label="关闭标签弹窗"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex flex-wrap items-center gap-1.5">
                {(activeTagFile.tags || []).map((tag) => (
                  <span key={`${activeTagFile.id}-${tag.key}-${tag.value}`} className="kiveiv-chip">
                    {tag.key}:{tag.value}
                    <button
                      type="button"
                      onClick={() => removeTag(activeTagFile.id, tag)}
                      className="ml-1 text-[11px] text-[var(--kiveiv-text-subtle)] hover:text-[var(--kiveiv-text)]"
                      title="移除标签"
                    >
                      ×
                    </button>
                  </span>
                ))}
                {!(activeTagFile.tags || []).length && (
                  <span className="text-xs text-[var(--kiveiv-text-subtle)]">暂无标签</span>
                )}
              </div>

              <div className="grid gap-2 md:grid-cols-[160px_1fr]">
                <select
                  value={tagModal.key}
                  onChange={(event) => setTagModal((prev) => ({ ...prev, key: event.target.value }))}
                  className="kiveiv-input h-10"
                >
                  {[...new Set(['文档类型', '来源', '优先级', ...tagKeys])].map((key) => (
                    <option key={key} value={key}>{key}</option>
                  ))}
                </select>
                <input
                  value={tagModal.query}
                  onChange={(event) => setTagModal((prev) => ({ ...prev, query: event.target.value }))}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' && canCreateTag && createTagCandidate) {
                      event.preventDefault()
                      addTagByValue(activeTagFile.id, createTagCandidate.key, createTagCandidate.value)
                    }
                  }}
                  placeholder="查找或创建选项，如：合同 或 来源:内网"
                  className="kiveiv-input h-10"
                />
              </div>

              <div className="max-h-44 overflow-y-auto rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-2">
                {filteredTagOptions.map((tag) => (
                  <button
                    key={`${tag.key}-${tag.value}`}
                    type="button"
                    onClick={() => addTagByValue(activeTagFile.id, tag.key, tag.value)}
                    className="mb-1 mr-1 inline-flex rounded-full border border-transparent bg-white px-2.5 py-1 text-xs text-[var(--kiveiv-text-muted)] hover:border-[var(--kiveiv-accent)] hover:text-[var(--kiveiv-accent)]"
                  >
                    {tag.key}:{tag.value}
                  </button>
                ))}
                {!filteredTagOptions.length && (
                  <p className="px-1 py-1 text-sm text-[var(--kiveiv-text-subtle)]">没有选项</p>
                )}
                {canCreateTag && createTagCandidate && (
                  <button
                    type="button"
                    onClick={() => addTagByValue(activeTagFile.id, createTagCandidate.key, createTagCandidate.value)}
                    className="mt-2 flex w-full items-center justify-start rounded-[var(--kiveiv-radius-control)] bg-white px-3 py-2 text-left text-sm text-[var(--kiveiv-text)] hover:border-[var(--kiveiv-accent)]"
                  >
                    创建选项&nbsp;
                    <span className="font-semibold">{createTagCandidate.key}:{createTagCandidate.value}</span>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[var(--kiveiv-text-subtle)]">支持回车快速创建标签</span>
              <button
                type="button"
                onClick={() => {
                  onJumpTagManagement?.()
                  setTagModal({ open: false, fileId: '', key: '文档类型', query: '' })
                }}
                className="inline-flex items-center gap-1 rounded-full border border-[var(--kiveiv-border)] px-3 py-1 text-xs text-[var(--kiveiv-text-muted)] hover:border-[var(--kiveiv-accent)] hover:text-[var(--kiveiv-accent)]"
              >
                标签管理
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {batchConfigOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25 px-4">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--kiveiv-border)] bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-[var(--kiveiv-text)]">批量修改配置</h3>
              <button type="button" onClick={() => setBatchConfigOpen(false)} className="kiveiv-modal-close">✕</button>
            </div>
            <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">将应用到 {selectedIds.size} 个文档。</p>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div>
                <label className="text-xs font-semibold kiveiv-subtle">解析策略</label>
                <select
                  value={batchForm.parsePolicy}
                  onChange={(event) => setBatchForm((prev) => ({ ...prev, parsePolicy: event.target.value }))}
                  className="kiveiv-select mt-2 w-full"
                >
                  <option value="">不修改</option>
                  <option value="Pipeline">Pipeline</option>
                  <option value="问答对提取">问答对提取</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold kiveiv-subtle">来源类型</label>
                <select
                  value={batchForm.sourceType}
                  onChange={(event) => setBatchForm((prev) => ({ ...prev, sourceType: event.target.value }))}
                  className="kiveiv-select mt-2 w-full"
                >
                  <option value="">不修改</option>
                  <option value="本地文件">本地文件</option>
                  <option value="内网">内网</option>
                  <option value="外部">外部</option>
                </select>
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-semibold kiveiv-subtle">启用状态</label>
              <select
                value={batchForm.enabled}
                onChange={(event) => setBatchForm((prev) => ({ ...prev, enabled: event.target.value }))}
                className="kiveiv-select mt-2 w-full"
              >
                <option value="">不修改</option>
                <option value="true">启用</option>
                <option value="false">停用</option>
              </select>
            </div>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button type="button" onClick={() => setBatchConfigOpen(false)} className="kiveiv-btn-secondary">取消</button>
              <button type="button" onClick={applyBatchConfig} className="kiveiv-btn-primary">确认修改</button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm.open && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/25 px-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--kiveiv-border)] bg-white p-5">
            <h3 className="text-base font-semibold text-[var(--kiveiv-text)]">确认删除文档</h3>
            <p className="mt-2 text-sm text-[var(--kiveiv-text-muted)]">
              已选择 {deleteConfirm.ids.length} 个文档。删除后如需再次使用，必须重新上传文档。是否继续？
            </p>
            <div className="mt-5 flex items-center justify-end gap-2">
              <button type="button" onClick={() => setDeleteConfirm({ open: false, ids: [] })} className="kiveiv-btn-secondary">取消</button>
              <button type="button" onClick={handleConfirmDelete} className="kiveiv-btn-danger">确认删除</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

function estimateChars(file = {}) {
  if (typeof file.charCount === 'number' && file.charCount > 0) return file.charCount
  const text = `${file.name || ''}${file.description || ''}`
  if (text.length) return text.length * 120
  return 0
}

function formatCharCount(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return `${value || 0}`
}

function isTagMatched(tag, query, tagFilter) {
  const text = `${tag.key}:${tag.value}`
  const byFilter = tagFilter !== 'all' && text === tagFilter
  const byQuery = Boolean(query?.trim()) && text.toLowerCase().includes(query.trim().toLowerCase())
  return byFilter || byQuery
}
