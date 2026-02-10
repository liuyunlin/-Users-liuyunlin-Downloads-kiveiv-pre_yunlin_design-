import {
  Card, CardHeader, CardContent,
  Badge
} from '../design-system'

export function NavigationComponents({ onNavigateHome, onNavigateToTopNav, onNavigateToSidebar }) {

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
            <span className="ml-4 text-sm font-medium text-gray-900">导航组件</span>
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

          {/* 侧边栏导航 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToSidebar}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>侧边栏导航</h2>
                <div className="flex items-center gap-2">
                  <Badge color="blue">6个样式</Badge>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  {/* Tailwind Official Sidebar Preview */}
                  <div className="border border-zinc-200 rounded-lg bg-white overflow-hidden max-w-sm" style={{minHeight: '550px'}}>
                    <div className="flex min-h-0 flex-1">
                      <div className="flex flex-1 flex-col overflow-y-auto">
                        <div className="flex items-center flex-shrink-0 px-4 py-4 bg-gray-900">
                          <svg className="h-8 w-auto text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                          </svg>
                          <span className="ml-2 text-lg font-semibold text-white">Your Company</span>
                        </div>
                        <nav className="flex-1 space-y-1 bg-gray-900 px-2 py-4">
                          <a href="#" className="bg-gray-700 text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                            <svg className="text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                            Dashboard
                          </a>

                          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                            <svg className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                            </svg>
                            Team
                          </a>

                          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                            <svg className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                            </svg>
                            Projects
                          </a>

                          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                            <svg className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                            </svg>
                            Calendar
                          </a>

                          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                            <svg className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                            </svg>
                            Documents
                          </a>

                          <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                            <svg className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                            </svg>
                            Reports
                          </a>
                        </nav>

                        {/* Teams section */}
                        <div className="bg-gray-900 px-2 pb-2">
                          <div className="space-y-1">
                            <div className="px-2 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                              Your teams
                            </div>
                            
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                              <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-gray-700 text-gray-400 bg-gray-800 text-[0.625rem] font-medium">
                                H
                              </span>
                              <span className="truncate">Heroicons</span>
                            </a>
                            
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                              <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-gray-700 text-gray-400 bg-gray-800 text-[0.625rem] font-medium">
                                T
                              </span>
                              <span className="truncate">Tailwind Labs</span>
                            </a>
                            
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                              <span className="mr-3 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border border-gray-700 text-gray-400 bg-gray-800 text-[0.625rem] font-medium">
                                W
                              </span>
                              <span className="truncate">Workcation</span>
                            </a>
                          </div>
                        </div>

                        {/* Settings section */}
                        <div className="bg-gray-900 px-2 pb-4 border-t border-gray-700">
                          <div className="pt-2">
                            <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center rounded-md px-2 py-2 text-sm font-medium">
                              <svg className="text-gray-400 group-hover:text-gray-300 mr-3 flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              Settings
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 顶部导航 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToTopNav}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>顶部导航</h2>
                <div className="flex items-center gap-2">
                  <Badge color="blue">3个样式</Badge>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="border border-zinc-200 rounded-lg overflow-hidden bg-white max-w-4xl">
                    <nav className="bg-white border-b border-gray-200 min-w-max">
                      <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{minWidth: '900px'}}>
                        <div className="flex h-16 justify-between">
                          <div className="flex">
                            <div className="flex flex-shrink-0 items-center">
                              <div className="flex items-center">
                                <svg className="h-8 w-8 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                                </svg>
                                <span className="ml-2 text-lg font-semibold text-gray-900">Your Company</span>
                              </div>
                            </div>
                            <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                              <a href="#" className="text-indigo-600 border-indigo-500 text-gray-900 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium" aria-current="page">
                                Dashboard
                              </a>
                              <a href="#" className="text-gray-900 border-transparent hover:border-gray-300 hover:text-gray-900 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                                Team
                              </a>
                              <a href="#" className="text-gray-900 border-transparent hover:border-gray-300 hover:text-gray-900 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                                Projects
                              </a>
                              <a href="#" className="text-gray-900 border-transparent hover:border-gray-300 hover:text-gray-900 inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium">
                                Calendar
                              </a>
                            </div>
                          </div>
                          <div className="hidden sm:ml-6 sm:flex sm:items-center">
                            <button type="button" className="text-gray-900 hover:text-gray-900 rounded-full p-1 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                              <span className="sr-only">View notifications</span>
                              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                              </svg>
                            </button>
                            <div className="relative ml-3">
                              <button type="button" className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                <span className="sr-only">Open user menu</span>
                                <img className="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}