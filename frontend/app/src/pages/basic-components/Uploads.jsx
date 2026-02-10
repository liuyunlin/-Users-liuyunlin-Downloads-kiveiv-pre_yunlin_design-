import { useState } from 'react'

export function Uploads({ onNavigateToBasicComponents }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})

  const uploadVariants = {
    simpleDragAndDrop: {
      name: 'Simple drag & drop'
    },
    withUploadingList: {
      name: 'Drag & drop with file list'
    },
    cardEmptyState: {
      name: 'Card empty state'
    }
  }

  const classNames = (...classes) => classes.filter(Boolean).join(' ')

  const files = [
    { id: 1, name: 'Quarterly-report.pdf', size: '2.4 MB', status: 'Uploaded' },
    { id: 2, name: 'Customer-data.xlsx', size: '1.1 MB', status: 'Processing' }
  ]

  const generateReactCode = (variant) => {
    switch (variant) {
      case 'simpleDragAndDrop':
        return String.raw`export default function SimpleDragAndDrop() {
  return (
    <div className="flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
      <div className="text-center">
        <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v12" />
        </svg>
        <div className="mt-4 flex text-sm leading-6 text-gray-600">
          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
            <span>Upload a file</span>
            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
          </label>
          <p className="pl-1">or drag and drop</p>
        </div>
        <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
      </div>
    </div>
  )
}`

      case 'withUploadingList':
        return String.raw`const files = [
  { id: 1, name: 'Quarterly-report.pdf', size: '2.4 MB', status: 'Uploaded' },
  { id: 2, name: 'Customer-data.xlsx', size: '1.1 MB', status: 'Processing' }
]

export default function DragAndDropWithList() {
  return (
    <div className="space-y-6">
      <div className="flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
        <div className="text-center">
          <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v12" />
          </svg>
          <div className="mt-4 flex text-sm leading-6 text-gray-600">
            <label htmlFor="file-upload-list" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
              <span>Upload files</span>
              <input id="file-upload-list" name="file-upload-list" type="file" multiple className="sr-only" />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-500">Up to 10 files at a time</p>
        </div>
      </div>

      <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
        {files.map((file) => (
          <li key={file.id} className="flex items-center justify-between py-3 pl-4 pr-5 text-sm">
            <div className="flex w-0 flex-1 items-center">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-4.414-4.414A2 2 0 0011.586 3H4z" />
              </svg>
              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                <span className="truncate font-medium text-gray-900">{file.name}</span>
                <span className="flex-shrink-0 text-gray-400">{file.size}</span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0">
              <span className="text-sm text-gray-500">{file.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}`

      case 'cardEmptyState':
        return String.raw`export default function CardEmptyState() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="px-6 py-8 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75C3 8.784 3.784 8 4.75 8h14.5c.966 0 1.75.784 1.75 1.75v7.5A2.75 2.75 0 0118.25 20h-12.5A2.75 2.75 0 013 17.25v-7.5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.75V7.25A2.75 2.75 0 015.75 4.5h12.5A2.75 2.75 0 0121 7.25v1.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4 4-4-4" />
        </svg>
        <h3 className="mt-6 text-sm font-semibold text-gray-900">No files yet</h3>
        <p className="mt-2 text-sm text-gray-500">Get started by uploading your first asset. You can drag files here or choose from your device.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload files</button>
          <button className="text-sm font-semibold text-gray-900">Learn more</button>
        </div>
      </div>
    </div>
  )
}`

      default:
        return `// Upload example`
    }
  }

  const generateHTMLCode = (variant) => {
    switch (variant) {
      case 'simpleDragAndDrop':
        return `<div class="flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
  <div class="text-center">
    <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v12" />
    </svg>
    <div class="mt-4 flex text-sm leading-6 text-gray-600">
      <label for="file-upload" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
        <span>Upload a file</span>
        <input id="file-upload" name="file-upload" type="file" class="sr-only" />
      </label>
      <p class="pl-1">or drag and drop</p>
    </div>
    <p class="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
  </div>
</div>`

      case 'withUploadingList':
        return `<div class="space-y-6">
  <div class="flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
    <div class="text-center">
      <svg class="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v12" />
      </svg>
      <div class="mt-4 flex text-sm leading-6 text-gray-600">
        <label for="file-upload-list" class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
          <span>Upload files</span>
          <input id="file-upload-list" name="file-upload-list" type="file" multiple class="sr-only" />
        </label>
        <p class="pl-1">or drag and drop</p>
      </div>
      <p class="text-xs leading-5 text-gray-500">Up to 10 files at a time</p>
    </div>
  </div>

  <ul role="list" class="divide-y divide-gray-200 rounded-md border border-gray-200">
    <li class="flex items-center justify-between py-3 pl-4 pr-5 text-sm">
      <div class="flex w-0 flex-1 items-center">
        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-4.414-4.414A2 2 0 0011.586 3H4z" />
        </svg>
        <div class="ml-4 flex min-w-0 flex-1 gap-2">
          <span class="truncate font-medium text-gray-900">Quarterly-report.pdf</span>
          <span class="flex-shrink-0 text-gray-400">2.4 MB</span>
        </div>
      </div>
      <div class="ml-4 flex-shrink-0">
        <span class="text-sm text-gray-500">Uploaded</span>
      </div>
    </li>
    <li class="flex items-center justify-between py-3 pl-4 pr-5 text-sm">
      <div class="flex w-0 flex-1 items-center">
        <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-4.414-4.414A2 2 0 0011.586 3H4z" />
        </svg>
        <div class="ml-4 flex min-w-0 flex-1 gap-2">
          <span class="truncate font-medium text-gray-900">Customer-data.xlsx</span>
          <span class="flex-shrink-0 text-gray-400">1.1 MB</span>
        </div>
      </div>
      <div class="ml-4 flex-shrink-0">
        <span class="text-sm text-gray-500">Processing</span>
      </div>
    </li>
  </ul>
</div>`

      case 'cardEmptyState':
        return `<div class="rounded-lg border border-gray-200 bg-white">
  <div class="px-6 py-8 text-center">
    <svg class="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75C3 8.784 3.784 8 4.75 8h14.5c.966 0 1.75.784 1.75 1.75v7.5A2.75 2.75 0 0118.25 20h-12.5A2.75 2.75 0 013 17.25v-7.5z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.75V7.25A2.75 2.75 0 015.75 4.5h12.5A2.75 2.75 0 0121 7.25v1.5" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M16 12l-4 4-4-4" />
    </svg>
    <h3 class="mt-6 text-sm font-semibold text-gray-900">No files yet</h3>
    <p class="mt-2 text-sm text-gray-500">Get started by uploading your first asset. You can drag files here or choose from your device.</p>
    <div class="mt-6 flex items-center justify-center gap-3">
      <button class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload files</button>
      <button class="text-sm font-semibold text-gray-900">Learn more</button>
    </div>
  </div>
</div>`

      default:
        return '<div></div>'
    }
  }

  const renderUploadPreview = (variant) => {
    switch (variant) {
      case 'simpleDragAndDrop':
        return (
          <div className="flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
            <div className="text-center">
              <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v12" />
              </svg>
              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                <label htmlFor="file-upload-preview" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
                  <span>Upload a file</span>
                  <input id="file-upload-preview" name="file-upload-preview" type="file" className="sr-only" />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        )

      case 'withUploadingList':
        return (
          <div className="space-y-6">
            <div className="flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
              <div className="text-center">
                <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v12" />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label htmlFor="file-upload-preview-list" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2">
                    <span>Upload files</span>
                    <input id="file-upload-preview-list" name="file-upload-preview-list" type="file" multiple className="sr-only" />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-500">Up to 10 files at a time</p>
              </div>
            </div>
            <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
              {files.map((file) => (
                <li key={file.id} className="flex items-center justify-between py-3 pl-4 pr-5 text-sm">
                  <div className="flex w-0 flex-1 items-center">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9.414a2 2 0 00-.586-1.414l-4.414-4.414A2 2 0 0011.586 3H4z" />
                    </svg>
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium text-gray-900">{file.name}</span>
                      <span className="flex-shrink-0 text-gray-400">{file.size}</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span className="text-sm text-gray-500">{file.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )

      case 'cardEmptyState':
        return (
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="px-6 py-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75C3 8.784 3.784 8 4.75 8h14.5c.966 0 1.75.784 1.75 1.75v7.5A2.75 2.75 0 0118.25 20h-12.5A2.75 2.75 0 013 17.25v-7.5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.75V7.25A2.75 2.75 0 015.75 4.5h12.5A2.75 2.75 0 0121 7.25v1.5" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 12l-4 4-4-4" />
              </svg>
              <h3 className="mt-6 text-sm font-semibold text-gray-900">No files yet</h3>
              <p className="mt-2 text-sm text-gray-500">Get started by uploading your first asset. You can drag files here or choose from your device.</p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Upload files</button>
                <button className="text-sm font-semibold text-gray-900">Learn more</button>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div>
          <nav className="flex mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div>
                  <button
                    onClick={onNavigateToBasicComponents}
                    className="text-gray-400 hover:text-gray-500 transition-colors"
                  >
                    <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    <span className="sr-only">首页</span>
                  </button>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  <button
                    onClick={onNavigateToBasicComponents}
                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    基础组件
                  </button>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                  </svg>
                  <span className="ml-4 text-sm font-medium text-gray-900">上传组件</span>
                </div>
              </li>
            </ol>
          </nav>

          <div>
            {Object.entries(uploadVariants).map(([key, variant]) => (
              <div key={key} style={{ marginBottom: '56px' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                  <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>{variant.name}</h2>
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setActiveTabs((prev) => ({ ...prev, [key]: 'preview' }))}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        (activeTabs[key] || 'preview') === 'preview'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Preview 预览
                    </button>
                    <button
                      onClick={() => setActiveTabs((prev) => ({ ...prev, [key]: 'code' }))}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        (activeTabs[key] || 'preview') === 'code'
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      Code 代码
                    </button>
                  </div>
                </div>

                <div>
                  {(activeTabs[key] || 'preview') === 'preview' ? (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      {renderUploadPreview(key)}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">代码示例</h3>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setCodeTypes((prev) => ({ ...prev, [key]: 'react' }))}
                            className={`px-3 py-1 text-xs rounded-md transition-colors ${
                              (codeTypes[key] || 'react') === 'react'
                                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                            }`}
                          >
                            React
                          </button>
                          <button
                            onClick={() => setCodeTypes((prev) => ({ ...prev, [key]: 'html' }))}
                            className={`px-3 py-1 text-xs rounded-md transition-colors ${
                              (codeTypes[key] || 'react') === 'html'
                                ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                                : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                            }`}
                          >
                            HTML
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                        <pre className="text-sm text-gray-100">
                          <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}>
                            {(codeTypes[key] || 'react') === 'html' ? generateHTMLCode(key) : generateReactCode(key)}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
