const datasetCache = new Map()

async function fetchText(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`获取资源失败：${url} (${response.status})`)
  }
  return response.text()
}

async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`获取资源失败：${url} (${response.status})`)
  }
  return response.json()
}

function normaliseBasePath(basePath) {
  if (!basePath) return '/auto'
  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath
}

function createBlocksFromDataset(contentList = [], middle) {
  const pages = []
  const flatBlocks = []

  if (!middle?.pdf_info?.length) {
    return { pages, blocks: flatBlocks }
  }

  let globalIndex = 0

  middle.pdf_info.forEach((page, pageIndex) => {
    const pageSize = page.page_size || [612, 792]
    const paraBlocks = page.para_blocks || []

    const pageBlocks = paraBlocks.map((block, blockIndex) => {
      const content = contentList[globalIndex] || {}
      const id = content.block_id || `page-${pageIndex}-block-${blockIndex}`

      const enriched = {
        id,
        globalIndex,
        pageIndex,
        blockIndex,
        bbox: block.bbox || [0, 0, 0, 0],
        lines: block.lines || [],
        type: content.type || block.type || 'text',
        content,
        rawBlock: block
      }

      flatBlocks.push(enriched)
      globalIndex += 1
      return enriched
    })

    pages.push({
      pageIndex,
      size: {
        width: pageSize[0],
        height: pageSize[1]
      },
      blocks: pageBlocks
    })
  })

  return { pages, blocks: flatBlocks }
}

export async function loadDatasetFromFolder(options = {}) {
  const {
    basePath: rawBase,
    files = {}
  } = options

  const basePath = normaliseBasePath(rawBase)
  const fileMap = {
    middle: 'MinerU_middle.json',
    content: 'MinerU_content_list.json',
    markdown: 'MinerU.md',
    layoutPdf: 'MinerU_layout.pdf',
    spanPdf: 'MinerU_span.pdf',
    originPdf: 'MinerU_origin.pdf',
    ...files
  }

  const cacheKey = `${basePath}:${JSON.stringify(fileMap)}`
  if (datasetCache.has(cacheKey)) {
    return datasetCache.get(cacheKey)
  }

  const middleUrl = `${basePath}/${fileMap.middle}`
  const contentUrl = `${basePath}/${fileMap.content}`
  const markdownUrl = `${basePath}/${fileMap.markdown}`

  const [middle, contentList, markdown] = await Promise.all([
    fetchJson(middleUrl),
    fetchJson(contentUrl),
    fetchText(markdownUrl)
  ])

  const { pages, blocks } = createBlocksFromDataset(contentList, middle)

  const dataset = {
    basePath,
    files: fileMap,
    markdown,
    contentList,
    middle,
    pages,
    blocks,
    assets: {
      layoutPdf: `${basePath}/${fileMap.layoutPdf}`,
      spanPdf: `${basePath}/${fileMap.spanPdf}`,
      originPdf: `${basePath}/${fileMap.originPdf}`
    }
  }

  datasetCache.set(cacheKey, dataset)

  return dataset
}

export function clearDatasetCache() {
  datasetCache.clear()
}

