import { useState } from 'react'

export function SectionHeadings({ onNavigateHome }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})

  // 五种不同的章节标题样式
  const sectionHeadingStyles = {
    withTabsAndActions: {
      name: 'With Tabs and Actions'
    },
    withBadgeAndDropdown: {
      name: 'With Badge and Dropdown'
    },
    withDescriptionAndAction: {
      name: 'With Description and Action'
    },
    withMetadataAndActions: {
      name: 'With Metadata and Actions'
    },
    compactWithInlineActions: {
      name: 'Compact with Inline Actions'
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
              基础组件
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <span className="ml-4 text-sm font-medium text-gray-900">章节标题</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // 生成 React 代码
  const generateReactCode = (style) => {
    switch(style) {
      case 'withTabsAndActions':
        return `export default function WithTabsAndActions() {
  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Project Settings
        </h2>
        <div className="flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Share
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Create
          </button>
        </div>
      </div>
      <div className="mt-4">
        <nav className="flex space-x-8">
          <a
            href="#"
            className="border-indigo-500 text-indigo-600 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium"
          >
            General
          </a>
          <a
            href="#"
            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium"
          >
            Billing
          </a>
        </nav>
      </div>
    </div>
  )
}`

      case 'withBadgeAndDropdown':
        return `export default function WithBadgeAndDropdown() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="flex items-center">
          <h2 className="text-xl font-semibold leading-6 text-gray-900">
            Team Members
          </h2>
          <span className="ml-3 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
            12 Active
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Manage your team members and their account permissions here.
        </p>
      </div>
      <div className="relative">
        <button
          type="button"
          className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Options
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  )
}`

      case 'withDescriptionAndAction':
        return `export default function WithDescriptionAndAction() {
  return (
    <div className="sm:flex sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Analytics Dashboard
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Track your website performance and user engagement metrics in real-time.
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
        >
          View Report
        </button>
      </div>
    </div>
  )
}`

      case 'withMetadataAndActions':
        return `export default function WithMetadataAndActions() {
  return (
    <div className="border-b border-gray-200 pb-5">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold leading-6 text-gray-900">
            Content Library
          </h2>
          <div className="mt-1 flex items-center text-sm text-gray-500">
            <span>Last updated: 2 hours ago</span>
            <span className="mx-2">•</span>
            <span>24 items</span>
            <span className="mx-2">•</span>
            <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
              Needs Review
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Sort
          </button>
          <button
            type="button"
            className="inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Add Content
          </button>
        </div>
      </div>
    </div>
  )
}`

      case 'compactWithInlineActions':
        return `export default function CompactWithInlineActions() {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 pb-3">
      <div className="flex items-center space-x-3">
        <h2 className="text-lg font-medium text-gray-900">
          Recent Activity
        </h2>
        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
          Live
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          className="rounded-md p-1.5 text-gray-400 hover:text-gray-500"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
        <button
          type="button"
          className="rounded-md p-1.5 text-gray-400 hover:text-gray-500"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}`

      default:
        return `// Section heading component code example
export default function SectionHeading() {
  return (
    <div className="border-b border-gray-200 pb-5">
      <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
        Section Title
      </h2>
    </div>
  )
}`
    }
  }

  // 生成 HTML 代码
  const generateHTMLCode = (style) => {
    switch(style) {
      case 'withTabsAndActions':
        return `<div class="border-b border-gray-200 pb-5">
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
      Project Settings
    </h2>
    <div class="flex space-x-3">
      <button
        type="button"
        class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Share
      </button>
      <button
        type="button"
        class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
      >
        Create
      </button>
    </div>
  </div>
  <div class="mt-4">
    <nav class="flex space-x-8">
      <a
        href="#"
        class="border-indigo-500 text-indigo-600 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium"
      >
        General
      </a>
      <a
        href="#"
        class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium"
      >
        Team
      </a>
      <a
        href="#"
        class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium"
      >
        Billing
      </a>
    </nav>
  </div>
</div>`

      case 'withBadgeAndDropdown':
        return `<div class="flex items-center justify-between">
  <div>
    <div class="flex items-center">
      <h2 class="text-xl font-semibold leading-6 text-gray-900">
        Team Members
      </h2>
      <span class="ml-3 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
        12 Active
      </span>
    </div>
    <p class="mt-2 text-sm text-gray-500">
      Manage your team members and their account permissions here.
    </p>
  </div>
  <div class="relative">
    <button
      type="button"
      class="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
    >
      Options
      <svg class="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>
</div>`

      case 'withDescriptionAndAction':
        return `<div class="sm:flex sm:items-center sm:justify-between">
  <div>
    <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
      Analytics Dashboard
    </h2>
    <p class="mt-2 text-sm text-gray-500">
      Track your website performance and user engagement metrics in real-time.
    </p>
  </div>
  <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
    <button
      type="button"
      class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
    >
      View Report
    </button>
  </div>
</div>`

      case 'withMetadataAndActions':
        return `<div class="border-b border-gray-200 pb-5">
  <div class="flex items-start justify-between">
    <div>
      <h2 class="text-xl font-semibold leading-6 text-gray-900">
        Content Library
      </h2>
      <div class="mt-1 flex items-center text-sm text-gray-500">
        <span>Last updated: 2 hours ago</span>
        <span class="mx-2">•</span>
        <span>24 items</span>
        <span class="mx-2">•</span>
        <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
          Needs Review
        </span>
      </div>
    </div>
    <div class="flex space-x-3">
      <button
        type="button"
        class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Filter
      </button>
      <button
        type="button"
        class="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        Sort
      </button>
      <button
        type="button"
        class="inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
      >
        Add Content
      </button>
    </div>
  </div>
</div>`

      case 'compactWithInlineActions':
        return `<div class="flex items-center justify-between border-b border-gray-200 pb-3">
  <div class="flex items-center space-x-3">
    <h2 class="text-lg font-medium text-gray-900">
      Recent Activity
    </h2>
    <span class="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
      Live
    </span>
  </div>
  <div class="flex items-center space-x-2">
    <button
      type="button"
      class="rounded-md p-1.5 text-gray-400 hover:text-gray-500"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    </button>
    <button
      type="button"
      class="rounded-md p-1.5 text-gray-400 hover:text-gray-500"
    >
      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
      </svg>
    </button>
  </div>
</div>`

      default:
        return `<div class="border-b border-gray-200 pb-5">
  <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
    Section Title
  </h2>
</div>`
    }
  }

  // 渲染章节标题预览
  const renderSectionHeadingPreview = (style) => {
    switch(style) {
      case 'withTabsAndActions':
        return (
          <div className="border-b border-gray-200 pb-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                Project Settings
              </h2>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Share
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </button>
              </div>
            </div>
            <div className="mt-4">
              <nav className="flex space-x-8">
                <a
                  href="#"
                  className="border-indigo-500 text-indigo-600 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium"
                >
                  General
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium"
                >
                  Team
                </a>
                <a
                  href="#"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 whitespace-nowrap border-b-2 py-2 px-1 text-sm font-medium"
                >
                  Billing
                </a>
              </nav>
            </div>
          </div>
        )

      case 'withBadgeAndDropdown':
        return (
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center">
                <h2 className="text-xl font-semibold leading-6 text-gray-900">
                  Team Members
                </h2>
                <span className="ml-3 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                  12 Active
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Manage your team members and their account permissions here.
              </p>
            </div>
            <div className="relative">
              <button
                type="button"
                className="inline-flex items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Options
                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )

      case 'withDescriptionAndAction':
        return (
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                Analytics Dashboard
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Track your website performance and user engagement metrics in real-time.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                View Report
              </button>
            </div>
          </div>
        )

      case 'withMetadataAndActions':
        return (
          <div className="border-b border-gray-200 pb-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold leading-6 text-gray-900">
                  Content Library
                </h2>
                <div className="mt-1 flex items-center text-sm text-gray-500">
                  <span>Last updated: 2 hours ago</span>
                  <span className="mx-2">•</span>
                  <span>24 items</span>
                  <span className="mx-2">•</span>
                  <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                    Needs Review
                  </span>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Filter
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Sort
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Content
                </button>
              </div>
            </div>
          </div>
        )

      case 'compactWithInlineActions':
        return (
          <div className="flex items-center justify-between border-b border-gray-200 pb-3">
            <div className="flex items-center space-x-3">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Activity
              </h2>
              <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-medium text-blue-800">
                Live
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                className="rounded-md p-1.5 text-gray-400 hover:text-gray-500"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
              <button
                type="button"
                className="rounded-md p-1.5 text-gray-400 hover:text-gray-500"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
              </button>
            </div>
          </div>
        )

      default:
        return (
          <div className="border-b border-gray-200 pb-5">
            <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
              Section Title
            </h2>
          </div>
        )
    }
  }

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div>
          {Object.entries(sectionHeadingStyles).map(([key, style]) => (
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
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    {/* 章节标题组件需要容器支撑 */}
                    {renderSectionHeadingPreview(key)}
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