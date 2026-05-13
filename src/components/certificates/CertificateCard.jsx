import React from 'react'
import { Shield, Calendar, User } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import { formatDate } from '../../utils/formatDate.js'

export default function CertificateCard({ cert }) {
  return (
    <div
      className="card-3d rounded-2xl p-5 cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #0D1B2A, #112236)',
        border: '1px solid rgba(37,99,168,0.2)',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-accent/10">
          <Shield size={16} className="text-blue-400" />
        </div>
        <Badge status={cert.status} />
      </div>
      <p className="text-white font-semibold mb-1">{cert.studentName}</p>
      <p className="text-slate-400 text-sm mb-3">{cert.degree}</p>
      <div className="flex items-center gap-3 text-xs text-slate-500">
        <span className="flex items-center gap-1">
          <Calendar size={11} />
          {formatDate(cert.issueDate)}
        </span>
        <span className="code-display text-blue-400">{cert.id}</span>
      </div>
    </div>
  )
}