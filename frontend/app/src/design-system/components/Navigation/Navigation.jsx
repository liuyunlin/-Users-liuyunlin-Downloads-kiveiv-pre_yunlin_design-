import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Navigation = forwardRef(({ 
  items = [], 
  orientation = 'horizontal', 
  variant = 'default',
  activeItem,
  onItemClick,
  className,
  ...props 
}, ref) => {
  const orientationClasses = {
    horizontal: 'flex flex-row space-x-1',
    vertical: 'flex flex-col space-y-1',
  }

  const variantClasses = {
    default: '',
    pills: 'bg-white rounded-lg p-1 dark:bg-zinc-800',
    underline: 'border-b border-zinc-200 dark:border-zinc-700',
  }

  return (
    <nav
      className={cn(
        orientationClasses[orientation],
        variantClasses[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <NavigationItem
          key={item.id || index}
          item={item}
          isActive={activeItem === item.id}
          onClick={() => onItemClick?.(item)}
          variant={variant}
          orientation={orientation}
        />
      ))}
    </nav>
  )
})

Navigation.displayName = 'Navigation'

function NavigationItem({ item, isActive, onClick, variant }) {
  const baseClasses = 'px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer'
  
  const variantClasses = {
    default: {
      active: 'bg-blue-600 text-white dark:bg-blue-600 dark:text-white',
      inactive: 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-zinc-300 dark:hover:bg-zinc-800',
    },
    pills: {
      active: 'bg-blue-600 text-white shadow-sm dark:bg-blue-600 dark:text-white',
      inactive: 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-700',
    },
    underline: {
      active: 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-400 dark:border-blue-400',
      inactive: 'text-zinc-500 hover:text-zinc-700 border-b-2 border-transparent hover:border-zinc-300 dark:text-zinc-400 dark:hover:text-zinc-300 dark:hover:border-zinc-600',
    },
  }

  const classes = cn(
    baseClasses,
    isActive ? variantClasses[variant].active : variantClasses[variant].inactive
  )

  return (
    <div
      className={classes}
      onClick={onClick}
    >
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
      {item.badge && (
        <span className="ml-2 bg-zinc-900 text-white rounded-full px-2 py-1 text-xs dark:bg-zinc-100 dark:text-zinc-900">
          {item.badge}
        </span>
      )}
    </div>
  )
}