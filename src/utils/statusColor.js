export const getStatusColor = (status) => {
  const map = {
    verified: 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20',
    pending: 'text-amber-400 bg-amber-400/10 border border-amber-400/20',
    flagged: 'text-red-400 bg-red-400/10 border border-red-400/20',
    revoked: 'text-gray-400 bg-gray-400/10 border border-gray-400/20',
  }
  return map[status] || 'text-gray-400 bg-gray-400/10'
}

export const getStatusDot = (status) => {
  const map = {
    verified: 'bg-emerald-400',
    pending: 'bg-amber-400 badge-pulse',
    flagged: 'bg-red-400',
    revoked: 'bg-gray-400',
  }
  return map[status] || 'bg-gray-400'
}

export const getStatusLabel = (status) => {
  return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Unknown'
}