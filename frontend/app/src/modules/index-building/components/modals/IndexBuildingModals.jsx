import { LinearProgress } from '../../../shared/components/LinearProgress.jsx'

export function TaskProgressModal({ task, onClose }) {
  if (!task) return null
  const progressDisplay = `${task.progress || 0}%`
  const statusLabel = task.status === 'completed' ? '抽取完成' : '抽取中'
  const remainingLabel = task.status === 'completed' ? '任务已完成' : '进度更新中，请稍候。'

  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-lg">
        <div className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'var(--kiveiv-border)' }}>
          <div>
            <h2 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>抽取进度</h2>
            <p className="text-sm kiveiv-muted">{statusLabel}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="kiveiv-modal-close"
            aria-label="关闭进度弹窗"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="space-y-4">
            <div>
              <LinearProgress label="整体进度" sublabel={progressDisplay} value={task.progress || 0} />
              <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">{remainingLabel}</p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide kiveiv-subtle">当前任务</h3>
              <div className="mt-3 rounded-md px-3 py-3 text-sm kiveiv-muted" style={{ background: 'var(--kiveiv-surface-muted)' }}>
                <p className="font-semibold" style={{ color: 'var(--kiveiv-text)' }}>{task.name}</p>
                <p className="kiveiv-gap-title-note text-xs kiveiv-subtle">{task.id} · {task.docName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
