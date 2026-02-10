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
    <div className="kiveiv-overlay">
      <button
        type="button"
        onClick={onClose}
        className="kiveiv-overlay-backdrop"
        aria-label="关闭抽屉"
      />
      <section className={`kiveiv-drawer w-full ${widthClassName}`}>
        <header className="kiveiv-drawer-header">
          <div className="min-w-0">
            <h3 className="kiveiv-drawer-title">{title}</h3>
            {description && <p className="kiveiv-drawer-desc">{description}</p>}
          </div>
          <button type="button" onClick={onClose} className="kiveiv-drawer-close" aria-label="关闭">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </header>
        <div className="kiveiv-drawer-body">{children}</div>
        {footer && <footer className="kiveiv-drawer-footer">{footer}</footer>}
      </section>
    </div>
  )
}
