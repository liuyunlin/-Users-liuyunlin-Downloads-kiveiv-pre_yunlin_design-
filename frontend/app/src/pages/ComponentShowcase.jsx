import { useState } from 'react'

const componentCategories = [
  {
    id: 'basics',
    title: '基础组件',
    description: '按钮、输入框、卡片等基础UI组件',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0016.5 9h-1.875a1.875 1.875 0 01-1.875-1.875V5.25A3.75 3.75 0 009 1.5H5.625zM7.5 15a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 017.5 15zm.75 2.25a.75.75 0 000 1.5H12a.75.75 0 000-1.5H8.25z" />
        <path d="M12.971 1.816A5.23 5.23 0 0114.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 013.434 1.279 9.768 9.768 0 00-6.963-6.963z" />
      </svg>
    ),
    count: 12,
    href: '/basic-components'
  },
  {
    id: 'navigation', 
    title: '导航组件',
    description: '导航栏、侧边栏、标签页等导航相关组件',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z"/>
        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z"/>
      </svg>
    ),
    count: 8,
    href: '/navigation-components'
  },
  {
    id: 'forms',
    title: '表单组件', 
    description: '输入框、选择器、开关等表单控件',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 003 3h15a3 3 0 01-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125zM12 9.75a.75.75 0 000 1.5h4.5a.75.75 0 000-1.5H12zm-.75-2.25a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75zM6 12.25a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" clipRule="evenodd" />
      </svg>
    ),
    count: 15,
    href: '/form-components'
  },
  {
    id: 'feedback',
    title: '反馈组件',
    description: '警告框、加载状态、进度条等反馈组件',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
      </svg>
    ),
    count: 9,
    href: '/feedback-components'
  },
  {
    id: 'data-display',
    title: '数据展示',
    description: '表格、图表、分页等数据展示组件',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.375 2.25c-1.035 0-1.875.84-1.875 1.875v15.75c0 1.035.84 1.875 1.875 1.875h.75c1.035 0 1.875-.84 1.875-1.875V4.125c0-1.036-.84-1.875-1.875-1.875h-.75zM9.75 8.625c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-.75a1.875 1.875 0 01-1.875-1.875V8.625zM3 13.125c0-1.036.84-1.875 1.875-1.875h.75c1.036 0 1.875.84 1.875 1.875v6.75c0 1.035-.84 1.875-1.875 1.875h-.75A1.875 1.875 0 013 19.875v-6.75z" />
      </svg>
    ),
    count: 11,
    href: '/data-display-components'
  },
  {
    id: 'design-tokens',
    title: '设计令牌',
    description: '颜色、字体、间距等设计系统基础',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M20.599 1.5c-.376 0-.743.111-1.055.32l-5.08 3.385a18.747 18.747 0 00-3.471 2.987 10.04 10.04 0 014.815 4.815 18.748 18.748 0 002.987-3.472l3.386-5.079A1.902 1.902 0 0020.599 1.5zm-8.3 14.025a18.76 18.76 0 001.896-1.207 8.026 8.026 0 00-4.513-4.513A18.75 18.75 0 008.475 11.7l-.278.5a5.26 5.26 0 013.601 3.602l.502-.278zM6.75 13.5A3.75 3.75 0 003 17.25a1.5 1.5 0 01-1.601 1.497.75.75 0 00-.7 1.123 5.25 5.25 0 009.8-2.62 3.75 3.75 0 00-3.75-3.75z" clipRule="evenodd" />
      </svg>
    ),
    count: 5,
    href: '/design-tokens'
  }
]

export function ComponentShowcase({ onNavigate }) {
  const [isSidebarHovered, setIsSidebarHovered] = useState(false)

  const classNames = (...classes) => classes.filter(Boolean).join(' ')
  const handleNavigate = (href) => {
    // 将路径映射到页面名称
    const pageMapping = {
      '/basic-components': 'basic-components',
      '/navigation-components': 'navigation-components', 
      '/form-components': 'form-components',
      '/feedback-components': 'feedback-components',
      '/data-display-components': 'data-display-components',
      '/design-tokens': 'design-tokens'
    }
    const pageName = pageMapping[href] || href
    onNavigate(pageName)
  }

  const handleSidebarNavigate = (target) => {
    if (target === 'design-system') {
      onNavigate('home')
    }
    if (target === 'module-page') {
      onNavigate('module-page')
    }
    setIsSidebarHovered(false)
  }

  return (
    <div className="legacy-demo-shell relative min-h-screen bg-white dark:bg-zinc-900">
      <div
        className="fixed top-1/2 left-0 z-50 flex -translate-y-1/2 items-center"
        onMouseEnter={() => setIsSidebarHovered(true)}
        onMouseLeave={() => setIsSidebarHovered(false)}
      >
        <button
          type="button"
          className="ml-1 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:text-indigo-600"
          aria-label="Open navigation"
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div
          className={classNames(
            'ml-2 origin-left rounded-r-2xl border border-gray-200 bg-white px-4 py-4 shadow-xl transition-all duration-200',
            isSidebarHovered ? 'pointer-events-auto opacity-100 translate-x-0' : 'pointer-events-none opacity-0 -translate-x-4'
          )}
        >
          <nav className="flex flex-col space-y-2 text-sm">
            <button
              type="button"
              onClick={() => handleSidebarNavigate('design-system')}
              className="flex items-center rounded-md px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <span>Kiveiv Design System</span>
            </button>
            <button
              type="button"
              onClick={() => handleSidebarNavigate('module-page')}
              className="flex items-center rounded-md px-3 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-100"
            >
              <span>Kiveiv Module Page</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl dark:bg-zinc-900/80">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center" style={{ marginBottom: '24px' }}>
            <h1 className="font-bold tracking-tight dark:text-white whitespace-nowrap" style={{ color: '#000311', fontSize: '56px' }}>
            Kiveiv Design System 
            </h1>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Component Categories Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {componentCategories.map((category) => (
            <div 
              key={category.id} 
              className="group relative overflow-hidden rounded-lg bg-white border-1 p-6 transition-all duration-200 hover:shadow-lg dark:bg-zinc-800"
              style={{ borderColor: '#E5EAF4' }}
            >
              {/* Icon and Badge */}
              <div className="flex items-start justify-between" style={{ marginBottom: '18px' }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400" style={{ backgroundColor: 'rgb(243, 245, 249)' }}>
                  {category.icon}
                </div>
                <div 
                  className="rounded px-2 py-1 text-xs font-medium"
                  style={{ backgroundColor: 'rgb(228, 237, 253)', color: '#000311' }}
                >
                  {category.count} 组件
                </div>
              </div>
              
              {/* Content */}
              <div style={{ marginBottom: '18px' }}>
                <h3 className="text-lg font-semibold dark:text-white" style={{ marginBottom: '18px', color: '#000311' }}>
                  {category.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {category.description}
                </p>
              </div>
              
              {/* CTA */}
              <div style={{ marginTop: '18px' }}>
                <button 
                  className="inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white transition-colors duration-200 hover:opacity-90"
  style={{ backgroundColor: '#2563eb' }}
                  onClick={() => handleNavigate(category.href)}
                >
                  查看组件
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
    </div>
  )
}
