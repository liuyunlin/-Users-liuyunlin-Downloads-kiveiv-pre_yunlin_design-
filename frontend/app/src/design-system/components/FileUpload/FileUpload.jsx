import { useState, useCallback, forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const FileUpload = forwardRef(({
  onFilesSelected,
  accept = '*',
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB
  maxFiles = 10,
  className,
  children,
  disabled = false,
  ...props
}, ref) => {
  const [isDragOver, setIsDragOver] = useState(false)
  const [files, setFiles] = useState([])

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }, [disabled])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    if (disabled) return

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFileSelection(droppedFiles)
  }, [disabled])

  const handleFileSelection = (selectedFiles) => {
    const validFiles = selectedFiles
      .filter(file => file.size <= maxSize)
      .slice(0, multiple ? maxFiles : 1)

    setFiles(prev => multiple ? [...prev, ...validFiles].slice(0, maxFiles) : validFiles)
    onFilesSelected?.(validFiles)
  }

  const handleInputChange = (e) => {
    const selectedFiles = Array.from(e.target.files || [])
    handleFileSelection(selectedFiles)
  }

  const removeFile = (index) => {
    setFiles(prev => {
      const newFiles = prev.filter((_, i) => i !== index)
      onFilesSelected?.(newFiles)
      return newFiles
    })
  }

  return (
    <div className={cn('w-full', className)} ref={ref} {...props}>
      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg p-6 transition-colors duration-200',
          isDragOver 
            ? 'border-blue-400 bg-blue-50 dark:border-blue-600 dark:bg-blue-950/20' 
            : 'border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
          'data-[disabled]:border-zinc-950/20 data-[disabled]:bg-zinc-950/5 data-[disabled]:text-zinc-950/50 dark:data-[disabled]:border-white/15 dark:data-[disabled]:bg-white/5'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        data-disabled={disabled ? true : undefined}
        data-hover={!disabled ? true : undefined}
      >
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer data-[disabled]:cursor-not-allowed"
          data-disabled={disabled ? true : undefined}
        />
        
        <div className="text-center">
          {children || (
            <>
              <svg
                className="mx-auto h-12 w-12 text-zinc-400 dark:text-zinc-500"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="mt-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300">
                    点击上传
                  </span>
                  {' '}或拖拽文件到此处
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  最大 {Math.round(maxSize / 1024 / 1024)}MB
                  {multiple && `, 最多 ${maxFiles} 个文件`}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <FileItem
              key={`${file.name}-${index}`}
              file={file}
              onRemove={() => removeFile(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
})

FileUpload.displayName = 'FileUpload'

function FileItem({ file, onRemove, progress }) {
  return (
    <div className="flex items-center justify-between p-3 bg-zinc-50 rounded-md dark:bg-zinc-800/50">
      <div className="flex items-center min-w-0 flex-1">
        <div className="flex-shrink-0">
          <svg className="w-5 h-5 text-zinc-400 dark:text-zinc-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 min-w-0 flex-1">
          <p className="text-sm font-medium text-zinc-950 truncate dark:text-white">
            {file.name}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {(file.size / 1024).toFixed(1)} KB
          </p>
        </div>
      </div>
      
      {progress !== undefined && (
        <div className="ml-4 flex-shrink-0">
          <div className="w-20 bg-zinc-200 rounded-full h-2 dark:bg-zinc-700">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 dark:bg-blue-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      <button
        type="button"
        onClick={onRemove}
        className="ml-4 flex-shrink-0 text-zinc-400 hover:text-zinc-500 dark:text-zinc-500 dark:hover:text-zinc-400 transition-colors"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  )
}