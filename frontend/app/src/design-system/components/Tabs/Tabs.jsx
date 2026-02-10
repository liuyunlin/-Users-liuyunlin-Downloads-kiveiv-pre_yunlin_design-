import { forwardRef } from 'react'
import { Tab as HeadlessTab, TabGroup as HeadlessTabGroup, TabList as HeadlessTabList, TabPanel as HeadlessTabPanel, TabPanels as HeadlessTabPanels } from '@headlessui/react'
import { cn } from '../../utils/cn'

// Main TabGroup component following Catalyst patterns
export const TabGroup = forwardRef(({
  className,
  vertical = false,
  manual = false,
  ...props
}, ref) => {
  return (
    <HeadlessTabGroup
      className={cn(
        vertical && 'flex gap-4',
        className
      )}
      vertical={vertical}
      manual={manual}
      ref={ref}
      {...props}
    />
  )
})

TabGroup.displayName = 'TabGroup'

// TabList component for tab navigation
export const TabList = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <HeadlessTabList
      className={cn(
        'flex gap-0.5 rounded-lg bg-zinc-100 p-1 text-sm font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
        'data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TabList.displayName = 'TabList'

// Individual Tab component
export const Tab = forwardRef(({
  className,
  disabled = false,
  ...props
}, ref) => {
  return (
    <HeadlessTab
      className={cn(
        'relative rounded-md px-3 py-2 text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800',
        'data-[selected]:bg-white data-[selected]:text-zinc-950 data-[selected]:shadow-sm dark:data-[selected]:bg-zinc-700 dark:data-[selected]:text-white',
        'data-[hover]:text-zinc-700 dark:data-[hover]:text-zinc-300',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        disabled && 'pointer-events-none',
        className
      )}
      disabled={disabled}
      ref={ref}
      {...props}
    />
  )
})

Tab.displayName = 'Tab'

// TabPanels container component
export const TabPanels = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <HeadlessTabPanels
      className={cn(
        'mt-4 flex-1',
        'data-[orientation=vertical]:mt-0',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TabPanels.displayName = 'TabPanels'

// Individual TabPanel component
export const TabPanel = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <HeadlessTabPanel
      className={cn(
        'rounded-lg bg-white p-4 shadow-sm ring-1 ring-zinc-950/10 dark:bg-zinc-900 dark:ring-white/10',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TabPanel.displayName = 'TabPanel'

// Legacy Tab component for backward compatibility
export const LegacyTab = forwardRef(({
  tabs = [],
  activeTab = 0,
  onChange,
  className,
  vertical = false,
  ...props
}, ref) => {
  return (
    <div className={cn('w-full', className)} ref={ref} {...props}>
      <TabGroup vertical={vertical} selectedIndex={activeTab} onChange={onChange}>
        <TabList className={cn(
          vertical && 'w-48'
        )}>
          {tabs.map((tab, index) => (
            <Tab key={index} disabled={tab.disabled}>
              {tab.label}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel key={index}>
              {tab.content}
            </TabPanel>
          ))}
        </TabPanels>
      </TabGroup>
    </div>
  )
})

LegacyTab.displayName = 'LegacyTab'