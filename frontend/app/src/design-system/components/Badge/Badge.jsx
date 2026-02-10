import { cn } from '../../utils/cn'

// Color variants following Catalyst Badge design patterns
const colorVariants = {
  zinc: 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300',
  red: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400',
  orange: 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400',
  amber: 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400',
  yellow: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
  lime: 'bg-lime-100 text-lime-800 dark:bg-lime-900/20 dark:text-lime-400',
  green: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
  emerald: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400',
  teal: 'bg-teal-100 text-teal-800 dark:bg-teal-900/20 dark:text-teal-400',
  cyan: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/20 dark:text-cyan-400',
  sky: 'bg-sky-100 text-sky-800 dark:bg-sky-900/20 dark:text-sky-400',
  blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400',
  indigo: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-400',
  violet: 'bg-violet-100 text-violet-800 dark:bg-violet-900/20 dark:text-violet-400',
  purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400',
  fuchsia: 'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/20 dark:text-fuchsia-400',
  pink: 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-400',
  rose: 'bg-rose-100 text-rose-800 dark:bg-rose-900/20 dark:text-rose-400',
}

export function Badge({
  children,
  className,
  color = 'zinc',
  ...props
}) {
  return (
    <span
      className={cn(
        // Base badge styles following Catalyst patterns
        'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-xs/5 font-medium',
        // Color variant
        colorVariants[color] || colorVariants.zinc,
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

// Badge button variant for interactive badges
export function BadgeButton({
  children,
  className,
  color = 'zinc',
  href,
  ...props
}) {
  const Component = href ? 'a' : 'button'
  
  return (
    <Component
      href={href}
      className={cn(
        // Base badge button styles
        'inline-flex items-center gap-x-1.5 rounded-md px-1.5 py-0.5 text-xs/5 font-medium',
        // Interactive states
        'cursor-pointer transition-colors hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
        // Color variant
        colorVariants[color] || colorVariants.zinc,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}