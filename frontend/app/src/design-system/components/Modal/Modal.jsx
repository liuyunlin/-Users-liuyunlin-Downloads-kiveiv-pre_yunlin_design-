import { Dialog as HeadlessDialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { cn } from '../../utils/cn'

// Main Modal component following Catalyst Dialog patterns
export function Modal({
  open = false,
  onClose,
  children,
  className,
  size = 'lg',
  ...props
}) {
  const sizeClasses = {
    xs: 'max-w-xs',
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
  }

  return (
    <HeadlessDialog
      open={open}
      onClose={onClose}
      className="relative z-50"
      {...props}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      {/* Dialog container */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          className={cn(
            // Base dialog styles following Catalyst patterns
            'w-full space-y-4 bg-white p-6 shadow-xl ring-1 ring-zinc-950/5 rounded-xl',
            // Dark mode support
            'dark:bg-zinc-900 dark:ring-white/10',
            // Size classes
            sizeClasses[size],
            className
          )}
        >
          {children}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  )
}

// Modal Title component following Catalyst DialogTitle pattern
export function ModalHeader({ 
  children, 
  className, 
  ...props 
}) {
  return (
    <DialogTitle
      className={cn(
        'text-lg font-semibold text-zinc-950 dark:text-white',
        className
      )}
      {...props}
    >
      {children}
    </DialogTitle>
  )
}

// Modal Content/Body component following Catalyst DialogBody pattern
export function ModalContent({ 
  children, 
  className, 
  ...props 
}) {
  return (
    <div
      className={cn(
        'text-sm/6 text-zinc-500 dark:text-zinc-400',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Modal Footer/Actions component following Catalyst DialogActions pattern
export function ModalFooter({ 
  children, 
  className, 
  ...props 
}) {
  return (
    <div
      className={cn(
        'flex justify-end gap-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}