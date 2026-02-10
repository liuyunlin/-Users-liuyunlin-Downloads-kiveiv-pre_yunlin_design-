import { useMemo, useState } from 'react'
import { TaskListTable } from '../../../shared/components/TaskListTable.jsx'

export function SegDocsPage({
  strategyOpen,
  documents,
  selectedDocs,
  selectedDocItems,
  currentSelectionCount,
  statusStyles,
  statusLabels,
  isSelectableStatus,
  onToggleSelectDoc,
  onClearSelection,
  onOpenResultsForDoc,
  onOpenStrategyForDocs,
  onResetStrategy,
  stepIndex,
  onGoStep,
  STEP_FLOW,
  STRATEGIES,
  strategy,
  onSetStrategy,
  chunkSize,
  onSetChunkSize,
  overlap,
  onSetOverlap,
  minTokens,
  onSetMinTokens,
  maxTokens,
  onSetMaxTokens,
  enableClean,
  onSetEnableClean,
  enableMap,
  onSetEnableMap,
  enableTags,
  onSetEnableTags,
  enableValidation,
  onSetEnableValidation,
  mergeSmall,
  onSetMergeSmall,
  fixOverflow,
  onSetFixOverflow,
  onSaveStrategy,
  lastSavedAt,
  onStartSegmentation,
  segProgress = 0,
  segRunningDocIds = []
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

  const selectableVisibleIds = useMemo(
    () => filteredDocuments.filter((doc) => isSelectableStatus(doc.status)).map((doc) => doc.id),
    [filteredDocuments, isSelectableStatus]
  )
  const allVisibleSelected = selectableVisibleIds.length > 0 && selectableVisibleIds.every((id) => selectedDocs.has(id))
  const partiallySelected = !allVisibleSelected && selectableVisibleIds.some((id) => selectedDocs.has(id))
  const runningSet = useMemo(() => new Set(segRunningDocIds), [segRunningDocIds])

  const handleToggleSelectVisible = () => {
    if (!selectableVisibleIds.length) return
    const shouldSelect = !allVisibleSelected
    selectableVisibleIds.forEach((id) => {
      const selected = selectedDocs.has(id)
      if (shouldSelect && !selected) onToggleSelectDoc(id)
      if (!shouldSelect && selected) onToggleSelectDoc(id)
    })
  }

  return (
    <section className="section-stack">
      {!strategyOpen ? (
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
          tableToolbar={(
            <>
              <span>已选择 {selectedDocs.size} 个文档</span>
              <span className="text-[12px] kiveiv-subtle">仅“未切分/失败”可批量选择</span>
              {currentSelectionCount > 0 && (
                <button
                  type="button"
                  onClick={onClearSelection}
                  className="kiveiv-btn-secondary kiveiv-btn-sm"
                >
                  清空选择
                </button>
              )}
            </>
          )}
        >
          <table className="kiveiv-table">
            <thead>
              <tr>
                <th className="text-left" style={{ width: 56 }}>
                  <CircleCheckbox
                    checked={allVisibleSelected}
                    indeterminate={partiallySelected}
                    onChange={handleToggleSelectVisible}
                    ariaLabel="选择当前筛选文档"
                  />
                </th>
                <th className="text-left">文档</th>
                <th className="text-left">状态</th>
                <th className="text-left">更新时间</th>
                <th className="text-left">切片数</th>
                <th className="text-left">操作</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.map((doc) => {
                const selectable = isSelectableStatus(doc.status)
                const isChecked = selectedDocs.has(doc.id)
                return (
                  <tr key={doc.id}>
                    <td>
                      <CircleCheckbox
                        checked={isChecked}
                        onChange={() => onToggleSelectDoc(doc.id)}
                        ariaLabel={`选择文档 ${doc.name}`}
                        disabled={!selectable}
                      />
                    </td>
                    <td>
                      <div className="kiveiv-table-title">{doc.name}</div>
                      <div className="text-xs kiveiv-subtle">{doc.source}</div>
                    </td>
                    <td>
                      <span className={statusStyles[doc.status]}>{statusLabels[doc.status]}</span>
                    </td>
                    <td className="text-xs kiveiv-muted">{doc.updatedAt}</td>
                    <td className="text-xs kiveiv-muted">{doc.totalChunks || '-'}</td>
                    <td className="text-xs kiveiv-muted">
                      <div className="flex flex-wrap items-center gap-2">
                        {doc.status === 'processing' && (
                          <span className="inline-flex items-center gap-2 text-xs text-[var(--kiveiv-text-muted)]">
                            <MiniRing value={runningSet.has(doc.id) ? segProgress : 95} />
                            {runningSet.has(doc.id) ? `${segProgress}%` : '处理中'}
                          </span>
                        )}
                        {doc.status === 'processed' && (
                          <>
                            <button
                              type="button"
                              onClick={() => onOpenResultsForDoc(doc.id)}
                              className="font-medium text-blue-600 hover:text-blue-700"
                            >
                              查看结果
                            </button>
	                            <button
	                              type="button"
	                              onClick={() => onOpenStrategyForDocs([doc.id])}
	                              className="kiveiv-kbd-link"
	                            >
	                              重新切分
	                            </button>
                          </>
                        )}
                        {doc.status === 'error' && (
                          <button
                            type="button"
                            onClick={() => onOpenStrategyForDocs([doc.id])}
                            className="font-medium text-blue-600 hover:text-blue-700"
                          >
                            重新切分
                          </button>
                        )}
                        {doc.status !== 'processed' && doc.status !== 'error' && (
                          <span className="kiveiv-subtle">-</span>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {!filteredDocuments.length && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-xs kiveiv-subtle">
                    暂无符合条件的文档，请调整筛选条件。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </TaskListTable>
      ) : (
        <section className="w-full max-w-none kiveiv-stack-section">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>策略配置</h3>
              <p className="kiveiv-gap-title-note text-xs kiveiv-muted">配置切分参数并确认执行。</p>
            </div>
            <button
              type="button"
              onClick={onResetStrategy}
              className="kiveiv-btn-secondary"
            >
              返回列表
            </button>
          </div>

          {!selectedDocItems.length ? (
            <div
              className="kiveiv-card border-dashed p-8 text-center text-sm kiveiv-muted"
              style={{ background: 'var(--kiveiv-surface-muted)' }}
            >
              当前没有待切分文档，请返回列表重新选择。
            </div>
          ) : (
            <div className="w-full max-w-none space-y-4">
              <div className="bento-card">
                <div className="bento-card-inner space-y-4">
                  <div className="space-y-3">
                    {STEP_FLOW.map((step, index) => (
                      <div key={step.id} className="flex items-center gap-3 text-sm">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
                            index < stepIndex
                              ? 'bg-blue-600 text-white'
                              : index === stepIndex
                                ? 'bg-blue-100 text-blue-700'
                                : 'text-gray-400'
                          }`}
                          style={index > stepIndex ? { background: 'var(--kiveiv-surface-muted)', border: '1px solid var(--kiveiv-border)' } : undefined}
                        >
                          {index < stepIndex ? (
                            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            index + 1
                          )}
                        </span>
                        <span className={index === stepIndex ? 'font-semibold' : 'kiveiv-muted'} style={index === stepIndex ? { color: 'var(--kiveiv-text)' } : undefined}>
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {stepIndex === 0 && (
                    <div className="kiveiv-card p-4 text-sm kiveiv-muted" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                      <p className="font-semibold" style={{ color: 'var(--kiveiv-text)' }}>已选择文档</p>
                      <ul className="mt-2 space-y-1 text-xs kiveiv-muted">
                        {selectedDocItems.map((doc) => (
                          <li key={doc.id}>{doc.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {stepIndex === 1 && (
                    <div className="space-y-4">
                      <div className="space-y-3">
                        {STRATEGIES.map((item) => (
	                          <button
	                            key={item.id}
	                            type="button"
	                            onClick={() => onSetStrategy(item.id)}
	                            className={`w-full rounded-xl border px-4 py-3 text-left text-xs transition-colors ${
	                              strategy === item.id
	                                ? 'border-blue-200 bg-blue-50'
	                                : 'kiveiv-muted hover:border-blue-200'
	                            }`}
	                            style={strategy === item.id ? { color: 'var(--kiveiv-text)' } : { borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface)' }}
	                          >
                            <p className="font-semibold">{item.name}</p>
                            <p className="mt-1 text-[12px] kiveiv-muted">{item.description}</p>
                          </button>
                        ))}
                      </div>

                      <div className="grid gap-3">
                        <Field label="Chunk 长度">
                          <Input value={chunkSize} onChange={onSetChunkSize} suffix="tokens" />
                        </Field>
                        <Field label="Overlap">
                          <Input value={overlap} onChange={onSetOverlap} suffix="tokens" />
                        </Field>
                        <Field label="最小 Tokens">
                          <Input value={minTokens} onChange={onSetMinTokens} suffix="tokens" />
                        </Field>
                        <Field label="最大 Tokens">
                          <Input value={maxTokens} onChange={onSetMaxTokens} suffix="tokens" />
                        </Field>
                      </div>

                      <div className="grid gap-2">
                        <ToggleRow label="清洗噪声" value={enableClean} onChange={onSetEnableClean} />
                        <ToggleRow label="结构映射" value={enableMap} onChange={onSetEnableMap} />
                        <ToggleRow label="Tag 生成" value={enableTags} onChange={onSetEnableTags} />
                        <ToggleRow label="结果验证" value={enableValidation} onChange={onSetEnableValidation} />
                        <ToggleRow label="小切片合并" value={mergeSmall} onChange={onSetMergeSmall} />
                        <ToggleRow label="溢出修复" value={fixOverflow} onChange={onSetFixOverflow} />
                      </div>

                      <button
                        type="button"
                        onClick={onSaveStrategy}
                        className="kiveiv-btn-secondary w-full"
                      >
                        保存策略
                      </button>
                      {lastSavedAt && (
                        <p className="text-center text-[12px] kiveiv-subtle">已保存于 {lastSavedAt}</p>
                      )}
                    </div>
                  )}

                  {stepIndex === 2 && (
                    <div className="space-y-3 text-sm kiveiv-muted">
                      <div className="kiveiv-card p-4" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                        <p className="text-xs kiveiv-muted">策略摘要</p>
                        <p className="kiveiv-gap-title-body text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>
                          {STRATEGIES.find((item) => item.id === strategy)?.name}
                        </p>
                        <p className="kiveiv-gap-title-note text-xs kiveiv-muted">Chunk: {chunkSize} / Overlap: {overlap}</p>
                        <p className="kiveiv-gap-title-note text-xs kiveiv-muted">目标文档：{selectedDocItems.length} 个</p>
                      </div>
                      <button
                        type="button"
                        onClick={onStartSegmentation}
                        className="kiveiv-btn-primary w-full"
                      >
                        开始切分
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => onGoStep(stepIndex - 1)}
                      disabled={stepIndex === 0}
                      className="kiveiv-btn-secondary kiveiv-btn-sm"
                    >
                      上一步
                    </button>
                    <button
                      type="button"
                      onClick={() => onGoStep(stepIndex + 1)}
                      disabled={stepIndex === STEP_FLOW.length - 1}
                      className="kiveiv-btn-secondary kiveiv-btn-sm"
                    >
                      下一步
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </section>
  )
}

function MiniRing({ value = 0 }) {
  const normalized = Math.max(0, Math.min(100, Number(value) || 0))
  const radius = 8
  const circumference = 2 * Math.PI * radius
  const dashOffset = circumference * (1 - normalized / 100)
  return (
    <svg className="h-5 w-5 -rotate-90" viewBox="0 0 24 24" aria-label={`进度 ${normalized}%`}>
      <circle cx="12" cy="12" r={radius} fill="none" stroke="var(--kiveiv-border)" strokeWidth="2.5" />
      <circle
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        stroke="var(--kiveiv-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={dashOffset}
      />
    </svg>
  )
}

function Field({ label, children }) {
  return (
    <label className="block text-[12px] font-semibold uppercase tracking-wide kiveiv-subtle">
      {label}
      <div className="mt-2">{children}</div>
    </label>
  )
}

function Input({ value, onChange, suffix }) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="kiveiv-input w-full text-xs"
      />
      {suffix && <span className="pointer-events-none absolute right-3 top-2 text-[12px] kiveiv-subtle">{suffix}</span>}
    </div>
  )
}

function ToggleRow({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between rounded-xl border px-3 py-2 text-xs" style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}>
      <span className="kiveiv-muted">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
          value ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        aria-pressed={value}
      >
        <span
          className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
            value ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )
}

function CircleCheckbox({ checked, indeterminate = false, onChange, ariaLabel, disabled = false }) {
  return (
    <label className={`inline-flex items-center justify-center ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
      <input
        type="checkbox"
        aria-label={ariaLabel}
        checked={checked}
        onChange={() => {
          if (!disabled) onChange?.()
        }}
        ref={(element) => {
          if (element) element.indeterminate = indeterminate
        }}
        className="sr-only"
        disabled={disabled}
      />
	      <span
	        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-colors ${
	          disabled
	            ? 'border-gray-200 bg-white text-gray-300 opacity-60'
	            : checked || indeterminate
	              ? 'border-blue-300 bg-blue-600 text-white'
	              : 'border-gray-200 bg-white'
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
