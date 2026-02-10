import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

// Main Pagination component following Catalyst patterns
export const Pagination = forwardRef(({
  children,
  className,
  'aria-label': ariaLabel = 'Page navigation',
  ...props
}, ref) => {
  return (
    <nav
      className={cn('flex items-center justify-center gap-1', className)}
      aria-label={ariaLabel}
      ref={ref}
      {...props}
    >
      {children}
    </nav>
  )
})

Pagination.displayName = 'Pagination'

// Pagination List container
export const PaginationList = forwardRef(({ children, className, ...props }, ref) => {
  return (
    <div 
      className={cn('flex items-center gap-1', className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

PaginationList.displayName = 'PaginationList'

// Previous button component
export const PaginationPrevious = forwardRef(({
  href,
  children = '上一页',
  className,
  onClick,
  disabled,
  ...props
}, ref) => {
  const Component = href ? 'a' : 'button'
  
  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled || !href}
      className={cn(
        'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
        disabled || !href
          ? 'text-zinc-400 cursor-not-allowed dark:text-zinc-600'
          : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800',
        className
      )}
      ref={ref}
      {...props}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      {children}
    </Component>
  )
})

PaginationPrevious.displayName = 'PaginationPrevious'

// Next button component
export const PaginationNext = forwardRef(({
  href,
  children = '下一页',
  className,
  onClick,
  disabled,
  ...props
}, ref) => {
  const Component = href ? 'a' : 'button'
  
  return (
    <Component
      href={href}
      onClick={onClick}
      disabled={disabled || !href}
      className={cn(
        'inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-colors',
        disabled || !href
          ? 'text-zinc-400 cursor-not-allowed dark:text-zinc-600'
          : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800',
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </Component>
  )
})

PaginationNext.displayName = 'PaginationNext'

// Individual page component
export const PaginationPage = forwardRef(({
  href,
  children,
  current = false,
  className,
  onClick,
  ...props
}, ref) => {
  const Component = href ? 'a' : 'button'
  
  return (
    <Component
      href={href}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-md transition-colors',
        current
          ? 'bg-blue-600 text-white dark:bg-blue-500'
          : 'text-zinc-700 hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:text-white dark:hover:bg-zinc-800',
        className
      )}
      aria-current={current ? 'page' : undefined}
      ref={ref}
      {...props}
    >
      {children}
    </Component>
  )
})

PaginationPage.displayName = 'PaginationPage'

// Gap component (ellipsis)
export const PaginationGap = forwardRef(({ className, ...props }, ref) => {
  return (
    <span
      className={cn('inline-flex items-center justify-center w-10 h-10 text-zinc-400 dark:text-zinc-500', className)}
      ref={ref}
      {...props}
    >
      ⋯
    </span>
  )
})

PaginationGap.displayName = 'PaginationGap'

// Legacy component for backward compatibility
export const LegacyPagination = forwardRef(({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  showPageNumbers = true,
  maxPageNumbers = 5,
  className,
  ...props
}, ref) => {
  const generatePageNumbers = () => {
    const pages = []
    const halfMax = Math.floor(maxPageNumbers / 2)
    
    let startPage = Math.max(1, currentPage - halfMax)
    let endPage = Math.min(totalPages, startPage + maxPageNumbers - 1)
    
    if (endPage - startPage + 1 < maxPageNumbers) {
      startPage = Math.max(1, endPage - maxPageNumbers + 1)
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    
    return pages
  }

  const pages = generatePageNumbers()
  const hasPrevious = currentPage > 1
  const hasNext = currentPage < totalPages

  return (
    <Pagination className={className} ref={ref} {...props}>
      <PaginationPrevious 
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevious}
      />
      
      {showPageNumbers && (
        <PaginationList>
          {pages[0] > 1 && (
            <>
              <PaginationPage onClick={() => onPageChange(1)}>1</PaginationPage>
              {pages[0] > 2 && <PaginationGap />}
            </>
          )}

          {pages.map((page) => (
            <PaginationPage
              key={page}
              current={currentPage === page}
              onClick={() => onPageChange(page)}
            >
              {page}
            </PaginationPage>
          ))}

          {pages[pages.length - 1] < totalPages && (
            <>
              {pages[pages.length - 1] < totalPages - 1 && <PaginationGap />}
              <PaginationPage onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </PaginationPage>
            </>
          )}
        </PaginationList>
      )}
      
      <PaginationNext 
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
      />
    </Pagination>
  )
})

LegacyPagination.displayName = 'LegacyPagination'