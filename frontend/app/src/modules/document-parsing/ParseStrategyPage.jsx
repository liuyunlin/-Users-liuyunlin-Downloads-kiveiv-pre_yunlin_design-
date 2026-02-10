import { useState } from 'react'
import { PARSE_STRATEGY_PANELS } from './parseStrategyPanels.js'
import { useSettingsStore } from '../settings/SettingsStore.jsx'

export function ParseStrategyPage() {
  const { models, updateDraft, saveModel, resetModel } = useSettingsStore()

  return (
    <div className="kiveiv-stack-section">
      <header>
        <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>解析策略</h2>
        <p className="kiveiv-gap-title-body text-sm kiveiv-muted">配置解析模型、预览生成与输出格式（Mock 数据）。</p>
      </header>

      {PARSE_STRATEGY_PANELS.map((panel) => {
        const state = models[panel.id] || { draft: panel.defaultValue || '', saved: panel.defaultValue || '' }
        const hasPendingChange = Boolean(state.draft) && state.draft !== state.saved
        const isDisabled = Boolean(panel.disabled)

        return (
          <section key={panel.id} className="kiveiv-card">
            <header className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4" style={{ borderColor: 'var(--kiveiv-border)' }}>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{panel.title}</h3>
                {panel.description && <p className="kiveiv-gap-title-note text-xs kiveiv-muted">{panel.description}</p>}
              </div>
              <button type="button" className="kiveiv-kbd-link text-sm">
                详情
              </button>
            </header>

            <div className="flex flex-col gap-4 px-5 py-5 lg:flex-row lg:items-center lg:justify-between">
              <Combobox
                placeholder="选择模型"
                options={panel.options}
                value={state.draft}
                disabled={isDisabled}
                onChange={(model) => updateDraft(panel.id, model)}
              />

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  className="kiveiv-btn-secondary"
                >
                  配置设置
                </button>
                <button
                  type="button"
                  onClick={() => resetModel(panel.id)}
                  disabled={isDisabled || (!state.draft && !state.saved)}
                  className={`kiveiv-btn-secondary ${state.draft || state.saved ? '' : 'cursor-not-allowed opacity-60'}`}
                >
                  删除
                </button>
                <button
                  type="button"
                  onClick={() => saveModel(panel.id)}
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
      })}
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
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
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
