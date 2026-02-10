import React from 'react'
import { cn } from '../../utils/cn'

// Color variants based on Catalyst design system
const colorVariants = {
  'dark/zinc': {
    solid: 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-zinc-950/10 hover:ring-zinc-950/20',
    plain: 'bg-transparent hover:bg-zinc-100 text-zinc-900',
  },
  white: {
    solid: 'bg-white hover:bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-zinc-950/10',
    outline: 'bg-transparent hover:bg-zinc-50 text-zinc-900 shadow-sm ring-1 ring-zinc-200 hover:ring-zinc-300',
    plain: 'bg-transparent hover:bg-white/25 text-zinc-900',
  },
  red: {
    solid: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-red-50 text-red-600 shadow-sm ring-1 ring-red-500/20 hover:ring-red-500/30',
    plain: 'bg-transparent hover:bg-red-50 text-red-600',
  },
  orange: {
    solid: 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-orange-50 text-orange-600 shadow-sm ring-1 ring-orange-500/20 hover:ring-orange-500/30',
    plain: 'bg-transparent hover:bg-orange-50 text-orange-600',
  },
  amber: {
    solid: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-amber-50 text-amber-600 shadow-sm ring-1 ring-amber-500/20 hover:ring-amber-500/30',
    plain: 'bg-transparent hover:bg-amber-50 text-amber-600',
  },
  yellow: {
    solid: 'bg-yellow-500 hover:bg-yellow-600 text-black shadow-sm',
    outline: 'bg-transparent hover:bg-yellow-50 text-yellow-600 shadow-sm ring-1 ring-yellow-500/20 hover:ring-yellow-500/30',
    plain: 'bg-transparent hover:bg-yellow-50 text-yellow-600',
  },
  lime: {
    solid: 'bg-lime-500 hover:bg-lime-600 text-black shadow-sm',
    outline: 'bg-transparent hover:bg-lime-50 text-lime-600 shadow-sm ring-1 ring-lime-500/20 hover:ring-lime-500/30',
    plain: 'bg-transparent hover:bg-lime-50 text-lime-600',
  },
  green: {
    solid: 'bg-green-600 hover:bg-green-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-green-50 text-green-600 shadow-sm ring-1 ring-green-500/20 hover:ring-green-500/30',
    plain: 'bg-transparent hover:bg-green-50 text-green-600',
  },
  emerald: {
    solid: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-emerald-50 text-emerald-600 shadow-sm ring-1 ring-emerald-500/20 hover:ring-emerald-500/30',
    plain: 'bg-transparent hover:bg-emerald-50 text-emerald-600',
  },
  teal: {
    solid: 'bg-teal-600 hover:bg-teal-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-teal-50 text-teal-600 shadow-sm ring-1 ring-teal-500/20 hover:ring-teal-500/30',
    plain: 'bg-transparent hover:bg-teal-50 text-teal-600',
  },
  cyan: {
    solid: 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-cyan-50 text-cyan-600 shadow-sm ring-1 ring-cyan-500/20 hover:ring-cyan-500/30',
    plain: 'bg-transparent hover:bg-cyan-50 text-cyan-600',
  },
  sky: {
    solid: 'bg-sky-600 hover:bg-sky-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-sky-50 text-sky-600 shadow-sm ring-1 ring-sky-500/20 hover:ring-sky-500/30',
    plain: 'bg-transparent hover:bg-sky-50 text-sky-600',
  },
  blue: {
    solid: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-blue-50 text-blue-600 shadow-sm ring-1 ring-blue-500/20 hover:ring-blue-500/30',
    plain: 'bg-transparent hover:bg-blue-50 text-blue-600',
  },
  indigo: {
    solid: 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-500/20 hover:ring-indigo-500/30',
    plain: 'bg-transparent hover:bg-indigo-50 text-indigo-600',
  },
  violet: {
    solid: 'bg-violet-600 hover:bg-violet-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-violet-50 text-violet-600 shadow-sm ring-1 ring-violet-500/20 hover:ring-violet-500/30',
    plain: 'bg-transparent hover:bg-violet-50 text-violet-600',
  },
  purple: {
    solid: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-purple-50 text-purple-600 shadow-sm ring-1 ring-purple-500/20 hover:ring-purple-500/30',
    plain: 'bg-transparent hover:bg-purple-50 text-purple-600',
  },
  fuchsia: {
    solid: 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-fuchsia-50 text-fuchsia-600 shadow-sm ring-1 ring-fuchsia-500/20 hover:ring-fuchsia-500/30',
    plain: 'bg-transparent hover:bg-fuchsia-50 text-fuchsia-600',
  },
  pink: {
    solid: 'bg-pink-600 hover:bg-pink-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-pink-50 text-pink-600 shadow-sm ring-1 ring-pink-500/20 hover:ring-pink-500/30',
    plain: 'bg-transparent hover:bg-pink-50 text-pink-600',
  },
  rose: {
    solid: 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm',
    outline: 'bg-transparent hover:bg-rose-50 text-rose-600 shadow-sm ring-1 ring-rose-500/20 hover:ring-rose-500/30',
    plain: 'bg-transparent hover:bg-rose-50 text-rose-600',
  },
}

export function Button({
  children,
  type = 'button',
  color = 'dark/zinc',
  outline = false,
  plain = false,
  disabled = false,
  loading = false,
  href,
  className,
  ...props
}) {
  const buttonStyle = plain ? 'plain' : outline ? 'outline' : 'solid'
  const colorClasses = colorVariants[color]?.[buttonStyle] || colorVariants['dark/zinc'][buttonStyle]
  
  const baseClasses = cn(
    // Base button styles
    'relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold',
    // Padding and sizing
    'px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6',
    // Focus states
    'focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500',
    // Disabled states
    'data-[disabled]:opacity-50',
    // Color and style specific classes
    colorClasses,
    // Border handling
    plain ? 'border-transparent' : 'border-transparent',
    className
  )

  if (href && !disabled) {
    return (
      <a
        href={href}
        className={baseClasses}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      data-disabled={disabled || loading ? true : undefined}
      className={baseClasses}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  )
}