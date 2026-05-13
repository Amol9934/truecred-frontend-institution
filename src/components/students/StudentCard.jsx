import React from 'react'
import { GraduationCap, Mail } from 'lucide-react'

export default function StudentCard({ student }) {
  return (
    <div className="card-3d rounded-2xl p-5"
      style={{ background: 'linear-gradient(135deg, #0D1B2A, #112236)', border: '1px solid rgba(37,99,168,0.2)' }}>
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
          style={{ background: 'linear-gradient(135deg, #2563A8, #0F6E56)' }}>
          {student.name[0]}
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{student.name}</p>
          <p className="text-xs text-slate-500">{student.department}</p>
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Mail size={11} /> {student.email}
        </div>
        <div className="flex items-center gap-2 text-xs text-blue-400">
          <GraduationCap size={11} /> {student.certs} certificate{student.certs !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  )
}