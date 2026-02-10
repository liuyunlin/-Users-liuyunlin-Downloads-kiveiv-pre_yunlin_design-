import React, { forwardRef } from 'react'
import { cn } from '../../utils/cn'

export const Input = forwardRef(({
  className,
  type = 'text',
  invalid = false,
  disabled = false,
  ...props
}, ref) => {
  return (
    <input
      type={type}
      className={cn(
        // Base styles
        'relative block w-full appearance-none rounded-lg border px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6',
        // Border styles
        'border-zinc-950/10 data-[hover]:border-zinc-950/20',
        // Background
        'bg-white',
        // Focus styles
        'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
        // Invalid styles
        invalid && 'border-red-500 data-[hover]:border-red-600 data-[focus]:outline-red-500',
        // Disabled styles
        'data-[disabled]:border-zinc-950/20 data-[disabled]:bg-zinc-950/5 data-[disabled]:text-zinc-950/50',
        className
      )}
      disabled={disabled}
      data-disabled={disabled ? true : undefined}
      data-invalid={invalid ? true : undefined}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

// InputGroup component for inputs with icons
export const InputGroup = forwardRef(({
  className,
  children,
  ...props
}, ref) => {
  return (
    <div
      className={cn(
        'relative',
        className
      )}
      ref={ref}
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          if (child.type === Input) {
            return React.cloneElement(child, {
              className: cn(
                'pl-8', // Space for icon
                child.props.className
              )
            })
          }
          // Icon styling
          if (index === 0) {
            return React.cloneElement(child, {
              className: cn(
                'absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-zinc-500',
                child.props.className
              )
            })
          }
        }
        return child
      })}
    </div>
  )
})

InputGroup.displayName = 'InputGroup'