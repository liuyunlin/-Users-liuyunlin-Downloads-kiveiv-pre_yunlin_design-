import { forwardRef } from 'react'
import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react'
import { cn } from '../../utils/cn'

// Main RadioGroup component following Catalyst patterns
export const RadioGroup = forwardRef(({
  children,
  className,
  disabled = false,
  ...props
}, ref) => {
  return (
    <HeadlessRadioGroup
      className={cn('space-y-3', className)}
      disabled={disabled}
      ref={ref}
      {...props}
    >
      {children}
    </HeadlessRadioGroup>
  )
})

RadioGroup.displayName = 'RadioGroup'

// RadioField component to wrap individual radio options
export const RadioField = forwardRef(({
  children,
  className,
  disabled = false,
  ...props
}, ref) => {
  return (
    <div
      className={cn(
        'flex items-start gap-3',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

RadioField.displayName = 'RadioField'

// Individual Radio component
export const Radio = forwardRef(({
  value,
  color = 'blue',
  disabled = false,
  className,
  ...props
}, ref) => {
  const colorClasses = {
    blue: 'text-blue-600 focus:ring-blue-500 dark:text-blue-500 dark:focus:ring-blue-400',
    green: 'text-green-600 focus:ring-green-500 dark:text-green-500 dark:focus:ring-green-400',
    red: 'text-red-600 focus:ring-red-500 dark:text-red-500 dark:focus:ring-red-400',
    purple: 'text-purple-600 focus:ring-purple-500 dark:text-purple-500 dark:focus:ring-purple-400',
    'dark/zinc': 'text-zinc-950 focus:ring-zinc-500 dark:text-zinc-100 dark:focus:ring-zinc-400',
  }

  return (
    <HeadlessRadioGroup.Option value={value} disabled={disabled}>
      {({ checked, disabled: optionDisabled }) => (
        <span
          className={cn(
            'inline-flex h-4 w-4 items-center justify-center rounded-full border border-zinc-950/20 bg-white transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-offset-2',
            checked && colorClasses[color],
            checked && 'border-current bg-current',
            optionDisabled && 'cursor-not-allowed opacity-50',
            'dark:border-white/20 dark:bg-zinc-900',
            className
          )}
          ref={ref}
          {...props}
        >
          {checked && (
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          )}
        </span>
      )}
    </HeadlessRadioGroup.Option>
  )
})

Radio.displayName = 'Radio'

// Label component for radio options
export const RadioLabel = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <HeadlessRadioGroup.Label
      className={cn(
        'block text-sm font-medium text-zinc-950 dark:text-white',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </HeadlessRadioGroup.Label>
  )
})

RadioLabel.displayName = 'RadioLabel'

// Description component for additional context
export const RadioDescription = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <HeadlessRadioGroup.Description
      className={cn(
        'text-sm text-zinc-500 dark:text-zinc-400',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </HeadlessRadioGroup.Description>
  )
})

RadioDescription.displayName = 'RadioDescription'