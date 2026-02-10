import { useEffect, useState } from 'react'
import { LayoutPreview } from './LayoutPreview.jsx'
import { loadDatasetFromFolder } from './datasetLoader.js'

export function DocumentViewer({ document, onBack }) {
  const docName = document?.name ?? '示例文档'
  const docId = document?.id ?? 'DOC-DEMO'
  const docSize = document?.size ?? '未知大小'
  const docType = document?.type ?? 'PDF'
  const datasetConfig = document?.dataset || null
  const fallbackPdf = document?.sourcePdf || '/assets/sample.pdf'

  const [datasetState, setDatasetState] = useState({ status: 'idle', dataset: null, error: null })

  useEffect(() => {
    let cancelled = false

    if (!datasetConfig) {
      setDatasetState((prev) =>
        prev.status === 'idle'
          ? { status: 'idle', dataset: null, error: null }
          : prev
      )
      return () => {
        cancelled = true
      }
    }

    async function loadDataset() {
      setDatasetState((prev) => ({ ...prev, status: 'loading', error: null }))
      try {
        const dataset = await loadDatasetFromFolder(datasetConfig)
        if (cancelled) return
        setDatasetState({ status: 'ready', dataset, error: null })
      } catch (error) {
        if (cancelled) return
        setDatasetState({ status: 'error', dataset: null, error })
      }
    }

    loadDataset()

    return () => {
      cancelled = true
    }
  }, [datasetConfig])

  const dataset = datasetState.dataset
  const datasetStatus = datasetState.status
  const datasetReady = datasetStatus === 'ready'
  const datasetLoading = datasetConfig ? datasetStatus === 'loading' || datasetStatus === 'idle' : false
  const datasetError = datasetStatus === 'error' ? datasetState.error : null

  return (
    <div className="kiveiv-stack-section">
      <header className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <button
            type="button"
            onClick={onBack}
            className="kiveiv-btn-secondary"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            返回文档列表
	          </button>
	          <div className="mt-4 space-y-1">
	            <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{docName}</h2>
	            <div className="text-sm kiveiv-muted">
	              <span className="mr-4">文档 ID：{docId}</span>
	              <span className="mr-4">文档类型：{docType}</span>
	              <span>文档大小：{docSize}</span>
	            </div>
	            <p className="text-xs kiveiv-subtle">
	              {datasetReady
	                ? '展示 MinerU 解析后的 Span PDF，支持分页浏览。'
	                : datasetLoading
	                  ? '正在载入解析数据…'
                  : datasetError
                    ? `载入解析数据失败：${datasetError.message}`
                    : '展示原始上传文档示例。'}
            </p>
          </div>
        </div>
      </header>

      <LayoutPreview
        pdfUrl={datasetReady ? dataset.assets.originPdf : fallbackPdf}
        pagesMeta={datasetReady ? dataset.pages : []}
        activeBlockId={null}
        showOverlays={false}
      />
    </div>
  )
}
