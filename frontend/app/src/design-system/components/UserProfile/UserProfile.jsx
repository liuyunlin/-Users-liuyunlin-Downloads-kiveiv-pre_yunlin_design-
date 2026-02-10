import { forwardRef } from 'react'
import { Menu as HeadlessMenu, MenuButton as HeadlessMenuButton, MenuItem as HeadlessMenuItem, MenuItems as HeadlessMenuItems } from '@headlessui/react'
import { cn } from '../../utils/cn'

// Main UserProfile component following Catalyst patterns
export const UserProfile = forwardRef(({
  className,
  user,
  menuItems = [],
  placement = 'bottom-end',
  onItemClick,
  ...props
}, ref) => {
  const defaultMenuItems = [
    { id: 'profile', label: 'View Profile', href: '/profile' },
    { id: 'settings', label: 'Settings', href: '/settings' },
    { id: 'divider', type: 'divider' },
    { id: 'logout', label: 'Sign Out', href: '/logout', action: 'logout' }
  ]

  const items = menuItems.length > 0 ? menuItems : defaultMenuItems

  return (
    <HeadlessMenu as="div" className={cn('relative inline-block text-left', className)} ref={ref} {...props}>
      <HeadlessMenuButton className="flex items-center gap-3 rounded-lg p-2 text-left text-base/6 text-zinc-950 transition hover:bg-zinc-950/5 dark:text-white dark:hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {user?.avatar ? (
          <img 
            className="size-8 rounded-full bg-zinc-100 object-cover dark:bg-zinc-800" 
            src={user.avatar} 
            alt={user.name || 'User'} 
          />
        ) : (
          <div className="size-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 font-medium text-sm">
            {user?.initials || user?.name?.charAt(0) || 'U'}
          </div>
        )}
        <div className="min-w-0 flex-1 hidden sm:block">
          <div className="truncate text-sm font-medium">{user?.name || 'User'}</div>
          {user?.email && (
            <div className="truncate text-xs text-zinc-500 dark:text-zinc-400">{user.email}</div>
          )}
        </div>
        <div className="flex items-center sm:hidden">
          <div className="size-2 rounded-full bg-zinc-400"></div>
        </div>
      </HeadlessMenuButton>

      <HeadlessMenuItems 
        className={cn(
          'absolute z-10 mt-2 min-w-full origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-zinc-900 dark:ring-white/10',
          placement === 'bottom-end' && 'right-0',
          placement === 'bottom-start' && 'left-0',
          placement === 'top-end' && 'right-0 bottom-full mb-2',
          placement === 'top-start' && 'left-0 bottom-full mb-2'
        )}
      >
        {items.map((item) => {
          if (item.type === 'divider') {
            return (
              <div key={item.id} className="border-t border-zinc-200 dark:border-zinc-700" />
            )
          }

          return (
            <HeadlessMenuItem key={item.id}>
              {({ focus }) => (
                <a
                  href={item.href}
                  className={cn(
                    'block px-4 py-2 text-sm transition-colors',
                    focus 
                      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white' 
                      : 'text-zinc-700 dark:text-zinc-300',
                    item.action === 'logout' && 'text-red-700 dark:text-red-400'
                  )}
                  onClick={(e) => {
                    if (onItemClick) {
                      e.preventDefault()
                      onItemClick(item)
                    }
                  }}
                >
                  {item.icon && (
                    <span className="mr-3 inline-block w-4 h-4">{item.icon}</span>
                  )}
                  {item.label}
                </a>
              )}
            </HeadlessMenuItem>
          )
        })}
      </HeadlessMenuItems>
    </HeadlessMenu>
  )
})

UserProfile.displayName = 'UserProfile'

// UserProfile Avatar component (standalone avatar)
export const UserProfileAvatar = forwardRef(({
  className,
  user,
  size = 'md',
  onClick,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'size-6',
    md: 'size-8', 
    lg: 'size-10',
    xl: 'size-12'
  }

  return (
    <button
      className={cn(
        'relative inline-flex items-center justify-center rounded-full transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900',
        onClick && 'hover:opacity-80',
        className
      )}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {user?.avatar ? (
        <img 
          className={cn('rounded-full bg-zinc-100 object-cover dark:bg-zinc-800', sizeClasses[size])} 
          src={user.avatar} 
          alt={user.name || 'User'} 
        />
      ) : (
        <div className={cn(
          'rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 font-medium',
          sizeClasses[size],
          size === 'sm' && 'text-xs',
          size === 'md' && 'text-sm',
          size === 'lg' && 'text-base',
          size === 'xl' && 'text-lg'
        )}>
          {user?.initials || user?.name?.charAt(0) || 'U'}
        </div>
      )}
    </button>
  )
})

UserProfileAvatar.displayName = 'UserProfileAvatar'

// UserProfile Card for displaying user info
export const UserProfileCard = forwardRef(({
  className,
  user,
  showEmail = true,
  showRole = false,
  actions,
  ...props
}, ref) => {
  return (
    <div 
      className={cn(
        'flex items-center gap-4 rounded-lg p-4 bg-white border border-zinc-950/10 dark:bg-zinc-900 dark:border-white/10',
        className
      )}
      ref={ref}
      {...props}
    >
      <UserProfileAvatar user={user} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-zinc-950 dark:text-white">
          {user?.name || 'User Name'}
        </div>
        {showEmail && user?.email && (
          <div className="text-sm text-zinc-500 dark:text-zinc-400">
            {user.email}
          </div>
        )}
        {showRole && user?.role && (
          <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {user.role}
          </div>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2">
          {actions}
        </div>
      )}
    </div>
  )
})

UserProfileCard.displayName = 'UserProfileCard'

// Legacy UserProfile for backward compatibility
export const LegacyUserProfile = forwardRef(({
  className,
  name,
  email,
  avatar,
  role,
  status = 'online',
  size = 'md',
  showStatus = false,
  onClick,
  ...props
}, ref) => {
  const user = { name, email, avatar, role }

  return (
    <div 
      className={cn(
        'flex items-center gap-3 p-2 rounded-lg transition-colors',
        onClick && 'cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800',
        className
      )}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      <div className="relative">
        <UserProfileAvatar user={user} size={size} />
        {showStatus && (
          <div className={cn(
            'absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full dark:border-zinc-900',
            status === 'online' && 'bg-green-400',
            status === 'busy' && 'bg-red-400', 
            status === 'away' && 'bg-yellow-400',
            status === 'offline' && 'bg-zinc-400'
          )} />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-zinc-900 dark:text-white truncate">
          {name || 'User Name'}
        </div>
        {email && (
          <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
            {email}
          </div>
        )}
        {role && (
          <div className="text-xs text-zinc-500 dark:text-zinc-400">
            {role}
          </div>
        )}
      </div>
    </div>
  )
})

LegacyUserProfile.displayName = 'LegacyUserProfile'