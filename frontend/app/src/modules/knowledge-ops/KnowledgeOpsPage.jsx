import { useEffect, useMemo, useState } from 'react'
import { useKnowledgeBaseStore } from '../knowledge-base/KnowledgeBaseStore.jsx'
import { SegmentationPage } from '../document-segmentation/components/SegmentationPage.jsx'
import { SEGMENTATION_OPS_TABS } from '../document-segmentation/data/segmentationConstants.js'

export function KnowledgeOpsPage({ onNavigateConfig, initialTab = 'seg-tags', onInitialTabConsumed }) {
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

  if (!activeKnowledgeBase) {
    return (
      <div className="page-shell">
        <section className="kiveiv-card p-6">
          <div className="kiveiv-bento-header">
            <div>
              <h2 className="text-2xl font-semibold text-[var(--kiveiv-text)]">知识运营</h2>
              <p className="kiveiv-gap-title-body text-sm kiveiv-muted">先进入知识库，再进行标签治理与语义检索。</p>
            </div>
            <p className="text-xs text-[var(--kiveiv-text-subtle)]">请选择一个工作空间继续</p>
          </div>
          {knowledgeBases.length > 0 ? (
            <div className="kiveiv-bento-grid mt-5">
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
            <div className="kiveiv-bento-empty mt-5">
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
        <div className="mb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-[var(--kiveiv-text-subtle)]">知识运营</p>
              <h2 className="text-2xl font-semibold text-[var(--kiveiv-text)]">{activeKnowledgeBase.name}</h2>
              <p className="kiveiv-gap-title-note text-xs kiveiv-muted">标签管理与语义搜索已与切分流程解耦，减少流程打断。</p>
            </div>
            <button
              type="button"
              onClick={() => setActiveKnowledgeBaseId('')}
              className="kiveiv-btn-secondary kiveiv-btn-sm"
            >
              返回知识库选择
            </button>
          </div>
        </div>
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
