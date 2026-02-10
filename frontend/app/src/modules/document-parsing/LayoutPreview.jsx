import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'
import { usePdfPages } from './usePdfPages.js'

const MIN_SCALE = 0.5
const MAX_SCALE = 2.5

export function LayoutPreview({
  pdfUrl,
  pagesMeta = [],
  activeBlockId,
  hoveredBlockId,
  pageIndex: controlledPageIndex,
  onPageChange,
  onBlockClick,
  onBlockHover,
  registerBlockRef,
  showOverlays = true
}) {
  const { pages: renderedPages, loading, error } = usePdfPages(pdfUrl)
  const [internalPageIndex, setInternalPageIndex] = useState(controlledPageIndex ?? 0)

  useEffect(() => {
    if (typeof controlledPageIndex === 'number') {
      setInternalPageIndex(controlledPageIndex)
    }
  }, [controlledPageIndex])
  const [scale, setScale] = useState(1)

  const pageIndex = controlledPageIndex ?? internalPageIndex

  const renderedPage = useMemo(
    () => renderedPages.find((page) => page.pageIndex === pageIndex),
    [renderedPages, pageIndex]
  )

  const totalPages = pagesMeta.length || renderedPages.length || 0

  const currentPageMeta = pagesMeta[pageIndex] || {
    size: {
      width: renderedPage?.width || 612,
      height: renderedPage?.height || 792
    },
    blocks: []
  }

  const displayWidth = currentPageMeta.size.width * scale
  const displayHeight = currentPageMeta.size.height * scale

  const handleZoom = (delta) => {
    setScale((prev) => {
      const next = Math.min(Math.max(prev + delta, MIN_SCALE), MAX_SCALE)
      return Number(next.toFixed(2))
    })
  }

  const goToPage = (index) => {
    if (index < 0 || index >= totalPages) return
    if (typeof controlledPageIndex === 'number') {
      onPageChange?.(index)
    } else {
      setInternalPageIndex(index)
      onPageChange?.(index)
    }
  }

  const handlePageChange = (nextIndex) => {
    goToPage(nextIndex)
  }

  const handlePrev = () => handlePageChange(pageIndex - 1)
  const handleNext = () => handlePageChange(pageIndex + 1)

  return (
	    <section className="flex h-full min-h-0 flex-col kiveiv-card">
	      <header className="flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 text-sm kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
	        <div className="flex items-center gap-2">
	          <button
	            type="button"
            onClick={handlePrev}
            className="kiveiv-btn-secondary kiveiv-btn-sm w-8 justify-center"
            disabled={pageIndex === 0}
          >
            ‹
          </button>
          <span>{totalPages ? pageIndex + 1 : 0} / {totalPages}</span>
          <button
            type="button"
            onClick={handleNext}
            className="kiveiv-btn-secondary kiveiv-btn-sm w-8 justify-center"
            disabled={pageIndex >= totalPages - 1}
          >
            ›
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleZoom(-0.1)}
            className="kiveiv-btn-secondary kiveiv-btn-sm w-8 justify-center"
          >
            −
          </button>
          <span>{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={() => handleZoom(0.1)}
            className="kiveiv-btn-secondary kiveiv-btn-sm w-8 justify-center"
          >
            ＋
          </button>
          <button
            type="button"
            onClick={() => setScale(1)}
            className="kiveiv-btn-secondary kiveiv-btn-sm"
          >
            重置
          </button>
        </div>
      </header>

      <div className="relative flex-1 overflow-auto px-4 py-6" style={{ background: 'var(--kiveiv-surface-muted)' }}>
        {error ? (
          <div className="flex h-full items-center justify-center text-sm text-red-600">
            无法加载 PDF：{error.message}
          </div>
        ) : null}

        {!error && (
          <div
            className="relative mx-auto"
            style={{
              width: `${displayWidth}px`,
              height: `${displayHeight}px`
            }}
          >
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center text-sm kiveiv-muted">
                正在加载页面…
              </div>
            )}

            {renderedPage ? (
              <img
                src={renderedPage.url}
                alt={`文档第 ${pageIndex + 1} 页`}
                className="h-full w-full rounded-2xl border"
                style={{ borderColor: 'var(--kiveiv-border)', boxShadow: 'var(--kiveiv-shadow-soft)' }}
                draggable={false}
              />
            ) : null}

            {showOverlays && (renderedPage ? currentPageMeta.blocks : []).map((block) => {
              const [x0, y0, x1, y1] = block.bbox || [0, 0, 0, 0]
              const style = {
                left: `${x0 * scale}px`,
                top: `${y0 * scale}px`,
                width: `${(x1 - x0) * scale}px`,
                height: `${(y1 - y0) * scale}px`
              }

              const isActive = block.id === activeBlockId
              const isHovered = block.id === hoveredBlockId

              return (
                <button
                  key={block.id}
                  type="button"
                  ref={(element) => registerBlockRef?.(block.id, element)}
                  style={style}
                  className={clsx(
                    'group absolute rounded-md border transition-colors focus:outline-none',
                    'focus-visible:ring-2 focus-visible:ring-blue-600',
                    isActive
                      ? 'border-blue-300 bg-blue-50/60'
                      : isHovered
                        ? 'border-blue-200 bg-blue-50/40'
                        : 'border-transparent hover:border-blue-200 hover:bg-blue-50/30'
                  )}
                  onMouseEnter={() => onBlockHover?.(block.id)}
                  onMouseLeave={() => onBlockHover?.(null)}
                  onClick={() => onBlockClick?.(block, pageIndex)}
                >
                  <span className="sr-only">跳转到对应内容</span>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
