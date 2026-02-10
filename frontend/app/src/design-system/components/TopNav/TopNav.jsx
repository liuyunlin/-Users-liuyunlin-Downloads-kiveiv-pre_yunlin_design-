import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

// Main TopNav component following Catalyst Navbar patterns
export const TopNav = forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <nav
      className={cn(
        'flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8',
        'bg-white shadow-sm border-b border-zinc-950/10 dark:bg-zinc-900 dark:border-white/10',
        'min-h-[64px]',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </nav>
  )
})

TopNav.displayName = 'TopNav'

// TopNav Section for grouping items
export const TopNavSection = forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      className={cn('flex items-center gap-4', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

TopNavSection.displayName = 'TopNavSection'

// TopNav Item for individual navigation elements
export const TopNavItem = forwardRef(({
  className,
  href,
  current = false,
  children,
  ...props
}, ref) => {
  const Component = href ? 'a' : 'button'
  
  return (
    <Component
      href={href}
      className={cn(
        'inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900',
        current 
          ? 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white'
          : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800',
        !href && 'border-0 bg-transparent cursor-pointer',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  )
})

TopNavItem.displayName = 'TopNavItem'

// TopNav Label for text content
export const TopNavLabel = forwardRef(({
  className,
  children,
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

TopNavLabel.displayName = 'TopNavLabel'

// TopNav Spacer for flexible spacing
export const TopNavSpacer = forwardRef(({
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

TopNavSpacer.displayName = 'TopNavSpacer'

// TopNav Divider for visual separation
export const TopNavDivider = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn(
        'h-6 w-px bg-zinc-950/10 dark:bg-white/10',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TopNavDivider.displayName = 'TopNavDivider'

// Legacy TopNav component for backward compatibility
export const LegacyTopNav = forwardRef(({
  className,
  logo,
  navItems = [],
  rightContent,
  onItemClick,
  ...props
}, ref) => {
  return (
    <TopNav className={className} ref={ref} {...props}>
      {logo && (
        <div className="flex items-center">
          {logo}
        </div>
      )}
      
      <TopNavSection>
        {navItems.map((item, index) => (
          <TopNavItem
            key={index}
            href={item.href}
            current={item.current}
            onClick={() => onItemClick?.(item)}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            <TopNavLabel>{item.label}</TopNavLabel>
          </TopNavItem>
        ))}
      </TopNavSection>
      
      <TopNavSpacer />
      
      {rightContent && (
        <TopNavSection>
          {rightContent}
        </TopNavSection>
      )}
    </TopNav>
  )
})

LegacyTopNav.displayName = 'LegacyTopNav'