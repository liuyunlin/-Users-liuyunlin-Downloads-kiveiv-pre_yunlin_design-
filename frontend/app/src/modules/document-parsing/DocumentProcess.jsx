import { useEffect, useMemo, useRef, useState } from 'react'
import { useDocumentStore } from './documentStore.jsx'
import { useSettingsStore } from '../settings/SettingsStore.jsx'
import { collectSavedModels } from '../settings/modelUtils.js'
import { buildSegmentsForDocument } from './sampleContent.js'
import { LinearProgress } from '../shared/components/LinearProgress.jsx'
import { OverlayDrawer } from '../shared/components/OverlayDrawer.jsx'

const PAGE_SIZE = 10
const SIMULATED_PROCESS_SECONDS = 30

function createDefaultSegmentsForDocument(docId, docs) {
  const doc = docs.find((item) => item.id === docId) || { id: docId }
  return buildSegmentsForDocument(doc)
}

export function DocumentProcess({ onBack, onContinueUpload, onNavigateSettings, initialSelection, onInitialSelectionConsumed, autoStartSignal = 0 }) {
  const {
    documents,
    setDocuments,
    startProcessing,
    progress,
    activeProcess,
    isProgressVisible,
    setIsProgressVisible,
    ensureParsedContent
  } = useDocumentStore()
  const { models } = useSettingsStore()
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [page, setPage] = useState(1)
  const [stage, setStage] = useState('selection')
  const [activeModal, setActiveModal] = useState(null)
  const [alertInfo, setAlertInfo] = useState(null)
  const [processingDocs, setProcessingDocs] = useState([])
  const [reparseInfo, setReparseInfo] = useState(null)
  const lastAutoStartSignalRef = useRef(0)
  const availableParseModels = useMemo(() => collectSavedModels(models, 'layout-model'), [models])

  const totalPages = Math.max(1, Math.ceil(documents.length / PAGE_SIZE))

  const paginatedDocuments = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE
    return documents.slice(start, start + PAGE_SIZE)
  }, [documents, page])

  const selectedDocuments = useMemo(
    () => documents.filter((doc) => selectedIds.has(doc.id)),
    [documents, selectedIds]
  )
  const uploadedCount = documents.length
  const parsingCount = documents.filter((doc) => doc.status === '解析中').length
  const parsedCount = documents.filter((doc) => doc.status === '已解析').length
  const unparsedCount = Math.max(0, uploadedCount - parsingCount - parsedCount)

  const hasSelection = selectedIds.size > 0

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages)
    }
  }, [page, totalPages])

  useEffect(() => {
    if (!selectedDocuments.length && (stage === 'mode' || stage === 'standard')) {
      setStage('selection')
      setActiveModal(null)
    }
  }, [selectedDocuments.length, stage])

  useEffect(() => {
    if (!initialSelection?.id) return
    const exists = documents.some((doc) => doc.id === initialSelection.id)
    if (exists) {
      setSelectedIds(new Set([initialSelection.id]))
      setStage('selection')
    }
    onInitialSelectionConsumed?.()
  }, [initialSelection, documents, onInitialSelectionConsumed])

  const toggleSelection = (id) => {
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
    setStage('selection')
    setActiveModal(null)
  }

  const goToSelection = () => {
    setStage('selection')
    setActiveModal(null)
  }

  const handleStartParse = () => {
    if (!hasSelection) return

    const blockedDocs = selectedDocuments.filter((doc) => doc.status !== '未解析')
    if (blockedDocs.length) {
      setReparseInfo({ docs: blockedDocs })
      return
    }

    // 仅保留 Pineline 主路径，直接进入配置弹窗，减少一步点击。
    setStage('standard')
    setActiveModal('parse-engine')
  }

  const enterStandardMode = () => {
    setActiveModal(null)
    setStage('standard')
  }

  const leaveStandardMode = () => {
    setActiveModal(null)
    setStage('mode')
  }

  const openConfigModal = (type) => {
    setActiveModal(type)
  }

  const closeConfigModal = () => {
    setActiveModal(null)
  }

  const handleStartParsingWorkflow = (config, docs) => {
    if (!docs.length) return

    if (!availableParseModels.length) {
      setAlertInfo({
        title: '文档解析模型未配置',
        description: '请先在设置中配置文档解析模型后再开始解析。',
        settingsTab: 'model-layout'
      })
      setActiveModal(null)
      setStage('mode')
      return
    }

    const selectedModel = config?.model

    if (!selectedModel) {
      setAlertInfo({
        title: '请选择解析模型',
        description: '请在弹窗中选择已保存的文档解析模型后再开始解析。',
        settingsTab: 'model-layout'
      })
      setActiveModal(null)
      setStage('mode')
      return
    }

    const ids = docs.map((doc) => doc.id)
    setProcessingDocs(docs.map((doc) => ({ id: doc.id, name: doc.name })))

    setDocuments((prev) =>
      prev.map((doc) =>
        ids.includes(doc.id)
          ? {
              ...doc,
              dataset: {
                basePath: '/auto'
              }
            }
          : doc
      )
    )

    startProcessing(ids)
    ids.forEach((id) => {
      ensureParsedContent(id, () => createDefaultSegmentsForDocument(id, documents))
    })
    setActiveModal(null)
    setIsProgressVisible(true)
    setStage('selection')
    setSelectedIds(new Set())
  }

  const renderAlertModal = () => {
    if (!alertInfo) return null

    return (
      <AlertModal
        title={alertInfo.title}
        description={alertInfo.description}
        onClose={() => setAlertInfo(null)}
        confirmLabel="返回重新配置"
        onConfirm={onNavigateSettings
          ? () => {
              setAlertInfo(null)
              onNavigateSettings(alertInfo.settingsTab || 'model-layout')
            }
          : undefined}
      />
    )
  }

  const handleConfirmReparse = () => {
    if (!reparseInfo) return
    const ids = selectedDocuments.map((doc) => doc.id)
    setDocuments((prev) =>
      prev.map((doc) =>
        ids.includes(doc.id)
          ? { ...doc, status: '未解析', progress: 0 }
          : doc
      )
    )
    setReparseInfo(null)
    setStage('mode')
  }

  const renderReparseModal = () => {
    if (!reparseInfo) return null

    const messageDocs = reparseInfo.docs.slice(0, 3).map((doc) => doc.name)
    const hasMore = reparseInfo.docs.length > 3
    const docSummary = hasMore
      ? `${messageDocs.join('、')} 等 ${reparseInfo.docs.length} 个文档`
      : messageDocs.join('、')

    return (
      <ConfirmReparseModal
        title="重复解析确认"
        description={`所选文档中包含 ${docSummary}，当前状态为解析中或已解析。是否清除现有结果并重新解析？`}
        onCancel={() => setReparseInfo(null)}
        onConfirm={handleConfirmReparse}
      />
    )
  }

  const renderProgressModal = () => {
    if (!isProgressVisible) return null

    const activeIds = activeProcess?.ids || processingDocs.map((doc) => doc.id)
    const docsInProcess = (activeIds?.length ? documents.filter((doc) => activeIds.includes(doc.id)) : processingDocs)
      .map((doc) => ({ id: doc.id, name: doc.name }))
    const uniqueDocs = docsInProcess.length
      ? docsInProcess.reduce((acc, doc) => {
          if (!acc.some((item) => item.id === doc.id)) {
            acc.push(doc)
          }
          return acc
        }, [])
      : processingDocs

    const remainingSeconds = progress >= 100
      ? 0
      : Math.max(0, Math.ceil(((100 - progress) / 100) * SIMULATED_PROCESS_SECONDS))

    return (
      <ProgressModal
        progress={progress}
        documents={uniqueDocs}
        remainingSeconds={remainingSeconds}
        onClose={() => setIsProgressVisible(false)}
      />
    )
  }

  useEffect(() => {
    if (!autoStartSignal || autoStartSignal === lastAutoStartSignalRef.current) return
    lastAutoStartSignalRef.current = autoStartSignal
    if (parsingCount > 0 || activeProcess) return
    const pendingDocs = documents.filter((doc) => doc.status === '未解析')
    if (!pendingDocs.length) return
    const defaultModel = availableParseModels[0]
    if (!defaultModel) {
      setAlertInfo({
        title: '文档解析模型未配置',
        description: '请先在设置中配置文档解析模型后再开始解析。',
        settingsTab: 'model-layout'
      })
      return
    }
    setSelectedIds(new Set(pendingDocs.map((doc) => doc.id)))
    handleStartParsingWorkflow({ mode: 'parse-engine', model: defaultModel }, pendingDocs)
  }, [autoStartSignal, parsingCount, activeProcess, documents, availableParseModels])

  if (!documents.length) {
    return (
      <>
        <div className="kiveiv-card flex min-h-[320px] flex-col items-center justify-center border-dashed text-center" style={{ background: 'var(--kiveiv-surface-muted)' }}>
          <h2 className="text-xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>暂无待解析的文档</h2>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">请先在文档列表或上传模块中添加文档。</p>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="mt-6 kiveiv-btn-secondary"
            >
              返回文档列表
            </button>
          )}
        </div>
        {renderAlertModal()}
        {renderReparseModal()}
        {renderProgressModal()}
      </>
    )
  }

	  if (stage === 'mode') {
    const selectionLabel = selectedDocuments.length === 1
      ? `已选择 1 个文档：${selectedDocuments[0].name}`
      : `已选择 ${selectedDocuments.length} 个文档`

	    return (
	      <div className="kiveiv-stack-module">
	        <header className="lg:flex lg:items-start lg:justify-between">
	          <div className="min-w-0 flex-1">
	            <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>选择解析模式</h2>
	            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">{selectionLabel}。请选择合适的解析方式。</p>
	          </div>
          <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:ml-4">
            <button
              type="button"
              onClick={goToSelection}
              className="kiveiv-btn-secondary"
            >
              重新选择
            </button>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="kiveiv-btn-secondary"
              >
                返回文档列表
              </button>
            )}
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2">
          <ModeCard
            title="Pineline"
            description="基于 Pineline 模型自动完成文档解析，支持 MinerU 与 PaddlePaddleOCR。"
            accent="indigo"
            badge="稳定"
            icon={<StandardIcon />}
            actionLabel="配置模型"
            onAction={enterStandardMode}
          />
          <ModeCard
            title="智能体"
            description="智能识别文档语义，自动推荐适配策略，适用于复杂或混合型信息。"
            accent="sky"
            badge="推荐"
            icon={<AgentIcon />}
            disabled
          />
        </section>

	        <section className="kiveiv-card p-6">
	          <h3 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>已选择文档</h3>
	          <ul className="mt-4 grid gap-2 md:grid-cols-2">
	            {selectedDocuments.map((doc) => (
	              <li key={doc.id} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm kiveiv-muted" style={{ background: 'var(--kiveiv-surface-muted)' }}>
	                <span className="truncate pr-4" title={doc.name}>{doc.name}</span>
	                <span className="text-xs kiveiv-subtle">{doc.id}</span>
	              </li>
	            ))}
	          </ul>
	        </section>
        {renderAlertModal()}
        {renderReparseModal()}
        {renderProgressModal()}
      </div>
    )
  }

  if (stage === 'standard') {
    return (
      <>
        <StandardMode
          onBack={leaveStandardMode}
          documents={selectedDocuments}
          onOpenModal={openConfigModal}
          activeModal={activeModal}
          onCloseModal={closeConfigModal}
          models={models}
          onNavigateSettings={onNavigateSettings}
          onConfirmParse={(config) => handleStartParsingWorkflow(config, selectedDocuments)}
        />
        {renderAlertModal()}
        {renderReparseModal()}
        {renderProgressModal()}
      </>
    )
  }

  const allSelectedOnPage = paginatedDocuments.length > 0 && paginatedDocuments.every((doc) => selectedIds.has(doc.id))

	  return (
	    <div className="section-stack kiveiv-content-rail">
	      <header className="lg:flex lg:items-start lg:justify-between">
	        <div className="min-w-0 flex-1 space-y-1">
	          <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>文档解析</h2>
	          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">请选择需要解析的文档，系统支持批量处理并保留历史记录。</p>
	        </div>
        <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:ml-4">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="kiveiv-btn-secondary"
            >
              返回文档列表
            </button>
          )}
        </div>
      </header>

      <section className="kiveiv-card border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-[var(--kiveiv-text)]">
              已上传 {uploadedCount} 个文档
            </p>
            <p className="mt-1 text-xs text-[var(--kiveiv-text-subtle)]">
              待解析 {unparsedCount} 个，解析中 {parsingCount} 个，已解析 {parsedCount} 个
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onContinueUpload?.()}
              className="kiveiv-btn-secondary h-9 px-3 text-xs"
            >
              继续上传
            </button>
            <button
              type="button"
              onClick={handleStartParse}
              disabled={!hasSelection}
              className={`kiveiv-btn-primary h-9 px-3 text-xs ${hasSelection ? '' : 'kiveiv-btn-disabled'}`}
            >
              开始解析
            </button>
          </div>
        </div>
      </section>

	      <section className="bento-card">
	        <div className="bento-card-inner">
	          <div className="flex h-14 items-center justify-between border-b px-5" style={{ borderColor: 'var(--kiveiv-border)' }}>
	          <div className="text-sm kiveiv-muted">
	            <span>共 {documents.length} 个文档</span>
	            <span className="mx-2 kiveiv-subtle">|</span>
	            <span>已选择 {selectedIds.size} 个</span>
	          </div>
	          <button
	            type="button"
            onClick={resetSelection}
            className={`kiveiv-btn-secondary ${hasSelection ? '' : 'pointer-events-none opacity-0'}`}
          >
            清空选择
          </button>
          </div>

          <div className="overflow-x-auto">
            <table className="kiveiv-table">
              <colgroup>
                <col style={{ width: '56px' }} />
                <col style={{ minWidth: '260px' }} />
                <col style={{ minWidth: '220px' }} />
                <col style={{ minWidth: '120px' }} />
                <col style={{ minWidth: '120px' }} />
              </colgroup>
              <thead>
              <tr>
                <th className="w-14 py-3">
                  <CircleCheckbox
                    checked={allSelectedOnPage}
                    indeterminate={!allSelectedOnPage && paginatedDocuments.some((doc) => selectedIds.has(doc.id))}
                    onChange={toggleSelectPage}
                    ariaLabel="选择当前页全部文档"
                  />
                </th>
                <th className="py-3 text-left">文档名</th>
                <th className="py-3 text-left">文档 ID</th>
                <th className="py-3 text-left">文档类型</th>
                <th className="py-3 text-left">文档大小</th>
              </tr>
            </thead>
            <tbody>
	              {paginatedDocuments.map((doc) => {
	                const isChecked = selectedIds.has(doc.id)
	                return (
	                  <tr key={doc.id}>
                    <td className="py-3">
                      <CircleCheckbox
                        checked={isChecked}
                        onChange={() => toggleSelection(doc.id)}
                        ariaLabel={`选择文档 ${doc.name}`}
                      />
	                    </td>
	                    <td className="whitespace-nowrap py-3 text-sm kiveiv-table-title">{doc.name}</td>
	                    <td className="whitespace-nowrap py-3 text-sm kiveiv-muted">{doc.id}</td>
	                    <td className="whitespace-nowrap py-3 text-sm kiveiv-muted">{doc.type}</td>
	                    <td className="whitespace-nowrap py-3 text-sm kiveiv-muted">{doc.size}</td>
	                  </tr>
	                )
	              })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      {renderAlertModal()}
      {renderReparseModal()}
      {renderProgressModal()}
    </div>
  )
}

