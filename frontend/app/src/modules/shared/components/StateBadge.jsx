const DEFAULT_TONE = 'neutral'

const toneClassMap = {
  neutral: 'kiveiv-chip',
  info: 'kiveiv-chip',
  progress: 'kiveiv-chip kiveiv-chip-accent',
  success: 'kiveiv-chip kiveiv-chip-accent',
  warning: 'kiveiv-chip',
  danger: 'kiveiv-chip'
}

export function StateBadge({ label, tone = DEFAULT_TONE, className = '' }) {
  return <span className={`${toneClassMap[tone] || toneClassMap.neutral} ${className}`}>{label}</span>
}

export function parseStatusTone(status) {
  if (status === '解析中') return 'progress'
  if (status === '已解析') return 'success'
  return 'neutral'
}

