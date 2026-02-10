import { useEffect, useMemo, useRef, useState } from 'react'
import { LinearProgress } from './LinearProgress.jsx'

const MAX_SIZE_BYTES = 1 * 1024 * 1024
const ALLOWED_EXTS = new Set(['xls', 'xlsx'])

const formatBytes = (bytes) => {
  if (!Number.isFinite(bytes)) return '--'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const getExt = (fileName = '') => String(fileName).split('.').pop()?.toLowerCase() || ''

export function BatchImportModal({
  open,
  title = '批量导入',
  dataTypeOptions = [],
  rules = [
    '仅支持 xls / xlsx 文件',
    '文件大小不超过 1MB',
    '若后端校验失败，将返回错误报告'
  ],
  getTemplateUrl,
  onUploadFile,
  onConfirmImport,
  onClose
}) {
  const inputRef = useRef(null)
  const [dataType, setDataType] = useState('')
  const [dragging, setDragging] = useState(false)
  const [validationError, setValidationError] = useState('')
  const [phase, setPhase] = useState('idle') // idle | uploading | uploaded | upload_error | processing | process_error | done
  const [fileInfo, setFileInfo] = useState(null) // { file, uploadId }
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState(null) // success / error payload

  const templateDisabled = !dataType || typeof getTemplateUrl !== 'function'
  const templateHref = useMemo(() => {
    if (templateDisabled) return ''
    return String(getTemplateUrl(dataType) || '')
  }, [templateDisabled, getTemplateUrl, dataType])

  const confirmEnabled = phase === 'uploaded' && !!fileInfo?.uploadId && !!dataType
  const buttonsDisabled = phase === 'uploading' || phase === 'processing'

  useEffect(() => {
    if (!open) return
    setDataType('')
    setDragging(false)
    setValidationError('')
    setPhase('idle')
    setFileInfo(null)
    setProgress(0)
    setResult(null)
    if (inputRef.current) inputRef.current.value = ''
  }, [open])

  const validateFile = (file) => {
    if (!file) return '请选择文件'
    const ext = getExt(file.name)
    if (!ALLOWED_EXTS.has(ext)) return '文件格式不正确，仅支持 xls / xlsx'
    if (file.size > MAX_SIZE_BYTES) return '文件过大，请上传不超过 1MB 的文件'
    return ''
  }

  const resetToIdle = () => {
    setValidationError('')
    setPhase('idle')
    setFileInfo(null)
    setProgress(0)
    setResult(null)
    if (inputRef.current) inputRef.current.value = ''
  }

  const startUpload = async (file) => {
    const errorText = validateFile(file)
    if (errorText) {
      setValidationError(errorText)
      return
    }
    setValidationError('')
    setPhase('uploading')
    setFileInfo({ file, uploadId: '' })
    setProgress(0)
    setResult(null)

    const startedAt = Date.now()
    const duration = 1200
    const tick = window.setInterval(() => {
      const percent = Math.min(95, Math.round(((Date.now() - startedAt) / duration) * 100))
      setProgress(percent)
      if (percent >= 95) window.clearInterval(tick)
    }, 120)

    try {
      const uploadResult = typeof onUploadFile === 'function'
        ? await onUploadFile({ file, dataType })
        : await mockUpload({ file, dataType })
      window.clearInterval(tick)
      setProgress(100)
      if (!uploadResult?.success) {
        throw new Error(uploadResult?.message || 'Upload failed')
      }
      setFileInfo({ file, uploadId: uploadResult.uploadId || uploadResult.fileId || `UP-${Date.now()}` })
      setPhase('uploaded')
    } catch (_error) {
      window.clearInterval(tick)
      setPhase('upload_error')
      setResult({ message: '上传失败，请重试' })
    }
  }

  const confirmImport = async () => {
    if (!confirmEnabled) return
    setPhase('processing')
    setResult(null)
    try {
      const resp = typeof onConfirmImport === 'function'
        ? await onConfirmImport({ uploadId: fileInfo.uploadId, dataType })
        : await mockProcess({ uploadId: fileInfo.uploadId, dataType })
      if (!resp?.success) {
        setPhase('process_error')
        setResult(resp || { message: '导入失败，请检查数据格式' })
        return
      }
      setPhase('done')
      setResult(resp)
    } catch (_error) {
      setPhase('process_error')
      setResult({ message: '导入失败，请稍后重试' })
    }
  }

  if (!open) return null

  return (
    <div className="kiveiv-backdrop" role="dialog" aria-modal="true" aria-label={title}>
      <div className="kiveiv-modal max-w-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-[var(--kiveiv-border)] px-6 py-5">
          <div>
            <h3 className="text-lg font-semibold text-[var(--kiveiv-text)]">{title}</h3>
            <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">选择数据类别、下载模板并上传文件后即可开始导入。</p>
          </div>
          <button type="button" onClick={onClose} className="kiveiv-modal-close" aria-label="关闭">
            ✕
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="space-y-4">
            <section className="kiveiv-card p-4">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <label className="min-w-[240px] flex-1">
                  <span className="text-xs font-semibold kiveiv-muted">数据类别<span className="text-red-500"> *</span></span>
                  <select
                    value={dataType}
                    onChange={(event) => setDataType(event.target.value)}
                    className="kiveiv-select mt-2 h-10 w-full"
                    disabled={buttonsDisabled}
                  >
                    <option value="" disabled>请选择数据类别</option>
                    {(dataTypeOptions || []).map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className={`kiveiv-btn-secondary h-10 px-3 text-xs ${templateDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
                    onClick={() => {
                      if (templateDisabled) return
                      if (!templateHref) return
                      window.open(templateHref, '_blank', 'noopener,noreferrer')
                    }}
                    disabled={templateDisabled}
                    title={templateDisabled ? '请先选择数据类别' : '下载 Excel 模板'}
                  >
                    下载 Excel 模板
                  </button>
                </div>
              </div>
            </section>

            <section className="kiveiv-card p-4">
              <UploadZone
                dragging={dragging}
                phase={phase}
                fileInfo={fileInfo}
                progress={progress}
                errorMessage={validationError || result?.message}
                disabled={buttonsDisabled}
                onPick={() => inputRef.current?.click()}
                onDragState={setDragging}
                onDropFile={(file) => startUpload(file)}
                onReupload={resetToIdle}
              />
              <input
                ref={inputRef}
                type="file"
                accept=".xls,.xlsx"
                className="sr-only"
                onChange={(event) => {
                  const file = event.target.files?.[0]
                  if (!file) return
                  startUpload(file)
                }}
              />
            </section>

            <section className="kiveiv-card p-4">
              <h4 className="text-sm font-semibold text-[var(--kiveiv-text)]">导入规则</h4>
              <ul className="mt-2 space-y-1 text-xs text-[var(--kiveiv-text-muted)]">
                {(rules || []).map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[5px] inline-block h-1.5 w-1.5 rounded-full bg-[var(--kiveiv-accent)]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              {phase === 'process_error' && result?.details && (
                <div className="mt-3 rounded-[var(--kiveiv-radius-control)] border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                  <p className="font-semibold">错误报告</p>
                  <pre className="mt-2 whitespace-pre-wrap font-mono text-[11px] leading-5">{String(result.details)}</pre>
                </div>
              )}
              {phase === 'done' && (
                <div className="mt-3 rounded-[var(--kiveiv-radius-control)] border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                  导入已提交：{result?.summary || '处理成功'}
                </div>
              )}
            </section>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[var(--kiveiv-border)] px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className={`kiveiv-btn-secondary h-9 px-4 text-xs ${buttonsDisabled ? 'opacity-60 cursor-not-allowed' : ''}`}
            disabled={buttonsDisabled}
          >
            取消
          </button>
          <button
            type="button"
            onClick={confirmImport}
            className={`kiveiv-btn-primary h-9 px-4 text-xs ${confirmEnabled ? '' : 'kiveiv-btn-disabled'}`}
            disabled={!confirmEnabled || buttonsDisabled}
          >
            确认
          </button>
        </div>
      </div>
    </div>
  )
}

function UploadZone({ dragging, phase, fileInfo, progress, errorMessage, disabled, onPick, onDragState, onDropFile, onReupload }) {
  const showError = Boolean(errorMessage) && (phase === 'idle' || phase === 'upload_error' || phase === 'process_error')
  const hintText = phase === 'idle'
    ? '支持拖拽或点击上传，支持 xls xlsx，大小不超过 1MB'
    : phase === 'uploading'
      ? '文件上传中，请稍候…'
      : phase === 'uploaded'
        ? '上传成功，可点击确认开始导入'
        : phase === 'upload_error'
          ? '上传失败，请重新上传'
          : phase === 'processing'
            ? '正在提交导入任务…'
            : phase === 'done'
              ? '导入完成'
              : '发生错误，请重试'

  const statusIcon = (() => {
    if (phase === 'uploading' || phase === 'processing') return <Spinner />
    if (phase === 'uploaded' || phase === 'done') return <SuccessIcon />
    if (phase === 'upload_error' || phase === 'process_error') return <ErrorIcon />
    return <UploadIcon />
  })()

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          if (disabled) return
          if (phase === 'idle') onPick?.()
        }}
        onKeyDown={(event) => {
          if (event.key !== 'Enter' && event.key !== ' ') return
          event.preventDefault()
          if (disabled) return
          if (phase === 'idle') onPick?.()
        }}
        onDragOver={(event) => {
          if (disabled || phase !== 'idle') return
          event.preventDefault()
          onDragState?.(true)
        }}
        onDragLeave={(event) => {
          if (disabled || phase !== 'idle') return
          event.preventDefault()
          onDragState?.(false)
        }}
        onDrop={(event) => {
          if (disabled || phase !== 'idle') return
          event.preventDefault()
          onDragState?.(false)
          const file = event.dataTransfer.files?.[0]
          if (file) onDropFile?.(file)
        }}
        className={`flex min-h-[160px] flex-col items-center justify-center rounded-[var(--kiveiv-radius-control)] border border-dashed px-6 py-6 text-center transition-colors ${
          dragging ? 'border-blue-300 bg-blue-50' : 'border-[var(--kiveiv-border)] bg-[var(--kiveiv-surface-muted)]'
        } ${disabled ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <div className="flex flex-col items-center">
          <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--kiveiv-text-muted)] shadow-sm">
            {statusIcon}
          </div>
          <p className="text-sm font-semibold text-[var(--kiveiv-text)]">
            {fileInfo?.file?.name ? fileInfo.file.name : '拖拽文件到此处或点击上传'}
          </p>
          <p className="mt-1 text-xs text-[var(--kiveiv-text-muted)]">{hintText}</p>
          {fileInfo?.file?.size ? (
            <p className="mt-2 text-[11px] text-[var(--kiveiv-text-subtle)]">文件大小：{formatBytes(fileInfo.file.size)}</p>
          ) : null}
          {(phase === 'uploaded' || phase === 'upload_error' || phase === 'process_error' || phase === 'done') && (
            <button type="button" onClick={onReupload} className="mt-3 kiveiv-kbd-link text-xs">
              重新上传
            </button>
          )}
        </div>
        {(phase === 'uploading' || phase === 'processing') && (
          <div className="mt-4 w-full max-w-[520px]">
            <LinearProgress value={progress} />
          </div>
        )}
      </div>

      {showError && (
        <p className="mt-2 text-xs text-red-600">{errorMessage}</p>
      )}
    </div>
  )
}

function UploadIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v12" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.4" opacity="0.2" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

function SuccessIcon() {
  return (
    <svg className="h-5 w-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg className="h-5 w-5 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86h3.42L21 21H3L10.29 3.86z" />
    </svg>
  )
}

async function mockUpload() {
  await sleep(900)
  return { success: true, uploadId: `UP-${Date.now()}` }
}

async function mockProcess() {
  await sleep(800)
  return { success: true, summary: '已提交导入任务，可在任务中心查看进度' }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

