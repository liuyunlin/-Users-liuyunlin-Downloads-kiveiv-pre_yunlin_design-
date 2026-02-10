import { useState } from 'react'
import {
  Card, CardHeader, CardContent,
  TabGroup, TabList, Tab, TabPanels, TabPanel,
  Badge
} from '../../design-system'

export function TopNavigation({ onNavigateHome }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})
  const [profileStates, setProfileStates] = useState({})

  // 三种不同的导航栏样式
  const navStyles = {
    default: {
      name: '默认样式',
      bg: 'bg-white',
      border: 'border-b border-gray-200',
      text: 'text-gray-900',
      accent: 'text-indigo-600'
    },
    dark: {
      name: '深色样式', 
      bg: 'bg-gray-900',
      border: 'border-b border-gray-700',
      text: 'text-white',
      accent: 'text-indigo-400'
    },
    branded: {
      name: '品牌样式',
      bg: 'bg-indigo-600', 
      border: 'border-b border-indigo-500',
      text: 'text-white',
      accent: 'text-indigo-200'
    }
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
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              导航组件
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <span className="ml-4 text-sm font-medium text-gray-900">顶部导航</span>
          </div>
        </li>
      </ol>
    </nav>
  )


  // 生成 React 代码
  const generateReactCode = (style) => {
    const { bg, border, text, accent } = navStyles[style]
    return `export default function TopNavigation() {
  return (
    <nav className="${bg} ${border}">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <div className="flex items-center">
                <svg className="h-8 w-8 ${style === 'default' ? 'text-indigo-600' : 'text-white'}" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                <span className="ml-2 text-lg font-semibold ${style === 'default' ? 'text-gray-900' : 'text-white'}">Your Company</span>
              </div>
            </div>
            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <a href="#" className="${accent} border-${style === 'default' ? 'indigo-500' : style === 'dark' ? 'indigo-400' : 'indigo-200'} ${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium" aria-current="page">
                Dashboard
              </a>
              <a href="#" className="${text} border-transparent hover:border-gray-300 hover:${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                Team
              </a>
              <a href="#" className="${text} border-transparent hover:border-gray-300 hover:${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                Projects
              </a>
              <a href="#" className="${text} border-transparent hover:border-gray-300 hover:${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                Calendar
              </a>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button type="button" className="${text} hover:${text} rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span className="sr-only">View notifications</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
              </svg>
            </button>
            <div className="relative ml-3">
              <div>
                <button type="button" className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                  <span className="sr-only">Open user menu</span>
                  <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}`
  }

  // 生成 HTML 代码
  const generateHTMLCode = (style) => {
    const { bg, border, text, accent } = navStyles[style]
    return `<nav class="${bg} ${border}">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="flex h-16 justify-between">
      <div class="flex">
        <div class="flex flex-shrink-0 items-center">
          <div class="flex items-center">
            <svg class="h-8 w-8 ${style === 'default' ? 'text-indigo-600' : 'text-white'}" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span class="ml-2 text-lg font-semibold ${style === 'default' ? 'text-gray-900' : 'text-white'}">Your Company</span>
          </div>
        </div>
        <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
          <a href="#" class="${accent} border-${style === 'default' ? 'indigo-500' : style === 'dark' ? 'indigo-400' : 'indigo-200'} ${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium" aria-current="page">Dashboard</a>
          <a href="#" class="${text} border-transparent hover:border-gray-300 hover:${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">Team</a>
          <a href="#" class="${text} border-transparent hover:border-gray-300 hover:${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">Projects</a>
          <a href="#" class="${text} border-transparent hover:border-gray-300 hover:${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">Calendar</a>
        </div>
      </div>
      <div class="hidden sm:ml-6 sm:flex sm:items-center">
        <button type="button" class="${text} hover:${text} rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span class="sr-only">View notifications</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
        </button>
        <div class="relative ml-3">
          <div>
            <button type="button" class="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</nav>`
  }

  // 渲染导航栏预览
  const renderNavPreview = (style) => {
    const { bg, border, text, accent } = navStyles[style]
    const isProfileOpen = profileStates[style] || false
    
    const toggleProfile = () => {
      setProfileStates(prev => ({
        ...prev,
        [style]: !prev[style]
      }))
    }
    
    return (
      <nav className={`${bg} ${border} min-w-max`}>
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{minWidth: '900px'}}>
          <div className="flex h-16 justify-between">
            <div className="flex">
              <div className="flex flex-shrink-0 items-center">
                <div className="flex items-center">
                  <svg className={`h-8 w-8 ${style === 'default' ? 'text-indigo-600' : 'text-white'}`} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                  <span className={`ml-2 text-lg font-semibold ${style === 'default' ? 'text-gray-900' : 'text-white'}`}>Your Company</span>
                </div>
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className={`${accent} border-${style === 'default' ? 'indigo-500' : style === 'dark' ? 'indigo-400' : 'indigo-200'} ${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`} aria-current="page">
                  Dashboard
                </a>
                <a href="#" className={`${text} border-transparent hover:border-gray-300 hover:${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}>
                  Team
                </a>
                <a href="#" className={`${text} border-transparent hover:border-gray-300 hover:${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}>
                  Projects
                </a>
                <a href="#" className={`${text} border-transparent hover:border-gray-300 hover:${text} inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium`}>
                  Calendar
                </a>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button type="button" className={`${text} hover:${text} rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
              <div className="relative ml-3">
                <div>
                  <button 
                    type="button" 
                    className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={toggleProfile}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                  </button>
                </div>
                {isProfileOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-lg bg-white py-2 shadow-xl border border-gray-200 focus:outline-none">
                    <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Your profile</a>
                    <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Settings</a>
                    <hr className="my-1 border-gray-100" />
                    <a href="#" className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Sign out</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div>
          {Object.entries(navStyles).map(([key, style]) => (
            <div key={key} style={{marginBottom: '56px'}}>
              {/* Header with title and tabs */}
              <div className="flex items-center justify-between" style={{marginBottom: '24px'}}>
                <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>{style.name}</h2>
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
                  <div className="space-y-6">
                    {/* 导航栏预览 */}
                    <div className="border border-gray-200 rounded-lg bg-white overflow-x-auto relative" style={{minHeight: '300px', paddingBottom: '100px'}}>
                      <div className="min-w-fit">
                        {renderNavPreview(key)}
                      </div>
                    </div>
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