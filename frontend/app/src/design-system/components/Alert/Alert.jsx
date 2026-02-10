import { CheckCircleIcon, ExclamationTriangleIcon, InformationCircleIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { cn } from '../../utils/cn'

// Alert variants following modern design patterns
const alertVariants = {
  info: {
    container: 'bg-blue-50 border border-blue-200 text-blue-800 dark:bg-blue-950/20 dark:border-blue-900/30 dark:text-blue-300',
    icon: 'text-blue-400 dark:text-blue-400',
    closeButton: 'text-blue-500 hover:bg-blue-100 focus:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-900/20',
  },
  success: {
    container: 'bg-green-50 border border-green-200 text-green-800 dark:bg-green-950/20 dark:border-green-900/30 dark:text-green-300',
    icon: 'text-green-400 dark:text-green-400',
    closeButton: 'text-green-500 hover:bg-green-100 focus:ring-green-500 dark:text-green-400 dark:hover:bg-green-900/20',
  },
  warning: {
    container: 'bg-amber-50 border border-amber-200 text-amber-800 dark:bg-amber-950/20 dark:border-amber-900/30 dark:text-amber-300',
    icon: 'text-amber-400 dark:text-amber-400',
    closeButton: 'text-amber-500 hover:bg-amber-100 focus:ring-amber-500 dark:text-amber-400 dark:hover:bg-amber-900/20',
  },
  error: {
    container: 'bg-red-50 border border-red-200 text-red-800 dark:bg-red-950/20 dark:border-red-900/30 dark:text-red-300',
    icon: 'text-red-400 dark:text-red-400',
    closeButton: 'text-red-500 hover:bg-red-100 focus:ring-red-500 dark:text-red-400 dark:hover:bg-red-900/20',
  },
}

const icons = {
  info: InformationCircleIcon,
  success: CheckCircleIcon,
  warning: ExclamationTriangleIcon,
  error: XCircleIcon,
}

export function Alert({
  variant = 'info',
  title,
  children,
  onClose,
  className,
  ...props
}) {
  const variantStyles = alertVariants[variant]
  const IconComponent = icons[variant]

  return (
    <div
      className={cn(
        'rounded-lg p-4',
        variantStyles.container,
        className
      )}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">
          <IconComponent className={cn('size-5', variantStyles.icon)} aria-hidden="true" />
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3 className="text-sm font-medium mb-2">
              {title}
            </h3>
          )}
          <div className="text-sm">
            {children}
          </div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={cn(
                  'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
                  variantStyles.closeButton
                )}
                onClick={onClose}
                aria-label="关闭警告"
              >
                <XMarkIcon className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}