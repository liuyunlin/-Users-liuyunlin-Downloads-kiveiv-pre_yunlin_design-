import { useState } from 'react'
import { Switch } from '@headlessui/react'

export function Toggles({ onNavigateToBasicComponents }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({})
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [marketingEmails, setMarketingEmails] = useState(true)
  const [autoPay, setAutoPay] = useState(false)
  const [loginAlerts, setLoginAlerts] = useState({
    desktop: true,
    mobile: false,
    newDevice: true
  })

  const toggleStyles = {
    simple: {
      name: 'Simple form row'
    },
    settingsCard: {
      name: 'Settings card'
    },
    inlineGrid: {
      name: 'Inline grid of toggles'
    }
  }

  const classNames = (...classes) => classes.filter(Boolean).join(' ')

  const toggleLoginAlert = (key) => {
    setLoginAlerts((prev) => ({
      ...prev,
      [key]: !prev[key]
    }))
  }

  const generateReactCode = (style) => {
    switch (style) {
      case 'simple':
        return String.raw`import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SimpleToggle() {
  const [enabled, setEnabled] = useState(true)

  return (
    <Switch.Group as="div" className="flex items-center justify-between">
      <span className="flex flex-col">
        <Switch.Label as="span" className="text-sm font-medium text-gray-900" passive>
          Automatic updates
        </Switch.Label>
        <Switch.Description as="span" className="text-sm text-gray-500">
          Always keep this workspace up to date.
        </Switch.Description>
      </span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={classNames(
          enabled ? 'bg-indigo-600' : 'bg-gray-200',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </Switch>
    </Switch.Group>
  )
}`

      case 'settingsCard':
        return String.raw`import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SettingsCard() {
  const [autoPay, setAutoPay] = useState(false)
  const [marketingEmails, setMarketingEmails] = useState(true)

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200">
      <div className="px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-900">Automatic payments</h3>
            <p className="mt-1 text-sm text-gray-500">Enable recurring billing for all invoices.</p>
          </div>
          <Switch
            checked={autoPay}
            onChange={setAutoPay}
            className={classNames(
              autoPay ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                autoPay ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
        </div>
      </div>
      <div className="border-t border-gray-200 bg-gray-50 px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-gray-900">Marketing emails</h4>
            <p className="mt-1 text-sm text-gray-500">Keep your team in the loop about new features.</p>
          </div>
          <Switch
            checked={marketingEmails}
            onChange={setMarketingEmails}
            className={classNames(
              marketingEmails ? 'bg-indigo-600' : 'bg-gray-200',
              'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
            )}
          >
            <span
              aria-hidden="true"
              className={classNames(
                marketingEmails ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  )
}`

      case 'inlineGrid':
        return String.raw`import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function InlineGridToggles() {
  const [desktop, setDesktop] = useState(true)
  const [mobile, setMobile] = useState(false)
  const [newDevice, setNewDevice] = useState(true)

  return (
    <div className="grid gap-6 sm:grid-cols-3">
      <div className="flex flex-col space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900">Desktop alerts</p>
          <p className="text-sm text-gray-500">Notify me when logins happen on desktop.</p>
        </div>
        <Switch
          checked={desktop}
          onChange={setDesktop}
          className={classNames(
            desktop ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              desktop ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900">Mobile alerts</p>
          <p className="text-sm text-gray-500">Get notified about mobile sign-ins.</p>
        </div>
        <Switch
          checked={mobile}
          onChange={setMobile}
          className={classNames(
            mobile ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              mobile ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
      </div>
      <div className="flex flex-col space-y-3">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-900">New device alerts</p>
          <p className="text-sm text-gray-500">Warn me about sign-ins from new devices.</p>
        </div>
        <Switch
          checked={newDevice}
          onChange={setNewDevice}
          className={classNames(
            newDevice ? 'bg-indigo-600' : 'bg-gray-200',
            'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              newDevice ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
            )}
          />
        </Switch>
      </div>
    </div>
  )
}`

      default:
        return `// Toggle component example
export default function ToggleExample() {
  return null
}`
    }
  }

  const generateHTMLCode = (style) => {
    switch (style) {
      case 'simple':
        return `<div class="flex items-center justify-between">
  <span>
    <span class="text-sm font-medium text-gray-900">Automatic updates</span>
    <span class="mt-1 block text-sm text-gray-500">Always keep this workspace up to date.</span>
  </span>
  <button type="button" class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="true">
    <span aria-hidden="true" class="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
  </button>
</div>`

      case 'settingsCard':
        return `<div class="overflow-hidden rounded-lg border border-gray-200">
  <div class="px-6 py-5">
    <div class="flex items-center justify-between">
      <div>
        <h3 class="text-sm font-medium text-gray-900">Automatic payments</h3>
        <p class="mt-1 text-sm text-gray-500">Enable recurring billing for all invoices.</p>
      </div>
      <button type="button" class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="false">
        <span aria-hidden="true" class="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
      </button>
    </div>
  </div>
  <div class="border-t border-gray-200 bg-gray-50 px-6 py-5">
    <div class="flex items-center justify-between">
      <div>
        <h4 class="text-sm font-medium text-gray-900">Marketing emails</h4>
        <p class="mt-1 text-sm text-gray-500">Keep your team in the loop about new features.</p>
      </div>
      <button type="button" class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="true">
        <span aria-hidden="true" class="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
      </button>
    </div>
  </div>
</div>`

      case 'inlineGrid':
        return `<div class="grid gap-6 sm:grid-cols-3">
  <div class="flex flex-col space-y-3">
    <div class="space-y-1">
      <p class="text-sm font-medium text-gray-900">Desktop alerts</p>
      <p class="text-sm text-gray-500">Notify me when logins happen on desktop.</p>
    </div>
    <button type="button" class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="true">
      <span aria-hidden="true" class="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
    </button>
  </div>
  <div class="flex flex-col space-y-3">
    <div class="space-y-1">
      <p class="text-sm font-medium text-gray-900">Mobile alerts</p>
      <p class="text-sm text-gray-500">Get notified about mobile sign-ins.</p>
    </div>
    <button type="button" class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-gray-200 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="false">
      <span aria-hidden="true" class="pointer-events-none inline-block h-5 w-5 translate-x-0 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
    </button>
  </div>
  <div class="flex flex-col space-y-3">
    <div class="space-y-1">
      <p class="text-sm font-medium text-gray-900">New device alerts</p>
      <p class="text-sm text-gray-500">Warn me about sign-ins from new devices.</p>
    </div>
    <button type="button" class="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-indigo-600 transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2" role="switch" aria-checked="true">
      <span aria-hidden="true" class="pointer-events-none inline-block h-5 w-5 translate-x-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
    </button>
  </div>
</div>`

      default:
        return '<div></div>'
    }
  }

  const renderTogglePreview = (style) => {
    switch (style) {
      case 'simple':
        return (
          <div className="flex items-center justify-between">
            <span className="flex flex-col">
              <span className="text-sm font-medium text-gray-900">Automatic updates</span>
              <span className="mt-1 text-sm text-gray-500">Always keep this workspace up to date.</span>
            </span>
            <Switch
              checked={notificationsEnabled}
              onChange={setNotificationsEnabled}
              className={classNames(
                notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
              )}
            >
              <span
                aria-hidden="true"
                className={classNames(
                  notificationsEnabled ? 'translate-x-5' : 'translate-x-0',
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
              />
            </Switch>
          </div>
        )

      case 'settingsCard':
        return (
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">Automatic payments</h3>
                  <p className="mt-1 text-sm text-gray-500">Enable recurring billing for all invoices.</p>
                </div>
                <Switch
                  checked={autoPay}
                  onChange={setAutoPay}
                  className={classNames(
                    autoPay ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      autoPay ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
            </div>
            <div className="border-t border-gray-200 bg-gray-50 px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium text-gray-900">Marketing emails</h4>
                  <p className="mt-1 text-sm text-gray-500">Keep your team in the loop about new features.</p>
                </div>
                <Switch
                  checked={marketingEmails}
                  onChange={setMarketingEmails}
                  className={classNames(
                    marketingEmails ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      marketingEmails ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
            </div>
          </div>
        )

      case 'inlineGrid':
        return (
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                id: 'desktop',
                title: 'Desktop alerts',
                description: 'Notify me when logins happen on desktop.',
                value: loginAlerts.desktop,
                onChange: () => toggleLoginAlert('desktop')
              },
              {
                id: 'mobile',
                title: 'Mobile alerts',
                description: 'Get notified about mobile sign-ins.',
                value: loginAlerts.mobile,
                onChange: () => toggleLoginAlert('mobile')
              },
              {
                id: 'newDevice',
                title: 'New device alerts',
                description: 'Warn me about sign-ins from new devices.',
                value: loginAlerts.newDevice,
                onChange: () => toggleLoginAlert('newDevice')
              }
            ].map((item) => (
              <div key={item.id} className="flex flex-col space-y-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                <Switch
                  checked={item.value}
                  onChange={item.onChange}
                  className={classNames(
                    item.value ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      item.value ? 'translate-x-5' : 'translate-x-0',
                      'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                  />
                </Switch>
              </div>
            ))}
          </div>
        )

      default:
        return null
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
                <span className="ml-4 text-sm font-medium text-gray-900">切换组件</span>
              </div>
            </li>
          </ol>
        </nav>

        <div>
          {Object.entries(toggleStyles).map(([key, style]) => (
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
                    {renderTogglePreview(key)}
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
