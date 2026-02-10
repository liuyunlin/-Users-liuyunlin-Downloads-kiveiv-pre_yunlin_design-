import { useMemo, useState } from 'react'
import { OverlayDrawer } from '../shared/components/OverlayDrawer.jsx'

const STRATEGY_OPTIONS = [
  { id: 'semantic', label: '语义边界切分（推荐）' },
  { id: 'structured', label: '结构化切分' }
]

const FILE_TYPE_LABELS = {
  pdf: 'PDF / 文档',
  excel: 'Excel'
}

const DEFAULT_TAG_TEXT = '推荐,均衡'

const normalizeNumber = (value, fallback) => {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

export function SchemeEditorDrawer({ open, scheme, mode = 'edit', onClose, onSave }) {
  const initialDraft = useMemo(() => {
    const base = scheme || {}
    return {
      ...base,
      name: base.name || (mode === 'create' ? '新方案' : '未命名方案'),
      description: base.description || '',
      tagsText: Array.isArray(base.tags) && base.tags.length ? base.tags.join(',') : (mode === 'create' ? DEFAULT_TAG_TEXT : ''),
      pipelines: base.pipelines || {},
      tools: Array.isArray(base.tools) ? base.tools : []
    }
  }, [scheme, mode])

  const [draft, setDraft] = useState(initialDraft)

  const segmentation = draft.pipelines?.segmentation || {}
  const byFileType = segmentation.byFileType || {}

  const updateSegConfig = (fileType, patch) => {
    setDraft((prev) => {
      const current = prev.pipelines?.segmentation?.byFileType?.[fileType] || {}
      return {
        ...prev,
        pipelines: {
          ...(prev.pipelines || {}),
          segmentation: {
            ...(prev.pipelines?.segmentation || {}),
            byFileType: {
              ...(prev.pipelines?.segmentation?.byFileType || {}),
              [fileType]: { ...current, ...patch }
            }
          }
        }
      }
    })
  }

  const canSave = Boolean(draft.name?.trim())

  return (
    <OverlayDrawer
      open={open}
      title={mode === 'create' ? '新建方案' : '编辑方案'}
      description="默认仅展示常用项；高级超参数可后续按需展开。"
      widthClassName="max-w-3xl"
      onClose={onClose}
      footer={(
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-[var(--kiveiv-text-subtle)]">保存后将对绑定该方案的知识库实时生效（仅影响后续新任务）。</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClose} className="kiveiv-btn-secondary">
              取消
            </button>
            <button
              type="button"
              onClick={() => {
                if (!canSave) return
                const tags = String(draft.tagsText || '')
                  .split(',')
                  .map((t) => t.trim())
                  .filter(Boolean)
                onSave?.({
                  ...draft,
                  tags,
                  tagsText: undefined
                })
              }}
              className={`kiveiv-btn-primary ${canSave ? '' : 'kiveiv-btn-disabled'}`}
              disabled={!canSave}
            >
              保存方案
            </button>
          </div>
        </div>
      )}
    >
      <div className="space-y-5">
        <section className="kiveiv-card p-4">
          <h4 className="text-sm font-semibold text-[var(--kiveiv-text)]">基础信息</h4>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <label className="kiveiv-form-row">
              <span className="text-xs font-semibold kiveiv-muted">方案名称</span>
              <input
                value={draft.name}
                onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                className="kiveiv-input mt-2 w-full"
                placeholder="例如：合同库-均衡"
              />
            </label>
            <label className="kiveiv-form-row">
              <span className="text-xs font-semibold kiveiv-muted">标签（逗号分隔）</span>
              <input
                value={draft.tagsText}
                onChange={(event) => setDraft((prev) => ({ ...prev, tagsText: event.target.value }))}
                className="kiveiv-input mt-2 w-full"
                placeholder="推荐,均衡"
              />
            </label>
            <label className="kiveiv-form-row md:col-span-2">
              <span className="text-xs font-semibold kiveiv-muted">方案说明</span>
              <textarea
                rows={3}
                value={draft.description}
                onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
                className="kiveiv-textarea mt-2 w-full"
                placeholder="描述这个方案适用的文件与场景"
              />
            </label>
          </div>
        </section>

        <section className="kiveiv-card p-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold text-[var(--kiveiv-text)]">切分配置（按文件类型）</h4>
              <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">上传后会按文件类型选择对应切分策略；未配置的类型将使用推荐默认值。</p>
            </div>
            <div className="rounded-[var(--kiveiv-radius-inner)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-3 py-2 text-xs kiveiv-muted">
              预设：{segmentation.preset || 'balanced'}
            </div>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            {['pdf', 'excel'].map((fileType) => {
              const config = byFileType[fileType] || {}
              return (
                <div key={fileType} className="rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-white p-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <h5 className="text-sm font-semibold text-[var(--kiveiv-text)]">{FILE_TYPE_LABELS[fileType]}</h5>
                      <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">推荐值已预设，非专家也可直接用。</p>
                    </div>
                    <select
                      value={config.strategyId || (fileType === 'excel' ? 'structured' : 'semantic')}
                      onChange={(event) => {
                        const nextId = event.target.value
                        const label = STRATEGY_OPTIONS.find((item) => item.id === nextId)?.label || nextId
                        updateSegConfig(fileType, { strategyId: nextId, strategyName: label })
                      }}
                      className="kiveiv-select h-9 w-full text-xs sm:w-auto sm:min-w-[220px] sm:shrink-0"
                    >
                      {STRATEGY_OPTIONS.map((item) => (
                        <option key={item.id} value={item.id}>{item.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    <FieldNumber
                      label="Chunk 长度"
                      value={config.chunkSize ?? (fileType === 'excel' ? 600 : 800)}
                      min={200}
                      max={4000}
                      onChange={(value) => updateSegConfig(fileType, { chunkSize: normalizeNumber(value, 800) })}
                    />
                    <FieldNumber
                      label="Overlap"
                      value={config.overlap ?? (fileType === 'excel' ? 0 : 120)}
                      min={0}
                      max={800}
                      onChange={(value) => updateSegConfig(fileType, { overlap: normalizeNumber(value, 120) })}
                    />
                    <FieldNumber
                      label="Min Tokens"
                      value={config.minTokens ?? (fileType === 'excel' ? 120 : 200)}
                      min={0}
                      max={2000}
                      onChange={(value) => updateSegConfig(fileType, { minTokens: normalizeNumber(value, 200) })}
                    />
                    <FieldNumber
                      label="Max Tokens"
                      value={config.maxTokens ?? (fileType === 'excel' ? 900 : 1200)}
                      min={200}
                      max={6000}
                      onChange={(value) => updateSegConfig(fileType, { maxTokens: normalizeNumber(value, 1200) })}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <details className="mt-4 rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-4 py-3">
            <summary className="cursor-pointer text-xs font-semibold kiveiv-muted">高级开关（可选）</summary>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {['pdf', 'excel'].map((fileType) => {
                const config = byFileType[fileType] || {}
                return (
                  <div key={fileType} className="rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] bg-white p-3">
                    <p className="text-xs font-semibold kiveiv-muted">{FILE_TYPE_LABELS[fileType]}</p>
                    <div className="mt-2 space-y-2 text-xs">
                      {[
                        { key: 'enableClean', label: '清洗噪声', fallback: true },
                        { key: 'enableMap', label: '结构映射', fallback: fileType !== 'excel' },
                        { key: 'enableTags', label: 'Tag 生成', fallback: true },
                        { key: 'enableValidation', label: '结果验证', fallback: true }
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between gap-3">
                          <span className="kiveiv-muted">{item.label}</span>
                          <input
                            type="checkbox"
                            checked={Boolean(config[item.key] ?? item.fallback)}
                            onChange={(event) => updateSegConfig(fileType, { [item.key]: event.target.checked })}
                            className="h-4 w-4 rounded border-[var(--kiveiv-border)]"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </details>
        </section>
      </div>
    </OverlayDrawer>
  )
}

function FieldNumber({ label, value, min, max, onChange }) {
  return (
    <label className="kiveiv-form-row">
      <span className="text-xs font-semibold kiveiv-muted">{label}</span>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
        className="kiveiv-input mt-2 w-full"
      />
    </label>
  )
}
