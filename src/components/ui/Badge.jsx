import React from 'react'
import { getStatusColor, getStatusDot, getStatusLabel } from '../../utils/statusColor.js'

export default function Badge({ status, children }) {
  const label = children || getStatusLabel(status)
  const colorClass = getStatusColor(status)
  const dotClass = getStatusDot(status)

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`} />
      {label}
    </span>
  )
}