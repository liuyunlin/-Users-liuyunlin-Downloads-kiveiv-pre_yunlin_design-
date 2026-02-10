import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

// Main Sidebar component following Catalyst patterns
export const Sidebar = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn(
        'flex h-full w-64 flex-col bg-white dark:bg-zinc-900 border-r border-zinc-950/10 dark:border-white/10',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

Sidebar.displayName = 'Sidebar'

// Sidebar Header
export const SidebarHeader = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn('flex shrink-0 flex-col px-6 pt-5 pb-4', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

SidebarHeader.displayName = 'SidebarHeader'

// Sidebar Body
export const SidebarBody = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn('flex flex-1 flex-col overflow-y-auto px-6', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

SidebarBody.displayName = 'SidebarBody'

// Sidebar Footer
export const SidebarFooter = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn('flex shrink-0 flex-col px-6 pb-5 pt-4', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

SidebarFooter.displayName = 'SidebarFooter'

// Sidebar Section
export const SidebarSection = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn('flex flex-col gap-0.5', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

SidebarSection.displayName = 'SidebarSection'

// Sidebar Spacer
export const SidebarSpacer = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn('flex-1', className)}
      ref={ref}
      {...props}
    />
  )
})

SidebarSpacer.displayName = 'SidebarSpacer'

// Sidebar Heading
export const SidebarHeading = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <h3
      className={cn(
        'mb-1 px-2 text-xs/6 font-medium text-zinc-500 dark:text-zinc-400',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </h3>
  )
})

SidebarHeading.displayName = 'SidebarHeading'

// Sidebar Item
export const SidebarItem = forwardRef(({
  children,
  href,
  current = false,
  className,
  ...props
}, ref) => {
  const Component = href ? 'a' : 'div'
  
  return (
    <Component
      href={href}
      className={cn(
        'flex w-full items-center gap-3 rounded-lg px-2 py-2.5 text-left text-base/6 font-medium text-zinc-950 sm:py-2 sm:text-sm/5',
        'data-[slot=icon]:*:size-6 data-[slot=icon]:*:shrink-0 data-[slot=icon]:*:fill-zinc-500 sm:data-[slot=icon]:*:size-5',
        'data-[slot=icon]:last:*:ml-auto data-[slot=icon]:last:*:size-5 sm:data-[slot=icon]:last:*:size-4',
        'data-[slot=avatar]:*:-m-0.5 data-[slot=avatar]:*:size-7 data-[slot=avatar]:*:[--ring-opacity:10%] sm:data-[slot=avatar]:*:size-6',
        current 
          ? 'bg-blue-600 text-white data-[slot=icon]:*:fill-white dark:bg-blue-600 dark:text-white dark:data-[slot=icon]:*:fill-white' 
          : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 data-[slot=icon]:*:fill-zinc-400 hover:data-[slot=icon]:*:fill-zinc-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white dark:data-[slot=icon]:*:fill-zinc-500 dark:hover:data-[slot=icon]:*:fill-zinc-400',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  )
})

SidebarItem.displayName = 'SidebarItem'

// Sidebar Label
export const SidebarLabel = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <span
      className={cn('truncate', className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

SidebarLabel.displayName = 'SidebarLabel'

// Legacy components for backward compatibility
export const LegacySidebarItem = forwardRef(({ 
  icon, 
  label, 
  isActive = false, 
  onClick,
  badge,
  className,
  ...props 
}, ref) => {
  return (
    <div
      className={cn(
        'flex items-center px-3 py-2 text-sm font-medium rounded-md cursor-pointer transition-colors duration-200',
        isActive 
          ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white' 
          : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white',
        className
      )}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {icon && <span className="mr-3 flex-shrink-0">{icon}</span>}
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="ml-auto bg-zinc-900 text-white rounded-full px-2 py-1 text-xs dark:bg-zinc-100 dark:text-zinc-900">
          {badge}
        </span>
      )}
    </div>
  )
})

LegacySidebarItem.displayName = 'LegacySidebarItem'

export const SidebarGroup = forwardRef(({ title, children, className, ...props }, ref) => {
  return (
    <div className={cn('mb-6', className)} ref={ref} {...props}>
      {title && (
        <h3 className="px-3 mb-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider dark:text-zinc-400">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  )
})

SidebarGroup.displayName = 'SidebarGroup'