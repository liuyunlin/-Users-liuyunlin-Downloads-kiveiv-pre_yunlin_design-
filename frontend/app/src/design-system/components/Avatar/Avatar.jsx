import { cn } from '../../utils/cn'

// Avatar component following Catalyst design patterns
export function Avatar({
  src,
  alt = '',
  square = false,
  initials,
  className,
  ...props
}) {
  // Generate initials if not provided and alt is available
  const displayInitials = initials || (alt ? alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '')

  return (
    <span
      className={cn(
        // Base avatar styles following Catalyst patterns
        'inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%]',
        // Shape styles
        square 
          ? 'rounded-[--avatar-radius] *:rounded-[--avatar-radius]' 
          : 'rounded-full *:rounded-full',
        // Default background for initials
        !src && 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        displayInitials && (
          <svg
            className="select-none fill-current text-[48px] font-medium uppercase"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <text
              x="50%"
              y="50%"
              alignmentBaseline="middle"
              dominantBaseline="middle"
              textAnchor="middle"
              dy=".125em"
              className="text-[48px] font-medium"
            >
              {displayInitials}
            </text>
          </svg>
        )
      )}
    </span>
  )
}

// AvatarButton component for interactive avatars
export function AvatarButton({
  src,
  alt = '',
  square = false,
  initials,
  href,
  className,
  ...props
}) {
  const Component = href ? 'a' : 'button'
  const displayInitials = initials || (alt ? alt.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '')

  return (
    <Component
      href={href}
      className={cn(
        // Base avatar button styles
        'inline-grid shrink-0 align-middle [--avatar-radius:20%] [--ring-opacity:20%]',
        // Interactive states
        'cursor-pointer transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
        // Shape styles
        square 
          ? 'rounded-[--avatar-radius] *:rounded-[--avatar-radius]' 
          : 'rounded-full *:rounded-full',
        // Default background for initials
        !src && 'bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400',
        className
      )}
      {...props}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        displayInitials && (
          <svg
            className="select-none fill-current text-[48px] font-medium uppercase"
            viewBox="0 0 100 100"
            aria-hidden="true"
          >
            <text
              x="50%"
              y="50%"
              alignmentBaseline="middle"
              dominantBaseline="middle"
              textAnchor="middle"
              dy=".125em"
              className="text-[48px] font-medium"
            >
              {displayInitials}
            </text>
          </svg>
        )
      )}
    </Component>
  )
}