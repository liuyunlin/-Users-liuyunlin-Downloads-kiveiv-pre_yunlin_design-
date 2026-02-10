import { useState } from 'react'

export function Stats({ onNavigateHome }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})

  const handleTabChange = (key, tab) => {
    setActiveTabs(prev => ({ ...prev, [key]: tab }))
  }

  const handleCodeTypeChange = (key, type) => {
    setCodeTypes(prev => ({ ...prev, [key]: type }))
  }

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
              onClick={onNavigateHome}
              className="ml-4 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
            >
              数据展示组件
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <span className="ml-4 text-sm font-medium text-gray-900">统计数据</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // Stats 组件样式定义
  const statsStyles = {
    simpleStats: 'Simple Stats',
    withCards: 'Stats with Cards', 
    withIcons: 'Stats with Icons',
    darkTheme: 'Dark Theme Stats',
    withTrending: 'Stats with Trending'
  }

  // 渲染 Simple Stats 组件
  const renderSimpleStats = () => (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Assets under holding</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">New users annually</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
          </div>
        </dl>
      </div>
    </div>
  )

  // 渲染 Stats with Cards 组件
  const renderStatsWithCards = () => (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Subscribers</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">71,897</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Avg. Open Rate</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">58.16%</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Avg. Click Rate</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">24.57%</dd>
        </div>
      </div>
    </div>
  )

  // 渲染 Stats with Icons 组件
  const renderStatsWithIcons = () => (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12s-1.536.219-2.121.659c-1.172.879-1.172 2.303 0 3.182L12 18Z" />
              </svg>
            </div>
            <dt className="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H4.5m2.25 0v3.75m0-3.75h3.375c.621 0 1.125.504 1.125 1.125v.375M7.5 21.75H18a2.25 2.25 0 002.25-2.25v-6.75a.75.75 0 00-.75-.75h-2.25M10.5 18.75v-6.75a.75.75 0 01.75-.75h2.25M21 12a.75.75 0 00-.75-.75h-2.25M10.5 18.75v-6.75a.75.75 0 01.75-.75h2.25" />
              </svg>
            </div>
            <dt className="text-base leading-7 text-gray-600">Assets under holding</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <dt className="text-base leading-7 text-gray-600">New users annually</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
          </div>
        </dl>
      </div>
    </div>
  )

  // 渲染 Dark Theme Stats 组件
  const renderDarkThemeStats = () => (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gray-900 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Total Users</dt>
          <dd className="mt-0 text-3xl font-semibold tracking-tight text-white">8,000+</dd>
        </div>
        <div className="bg-gray-900 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Companies</dt>
          <dd className="mt-0 text-3xl font-semibold tracking-tight text-white">40+</dd>
        </div>
        <div className="bg-gray-900 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Countries</dt>
          <dd className="mt-0 text-3xl font-semibold tracking-tight text-white">25+</dd>
        </div>
        <div className="bg-gray-900 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Uptime</dt>
          <dd className="mt-0 text-3xl font-semibold tracking-tight text-white">99.9%</dd>
        </div>
      </div>
    </div>
  )

  // 渲染 Stats with Trending 组件
  const renderWithTrending = () => (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Total Subscribers</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              71,897
            </dd>
            <div className="flex items-center justify-center gap-x-2 text-sm">
              <div className="flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-emerald-600">+12%</span>
              </div>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Avg. Open Rate</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              58.16%
            </dd>
            <div className="flex items-center justify-center gap-x-2 text-sm">
              <div className="flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-red-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                </div>
                <span className="text-red-600">-2.1%</span>
              </div>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Avg. Click Rate</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              24.57%
            </dd>
            <div className="flex items-center justify-center gap-x-2 text-sm">
              <div className="flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-emerald-600">+5.4%</span>
              </div>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
        </dl>
      </div>
    </div>
  )

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />
        
        <div style={{marginBottom: '56px'}}>
          <div key="simpleStats" style={{marginBottom: '56px'}}>
            <div style={{marginBottom: '24px'}}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>Simple Stats</h2>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleTabChange('simpleStats', 'preview')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['simpleStats'] || 'preview') === 'preview'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleTabChange('simpleStats', 'code')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['simpleStats'] || 'preview') === 'code'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Code
                  </button>
                </div>
              </div>
            </div>

            {(activeTabs['simpleStats'] || 'preview') === 'preview' ? (
              <div>
                {renderSimpleStats()}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCodeTypeChange('simpleStats', 'react')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['simpleStats'] || 'react') === 'react'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    React
                  </button>
                  <button
                    onClick={() => handleCodeTypeChange('simpleStats', 'html')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['simpleStats'] || 'react') === 'html'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    HTML
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100" style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                  }}>
                    {(codeTypes['simpleStats'] || 'react') === 'react' 
                      ? `export default function SimpleStats() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Assets under holding</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">New users annually</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}`
                      : `<div class="bg-white">
  <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
    <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
      </div>
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base leading-7 text-gray-600">Assets under holding</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
      </div>
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base leading-7 text-gray-600">New users annually</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
      </div>
    </dl>
  </div>
</div>`
                    }
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Stats with Cards */}
          <div key="withCards" style={{marginBottom: '56px'}}>
            <div style={{marginBottom: '24px'}}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>Stats with Cards</h2>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleTabChange('withCards', 'preview')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['withCards'] || 'preview') === 'preview'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleTabChange('withCards', 'code')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['withCards'] || 'preview') === 'code'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Code
                  </button>
                </div>
              </div>
            </div>

            {(activeTabs['withCards'] || 'preview') === 'preview' ? (
              <div>
                {renderStatsWithCards()}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCodeTypeChange('withCards', 'react')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['withCards'] || 'react') === 'react'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    React
                  </button>
                  <button
                    onClick={() => handleCodeTypeChange('withCards', 'html')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['withCards'] || 'react') === 'html'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    HTML
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100" style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                  }}>
                    {(codeTypes['withCards'] || 'react') === 'react' 
                      ? `export default function StatsWithCards() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Total Subscribers</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">71,897</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Avg. Open Rate</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">58.16%</dd>
        </div>
        <div className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
          <dt className="truncate text-sm font-medium text-gray-500">Avg. Click Rate</dt>
          <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-900">24.57%</dd>
        </div>
      </div>
    </div>
  )
}`
                      : `<div class="mx-auto max-w-7xl px-6 lg:px-8">
  <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
    <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-sm font-medium text-gray-500">Total Subscribers</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">71,897</dd>
    </div>
    <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-sm font-medium text-gray-500">Avg. Open Rate</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">58.16%</dd>
    </div>
    <div class="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
      <dt class="truncate text-sm font-medium text-gray-500">Avg. Click Rate</dt>
      <dd class="mt-1 text-3xl font-semibold tracking-tight text-gray-900">24.57%</dd>
    </div>
  </div>
</div>`
                    }
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Stats with Icons */}
          <div key="withIcons" style={{marginBottom: '56px'}}>
            <div style={{marginBottom: '24px'}}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>Stats with Icons</h2>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleTabChange('withIcons', 'preview')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['withIcons'] || 'preview') === 'preview'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleTabChange('withIcons', 'code')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['withIcons'] || 'preview') === 'code'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Code
                  </button>
                </div>
              </div>
            </div>

            {(activeTabs['withIcons'] || 'preview') === 'preview' ? (
              <div>
                {renderStatsWithIcons()}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCodeTypeChange('withIcons', 'react')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['withIcons'] || 'react') === 'react'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    React
                  </button>
                  <button
                    onClick={() => handleCodeTypeChange('withIcons', 'html')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['withIcons'] || 'react') === 'html'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    HTML
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100" style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                  }}>
                    {(codeTypes['withIcons'] || 'react') === 'react' 
                      ? `export default function StatsWithIcons() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12s-1.536.219-2.121.659c-1.172.879-1.172 2.303 0 3.182L12 18Z" />
              </svg>
            </div>
            <dt className="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H4.5m2.25 0v3.75m0-3.75h3.375c.621 0 1.125.504 1.125 1.125v.375M7.5 21.75H18a2.25 2.25 0 002.25-2.25v-6.75a.75.75 0 00-.75-.75h-2.25M10.5 18.75v-6.75a.75.75 0 01.75-.75h2.25M21 12a.75.75 0 00-.75-.75h-2.25M10.5 18.75v-6.75a.75.75 0 01.75-.75h2.25" />
              </svg>
            </div>
            <dt className="text-base leading-7 text-gray-600">Assets under holding</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <dt className="text-base leading-7 text-gray-600">New users annually</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
          </div>
        </dl>
      </div>
    </div>
  )
}`
                      : `<div class="bg-white">
  <div class="mx-auto max-w-7xl px-6 py-12 lg:px-8">
    <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12s-1.536.219-2.121.659c-1.172.879-1.172 2.303 0 3.182L12 18Z" />
          </svg>
        </div>
        <dt class="text-base leading-7 text-gray-600">Transactions every 24 hours</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">44 million</dd>
      </div>
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H4.5m2.25 0v3.75m0-3.75h3.375c.621 0 1.125.504 1.125 1.125v.375M7.5 21.75H18a2.25 2.25 0 002.25-2.25v-6.75a.75.75 0 00-.75-.75h-2.25M10.5 18.75v-6.75a.75.75 0 01.75-.75h2.25M21 12a.75.75 0 00-.75-.75h-2.25M10.5 18.75v-6.75a.75.75 0 01.75-.75h2.25" />
          </svg>
        </div>
        <dt class="text-base leading-7 text-gray-600">Assets under holding</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">$119 trillion</dd>
      </div>
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
        </div>
        <dt class="text-base leading-7 text-gray-600">New users annually</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">46,000</dd>
      </div>
    </dl>
  </div>
</div>`
                    }
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Dark Theme Stats */}
          <div key="darkTheme" style={{marginBottom: '56px'}}>
            <div style={{marginBottom: '24px'}}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>Dark Theme Stats</h2>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleTabChange('darkTheme', 'preview')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['darkTheme'] || 'preview') === 'preview'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleTabChange('darkTheme', 'code')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['darkTheme'] || 'preview') === 'code'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Code
                  </button>
                </div>
              </div>
            </div>

            {(activeTabs['darkTheme'] || 'preview') === 'preview' ? (
              <div>
                {renderDarkThemeStats()}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCodeTypeChange('darkTheme', 'react')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['darkTheme'] || 'react') === 'react'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    React
                  </button>
                  <button
                    onClick={() => handleCodeTypeChange('darkTheme', 'html')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['darkTheme'] || 'react') === 'html'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    HTML
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100" style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                  }}>
                    {(codeTypes['darkTheme'] || 'react') === 'react' 
                      ? `export default function DarkThemeStats() {
  return (
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-gray-900 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Total Users</dt>
          <dd className="mt-0 text-3xl font-semibold tracking-tight text-white">8,000+</dd>
        </div>
        <div className="bg-gray-900 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Companies</dt>
          <dd className="mt-0 text-3xl font-semibold tracking-tight text-white">40+</dd>
        </div>
        <div className="bg-gray-900 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Countries</dt>
          <dd className="mt-0 text-3xl font-semibold tracking-tight text-white">25+</dd>
        </div>
        <div className="bg-gray-900 p-8">
          <dt className="text-sm font-semibold leading-6 text-gray-300">Uptime</dt>
          <dd className="mt-0 text-3xl font-semibold tracking-tight text-white">99.9%</dd>
        </div>
      </div>
    </div>
  )
}`
                      : `<div class="mx-auto max-w-7xl px-6 lg:px-8">
  <div class="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl md:grid-cols-2 lg:grid-cols-4">
    <div class="bg-gray-900 p-8">
      <dt class="text-sm font-semibold leading-6 text-gray-300">Total Users</dt>
      <dd class="mt-0 text-3xl font-semibold tracking-tight text-white">8,000+</dd>
    </div>
    <div class="bg-gray-900 p-8">
      <dt class="text-sm font-semibold leading-6 text-gray-300">Companies</dt>
      <dd class="mt-0 text-3xl font-semibold tracking-tight text-white">40+</dd>
    </div>
    <div class="bg-gray-900 p-8">
      <dt class="text-sm font-semibold leading-6 text-gray-300">Countries</dt>
      <dd class="mt-0 text-3xl font-semibold tracking-tight text-white">25+</dd>
    </div>
    <div class="bg-gray-900 p-8">
      <dt class="text-sm font-semibold leading-6 text-gray-300">Uptime</dt>
      <dd class="mt-0 text-3xl font-semibold tracking-tight text-white">99.9%</dd>
    </div>
  </div>
</div>`
                    }
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* Stats with Trending */}
          <div key="withTrending" style={{marginBottom: '56px'}}>
            <div style={{marginBottom: '24px'}}>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>Stats with Trending</h2>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => handleTabChange('withTrending', 'preview')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['withTrending'] || 'preview') === 'preview'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleTabChange('withTrending', 'code')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs['withTrending'] || 'preview') === 'code'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Code
                  </button>
                </div>
              </div>
            </div>

            {(activeTabs['withTrending'] || 'preview') === 'preview' ? (
              <div>
                {renderWithTrending()}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleCodeTypeChange('withTrending', 'react')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['withTrending'] || 'react') === 'react'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    React
                  </button>
                  <button
                    onClick={() => handleCodeTypeChange('withTrending', 'html')}
                    className={`px-3 py-1 text-xs rounded-md transition-colors ${
                      (codeTypes['withTrending'] || 'react') === 'html'
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    HTML
                  </button>
                </div>
                <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-gray-100" style={{
                    fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
                  }}>
                    {(codeTypes['withTrending'] || 'react') === 'react' 
                      ? `export default function StatsWithTrending() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Total Subscribers</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              71,897
            </dd>
            <div className="flex items-center justify-center gap-x-2 text-sm">
              <div className="flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-emerald-600">+12%</span>
              </div>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Avg. Open Rate</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              58.16%
            </dd>
            <div className="flex items-center justify-center gap-x-2 text-sm">
              <div className="flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-red-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                </div>
                <span className="text-red-600">-2.1%</span>
              </div>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
          <div className="mx-auto flex max-w-xs flex-col gap-y-4">
            <dt className="text-base leading-7 text-gray-600">Avg. Click Rate</dt>
            <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              24.57%
            </dd>
            <div className="flex items-center justify-center gap-x-2 text-sm">
              <div className="flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </div>
                <span className="text-emerald-600">+5.4%</span>
              </div>
              <span className="text-gray-500">from last month</span>
            </div>
          </div>
        </dl>
      </div>
    </div>
  )
}`
                      : `<div class="bg-white py-12">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <dl class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base leading-7 text-gray-600">Total Subscribers</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          71,897
        </dd>
        <div class="flex items-center justify-center gap-x-2 text-sm">
          <div class="flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <span class="text-emerald-600">+12%</span>
          </div>
          <span class="text-gray-500">from last month</span>
        </div>
      </div>
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base leading-7 text-gray-600">Avg. Open Rate</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          58.16%
        </dd>
        <div class="flex items-center justify-center gap-x-2 text-sm">
          <div class="flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-red-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-red-500"></div>
            </div>
            <span class="text-red-600">-2.1%</span>
          </div>
          <span class="text-gray-500">from last month</span>
        </div>
      </div>
      <div class="mx-auto flex max-w-xs flex-col gap-y-4">
        <dt class="text-base leading-7 text-gray-600">Avg. Click Rate</dt>
        <dd class="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          24.57%
        </dd>
        <div class="flex items-center justify-center gap-x-2 text-sm">
          <div class="flex items-center gap-x-1.5">
            <div class="flex-none rounded-full bg-emerald-500/20 p-1">
              <div class="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
            </div>
            <span class="text-emerald-600">+5.4%</span>
          </div>
          <span class="text-gray-500">from last month</span>
        </div>
      </div>
    </dl>
  </div>
</div>`
                    }
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}