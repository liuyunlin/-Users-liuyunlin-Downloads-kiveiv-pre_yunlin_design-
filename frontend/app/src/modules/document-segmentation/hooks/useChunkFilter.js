import { useEffect, useState } from 'react'

export function useChunkFilter({
  currentDoc,
  currentChunks,
  setChunksByDoc,
  setDocuments,
  resultDocId,
  selectableIds
}) {
  const [chunkFilterMode, setChunkFilterMode] = useState(false)
  const [chunkSelections, setChunkSelections] = useState(new Set())
  const [deleteChunkConfirm, setDeleteChunkConfirm] = useState(false)

  useEffect(() => {
    setChunkFilterMode(false)
    setChunkSelections(new Set())
    setDeleteChunkConfirm(false)
  }, [resultDocId])

  const isSelectable = (chunkId) => {
    if (!Array.isArray(selectableIds)) return true
    return selectableIds.includes(chunkId)
  }

  const toggleChunkSelection = (chunkId) => {
    if (!isSelectable(chunkId)) return
    setChunkSelections((prev) => {
      const next = new Set(prev)
      if (next.has(chunkId)) next.delete(chunkId)
      else next.add(chunkId)
      return next
    })
  }

  const handleSelectAllChunks = () => {
    if (!currentChunks.length) return
    if (Array.isArray(selectableIds)) {
      const selectableSet = new Set(selectableIds)
      const selectableChunks = currentChunks.filter((chunk) => selectableSet.has(chunk.id))
      setChunkSelections(new Set(selectableChunks.map((chunk) => chunk.id)))
      return
    }
    setChunkSelections(new Set(currentChunks.map((chunk) => chunk.id)))
  }

  const handleClearChunkSelection = () => {
    setChunkSelections(new Set())
  }

  const handleDeleteSelectedChunks = () => {
    if (!currentDoc || !chunkSelections.size) return
    const selectedIds = new Set(chunkSelections)
    const remainingCount = currentChunks.filter((chunk) => !selectedIds.has(chunk.id)).length
    setChunksByDoc((prev) => {
      const next = { ...prev }
      const remaining = (next[currentDoc.id] || []).filter((chunk) => !selectedIds.has(chunk.id))
      next[currentDoc.id] = remaining
      return next
    })
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === currentDoc.id
          ? { ...doc, totalChunks: remainingCount }
          : doc
      )
    )
    setChunkSelections(new Set())
    setChunkFilterMode(false)
    setDeleteChunkConfirm(false)
  }

  const toggleChunkFilterMode = () => {
    setChunkFilterMode((prev) => {
      if (prev) {
        setChunkSelections(new Set())
      }
      return !prev
    })
  }

  return {
    chunkFilterMode,
    chunkSelections,
    deleteChunkConfirm,
    setDeleteChunkConfirm,
    toggleChunkSelection,
    handleSelectAllChunks,
    handleClearChunkSelection,
    handleDeleteSelectedChunks,
    toggleChunkFilterMode
  }
}
