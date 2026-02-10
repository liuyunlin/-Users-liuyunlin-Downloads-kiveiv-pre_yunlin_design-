import { useMemo, useState } from 'react'
import { useToolConfigStore } from './ToolConfigStore.jsx'
import { OverlayDrawer } from '../shared/components/OverlayDrawer.jsx'

const TOOL_TYPE_LABELS = {
  search: '外部搜索',
  graph: '图结构查询',
  structured: '结构化查询',
  document: '文档检索'
}

const DEFAULT_TOOL_CONFIG = {
  baseUrl: '',
  apiKey: '',
  timeout: '30s',
  remark: ''
}

export function ToolConfigPage() {
  const { tools, toggleTool, resetTools, addTool, deleteTool, updateToolConfig } = useToolConfigStore()
  const enabledCount = useMemo(() => tools.filter((tool) => tool.enabled).length, [tools])
  const [createOpen, setCreateOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [configTarget, setConfigTarget] = useState(null)
  const [nameError, setNameError] = useState('')
  const [form, setForm] = useState({
    name: '',
    type: 'search',
    enabled: true
  })
  const [configForm, setConfigForm] = useState(DEFAULT_TOOL_CONFIG)

  const handleCreate = () => {
    const name = form.name.trim()
    if (!name) return
    const exists = tools.some((tool) => tool.name?.trim().toLowerCase() === name.toLowerCase())
    if (exists) {
      setNameError('工具名称已存在，请换一个名称。')
      return
    }
    addTool({
      name,
      type: form.type,
      enabled: form.enabled
    })
    setForm({ name: '', type: 'search', enabled: true })
    setNameError('')
    setCreateOpen(false)
  }

  const openConfigModal = (tool) => {
    setConfigTarget(tool)
    setConfigForm({ ...DEFAULT_TOOL_CONFIG, ...(tool.config || {}) })
  }

  const handleSaveConfig = () => {
    if (!configTarget) return
    updateToolConfig(configTarget.id, configForm)
    setConfigTarget(null)
  }

  return (
    <section className="section-stack">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>工具配置</h2>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">控制智能问答可用的全局工具清单。</p>
        </div>
        <div className="flex items-center gap-2 text-xs kiveiv-muted">
          <span>已启用 {enabledCount} / {tools.length}</span>
          <button
            type="button"
            onClick={() => setCreateOpen(true)}
            className="kiveiv-btn-primary kiveiv-btn-sm"
          >
            新增工具
          </button>
          <button
            type="button"
            onClick={resetTools}
            className="kiveiv-btn-secondary kiveiv-btn-sm"
          >
            重置
          </button>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        {tools.map((tool) => (
          <div key={tool.id} className="bento-tile">
            <div className="bento-tile-inner p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{tool.name}</p>
                <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">{TOOL_TYPE_LABELS[tool.type] || tool.type}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => openConfigModal(tool)}
                  className="kiveiv-btn-secondary kiveiv-btn-sm"
                >
                  配置
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteTarget(tool)}
                  className="kiveiv-btn-danger kiveiv-btn-sm"
                >
                  删除
                </button>
	                <label className="flex items-center gap-2 text-xs kiveiv-muted">
	                  <span>{tool.enabled ? '已启用' : '已停用'}</span>
	                  <input
	                    type="checkbox"
	                    checked={tool.enabled}
	                    onChange={() => toggleTool(tool.id)}
	                    className="kiveiv-check"
	                  />
	                </label>
	              </div>
	            </div>
	            <div className="mt-4 kiveiv-banner text-[12px]">
	              该工具会出现在智能问答右侧配置中，可按会话选择启用。
            </div>
            </div>
          </div>
        ))}
        {!tools.length && (
          <div className="col-span-full kiveiv-card border-dashed px-6 py-12 text-center text-sm kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
            暂无可配置工具
          </div>
        )}
      </div>

      <OverlayDrawer
        open={createOpen}
        title="新增工具"
        description="在工具列表旁边完成创建，避免离开当前配置上下文。"
        widthClassName="max-w-md"
        onClose={() => setCreateOpen(false)}
        footer={(
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setCreateOpen(false)}
              className="kiveiv-btn-secondary"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleCreate}
              disabled={!form.name.trim()}
              className={`kiveiv-btn-primary${form.name.trim() ? '' : ' kiveiv-btn-disabled'}`}
            >
              创建
            </button>
          </div>
        )}
      >
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold kiveiv-subtle">工具名称</label>
            <input
              type="text"
              value={form.name}
              onChange={(event) => {
                setForm((prev) => ({ ...prev, name: event.target.value }))
                if (nameError) setNameError('')
              }}
              placeholder="请输入工具名称"
              className="kiveiv-input mt-2 w-full"
            />
            {nameError && <p className="kiveiv-gap-title-note text-xs text-red-500">{nameError}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold kiveiv-subtle">工具类型</label>
            <select
              value={form.type}
              onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
              className="kiveiv-select mt-2 w-full"
            >
              <option value="search">外部搜索</option>
              <option value="graph">图结构查询</option>
              <option value="structured">结构化查询</option>
              <option value="document">文档检索</option>
            </select>
          </div>
          <label className="flex items-center gap-2 text-sm kiveiv-muted">
            <input
              type="checkbox"
              checked={form.enabled}
              onChange={() => setForm((prev) => ({ ...prev, enabled: !prev.enabled }))}
              className="kiveiv-check"
            />
            创建后默认启用
          </label>
        </div>
      </OverlayDrawer>

	      {deleteTarget && (
	        <div className="kiveiv-backdrop">
	          <div className="kiveiv-modal max-w-md p-6">
	            <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>确认删除该工具吗？</h3>
	            <p className="kiveiv-gap-title-body text-sm kiveiv-muted">删除后不可恢复，工具将从全局配置中移除。</p>
	            <div className="mt-6 flex items-center justify-end gap-3">
	              <button
	                type="button"
	                onClick={() => setDeleteTarget(null)}
	                className="kiveiv-btn-secondary"
	              >
	                取消
	              </button>
	              <button
	                type="button"
	                onClick={() => {
	                  deleteTool(deleteTarget.id)
	                  setDeleteTarget(null)
	                }}
	                className="kiveiv-btn-danger"
	              >
	                确认删除
	              </button>
	            </div>
	          </div>
	        </div>
	      )}

      <OverlayDrawer
        open={Boolean(configTarget)}
        title={`配置工具${configTarget ? ` · ${configTarget.name}` : ''}`}
        description="边看列表边调整参数，降低配置过程中的来回切换。"
        widthClassName="max-w-md"
        onClose={() => setConfigTarget(null)}
        footer={(
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setConfigTarget(null)}
              className="kiveiv-btn-secondary"
            >
              取消
            </button>
            <button
              type="button"
              onClick={handleSaveConfig}
              className="kiveiv-btn-primary"
            >
              保存
            </button>
          </div>
        )}
      >
        <div className="space-y-4">
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
            <label className="text-xs font-semibold kiveiv-subtle">API Key</label>
            <input
              type="text"
              value={configForm.apiKey}
              onChange={(event) => setConfigForm((prev) => ({ ...prev, apiKey: event.target.value }))}
              placeholder="请输入 API Key"
              className="kiveiv-input mt-2 w-full"
            />
          </div>
          <div>
            <label className="text-xs font-semibold kiveiv-subtle">超时</label>
            <input
              type="text"
              value={configForm.timeout}
              onChange={(event) => setConfigForm((prev) => ({ ...prev, timeout: event.target.value }))}
              placeholder="30s"
              className="kiveiv-input mt-2 w-full"
            />
          </div>
          <div>
            <label className="text-xs font-semibold kiveiv-subtle">备注</label>
            <textarea
              value={configForm.remark}
              onChange={(event) => setConfigForm((prev) => ({ ...prev, remark: event.target.value }))}
              placeholder="填写工具用途或注意事项"
              rows={3}
              className="kiveiv-textarea mt-2 w-full"
            />
          </div>
        </div>
      </OverlayDrawer>
    </section>
  )
}
