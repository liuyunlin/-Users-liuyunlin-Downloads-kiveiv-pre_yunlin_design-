import { useState } from 'react'

export function RadioGroups({ onNavigateToBasicComponents }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})
  const [selectedPrivacy, setSelectedPrivacy] = useState('public')
  const [selectedPlan, setSelectedPlan] = useState('startup')
  const [selectedNotification, setSelectedNotification] = useState('email')

  const radioGroupStyles = {
    'list-with-description': {
      name: 'List with inline description'
    },
    'simple-table': {
      name: 'Simple table'
    },
    'simple-inline': {
      name: 'Simple inline list'
    }
  }

  const generateReactCode = (style) => {
    switch(style) {
      case 'list-with-description':
        return `export default function ListWithDescription() {
  const [selected, setSelected] = useState('public')
  
  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-gray-900">Privacy setting</legend>
      <div className="mt-6 space-y-6">
        <div className="flex items-center">
          <input
            id="privacy-public"
            name="privacy"
            type="radio"
            value="public"
            checked={selected === 'public'}
            onChange={(e) => setSelected(e.target.value)}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <div className="ml-3">
            <label htmlFor="privacy-public" className="block text-sm font-medium leading-6 text-gray-900">
              Public access
            </label>
            <p className="text-sm text-gray-500">This project would be available to anyone who has the link</p>
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="privacy-private"
            name="privacy"
            type="radio"
            value="private"
            checked={selected === 'private'}
            onChange={(e) => setSelected(e.target.value)}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <div className="ml-3">
            <label htmlFor="privacy-private" className="block text-sm font-medium leading-6 text-gray-900">
              Private to Project Members
            </label>
            <p className="text-sm text-gray-500">Only members of this project would be able to access</p>
          </div>
        </div>
        <div className="flex items-center">
          <input
            id="privacy-restricted"
            name="privacy"
            type="radio"
            value="restricted"
            checked={selected === 'restricted'}
            onChange={(e) => setSelected(e.target.value)}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <div className="ml-3">
            <label htmlFor="privacy-restricted" className="block text-sm font-medium leading-6 text-gray-900">
              Private to you
            </label>
            <p className="text-sm text-gray-500">You are the only one able to access this project</p>
          </div>
        </div>
      </div>
    </fieldset>
  )
}`

      case 'simple-table':
        return `export default function SimpleTable() {
  const [selected, setSelected] = useState('startup')
  
  return (
    <fieldset>
      <legend className="sr-only">Pricing plans</legend>
      <div className="overflow-hidden rounded-lg border border-gray-200">
        <div className="relative">
          <label className="flex cursor-pointer border-b border-gray-200 px-6 py-4 sm:pl-16">
            <input
              type="radio"
              name="plan"
              value="startup"
              checked={selected === 'startup'}
              onChange={(e) => setSelected(e.target.value)}
              className="h-4 w-4 mt-0.5 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600 sm:absolute sm:left-6"
            />
            <div className="ml-3 flex w-0 flex-1 flex-col sm:ml-4">
              <span className="block text-sm font-medium text-gray-900">
                Startup
              </span>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span className="ml-1.5">$29 / mo ($290 / yr)</span>
                <span className="ml-6">Up to 5 active job postings</span>
              </div>
            </div>
          </label>
          <label className="flex cursor-pointer border-b border-gray-200 px-6 py-4 sm:pl-16">
            <input
              type="radio"
              name="plan"
              value="business"
              checked={selected === 'business'}
              onChange={(e) => setSelected(e.target.value)}
              className="h-4 w-4 mt-0.5 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600 sm:absolute sm:left-6"
            />
            <div className="ml-3 flex w-0 flex-1 flex-col sm:ml-4">
              <span className="block text-sm font-medium text-gray-900">
                Business
              </span>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span className="ml-1.5">$99 / mo ($990 / yr)</span>
                <span className="ml-6">Up to 25 active job postings</span>
              </div>
            </div>
          </label>
          <label className="flex cursor-pointer px-6 py-4 sm:pl-16">
            <input
              type="radio"
              name="plan"
              value="enterprise"
              checked={selected === 'enterprise'}
              onChange={(e) => setSelected(e.target.value)}
              className="h-4 w-4 mt-0.5 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600 sm:absolute sm:left-6"
            />
            <div className="ml-3 flex w-0 flex-1 flex-col sm:ml-4">
              <span className="block text-sm font-medium text-gray-900">
                Enterprise
              </span>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span className="ml-1.5">$249 / mo ($2490 / yr)</span>
                <span className="ml-6">Unlimited active job postings</span>
              </div>
            </div>
          </label>
        </div>
      </div>
    </fieldset>
  )
}`

      case 'simple-inline':
        return `export default function SimpleInline() {
  const [selected, setSelected] = useState('email')
  
  return (
    <fieldset>
      <legend className="text-base font-semibold leading-6 text-gray-900">Notifications</legend>
      <p className="mt-1 text-sm leading-6 text-gray-600">How do you prefer to receive notifications?</p>
      <div className="mt-6 space-x-6 flex">
        <div className="flex items-center">
          <input
            id="notification-email"
            name="notifications"
            type="radio"
            value="email"
            checked={selected === 'email'}
            onChange={(e) => setSelected(e.target.value)}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="notification-email" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
            Email
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="notification-sms"
            name="notifications"
            type="radio"
            value="sms"
            checked={selected === 'sms'}
            onChange={(e) => setSelected(e.target.value)}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="notification-sms" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
            Phone (SMS)
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="notification-push"
            name="notifications"
            type="radio"
            value="push"
            checked={selected === 'push'}
            onChange={(e) => setSelected(e.target.value)}
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="notification-push" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
            Push notification
          </label>
        </div>
      </div>
    </fieldset>
  )
}`

      default:
        return `// Radio group component code example
export default function RadioGroup() {
  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-gray-900">Choose an option</legend>
      <div className="mt-6 space-y-6">
        <div className="flex items-center">
          <input
            id="option-1"
            name="options"
            type="radio"
            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="option-1" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
            Option 1
          </label>
        </div>
      </div>
    </fieldset>
  )
}`
    }
  }

  const generateHTMLCode = (style) => {
    switch(style) {
      case 'list-with-description':
        return `<fieldset>
  <legend class="text-sm font-medium leading-6 text-gray-900">Privacy setting</legend>
  <div class="mt-6 space-y-6">
    <div class="flex items-center">
      <input
        id="privacy-public"
        name="privacy"
        type="radio"
        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <div class="ml-3">
        <label for="privacy-public" class="block text-sm font-medium leading-6 text-gray-900">
          Public access
        </label>
        <p class="text-sm text-gray-500">This project would be available to anyone who has the link</p>
      </div>
    </div>
    <div class="flex items-center">
      <input
        id="privacy-private"
        name="privacy"
        type="radio"
        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <div class="ml-3">
        <label for="privacy-private" class="block text-sm font-medium leading-6 text-gray-900">
          Private to Project Members
        </label>
        <p class="text-sm text-gray-500">Only members of this project would be able to access</p>
      </div>
    </div>
    <div class="flex items-center">
      <input
        id="privacy-restricted"
        name="privacy"
        type="radio"
        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <div class="ml-3">
        <label for="privacy-restricted" class="block text-sm font-medium leading-6 text-gray-900">
          Private to you
        </label>
        <p class="text-sm text-gray-500">You are the only one able to access this project</p>
      </div>
    </div>
  </div>
</fieldset>`

      case 'simple-table':
        return `<fieldset>
  <legend class="sr-only">Pricing plans</legend>
  <div class="overflow-hidden rounded-lg border border-gray-200">
    <div class="relative">
      <label class="flex cursor-pointer border-b border-gray-200 px-6 py-4 sm:pl-16">
        <input
          type="radio"
          name="plan"
          value="startup"
          class="h-4 w-4 mt-0.5 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600 sm:absolute sm:left-6"
        />
        <div class="ml-3 flex w-0 flex-1 flex-col sm:ml-4">
          <span class="block text-sm font-medium text-gray-900">
            Startup
          </span>
          <div class="mt-1 flex items-center text-sm text-gray-500">
            <span class="ml-1.5">$29 / mo ($290 / yr)</span>
            <span class="ml-6">Up to 5 active job postings</span>
          </div>
        </div>
      </label>
      <!-- Additional options... -->
    </div>
  </div>
</fieldset>`

      case 'simple-inline':
        return `<fieldset>
  <legend class="text-base font-semibold leading-6 text-gray-900">Notifications</legend>
  <p class="mt-1 text-sm leading-6 text-gray-600">How do you prefer to receive notifications?</p>
  <div class="mt-6 space-x-6 flex">
    <div class="flex items-center">
      <input
        id="notification-email"
        name="notifications"
        type="radio"
        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label for="notification-email" class="ml-3 block text-sm font-medium leading-6 text-gray-900">
        Email
      </label>
    </div>
    <div class="flex items-center">
      <input
        id="notification-sms"
        name="notifications"
        type="radio"
        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label for="notification-sms" class="ml-3 block text-sm font-medium leading-6 text-gray-900">
        Phone (SMS)
      </label>
    </div>
    <div class="flex items-center">
      <input
        id="notification-push"
        name="notifications"
        type="radio"
        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label for="notification-push" class="ml-3 block text-sm font-medium leading-6 text-gray-900">
        Push notification
      </label>
    </div>
  </div>
</fieldset>`

      default:
        return `<fieldset>
  <legend class="text-sm font-medium leading-6 text-gray-900">Choose an option</legend>
  <div class="mt-6 space-y-6">
    <div class="flex items-center">
      <input
        id="option-1"
        name="options"
        type="radio"
        class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label for="option-1" class="ml-3 block text-sm font-medium leading-6 text-gray-900">
        Option 1
      </label>
    </div>
  </div>
</fieldset>`
    }
  }

  const renderRadioGroupPreview = (style) => {
    switch(style) {
      case 'list-with-description':
        return (
          <fieldset>
            <legend className="text-sm font-medium leading-6 text-gray-900">Privacy setting</legend>
            <div className="mt-6 space-y-6">
              <div className="flex items-center">
                <input
                  id="privacy-public"
                  name="privacy"
                  type="radio"
                  value="public"
                  checked={selectedPrivacy === 'public'}
                  onChange={(e) => setSelectedPrivacy(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <div className="ml-3">
                  <label htmlFor="privacy-public" className="block text-sm font-medium leading-6 text-gray-900">
                    Public access
                  </label>
                  <p className="text-sm text-gray-500">This project would be available to anyone who has the link</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="privacy-private"
                  name="privacy"
                  type="radio"
                  value="private"
                  checked={selectedPrivacy === 'private'}
                  onChange={(e) => setSelectedPrivacy(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <div className="ml-3">
                  <label htmlFor="privacy-private" className="block text-sm font-medium leading-6 text-gray-900">
                    Private to Project Members
                  </label>
                  <p className="text-sm text-gray-500">Only members of this project would be able to access</p>
                </div>
              </div>
              <div className="flex items-center">
                <input
                  id="privacy-restricted"
                  name="privacy"
                  type="radio"
                  value="restricted"
                  checked={selectedPrivacy === 'restricted'}
                  onChange={(e) => setSelectedPrivacy(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <div className="ml-3">
                  <label htmlFor="privacy-restricted" className="block text-sm font-medium leading-6 text-gray-900">
                    Private to you
                  </label>
                  <p className="text-sm text-gray-500">You are the only one able to access this project</p>
                </div>
              </div>
            </div>
          </fieldset>
        )

      case 'simple-table':
        return (
          <fieldset>
            <legend className="sr-only">Pricing plans</legend>
            <div className="overflow-hidden rounded-lg border border-gray-200">
              <div className="relative">
                <label className={`flex cursor-pointer border-b border-gray-200 px-6 py-4 sm:pl-16 ${selectedPlan === 'startup' ? 'bg-indigo-50 border-indigo-200 z-10' : ''}`}>
                  <input
                    type="radio"
                    name="plan"
                    value="startup"
                    checked={selectedPlan === 'startup'}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="h-4 w-4 mt-0.5 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600 sm:absolute sm:left-6"
                  />
                  <div className="ml-3 flex w-0 flex-1 flex-col sm:ml-4">
                    <span className={`block text-sm font-medium ${selectedPlan === 'startup' ? 'text-indigo-900' : 'text-gray-900'}`}>
                      Startup
                    </span>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="ml-1.5">$29 / mo ($290 / yr)</span>
                      <span className="ml-6">Up to 5 active job postings</span>
                    </div>
                  </div>
                </label>
                <label className={`flex cursor-pointer border-b border-gray-200 px-6 py-4 sm:pl-16 ${selectedPlan === 'business' ? 'bg-indigo-50 border-indigo-200 z-10' : ''}`}>
                  <input
                    type="radio"
                    name="plan"
                    value="business"
                    checked={selectedPlan === 'business'}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="h-4 w-4 mt-0.5 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600 sm:absolute sm:left-6"
                  />
                  <div className="ml-3 flex w-0 flex-1 flex-col sm:ml-4">
                    <span className={`block text-sm font-medium ${selectedPlan === 'business' ? 'text-indigo-900' : 'text-gray-900'}`}>
                      Business
                    </span>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="ml-1.5">$99 / mo ($990 / yr)</span>
                      <span className="ml-6">Up to 25 active job postings</span>
                    </div>
                  </div>
                </label>
                <label className={`flex cursor-pointer px-6 py-4 sm:pl-16 ${selectedPlan === 'enterprise' ? 'bg-indigo-50 border-indigo-200 z-10' : ''}`}>
                  <input
                    type="radio"
                    name="plan"
                    value="enterprise"
                    checked={selectedPlan === 'enterprise'}
                    onChange={(e) => setSelectedPlan(e.target.value)}
                    className="h-4 w-4 mt-0.5 cursor-pointer border-gray-300 text-indigo-600 focus:ring-indigo-600 sm:absolute sm:left-6"
                  />
                  <div className="ml-3 flex w-0 flex-1 flex-col sm:ml-4">
                    <span className={`block text-sm font-medium ${selectedPlan === 'enterprise' ? 'text-indigo-900' : 'text-gray-900'}`}>
                      Enterprise
                    </span>
                    <div className="mt-1 flex items-center text-sm text-gray-500">
                      <span className="ml-1.5">$249 / mo ($2490 / yr)</span>
                      <span className="ml-6">Unlimited active job postings</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </fieldset>
        )

      case 'simple-inline':
        return (
          <fieldset>
            <legend className="text-base font-semibold leading-6 text-gray-900">Notifications</legend>
            <p className="mt-1 text-sm leading-6 text-gray-600">How do you prefer to receive notifications?</p>
            <div className="mt-6 space-x-6 flex">
              <div className="flex items-center">
                <input
                  id="notification-email"
                  name="notifications"
                  type="radio"
                  value="email"
                  checked={selectedNotification === 'email'}
                  onChange={(e) => setSelectedNotification(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="notification-email" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="notification-sms"
                  name="notifications"
                  type="radio"
                  value="sms"
                  checked={selectedNotification === 'sms'}
                  onChange={(e) => setSelectedNotification(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="notification-sms" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                  Phone (SMS)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="notification-push"
                  name="notifications"
                  type="radio"
                  value="push"
                  checked={selectedNotification === 'push'}
                  onChange={(e) => setSelectedNotification(e.target.value)}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="notification-push" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                  Push notification
                </label>
              </div>
            </div>
          </fieldset>
        )

      default:
        return (
          <fieldset>
            <legend className="text-sm font-medium leading-6 text-gray-900">Choose an option</legend>
            <div className="mt-6 space-y-6">
              <div className="flex items-center">
                <input
                  id="option-1"
                  name="options"
                  type="radio"
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="option-1" className="ml-3 block text-sm font-medium leading-6 text-gray-900">
                  Option 1
                </label>
              </div>
            </div>
          </fieldset>
        )
    }
  }

  return (
    <div className="legacy-demo-shell min-h-screen bg-gray-50">
      <div className="legacy-demo-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <div>
                <button 
                  onClick={onNavigateToBasicComponents}
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
                  onClick={onNavigateToBasicComponents}
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
                <span className="ml-4 text-sm font-medium text-gray-900">单选框</span>
              </div>
            </li>
          </ol>
        </nav>

        <div>
          {Object.entries(radioGroupStyles).map(([key, style]) => (
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
                    {renderRadioGroupPreview(key)}
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