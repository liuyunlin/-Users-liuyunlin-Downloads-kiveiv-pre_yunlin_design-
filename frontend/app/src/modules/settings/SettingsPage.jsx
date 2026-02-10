import { useMemo, useState } from 'react'
import { PROFILE_DEFAULTS, SETTINGS_PANELS, SETTINGS_TABS } from './constants.js'
import { useSettingsStore } from './SettingsStore.jsx'

const DEFAULT_MODEL_CONFIG = {
  provider: 'OpenAI',
  baseUrl: '',
  sdk: ''
}

const MODEL_PROVIDERS = ['OpenAI', 'Azure OpenAI', 'AliCloud', 'Anthropic', 'Google', 'Tencent', 'Custom']
export function SettingsPage({ activeTab = SETTINGS_TABS[0].id, onTabChange = () => {}, visibleTabIds = null, hideTabNav = false }) {
  const {
    models,
    modelConfigs,
    updateDraft,
    saveModel,
    resetModel,
    initializeModel,
    updateModelConfig,
    profileDraft,
    profileSaved,
    profileUpdatedAt,
    updateProfileDraft,
    saveProfile,
    resetProfileDraft
  } = useSettingsStore()
  const [extraInstances, setExtraInstances] = useState({})
  const [configTarget, setConfigTarget] = useState(null)
  const [configForm, setConfigForm] = useState(DEFAULT_MODEL_CONFIG)
  const visibleTabs = useMemo(() => {
    if (!Array.isArray(visibleTabIds) || !visibleTabIds.length) return SETTINGS_TABS
    const allowed = new Set(visibleTabIds)
    return SETTINGS_TABS.filter((tab) => allowed.has(tab.id))
  }, [visibleTabIds])

  const profileChanged = useMemo(() => {
    return JSON.stringify(profileDraft || PROFILE_DEFAULTS) !== JSON.stringify(profileSaved || PROFILE_DEFAULTS)
  }, [profileDraft, profileSaved])

  const groupedTabs = useMemo(() => {
    return visibleTabs.reduce((acc, tab) => {
      if (!acc[tab.group]) acc[tab.group] = []
      acc[tab.group].push(tab)
      return acc
    }, {})
  }, [visibleTabs])
  const groupEntries = useMemo(() => Object.entries(groupedTabs), [groupedTabs])
  const hideGroupTitle = groupEntries.length <= 1
  const isProfileTab = activeTab === 'profile-general'

  const renderContent = () => {
    if (activeTab === 'profile-general') {
      return (
        <div className="kiveiv-stack-section">
          <section className="kiveiv-card p-5">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--kiveiv-text)]">账户设置</h3>
              <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">常用项优先展示，默认值已预设，减少不必要配置。</p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <FieldInput
                label="显示名称"
                value={profileDraft.displayName}
                onChange={(value) => updateProfileDraft({ displayName: value })}
                placeholder="请输入显示名称"
              />
              <FieldInput
                label="角色"
                value={profileDraft.role}
                onChange={(value) => updateProfileDraft({ role: value })}
                placeholder="例如：产品经理"
              />
              <FieldInput
                label="团队"
                value={profileDraft.team}
                onChange={(value) => updateProfileDraft({ team: value })}
                placeholder="例如：智能知识库团队"
              />
              <FieldInput
                label="邮箱"
                value={profileDraft.email}
                onChange={(value) => updateProfileDraft({ email: value })}
                placeholder="name@example.com"
              />
              <FieldInput
                label="手机号"
                value={profileDraft.phone}
                onChange={(value) => updateProfileDraft({ phone: value })}
                placeholder="+86 138-0000-0000"
              />
              <div>
                <label className="text-xs font-semibold kiveiv-subtle">语言与时区</label>
                <div className="mt-2 grid gap-2 grid-cols-2">
                  <select
                    value={profileDraft.locale}
                    onChange={(event) => updateProfileDraft({ locale: event.target.value })}
                    className="kiveiv-select w-full"
                  >
                    <option value="zh-CN">简体中文</option>
                    <option value="en-US">English</option>
                  </select>
                  <select
                    value={profileDraft.timezone}
                    onChange={(event) => updateProfileDraft({ timezone: event.target.value })}
                    className="kiveiv-select w-full"
                  >
                    <option value="Asia/Shanghai">Asia/Shanghai</option>
                    <option value="America/Los_Angeles">America/Los_Angeles</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="kiveiv-card p-5">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--kiveiv-text)]">通知设置</h3>
              <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">开关用于即时生效项，文案采用正向描述。</p>
            </div>
            <div className="space-y-2">
              <SwitchRow
                title="任务完成提醒"
                description="当解析/切分/索引完成时，显示右上角提醒。"
                checked={profileDraft.qaToast}
                onChange={(checked) => updateProfileDraft({ qaToast: checked })}
              />
              <SwitchRow
                title="桌面通知"
                description="后台任务完成时同步发送系统通知。"
                checked={profileDraft.desktopNotice}
                onChange={(checked) => updateProfileDraft({ desktopNotice: checked })}
              />
              <SwitchRow
                title="每日摘要"
                description="每天汇总关键任务进展并推送。"
                checked={profileDraft.digest}
                onChange={(checked) => updateProfileDraft({ digest: checked })}
              />
              <SwitchRow
                title="周报提醒"
                description="每周五提醒你补充周报材料。"
                checked={profileDraft.weeklyReport}
                onChange={(checked) => updateProfileDraft({ weeklyReport: checked })}
              />
            </div>
          </section>

          <details className="kiveiv-card p-5">
            <summary className="cursor-pointer text-sm font-semibold text-[var(--kiveiv-text)]">高级设置</summary>
            <p className="mt-2 text-xs text-[var(--kiveiv-text-muted)]">低频设置统一收纳，避免干扰主流程。</p>
            <div className="mt-3 space-y-2">
              <SwitchRow
                title="紧凑模式"
                description="减小卡片与列表间距，信息更密集。"
                checked={profileDraft.compactMode}
                onChange={(checked) => updateProfileDraft({ compactMode: checked })}
              />
              <SwitchRow
                title="自动保存草稿"
                description="编辑文档时自动保存到本地草稿。"
                checked={profileDraft.autoSaveDraft}
                onChange={(checked) => updateProfileDraft({ autoSaveDraft: checked })}
              />
              <SwitchRow
                title="答案展示引用"
                description="回答中默认展示来源编号。"
                checked={profileDraft.includeSourceInAnswer}
                onChange={(checked) => updateProfileDraft({ includeSourceInAnswer: checked })}
              />
              <SwitchRow
                title="专家模式"
                description="展示更多调试字段与任务细节。"
                checked={profileDraft.expertMode}
                onChange={(checked) => updateProfileDraft({ expertMode: checked })}
              />
            </div>
            <div className="mt-4 rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] p-3">
              <label className="text-xs font-semibold kiveiv-subtle">日志保留时长（天）</label>
              <input
                type="number"
                min={7}
                max={180}
                value={profileDraft.logRetentionDays}
                onChange={(event) => updateProfileDraft({ logRetentionDays: Number(event.target.value) || 30 })}
                className="kiveiv-input mt-2 w-full max-w-[220px]"
              />
            </div>
          </details>
          <section className="kiveiv-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[var(--kiveiv-text-subtle)]">
                {profileUpdatedAt ? `已保存 ${profileUpdatedAt}` : '尚未保存变更'}
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={resetProfileDraft}
                  disabled={!profileChanged}
                  className={`kiveiv-btn-secondary h-9 px-3 text-xs ${profileChanged ? '' : 'opacity-60 cursor-not-allowed'}`}
                >
                  撤销修改
                </button>
                <button
                  type="button"
                  onClick={saveProfile}
                  disabled={!profileChanged}
                  className={`kiveiv-btn-primary h-9 px-3 text-xs ${profileChanged ? '' : 'kiveiv-btn-disabled'}`}
                >
                  保存个人资料
                </button>
              </div>
            </div>
          </section>
        </div>
      )
    }

    const panels = SETTINGS_PANELS[activeTab] || []
    if (!panels.length) {
      return (
        <div className="kiveiv-card flex min-h-[260px] flex-col items-center justify-center border-dashed text-center" style={{ background: 'var(--kiveiv-surface-muted)' }}>
          <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>功能建设中</h3>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">该模块的配置仍在设计中，敬请期待。</p>
        </div>
      )
    }

    return (
      <div className="kiveiv-stack-section">
        {panels.map((panel) => {
          const extraCount = extraInstances[panel.id] || 0
          const instanceIds = Array.from({ length: extraCount + 1 }, (_, index) =>
            index === 0 ? panel.id : `${panel.id}__${index + 1}`
          )

          return instanceIds.map((instanceId, index) => {
            const state = models[instanceId] || { draft: panel.defaultValue || '', saved: panel.defaultValue || '' }
            const hasPendingChange = Boolean(state.draft) && state.draft !== state.saved
            const isDisabled = Boolean(panel.disabled)
            const title = index === 0 ? panel.title : `${panel.title}（配置 ${index + 1}）`

            return (
              <section key={instanceId} className="kiveiv-card">
                <header className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4" style={{ borderColor: 'var(--kiveiv-border)' }}>
                  <div>
                    <h2 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{title}</h2>
                    {panel.description && (
                      <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{panel.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {index === 0 && (
                      <button
                        type="button"
                        onClick={() => {
                          const current = extraInstances[panel.id] || 0
                          const nextId = `${panel.id}__${current + 2}`
                          initializeModel(nextId, panel.defaultValue || '')
                          setExtraInstances((prev) => ({
                            ...prev,
                            [panel.id]: current + 1
                          }))
                        }}
                        className="kiveiv-kbd-link text-sm"
                      >
                        新增
                      </button>
                    )}
                    <button type="button" className="kiveiv-kbd-link text-sm">
                      详情
                    </button>
                  </div>
                </header>

                <div className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
                  <Combobox
                    placeholder="选择模型"
                    options={panel.options}
                    value={state.draft}
                    disabled={isDisabled}
                    onChange={(model) => updateDraft(instanceId, model)}
                  />

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setConfigTarget({ id: instanceId, title })
                        setConfigForm({ ...DEFAULT_MODEL_CONFIG, ...(modelConfigs[instanceId] || {}) })
                      }}
                      className="kiveiv-btn-secondary"
                    >
                      配置设置
                    </button>
                    <button
                      type="button"
                      onClick={() => resetModel(instanceId)}
                      disabled={isDisabled || (!state.draft && !state.saved)}
                      className={`kiveiv-btn-danger ${state.draft || state.saved ? '' : 'opacity-60 cursor-not-allowed'}`}
                    >
                      删除
                    </button>
                    <button
                      type="button"
                      onClick={() => saveModel(instanceId)}
                      disabled={isDisabled || !hasPendingChange}
                      className={`kiveiv-btn-primary ${hasPendingChange ? '' : 'kiveiv-btn-disabled'}`}
                    >
                      保存
                    </button>
                  </div>
                </div>

                {panel.helper && (
                  <div className="border-t px-5 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
                    {panel.helper}
                  </div>
                )}
                <div className="border-t px-5 py-3 text-xs kiveiv-muted" style={{ borderColor: 'var(--kiveiv-border)' }}>
                  当前模型：<span className="font-medium" style={{ color: 'var(--kiveiv-text)' }}>{state.saved || '暂无'}</span>
                </div>
              </section>
            )
          })
        })}
      </div>
    )
  }

  return (
    <div className="section-stack">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{isProfileTab ? '个人资料与偏好' : '模型配置'}</h2>
            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">
              {isProfileTab
                ? '常用设置优先展示，不常用项收纳到高级设置，降低配置负担。'
                : '选择并保存模型后，文档解析与索引任务会使用已保存的配置。'}
            </p>
          </div>
        </div>
        {!hideTabNav && (
        <div className="flex flex-wrap items-end gap-4">
          {groupEntries.map(([groupName, items]) => (
            <div key={groupName} className="flex flex-col gap-2">
              {!hideGroupTitle && <div className="text-xs font-semibold kiveiv-subtle">{groupName}</div>}
              <nav className="kiveiv-tabs" aria-label={`${groupName} 选项`}>
                {items.map((tab) => {
                  const isActive = tab.id === activeTab
                  const isDisabled = Boolean(tab.disabled)
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        if (!isDisabled) onTabChange(tab.id)
                      }}
                      className={`kiveiv-tab ${isActive ? 'kiveiv-tab-active' : ''} ${isDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                      disabled={isDisabled}
                    >
                      {tab.name}
                    </button>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
        )}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto pb-6 pr-1">
        {renderContent()}
      </div>

      {configTarget && (
        <div className="kiveiv-backdrop">
          <div className="kiveiv-modal max-w-md p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>模型配置</h3>
              <button type="button" onClick={() => setConfigTarget(null)} className="kiveiv-modal-close" aria-label="关闭">
                ✕
              </button>
            </div>
            <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">{configTarget.title}</p>
            <div className="mt-5 space-y-4">
              <div>
                <label className="text-xs font-semibold kiveiv-subtle">服务商</label>
                <select
                  value={configForm.provider}
                  onChange={(event) => setConfigForm((prev) => ({ ...prev, provider: event.target.value }))}
                  className="kiveiv-select mt-2 w-full"
                >
                  {MODEL_PROVIDERS.map((provider) => (
                    <option key={provider} value={provider}>{provider}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold kiveiv-subtle">Base URL</label>
                <input
                  type="text"
                  value={configForm.baseUrl}
                  onChange={(event) => setConfigForm((prev) => ({ ...prev, baseUrl: event.target.value }))}
                  placeholder="https://api.example.com"
                  className="kiveiv-input mt-2 w-full"
                />
              </div>
              <div>
                <label className="text-xs font-semibold kiveiv-subtle">SDK</label>
                <input
                  type="text"
                  value={configForm.sdk}
                  onChange={(event) => setConfigForm((prev) => ({ ...prev, sdk: event.target.value }))}
                  placeholder="如：openai / azure-ai"
                  className="kiveiv-input mt-2 w-full"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfigTarget(null)}
                className="kiveiv-btn-secondary"
              >
                取消
              </button>
              <button
                type="button"
                onClick={() => {
                  updateModelConfig(configTarget.id, configForm)
                  setConfigTarget(null)
                }}
                className="kiveiv-btn-primary"
              >
                保存
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Combobox({ placeholder, options, value, onChange, disabled = false }) {
  const [open, setOpen] = useState(false)
  const selectedLabel = value || placeholder

  return (
    <div className="relative w-full max-w-sm">
      <button
        type="button"
        onClick={() => {
          if (!disabled) setOpen((prev) => !prev)
        }}
        disabled={disabled}
        className={`flex w-full items-center justify-between ${disabled ? 'cursor-not-allowed opacity-60' : ''} kiveiv-input`}
      >
        <span className={value ? '' : 'kiveiv-subtle'}>{selectedLabel}</span>
        <svg className={`h-4 w-4 kiveiv-subtle transition-transform ${open ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && !disabled && (
        <ul
          className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border"
          style={{ borderColor: 'var(--kiveiv-border)', background: 'var(--kiveiv-surface)', boxShadow: 'var(--kiveiv-shadow-soft)' }}
        >
          {options.map((model) => {
            const isActive = model === value
            return (
              <li key={model}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(model)
                    setOpen(false)
                  }}
                  className={`flex w-full items-center justify-between px-4 py-2 text-sm transition-colors ${
                    isActive ? 'bg-blue-50' : 'kiveiv-muted hover:bg-blue-50/60'
                  }`}
                  style={{ color: isActive ? 'var(--kiveiv-text)' : undefined }}
                >
                  <span>{model}</span>
                  {isActive && (
                    <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function FieldInput({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-xs font-semibold kiveiv-subtle">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="kiveiv-input mt-2 w-full"
      />
    </div>
  )
}

function SwitchRow({ title, description, checked, onChange }) {
  return (
    <label className="flex items-start justify-between gap-4 rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface)] px-3 py-2.5">
      <span className="min-w-0">
        <span className="block text-sm font-medium text-[var(--kiveiv-text)]">{title}</span>
        <span className="mt-0.5 block text-xs text-[var(--kiveiv-text-muted)]">{description}</span>
      </span>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault()
          onChange(!checked)
        }}
        className={`relative mt-0.5 inline-flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors ${
          checked
            ? 'border-[var(--kiveiv-accent)] bg-[var(--kiveiv-accent)]'
            : 'border-[var(--kiveiv-border-strong)] bg-[var(--kiveiv-surface-muted)]'
        }`}
        aria-pressed={checked}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  )
}
