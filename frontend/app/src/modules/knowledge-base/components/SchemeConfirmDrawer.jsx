import { useMemo, useState } from 'react'
import { OverlayDrawer } from '../../shared/components/OverlayDrawer.jsx'

const FILE_GROUPS = [
  { id: 'pdf', label: 'PDF / 文档', exts: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'md', 'txt'] },
  { id: 'excel', label: 'Excel', exts: ['xls', 'xlsx'] }
]

const normalizeExt = (name = '') => {
  const ext = String(name).split('.').pop()?.toLowerCase()
  return ext || ''
}

export function SchemeConfirmDrawer({ open, knowledgeBase, schemes, documents, onClose, onConfirm, onEditScheme, onCreateScheme }) {
  const defaultSchemeId = knowledgeBase?.defaultSchemeId || 'SCH-DEFAULT'
  const [selection, setSelection] = useState({ pdf: defaultSchemeId, excel: defaultSchemeId })

  const grouped = useMemo(() => {
    const buckets = { pdf: [], excel: [] }
    ;(documents || []).forEach((doc) => {
      const ext = normalizeExt(doc?.name)
      const group = FILE_GROUPS.find((item) => item.exts.includes(ext))?.id || 'pdf'
      buckets[group].push(doc)
    })
    return buckets
  }, [documents])

  const availableGroups = useMemo(() => FILE_GROUPS.filter((item) => (grouped[item.id] || []).length > 0), [grouped])

  const resolveScheme = (schemeId) => (schemes || []).find((scheme) => scheme.id === schemeId) || null

  const getSegSummary = (schemeId, groupId) => {
    const scheme = resolveScheme(schemeId)
    const config = scheme?.pipelines?.segmentation?.byFileType?.[groupId] || null
    if (!config) return '使用推荐默认值'
    const strategy = config.strategyName || config.strategyId || '切分'
    const size = config.chunkSize ? `${config.chunkSize}` : '-'
    const overlap = config.overlap ? `${config.overlap}` : '0'
    return `${strategy} · ${size} / overlap ${overlap}`
  }

  const canStart = availableGroups.length > 0

  return (
    <OverlayDrawer
      open={open}
      title="步骤 2 / 2：方案确认"
      description="按文件类型选择切分方案；默认使用知识库的默认方案。"
      widthClassName="max-w-3xl"
      onClose={onClose}
      footer={(
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[var(--kiveiv-text-subtle)]">
            说明：切分将使用当前方案快照固化（方案后续更新仅影响新任务）。
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={onClose} className="kiveiv-btn-secondary">
              返回继续上传
            </button>
            <button
              type="button"
              onClick={() => {
                if (!canStart) return
                onConfirm?.({ ...selection })
              }}
              disabled={!canStart}
              className={`kiveiv-btn-primary ${canStart ? '' : 'kiveiv-btn-disabled'}`}
            >
              开始切分
            </button>
          </div>
        </div>
      )}
    >
      <div className="space-y-4">
        {availableGroups.map((group) => {
          const docs = grouped[group.id] || []
          const schemeId = selection[group.id] || defaultSchemeId
          const scheme = resolveScheme(schemeId)
          return (
            <section key={group.id} className="kiveiv-card p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--kiveiv-text)]">{group.label}</h4>
                  <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">本次待处理 {docs.length} 个文件</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button type="button" onClick={() => onCreateScheme?.(group.id)} className="kiveiv-btn-secondary h-9 px-3 text-xs">
                    新建方案
                  </button>
                  <button
                    type="button"
                    onClick={() => onEditScheme?.(schemeId)}
                    className="kiveiv-btn-secondary h-9 px-3 text-xs"
                  >
                    编辑当前方案
                  </button>
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto]">
                <label className="kiveiv-form-row">
                  <span className="text-xs font-semibold kiveiv-muted">选择方案</span>
                  <select
                    value={schemeId}
                    onChange={(event) => setSelection((prev) => ({ ...prev, [group.id]: event.target.value }))}
                    className="kiveiv-select mt-2 w-full"
                  >
                    {(schemes || []).map((item) => (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                  </select>
                </label>
                <div className="rounded-[var(--kiveiv-radius-inner)] border border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)] px-3 py-3 text-xs">
                  <p className="font-semibold text-[var(--kiveiv-text)]">切分摘要</p>
                  <p className="mt-1 text-[var(--kiveiv-text-muted)]">{getSegSummary(schemeId, group.id)}</p>
                  <p className="mt-2 text-[11px] text-[var(--kiveiv-text-subtle)]">方案：{scheme?.id || schemeId}</p>
                </div>
              </div>
            </section>
          )
        })}
        {!availableGroups.length && (
          <div className="kiveiv-card border-dashed p-8 text-center text-sm kiveiv-subtle" style={{ background: 'var(--kiveiv-surface-muted)' }}>
            暂无已上传文件，请先完成上传后再进入方案确认。
          </div>
        )}
      </div>
    </OverlayDrawer>
  )
}

