import { useState } from 'react'

export function Tables({ onNavigateHome, onNavigateToForms }) {
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
            <span className="ml-4 text-sm font-medium text-gray-900">表格</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // 基础表格
  const renderBasicTable = () => {
    const employees = [
      {
        id: 1,
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 2,
        name: 'Courtney Henry',
        title: 'Designer',
        department: 'Intranet',
        email: 'courtney.henry@example.com',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 3,
        name: 'Tom Cook',
        title: 'Director of Product',
        department: 'Directives',
        email: 'tom.cook@example.com',
        role: 'Member',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      },
      {
        id: 4,
        name: 'Whitney Francis',
        title: 'Copywriter',
        department: 'Tactics',
        email: 'whitney.francis@example.com',
        role: 'Admin',
        image: 'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
      }
    ]

    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={employee.image} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {employee.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {employee.department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    employee.role === 'Admin' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {employee.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // 带操作按钮的表格
  const renderTableWithActions = () => {
    const projects = [
      {
        id: 1,
        name: 'GraphQL API',
        description: 'Modernize the GraphQL API infrastructure',
        status: 'In Progress',
        assignee: {
          name: 'Dries Vincent',
          image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        progress: 75,
        dueDate: '2024-01-15'
      },
      {
        id: 2,
        name: 'Mobile App',
        description: 'iOS and Android mobile applications',
        status: 'Planning',
        assignee: {
          name: 'Lindsay Walton',
          image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        progress: 25,
        dueDate: '2024-02-20'
      },
      {
        id: 3,
        name: 'Dashboard Redesign',
        description: 'User interface and experience improvements',
        status: 'Completed',
        assignee: {
          name: 'Courtney Henry',
          image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
        },
        progress: 100,
        dueDate: '2023-12-30'
      }
    ]

    const getStatusBadge = (status) => {
      const statusStyles = {
        'In Progress': 'bg-blue-100 text-blue-800',
        'Planning': 'bg-yellow-100 text-yellow-800',
        'Completed': 'bg-green-100 text-green-800'
      }
      return statusStyles[status] || 'bg-gray-100 text-gray-800'
    }

    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all projects in your account including their name, status, and progress.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                Add project
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Project
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Progress
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Due Date
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 sm:pl-0">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={project.assignee.image} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="font-medium text-gray-900">{project.name}</div>
                              <div className="text-gray-500 text-sm">{project.description}</div>
                            </div>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                            <span className="ml-2 text-sm text-gray-600">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {project.dueDate}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button className="text-indigo-600 hover:text-indigo-900 mr-4">
                            Edit
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 带选择框的表格
  const renderTableWithCheckboxes = () => {
    const [selectedItems, setSelectedItems] = useState([])

    const invoices = [
      {
        id: 1,
        invoice: '#INV-001',
        client: 'Acme Corp',
        amount: '$2,500.00',
        status: 'Paid',
        date: '2024-01-15',
        method: 'Credit Card'
      },
      {
        id: 2,
        invoice: '#INV-002',
        client: 'Global Tech',
        amount: '$4,200.00',
        status: 'Pending',
        date: '2024-01-18',
        method: 'Bank Transfer'
      },
      {
        id: 3,
        invoice: '#INV-003',
        client: 'StartupXYZ',
        amount: '$1,800.00',
        status: 'Overdue',
        date: '2024-01-10',
        method: 'Credit Card'
      },
      {
        id: 4,
        invoice: '#INV-004',
        client: 'Enterprise LLC',
        amount: '$3,600.00',
        status: 'Paid',
        date: '2024-01-20',
        method: 'Check'
      }
    ]

    const handleSelectAll = (checked) => {
      if (checked) {
        setSelectedItems(invoices.map(invoice => invoice.id))
      } else {
        setSelectedItems([])
      }
    }

    const handleSelectItem = (id, checked) => {
      if (checked) {
        setSelectedItems(prev => [...prev, id])
      } else {
        setSelectedItems(prev => prev.filter(item => item !== id))
      }
    }

    const getStatusBadge = (status) => {
      const statusStyles = {
        'Paid': 'bg-green-100 text-green-800',
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Overdue': 'bg-red-100 text-red-800'
      }
      return statusStyles[status] || 'bg-gray-100 text-gray-800'
    }

    const isAllSelected = selectedItems.length === invoices.length
    const isPartiallySelected = selectedItems.length > 0 && selectedItems.length < invoices.length

    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">Invoices</h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all invoices including their status and payment information.
              </p>
            </div>
            {selectedItems.length > 0 && (
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                >
                  Bulk Actions ({selectedItems.length})
                </button>
              </div>
            )}
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th scope="col" className="relative px-6 sm:w-12 sm:px-6">
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          ref={(el) => {
                            if (el) el.indeterminate = isPartiallySelected
                          }}
                          checked={isAllSelected}
                          onChange={(e) => handleSelectAll(e.target.checked)}
                        />
                      </th>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                        Invoice
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Client
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Amount
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className={selectedItems.includes(invoice.id) ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                        <td className="relative px-6 sm:w-12 sm:px-6">
                          <input
                            type="checkbox"
                            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            checked={selectedItems.includes(invoice.id)}
                            onChange={(e) => handleSelectItem(invoice.id, e.target.checked)}
                          />
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {invoice.invoice}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {invoice.client}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                          {invoice.amount}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(invoice.status)}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {invoice.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
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
                  'basic': `// 基础表格组件
export default function BasicTable() {
  const employees = [
    {
      id: 1,
      name: 'Lindsay Walton',
      title: 'Front-end Developer',
      department: 'Optimization',
      email: 'lindsay.walton@example.com',
      role: 'Member',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9...'
    },
    // 更多数据...
  ]

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Role
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <img className="h-10 w-10 rounded-full" src={employee.image} alt="" />
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    <div className="text-sm text-gray-500">{employee.email}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {employee.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {employee.department}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                  {employee.role}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}`,
                  'withActions': `// 带操作按钮的表格组件
export default function TableWithActions() {
  const projects = [
    {
      id: 1,
      name: 'GraphQL API',
      description: 'Modernize the GraphQL API infrastructure',
      status: 'In Progress',
      assignee: {
        name: 'Dries Vincent',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d...'
      },
      progress: 75,
      dueDate: '2024-01-15'
    },
    // 更多数据...
  ]

  const getStatusBadge = (status) => {
    const statusStyles = {
      'In Progress': 'bg-blue-100 text-blue-800',
      'Planning': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-green-100 text-green-800'
    }
    return statusStyles[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Projects</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all projects in your account.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
              Add project
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                  Project
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Progress
                </th>
                <th className="relative py-3.5 pl-3 pr-4">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap py-4 pl-4 pr-3">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-full" src={project.assignee.image} alt="" />
                      <div className="ml-4">
                        <div className="font-medium text-gray-900">{project.name}</div>
                        <div className="text-gray-500 text-sm">{project.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span className={\`inline-flex px-2 py-1 text-xs font-semibold rounded-full \${getStatusBadge(project.status)}\`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: \`\${project.progress}%\` }}></div>
                      </div>
                      <span className="ml-2">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right">
                    <button className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}`,
                  'withStatus': `// 带选择框的表格组件
export default function TableWithCheckboxes() {
  const [selectedItems, setSelectedItems] = useState([])

  const invoices = [
    {
      id: 1,
      invoice: '#INV-001',
      client: 'Acme Corp',
      amount: '$2,500.00',
      status: 'Paid',
      date: '2024-01-15'
    },
    // 更多数据...
  ]

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(invoices.map(invoice => invoice.id))
    } else {
      setSelectedItems([])
    }
  }

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems(prev => [...prev, id])
    } else {
      setSelectedItems(prev => prev.filter(item => item !== id))
    }
  }

  const getStatusBadge = (status) => {
    const statusStyles = {
      'Paid': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Overdue': 'bg-red-100 text-red-800'
    }
    return statusStyles[status] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-xl font-semibold text-gray-900">Invoices</h1>
        <table className="min-w-full divide-y divide-gray-300 mt-8">
          <thead>
            <tr>
              <th className="relative px-6 sm:w-12 sm:px-6">
                <input
                  type="checkbox"
                  className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600"
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
              </th>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
                Invoice
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Client
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Amount
              </th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="relative px-6 sm:w-12 sm:px-6">
                  <input
                    type="checkbox"
                    className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600"
                    checked={selectedItems.includes(invoice.id)}
                    onChange={(e) => handleSelectItem(invoice.id, e.target.checked)}
                  />
                </td>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
                  {invoice.invoice}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  {invoice.client}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                  {invoice.amount}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <span className={\`inline-flex px-2 py-1 text-xs font-semibold rounded-full \${getStatusBadge(invoice.status)}\`}>
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}`
                };

                const htmlCodes = {
                  'basic': `<!-- 基础表格 -->
<div class="bg-white shadow rounded-lg overflow-hidden">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr class="hover:bg-gray-50">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1517841905240-472988babdf9..." alt="">
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-900">Lindsay Walton</div>
              <div class="text-sm text-gray-500">lindsay.walton@example.com</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Front-end Developer</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Optimization</td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Member</span>
        </td>
      </tr>
      <!-- 更多行... -->
    </tbody>
  </table>
</div>`,
                  'withActions': `<!-- 带操作按钮的表格 -->
<div class="bg-white shadow rounded-lg overflow-hidden">
  <div class="px-4 py-5 sm:p-6">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-xl font-semibold text-gray-900">Projects</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all projects in your account.</p>
      </div>
      <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
        <button class="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700">
          Add project
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <table class="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Project</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
            <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Progress</th>
            <th class="relative py-3.5 pl-3 pr-4"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-gray-50">
            <td class="whitespace-nowrap py-4 pl-4 pr-3">
              <div class="flex items-center">
                <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d..." alt="">
                <div class="ml-4">
                  <div class="font-medium text-gray-900">GraphQL API</div>
                  <div class="text-gray-500 text-sm">Modernize the GraphQL API infrastructure</div>
                </div>
              </div>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">In Progress</span>
            </td>
            <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              <div class="flex items-center">
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div class="bg-indigo-600 h-2 rounded-full" style="width: 75%"></div>
                </div>
                <span class="ml-2">75%</span>
              </div>
            </td>
            <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right">
              <button class="text-indigo-600 hover:text-indigo-900">Edit</button>
            </td>
          </tr>
          <!-- 更多行... -->
        </tbody>
      </table>
    </div>
  </div>
</div>`,
                  'withStatus': `<!-- 带选择框的表格 -->
<div class="bg-white shadow rounded-lg overflow-hidden">
  <div class="px-4 py-5 sm:p-6">
    <h1 class="text-xl font-semibold text-gray-900">Invoices</h1>
    <table class="min-w-full divide-y divide-gray-300 mt-8">
      <thead>
        <tr>
          <th class="relative px-6 sm:w-12 sm:px-6">
            <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600">
          </th>
          <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Invoice</th>
          <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Client</th>
          <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Amount</th>
          <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr class="hover:bg-gray-50">
          <td class="relative px-6 sm:w-12 sm:px-6">
            <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600">
          </td>
          <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">#INV-001</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Acme Corp</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">$2,500.00</td>
          <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Paid</span>
          </td>
        </tr>
        <!-- 更多行... -->
      </tbody>
    </table>
  </div>
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
          {renderComponent('basic', renderBasicTable, 'Basic Table')}
          {renderComponent('withActions', renderTableWithActions, 'Table with Actions')}
          {renderComponent('withStatus', renderTableWithCheckboxes, 'Table with Checkboxes')}
        </div>
      </div>
    </div>
  )
}