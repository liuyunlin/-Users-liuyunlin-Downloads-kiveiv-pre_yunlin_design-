import { forwardRef } from 'react'
import { Textarea as HeadlessTextarea } from '@headlessui/react'
import { cn } from '../../utils/cn'

// Main Textarea component following Catalyst patterns
export const Textarea = forwardRef(({
  className,
  disabled = false,
  invalid = false,
  resizable = true,
  rows = 4,
  ...props
}, ref) => {
  return (
    <HeadlessTextarea
      className={cn(
        // Base styles
        'relative block w-full appearance-none rounded-lg border px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6',
        // Border styles
        'border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20',
        // Background
        'bg-transparent dark:bg-white/5',
        // Focus styles  
        'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
        // Invalid styles
        invalid && 'border-red-500 data-[hover]:border-red-600 data-[focus]:outline-red-500 dark:border-red-400 dark:data-[hover]:border-red-300 dark:data-[focus]:outline-red-400',
        // Disabled styles
        'data-[disabled]:border-zinc-950/20 data-[disabled]:bg-zinc-950/5 data-[disabled]:text-zinc-950/50 dark:data-[disabled]:border-white/15 dark:data-[disabled]:bg-white/5 dark:data-[disabled]:text-white/50',
        // Dark mode text
        'dark:text-white dark:placeholder:text-zinc-400',
        // Resize behavior
        !resizable && 'resize-none',
        resizable && 'resize-y',
        className
      )}
      disabled={disabled}
      data-disabled={disabled ? true : undefined}
      data-invalid={invalid ? true : undefined}
      data-hover={!disabled ? true : undefined}
      data-focus={!disabled ? true : undefined}
      rows={rows}
      ref={ref}
      {...props}
    />
  )
})

Textarea.displayName = 'Textarea'

// Legacy Textarea component for backward compatibility
export const LegacyTextarea = forwardRef(({
  className,
  label,
  placeholder,
  error,
  disabled = false,
  rows = 4,
  ...props
}, ref) => {
  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'block w-full rounded-md border-0 py-1.5 text-zinc-900 shadow-sm ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:bg-zinc-800 dark:text-white dark:ring-zinc-700 dark:focus:ring-blue-500',
          error && 'ring-red-300 focus:ring-red-500',
          disabled && 'bg-zinc-50 text-zinc-500 cursor-not-allowed dark:bg-zinc-900',
          'sm:text-sm sm:leading-6'
        )}
        rows={rows}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? 'true' : 'false'}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
})

LegacyTextarea.displayName = 'LegacyTextarea'