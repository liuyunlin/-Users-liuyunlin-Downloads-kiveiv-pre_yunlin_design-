import { cn } from '../../utils/cn'

export function Card({
  children,
  className,
  ...props
}) {
  return (
    <div
      className={cn(
        // Base card styles following Catalyst patterns
        'bg-white shadow-sm ring-1 ring-zinc-950/5 rounded-xl',
        // Dark mode support
        'dark:bg-zinc-900 dark:ring-white/10',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ 
  children, 
  className, 
  ...props 
}) {
  return (
    <div
      className={cn(
        // Header styling with proper spacing and borders
        'px-6 py-4 border-b border-zinc-950/5',
        // Dark mode support
        'dark:border-white/5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardContent({ 
  children, 
  className, 
  ...props 
}) {
  return (
    <div
      className={cn(
        // Content padding following Catalyst spacing patterns
        'px-6 py-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardFooter({ 
  children, 
  className, 
  ...props 
}) {
  return (
    <div
      className={cn(
        // Footer with border and spacing
        'px-6 py-4 border-t border-zinc-950/5 flex items-center justify-between',
        // Dark mode support
        'dark:border-white/5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}