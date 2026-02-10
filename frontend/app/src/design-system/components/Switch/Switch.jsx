import { forwardRef } from 'react'
import { Switch as HeadlessSwitch } from '@headlessui/react'
import { cn } from '../../utils/cn'

// Main Switch component following Catalyst patterns
export const Switch = forwardRef(({
  className,
  color = 'dark/zinc',
  disabled = false,
  ...props
}, ref) => {
  const colorClasses = {
    'dark/zinc': {
      checked: 'bg-zinc-900 dark:bg-zinc-600',
      unchecked: 'bg-zinc-200 dark:bg-zinc-700'
    },
    blue: {
      checked: 'bg-blue-600 dark:bg-blue-500',
      unchecked: 'bg-zinc-200 dark:bg-zinc-700'
    },
    green: {
      checked: 'bg-green-600 dark:bg-green-500',
      unchecked: 'bg-zinc-200 dark:bg-zinc-700'
    },
    red: {
      checked: 'bg-red-600 dark:bg-red-500',
      unchecked: 'bg-zinc-200 dark:bg-zinc-700'
    },
    purple: {
      checked: 'bg-purple-600 dark:bg-purple-500',
      unchecked: 'bg-zinc-200 dark:bg-zinc-700'
    }
  }

  return (
    <HeadlessSwitch
      className={cn(
        'group relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900',
        'data-[checked]:bg-zinc-900 data-[checked]:dark:bg-zinc-600',
        'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        className
      )}
      disabled={disabled}
      data-disabled={disabled ? true : undefined}
      ref={ref}
      {...props}
    >
      {({ checked }) => (
        <>
          <span className="sr-only">Use setting</span>
          <span
            className={cn(
              'pointer-events-none relative inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out',
              checked 
                ? colorClasses[color].checked 
                : colorClasses[color].unchecked
            )}
          >
            <span
              className={cn(
                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200 ease-in-out',
                checked ? 'opacity-0' : 'opacity-100'
              )}
              aria-hidden="true"
            >
              <svg className="h-3 w-3 text-zinc-400 dark:text-zinc-500" fill="none" viewBox="0 0 12 12">
                <path
                  d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span
              className={cn(
                'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-100 ease-in-out',
                checked ? 'opacity-100' : 'opacity-0'
              )}
              aria-hidden="true"
            >
              <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 12 12">
                <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
              </svg>
            </span>
          </span>
          <span
            className={cn(
              'absolute left-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              checked ? 'translate-x-5' : 'translate-x-0'
            )}
          />
        </>
      )}
    </HeadlessSwitch>
  )
})

Switch.displayName = 'Switch'

// SwitchField component to wrap individual switches
export const SwitchField = forwardRef(({
  children,
  className,
  disabled = false,
  ...props
}, ref) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-6',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      ref={ref}
      {...props}
    >
      <div className="flex flex-col">
        {children}
      </div>
    </div>
  )
})

SwitchField.displayName = 'SwitchField'

// SwitchGroup component for grouping multiple switches
export const SwitchGroup = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      className={cn('space-y-6', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

SwitchGroup.displayName = 'SwitchGroup'

// Label component for switches (reusing from fieldset)
export const SwitchLabel = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <span
      className={cn(
        'text-sm font-medium text-zinc-950 dark:text-white',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

SwitchLabel.displayName = 'SwitchLabel'

// Description component for switches
export const SwitchDescription = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <span
      className={cn(
        'text-sm text-zinc-500 dark:text-zinc-400',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

SwitchDescription.displayName = 'SwitchDescription'