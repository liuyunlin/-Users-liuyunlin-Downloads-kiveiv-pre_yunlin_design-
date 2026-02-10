import { useEffect, useState } from 'react'
import { DocumentStoreProvider } from './document-parsing/documentStore.jsx'
import { SettingsProvider } from './settings/SettingsStore.jsx'
import kiveivLogo from '../assets/kiveiv-mark-dark.png'
import { IntelligentQAPage } from './intelligent-qa/index.js'
import { KnowledgeBasePage, KnowledgeBaseProvider } from './knowledge-base/index.js'
import { useKnowledgeBaseStore } from './knowledge-base/KnowledgeBaseStore.jsx'
import { ToolConfigProvider } from './config/index.js'
import { SegmentationStateProvider } from './document-segmentation/SegmentationStateProvider.jsx'
import { ExtractionTasksProvider } from './index-building/ExtractionTasksProvider.jsx'
import { DashboardPage } from './dashboard/index.js'
import { KnowledgeOpsPage } from './knowledge-ops/index.js'
import { ResourceLibraryPage, SchemeProvider } from './resource-library/index.js'
import { OverlayDrawer } from './shared/components/OverlayDrawer.jsx'
import { SettingsPage } from './settings/SettingsPage.jsx'

const topSections = [
  { id: 'qa', name: '问答', icon: ChatIcon },
  { id: 'knowledge-base', name: '知识库', icon: KnowledgeIcon },
  { id: 'knowledge-ops', name: '知识运营', icon: OpsIcon },
  { id: 'dashboard', name: '仪表盘', icon: DashboardIcon },
  { id: 'resource-library', name: '资源库', icon: SettingsIcon }
]

export function ModulePage() {
  return (
    <SettingsProvider>
      <SchemeProvider>
      <KnowledgeBaseProvider>
        <DocumentStoreProvider>
          <ToolConfigProvider>
            <ModuleShell />
          </ToolConfigProvider>
        </DocumentStoreProvider>
      </KnowledgeBaseProvider>
      </SchemeProvider>
    </SettingsProvider>
  )
}

