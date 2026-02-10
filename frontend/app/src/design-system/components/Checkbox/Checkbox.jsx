import { Checkbox as HeadlessCheckbox, Field } from '@headlessui/react'
import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

// Color variants for checkboxes following Catalyst patterns
const colorVariants = {
  'dark/zinc': 'text-zinc-900 focus:ring-zinc-950/20 dark:text-white dark:focus:ring-white/20',
  red: 'text-red-600 focus:ring-red-500/20',
  orange: 'text-orange-600 focus:ring-orange-500/20', 
  amber: 'text-amber-600 focus:ring-amber-500/20',
  yellow: 'text-yellow-600 focus:ring-yellow-500/20',
  lime: 'text-lime-600 focus:ring-lime-500/20',
  green: 'text-green-600 focus:ring-green-500/20',
  emerald: 'text-emerald-600 focus:ring-emerald-500/20',
  teal: 'text-teal-600 focus:ring-teal-500/20',
  cyan: 'text-cyan-600 focus:ring-cyan-500/20',
  sky: 'text-sky-600 focus:ring-sky-500/20',
  blue: 'text-blue-600 focus:ring-blue-500/20',
  indigo: 'text-indigo-600 focus:ring-indigo-500/20',
  violet: 'text-violet-600 focus:ring-violet-500/20',
  purple: 'text-purple-600 focus:ring-purple-500/20',
  fuchsia: 'text-fuchsia-600 focus:ring-fuchsia-500/20',
  pink: 'text-pink-600 focus:ring-pink-500/20',
  rose: 'text-rose-600 focus:ring-rose-500/20',
}

// Main Checkbox component following Catalyst patterns
export const Checkbox = forwardRef(({
  className,
  color = 'dark/zinc',
  disabled = false,
  ...props
}, ref) => {
  return (
    <HeadlessCheckbox
      disabled={disabled}
      className={cn(
        // Base checkbox styles
        'group block size-4 rounded border border-zinc-950/15 bg-white data-[checked]:border-transparent data-[checked]:bg-current',
        // Focus styles
        'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2',
        // Disabled styles
        'data-[disabled]:border-zinc-950/25 data-[disabled]:bg-zinc-950/5 data-[disabled]:opacity-50',
        // Dark mode support
        'dark:border-white/15 dark:bg-white/5 dark:data-[checked]:bg-current',
        // Color variants
        colorVariants[color] || colorVariants['dark/zinc'],
        className
      )}
      ref={ref}
      {...props}
    >
      <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
        <path d="m3 8 2.5 2.5L12 4" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </HeadlessCheckbox>
  )
})

Checkbox.displayName = 'Checkbox'

// CheckboxField component for wrapping checkbox with label
export function CheckboxField({
  className,
  disabled = false,
  children,
  ...props
}) {
  return (
    <Field
      disabled={disabled}
      className={cn(
        'flex items-center gap-3',
        className
      )}
      {...props}
    >
      {children}
    </Field>
  )
}

// CheckboxGroup component for grouping multiple checkboxes
export function CheckboxGroup({
  className,
  children,
  ...props
}) {
  return (
    <div
      className={cn(
        'space-y-3',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}