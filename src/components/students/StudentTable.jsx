import React, { useState } from 'react'
import { Eye, GraduationCap } from 'lucide-react'
import Modal from '../ui/Modal.jsx'

export default function StudentTable({ students, loading }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(37,99,168,0.15)' }}>
              {['Name', 'Roll No.', 'Department', 'Email', 'Certs', ''].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 5 }).map((_, j) => (
                      <td key={j} className="py-3 px-4"><div className="h-4 rounded bg-white/5 animate-pulse" style={{ width: `${50+Math.random()*40}%` }}/></td>
                    ))}
                  </tr>
                ))
              : students.map((s) => (
                  <tr key={s.id} className="table-row-hover border-b border-white/5 last:border-0">
                    <td className="py-3 px-4 text-white font-medium">{s.name}</td>
                    <td className="py-3 px-4"><span className="code-display text-blue-300">{s.rollNo}</span></td>
                    <td className="py-3 px-4 text-slate-400">{s.department}</td>
                    <td className="py-3 px-4 text-slate-400">{s.email}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-xs text-blue-400">
                        <GraduationCap size={12} />{s.certs}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button onClick={() => setSelected(s)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all">
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Student Profile" size="sm">
        {selected && (
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold text-xl"
                style={{ background: 'linear-gradient(135deg, #2563A8, #0F6E56)' }}>
                {selected.name[0]}
              </div>
              <div>
                <p className="text-lg font-semibold text-white">{selected.name}</p>
                <p className="text-sm text-slate-400">{selected.department}</p>
              </div>
            </div>
            {[
              { label: 'Roll No.', value: selected.rollNo, mono: true },
              { label: 'Email', value: selected.email },
              { label: 'Graduation Year', value: selected.year },
              { label: 'Certificates Issued', value: selected.certs },
            ].map(({ label, value, mono }) => (
              <div key={label} className="flex justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-xs text-slate-500">{label}</span>
                <span className={mono ? 'code-display text-blue-300' : 'text-sm text-white font-medium'}>{value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  )
}