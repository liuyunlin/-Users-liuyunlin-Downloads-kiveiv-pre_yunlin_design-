import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Select = forwardRef(({
  className,
  children,
  disabled = false,
  invalid = false,
  placeholder,
  ...props
}, ref) => {
  return (
    <select
      className={cn(
        // Base styles following Catalyst patterns
        'relative block w-full appearance-none rounded-lg border px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] text-base/6 text-zinc-950 sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6',
        // Border styles
        'border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
        // Background
        'bg-white dark:bg-zinc-900',
        // Focus styles
        'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
        // Invalid styles
        invalid && 'border-red-500 data-[hover]:border-red-600 data-[focus]:outline-red-500 dark:border-red-400 dark:data-[hover]:border-red-300 dark:data-[focus]:outline-red-400',
        // Disabled styles
        'data-[disabled]:border-zinc-950/20 data-[disabled]:bg-zinc-950/5 data-[disabled]:text-zinc-950/50 dark:data-[disabled]:border-white/15 dark:data-[disabled]:bg-white/5 dark:data-[disabled]:text-white/50',
        // Dark mode text
        'dark:text-white',
        className
      )}
      disabled={disabled}
      data-disabled={disabled ? true : undefined}
      data-invalid={invalid ? true : undefined}
      data-hover={!disabled ? true : undefined}
      data-focus={!disabled ? true : undefined}
      ref={ref}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {children}
    </select>
  )
})

Select.displayName = 'Select'