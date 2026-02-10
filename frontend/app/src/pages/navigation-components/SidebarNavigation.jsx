import { useState } from 'react'

export function SidebarNavigation({ onNavigateHome }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})
  const [hoveredSidebars, setHoveredSidebars] = useState({})

  // 六种不同的侧边栏样式
  const sidebarStyles = {
    dark: {
      name: '深色样式',
      headerBg: 'bg-gray-900',
      headerText: 'text-white',
      navBg: 'bg-gray-900',
      activeItem: 'bg-gray-700 text-white',
      inactiveItem: 'text-gray-300 hover:bg-gray-700 hover:text-white',
      logo: 'text-white'
    },
    light: {
      name: '浅色样式',
      headerBg: 'bg-white border-b border-gray-200',
      headerText: 'text-gray-900',
      navBg: 'bg-white',
      activeItem: 'bg-indigo-50 border-indigo-500 text-indigo-700',
      inactiveItem: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
      logo: 'text-indigo-600'
    },
    branded: {
      name: '品牌样式',
      headerBg: 'bg-indigo-600',
      headerText: 'text-white',
      navBg: 'bg-indigo-700',
      activeItem: 'bg-indigo-800 text-white',
      inactiveItem: 'text-indigo-200 hover:bg-indigo-600 hover:text-white',
      logo: 'text-white'
    },
    // 新增的三个可收缩样式
    collapsedDark: {
      name: '深色收缩样式',
      headerBg: 'bg-gray-900',
      headerText: 'text-white',
      navBg: 'bg-gray-900',
      activeItem: 'bg-gray-700 text-white',
      inactiveItem: 'text-gray-300 hover:bg-gray-700 hover:text-white',
      logo: 'text-white',
      collapsible: true
    },
    collapsedLight: {
      name: '浅色收缩样式',
      headerBg: 'bg-white border-b border-gray-200',
      headerText: 'text-gray-900',
      navBg: 'bg-white',
      activeItem: 'bg-indigo-50 border-indigo-500 text-indigo-700',
      inactiveItem: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
      logo: 'text-indigo-600',
      collapsible: true
    },
    collapsedBranded: {
      name: '品牌收缩样式',
      headerBg: 'bg-indigo-600',
      headerText: 'text-white',
      navBg: 'bg-indigo-700',
      activeItem: 'bg-indigo-800 text-white',
      inactiveItem: 'text-indigo-200 hover:bg-indigo-600 hover:text-white',
      logo: 'text-white',
      collapsible: true
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
            <span className="ml-4 text-sm font-medium text-gray-900">侧边栏导航</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // 生成 React 代码
  const generateReactCode = (style) => {
    const { headerBg, headerText, navBg, activeItem, inactiveItem, logo, collapsible } = sidebarStyles[style]
    
    if (collapsible) {
      return `import { useState } from 'react'

export default function CollapsibleSidebarNavigation() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Collapsible Sidebar */}
      <div 
        className={\`flex flex-col \${isHovered ? 'w-64' : 'w-20'} bg-white transition-all duration-300 ease-in-out\`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={\`flex items-center flex-shrink-0 px-4 py-4 ${headerBg} \${!isHovered ? 'justify-center' : ''}\`}>
          <svg className={\`h-8 w-auto ${logo} flex-shrink-0\`} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
          </svg>
          {isHovered && (
            <span className={\`ml-2 text-lg font-semibold ${headerText} transition-opacity duration-300\`}>Your Company</span>
          )}
        </div>
        <div className="flex-1 flex flex-col min-h-0">
          <nav className={\`flex-1 space-y-1 ${navBg} px-2 py-4\`}>
            <a href="#" className={\`${activeItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium \${!isHovered ? 'justify-center' : ''}\`}>
              <svg className={\`\${!isHovered ? '' : 'mr-3'} flex-shrink-0 h-6 w-6\`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              {isHovered && (
                <span className="transition-opacity duration-300">Dashboard</span>
              )}
            </a>
            {/* Add more navigation items similarly */}
          </nav>

          {/* Teams section - only show when expanded */}
          {isHovered && (
            <div className={\`${navBg} px-2 pb-2\`}>
              <div className="space-y-1">
                <div className={\`px-2 py-2 text-xs font-semibold uppercase tracking-wider transition-opacity duration-300\`}>
                  Your teams
                </div>
                {/* Team items */}
              </div>
            </div>
          )}

          {/* Settings section */}
          <div className={\`${navBg} px-2 pb-4 border-t\`}>
            <div className="pt-2">
              <a href="#" className={\`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium \${!isHovered ? 'justify-center' : ''}\`}>
                <svg className={\`\${!isHovered ? '' : 'mr-3'} flex-shrink-0 h-6 w-6\`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {isHovered && (
                  <span className="transition-opacity duration-300">Settings</span>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}`
    }
    
    return `export default function SidebarNavigation() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 py-4 ${headerBg}">
            <svg className="h-8 w-auto ${logo}" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <span className="ml-2 text-lg font-semibold ${headerText}">Your Company</span>
          </div>
          <nav className="flex-1 space-y-1 ${navBg} px-2 py-4">
            <a href="#" className="${activeItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
              <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              Dashboard
            </a>

            <a href="#" className="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
              <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
              Team
            </a>

            <a href="#" className="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
              <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
              </svg>
              Projects
            </a>

            <a href="#" className="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
              <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              Calendar
            </a>

            <a href="#" className="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
              <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
              </svg>
              Documents
            </a>

            <a href="#" className="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
              <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
              </svg>
              Reports
            </a>
          </nav>

          {/* Teams section */}
          <div className="${navBg} px-2 pb-2">
            <div className="space-y-1">
              <div className="px-2 py-2 text-xs font-semibold ${style === 'dark' ? 'text-gray-400' : style === 'light' ? 'text-gray-500' : 'text-indigo-300'} uppercase tracking-wider">
                Your teams
              </div>
              
              <a href="#" className="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ${style === 'dark' ? 'border-gray-700 text-gray-400 bg-gray-800' : style === 'light' ? 'border-gray-200 text-gray-500 bg-white' : 'border-indigo-500 text-indigo-300 bg-indigo-600'}">
                  H
                </span>
                <span className="truncate">Heroicons</span>
              </a>
              
              <a href="#" className="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ${style === 'dark' ? 'border-gray-700 text-gray-400 bg-gray-800' : style === 'light' ? 'border-gray-200 text-gray-500 bg-white' : 'border-indigo-500 text-indigo-300 bg-indigo-600'}">
                  T
                </span>
                <span className="truncate">Tailwind Labs</span>
              </a>
              
              <a href="#" className="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ${style === 'dark' ? 'border-gray-700 text-gray-400 bg-gray-800' : style === 'light' ? 'border-gray-200 text-gray-500 bg-white' : 'border-indigo-500 text-indigo-300 bg-indigo-600'}">
                  W
                </span>
                <span className="truncate">Workcation</span>
              </a>
            </div>
          </div>

          {/* Settings section */}
          <div className="${navBg} px-2 pb-4 border-t ${style === 'dark' ? 'border-gray-700' : style === 'light' ? 'border-gray-200' : 'border-indigo-500'}">
            <div className="pt-2">
              <a href="#" className="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                <svg className="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="py-4">
                <div className="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}`
  }

  // 生成 HTML 代码
  const generateHTMLCode = (style) => {
    const { headerBg, headerText, navBg, activeItem, inactiveItem, logo, collapsible } = sidebarStyles[style]
    
    if (collapsible) {
      return `<!-- Collapsible Sidebar with JavaScript -->
<div class="flex h-screen bg-gray-100">
  <!-- Collapsible Sidebar -->
  <div 
    id="sidebar" 
    class="flex flex-col w-20 hover:w-64 bg-white transition-all duration-300 ease-in-out"
    onmouseenter="expandSidebar()" 
    onmouseleave="collapseSidebar()"
  >
    <div class="flex items-center flex-shrink-0 px-4 py-4 ${headerBg} justify-center hover:justify-start">
      <svg class="h-8 w-auto ${logo} flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
      <span class="ml-2 text-lg font-semibold ${headerText} opacity-0 transition-opacity duration-300" id="company-name">Your Company</span>
    </div>
    
    <div class="flex-1 flex flex-col min-h-0">
      <nav class="flex-1 space-y-1 ${navBg} px-2 py-4">
        <a href="#" class="${activeItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium justify-center hover:justify-start">
          <svg class="flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span class="ml-3 opacity-0 transition-opacity duration-300 nav-text">Dashboard</span>
        </a>
        <!-- Add more navigation items similarly -->
      </nav>

      <!-- Teams section - hidden by default -->
      <div class="${navBg} px-2 pb-2 opacity-0 transition-opacity duration-300" id="teams-section">
        <div class="space-y-1">
          <div class="px-2 py-2 text-xs font-semibold uppercase tracking-wider">
            Your teams
          </div>
          <!-- Team items -->
        </div>
      </div>

      <!-- Settings section -->
      <div class="${navBg} px-2 pb-4 border-t">
        <div class="pt-2">
          <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium justify-center hover:justify-start">
            <svg class="flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span class="ml-3 opacity-0 transition-opacity duration-300 nav-text">Settings</span>
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <main class="flex-1 relative overflow-y-auto focus:outline-none">
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div class="py-4">
            <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>

<script>
function expandSidebar() {
  document.getElementById('company-name').style.opacity = '1';
  document.getElementById('teams-section').style.opacity = '1';
  document.querySelectorAll('.nav-text').forEach(el => el.style.opacity = '1');
}

function collapseSidebar() {
  document.getElementById('company-name').style.opacity = '0';
  document.getElementById('teams-section').style.opacity = '0';
  document.querySelectorAll('.nav-text').forEach(el => el.style.opacity = '0');
}
</script>`
    }
    
    return `<div class="flex h-screen bg-gray-100">
  <!-- Sidebar -->
  <div class="flex min-h-0 flex-1 flex-col">
    <div class="flex flex-1 flex-col overflow-y-auto">
      <div class="flex items-center flex-shrink-0 px-4 py-4 ${headerBg}">
        <svg class="h-8 w-auto ${logo}" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <span class="ml-2 text-lg font-semibold ${headerText}">Your Company</span>
      </div>
      <nav class="flex-1 space-y-1 ${navBg} px-2 py-4">
        <a href="#" class="${activeItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
          <svg class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Dashboard
        </a>

        <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
          <svg class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
          </svg>
          Team
        </a>

        <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
          <svg class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
          </svg>
          Projects
        </a>

        <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
          <svg class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
          </svg>
          Calendar
        </a>

        <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
          <svg class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
          </svg>
          Documents
        </a>

        <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
          <svg class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
          </svg>
          Reports
        </a>
      </nav>

      <!-- Teams section -->
      <div class="${navBg} px-2 pb-2">
        <div class="space-y-1">
          <div class="px-2 py-2 text-xs font-semibold ${style === 'dark' ? 'text-gray-400' : style === 'light' ? 'text-gray-500' : 'text-indigo-300'} uppercase tracking-wider">
            Your teams
          </div>
          
          <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
            <span class="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ${style === 'dark' ? 'border-gray-700 text-gray-400 bg-gray-800' : style === 'light' ? 'border-gray-200 text-gray-500 bg-white' : 'border-indigo-500 text-indigo-300 bg-indigo-600'}">
              H
            </span>
            <span class="truncate">Heroicons</span>
          </a>
          
          <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
            <span class="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ${style === 'dark' ? 'border-gray-700 text-gray-400 bg-gray-800' : style === 'light' ? 'border-gray-200 text-gray-500 bg-white' : 'border-indigo-500 text-indigo-300 bg-indigo-600'}">
              T
            </span>
            <span class="truncate">Tailwind Labs</span>
          </a>
          
          <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
            <span class="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ${style === 'dark' ? 'border-gray-700 text-gray-400 bg-gray-800' : style === 'light' ? 'border-gray-200 text-gray-500 bg-white' : 'border-indigo-500 text-indigo-300 bg-indigo-600'}">
              W
            </span>
            <span class="truncate">Workcation</span>
          </a>
        </div>
      </div>

      <!-- Settings section -->
      <div class="${navBg} px-2 pb-4 border-t ${style === 'dark' ? 'border-gray-700' : style === 'light' ? 'border-gray-200' : 'border-indigo-500'}">
        <div class="pt-2">
          <a href="#" class="${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium">
            <svg class="mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Main content -->
  <div class="flex-1 flex flex-col overflow-hidden">
    <main class="flex-1 relative overflow-y-auto focus:outline-none">
      <div class="py-6">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
        </div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <div class="py-4">
            <div class="border-4 border-dashed border-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </div>
    </main>
  </div>
</div>`
  }

  // 渲染侧边栏预览
  const renderSidebarPreview = (style) => {
    const { headerBg, headerText, navBg, activeItem, inactiveItem, logo, collapsible } = sidebarStyles[style]
    const isHovered = hoveredSidebars[style]
    const sidebarWidth = collapsible ? (isHovered ? 'w-64' : 'w-20') : 'w-64'
    
    return (
      <div className="flex h-[600px] overflow-hidden">
        {/* Sidebar */}
        <div 
          className={`flex flex-col ${sidebarWidth} bg-white transition-all duration-300 ease-in-out`}
          onMouseEnter={() => collapsible && setHoveredSidebars(prev => ({...prev, [style]: true}))}
          onMouseLeave={() => collapsible && setHoveredSidebars(prev => ({...prev, [style]: false}))}
        >
          <div className={`flex items-center flex-shrink-0 px-4 py-4 ${headerBg} ${collapsible && !isHovered ? 'justify-center' : ''}`}>
            <svg className={`h-8 w-auto ${logo} flex-shrink-0`} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            {(!collapsible || isHovered) && (
              <span className={`ml-2 text-lg font-semibold ${headerText} transition-opacity duration-300`}>Your Company</span>
            )}
          </div>
          <div className="flex-1 flex flex-col min-h-0">
            <nav className={`flex-1 space-y-1 ${navBg} px-2 py-4`}>
              <a href="#" className={`${activeItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium border-r-2 ${style.includes('Light') ? 'border-indigo-500' : 'border-transparent'} ${collapsible && !isHovered ? 'justify-center' : ''}`}>
                <svg className={`${collapsible && !isHovered ? '' : 'mr-3'} flex-shrink-0 h-6 w-6 ${style.includes('Dark') ? 'text-gray-300' : style.includes('Light') ? 'text-indigo-500' : 'text-indigo-200'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                {(!collapsible || isHovered) && (
                  <span className="transition-opacity duration-300">Dashboard</span>
                )}
              </a>

              <a href="#" className={`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium ${collapsible && !isHovered ? 'justify-center' : ''}`}>
                <svg className={`${collapsible && !isHovered ? '' : 'mr-3'} flex-shrink-0 h-6 w-6 ${style.includes('Dark') ? 'text-gray-400 group-hover:text-gray-300' : style.includes('Light') ? 'text-gray-400' : 'text-indigo-200'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                {(!collapsible || isHovered) && (
                  <span className="transition-opacity duration-300">Team</span>
                )}
              </a>

              <a href="#" className={`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium ${collapsible && !isHovered ? 'justify-center' : ''}`}>
                <svg className={`${collapsible && !isHovered ? '' : 'mr-3'} flex-shrink-0 h-6 w-6 ${style.includes('Dark') ? 'text-gray-400 group-hover:text-gray-300' : style.includes('Light') ? 'text-gray-400' : 'text-indigo-200'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                </svg>
                {(!collapsible || isHovered) && (
                  <span className="transition-opacity duration-300">Projects</span>
                )}
              </a>

              <a href="#" className={`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium ${collapsible && !isHovered ? 'justify-center' : ''}`}>
                <svg className={`${collapsible && !isHovered ? '' : 'mr-3'} flex-shrink-0 h-6 w-6 ${style.includes('Dark') ? 'text-gray-400 group-hover:text-gray-300' : style.includes('Light') ? 'text-gray-400' : 'text-indigo-200'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                {(!collapsible || isHovered) && (
                  <span className="transition-opacity duration-300">Calendar</span>
                )}
              </a>

              <a href="#" className={`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium ${collapsible && !isHovered ? 'justify-center' : ''}`}>
                <svg className={`${collapsible && !isHovered ? '' : 'mr-3'} flex-shrink-0 h-6 w-6 ${style.includes('Dark') ? 'text-gray-400 group-hover:text-gray-300' : style.includes('Light') ? 'text-gray-400' : 'text-indigo-200'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                </svg>
                {(!collapsible || isHovered) && (
                  <span className="transition-opacity duration-300">Documents</span>
                )}
              </a>

              <a href="#" className={`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium ${collapsible && !isHovered ? 'justify-center' : ''}`}>
                <svg className={`${collapsible && !isHovered ? '' : 'mr-3'} flex-shrink-0 h-6 w-6 ${style.includes('Dark') ? 'text-gray-400 group-hover:text-gray-300' : style.includes('Light') ? 'text-gray-400' : 'text-indigo-200'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                </svg>
                {(!collapsible || isHovered) && (
                  <span className="transition-opacity duration-300">Reports</span>
                )}
              </a>
            </nav>

            {/* Teams section */}
            {(!collapsible || isHovered) && (
              <div className={`${navBg} px-2 pb-2`}>
                <div className="space-y-1">
                  {/* Teams header */}
                  <div className={`px-2 py-2 text-xs font-semibold ${style.includes('Dark') ? 'text-gray-400' : style.includes('Light') ? 'text-gray-500' : 'text-indigo-300'} uppercase tracking-wider transition-opacity duration-300`}>
                    Your teams
                  </div>
                  
                  {/* Team items */}
                  <a href="#" className={`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium`}>
                    <span className={`mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ${style.includes('Dark') ? 'border-gray-700 text-gray-400 bg-gray-800' : style.includes('Light') ? 'border-gray-200 text-gray-500 bg-white' : 'border-indigo-500 text-indigo-300 bg-indigo-600'}`}>
                      H
                    </span>
                    <span className="truncate transition-opacity duration-300">Heroicons</span>
                  </a>
                  
                  <a href="#" className={`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium`}>
                    <span className={`mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ${style.includes('Dark') ? 'border-gray-700 text-gray-400 bg-gray-800' : style.includes('Light') ? 'border-gray-200 text-gray-500 bg-white' : 'border-indigo-500 text-indigo-300 bg-indigo-600'}`}>
                      T
                    </span>
                    <span className="truncate transition-opacity duration-300">Tailwind Labs</span>
                  </a>
                  
                  <a href="#" className={`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium`}>
                    <span className={`mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium ${style.includes('Dark') ? 'border-gray-700 text-gray-400 bg-gray-800' : style.includes('Light') ? 'border-gray-200 text-gray-500 bg-white' : 'border-indigo-500 text-indigo-300 bg-indigo-600'}`}>
                      W
                    </span>
                    <span className="truncate transition-opacity duration-300">Workcation</span>
                  </a>
                </div>
              </div>
            )}

            {/* Settings section */}
            <div className={`${navBg} px-2 pb-4 border-t ${style.includes('Dark') ? 'border-gray-700' : style.includes('Light') ? 'border-gray-200' : 'border-indigo-500'}`}>
              <div className="pt-2">
                <a href="#" className={`${inactiveItem} group flex items-center rounded-md px-2 py-2 text-sm font-medium ${collapsible && !isHovered ? 'justify-center' : ''}`}>
                  <svg className={`${collapsible && !isHovered ? '' : 'mr-3'} flex-shrink-0 h-6 w-6 ${style.includes('Dark') ? 'text-gray-400 group-hover:text-gray-300' : style.includes('Light') ? 'text-gray-400' : 'text-indigo-200'}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {(!collapsible || isHovered) && (
                    <span className="transition-opacity duration-300">Settings</span>
                  )}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-white">
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
              </div>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">
                  <div className="border-4 border-dashed border-gray-200 rounded-lg h-48 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">主要内容区域</span>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div>
          {Object.entries(sidebarStyles).map(([key, style]) => (
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
                    {/* 侧边栏预览 - 直接展示，无外层容器 */}
                    {renderSidebarPreview(key)}
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