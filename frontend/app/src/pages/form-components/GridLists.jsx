import { useState } from 'react'

export function GridLists({ onNavigateHome, onNavigateToForms }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({
    contactCards: 'react',
    logosCards: 'react',
    contactCardsDark: 'react'
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
            <span className="ml-4 text-sm font-medium text-gray-900">网格列表</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // Contact cards with small portraits
  const renderContactCards = () => {
    const contacts = [
      {
        id: 1,
        name: 'Jane Cooper',
        title: 'Regional Paradigm Technician',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 2,
        name: 'Cody Fisher',
        title: 'Product Directives Officer',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 3,
        name: 'Esther Howard',
        title: 'Forward Response Developer',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 4,
        name: 'Jenny Wilson',
        title: 'Central Security Manager',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 5,
        name: 'Kristin Watson',
        title: 'Lead Implementation Liaison',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 6,
        name: 'Cameron Williamson',
        title: 'Internal Applications Engineer',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]

    return (
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {contacts.map((contact) => (
          <li key={contact.id} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
            <div className="flex flex-1 flex-col p-8">
              <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={contact.image} alt="" />
              <h3 className="mt-6 text-sm font-medium text-gray-900">{contact.name}</h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only">Title</dt>
                <dd className="text-sm text-gray-500">{contact.title}</dd>
                <dt className="sr-only">Role</dt>
                <dd className="mt-3">
                  <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                    {contact.role}
                  </span>
                </dd>
              </dl>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex w-0 flex-1">
                  <a
                    href={`mailto:${contact.name.toLowerCase().replace(' ', '.')}@example.com`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm2 0v12h10V4H5z" />
                    </svg>
                    Email
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={`tel:+1-555-${Math.random().toString().substring(2, 8)}`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                    </svg>
                    Call
                  </a>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  // Logos cards with description list
  const renderLogosCards = () => {
    const companies = [
      {
        id: 1,
        name: 'Tuple',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzU0NTVGRiIvPgo8cGF0aCBkPSJNMTMuMzMzMyAxMy4zMzMzSDE5LjMzMzNWMTlIMTMuMzMzM1YxMy4zMzMzWk0yMC42NjY3IDEzLjMzMzNIMjYuNjY2N1YxOS4zMzMzSDIwLjY2NjdWMTMuMzMzM1pNMTMuMzMzMyAyMC42NjY3SDE5LjMzMzNWMjYuNjY2N0gxMy4zMzMzVjIwLjY2NjdaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
        lastInvoice: 'December 13, 2022',
        amount: '$2,000.00',
        status: 'Overdue'
      },
      {
        id: 2,
        name: 'SavvyCal',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iI0Y5NzMxNiIvPgo8cGF0aCBkPSJNMjAuMDAwMiAxMkMxNi42ODY1IDEyIDEzLjk5OTggMTQuNjg2OCAxMy45OTk4IDE4QzEzLjk5OTggMjEuMzEzNyAxNi42ODY1IDI0IDIwLjAwMDIgMjRDMjMuMzEzOCAyNCAyNi4wMDAyIDIxLjMxMzcgMjYuMDAwMiAxOEMyNi4wMDAyIDE0LjY4NjggMjMuMzEzOCAxMiAyMC4wMDAyIDEyWk0yMC4wMDAyIDIyQzE3Ljc5MDkgMjIgMTUuOTk5OCAyMC4yMDkxIDE1Ljk5OTggMThDMTUuOTk5OCAxNS43OTA5IDE3Ljc5MDkgMTQgMjAuMDAwMiAxNEMyMi4yMDk0IDE0IDI0LjAwMDIgMTUuNzkwOSAyNC4wMDAyIDE4QzI0LjAwMDIgMjAuMjA5MSAyMi4yMDk0IDIyIDIwLjAwMDIgMjJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K',
        lastInvoice: 'January 22, 2023',
        amount: '$14,000.00',
        status: 'Paid'
      },
      {
        id: 3,
        name: 'Reform',
        logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzAwMCIvPgo8cGF0aCBkPSJNMTIgMTJIMjhWMjRIMjZWMTRIMTJWMTJaTTE2IDE2SDI0VjI4SDE2VjE2WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+',
        lastInvoice: 'January 23, 2023', 
        amount: '$7,600.00',
        status: 'Paid'
      }
    ]

    return (
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((company) => (
          <li key={company.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <h3 className="truncate text-sm font-medium text-gray-900">{company.name}</h3>
                </div>
              </div>
              <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={company.logo} alt="" />
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="flex flex-1 flex-col p-6">
                  <dl className="space-y-3">
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Last invoice</dt>
                      <dd className="text-sm text-gray-900">{company.lastInvoice}</dd>
                    </div>
                    <div>
                      <dt className="text-sm font-medium text-gray-500">Amount</dt>
                      <dd className="flex items-center">
                        <span className="text-sm font-medium text-gray-900">{company.amount}</span>
                        <span className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          company.status === 'Paid' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {company.status}
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  // Contact cards (Dark theme)
  const renderContactCardsDark = () => {
    const contacts = [
      {
        id: 1,
        name: 'Jane Cooper',
        title: 'Paradigm Representative',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 2,
        name: 'Cody Fisher',
        title: 'Lead Security Associate',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 3,
        name: 'Esther Howard',
        title: 'Assurance Administrator',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 4,
        name: 'Jenny Wilson',
        title: 'Chief Accountability Analyst',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]

    return (
      <div className="bg-gray-900 p-8 rounded-lg">
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {contacts.map((contact) => (
            <li key={contact.id} className="col-span-1 divide-y divide-gray-700 rounded-lg bg-gray-800 shadow">
              <div className="flex w-full items-center justify-between space-x-6 p-6">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <img className="h-20 w-20 flex-shrink-0 rounded-full" src={contact.image} alt="" />
                  </div>
                  <div className="mt-4 space-y-1">
                    <h3 className="truncate text-sm font-medium text-white">{contact.name}</h3>
                    <p className="truncate text-sm text-gray-300">{contact.title}</p>
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      {contact.role}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-700">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${contact.name.toLowerCase().replace(' ', '.')}@example.com`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:text-white"
                    >
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm2 0v12h10V4H5z" />
                      </svg>
                      Email
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`tel:+1-555-${Math.random().toString().substring(2, 8)}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:text-white"
                    >
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5 1.5 0 011.465 1.175l.716 3.223a1.5 1.5 0 01-1.052 1.767l-.933.267c-.41.117-.643.555-.48.95a11.542 11.542 0 006.254 6.254c.395.163.833-.07.95-.48l.267-.933a1.5 1.5 0 011.767-1.052l3.223.716A1.5 1.5 0 0118 15.352V16.5a1.5 1.5 0 01-1.5 1.5H15c-1.149 0-2.263-.15-3.326-.43A13.022 13.022 0 012.43 8.326 13.019 13.019 0 012 5V3.5z" clipRule="evenodd" />
                      </svg>
                      Call
                    </a>
                  </div>
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
                      'contactCards': `// Contact cards with small portraits
export default function ContactCards() {
  const contacts = [
    {
      id: 1,
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      role: 'Admin',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786...'
    },
    // 更多联系人数据...
  ]

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {contacts.map((contact) => (
        <li key={contact.id} className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={contact.image} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{contact.name}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Title</dt>
              <dd className="text-sm text-gray-500">{contact.title}</dd>
              <dt className="sr-only">Role</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  {contact.role}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <a
                  href={\`mailto:\${contact.name.toLowerCase().replace(' ', '.')}@example.com\`}
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-gray-600"
                >
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm2 0v12h10V4H5z" />
                  </svg>
                  Email
                </a>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <a
                  href={\`tel:+1-555-\${Math.random().toString().substring(2, 8)}\`}
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-gray-600"
                >
                  <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5..." clipRule="evenodd" />
                  </svg>
                  Call
                </a>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}`,
                      'logosCards': `// Logos cards with description list
export default function LogosCards() {
  const companies = [
    {
      id: 1,
      name: 'Tuple',
      logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAi...',
      lastInvoice: 'December 13, 2022',
      amount: '$2,000.00',
      status: 'Overdue'
    },
    // 更多公司数据...
  ]

  return (
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {companies.map((company) => (
        <li key={company.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
          <div className="flex w-full items-center justify-between space-x-6 p-6">
            <div className="flex-1 truncate">
              <div className="flex items-center space-x-3">
                <h3 className="truncate text-sm font-medium text-gray-900">{company.name}</h3>
              </div>
            </div>
            <img className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src={company.logo} alt="" />
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex flex-1 flex-col p-6">
                <dl className="space-y-3">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Last invoice</dt>
                    <dd className="text-sm text-gray-900">{company.lastInvoice}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Amount</dt>
                    <dd className="flex items-center">
                      <span className="text-sm font-medium text-gray-900">{company.amount}</span>
                      <span className={\`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium \${
                        company.status === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }\`}>
                        {company.status}
                      </span>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}`,
                      'contactCardsDark': `// Contact cards (Dark theme)
export default function ContactCardsDark() {
  const contacts = [
    {
      id: 1,
      name: 'Jane Cooper',
      title: 'Paradigm Representative',
      role: 'Admin',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786...'
    },
    // 更多联系人数据...
  ]

  return (
    <div className="bg-gray-900 p-8 rounded-lg">
      <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {contacts.map((contact) => (
          <li key={contact.id} className="col-span-1 divide-y divide-gray-700 rounded-lg bg-gray-800 shadow">
            <div className="flex w-full items-center justify-between space-x-6 p-6">
              <div className="flex-1 truncate">
                <div className="flex items-center space-x-3">
                  <img className="h-20 w-20 flex-shrink-0 rounded-full" src={contact.image} alt="" />
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="truncate text-sm font-medium text-white">{contact.name}</h3>
                  <p className="truncate text-sm text-gray-300">{contact.title}</p>
                  <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                    {contact.role}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div className="-mt-px flex divide-x divide-gray-700">
                <div className="flex w-0 flex-1">
                  <a
                    href={\`mailto:\${contact.name.toLowerCase().replace(' ', '.')}@example.com\`}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm2 0v12h10V4H5z" />
                    </svg>
                    Email
                  </a>
                </div>
                <div className="-ml-px flex w-0 flex-1">
                  <a
                    href={\`tel:+1-555-\${Math.random().toString().substring(2, 8)}\`}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:text-white"
                  >
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5..." clipRule="evenodd" />
                    </svg>
                    Call
                  </a>
                </div>
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
                      'contactCards': `<!-- Contact cards with small portraits -->
<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
  <li class="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow">
    <div class="flex flex-1 flex-col p-8">
      <img class="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src="https://images.unsplash.com/photo-1494790108755-2616b612b786..." alt="">
      <h3 class="mt-6 text-sm font-medium text-gray-900">Jane Cooper</h3>
      <dl class="mt-1 flex flex-grow flex-col justify-between">
        <dt class="sr-only">Title</dt>
        <dd class="text-sm text-gray-500">Regional Paradigm Technician</dd>
        <dt class="sr-only">Role</dt>
        <dd class="mt-3">
          <span class="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            Admin
          </span>
        </dd>
      </dl>
    </div>
    <div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="flex w-0 flex-1">
          <a href="mailto:jane.cooper@example.com" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-gray-600">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm2 0v12h10V4H5z" />
            </svg>
            Email
          </a>
        </div>
        <div class="-ml-px flex w-0 flex-1">
          <a href="tel:+1-555-123456" class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:text-gray-600">
            <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5..." clip-rule="evenodd" />
            </svg>
            Call
          </a>
        </div>
      </div>
    </div>
  </li>
  <!-- 更多联系人卡片... -->
</ul>`,
                      'logosCards': `<!-- Logos cards with description list -->
<ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  <li class="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow">
    <div class="flex w-full items-center justify-between space-x-6 p-6">
      <div class="flex-1 truncate">
        <div class="flex items-center space-x-3">
          <h3 class="truncate text-sm font-medium text-gray-900">Tuple</h3>
        </div>
      </div>
      <img class="h-10 w-10 flex-shrink-0 rounded-full bg-gray-300" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAi..." alt="">
    </div>
    <div>
      <div class="-mt-px flex divide-x divide-gray-200">
        <div class="flex flex-1 flex-col p-6">
          <dl class="space-y-3">
            <div>
              <dt class="text-sm font-medium text-gray-500">Last invoice</dt>
              <dd class="text-sm text-gray-900">December 13, 2022</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Amount</dt>
              <dd class="flex items-center">
                <span class="text-sm font-medium text-gray-900">$2,000.00</span>
                <span class="ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800">
                  Overdue
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </li>
  <!-- 更多公司卡片... -->
</ul>`,
                      'contactCardsDark': `<!-- Contact cards (Dark theme) -->
<div class="bg-gray-900 p-8 rounded-lg">
  <ul role="list" class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    <li class="col-span-1 divide-y divide-gray-700 rounded-lg bg-gray-800 shadow">
      <div class="flex w-full items-center justify-between space-x-6 p-6">
        <div class="flex-1 truncate">
          <div class="flex items-center space-x-3">
            <img class="h-20 w-20 flex-shrink-0 rounded-full" src="https://images.unsplash.com/photo-1494790108755-2616b612b786..." alt="">
          </div>
          <div class="mt-4 space-y-1">
            <h3 class="truncate text-sm font-medium text-white">Jane Cooper</h3>
            <p class="truncate text-sm text-gray-300">Paradigm Representative</p>
            <span class="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Admin
            </span>
          </div>
        </div>
      </div>
      <div>
        <div class="-mt-px flex divide-x divide-gray-700">
          <div class="flex w-0 flex-1">
            <a href="mailto:jane.cooper@example.com" class="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:text-white">
              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3 4a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V4zm2 0v12h10V4H5z" />
              </svg>
              Email
            </a>
          </div>
          <div class="-ml-px flex w-0 flex-1">
            <a href="tel:+1-555-123456" class="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-300 hover:text-white">
              <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M2 3.5A1.5 1.5 0 013.5 2h1.148a1.5..." clip-rule="evenodd" />
              </svg>
              Call
            </a>
          </div>
        </div>
      </div>
    </li>
    <!-- 更多联系人卡片... -->
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
          {renderComponent('contactCards', renderContactCards, 'Contact cards with small portraits')}
          {renderComponent('logosCards', renderLogosCards, 'Logos cards with description list')}
          {renderComponent('contactCardsDark', renderContactCardsDark, 'Contact cards')}
        </div>
      </div>
    </div>
  )
}