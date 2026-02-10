import { useEffect, useMemo, useState } from 'react'
import { OverlayDrawer } from '../../shared/components/OverlayDrawer.jsx'

const FILE_GROUPS = [
  { id: 'pdf', label: 'PDF', exts: ['pdf'] },
  { id: 'docx', label: 'Word', exts: ['doc', 'docx'] },
  { id: 'ppt', label: 'PPT', exts: ['ppt', 'pptx'] },
  { id: 'md', label: 'Markdown / TXT', exts: ['md', 'txt'] },
  { id: 'excel', label: 'Excel', exts: ['xls', 'xlsx'] },
  { id: 'image', label: '图片', exts: ['jpg', 'jpeg', 'png'] }
]

const normalizeExt = (name = '') => {
  const ext = String(name).split('.').pop()?.toLowerCase()
  return ext || ''
}

export function SchemeConfirmDrawer({
  open,
  knowledgeBase,
  schemes,
  documents,
  onClose,
  onConfirm,
  onEditScheme,
  onCreateScheme,
  onNavigateLibrary
}) {
  const defaultSchemeId = knowledgeBase?.defaultSchemeId || 'SCH-DEFAULT'
  const [selection, setSelection] = useState(() => {
    const stored = knowledgeBase?.schemeSelectionByFileType || null
    return {
      pdf: stored?.pdf || defaultSchemeId,
      docx: stored?.docx || defaultSchemeId,
      ppt: stored?.ppt || defaultSchemeId,
      md: stored?.md || defaultSchemeId,
      excel: stored?.excel || defaultSchemeId,
      image: stored?.image || defaultSchemeId
    }
  })

  useEffect(() => {
    if (!open) return
    const stored = knowledgeBase?.schemeSelectionByFileType || null
    setSelection({
      pdf: stored?.pdf || defaultSchemeId,
      docx: stored?.docx || defaultSchemeId,
      ppt: stored?.ppt || defaultSchemeId,
      md: stored?.md || defaultSchemeId,
      excel: stored?.excel || defaultSchemeId,
      image: stored?.image || defaultSchemeId
    })
  }, [open, knowledgeBase?.id, knowledgeBase?.schemeSelectionByFileType, defaultSchemeId])

  const grouped = useMemo(() => {
    const buckets = Object.fromEntries(FILE_GROUPS.map((group) => [group.id, []]))
    ;(documents || []).forEach((doc) => {
      const ext = normalizeExt(doc?.name)
      const group = FILE_GROUPS.find((item) => item.exts.includes(ext))?.id || 'pdf'
      ;(buckets[group] ||= []).push(doc)
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

  const getParseSummary = (schemeId) => {
    const scheme = resolveScheme(schemeId)
    const parsing = scheme?.pipelines?.parsing || null
    if (!parsing) return '使用推荐默认值'
    const preset = parsing.preset || '默认'
    const provider = parsing.model?.provider || parsing.model?.name || '未配置'
    return `${preset} · ${provider}`
  }

  const getIndexSummary = (schemeId) => {
    const scheme = resolveScheme(schemeId)
    const index = scheme?.pipelines?.index || null
    if (!index) return '使用推荐默认值'
    const mode = index.mode || index.preset || '默认'
    const model = index.model?.name || index.model?.provider || '未配置'
    return `${mode} · ${model}`
  }

  const canStart = availableGroups.length > 0

  return (
    <OverlayDrawer
      open={open}
      title="方案中心：按文件类型配置 Pipeline"
      description="解析 / 切分 / 索引抽取将使用当前方案快照固化；方案后续更新仅影响新任务。"
      widthClassName="max-w-3xl"
      onClose={onClose}
      footer={(
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-[var(--kiveiv-text-subtle)]">提示：先确认方案再开始解析，后续各阶段沿用该方案。</div>
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
              确认并开始解析
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
                    onClick={() => onEditScheme?.({ schemeId, fileType: group.id })}
                    className="kiveiv-btn-secondary h-9 px-3 text-xs"
                  >
                    复制并调整
                  </button>
                  <button
                    type="button"
                    onClick={() => onNavigateLibrary?.({ fileType: group.id, schemeId })}
                    className="kiveiv-btn-secondary h-9 px-3 text-xs"
                  >
                    去资源库高级配置
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
                  <p className="font-semibold text-[var(--kiveiv-text)]">方案摘要</p>
                  <p className="mt-1 text-[var(--kiveiv-text-muted)]">解析：{getParseSummary(schemeId)}</p>
                  <p className="mt-1 text-[var(--kiveiv-text-muted)]">切分：{getSegSummary(schemeId, group.id)}</p>
                  <p className="mt-1 text-[var(--kiveiv-text-muted)]">索引：{getIndexSummary(schemeId)}</p>
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
