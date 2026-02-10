import { createContext, useContext, useMemo } from 'react'
import { useSegmentationState } from './hooks/useSegmentationState.js'
import { useSegmentationProgress } from './hooks/useSegmentationProgress.js'
import { useVectorizationProgress } from './hooks/useVectorizationProgress.js'

const SegmentationStateContext = createContext(null)

export function SegmentationStateProvider({ baseId, children }) {
  const state = useSegmentationState(baseId)

  const segProgressApi = useSegmentationProgress({
    documents: state.documents,
    setDocuments: state.setDocuments,
    chunksByDoc: state.chunksByDoc,
    segProgressState: [state.segProgress, state.setSegProgress],
    segProgressVisibleState: [state.segProgressVisible, state.setSegProgressVisible],
    segActiveDocsState: [state.segActiveDocs, state.setSegActiveDocs],
    segRunState: [state.segRun, state.setSegRun]
  })

  const vectorProgressApi = useVectorizationProgress({
    chunksByDoc: state.chunksByDoc,
    setChunksByDoc: state.setChunksByDoc,
    vectorProgressState: [state.vectorProgress, state.setVectorProgress],
    vectorProgressVisibleState: [state.vectorProgressVisible, state.setVectorProgressVisible],
    vectorActiveState: [state.vectorActive, state.setVectorActive],
    vectorActiveDocIdState: [state.vectorActiveDocId, state.setVectorActiveDocId],
    vectorActiveChunksState: [state.vectorActiveChunks, state.setVectorActiveChunks],
    vectorRunState: [state.vectorRun, state.setVectorRun]
  })

  const value = useMemo(() => ({
    ...state,
    ...segProgressApi,
    ...vectorProgressApi
  }), [state, segProgressApi, vectorProgressApi])

  return (
    <SegmentationStateContext.Provider value={value}>
      {children}
    </SegmentationStateContext.Provider>
  )
}

export function useSegmentationContext() {
  const context = useContext(SegmentationStateContext)
  if (!context) {
    throw new Error('useSegmentationContext 必须在 SegmentationStateProvider 中使用')
  }
  return context
}