function ProgressModal({ progress, documents, remainingSeconds, onClose }) {
  const isCompleted = progress >= 100
  const statusLabel = isCompleted ? '解析完成' : '正在解析'
  const progressDisplay = `${progress}%`
  const remainingLabel = isCompleted ? '全部文档已解析完成' : `预计剩余 ${remainingSeconds} 秒`

	  return (
	    <div className="kiveiv-backdrop">
	      <div className="kiveiv-modal max-w-lg">
	        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'var(--kiveiv-border)' }}>
	          <div>
	            <h2 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>解析进度</h2>
	            <p className="text-sm kiveiv-muted">{statusLabel}</p>
	          </div>
	          <button
	            type="button"
	            onClick={onClose}
            className="kiveiv-modal-close"
            aria-label="关闭解析进度"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

	        <div className="px-6 py-6">
	          <div className="space-y-4">
	            <div>
                <LinearProgress label="整体进度" sublabel={progressDisplay} value={progress} />
	              <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">{remainingLabel}</p>
	            </div>

	            {documents?.length > 0 && (
	              <div>
	                <h3 className="text-xs font-semibold uppercase tracking-wide kiveiv-subtle">当前任务</h3>
	                <ul className="mt-3 space-y-2 text-sm kiveiv-muted">
	                  {documents.map((doc) => (
	                    <li key={doc.id} className="flex items-center justify-between rounded-md px-3 py-2" style={{ background: 'var(--kiveiv-surface-muted)' }}>
	                      <span className="truncate pr-4" title={doc.name}>{doc.name}</span>
	                      <span className="text-xs kiveiv-subtle">{doc.id}</span>
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

function AlertModal({ title, description, onClose, onConfirm, confirmLabel = '返回重新配置' }) {
  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-sm">
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--kiveiv-accent-soft)', color: 'var(--kiveiv-accent)' }}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M12 5.25a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
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
              onClick={onClose}
              className="kiveiv-btn-secondary"
            >
              知道了
            </button>
            {onConfirm && (
              <button
                type="button"
                onClick={onConfirm}
                className="kiveiv-btn-primary"
              >
                {confirmLabel}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ConfirmReparseModal({ title, description, onCancel, onConfirm }) {
  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-sm">
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--kiveiv-surface-muted)', color: 'var(--kiveiv-text)' }}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              取消
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="kiveiv-btn-primary"
            >
              重新解析
            </button>
          </div>
        </div>
      </div>
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

function ModeCard({ title, description, accent, badge, icon, actionLabel = '敬请期待', onAction, disabled = false }) {
  const badgeClass = badge === '推荐' ? 'kiveiv-chip kiveiv-chip-accent' : 'kiveiv-chip'
  const blobClass = accent ? 'bg-blue-50' : 'bg-gray-50'

  return (
    <div
      className={`bento-tile group relative overflow-hidden transition-transform ${
        disabled ? 'opacity-60' : 'hover:-translate-y-1'
      }`}
    >
      <div className="bento-tile-inner relative flex h-full flex-col justify-between p-8">
        <div className="absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-gradient-to-b from-white via-white to-transparent opacity-70 transition-transform duration-500 group-hover:-translate-y-2" />
        <div className="flex items-start gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: 'var(--kiveiv-surface-muted)', color: 'var(--kiveiv-text)' }}>
            {icon}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h3>
              <span className={badgeClass}>{badge}</span>
            </div>
            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">{description}</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => !disabled && onAction?.()}
          disabled={disabled}
          className={`mt-8 kiveiv-btn-primary ${disabled ? 'kiveiv-btn-disabled' : ''}`}
        >
          {actionLabel}
        </button>
      </div>
      <div className={`pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full ${blobClass} opacity-70`} />
      <div className={`pointer-events-none absolute -bottom-16 -left-10 h-40 w-40 rounded-full ${blobClass} opacity-50`} />
    </div>
  )
}

function StandardMode({ onBack, documents, onOpenModal, activeModal, onCloseModal, models, onNavigateSettings, onConfirmParse }) {
  const documentSummary = documents.length
    ? documents.length === 1
      ? `已选择 1 个文档：${documents[0].name}`
      : `已选择 ${documents.length} 个文档`
    : '未检测到可用文档'

	  return (
	    <div className="kiveiv-stack-module">
	      <header className="lg:flex lg:items-start lg:justify-between">
	        <div className="min-w-0 flex-1">
	          <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>Pineline 配置</h2>
	          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">{documentSummary}。请选择 Pineline 模型并确认配置。</p>
	        </div>
        <div className="mt-4 flex items-center gap-2 lg:mt-0 lg:ml-4">
          <button
            type="button"
            onClick={onBack}
            className="kiveiv-btn-secondary"
          >
            返回解析模式
          </button>
        </div>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <ModeCard
          title="Pineline"
          description="通过 Pineline 模型自动完成识别与抽取，适合大多数通用文档场景。"
          accent="emerald"
          badge="推荐"
          icon={<ParseIcon />}
          actionLabel="查看配置"
          onAction={() => onOpenModal('parse-engine')}
        />
      </section>

	      <section className="kiveiv-card p-6">
	        <h3 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>已选择文档</h3>
	        <ul className="mt-4 grid gap-2 md:grid-cols-2">
	          {documents.map((doc) => (
	            <li key={doc.id} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm kiveiv-muted" style={{ background: 'var(--kiveiv-surface-muted)' }}>
	              <span className="truncate pr-4" title={doc.name}>{doc.name}</span>
	              <span className="text-xs kiveiv-subtle">{doc.id}</span>
	            </li>
	          ))}
	        </ul>
	      </section>

      {activeModal && (
        <ConfigModal
          type={activeModal}
          onClose={onCloseModal}
          models={models}
          onNavigateSettings={onNavigateSettings}
          onConfirmParse={onConfirmParse}
        />
      )}
    </div>
  )
}

function ConfigModal({ type, onClose, models, onNavigateSettings, onConfirmParse }) {
  const title = 'Pineline 配置'
  const [query, setQuery] = useState('')
  const savedModels = useMemo(() => collectSavedModels(models, 'layout-model'), [models])
  const [selectedModel, setSelectedModel] = useState(savedModels[0] || '')

  useEffect(() => {
    if (!savedModels.length) {
      if (selectedModel) setSelectedModel('')
      return
    }
    if (!selectedModel || !savedModels.includes(selectedModel)) {
      setSelectedModel(savedModels[0])
    }
  }, [savedModels, selectedModel])

  const filteredModels = savedModels.filter((model) =>
    model.toLowerCase().includes(query.trim().toLowerCase())
  )
  const canConfirm = Boolean(selectedModel)

  const handleReconfigure = () => {
    onClose?.()
    onNavigateSettings?.('model-layout')
  }

  return (
    <OverlayDrawer
      open
      title="请确认模型配置信息"
      description={title}
      widthClassName="max-w-lg"
      onClose={onClose}
      footer={(
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={handleReconfigure}
            className="kiveiv-btn-secondary flex-1 justify-center sm:flex-none"
          >
            返回重新配置
          </button>
          <button
            type="button"
            onClick={() => {
              if (!canConfirm) return
              onConfirmParse?.({ mode: type, model: selectedModel })
            }}
            disabled={!canConfirm}
            className={`kiveiv-btn-primary flex-1 justify-center sm:flex-none ${canConfirm ? '' : 'kiveiv-btn-disabled'}`}
          >
            开始解析
          </button>
        </div>
      )}
    >
      {savedModels.length ? (
        <div className="space-y-4">
          <label className="block text-xs font-semibold kiveiv-subtle">
            搜索模型
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="输入模型名称筛选"
              className="kiveiv-input mt-2 w-full"
            />
          </label>
          <div
            className="max-h-44 space-y-2 overflow-y-auto rounded-lg border p-2"
            style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface-muted)' }}
          >
            {filteredModels.length ? (
              filteredModels.map((model) => (
                <button
                  key={model}
                  type="button"
                  onClick={() => setSelectedModel(model)}
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors ${
                    selectedModel === model
                      ? 'border-blue-200 bg-blue-50'
                      : 'border-transparent hover:border-blue-200 hover:bg-blue-50/60'
                  }`}
                  style={{ color: 'var(--kiveiv-text)' }}
                >
                  <span>{model}</span>
                  {selectedModel === model && (
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
          <div className="text-xs kiveiv-muted">
            当前选择：<span className="font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{selectedModel}</span>
          </div>
        </div>
      ) : (
        <div className="kiveiv-card border-dashed px-4 py-6 text-sm kiveiv-muted" style={{ background: 'var(--kiveiv-surface-muted)' }}>
          当前未配置可用的文档解析模型，请先返回重新配置。
        </div>
      )}
    </OverlayDrawer>
  )
}

function ParseIcon() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <span className="absolute inset-0 rounded-2xl bg-blue-50" />
      <span
        className="absolute h-12 w-12 animate-spin rounded-xl border-2 border-dashed"
        style={{ animationDuration: '6s', borderColor: 'var(--kiveiv-border-strong)' }}
      />
      <div className="relative grid h-8 w-8 grid-cols-2 gap-1">
        {[0, 1, 2, 3].map((index) => (
          <span key={index} className="rounded-md" style={{ background: 'var(--kiveiv-border)' }} />
        ))}
      </div>
    </div>
  )
}

function StandardIcon() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <span
        className="absolute inset-0 rounded-full border-2"
        style={{ borderColor: 'var(--kiveiv-border)', animation: 'spin 8s linear infinite' }}
      />
      <span
        className="absolute inset-2 rounded-full border-t-2 border-blue-600"
        style={{ animation: 'spin 4s linear infinite', borderTopColor: 'var(--kiveiv-accent)' }}
      />
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>
    </div>
  )
}

function AgentIcon() {
  return (
    <div className="relative flex h-14 w-14 items-center justify-center">
      <span className="absolute h-14 w-14 animate-ping rounded-full bg-blue-100 opacity-60" style={{ animationDuration: '3s' }} />
      <span className="absolute h-10 w-10 animate-pulse rounded-full bg-blue-50" style={{ animationDuration: '2.4s' }} />
      <div className="relative flex h-7 w-7 items-center justify-center rounded-full" style={{ background: 'var(--kiveiv-surface)', boxShadow: 'var(--kiveiv-shadow-soft)' }}>
        <svg className="h-4 w-4 kiveiv-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l3 1.8" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  )
}
