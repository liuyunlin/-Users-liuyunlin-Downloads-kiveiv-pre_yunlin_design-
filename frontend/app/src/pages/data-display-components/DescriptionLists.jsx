import { useState } from 'react'

export function DescriptionLists({ onNavigateHome }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})

  // 四种不同的描述列表样式
  const descriptionListStyles = {
    narrowWithHiddenLabels: {
      name: 'Narrow with Hidden Labels'
    },
    darkCard: {
      name: 'Dark Card with Icons'
    },
    stripedLayout: {
      name: 'Striped Layout'
    },
    cardBased: {
      name: 'Card-Based Layout'
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
              className="ml-4 text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors"
            >
              数据展示组件
            </button>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
            <span className="ml-4 text-sm font-medium text-gray-900">描述列表</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // 生成 React 代码
  const generateReactCode = (style) => {
    switch(style) {
      case 'narrowWithHiddenLabels':
        return `export default function NarrowWithHiddenLabels() {
  const data = [
    { label: "Status", value: "Active" },
    { label: "Email", value: "user@example.com" },
    { label: "Role", value: "Administrator" },
    { label: "Last login", value: "2 hours ago" }
  ]

  return (
    <dl className="space-y-3 text-sm leading-6">
      {data.map((item, index) => (
        <div key={index} className="flex justify-between items-start">
          <dt className="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
            {item.label}
          </dt>
          <dd className="text-gray-900 font-semibold text-right">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}`

      case 'darkCard':
        return `export default function DarkCardWithIcons() {
  return (
    <div className="bg-slate-800 rounded-lg p-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-white">Amount</h3>
          <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
            Paid
          </span>
        </div>
        
        <div className="text-3xl font-bold text-white">
          $10,560.00
        </div>
        
        <hr className="border-slate-700" />
        
        <dl className="space-y-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            <dd className="text-gray-300">Alex Curren</dd>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            <dd className="text-gray-300">January 31, 2023</dd>
          </div>
          <div className="flex items-center">
            <svg className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            <dd className="text-gray-300">Paid with MasterCard</dd>
          </div>
        </dl>
        
        <div className="pt-4">
          <button className="flex items-center text-white hover:text-gray-300 transition-colors">
            Download receipt
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}`

      case 'stripedLayout':
        return `export default function StripedLayout() {
  const data = [
    { label: "Full name", value: "Margot Foster" },
    { label: "Application for", value: "Backend Developer" },
    { label: "Email address", value: "margotfoster@example.com" },
    { label: "Salary expectation", value: "$120,000" }
  ]

  return (
    <dl className="divide-y divide-gray-100">
      {data.map((item, index) => (
        <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
          <dt className="text-sm font-medium leading-6 text-gray-900">
            {item.label}
          </dt>
          <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  )
}`

      case 'cardBased':
        return `export default function CardBased() {
  const data = [
    { label: "Order number", value: "#1011" },
    { label: "Customer", value: "Michael Foster" },
    { label: "Amount", value: "$150.00 USD" },
    { label: "Status", value: "Completed" },
    { label: "Payment method", value: "Credit card" },
    { label: "Delivery date", value: "January 15, 2024" }
  ]

  return (
    <div className="bg-white shadow rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Order Details
        </h3>
      </div>
      <div className="px-6 py-4">
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-1">
              <dt className="text-sm font-medium text-gray-500">
                {item.label}
              </dt>
              <dd className="text-sm text-gray-900 font-semibold">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}`

      default:
        return `// Description list component code example
export default function DescriptionList() {
  return (
    <dl className="space-y-3">
      <div className="flex justify-between">
        <dt className="text-sm font-medium text-gray-500">Label</dt>
        <dd className="text-sm text-gray-900">Value</dd>
      </div>
    </dl>
  )
}`
    }
  }

  // 生成 HTML 代码
  const generateHTMLCode = (style) => {
    switch(style) {
      case 'narrowWithHiddenLabels':
        return `<dl class="space-y-3 text-sm leading-6">
  <div class="flex justify-between items-start">
    <dt class="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
      Status
    </dt>
    <dd class="text-gray-900 font-semibold text-right">
      Active
    </dd>
  </div>
  <div class="flex justify-between items-start">
    <dt class="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
      Email
    </dt>
    <dd class="text-gray-900 font-semibold text-right">
      user@example.com
    </dd>
  </div>
  <div class="flex justify-between items-start">
    <dt class="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
      Role
    </dt>
    <dd class="text-gray-900 font-semibold text-right">
      Administrator
    </dd>
  </div>
  <div class="flex justify-between items-start">
    <dt class="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
      Last login
    </dt>
    <dd class="text-gray-900 font-semibold text-right">
      2 hours ago
    </dd>
  </div>
</dl>`

      case 'darkCard':
        return `<div class="bg-slate-800 rounded-lg p-6">
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h3 class="text-lg font-medium text-white">Amount</h3>
      <span class="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
        Paid
      </span>
    </div>
    
    <div class="text-3xl font-bold text-white">
      $10,560.00
    </div>
    
    <hr class="border-slate-700" />
    
    <dl class="space-y-4">
      <div class="flex items-center">
        <svg class="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
        </svg>
        <dd class="text-gray-300">Alex Curren</dd>
      </div>
      <div class="flex items-center">
        <svg class="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
        </svg>
        <dd class="text-gray-300">January 31, 2023</dd>
      </div>
      <div class="flex items-center">
        <svg class="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
          <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
        </svg>
        <dd class="text-gray-300">Paid with MasterCard</dd>
      </div>
    </dl>
    
    <div class="pt-4">
      <button class="flex items-center text-white hover:text-gray-300 transition-colors">
        Download receipt
        <svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  </div>
</div>`

      case 'stripedLayout':
        return `<dl class="divide-y divide-gray-100">
  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900">
      Full name
    </dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      Margot Foster
    </dd>
  </div>
  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900">
      Application for
    </dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      Backend Developer
    </dd>
  </div>
  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900">
      Email address
    </dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      margotfoster@example.com
    </dd>
  </div>
  <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
    <dt class="text-sm font-medium leading-6 text-gray-900">
      Salary expectation
    </dt>
    <dd class="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
      $120,000
    </dd>
  </div>
</dl>`

      case 'cardBased':
        return `<div class="bg-white shadow rounded-lg border border-gray-200">
  <div class="px-6 py-4 border-b border-gray-200">
    <h3 class="text-lg font-medium leading-6 text-gray-900">
      Order Details
    </h3>
  </div>
  <div class="px-6 py-4">
    <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      <div class="space-y-1">
        <dt class="text-sm font-medium text-gray-500">
          Order number
        </dt>
        <dd class="text-sm text-gray-900 font-semibold">
          #1011
        </dd>
      </div>
      <div class="space-y-1">
        <dt class="text-sm font-medium text-gray-500">
          Customer
        </dt>
        <dd class="text-sm text-gray-900 font-semibold">
          Michael Foster
        </dd>
      </div>
      <div class="space-y-1">
        <dt class="text-sm font-medium text-gray-500">
          Amount
        </dt>
        <dd class="text-sm text-gray-900 font-semibold">
          $150.00 USD
        </dd>
      </div>
      <div class="space-y-1">
        <dt class="text-sm font-medium text-gray-500">
          Status
        </dt>
        <dd class="text-sm text-gray-900 font-semibold">
          Completed
        </dd>
      </div>
      <div class="space-y-1">
        <dt class="text-sm font-medium text-gray-500">
          Payment method
        </dt>
        <dd class="text-sm text-gray-900 font-semibold">
          Credit card
        </dd>
      </div>
      <div class="space-y-1">
        <dt class="text-sm font-medium text-gray-500">
          Delivery date
        </dt>
        <dd class="text-sm text-gray-900 font-semibold">
          January 15, 2024
        </dd>
      </div>
    </dl>
  </div>
</div>`

      default:
        return `<dl class="space-y-3">
  <div class="flex justify-between">
    <dt class="text-sm font-medium text-gray-500">Label</dt>
    <dd class="text-sm text-gray-900">Value</dd>
  </div>
</dl>`
    }
  }

  // 渲染描述列表预览
  const renderDescriptionListPreview = (style) => {
    switch(style) {
      case 'narrowWithHiddenLabels':
        const narrowData = [
          { label: "Status", value: "Active" },
          { label: "Email", value: "user@example.com" },
          { label: "Role", value: "Administrator" },
          { label: "Last login", value: "2 hours ago" }
        ]

        return (
          <dl className="space-y-3 text-sm leading-6">
            {narrowData.map((item, index) => (
              <div key={index} className="flex justify-between items-start">
                <dt className="text-gray-500 font-medium min-w-0 flex-shrink-0 mr-4">
                  {item.label}
                </dt>
                <dd className="text-gray-900 font-semibold text-right">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )

      case 'darkCard':
        return (
          <div className="bg-slate-800 rounded-lg p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">Amount</h3>
                <span className="inline-flex items-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                  Paid
                </span>
              </div>
              
              <div className="text-3xl font-bold text-white">
                $10,560.00
              </div>
              
              <hr className="border-slate-700" />
              
              <dl className="space-y-4">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                  <dd className="text-gray-300">Alex Curren</dd>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <dd className="text-gray-300">January 31, 2023</dd>
                </div>
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  <dd className="text-gray-300">Paid with MasterCard</dd>
                </div>
              </dl>
              
              <div className="pt-4">
                <button className="flex items-center text-white hover:text-gray-300 transition-colors">
                  Download receipt
                  <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )

      case 'stripedLayout':
        const stripedData = [
          { label: "Full name", value: "Margot Foster" },
          { label: "Application for", value: "Backend Developer" },
          { label: "Email address", value: "margotfoster@example.com" },
          { label: "Salary expectation", value: "$120,000" }
        ]

        return (
          <dl className="divide-y divide-gray-100">
            {stripedData.map((item, index) => (
              <div key={index} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {item.label}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        )

      case 'cardBased':
        const cardData = [
          { label: "Order number", value: "#1011" },
          { label: "Customer", value: "Michael Foster" },
          { label: "Amount", value: "$150.00 USD" },
          { label: "Status", value: "Completed" },
          { label: "Payment method", value: "Credit card" },
          { label: "Delivery date", value: "January 15, 2024" }
        ]

        return (
          <div className="bg-white shadow rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Order Details
              </h3>
            </div>
            <div className="px-6 py-4">
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {cardData.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <dt className="text-sm font-medium text-gray-500">
                      {item.label}
                    </dt>
                    <dd className="text-sm text-gray-900 font-semibold">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        )

      default:
        return (
          <dl className="space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm font-medium text-gray-500">Label</dt>
              <dd className="text-sm text-gray-900">Value</dd>
            </div>
          </dl>
        )
    }
  }

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb />

        <div>
          {Object.entries(descriptionListStyles).map(([key, style]) => (
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
                  // Card-based 和 darkCard 样式已有自己的背景，其他样式需要容器
                  (key === 'cardBased' || key === 'darkCard') ? (
                    <div className="space-y-6">
                      {/* 已有背景的组件不需要额外容器 */}
                      {renderDescriptionListPreview(key)}
                    </div>
                  ) : (
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      {/* 无背景的组件需要容器 */}
                      {renderDescriptionListPreview(key)}
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