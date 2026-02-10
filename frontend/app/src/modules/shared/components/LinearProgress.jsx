export function LinearProgress({ value = 0, className = '', label, sublabel }) {
  const safe = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div className={className}>
      {(label || sublabel) && (
        <div className="mb-2 flex items-center justify-between text-sm">
          <span style={{ color: 'var(--kiveiv-text)' }}>{label || ''}</span>
          <span className="kiveiv-subtle">{sublabel || `${safe}%`}</span>
        </div>
      )}
      <div className="relative h-2.5 overflow-hidden rounded-full" style={{ background: 'var(--kiveiv-border)' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${safe}%`,
            background: 'linear-gradient(90deg, var(--kiveiv-accent) 0%, #5b8cff 100%)'
          }}
        />
      </div>
    </div>
  )
}

