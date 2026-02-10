export const collectSavedModels = (models, panelId) => {
  if (!models || !panelId) return []

  const baseId = panelId
  const prefix = `${panelId}__`
  const extraIds = Object.keys(models)
    .filter((key) => key.startsWith(prefix))
    .sort((a, b) => {
      const aIndex = Number(a.slice(prefix.length)) || 0
      const bIndex = Number(b.slice(prefix.length)) || 0
      return aIndex - bIndex
    })

  const orderedIds = [baseId, ...extraIds].filter((id) => id in models)
  const seen = new Set()

  return orderedIds.reduce((acc, id) => {
    const saved = models[id]?.saved
    if (saved && !seen.has(saved)) {
      seen.add(saved)
      acc.push(saved)
    }
    return acc
  }, [])
}
