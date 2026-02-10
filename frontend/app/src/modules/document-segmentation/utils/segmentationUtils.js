export const formatDate = (date) => {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export const isSelectableStatus = (status) => status === 'not_processed' || status === 'error'

export const isVectorSelectableChunk = (status) => status !== -1 && status !== 2

export const truncateText = (text, limit = 120) => {
  if (!text) return ''
  if (text.length <= limit) return text
  return `${text.slice(0, limit)}...`
}

export const normalizeTagName = (value) => value.trim()

export const getNormalTags = (chunk) => {
  const tags = new Set([...(chunk.contentTags || []), chunk.userTag].filter(Boolean))
  return Array.from(tags)
}

export const getSystemTags = (chunk) => {
  return Array.from(new Set(chunk.systemTags || []))
}

export const buildInitialTagPool = (tagStats, chunksByDoc) => {
  const tags = new Set(tagStats.map((item) => item.tag))
  Object.values(chunksByDoc).forEach((chunks) => {
    chunks.forEach((chunk) => {
      ;(chunk.contentTags || []).forEach((tag) => tags.add(tag))
      if (chunk.userTag) tags.add(chunk.userTag)
    })
  })
  return Array.from(tags)
}

export const buildInitialSystemTagPool = (systemTags, chunksByDoc) => {
  const tagMap = new Map()
  systemTags.forEach((tag) => {
    tagMap.set(tag.name, { name: tag.name, description: tag.description })
  })
  Object.values(chunksByDoc).forEach((chunks) => {
    chunks.forEach((chunk) => {
      ;(chunk.systemTags || []).forEach((tag) => {
        if (!tagMap.has(tag)) {
          tagMap.set(tag, { name: tag, description: '系统标签' })
        }
      })
    })
  })
  return Array.from(tagMap.values())
}
