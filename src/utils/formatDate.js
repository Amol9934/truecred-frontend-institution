const toLocalDate = (dateStr) => {
  // Bare YYYY-MM-DD strings are parsed as UTC midnight by JS, which shifts
  // the displayed date by one day in timezones behind UTC. Appending the time
  // forces local-timezone parsing instead.
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return new Date(`${dateStr}T00:00:00`)
  return new Date(dateStr)
}

export const formatDate = (dateStr) => {
  if (!dateStr) return '—'
  return toLocalDate(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export const formatDateShort = (dateStr) => {
  if (!dateStr) return '—'
  return toLocalDate(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
}

export const timeAgo = (dateStr) => {
  const now = new Date()
  const then = new Date(dateStr)
  const diff = Math.floor((now - then) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`
  return `${Math.floor(diff/86400)}d ago`
}