export const formatDate = (date) => {
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export const createTaskId = () => {
  const now = new Date()
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  const rand = Math.floor(Math.random() * 90 + 10)
  return `ET-${stamp}-${rand}`
}

export const buildTaskName = (type, tags = [], source) => {
  const typeLabel = type === 'graph' ? '图结构抽取' : '结构化抽取'
  const sourceLabel = source === 'excel' ? 'Excel' : '切片'
  const tagLabel = tags.length ? tags.slice(0, 2).join('·') : '未命名'
  return `${tagLabel}${typeLabel}（${sourceLabel}）`
}
