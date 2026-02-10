import { useState } from 'react'

export function PageHeadings({ onNavigateHome }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})

  // 七种不同的页面标题样式
  const pageHeadingStyles = {
    withMetaAndActions: {
      name: 'With Meta and Actions'
    },
    withActionsOnly: {
      name: 'With Actions Only'
    },
    withBreadcrumbsAndActions: {
      name: 'With Breadcrumbs and Actions'
    },
    withAvatarAndActions: {
      name: 'With Avatar and Actions'
    },
    cardStyleWithStats: {
      name: 'Card Style with Stats'
    },
    withFiltersAndAction: {
      name: 'With Filters and Action'
    },
    withBannerImage: {
      name: 'With Banner Image'
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
            <span className="ml-4 text-sm font-medium text-gray-900">页面标题</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // 生成 React 代码
  const generateReactCode = (style) => {
    switch(style) {
      case 'withMetaAndActions':
        return `export default function WithMetaAndActions() {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Back End Developer
        </h2>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.081 4.492 18 5.608 18 7v11a2 2 0 01-2 2H4a2 2 0 01-2-2V7c0-1.392.92-2.508 2.294-2.607A41.108 41.108 0 016 4.193V3.75zM8.75 2.5a1.25 1.25 0 00-1.25 1.25v.816c.464-.021.928-.035 1.393-.043L8.75 2.5zm2.5 0a1.25 1.25 0 011.25 1.25v.773c.465.008.929.022 1.393.043V3.75a1.25 1.25 0 00-1.25-1.25h-2.5z" clipRule="evenodd" />
            </svg>
            Full-time
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.646 7.584.829.799 1.654 1.381 2.274 1.765a11.12 11.12 0 00.757.433 5.741 5.741 0 00.281.14l.018.008.006.003z" clipRule="evenodd" />
            </svg>
            Remote
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
            </svg>
            Closing on January 9, 2020
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="hidden sm:block">
          <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Edit
          </button>
        </span>
        <span className="ml-3 hidden sm:block">
          <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Publish
          </button>
        </span>
        <span className="sm:ml-3">
          <button type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Apply
          </button>
        </span>
      </div>
    </div>
  )
}`

      case 'withActionsOnly':
        return `export default function WithActionsOnly() {
  return (
    <div className="md:flex md:items-center md:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Job Postings
        </h2>
      </div>
      <div className="mt-4 flex md:ml-4 md:mt-0">
        <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          Share
        </button>
        <button type="button" className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
          Create
        </button>
      </div>
    </div>
  )
}`

      case 'withBreadcrumbsAndActions':
        return `export default function WithBreadcrumbsAndActions() {
  return (
    <div>
      <nav className="flex" aria-label="Breadcrumb">
        <ol role="list" className="flex items-center space-x-4">
          <li>
            <div>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="h-5 w-5 flex-shrink-0 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
              <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Projects</a>
            </div>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="h-5 w-5 flex-shrink-0 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
              <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Project Nero</a>
            </div>
          </li>
        </ol>
      </nav>
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
            Project Nero
          </h2>
        </div>
        <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
          <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Edit
          </button>
          <button type="button" className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Publish
          </button>
        </div>
      </div>
    </div>
  )
}`

      case 'withAvatarAndActions':
        return `export default function WithAvatarAndActions() {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <div className="flex items-center">
          <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          <div className="ml-4">
            <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
              Tom Cook
            </h2>
            <p className="text-sm font-medium leading-6 text-gray-500">Senior Front-End Developer</p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="hidden sm:block">
          <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Edit
          </button>
        </span>
        <span className="ml-3 hidden sm:block">
          <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            View
          </button>
        </span>
        <span className="sm:ml-3">
          <button type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Message
          </button>
        </span>
      </div>
    </div>
  )
}`

      case 'cardStyleWithStats':
        return `export default function CardStyleWithStats() {
  return (
    <div className="bg-white shadow">
      <div className="px-4 py-5 sm:p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">Total Subscribers</dt>
              <dd className="text-lg font-medium text-gray-900">71,897</dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-4 sm:px-6">
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">View all<span className="sr-only"> stats</span></a>
        </div>
      </div>
    </div>
  )
}`

      case 'withFiltersAndAction':
        return `export default function WithFiltersAndAction() {
  return (
    <div className="sm:flex sm:items-center">
      <div className="sm:flex-auto">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Users
        </h2>
        <p className="mt-2 text-sm text-gray-700">
          A list of all the users in your account including their name, title, email and role.
        </p>
      </div>
      <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <select className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
              <option>All</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <button type="button" className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
            Add user
          </button>
        </div>
      </div>
    </div>
  )
}`

      case 'withBannerImage':
        return `export default function WithBannerImage() {
  return (
    <div className="relative">
      <img className="h-32 w-full object-cover lg:h-48" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
      <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
      <div className="relative px-4 py-6 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-gray-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
        </p>
        <div className="mt-4">
          <button type="button" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
            Get started
          </button>
        </div>
      </div>
    </div>
  )
}`

      default:
        return `// Page heading component code example
export default function PageHeading() {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Page Title
        </h2>
      </div>
    </div>
  )
}`
    }
  }

  // 生成 HTML 代码
  const generateHTMLCode = (style) => {
    switch(style) {
      case 'withMetaAndActions':
        return `<div class="lg:flex lg:items-center lg:justify-between">
  <div class="min-w-0 flex-1">
    <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
      Back End Developer
    </h2>
    <div class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.081 4.492 18 5.608 18 7v11a2 2 0 01-2 2H4a2 2 0 01-2-2V7c0-1.392.92-2.508 2.294-2.607A41.108 41.108 0 016 4.193V3.75zM8.75 2.5a1.25 1.25 0 00-1.25 1.25v.816c.464-.021.928-.035 1.393-.043L8.75 2.5zm2.5 0a1.25 1.25 0 011.25 1.25v.773c.465.008.929.022 1.393.043V3.75a1.25 1.25 0 00-1.25-1.25h-2.5z" clip-rule="evenodd" />
        </svg>
        Full-time
      </div>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.646 7.584.829.799 1.654 1.381 2.274 1.765a11.12 11.12 0 00.757.433 5.741 5.741 0 00.281.14l.018.008.006.003z" clip-rule="evenodd" />
        </svg>
        Remote
      </div>
      <div class="mt-2 flex items-center text-sm text-gray-500">
        <svg class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clip-rule="evenodd" />
        </svg>
        Closing on January 9, 2020
      </div>
    </div>
  </div>
  <div class="mt-5 flex lg:ml-4 lg:mt-0">
    <button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      Edit
    </button>
    <button type="button" class="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      Publish
    </button>
    <button type="button" class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
      Apply
    </button>
  </div>
</div>`

      case 'withAvatarAndActions':
        return `<div class="lg:flex lg:items-center lg:justify-between">
  <div class="min-w-0 flex-1">
    <div class="flex items-center">
      <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      <div class="ml-4">
        <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
          Tom Cook
        </h2>
        <p class="text-sm font-medium leading-6 text-gray-500">Senior Front-End Developer</p>
      </div>
    </div>
  </div>
  <div class="mt-5 flex lg:ml-4 lg:mt-0">
    <button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      Edit
    </button>
    <button type="button" class="ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
      View
    </button>
    <button type="button" class="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
      Message
    </button>
  </div>
</div>`

      case 'cardStyleWithStats':
        return `<div class="bg-white shadow">
  <div class="px-4 py-5 sm:p-6">
    <div class="flex items-center">
      <div class="flex-shrink-0">
        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
      </div>
      <div class="ml-5 w-0 flex-1">
        <dl>
          <dt class="text-sm font-medium text-gray-500 truncate">Total Subscribers</dt>
          <dd class="text-lg font-medium text-gray-900">71,897</dd>
        </dl>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 px-4 py-4 sm:px-6">
    <div class="text-sm">
      <a href="#" class="font-medium text-indigo-600 hover:text-indigo-500">View all<span class="sr-only"> stats</span></a>
    </div>
  </div>
</div>`

      case 'withFiltersAndAction':
        return `<div class="sm:flex sm:items-center">
  <div class="sm:flex-auto">
    <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
      Users
    </h2>
    <p class="mt-2 text-sm text-gray-700">
      A list of all the users in your account including their name, title, email and role.
    </p>
  </div>
  <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
    <div class="flex items-center space-x-4">
      <div class="relative">
        <select class="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>
      <button type="button" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
        Add user
      </button>
    </div>
  </div>
</div>`

      case 'withBannerImage':
        return `<div class="relative">
  <img class="h-32 w-full object-cover lg:h-48" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
  <div class="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
  <div class="relative px-4 py-6 sm:px-6 lg:px-8">
    <h2 class="text-xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
      Dashboard
    </h2>
    <p class="mt-1 text-sm text-gray-300">
      Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
    </p>
    <div class="mt-4">
      <button type="button" class="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50">
        Get started
      </button>
    </div>
  </div>
</div>`

      default:
        return `<div class="lg:flex lg:items-center lg:justify-between">
  <div class="min-w-0 flex-1">
    <h2 class="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
      Page Title
    </h2>
  </div>
</div>`
    }
  }

  // 渲染页面标题预览 - 直接展示，不套容器
  const renderPageHeadingPreview = (style) => {
    switch(style) {
      case 'withMetaAndActions':
        return (
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                Back End Developer
              </h2>
              <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M6 3.75A2.75 2.75 0 018.75 1h2.5A2.75 2.75 0 0114 3.75v.443c.572.055 1.14.122 1.706.2C17.081 4.492 18 5.608 18 7v11a2 2 0 01-2 2H4a2 2 0 01-2-2V7c0-1.392.92-2.508 2.294-2.607A41.108 41.108 0 016 4.193V3.75zM8.75 2.5a1.25 1.25 0 00-1.25 1.25v.816c.464-.021.928-.035 1.393-.043L8.75 2.5zm2.5 0a1.25 1.25 0 011.25 1.25v.773c.465.008.929.022 1.393.043V3.75a1.25 1.25 0 00-1.25-1.25h-2.5z" clipRule="evenodd" />
                  </svg>
                  Full-time
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.646 7.584.829.799 1.654 1.381 2.274 1.765a11.12 11.12 0 00.757.433 5.741 5.741 0 00.281.14l.018.008.006.003z" clipRule="evenodd" />
                  </svg>
                  Remote
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <svg className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z" clipRule="evenodd" />
                  </svg>
                  Closing on January 9, 2020
                </div>
              </div>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                  </svg>
                  Edit
                </button>
              </span>
              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <svg className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                  </svg>
                  Publish
                </button>
              </span>
              <span className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg className="-ml-0.5 mr-1.5 h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.236 4.53L8.53 10.96a.75.75 0 00-1.06 1.061l1.5 1.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  Apply
                </button>
              </span>
            </div>
          </div>
        )

      case 'withActionsOnly':
        return (
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                Job Postings
              </h2>
            </div>
            <div className="mt-4 flex md:ml-4 md:mt-0">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Share
              </button>
              <button
                type="button"
                className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create
              </button>
            </div>
          </div>
        )

      case 'withBreadcrumbsAndActions':
        return (
          <div>
            <nav className="flex" aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-4">
                <li>
                  <div>
                    <a href="#" className="text-gray-400 hover:text-gray-500">
                      <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z" clipRule="evenodd" />
                      </svg>
                      <span className="sr-only">Home</span>
                    </a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                    <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">Projects</a>
                  </div>
                </li>
                <li>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 flex-shrink-0 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                    </svg>
                    <a href="#" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page">Project Nero</a>
                  </div>
                </li>
              </ol>
            </nav>
            <div className="mt-2 md:flex md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                  Project Nero
                </h2>
              </div>
              <div className="mt-4 flex flex-shrink-0 md:ml-4 md:mt-0">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Publish
                </button>
              </div>
            </div>
          </div>
        )

      case 'withAvatarAndActions':
        return (
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <div className="flex items-center">
                <img className="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                <div className="ml-4">
                  <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                    Tom Cook
                  </h2>
                  <p className="text-sm font-medium leading-6 text-gray-500">Senior Front-End Developer</p>
                </div>
              </div>
            </div>
            <div className="mt-5 flex lg:ml-4 lg:mt-0">
              <span className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Edit
                </button>
              </span>
              <span className="ml-3 hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  View
                </button>
              </span>
              <span className="sm:ml-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Message
                </button>
              </span>
            </div>
          </div>
        )

      case 'cardStyleWithStats':
        return (
          <div className="bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Subscribers</dt>
                    <dd className="text-lg font-medium text-gray-900">71,897</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-4 sm:px-6">
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">View all<span className="sr-only"> stats</span></a>
              </div>
            </div>
          </div>
        )

      case 'withFiltersAndAction':
        return (
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                Users
              </h2>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name, title, email and role.
              </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <select className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500">
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add user
                </button>
              </div>
            </div>
          </div>
        )

      case 'withBannerImage':
        return (
          <div className="relative">
            <img className="h-32 w-full object-cover lg:h-48" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="" />
            <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
            <div className="relative px-4 py-6 sm:px-6 lg:px-8">
              <h2 className="text-xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
                Dashboard
              </h2>
              <p className="mt-1 text-sm text-gray-300">
                Lorem ipsum dolor sit amet consectetur adipisicing elit quam corrupti consectetur.
              </p>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
                >
                  Get started
                </button>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold leading-7 text-gray-900 sm:truncate sm:text-2xl sm:tracking-tight">
                Page Title
              </h2>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div>
          {Object.entries(pageHeadingStyles).map(([key, style]) => (
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
                  // 根据组件是否有背景决定是否需要容器
                  (key === 'cardStyleWithStats' || key === 'withBannerImage') ? (
                    <div className="space-y-6">
                      {/* 有背景的组件不需要额外容器 */}
                      {renderPageHeadingPreview(key)}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      {/* 无背景的组件需要容器 */}
                      {renderPageHeadingPreview(key)}
                    </div>
                  )
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