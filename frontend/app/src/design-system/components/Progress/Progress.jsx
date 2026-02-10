import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Progress = forwardRef(({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  showLabel = false,
  label,
  className,
  ...props
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
  }

  const variantClasses = {
    primary: 'bg-blue-600 dark:bg-blue-500',
    success: 'bg-green-600 dark:bg-green-500',
    warning: 'bg-amber-600 dark:bg-amber-500',
    error: 'bg-red-600 dark:bg-red-500',
  }

  return (
    <div className={cn('w-full', className)} ref={ref} {...props}>
      {(showLabel || label) && (
        <div className="flex justify-between text-sm mb-2">
          <span className="text-zinc-950 dark:text-white">{label}</span>
          {showLabel && (
            <span className="text-zinc-500 dark:text-zinc-400">{Math.round(percentage)}%</span>
          )}
        </div>
      )}
      
      <div className={cn('w-full bg-zinc-200 rounded-full overflow-hidden dark:bg-zinc-700', sizeClasses[size])}>
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out rounded-full',
            variantClasses[variant]
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  )
})

Progress.displayName = 'Progress'

export const CircularProgress = forwardRef(({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'primary',
  thickness = 4,
  showLabel = false,
  className,
  ...props
}, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const circumference = 2 * Math.PI * 45 // radius of 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  }

  const variantClasses = {
    primary: 'text-blue-600 dark:text-blue-500',
    success: 'text-green-600 dark:text-green-500',
    warning: 'text-amber-600 dark:text-amber-500',
    error: 'text-red-600 dark:text-red-500',
  }

  return (
    <div className={cn('relative', sizeClasses[size], className)} ref={ref} {...props}>
      <svg
        className="transform -rotate-90 w-full h-full"
        viewBox="0 0 100 100"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth={thickness}
          fill="none"
          className="text-zinc-200 dark:text-zinc-700"
        />
        <circle
          cx="50"
          cy="50"
          r="45"
          stroke="currentColor"
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn('transition-all duration-300 ease-out', variantClasses[variant])}
        />
      </svg>
      
      {showLabel && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-medium text-zinc-950 dark:text-white">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
    </div>
  )
})

CircularProgress.displayName = 'CircularProgress'