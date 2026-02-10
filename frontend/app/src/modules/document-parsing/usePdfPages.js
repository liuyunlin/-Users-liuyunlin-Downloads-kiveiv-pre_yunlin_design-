import { useEffect, useState } from 'react'
const pageCache = new Map()
let pdfjsLoaderPromise

function loadPdfJsLibrary() {
  if (pdfjsLoaderPromise) return pdfjsLoaderPromise

  const workerSrc = new URL('pdfjs-dist/build/pdf.worker.mjs', import.meta.url).toString()

  pdfjsLoaderPromise = import('pdfjs-dist/build/pdf.mjs').then((module) => {
    const pdfjs = module || {}
    if (!pdfjs.GlobalWorkerOptions) {
      throw new Error('未能加载 pdf.js 模块')
    }
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc
    return pdfjs
  })

  return pdfjsLoaderPromise
}

export function usePdfPages(pdfUrl) {
  const [pages, setPages] = useState(() => pageCache.get(pdfUrl) || [])
  const [loading, setLoading] = useState(!pageCache.has(pdfUrl))
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!pdfUrl) {
      setPages([])
      setError(null)
      setLoading(false)
      return undefined
    }

    let cancelled = false

    async function loadPdf() {
      if (pageCache.has(pdfUrl)) {
        setPages(pageCache.get(pdfUrl))
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const pdfjs = await loadPdfJsLibrary()
        if (cancelled) return

        const loadingTask = pdfjs.getDocument(pdfUrl)
        const pdf = await loadingTask.promise

        const renderedPages = []
        const outputScale = Math.max(window.devicePixelRatio || 1, 2)

        for (let i = 1; i <= pdf.numPages; i += 1) {
          const page = await pdf.getPage(i)
          const viewport = page.getViewport({ scale: 1 })
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')

          const scaledWidth = Math.floor(viewport.width * outputScale)
          const scaledHeight = Math.floor(viewport.height * outputScale)

          canvas.width = scaledWidth
          canvas.height = scaledHeight
          canvas.style.width = `${viewport.width}px`
          canvas.style.height = `${viewport.height}px`

          context.setTransform(outputScale, 0, 0, outputScale, 0, 0)
          context.imageSmoothingEnabled = false

          await page.render({ canvasContext: context, viewport }).promise
          const dataUrl = canvas.toDataURL('image/png')

          renderedPages.push({
            pageIndex: i - 1,
            width: viewport.width,
            height: viewport.height,
            url: dataUrl
          })
        }

        if (!cancelled) {
          pageCache.set(pdfUrl, renderedPages)
          setPages(renderedPages)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadPdf()

    return () => {
      cancelled = true
    }
  }, [pdfUrl])

  return {
    pages,
    loading,
    error
  }
}
