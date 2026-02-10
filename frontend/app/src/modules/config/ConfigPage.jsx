import { useEffect, useState } from 'react'
import { SettingsPage } from '../settings/SettingsPage.jsx'
import { SETTINGS_TABS } from '../settings/constants.js'
import { ToolConfigPage } from './ToolConfigPage.jsx'

const CONFIG_TABS = [
  { id: 'profile', label: '个人资料' },
  { id: 'models', label: '模型配置' },
  { id: 'tools', label: '工具配置' }
]

export function ConfigPage({ initialSection, initialModelTab, onInitialTabConsumed, onExit }) {
  const [activeTab, setActiveTab] = useState('models')
  const modelTabs = SETTINGS_TABS.filter((tab) => tab.id !== 'profile-general')
  const [activeModelTab, setActiveModelTab] = useState(modelTabs[0]?.id ?? 'model-layout')
  const currentModelIndex = modelTabs.findIndex((tab) => tab.id === activeModelTab)
  const hasPrevModel = currentModelIndex > 0
  const hasNextModel = currentModelIndex >= 0 && currentModelIndex < modelTabs.length - 1

  useEffect(() => {
    if (!initialSection && !initialModelTab) return
    if (initialSection) {
      setActiveTab(initialSection)
    }
    if (initialModelTab) {
      if (initialModelTab === 'profile-general') {
        setActiveTab('profile')
      } else {
        setActiveTab('models')
        setActiveModelTab(initialModelTab)
      }
    }
    onInitialTabConsumed?.()
  }, [initialSection, initialModelTab, onInitialTabConsumed])

  return (
    <div className="section-stack h-full min-h-0 px-6 py-6 lg:px-8">
      <section className="kiveiv-card mb-6 p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>配置</h2>
            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">集中管理模型与工具能力，配置变更会影响后续会话。</p>
          </div>
          <div className="flex flex-wrap items-center justify-end gap-2">
            <nav className="flex flex-wrap gap-2 rounded-[var(--kiveiv-radius-inner)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-2" aria-label="配置页面导航">
              {CONFIG_TABS.map((tab) => {
                const isActive = tab.id === activeTab
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-[var(--kiveiv-accent)] text-white'
                        : 'bg-white text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-accent-soft)]'
                    }`}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </nav>
            <button
              type="button"
              onClick={() => onExit?.()}
              className="kiveiv-btn-secondary h-10 px-3 text-xs"
            >
              退出配置
            </button>
          </div>
        </div>
      </section>

      <div className="min-h-0 flex-1 overflow-y-auto pb-6 pr-1">
        {activeTab === 'profile' ? (
          <SettingsPage activeTab="profile-general" hideTabNav visibleTabIds={['profile-general']} />
        ) : activeTab === 'models' ? (
          <SettingsPage activeTab={activeModelTab} onTabChange={setActiveModelTab} visibleTabIds={modelTabs.map((tab) => tab.id)} />
        ) : (
          <ToolConfigPage />
        )}
      </div>

      <section className="kiveiv-card mt-4 flex flex-wrap items-center justify-between gap-2 p-3">
        <div className="text-xs kiveiv-muted">
          {activeTab === 'profile'
            ? '当前步骤：个人资料'
            : activeTab === 'models'
              ? `当前步骤：${modelTabs[currentModelIndex]?.name || '模型配置'}`
              : '当前步骤：工具配置'}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {activeTab === 'models' && hasPrevModel && (
            <button
              type="button"
              onClick={() => setActiveModelTab(modelTabs[currentModelIndex - 1].id)}
              className="kiveiv-btn-secondary h-9 px-3 text-xs"
            >
              上一步
            </button>
          )}
          {activeTab === 'models' && hasNextModel && (
            <button
              type="button"
              onClick={() => setActiveModelTab(modelTabs[currentModelIndex + 1].id)}
              className="kiveiv-btn-primary h-9 px-3 text-xs"
            >
              下一步
            </button>
          )}
          {activeTab === 'profile' && (
            <button
              type="button"
              onClick={() => setActiveTab('models')}
              className="kiveiv-btn-primary h-9 px-3 text-xs"
            >
              下一步：模型配置
            </button>
          )}
          {activeTab === 'models' && !hasNextModel && (
            <button
              type="button"
              onClick={() => setActiveTab('tools')}
              className="kiveiv-btn-primary h-9 px-3 text-xs"
            >
              下一步：工具配置
            </button>
          )}
          {activeTab === 'tools' && (
            <button
              type="button"
              onClick={() => onExit?.()}
              className="kiveiv-btn-primary h-9 px-3 text-xs"
            >
              完成并返回
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
