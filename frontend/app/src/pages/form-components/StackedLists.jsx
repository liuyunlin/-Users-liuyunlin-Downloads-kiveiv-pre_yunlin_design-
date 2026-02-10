import { useState } from 'react'

export function StackedLists({ onNavigateHome, onNavigateToForms }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({
    basic: 'react',
    withActions: 'react', 
    withStatus: 'react'
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
              onClick={onNavigateToForms}
              className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
            >
              表单组件
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <span className="ml-4 text-sm font-medium text-gray-900">堆叠列表</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // 基础堆叠列表
  const renderBasicStackedList = () => {
    const people = [
      {
        name: 'Calvin Hawkins',
        email: 'calvin.hawkins@example.com',
        image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Kristen Ramos',
        email: 'kristen.ramos@example.com',
        image: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Ted Fox',
        email: 'ted.fox@example.com',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Whitney Francis',
        email: 'whitney.francis@example.com',
        image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }
    ]

    return (
      <div className="bg-white shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {people.map((person) => (
            <li key={person.email} className="px-6 py-4">
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{person.name}</div>
                  <div className="text-sm text-gray-500">{person.email}</div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // 带操作按钮的堆叠列表
  const renderStackedListWithActions = () => {
    const teamMembers = [
      {
        id: 1,
        name: 'Jane Cooper',
        email: 'jane.cooper@example.com',
        role: 'Regional Paradigm Technician',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b2913d17?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        id: 2,
        name: 'Cody Fisher',
        email: 'cody.fisher@example.com',
        role: 'Product Directives Officer',
        image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        id: 3,
        name: 'Esther Howard',
        email: 'esther.howard@example.com',
        role: 'Forward Response Developer',
        image: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      }
    ]

    return (
      <div className="bg-white shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {teamMembers.map((member) => (
            <li key={member.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-12 w-12 rounded-full" src={member.image} alt="" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                    <div className="text-sm text-gray-500">{member.role}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                    Edit
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  // 带状态标签的堆叠列表
  const renderStackedListWithStatus = () => {
    const projects = [
      {
        id: 1,
        name: 'GraphQL API',
        description: 'New GraphQL API implementation',
        status: 'active',
        assignee: {
          name: 'Dries Vincent',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        lastUpdated: '2 days ago'
      },
      {
        id: 2,
        name: 'New Dashboard',
        description: 'User dashboard redesign',
        status: 'completed',
        assignee: {
          name: 'Lindsay Walton',
          image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        lastUpdated: '1 week ago'
      },
      {
        id: 3,
        name: 'Mobile App',
        description: 'iOS and Android mobile application',
        status: 'pending',
        assignee: {
          name: 'Courtney Henry',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        lastUpdated: '3 days ago'
      }
    ]

    const getStatusBadge = (status) => {
      const statusStyles = {
        active: 'bg-green-100 text-green-800',
        completed: 'bg-blue-100 text-blue-800',
        pending: 'bg-yellow-100 text-yellow-800'
      }
      
      return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusStyles[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      )
    }

    return (
      <div className="bg-white shadow rounded-lg">
        <ul className="divide-y divide-gray-200">
          {projects.map((project) => (
            <li key={project.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img className="h-10 w-10 rounded-full" src={project.assignee.image} alt="" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{project.name}</div>
                    <div className="text-sm text-gray-500">{project.description}</div>
                    <div className="text-xs text-gray-400">Updated {project.lastUpdated}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  {getStatusBadge(project.status)}
                </div>
              </div>
            </li>
          ))}
        </ul>
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
          <div className="space-y-6">
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
                  'basic': `// 基础堆叠列表组件
export default function BasicStackedList() {
  const people = [
    {
      name: 'Calvin Hawkins',
      email: 'calvin.hawkins@example.com',
      image: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc...',
    },
    // 更多数据...
  ]

  return (
    <div className="bg-white shadow rounded-lg">
      <ul className="divide-y divide-gray-200">
        {people.map((person) => (
          <li key={person.email} className="px-6 py-4">
            <div className="flex items-center">
              <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">{person.name}</div>
                <div className="text-sm text-gray-500">{person.email}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
                  'withActions': `// 带操作按钮的堆叠列表组件
export default function StackedListWithActions() {
  const teamMembers = [
    {
      id: 1,
      name: 'Jane Cooper',
      email: 'jane.cooper@example.com',
      role: 'Regional Paradigm Technician',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b2913d17...',
    },
    // 更多数据...
  ]

  return (
    <div className="bg-white shadow rounded-lg">
      <ul className="divide-y divide-gray-200">
        {teamMembers.map((member) => (
          <li key={member.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img className="h-12 w-12 rounded-full" src={member.image} alt="" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{member.name}</div>
                  <div className="text-sm text-gray-500">{member.email}</div>
                  <div className="text-sm text-gray-500">{member.role}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
                  Edit
                </button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4z..." />
                  </svg>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}`,
                  'withStatus': `// 带状态标签的堆叠列表组件
export default function StackedListWithStatus() {
  const projects = [
    {
      id: 1,
      name: 'GraphQL API',
      description: 'New GraphQL API implementation',
      status: 'active',
      assignee: {
        name: 'Dries Vincent',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d...',
      },
      lastUpdated: '2 days ago'
    },
    // 更多数据...
  ]

  const getStatusBadge = (status) => {
    const statusStyles = {
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    
    return (
      <span className={\`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium \${statusStyles[status]}\`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <ul className="divide-y divide-gray-200">
        {projects.map((project) => (
          <li key={project.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img className="h-10 w-10 rounded-full" src={project.assignee.image} alt="" />
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">{project.name}</div>
                  <div className="text-sm text-gray-500">{project.description}</div>
                  <div className="text-xs text-gray-400">Updated {project.lastUpdated}</div>
                </div>
              </div>
              <div className="flex items-center">
                {getStatusBadge(project.status)}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}`
                };

                const htmlCodes = {
                  'basic': `<!-- 基础堆叠列表 -->
<div class="bg-white shadow rounded-lg">
  <ul class="divide-y divide-gray-200">
    <li class="px-6 py-4">
      <div class="flex items-center">
        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc..." alt="">
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">Calvin Hawkins</div>
          <div class="text-sm text-gray-500">calvin.hawkins@example.com</div>
        </div>
      </div>
    </li>
    <li class="px-6 py-4">
      <div class="flex items-center">
        <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1550525811-e5869dd03032..." alt="">
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">Kristen Ramos</div>
          <div class="text-sm text-gray-500">kristen.ramos@example.com</div>
        </div>
      </div>
    </li>
    <!-- 更多列表项... -->
  </ul>
</div>`,
                  'withActions': `<!-- 带操作按钮的堆叠列表 -->
<div class="bg-white shadow rounded-lg">
  <ul class="divide-y divide-gray-200">
    <li class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img class="h-12 w-12 rounded-full" src="https://images.unsplash.com/photo-1494790108755-2616b2913d17..." alt="">
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">Jane Cooper</div>
            <div class="text-sm text-gray-500">jane.cooper@example.com</div>
            <div class="text-sm text-gray-500">Regional Paradigm Technician</div>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <button class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">Edit</button>
          <button class="text-gray-400 hover:text-gray-600">
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
      </div>
    </li>
    <!-- 更多列表项... -->
  </ul>
</div>`,
                  'withStatus': `<!-- 带状态标签的堆叠列表 -->
<div class="bg-white shadow rounded-lg">
  <ul class="divide-y divide-gray-200">
    <li class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d..." alt="">
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">GraphQL API</div>
            <div class="text-sm text-gray-500">New GraphQL API implementation</div>
            <div class="text-xs text-gray-400">Updated 2 days ago</div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        </div>
      </div>
    </li>
    <li class="px-6 py-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9..." alt="">
          <div class="ml-4">
            <div class="text-sm font-medium text-gray-900">New Dashboard</div>
            <div class="text-sm text-gray-500">User dashboard redesign</div>
            <div class="text-xs text-gray-400">Updated 1 week ago</div>
          </div>
        </div>
        <div class="flex items-center">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Completed
          </span>
        </div>
      </div>
    </li>
    <!-- 更多列表项... -->
  </ul>
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
          {renderComponent('basic', renderBasicStackedList, 'Basic Stacked List')}
          {renderComponent('withActions', renderStackedListWithActions, 'Stacked List with Actions')}
          {renderComponent('withStatus', renderStackedListWithStatus, 'Stacked List with Status')}
        </div>
      </div>
    </div>
  )
}