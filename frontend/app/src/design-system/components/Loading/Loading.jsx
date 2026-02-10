import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Loading = forwardRef(({
  size = 'md',
  variant = 'primary',
  text,
  overlay = false,
  className,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }

  const variantClasses = {
    primary: 'text-blue-600 dark:text-blue-500',
    white: 'text-white',
    gray: 'text-zinc-600 dark:text-zinc-400',
  }

  const spinner = (
    <div className={cn('animate-spin', sizeClasses[size], variantClasses[variant])}>
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )

  if (overlay) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75 dark:bg-zinc-900 dark:bg-opacity-75"
        ref={ref}
        {...props}
      >
        <div className="flex flex-col items-center space-y-4">
          {spinner}
          {text && (
            <p className="text-sm text-zinc-600 font-medium dark:text-zinc-400">{text}</p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex items-center justify-center', className)} ref={ref} {...props}>
      <div className="flex flex-col items-center space-y-2">
        {spinner}
        {text && (
          <p className="text-sm text-zinc-600 font-medium dark:text-zinc-400">{text}</p>
        )}
      </div>
    </div>
  )
})

Loading.displayName = 'Loading'

export const Spinner = forwardRef(({ size = 'md', variant = 'primary', className, ...props }, ref) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  }

  const variantClasses = {
    primary: 'text-blue-600 dark:text-blue-500',
    white: 'text-white',
    gray: 'text-zinc-600 dark:text-zinc-400',
  }

  return (
    <div
      className={cn(
        'animate-spin',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      ref={ref}
      {...props}
    >
      <svg className="w-full h-full" fill="none" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  )
})

Spinner.displayName = 'Spinner'

export const Skeleton = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      className={cn('animate-pulse bg-zinc-200 rounded dark:bg-zinc-700', className)}
      ref={ref}
      {...props}
    />
  )
})

Skeleton.displayName = 'Skeleton'