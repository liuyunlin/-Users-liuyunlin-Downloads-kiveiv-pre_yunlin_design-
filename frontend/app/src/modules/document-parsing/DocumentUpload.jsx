import { useRef, useState } from 'react'
import { useDocumentStore } from './documentStore.jsx'
import { LinearProgress } from '../shared/components/LinearProgress.jsx'
import { uploadDocument } from '../../services/documentApi.js'

const ACCEPTED_TYPES = ['pdf', 'ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx']
const MAX_SIZE = 200 * 1024 * 1024
const UPLOAD_DURATION = 20_000

export function DocumentUpload({ onTriggerSuccess, onTriggerFail, onStartParse }) {
  const { documents, setDocuments, uploadQueue, setUploadQueue } = useDocumentStore()
  const [isDragging, setIsDragging] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)
  const [duplicateInfo, setDuplicateInfo] = useState(null)
  const [queueWarning, setQueueWarning] = useState(null)

  const formatSize = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`

  const createDocumentRecord = (file, serverId) => ({
    id: serverId || `DOC-${Date.now()}`,
    name: file.name,
    type: file.name.split('.').pop()?.toUpperCase() || '未知',
    size: formatSize(file.size),
    charCount: Math.max(300, Math.round(file.size / 2.2)),
    status: '未解析',
    sourcePdf: '/assets/sample.pdf',
    mode: 'Pineline',
    enabled: true,
    uploadedAt: Date.now(),
    updatedAt: Date.now()
  })

  const startUploadSimulation = (file, options = {}) => {
    if (options.removeDocId) {
      setDocuments((prev) => prev.filter((doc) => doc.id !== options.removeDocId))
    }

    const taskId = `TASK-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`
    const task = {
      id: taskId,
      file,
      name: file.name,
      size: formatSize(file.size),
      progress: 0,
      status: '上传中',
      startedAt: Date.now()
    }

    setUploadQueue((prev) => [...prev, task])

    const finalizeUpload = async () => {
      setUploadQueue((prev) => prev.filter((item) => item.id !== taskId))
      try {
        const result = await uploadDocument(file, { generate_preview: true })
        if (!result?.success) {
          throw new Error(result?.message || 'Upload failed')
        }
        setDocuments((prev) => [...prev, createDocumentRecord(file, result.doc_id)])
        onTriggerSuccess?.()
      } catch (_error) {
        setErrorMessage('上传失败，请稍后重试。')
        onTriggerFail?.()
      }
    }

    const tick = () => {
      setUploadQueue((prev) => prev.map((item) => {
        if (item.id !== taskId) return item
        const elapsed = Date.now() - task.startedAt
        if (elapsed >= UPLOAD_DURATION) {
          return { ...item, progress: 100, status: '上传完成' }
        }
        const percent = Math.max(0, Math.min(99, Math.floor((elapsed / UPLOAD_DURATION) * 100)))
        return { ...item, progress: percent }
      }))

      const elapsed = Date.now() - task.startedAt
      if (elapsed >= UPLOAD_DURATION) {
        clearInterval(interval)
        finalizeUpload()
      }
    }

    const interval = setInterval(tick, 250)
  }

  const handleFiles = (fileList) => {
    if (!fileList.length) return
    const files = Array.from(fileList)
    let hasInvalid = false
    let firstDuplicate = null
    let firstQueueDup = null

    files.forEach((file) => {
      if (!validateFile(file)) {
        hasInvalid = true
        return
      }
      const existingDoc = documents.find((doc) => doc.name === file.name)
      if (existingDoc) {
        if (!firstDuplicate) firstDuplicate = { file, existingDoc }
        return
      }
      const inQueue = uploadQueue.find((task) => task.name === file.name)
      if (inQueue) {
        if (!firstQueueDup) firstQueueDup = { fileName: file.name }
        return
      }
      startUploadSimulation(file)
    })

    if (inputRef.current) {
      inputRef.current.value = ''
    }
    if (hasInvalid) {
      setErrorMessage('部分文件不符合要求，仅支持 200MB 以内的 PDF、DOCX、DOC、XLSX、XLS、PPT、PPTX 文件')
      onTriggerFail?.()
    } else {
      setErrorMessage('')
    }
    if (firstDuplicate) setDuplicateInfo(firstDuplicate)
    if (firstQueueDup) setQueueWarning(firstQueueDup)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (!isDragging) setIsDragging(true)
  }

  const handleDragLeave = (event) => {
    event.preventDefault()
    event.stopPropagation()
    if (isDragging) setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setIsDragging(false)
    handleFiles(Array.from(event.dataTransfer.files || []))
  }

  const handleFileChange = (event) => {
    handleFiles(Array.from(event.target.files || []))
  }

  const openFileDialog = () => {
    inputRef.current?.click()
  }

  const validateFile = (file) => {
    const ext = file.name.split('.').pop()?.toLowerCase()
    const isTypeValid = ext ? ACCEPTED_TYPES.includes(ext) : false
    const isSizeValid = file.size <= MAX_SIZE
    return isTypeValid && isSizeValid
  }

  return (
    <div className="section-stack">
      <section className="section-stack">
        <header>
          <h2 className="text-2xl font-semibold" style={{ color: 'var(--kiveiv-text)' }}>文档上传</h2>
          <p className="kiveiv-gap-title-body text-sm kiveiv-muted">支持拖拽或手动选择文件，单个文件大小建议不超过 200MB。</p>
        </header>

        <div
          role="button"
          tabIndex={0}
          onClick={openFileDialog}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              openFileDialog()
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`kiveiv-card flex cursor-pointer justify-center border-dashed px-6 py-10 transition-colors ${
            isDragging ? 'border-blue-300 bg-blue-50' : ''
          }`}
        >
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 kiveiv-subtle" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v12" />
            </svg>
            <div className="kiveiv-gap-paragraph text-sm kiveiv-muted">
              <p className="font-semibold" style={{ color: 'var(--kiveiv-text)' }}>点击选择文件 或拖拽到此处</p>
            </div>
            <p className="text-xs leading-5 kiveiv-subtle">支持 PDF、DOCX、DOC、XLSX、PPT、PPTX 格式</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            multiple
            onChange={handleFileChange}
            className="sr-only"
          />
        </div>
        {errorMessage && (
          <p className="text-xs text-red-600">{errorMessage}</p>
        )}
      </section>

      {uploadQueue.length > 0 && (
        <section className="section-stack">
          <h3 className="text-sm font-semibold" style={{ color: 'var(--kiveiv-text)' }}>上传进度</h3>
          <div className="space-y-3">
            {uploadQueue.map((task) => (
              <div key={task.id} className="kiveiv-card p-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 kiveiv-subtle" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-4.414-4.414A2 2 0 0011.586 3H4z" />
                      </svg>
                      <div>
                        <p className="font-medium" style={{ color: 'var(--kiveiv-text)' }}>{task.name}</p>
                        <p className="text-xs kiveiv-subtle">{task.size}</p>
                      </div>
                    </div>
                    <span className="text-xs font-medium kiveiv-subtle">{task.status} · {task.progress}%</span>
                  </div>
                  <LinearProgress value={task.progress} />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {duplicateInfo && (
        <DuplicateConfirmModal
          fileName={duplicateInfo.file.name}
          onCancel={() => {
            setDuplicateInfo(null)
          }}
          onConfirm={() => {
            const { file, existingDoc, queueTaskId } = duplicateInfo
            setDuplicateInfo(null)

            if (queueTaskId) {
              setUploadQueue((prev) => prev.filter((task) => task.id !== queueTaskId))
            }

            const removeDocId = existingDoc?.id
            startUploadSimulation(file, { removeDocId })
          }}
        />
      )}

      {queueWarning && (
        <DuplicateNoticeModal
          fileName={queueWarning.fileName}
          onClose={() => setQueueWarning(null)}
        />
      )}

      {documents.length > 0 && (
        <section className="kiveiv-card p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-[var(--kiveiv-text)]">
                已上传 {documents.length} 个文档
              </p>
              <p className="mt-1 text-xs text-[var(--kiveiv-text-subtle)]">
                {uploadQueue.length > 0 ? '上传完成后将自动进入解析' : '可继续上传，或直接进入解析'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={openFileDialog}
                className="kiveiv-btn-secondary h-9 px-3 text-xs"
              >
                继续上传
              </button>
              <button
                type="button"
                onClick={() => onStartParse?.()}
                disabled={uploadQueue.length > 0}
                className={`kiveiv-btn-primary h-9 px-3 text-xs ${uploadQueue.length > 0 ? 'kiveiv-btn-disabled' : ''}`}
              >
                开始解析
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

function DuplicateConfirmModal({ fileName, onCancel, onConfirm }) {
  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-sm">
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--kiveiv-accent-soft)', color: 'var(--kiveiv-accent)' }}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M12 5.25a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
              </svg>
            </span>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>检测到重复文档</h3>
              <p className="kiveiv-gap-title-body text-sm kiveiv-muted">已上传过“{fileName}”。是否删除旧文件并重新上传？</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="kiveiv-btn-secondary"
            >
              取消
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="kiveiv-btn-primary"
            >
              重新上传
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DuplicateNoticeModal({ fileName, onClose }) {
  return (
    <div className="kiveiv-backdrop">
      <div className="kiveiv-modal max-w-sm">
        <div className="px-6 py-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: 'var(--kiveiv-accent-soft)', color: 'var(--kiveiv-accent)' }}>
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 3h.01M12 5.25a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
              </svg>
            </span>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: 'var(--kiveiv-text)' }}>正在上传中</h3>
              <p className="kiveiv-gap-title-body text-sm kiveiv-muted">“{fileName}” 已在上传队列中，请不要重复上传。</p>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="kiveiv-btn-primary"
            >
              知道了
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
