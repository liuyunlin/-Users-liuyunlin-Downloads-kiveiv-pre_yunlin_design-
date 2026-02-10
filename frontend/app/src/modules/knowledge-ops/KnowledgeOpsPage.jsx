import { useEffect, useMemo, useState } from 'react'
import { useKnowledgeBaseStore } from '../knowledge-base/KnowledgeBaseStore.jsx'
import { SegmentationPage } from '../document-segmentation/components/SegmentationPage.jsx'
import { SEGMENTATION_OPS_TABS } from '../document-segmentation/data/segmentationConstants.js'

export function KnowledgeOpsPage({ onSetMainHeaderContent, onNavigateConfig, initialTab = 'seg-tags', onInitialTabConsumed }) {
  const { activeKnowledgeBaseId, knowledgeBases, filesByBase, setActiveKnowledgeBaseId } = useKnowledgeBaseStore()
  const [activeOpsTab, setActiveOpsTab] = useState(initialTab)

  useEffect(() => {
    if (!initialTab) return
    setActiveOpsTab(initialTab)
    onInitialTabConsumed?.()
  }, [initialTab, onInitialTabConsumed])

  const activeKnowledgeBase = useMemo(
    () => knowledgeBases.find((base) => base.id === activeKnowledgeBaseId) || null,
    [knowledgeBases, activeKnowledgeBaseId]
  )

  useEffect(() => {
    if (!onSetMainHeaderContent) return undefined

    if (!activeKnowledgeBase) {
      onSetMainHeaderContent(
        <div className="flex w-full flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[var(--kiveiv-text)]">知识运营</p>
          </div>
          <p className="text-xs text-[var(--kiveiv-text-subtle)]">请选择一个工作空间继续</p>
        </div>
      )
      return () => onSetMainHeaderContent(null)
    }

    onSetMainHeaderContent(
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs uppercase tracking-wide text-[var(--kiveiv-text-subtle)]">知识运营</p>
          <p className="truncate text-base font-medium text-[var(--kiveiv-text)]">{activeKnowledgeBase.name}</p>
        </div>
        <button
          type="button"
          onClick={() => setActiveKnowledgeBaseId('')}
          className="kiveiv-btn-secondary h-10 px-3 text-xs"
        >
          返回知识库选择
        </button>
      </div>
    )

    return () => onSetMainHeaderContent(null)
  }, [onSetMainHeaderContent, activeKnowledgeBase, setActiveKnowledgeBaseId])

  if (!activeKnowledgeBase) {
    return (
      <div className="page-shell">
        <section className="kiveiv-card p-6">
          {knowledgeBases.length > 0 ? (
            <div className="kiveiv-bento-grid">
              {knowledgeBases.map((base) => {
                const files = filesByBase?.[base.id] || []
                const parsedCount = files.filter((file) => file.status === '已解析').length
                const parseMethod = base.parseMethod === 'qa' ? '问答对提取' : '分块存储'
                return (
                  <article key={base.id} className="kiveiv-bento-tile">
                    <header className="kiveiv-bento-tile-head">
                      <h3 className="text-base font-semibold text-[var(--kiveiv-text)]">{base.name}</h3>
                      <span className="kiveiv-chip">{base.typeLabel || '知识库'}</span>
                    </header>
                    <p className="kiveiv-bento-summary">{base.description || '暂无介绍'}</p>
                    <div className="kiveiv-bento-metrics">
                      <span className="kiveiv-chip">文档 {files.length}</span>
                      <span className="kiveiv-chip">已解析 {parsedCount}</span>
                      <span className="kiveiv-chip">{parseMethod}</span>
                    </div>
                    <footer className="kiveiv-bento-tile-foot">
                      <span className="text-xs text-[var(--kiveiv-text-subtle)]">更新于 {base.updatedAt || '未记录'}</span>
                      <button
                        type="button"
                        onClick={() => setActiveKnowledgeBaseId(base.id)}
                        className="kiveiv-btn-primary kiveiv-btn-sm"
                      >
                        进入知识库
                      </button>
                    </footer>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="kiveiv-bento-empty">
              <p className="text-sm text-[var(--kiveiv-text-muted)]">暂无可用知识库，请先在知识库页创建。</p>
              <button type="button" onClick={() => onNavigateConfig?.('model-layout')} className="kiveiv-btn-secondary kiveiv-btn-sm">
                前往配置
              </button>
            </div>
          )}
        </section>
      </div>
    )
  }

  return (
    <div className="flex min-h-0 flex-1">
      <div className="flex min-h-0 flex-1 flex-col page-shell">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {SEGMENTATION_OPS_TABS.map((tab) => {
            const active = activeOpsTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveOpsTab(tab.id)}
                className={`inline-flex h-9 items-center rounded-full border px-4 text-xs whitespace-nowrap transition ${
                  active ? 'border-blue-500 text-blue-600' : 'border-[var(--kiveiv-border)] text-[var(--kiveiv-text-muted)] hover:text-[var(--kiveiv-text)]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
        <SegmentationPage
          activeTab={activeOpsTab}
          onTabChange={setActiveOpsTab}
          onNavigateSettings={(tabId) => onNavigateConfig?.(tabId || 'model-chunk')}
          tabOptions={SEGMENTATION_OPS_TABS}
          showTabSelect={false}
          useInlineTagActions
        />
      </div>
    </div>
  )
}
