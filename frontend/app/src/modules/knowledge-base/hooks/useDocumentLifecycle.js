import { useMemo } from 'react'
import { useDocumentStore } from '../../document-parsing/documentStore.jsx'
import { useSegmentationContext } from '../../document-segmentation/SegmentationStateProvider.jsx'
import { useExtractionTasksContext } from '../../index-building/ExtractionTasksProvider.jsx'

const SEG_STATUS_LABELS = {
  not_processed: '未切分',
  processing: '切分中',
  processed: '已切分',
  vectorizing: '向量化中',
  vectorized: '已向量化',
  error: '切分失败'
}

const SEG_STATUS_STYLES = {
  not_processed: 'bg-gray-100 text-gray-500',
  processing: 'bg-amber-100 text-amber-700',
  processed: 'bg-gray-200 text-gray-900',
  vectorizing: 'bg-sky-100 text-sky-700',
  vectorized: 'bg-emerald-100 text-emerald-700',
  error: 'bg-red-100 text-red-700'
}

const INDEX_STATUS_LABELS = {
  not_built: '未构建',
  building: '构建中',
  completed: '已完成'
}

const INDEX_STATUS_STYLES = {
  not_built: 'bg-gray-100 text-gray-500',
  building: 'bg-indigo-100 text-indigo-700',
  completed: 'bg-gray-900 text-white'
}

const VECTOR_STATUS_LABELS = {
  not_processed: '未向量化',
  processing: '向量化中',
  processed: '已向量化'
}

const VECTOR_STATUS_STYLES = {
  not_processed: 'bg-gray-100 text-gray-500',
  processing: 'bg-sky-100 text-sky-700',
  processed: 'bg-emerald-100 text-emerald-700'
}

const toTimestamp = (value) => {
  if (!value) return 0
  const iso = typeof value === 'string' ? value.replace(' ', 'T') : value
  const parsed = Date.parse(iso)
  return Number.isNaN(parsed) ? 0 : parsed
}

export function useDocumentLifecycle(_baseId) {
  const { documents: parsedDocuments } = useDocumentStore()
  const { documents: segDocuments, segRun, vectorRun, chunksByDoc } = useSegmentationContext()
  const { tasks } = useExtractionTasksContext()

  const segDocMap = useMemo(
    () => new Map((segDocuments || []).map((doc) => [doc.id, doc])),
    [segDocuments]
  )

  const segRunningIds = useMemo(
    () => new Set(segRun?.docIds || []),
    [segRun]
  )

  const indexTasksByDoc = useMemo(() => {
    const map = new Map()
    tasks.forEach((task) => {
      const docIds = task.selection?.docIds || []
      if (!docIds.length) return
      docIds.forEach((docId) => {
        const list = map.get(docId) || []
        list.push(task)
        map.set(docId, list)
      })
    })
    return map
  }, [tasks])

  const documents = useMemo(() => {
    return (parsedDocuments || []).map((doc) => {
      const segDoc = segDocMap.get(doc.id)
      const chunkList = chunksByDoc?.[doc.id] || []
      const vectorizing = vectorRun?.docId === doc.id
      const vectorized = chunkList.some((chunk) => chunk.status === 2)
      let segStatusKey = 'not_processed'
      if (vectorizing) {
        segStatusKey = 'vectorizing'
      } else if (vectorized) {
        segStatusKey = 'vectorized'
      } else if (segDoc?.status === 'processed') {
        segStatusKey = 'processed'
      } else if (segRunningIds.has(doc.id) || segDoc?.status === 'processing') {
        segStatusKey = 'processing'
      } else if (segDoc?.status === 'error') {
        segStatusKey = 'error'
      }

      const docTasks = indexTasksByDoc.get(doc.id) || []
      const hasRunning = docTasks.some((task) => task.status === 'running' && task.progress < 100)
      const hasCompleted = docTasks.some((task) => task.status === 'completed')
      let indexStatusKey = 'not_built'
      if (hasRunning) indexStatusKey = 'building'
      else if (hasCompleted) indexStatusKey = 'completed'

      const latestTask = docTasks.reduce((latest, task) => {
        if (!latest) return task
        return toTimestamp(task.updatedAt || task.createdAt) > toTimestamp(latest.updatedAt || latest.createdAt)
          ? task
          : latest
      }, null)

      const vectorStatusKey = vectorizing ? 'processing' : (vectorized ? 'processed' : 'not_processed')

      return {
        ...doc,
        segStatusKey,
        segStatusLabel: SEG_STATUS_LABELS[segStatusKey],
        segStatusStyle: SEG_STATUS_STYLES[segStatusKey],
        indexStatusKey,
        indexStatusLabel: INDEX_STATUS_LABELS[indexStatusKey],
        indexStatusStyle: INDEX_STATUS_STYLES[indexStatusKey],
        indexTask: latestTask,
        vectorStatusKey,
        vectorStatusLabel: VECTOR_STATUS_LABELS[vectorStatusKey],
        vectorStatusStyle: VECTOR_STATUS_STYLES[vectorStatusKey]
      }
    })
  }, [parsedDocuments, segDocMap, segRunningIds, indexTasksByDoc, chunksByDoc, vectorRun])

  return {
    documents,
    segStatusLabels: SEG_STATUS_LABELS,
    segStatusStyles: SEG_STATUS_STYLES,
    indexStatusLabels: INDEX_STATUS_LABELS,
    indexStatusStyles: INDEX_STATUS_STYLES,
    vectorStatusLabels: VECTOR_STATUS_LABELS,
    vectorStatusStyles: VECTOR_STATUS_STYLES
  }
}
