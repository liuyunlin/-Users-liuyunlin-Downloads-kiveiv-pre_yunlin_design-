import {
  Button,
  Card, CardHeader, CardContent,
} from '../design-system'

export function BasicComponents({ onNavigateHome, onNavigateToPageHeadings, onNavigateToCardHeadings, onNavigateToSectionHeadings, onNavigateToInputGroups, onNavigateToSelectMenus, onNavigateToSignInForms, onNavigateToRadioGroups, onNavigateToCheckboxes, onNavigateToToggles, onNavigateToUploads }) {

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
            <span className="ml-4 text-sm font-medium text-gray-900">基础组件</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  return (
    <div className="legacy-demo-shell min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div className="space-y-9">
          {/* 输入组组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToInputGroups}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>输入组</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 输入组预览 - Input with icon 样式 */}
              <div className="max-w-md">
                <label htmlFor="email-preview" className="block text-sm font-medium leading-6 text-gray-900">
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
                    id="email-preview"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 选择菜单组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToSelectMenus}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>选择菜单</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 选择菜单预览 - Custom select 样式 */}
              <div className="max-w-md">
                <label htmlFor="assigned-to" className="block text-sm font-medium leading-6 text-gray-900">
                  Assigned to
                </label>
                <div className="mt-2 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    </div>
                    <input
                      type="text"
                      name="assigned-to"
                      id="assigned-to"
                      className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-8 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value="Wade Cooper (Online)"
                      readOnly
                    />
                  </div>
                  <button
                    type="button"
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 页面标题组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToPageHeadings}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>页面标题</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">7个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  {/* 页面标题预览 - 使用 Tailwind 官方样式，无装饰容器 */}
                  <div className="lg:flex lg:items-center lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
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
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 卡片标题组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToCardHeadings}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>卡片标题</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 卡片标题预览 - 预览页样式，无圆角矩形 */}
              <div className="sm:flex sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-base font-semibold leading-6 text-gray-900">
                    Team Members
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Manage who has access to your account.
                  </p>
                </div>
                <div className="mt-4 sm:ml-6 sm:mt-0 sm:flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add member
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>


          {/* 登陆与注册组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToSignInForms}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>登陆与注册</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">2个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 登陆表单预览 */}
              <div className="flex min-h-full flex-1 flex-col justify-center py-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                  <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                      <div className="mx-auto h-12 w-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">DC</span>
                      </div>
                      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to your account
                      </h2>
                      <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                          start your 14-day free trial
                        </a>
                      </p>
                    </div>

                    <div className="mt-8">
                      <div className="mt-6">
                        <form className="space-y-6" action="#" method="POST">
                          <div>
                            <label htmlFor="signin-email" className="block text-sm font-medium text-gray-700">
                              Email address
                            </label>
                            <div className="mt-1">
                              <input
                                id="signin-email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700">
                              Password
                            </label>
                            <div className="mt-1">
                              <input
                                id="signin-password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              />
                            </div>
                          </div>

                          <div>
                            <button
                              type="submit"
                              className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                              Sign in
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 单选框组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToRadioGroups}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>单选框</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 单选框预览 - 简单列表样式 */}
              <fieldset className="max-w-md">
                <legend className="text-sm font-medium leading-6 text-gray-900">Privacy setting</legend>
                <div className="mt-6 space-y-6">
                  <div className="flex items-center">
                    <input
                      id="privacy-public"
                      name="privacy"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="privacy-public" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                      Public access
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="privacy-private"
                      name="privacy"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="privacy-private" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                      Private to project members
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="privacy-restricted"
                      name="privacy"
                      type="radio"
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="privacy-restricted" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                      Restricted access
                    </label>
                  </div>
                </div>
              </fieldset>
            </CardContent>
          </Card>

          {/* 章节标题组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToSectionHeadings}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>章节标题</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">5个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 章节标题预览 - 带徽章和操作样式 */}
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
            </CardContent>
          </Card>

          {/* 复选框组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToCheckboxes}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>复选框</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <fieldset>
                <legend className="text-sm font-medium leading-6 text-gray-900">By email</legend>
                <div className="mt-4 space-y-4">
                  <div className="flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="preview-comments"
                        name="preview-comments"
                        type="checkbox"
                        defaultChecked
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="preview-comments" className="font-medium text-gray-900">
                        Comments
                      </label>
                      <p className="text-gray-500">Get notified when someone posts a comment.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex h-6 items-center">
                      <input
                        id="preview-offers"
                        name="preview-offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label htmlFor="preview-offers" className="font-medium text-gray-900">
                        Offers
                      </label>
                      <p className="text-gray-500">Know when a candidate accepts an offer.</p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </CardContent>
          </Card>

          {/* 切换组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToToggles}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>切换组件</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">Automatic updates</p>
                  <p className="mt-1 text-sm text-gray-500">Keep this workspace up to date automatically.</p>
                </div>
                <button
                  type="button"
                  className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  role="switch"
                  aria-checked="true"
                >
                  <span className="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" aria-hidden="true"></span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* 上传组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToUploads}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>上传组件</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-8">
                <div className="text-center">
                  <svg className="mx-auto h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v12" />
                  </svg>
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <span className="font-semibold text-indigo-600">Upload a file</span>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}
