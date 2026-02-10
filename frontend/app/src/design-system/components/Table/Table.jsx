import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

// Main Table component following Catalyst patterns
export const Table = forwardRef(({
  className,
  dense = false,
  striped = false,
  grid = false,
  bleed = false,
  compact = false,
  ...props
}, ref) => {
  return (
    <div 
      className={cn(
        'flow-root',
        !bleed && 'rounded-lg border border-zinc-950/10 dark:border-white/10'
      )}
    >
      <div className={cn(
        'overflow-x-auto',
        !bleed && '-m-px'
      )}>
        <table
          className={cn(
            'min-w-full text-left text-sm/6',
            striped && '[&_tbody_tr:nth-child(odd)]:bg-zinc-950/[2.5%] dark:[&_tbody_tr:nth-child(odd)]:bg-white/[2.5%]',
            !striped && '[&_tbody_tr]:border-b [&_tbody_tr]:border-zinc-950/5 last:[&_tbody_tr]:border-none dark:[&_tbody_tr]:border-white/5',
            grid && '[&_td]:border-r [&_td]:border-zinc-950/5 last:[&_td]:border-none dark:[&_td]:border-white/5',
            dense && '[&_td]:py-2.5 [&_th]:py-2.5',
            compact && '[&_td]:py-1 [&_th]:py-1',
            bleed && 'mx-[calc(-1*var(--gutter,theme(spacing.4)))] sm:mx-[calc(-1*var(--gutter,theme(spacing.6)))]',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    </div>
  )
})

Table.displayName = 'Table'

// Table Header component
export const TableHeader = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <thead
      className={cn(
        'text-zinc-500 dark:text-zinc-400',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TableHeader.displayName = 'TableHeader'

// Table Body component  
export const TableBody = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <tbody
      className={cn(className)}
      ref={ref}
      {...props}
    />
  )
})

TableBody.displayName = 'TableBody'

// Table Row component
export const TableRow = forwardRef(({
  className,
  href,
  ...props
}, ref) => {
  const Component = href ? 'a' : 'tr'
  
  return (
    <Component
      href={href}
      className={cn(
        href && 'contents',
        !href && 'hover:bg-zinc-950/[2.5%] dark:hover:bg-white/[2.5%]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TableRow.displayName = 'TableRow'

// Table Head component (for header cells)
export const TableHead = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <th
      className={cn(
        'border-b border-b-zinc-950/10 px-4 py-2 font-medium first:pl-[var(--gutter,theme(spacing.4))] last:pr-[var(--gutter,theme(spacing.4))] dark:border-b-white/10 sm:first:pl-[var(--gutter,theme(spacing.6))] sm:last:pr-[var(--gutter,theme(spacing.6))]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TableHead.displayName = 'TableHead'

// Table Cell component
export const TableCell = forwardRef(({
  className,
  ...props
}, ref) => {
  return (
    <td
      className={cn(
        'relative px-4 py-4 first:pl-[var(--gutter,theme(spacing.4))] last:pr-[var(--gutter,theme(spacing.4))] sm:first:pl-[var(--gutter,theme(spacing.6))] sm:last:pr-[var(--gutter,theme(spacing.6))]',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

TableCell.displayName = 'TableCell'