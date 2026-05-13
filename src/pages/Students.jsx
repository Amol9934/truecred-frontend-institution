import React, { useState, useEffect } from 'react'
import { Search } from 'lucide-react'
import StudentTable from '../components/students/StudentTable.jsx'
import { getStudents } from '../api/students.js'

export default function Students() {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    getStudents(search).then(data => {
      setStudents(data.results)
      setLoading(false)
    })
  }, [search])

  return (
    <div className="space-y-6 fade-up">
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-1">People</p>
        <h1 className="text-2xl font-bold text-white">Students</h1>
        <p className="text-sm text-slate-500 mt-1">Registered student records and certificate history</p>
      </div>

      <div
        className="rounded-2xl p-4"
        style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}
      >
        <div className="relative max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search by name or roll number…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 input-glow"
          />
        </div>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(37,99,168,0.12)' }}>
          <h2 className="text-sm font-semibold text-white">Student Records</h2>
          <span className="text-xs text-slate-500">{students.length} records</span>
        </div>
        <StudentTable students={students} loading={loading} />
      </div>
    </div>
  )
}