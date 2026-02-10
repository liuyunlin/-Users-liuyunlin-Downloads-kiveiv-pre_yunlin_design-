import { useState } from 'react'

export function SelectMenus({ onNavigateHome, onNavigateToBasic }) {
  const [activeTabs, setActiveTabs] = useState({})
  const [codeTypes, setCodeTypes] = useState({
    simpleSelect: 'react',
    customWithCheckOnLeft: 'react',
    customSelect: 'react'
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
              onClick={onNavigateToBasic}
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
            <span className="ml-4 text-sm font-medium text-gray-900">选择菜单</span>
          </div>
        </li>
      </ol>
    </nav>
  )

  // Simple native select
  const renderSimpleSelect = () => {
    return (
      <div className="max-w-md">
        <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
          Location
        </label>
        <select
          id="location"
          name="location"
          className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue="Canada"
        >
          <option>United States</option>
          <option>Canada</option>
          <option>Mexico</option>
        </select>
      </div>
    )
  }

  // Custom with check on left
  const renderCustomWithCheckOnLeft = () => {
    const [isOpen2, setIsOpen2] = useState(false)
    const [selected2, setSelected2] = useState('Tom Cook')

    const people2 = [
      'Wade Cooper',
      'Arlene Mccoy', 
      'Devon Webb',
      'Tom Cook',
      'Tanya Fox',
      'Hellen Schmidt',
      'Caroline Schultz'
    ]

    return (
      <div className="max-w-md">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Assigned to
        </label>
        <div className="relative mt-2">
          <button
            type="button"
            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={() => setIsOpen2(!isOpen2)}
          >
            <span className="block truncate">{selected2}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          </button>

          {isOpen2 && (
            <ul 
              className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" 
              tabIndex="-1" 
              role="listbox"
            >
              {people2.map((person, index) => (
                <li 
                  key={index}
                  className="relative cursor-default select-none py-2 pl-9 pr-4 text-gray-900 hover:bg-indigo-600 hover:text-white"
                  role="option"
                  onClick={() => {
                    setSelected2(person)
                    setIsOpen2(false)
                  }}
                >
                  {selected2 === person && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                  <span className="block truncate font-normal">{person}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }

  // Custom select with status indicator
  const renderCustomSelect = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState({ 
      name: 'Wade Cooper', 
      status: 'Online', 
      statusColor: 'bg-green-400' 
    })

    const people = [
      { name: 'Wade Cooper', status: 'Online', statusColor: 'bg-green-400' },
      { name: 'Arlene Mccoy', status: 'Away', statusColor: 'bg-yellow-400' },
      { name: 'Devon Webb', status: 'Offline', statusColor: 'bg-gray-400' },
      { name: 'Tom Cook', status: 'Online', statusColor: 'bg-green-400' },
      { name: 'Tanya Fox', status: 'Offline', statusColor: 'bg-gray-400' },
    ]

    return (
      <div className="max-w-md">
        <label className="block text-sm font-medium leading-6 text-gray-900">
          Assigned to
        </label>
        <div className="relative mt-2">
          <button
            type="button"
            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
            aria-haspopup="listbox"
            aria-expanded="true"
            aria-labelledby="listbox-label"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="flex items-center">
              <span className={`inline-block h-2 w-2 flex-shrink-0 rounded-full ${selected.statusColor}`} />
              <span className="ml-3 block truncate">{selected.name}</span>
              <span className="ml-2 text-gray-500">({selected.status})</span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clipRule="evenodd" />
              </svg>
            </span>
          </button>

          {isOpen && (
            <ul 
              className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" 
              tabIndex="-1" 
              role="listbox"
            >
              {people.map((person, index) => (
                <li 
                  key={index}
                  className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                  role="option"
                  onClick={() => {
                    setSelected(person)
                    setIsOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    <span className={`inline-block h-2 w-2 flex-shrink-0 rounded-full ${person.statusColor}`} />
                    <span className="ml-3 block truncate font-normal">
                      {person.name}
                    </span>
                    <span className="ml-2 text-gray-500">({person.status})</span>
                  </div>
                  {selected.name === person.name && (
                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
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
          <div className="bg-white rounded-lg p-6 shadow-sm">
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
                      'simpleSelect': `// Simple native select
export default function SimpleSelect() {
  return (
    <div className="max-w-md">
      <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
        Location
      </label>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="Canada"
      >
        <option>United States</option>
        <option>Canada</option>
        <option>Mexico</option>
      </select>
    </div>
  )
}`,
                      'customWithCheckOnLeft': `// Custom with check on left
import { useState } from 'react'

export default function CustomWithCheckOnLeft() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState('Tom Cook')

  const people = [
    'Wade Cooper',
    'Arlene Mccoy', 
    'Devon Webb',
    'Tom Cook',
    'Tanya Fox',
    'Hellen Schmidt',
    'Caroline Schultz'
  ]

  return (
    <div className="max-w-md">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </label>
      <div className="relative mt-2">
        <button
          type="button"
          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="block truncate">{selected}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people.map((person, index) => (
              <li 
                key={index}
                className="relative cursor-default select-none py-2 pl-9 pr-4 text-gray-900 hover:bg-indigo-600 hover:text-white"
                onClick={() => {
                  setSelected(person)
                  setIsOpen(false)
                }}
              >
                {selected === person && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
                <span className="block truncate font-normal">{person}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}`,
                      'customSelect': `// Custom select with status indicator
import { useState } from 'react'

export default function CustomSelect() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState({ 
    name: 'Wade Cooper', 
    status: 'Online', 
    statusColor: 'bg-green-400' 
  })

  const people = [
    { name: 'Wade Cooper', status: 'Online', statusColor: 'bg-green-400' },
    { name: 'Arlene Mccoy', status: 'Away', statusColor: 'bg-yellow-400' },
    { name: 'Devon Webb', status: 'Offline', statusColor: 'bg-gray-400' },
    { name: 'Tom Cook', status: 'Online', statusColor: 'bg-green-400' },
    { name: 'Tanya Fox', status: 'Offline', statusColor: 'bg-gray-400' },
  ]

  return (
    <div className="max-w-md">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </label>
      <div className="relative mt-2">
        <button
          type="button"
          className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex items-center">
            <span className={\`inline-block h-2 w-2 flex-shrink-0 rounded-full \${selected.statusColor}\`} />
            <span className="ml-3 block truncate">{selected.name}</span>
            <span className="ml-2 text-gray-500">({selected.status})</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z" clipRule="evenodd" />
            </svg>
          </span>
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people.map((person, index) => (
              <li 
                key={index}
                className="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white"
                onClick={() => {
                  setSelected(person)
                  setIsOpen(false)
                }}
              >
                <div className="flex items-center">
                  <span className={\`inline-block h-2 w-2 flex-shrink-0 rounded-full \${person.statusColor}\`} />
                  <span className="ml-3 block truncate font-normal">
                    {person.name}
                  </span>
                  <span className="ml-2 text-gray-500">({person.status})</span>
                </div>
                {selected.name === person.name && (
                  <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}`
                    };

                    const htmlCodes = {
                      'simpleSelect': `<!-- Simple native select -->
<div class="max-w-md">
  <label for="location" class="block text-sm font-medium leading-6 text-gray-900">
    Location
  </label>
  <select
    id="location"
    name="location"
    class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
  >
    <option>United States</option>
    <option selected>Canada</option>
    <option>Mexico</option>
  </select>
</div>`,
                      'customWithCheckOnLeft': `<!-- Custom with check on left -->
<!-- Note: This requires JavaScript for full functionality -->
<div class="max-w-md">
  <label class="block text-sm font-medium leading-6 text-gray-900">
    Assigned to
  </label>
  <div class="relative mt-2">
    <button
      type="button"
      class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
      aria-haspopup="listbox"
      aria-expanded="true"
    >
      <span class="block truncate">Tom Cook</span>
      <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <ul class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      <li class="relative cursor-default select-none py-2 pl-9 pr-4 text-gray-900 hover:bg-indigo-600 hover:text-white">
        <span class="block truncate font-normal">Wade Cooper</span>
      </li>
      <li class="relative cursor-default select-none py-2 pl-9 pr-4 text-gray-900 hover:bg-indigo-600 hover:text-white">
        <span class="block truncate font-normal">Arlene Mccoy</span>
      </li>
      <li class="relative cursor-default select-none py-2 pl-9 pr-4 text-gray-900 hover:bg-indigo-600 hover:text-white">
        <span class="block truncate font-normal">Devon Webb</span>
      </li>
      <li class="relative cursor-default select-none py-2 pl-9 pr-4 text-gray-900 hover:bg-indigo-600 hover:text-white">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
        </span>
        <span class="block truncate font-normal">Tom Cook</span>
      </li>
      <li class="relative cursor-default select-none py-2 pl-9 pr-4 text-gray-900 hover:bg-indigo-600 hover:text-white">
        <span class="block truncate font-normal">Tanya Fox</span>
      </li>
      <li class="relative cursor-default select-none py-2 pl-9 pr-4 text-gray-900 hover:bg-indigo-600 hover:text-white">
        <span class="block truncate font-normal">Hellen Schmidt</span>
      </li>
      <li class="relative cursor-default select-none py-2 pl-9 pr-4 text-gray-900 hover:bg-indigo-600 hover:text-white">
        <span class="block truncate font-normal">Caroline Schultz</span>
      </li>
    </ul>
  </div>
</div>`,
                      'customSelect': `<!-- Custom select with status indicator -->
<!-- Note: This requires JavaScript for full functionality -->
<div class="max-w-md">
  <label class="block text-sm font-medium leading-6 text-gray-900">
    Assigned to
  </label>
  <div class="relative mt-2">
    <button
      type="button"
      class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6"
      aria-haspopup="listbox"
      aria-expanded="true"
    >
      <span class="flex items-center">
        <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400"></span>
        <span class="ml-3 block truncate">Wade Cooper</span>
        <span class="ml-2 text-gray-500">(Online)</span>
      </span>
      <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
        <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
        </svg>
      </span>
    </button>

    <ul class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
      <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white">
        <div class="flex items-center">
          <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-green-400"></span>
          <span class="ml-3 block truncate font-normal">Wade Cooper</span>
          <span class="ml-2 text-gray-500">(Online)</span>
        </div>
        <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
          <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
          </svg>
        </span>
      </li>
      <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 hover:bg-indigo-600 hover:text-white">
        <div class="flex items-center">
          <span class="inline-block h-2 w-2 flex-shrink-0 rounded-full bg-yellow-400"></span>
          <span class="ml-3 block truncate font-normal">Arlene Mccoy</span>
          <span class="ml-2 text-gray-500">(Away)</span>
        </div>
      </li>
      <!-- More options... -->
    </ul>
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
          {renderComponent('simpleSelect', renderSimpleSelect, 'Simple select')}
          {renderComponent('customWithCheckOnLeft', renderCustomWithCheckOnLeft, 'Custom with check on left')}
          {renderComponent('customSelect', renderCustomSelect, 'Custom select')}
        </div>
      </div>
    </div>
  )
}