function ModuleShell() {
  const [activeSection, setActiveSection] = useState('knowledge-base')
  const [lastWorkbenchSection, setLastWorkbenchSection] = useState('knowledge-base')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [pendingOpsTab, setPendingOpsTab] = useState(null)
  const [hasUnreadNotice, setHasUnreadNotice] = useState(true)
  const [accountOpen, setAccountOpen] = useState(false)
  const { activeKnowledgeBaseId } = useKnowledgeBaseStore()
  const classNames = (...classes) => classes.filter(Boolean).join(' ')
  const activeSectionMeta = topSections.find((item) => item.id === activeSection)

  useEffect(() => {
    const syncSidebar = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true)
      }
    }
    syncSidebar()
    window.addEventListener('resize', syncSidebar)
    return () => window.removeEventListener('resize', syncSidebar)
  }, [])

  return (
    <>
      <SegmentationStateProvider baseId={activeKnowledgeBaseId}>
	        <ExtractionTasksProvider baseId={activeKnowledgeBaseId}>
		          <div className="relative min-h-dvh kiveiv-app">
		            <div className="kiveiv-workbench flex h-dvh overflow-hidden">
	              <aside className={`kiveiv-side-pane sidebar-shell ${sidebarCollapsed ? 'sidebar-shell-collapsed' : ''} flex-none`}>
	              <div className="sidebar-brand sidebar-brand-hover">
                <div className="sidebar-logo">
                  <img src={kiveivLogo} alt="Kiveiv" className="h-6 w-6 object-contain" />
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <p className="sidebar-title">kiveiv</p>
                    <p className="sidebar-subtitle">Workspace</p>
                  </div>
                )}
	                <button
	                  type="button"
	                  onClick={() => setSidebarCollapsed((prev) => !prev)}
	                  className="sidebar-toggle inline-flex h-8 w-8 items-center justify-center kiveiv-subtle hover:text-gray-900"
	                  title={sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'}
	                >
	                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
	                    <rect x="3.5" y="5.5" width="17" height="13" rx="3.5" />
	                    <path d="M9 6.75v10.5" />
	                  </svg>
	                </button>
	              </div>

	              <nav className={`sidebar-nav ${sidebarCollapsed ? 'sidebar-nav-collapsed' : 'sidebar-card'}`}>
                {topSections.map((section) => {
                  const isActive = activeSection === section.id
                  const Icon = section.icon
                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() => setActiveSection(section.id)}
                      className={classNames(
                        'sidebar-item',
                        isActive && 'sidebar-item-active'
                      )}
                      title={section.name}
                    >
                      <span className="sidebar-icon">
                        <Icon />
                      </span>
                      {!sidebarCollapsed && <span className="sidebar-item-label">{section.name}</span>}
                    </button>
                  )
	                })}
	              </nav>
                {!sidebarCollapsed && (
                  <div className="sidebar-footer-mini mt-auto">
                    <div className="flex min-w-0 items-center gap-2">
                      <div className="sidebar-avatar-mini">U</div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-[var(--kiveiv-text)]">当前账号</p>
                        <p className="truncate text-xs text-[var(--kiveiv-text-subtle)]">Workspace</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setHasUnreadNotice(false)
                        setAccountOpen(true)
                      }}
                      className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--kiveiv-border)] text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)]"
                      title="通知与个人设置"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.2-1.2a2 2 0 01-.58-1.42V10a6.2 6.2 0 00-4.8-6.03V3a1.4 1.4 0 10-2.8 0v.97A6.2 6.2 0 005.8 10v4.38c0 .53-.2 1.04-.58 1.42L4 17h5m6 0a3 3 0 11-6 0m6 0H9" />
                      </svg>
                      {hasUnreadNotice && <span className="kiveiv-dot-alert" aria-label="有新消息" />}
                    </button>
                  </div>
                )}
	            </aside>

            <main className="kiveiv-main-pane flex min-h-0 flex-1 flex-col bg-white">
              {activeSection !== 'qa' && (
                <header className="kiveiv-main-header">
                  <div className="kiveiv-main-header-inner">
                    <h2 className="kiveiv-main-header-title">{activeSectionMeta?.name || '工作台'}</h2>
                  </div>
                </header>
              )}
              <div className={`kiveiv-main-content-scroll ${activeSection === 'qa' ? 'kiveiv-main-content-scroll-locked' : ''} ${activeSection === 'knowledge-base' ? 'kb-main-scroll' : ''}`}>
                <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col">
                {activeSection === 'knowledge-base' ? (
                  <KnowledgeBasePage
                    onNavigateConfig={(tabId) => {
                      setLastWorkbenchSection('knowledge-base')
                      setActiveSection('resource-library')
                    }}
                    onNavigateOps={(tabId) => {
                      setLastWorkbenchSection('knowledge-base')
                      setPendingOpsTab(tabId || 'seg-tags')
                      setActiveSection('knowledge-ops')
                    }}
                  />
                ) : activeSection === 'qa' ? (
                    <IntelligentQAPage />
                  ) : activeSection === 'knowledge-ops' ? (
                    <KnowledgeOpsPage
                      initialTab={pendingOpsTab || 'seg-tags'}
                      onInitialTabConsumed={() => setPendingOpsTab(null)}
                      onNavigateConfig={(tabId) => {
                        setLastWorkbenchSection('knowledge-ops')
                        setActiveSection('resource-library')
                      }}
                    />
                  ) : activeSection === 'dashboard' ? (
                    <DashboardPage />
                  ) : (
                    <ResourceLibraryPage />
                  )}
                </div>
              </div>
	              {activeSection !== 'qa' && <footer className="kiveiv-main-footer" />}
	            </main>
	          </div>
	        </div>
	        </ExtractionTasksProvider>
	      </SegmentationStateProvider>
	      <AccountDrawer open={accountOpen} onClose={() => setAccountOpen(false)} />
	    </>
  )
}

function AccountDrawer({ open, onClose }) {
  return (
    <OverlayDrawer
      open={open}
      title="个人资料"
      description="账户信息与通知偏好仅对当前账号生效。"
      widthClassName="max-w-2xl"
      onClose={onClose}
    >
      <SettingsPage activeTab="profile-general" hideTabNav visibleTabIds={['profile-general']} />
    </OverlayDrawer>
  )
}

function KnowledgeIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h8M8 14h5M5 20l-1.5-4.5A8.5 8.5 0 0112 3.5a8.5 8.5 0 018.5 8.5v1.5a8.5 8.5 0 01-8.5 8.5H5z" />
    </svg>
  )
}

function DashboardIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 15v-4M12 15V8M16 15v-2" />
    </svg>
  )
}

function OpsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h7" />
      <circle cx="17" cy="12" r="3" />
      <circle cx="14" cy="18" r="2" />
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.33 4.32a1.7 1.7 0 013.34 0l.2 1.01a1.7 1.7 0 001.33 1.33l1 .2a1.7 1.7 0 010 3.34l-1 .2a1.7 1.7 0 00-1.33 1.33l-.2 1a1.7 1.7 0 01-3.34 0l-.2-1a1.7 1.7 0 00-1.33-1.33l-1-.2a1.7 1.7 0 010-3.34l1-.2a1.7 1.7 0 001.33-1.33l.2-1z" />
      <circle cx="12" cy="9.5" r="2.3" />
    </svg>
  )
}
