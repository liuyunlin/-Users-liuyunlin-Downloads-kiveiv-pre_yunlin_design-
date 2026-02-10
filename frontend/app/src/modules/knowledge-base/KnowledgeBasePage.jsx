import { useState } from 'react'
import { KnowledgeBaseList } from './components/KnowledgeBaseList.jsx'
import { KnowledgeBaseWorkspace } from './components/KnowledgeBaseWorkspace.jsx'
import { useKnowledgeBaseStore } from './KnowledgeBaseStore.jsx'

export function KnowledgeBasePage({ onNavigateConfig, onNavigateOps }) {
  const [entrySourceByBaseId, setEntrySourceByBaseId] = useState({})
  const {
    knowledgeBases,
    filesByBase,
    activeKnowledgeBaseId,
    setActiveKnowledgeBaseId,
    createKnowledgeBase,
    deleteKnowledgeBases,
    updateKnowledgeBase,
    restoreKnowledgeBases
  } = useKnowledgeBaseStore()

  const activeKnowledgeBase = knowledgeBases.find((base) => base.id === activeKnowledgeBaseId) || null

  if (!activeKnowledgeBase) {
    return (
      <div className="page-shell">
        <KnowledgeBaseList
          bases={knowledgeBases}
          filesByBase={filesByBase}
          onCreate={(payload) => {
            const createdId = createKnowledgeBase(payload)
            if (createdId) {
              setEntrySourceByBaseId((prev) => ({ ...prev, [createdId]: 'new' }))
            }
          }}
          onDelete={(ids) => deleteKnowledgeBases(ids)}
          onRestore={(snapshot) => restoreKnowledgeBases(snapshot)}
          onUpdate={(id, payload) => updateKnowledgeBase(id, payload)}
          onOpen={(base) => {
            setEntrySourceByBaseId((prev) => ({ ...prev, [base.id]: 'existing' }))
            setActiveKnowledgeBaseId(base.id)
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1">
      <KnowledgeBaseWorkspace
        knowledgeBase={activeKnowledgeBase}
        entrySource={entrySourceByBaseId[activeKnowledgeBase.id] || 'existing'}
        onNavigateConfig={onNavigateConfig}
        onNavigateOps={onNavigateOps}
        onBack={() => setActiveKnowledgeBaseId('')}
      />
    </div>
  )
}
