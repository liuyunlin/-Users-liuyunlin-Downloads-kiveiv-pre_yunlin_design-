import { useState } from 'react'

export function InputGroups({ onNavigateHome, onNavigateToBasic }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({
    inputWithIcon: 'react',
    inputWithAddon: 'react',
    inputWithButton: 'react'
  })

  // 面包屑导航组件
  const Breadcrumb = () => (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-4">
        <li>
          <div>
            <button 
              onClick={onNavigateHome}
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
              onClick={onNavigateToBasic}
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
            <span className="ml-4 text-sm font-medium text-gray-900">输入组</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // Input with leading icon
  const renderInputWithIcon = () => {
    return (
      <div className="max-w-md">
        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
          Email
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v1.586l-4.707 4.707a1 1 0 01-1.414 0L6.172 5.586A2 2 0 013 4z" />
              <path d="M18 8.414V16a2 2 0 01-2 2H4a2 2 0 01-2-2V8.414l4.293 4.293a3 3 0 004.414 0L18 8.414z" />
            </svg>
          </div>
          <input
            type="email"
            name="email"
            id="email"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="you@example.com"
          />
        </div>
      </div>
    )
  }

  // Input with text addon
  const renderInputWithAddon = () => {
    return (
      <div className="max-w-md">
        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
          Price
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="text"
            name="price"
            id="price"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="0.00"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <label htmlFor="currency" className="sr-only">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
            >
              <option>USD</option>
              <option>CAD</option>
              <option>EUR</option>
            </select>
          </div>
        </div>
      </div>
    )
  }

  // Input with button
  const renderInputWithButton = () => {
    return (
      <div className="max-w-md">
        <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v1.586l-4.707 4.707a1 1 0 01-1.414 0L6.172 5.586A2 2 0 013 4z" />
                <path d="M18 8.414V16a2 2 0 01-2 2H4a2 2 0 01-2-2V8.414l4.293 4.293a3 3 0 004.414 0L18 8.414z" />
              </svg>
            </div>
            <input
              type="email"
              name="email-address"
              id="email-address"
              className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <svg className="-ml-0.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            Subscribe
          </button>
        </div>
      </div>
    )
  }

  const renderComponent = (key, component, title) => (
    <div key={key} style={{marginBottom: '56px'}}>
      {/* Header with title and tabs */}
      <div className="flex items-center justify-between" style={{marginBottom: '24px'}}>
        <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>{title}</h2>
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTabs(prev => ({...prev, [key]: 'preview'}))}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              (activeTabs[key] || 'preview') === 'preview'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Preview 预览
          </button>
          <button
            onClick={() => setActiveTabs(prev => ({...prev, [key]: 'code'}))}
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
      
      {/* Content */}
      <div>
        {(activeTabs[key] || 'preview') === 'preview' ? (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            {component()}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900">代码示例</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCodeTypes(prev => ({...prev, [key]: 'react'}))}
                  className={`px-3 py-1 text-xs rounded-md transition-colors ${
                    (codeTypes[key] || 'react') === 'react'
                      ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                      : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  React
                </button>
                <button
                  onClick={() => setCodeTypes(prev => ({...prev, [key]: 'html'}))}
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
                <code style={{fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'}}>
                  {(() => {
                    const reactCodes = {
                      'inputWithIcon': `// Input with leading icon
export default function InputWithIcon() {
  return (
    <div className="max-w-md">
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Email
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v1.586l-4.707 4.707a1 1 0 01-1.414 0L6.172 5.586A2 2 0 013 4z" />
            <path d="M18 8.414V16a2 2 0 01-2 2H4a2 2 0 01-2-2V8.414l4.293 4.293a3 3 0 004.414 0L18 8.414z" />
          </svg>
        </div>
        <input
          type="email"
          name="email"
          id="email"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="you@example.com"
        />
      </div>
    </div>
  )
}`,
                      'inputWithAddon': `// Input with text addon and select
export default function InputWithAddon() {
  return (
    <div className="max-w-md">
      <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
        Price
      </label>
      <div className="relative mt-2 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-gray-500 sm:text-sm">$</span>
        </div>
        <input
          type="text"
          name="price"
          id="price"
          className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
          >
            <option>USD</option>
            <option>CAD</option>
            <option>EUR</option>
          </select>
        </div>
      </div>
    </div>
  )
}`,
                      'inputWithButton': `// Input with button
export default function InputWithButton() {
  return (
    <div className="max-w-md">
      <label htmlFor="email-address" className="block text-sm font-medium leading-6 text-gray-900">
        Email address
      </label>
      <div className="mt-2 flex rounded-md shadow-sm">
        <div className="relative flex flex-grow items-stretch focus-within:z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v1.586l-4.707 4.707a1 1 0 01-1.414 0L6.172 5.586A2 2 0 013 4z" />
              <path d="M18 8.414V16a2 2 0 01-2 2H4a2 2 0 01-2-2V8.414l4.293 4.293a3 3 0 004.414 0L18 8.414z" />
            </svg>
          </div>
          <input
            type="email"
            name="email-address"
            id="email-address"
            className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />
        </div>
        <button
          type="button"
          className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <svg className="-ml-0.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
          Subscribe
        </button>
      </div>
    </div>
  )
}`
                    };

                    const htmlCodes = {
                      'inputWithIcon': `<!-- Input with leading icon -->
<div class="max-w-md">
  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">
    Email
  </label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v1.586l-4.707 4.707a1 1 0 01-1.414 0L6.172 5.586A2 2 0 013 4z" />
        <path d="M18 8.414V16a2 2 0 01-2 2H4a2 2 0 01-2-2V8.414l4.293 4.293a3 3 0 004.414 0L18 8.414z" />
      </svg>
    </div>
    <input
      type="email"
      name="email"
      id="email"
      class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="you@example.com"
    />
  </div>
</div>`,
                      'inputWithAddon': `<!-- Input with text addon and select -->
<div class="max-w-md">
  <label for="price" class="block text-sm font-medium leading-6 text-gray-900">
    Price
  </label>
  <div class="relative mt-2 rounded-md shadow-sm">
    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <span class="text-gray-500 sm:text-sm">$</span>
    </div>
    <input
      type="text"
      name="price"
      id="price"
      class="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
      placeholder="0.00"
    />
    <div class="absolute inset-y-0 right-0 flex items-center">
      <label for="currency" class="sr-only">
        Currency
      </label>
      <select
        id="currency"
        name="currency"
        class="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
      >
        <option>USD</option>
        <option>CAD</option>
        <option>EUR</option>
      </select>
    </div>
  </div>
</div>`,
                      'inputWithButton': `<!-- Input with button -->
<div class="max-w-md">
  <label for="email-address" class="block text-sm font-medium leading-6 text-gray-900">
    Email address
  </label>
  <div class="mt-2 flex rounded-md shadow-sm">
    <div class="relative flex flex-grow items-stretch focus-within:z-10">
      <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v1.586l-4.707 4.707a1 1 0 01-1.414 0L6.172 5.586A2 2 0 013 4z" />
          <path d="M18 8.414V16a2 2 0 01-2 2H4a2 2 0 01-2-2V8.414l4.293 4.293a3 3 0 004.414 0L18 8.414z" />
        </svg>
      </div>
      <input
        type="email"
        name="email-address"
        id="email-address"
        class="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Enter your email"
      />
    </div>
    <button
      type="button"
      class="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      <svg class="-ml-0.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
      </svg>
      Subscribe
    </button>
  </div>
</div>`
                    };

                    return (codeTypes[key] || 'react') === 'react' 
                      ? (reactCodes[key] || `// Component code for ${title}`)
                      : (htmlCodes[key] || `<!-- HTML code for ${title} -->`);
                  })()}
                </code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        <div>
          {renderComponent('inputWithIcon', renderInputWithIcon, 'Input with icon')}
          {renderComponent('inputWithAddon', renderInputWithAddon, 'Input with addon')}
          {renderComponent('inputWithButton', renderInputWithButton, 'Input with button')}
        </div>
      </div>
    </div>
  )
}