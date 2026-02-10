import { useState } from 'react'

export function Alerts({ onNavigateToFeedback }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})

  const alertVariants = {
    banner: {
      name: 'Inline banner alert'
    },
    withActions: {
      name: 'Alert with actions'
    },
    withLinks: {
      name: 'Alert with links'
    }
  }

  const classNames = (...classes) => classes.filter(Boolean).join(' ')

  const generateReactCode = (variant) => {
    switch (variant) {
      case 'banner':
        return `export default function BannerAlert() {
  return (
    <div className="rounded-md bg-blue-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM9.25 6.75a.75.75 0 011.5 0v2.5a.75.75 0 01-1.5 0v-2.5zM10 12.5a.875.875 0 100-1.75.875.875 0 000 1.75z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">We updated our privacy policy</h3>
          <div className="mt-2 text-sm text-blue-700">
            <p>Make sure you know how these changes affect you.</p>
          </div>
        </div>
      </div>
    </div>
  )
}`

      case 'withActions':
        return `export default function AlertWithActions() {
  return (
    <div className="rounded-md border border-yellow-400 bg-yellow-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9.401 1.947a1.75 1.75 0 011.197 0c.262.112.49.304.649.552l7.287 11.24c.247.38.347.813.288 1.23a1.75 1.75 0 01-.69 1.145c-.31.223-.68.346-1.078.346H2.946c-.398 0-.768-.123-1.078-.346a1.75 1.75 0 01-.689-1.145 1.73 1.73 0 01.288-1.23l7.287-11.24c.16-.248.387-.44.649-.552zM10 6.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3A.75.75 0 0010 6.5zm0 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-yellow-800">You have pending security alerts that need attention.</p>
          <div className="mt-4 flex gap-3 md:mt-0 md:items-center">
            <button className="text-sm font-medium text-yellow-800 underline">Review alerts</button>
            <button className="text-sm font-medium text-yellow-800">Learn more →</button>
          </div>
        </div>
      </div>
    </div>
  )
}`

      case 'withLinks':
        return `export default function AlertWithLinks() {
  return (
    <div className="rounded-md border border-red-400 bg-red-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M9.401 1.947a1.75 1.75 0 011.197 0c.262.112.49.304.649.552l7.287 11.24c.247.38.347.813.288 1.23a1.75 1.75 0 01-.69 1.145c-.31.223-.68.346-1.078.346H2.946c-.398 0-.768-.123-1.078-.346a1.75 1.75 0 01-.689-1.145 1.73 1.73 0 01.288-1.23l7.287-11.24c.16-.248.387-.44.649-.552zM10 6.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3A.75.75 0 0010 6.5zm0 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Payment failed</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>Update your billing information to restore account functionality.</p>
          </div>
          <div className="mt-4">
            <a href="#" className="text-sm font-medium text-red-800 underline">Update payment method</a>
          </div>
        </div>
      </div>
    </div>
  )
}`

      default:
        return `// Alert example`
    }
  }

  const generateHTMLCode = (variant) => {
    switch (variant) {
      case 'banner':
        return `<div class="rounded-md bg-blue-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM9.25 6.75a.75.75 0 011.5 0v2.5a.75.75 0 01-1.5 0v-2.5zM10 12.5a.875.875 0 100-1.75.875.875 0 000 1.75z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-blue-800">We updated our privacy policy</h3>
      <div class="mt-2 text-sm text-blue-700">
        <p>Make sure you know how these changes affect you.</p>
      </div>
    </div>
  </div>
</div>`

      case 'withActions':
        return `<div class="rounded-md border border-yellow-400 bg-yellow-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M9.401 1.947a1.75 1.75 0 011.197 0c.262.112.49.304.649.552l7.287 11.24c.247.38.347.813.288 1.23a1.75 1.75 0 01-.69 1.145c-.31.223-.68.346-1.078.346H2.946c-.398 0-.768-.123-1.078-.346a1.75 1.75 0 01-.689-1.145 1.73 1.73 0 01.288-1.23l7.287-11.24c.16-.248.387-.44.649-.552zM10 6.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3A.75.75 0 0010 6.5zm0 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3 flex-1 md:flex md:justify-between">
      <p class="text-sm text-yellow-800">You have pending security alerts that need attention.</p>
      <div class="mt-4 flex gap-3 md:mt-0 md:items-center">
        <button class="text-sm font-medium text-yellow-800 underline">Review alerts</button>
        <button class="text-sm font-medium text-yellow-800">Learn more →</button>
      </div>
    </div>
  </div>
</div>`

      case 'withLinks':
        return `<div class="rounded-md border border-red-400 bg-red-50 p-4">
  <div class="flex">
    <div class="flex-shrink-0">
      <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M9.401 1.947a1.75 1.75 0 011.197 0c.262.112.49.304.649.552l7.287 11.24c.247.38.347.813.288 1.23a1.75 1.75 0 01-.69 1.145c-.31.223-.68.346-1.078.346H2.946c-.398 0-.768-.123-1.078-.346a1.75 1.75 0 01-.689-1.145 1.73 1.73 0 01.288-1.23l7.287-11.24c.16-.248.387-.44.649-.552zM10 6.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3A.75.75 0 0010 6.5zm0 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="ml-3">
      <h3 class="text-sm font-medium text-red-800">Payment failed</h3>
      <div class="mt-2 text-sm text-red-700">
        <p>Update your billing information to restore account functionality.</p>
      </div>
      <div class="mt-4">
        <a href="#" class="text-sm font-medium text-red-800 underline">Update payment method</a>
      </div>
    </div>
  </div>
</div>`

      default:
        return '<div></div>'
    }
  }

  const renderAlertPreview = (variant) => {
    switch (variant) {
      case 'banner':
        return (
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM9.25 6.75a.75.75 0 011.5 0v2.5a.75.75 0 01-1.5 0v-2.5zM10 12.5a.875.875 0 100-1.75.875.875 0 000 1.75z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">We updated our privacy policy</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Make sure you know how these changes affect you.</p>
                </div>
              </div>
            </div>
          </div>
        )

      case 'withActions':
        return (
          <div className="rounded-md border border-yellow-400 bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9.401 1.947a1.75 1.75 0 011.197 0c.262.112.49.304.649.552l7.287 11.24c.247.38.347.813.288 1.23a1.75 1.75 0 01-.69 1.145c-.31.223-.68.346-1.078.346H2.946c-.398 0-.768-.123-1.078-.346a1.75 1.75 0 01-.689-1.145 1.73 1.73 0 01.288-1.23l7.287-11.24c.16-.248.387-.44.649-.552zM10 6.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3A.75.75 0 0010 6.5zm0 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-yellow-800">You have pending security alerts that need attention.</p>
                <div className="mt-4 flex gap-3 md:mt-0 md:items-center">
                  <button className="text-sm font-medium text-yellow-800 underline">Review alerts</button>
                  <button className="text-sm font-medium text-yellow-800">Learn more →</button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'withLinks':
        return (
          <div className="rounded-md border border-red-400 bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M9.401 1.947a1.75 1.75 0 011.197 0c.262.112.49.304.649.552l7.287 11.24c.247.38.347.813.288 1.23a1.75 1.75 0 01-.69 1.145c-.31.223-.68.346-1.078.346H2.946c-.398 0-.768-.123-1.078-.346a1.75 1.75 0 01-.689-1.145 1.73 1.73 0 01.288-1.23l7.287-11.24c.16-.248.387-.44.649-.552zM10 6.5a.75.75 0 00-.75.75v3a.75.75 0 001.5 0v-3A.75.75 0 0010 6.5zm0 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Payment failed</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>Update your billing information to restore account functionality.</p>
                </div>
                <div className="mt-4">
                  <button className="text-sm font-medium text-red-800 underline">Update payment method</button>
                </div>
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
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <button
                  onClick={onNavigateToFeedback}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span className="sr-only">返回反馈组件</span>
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
                <button
                  onClick={onNavigateToFeedback}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
                  type="button"
                >
                  反馈组件
                </button>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
                <span className="ml-4 text-sm font-medium text-gray-900">警报</span>
              </div>
            </li>
          </ol>
        </nav>

        <div>
          {Object.entries(alertVariants).map(([key, variant]) => (
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
                    {renderAlertPreview(key)}
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
  )
}
