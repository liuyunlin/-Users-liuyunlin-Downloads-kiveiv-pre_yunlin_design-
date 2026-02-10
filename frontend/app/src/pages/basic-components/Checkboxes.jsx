import { useState } from 'react'

export function Checkboxes({ onNavigateToBasicComponents }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})
  const [notificationSettings, setNotificationSettings] = useState({
    comments: true,
    candidates: false,
    offers: true
  })
  const [selectedPackages, setSelectedPackages] = useState(['startup'])
  const [preferredChannels, setPreferredChannels] = useState(['email'])

  const checkboxStyles = {
    stackedWithDescription: {
      name: 'Stacked list with description'
    },
    cardChoice: {
      name: 'Card options'
    },
    inlineGrid: {
      name: 'Simple inline grid'
    }
  }

  const classNames = (...classes) => classes.filter(Boolean).join(' ')

  const toggleNotificationSetting = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  const togglePackage = (pkg) => {
    setSelectedPackages((prev) => {
      if (prev.includes(pkg)) {
        return prev.filter((item) => item !== pkg)
      }
      return [...prev, pkg]
    })
  }

  const toggleChannel = (channel) => {
    setPreferredChannels((prev) => {
      if (prev.includes(channel)) {
        return prev.filter((item) => item !== channel)
      }
      return [...prev, channel]
    })
  }

  const generateReactCode = (style) => {
    switch (style) {
      case 'stackedWithDescription':
        return `import { useState } from 'react'

export default function StackedWithDescription() {
  const [notificationSettings, setNotificationSettings] = useState({
    comments: true,
    candidates: false,
    offers: true
  })

  const toggleNotificationSetting = (setting) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting]
    }))
  }

  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-gray-900">By email</legend>
      <p className="text-sm text-gray-500">Get notified when a candidate engages with you.</p>
      <div className="mt-6 space-y-6">
        <div className="flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="comments"
              name="comments"
              type="checkbox"
              checked={notificationSettings.comments}
              onChange={() => toggleNotificationSetting('comments')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="comments" className="font-medium text-gray-900">Comments</label>
            <p className="text-gray-500">Get notified when someone posts a comment on a posting.</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="candidates"
              name="candidates"
              type="checkbox"
              checked={notificationSettings.candidates}
              onChange={() => toggleNotificationSetting('candidates')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="candidates" className="font-medium text-gray-900">Candidates</label>
            <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
          </div>
        </div>
        <div className="flex items-start">
          <div className="flex h-6 items-center">
            <input
              id="offers"
              name="offers"
              type="checkbox"
              checked={notificationSettings.offers}
              onChange={() => toggleNotificationSetting('offers')}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
          <div className="ml-3 text-sm leading-6">
            <label htmlFor="offers" className="font-medium text-gray-900">Offers</label>
            <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
          </div>
        </div>
      </div>
    </fieldset>
  )
}`

      case 'cardChoice':
        return String.raw`import { useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function CardChoice() {
  const [selectedPackages, setSelectedPackages] = useState(['startup'])

  const togglePackage = (pkg) => {
    setSelectedPackages((prev) => {
      if (prev.includes(pkg)) {
        return prev.filter((item) => item !== pkg)
      }
      return [...prev, pkg]
    })
  }

  const packages = [
    {
      id: 'startup',
      name: 'Startup',
      description: 'All the basics for individuals and small teams.',
      price: '$29/mo'
    },
    {
      id: 'business',
      name: 'Business',
      description: 'Advanced features and reporting.',
      price: '$99/mo'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Dedicated support and infrastructure.',
      price: '$249/mo'
    }
  ]

  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-gray-900">Plans</legend>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {packages.map((pkg) => {
          const checked = selectedPackages.includes(pkg.id)
          return (
            <label
              key={pkg.id}
              htmlFor={pkg.id}
              className={classNames(
                'relative flex cursor-pointer flex-col rounded-lg border p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                checked ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-200'
              )}
            >
              <span className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{pkg.name}</span>
                <span className="text-sm text-gray-500">{pkg.price}</span>
              </span>
              <span className="mt-2 text-sm text-gray-500">{pkg.description}</span>
              <input
                id={pkg.id}
                name="plans"
                type="checkbox"
                checked={checked}
                onChange={() => togglePackage(pkg.id)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={classNames(
                  'pointer-events-none absolute inset-0 rounded-lg',
                  checked ? 'ring-2 ring-indigo-600 ring-offset-2' : 'ring-1 ring-transparent'
                )}
              />
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}`

      case 'inlineGrid':
        return `import { useState } from 'react'

export default function InlineGrid() {
  const [preferredChannels, setPreferredChannels] = useState(['email'])

  const toggleChannel = (channel) => {
    setPreferredChannels((prev) => {
      if (prev.includes(channel)) {
        return prev.filter((item) => item !== channel)
      }
      return [...prev, channel]
    })
  }

  const channels = [
    { id: 'email', title: 'Email' },
    { id: 'sms', title: 'SMS' },
    { id: 'push', title: 'Push' }
  ]

  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-gray-900">Channels</legend>
      <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-3">
        {channels.map((channel) => (
          <div key={channel.id} className="flex items-center">
            <input
              id={channel.id}
              name="channels"
              type="checkbox"
              checked={preferredChannels.includes(channel.id)}
              onChange={() => toggleChannel(channel.id)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label htmlFor={channel.id} className="ml-3 text-sm font-medium text-gray-900">
              {channel.title}
            </label>
          </div>
        ))}
      </div>
    </fieldset>
  )
}`

      default:
        return `// Checkbox component code example
export default function CheckboxExample() {
  return (
    <fieldset>
      <legend className="text-sm font-medium leading-6 text-gray-900">Notifications</legend>
      <div className="mt-6 space-y-4">
        <div className="flex items-center">
          <input
            id="demo-checkbox"
            name="demo-checkbox"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
          <label htmlFor="demo-checkbox" className="ml-3 text-sm font-medium text-gray-900">
            Email notifications
          </label>
        </div>
      </div>
    </fieldset>
  )
}`
    }
  }

  const generateHTMLCode = (style) => {
    switch (style) {
      case 'stackedWithDescription':
        return `<fieldset>
  <legend class="text-sm font-medium leading-6 text-gray-900">By email</legend>
  <p class="text-sm text-gray-500">Get notified when a candidate engages with you.</p>
  <div class="mt-6 space-y-6">
    <div class="flex items-start">
      <div class="flex h-6 items-center">
        <input id="comments" name="comments" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label for="comments" class="font-medium text-gray-900">Comments</label>
        <p class="text-gray-500">Get notified when someone posts a comment on a posting.</p>
      </div>
    </div>
    <div class="flex items-start">
      <div class="flex h-6 items-center">
        <input id="candidates" name="candidates" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label for="candidates" class="font-medium text-gray-900">Candidates</label>
        <p class="text-gray-500">Get notified when a candidate applies for a job.</p>
      </div>
    </div>
    <div class="flex items-start">
      <div class="flex h-6 items-center">
        <input id="offers" name="offers" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked />
      </div>
      <div class="ml-3 text-sm leading-6">
        <label for="offers" class="font-medium text-gray-900">Offers</label>
        <p class="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
      </div>
    </div>
  </div>
</fieldset>`

      case 'cardChoice':
        return `<fieldset>
  <legend class="text-sm font-medium leading-6 text-gray-900">Plans</legend>
  <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
    <label class="relative flex cursor-pointer flex-col rounded-lg border border-indigo-600 p-4 shadow-sm ring-2 ring-indigo-600">
      <span class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-900">Startup</span>
        <span class="text-sm text-gray-500">$29/mo</span>
      </span>
      <span class="mt-2 text-sm text-gray-500">All the basics for individuals and small teams.</span>
      <input type="checkbox" class="sr-only" checked />
      <span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-lg ring-2 ring-indigo-600 ring-offset-2"></span>
    </label>
    <label class="relative flex cursor-pointer flex-col rounded-lg border border-gray-200 p-4 shadow-sm">
      <span class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-900">Business</span>
        <span class="text-sm text-gray-500">$99/mo</span>
      </span>
      <span class="mt-2 text-sm text-gray-500">Advanced features and reporting.</span>
      <input type="checkbox" class="sr-only" />
      <span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-transparent"></span>
    </label>
    <label class="relative flex cursor-pointer flex-col rounded-lg border border-gray-200 p-4 shadow-sm">
      <span class="flex items-center justify-between">
        <span class="text-sm font-medium text-gray-900">Enterprise</span>
        <span class="text-sm text-gray-500">$249/mo</span>
      </span>
      <span class="mt-2 text-sm text-gray-500">Dedicated support and infrastructure.</span>
      <input type="checkbox" class="sr-only" />
      <span aria-hidden="true" class="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-transparent"></span>
    </label>
  </div>
</fieldset>`

      case 'inlineGrid':
        return `<fieldset>
  <legend class="text-sm font-medium leading-6 text-gray-900">Channels</legend>
  <div class="mt-6 grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-3">
    <div class="flex items-center">
      <input id="email" name="channels" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" checked />
      <label for="email" class="ml-3 text-sm font-medium text-gray-900">Email</label>
    </div>
    <div class="flex items-center">
      <input id="sms" name="channels" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
      <label for="sms" class="ml-3 text-sm font-medium text-gray-900">SMS</label>
    </div>
    <div class="flex items-center">
      <input id="push" name="channels" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
      <label for="push" class="ml-3 text-sm font-medium text-gray-900">Push</label>
    </div>
  </div>
</fieldset>`

      default:
        return `<fieldset>
  <legend class="text-sm font-medium leading-6 text-gray-900">Notifications</legend>
  <div class="mt-6 space-y-4">
    <div class="flex items-center">
      <input id="demo-checkbox" name="demo-checkbox" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
      <label for="demo-checkbox" class="ml-3 text-sm font-medium text-gray-900">Email notifications</label>
    </div>
  </div>
</fieldset>`
    }
  }

  const renderCheckboxPreview = (style) => {
    switch (style) {
      case 'stackedWithDescription':
        return (
          <fieldset>
            <legend className="text-sm font-medium leading-6 text-gray-900">By email</legend>
            <p className="text-sm text-gray-500">Get notified when a candidate engages with you.</p>
            <div className="mt-6 space-y-6">
              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    checked={notificationSettings.comments}
                    onChange={() => toggleNotificationSetting('comments')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="comments" className="font-medium text-gray-900">
                    Comments
                  </label>
                  <p className="text-gray-500">
                    Get notified when someone posts a comment on a posting.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="candidates"
                    name="candidates"
                    type="checkbox"
                    checked={notificationSettings.candidates}
                    onChange={() => toggleNotificationSetting('candidates')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="candidates" className="font-medium text-gray-900">
                    Candidates
                  </label>
                  <p className="text-gray-500">
                    Get notified when a candidate applies for a job.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex h-6 items-center">
                  <input
                    id="offers"
                    name="offers"
                    type="checkbox"
                    checked={notificationSettings.offers}
                    onChange={() => toggleNotificationSetting('offers')}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="offers" className="font-medium text-gray-900">
                    Offers
                  </label>
                  <p className="text-gray-500">
                    Get notified when a candidate accepts or rejects an offer.
                  </p>
                </div>
              </div>
            </div>
          </fieldset>
        )

      case 'cardChoice':
        return (
          <fieldset>
            <legend className="text-sm font-medium leading-6 text-gray-900">Plans</legend>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[{
                id: 'startup',
                name: 'Startup',
                description: 'All the basics for individuals and small teams.',
                price: '$29/mo'
              }, {
                id: 'business',
                name: 'Business',
                description: 'Advanced features and reporting.',
                price: '$99/mo'
              }, {
                id: 'enterprise',
                name: 'Enterprise',
                description: 'Dedicated support and infrastructure.',
                price: '$249/mo'
              }].map((pkg) => {
                const checked = selectedPackages.includes(pkg.id)
                return (
                  <label
                    key={pkg.id}
                    htmlFor={pkg.id}
                    className={classNames(
                      'relative flex cursor-pointer flex-col rounded-lg border p-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2',
                      checked ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-200'
                    )}
                  >
                    <span className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{pkg.name}</span>
                      <span className="text-sm text-gray-500">{pkg.price}</span>
                    </span>
                    <span className="mt-2 text-sm text-gray-500">{pkg.description}</span>
                    <input
                      id={pkg.id}
                      name="plans"
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePackage(pkg.id)}
                      className="sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={classNames(
                        'pointer-events-none absolute inset-0 rounded-lg',
                        checked ? 'ring-2 ring-indigo-600 ring-offset-2' : 'ring-1 ring-transparent'
                      )}
                    />
                  </label>
                )
              })}
            </div>
          </fieldset>
        )

      case 'inlineGrid':
        return (
          <fieldset>
            <legend className="text-sm font-medium leading-6 text-gray-900">Channels</legend>
            <div className="mt-6 grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-3">
              {[{ id: 'email', title: 'Email' }, { id: 'sms', title: 'SMS' }, { id: 'push', title: 'Push' }].map((channel) => (
                <div key={channel.id} className="flex items-center">
                  <input
                    id={channel.id}
                    name="channels"
                    type="checkbox"
                    checked={preferredChannels.includes(channel.id)}
                    onChange={() => toggleChannel(channel.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor={channel.id} className="ml-3 text-sm font-medium text-gray-900">
                    {channel.title}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
        )

      default:
        return (
          <fieldset>
            <legend className="text-sm font-medium leading-6 text-gray-900">Notifications</legend>
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <input
                  id="demo-checkbox"
                  name="demo-checkbox"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label htmlFor="demo-checkbox" className="ml-3 text-sm font-medium text-gray-900">
                  Email notifications
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
                <span className="ml-4 text-sm font-medium text-gray-900">复选框</span>
              </div>
            </li>
          </ol>
        </nav>

        <div>
          {Object.entries(checkboxStyles).map(([key, style]) => (
            <div key={key} style={{ marginBottom: '56px' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                <h2 className="text-2xl font-semibold" style={{ color: '#000311' }}>{style.name}</h2>
                <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setActiveTabs((prev) => ({ ...prev, [key]: 'preview' }))}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      (activeTabs[key] || 'preview') === 'preview'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preview 预览
                  </button>
                  <button
                    onClick={() => setActiveTabs((prev) => ({ ...prev, [key]: 'code' }))}
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

              <div>
                {(activeTabs[key] || 'preview') === 'preview' ? (
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    {renderCheckboxPreview(key)}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">代码示例</h3>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setCodeTypes((prev) => ({ ...prev, [key]: 'react' }))}
                          className={`px-3 py-1 text-xs rounded-md transition-colors ${
                            (codeTypes[key] || 'react') === 'react'
                              ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'
                          }`}
                        >
                          React
                        </button>
                        <button
                          onClick={() => setCodeTypes((prev) => ({ ...prev, [key]: 'html' }))}
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
                        <code style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}>
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
