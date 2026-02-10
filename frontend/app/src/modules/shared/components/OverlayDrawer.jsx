import { useEffect } from 'react'

export function OverlayDrawer({
  open,
  title,
  description,
  widthClassName = 'max-w-2xl',
  onClose,
  footer,
  children
}) {
  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
        aria-label="关闭抽屉"
      />
      <section className={`absolute inset-y-0 right-0 flex w-full ${widthClassName} flex-col border-l border-[var(--kiveiv-border)] bg-white shadow-2xl`}>
        <header className="flex items-start justify-between gap-4 border-b border-[var(--kiveiv-border)] px-5 py-4">
          <div>
            <h3 className="text-lg font-semibold text-[var(--kiveiv-text)]">{title}</h3>
            {description && <p className="kiveiv-gap-title-note text-xs text-[var(--kiveiv-text-note-alt)]">{description}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-8 w-8 items-center justify-center rounded-[var(--kiveiv-radius-control)] border border-[var(--kiveiv-border)] text-[var(--kiveiv-text-muted)] hover:bg-[var(--kiveiv-surface-muted)]"
            aria-label="关闭"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">{children}</div>
        {footer && <footer className="border-t border-[var(--kiveiv-border)] px-5 py-4">{footer}</footer>}
      </section>
    </div>
  )
}
