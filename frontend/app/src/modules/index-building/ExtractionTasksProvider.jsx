import { createContext, useContext } from 'react'
import { useExtractionTasks } from './hooks/useExtractionTasks.js'

const ExtractionTasksContext = createContext(null)

export function ExtractionTasksProvider({ baseId, children }) {
  const value = useExtractionTasks(baseId)
  return (
    <ExtractionTasksContext.Provider value={value}>
      {children}
    </ExtractionTasksContext.Provider>
  )
}

export function useExtractionTasksContext() {
  const context = useContext(ExtractionTasksContext)
  if (!context) {
    throw new Error('useExtractionTasksContext 必须在 ExtractionTasksProvider 中使用')
  }
  return context
}
