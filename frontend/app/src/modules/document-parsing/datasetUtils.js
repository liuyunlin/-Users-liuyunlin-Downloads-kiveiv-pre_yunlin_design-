function escapeHtml(raw = '') {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function normaliseText(text = '') {
  return text.replace(/\r\n?/g, '\n')
}

function renderTextContent(content) {
  const { text = '', text_level: textLevel } = content
  const cleaned = normaliseText(text).trim()
  if (!cleaned) return ''

  if (textLevel) {
    const level = Math.min(Math.max(Number(textLevel) || 1, 1), 6)
    return `<h${level} class="dc-block-heading">${escapeHtml(cleaned)}</h${level}>`
  }

  const lines = cleaned.split(/\n{2,}/)
  return lines
    .map((line) => `<p>${escapeHtml(line).replace(/\n/g, '<br/>')}</p>`)
    .join('')
}

function renderTableContent(content, basePath) {
  const imageUrl = content.img_path ? `${basePath}/${content.img_path}` : null
  const caption = content.table_caption?.length ? content.table_caption.join(' ') : ''
  const footnote = content.table_footnote?.length ? content.table_footnote.join(' ') : ''
  const body = content.table_body || ''

  return `
    <figure class="dc-block-table">
      ${imageUrl ? `<img src="${imageUrl}" alt="表格截图" />` : ''}
      ${body}
      ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}
      ${footnote ? `<div class="dc-block-footnote">${escapeHtml(footnote)}</div>` : ''}
    </figure>
  `
}

function renderImageContent(content, basePath) {
  const imageUrl = content.img_path ? `${basePath}/${content.img_path}` : ''
  const caption = content.image_caption?.length ? content.image_caption.join(' ') : ''
  const footnote = content.image_footnote?.length ? content.image_footnote.join(' ') : ''

  return `
    <figure class="dc-block-image">
      ${imageUrl ? `<img src="${imageUrl}" alt="文档图片" />` : ''}
      ${caption ? `<figcaption>${escapeHtml(caption)}</figcaption>` : ''}
      ${footnote ? `<div class="dc-block-footnote">${escapeHtml(footnote)}</div>` : ''}
    </figure>
  `
}

export function blockToHtml(block, basePath = '') {
  if (!block) return ''
  const { id, content = {}, pageIndex } = block

  let innerHtml = ''

  switch (content.type) {
    case 'image':
      innerHtml = renderImageContent(content, basePath)
      break
    case 'table':
      innerHtml = renderTableContent(content, basePath)
      break
    case 'text':
    default:
      innerHtml = renderTextContent(content)
      break
  }

  return `
    <div class="dc-block" data-block-id="${id}" data-page-index="${pageIndex}">
      ${innerHtml}
    </div>
  `
}

export function blocksToHtml(blocks = [], basePath = '') {
  return blocks
    .map((block) => blockToHtml(block, basePath))
    .join('\n')
}

export function findBlockIdFromDom(node) {
  if (!node) return null
  let current = node
  while (current && current !== document.body) {
    if (current.dataset?.blockId) return current.dataset.blockId
    current = current.parentElement
  }
  return null
}
