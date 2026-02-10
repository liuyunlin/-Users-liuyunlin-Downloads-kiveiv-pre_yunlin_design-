import {
  Card, CardHeader, CardContent,
} from '../design-system'

export function FormComponents({ onNavigateHome, onNavigateToStackedLists, onNavigateToTables, onNavigateToGridLists }) {
  
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
            <span className="ml-4 text-sm font-medium text-gray-900">表单组件</span>
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
          {/* 堆叠列表组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToStackedLists}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>堆叠列表</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 堆叠列表预览 - 基础样式 */}
              <div className="bg-white shadow rounded-lg">
                <ul className="divide-y divide-gray-200">
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Calvin Hawkins</div>
                        <div className="text-sm text-gray-500">calvin.hawkins@example.com</div>
                      </div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">Kristen Ramos</div>
                        <div className="text-sm text-gray-500">kristen.ramos@example.com</div>
                      </div>
                    </div>
                  </li>
                  <li className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">Ted Fox</div>
                          <div className="text-sm text-gray-500">ted.fox@example.com</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* 表格组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToTables}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>表格</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 表格预览 - 基础样式 */}
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">姓名</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">职位</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">部门</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">角色</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Jane Cooper</div>
                            <div className="text-sm text-gray-500">jane.cooper@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">区域销售经理</div>
                        <div className="text-sm text-gray-500">销售</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">华东区</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          管理员
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Cody Fisher</div>
                            <div className="text-sm text-gray-500">cody.fisher@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">产品经理</div>
                        <div className="text-sm text-gray-500">产品</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">产品部</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          成员
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 网格列表组件 */}
          <Card 
            className="rounded-lg cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={onNavigateToGridLists}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold" style={{ color: '#000311' }}>网格列表</h2>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">3个样式</span>
                  <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* 网格列表预览 - 联系人卡片样式 */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">张伟</h3>
                        <p className="text-xs text-gray-500">产品经理</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-gray-500">邮箱</div>
                      <div className="text-xs text-gray-900">zhang.wei@example.com</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">李娜</h3>
                        <p className="text-xs text-gray-500">设计师</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-gray-500">邮箱</div>
                      <div className="text-xs text-gray-900">li.na@example.com</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60" alt="" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-gray-900">王强</h3>
                        <p className="text-xs text-gray-500">开发工程师</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="text-xs text-gray-500">邮箱</div>
                      <div className="text-xs text-gray-900">wang.qiang@example.com</div>
                    </div>
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