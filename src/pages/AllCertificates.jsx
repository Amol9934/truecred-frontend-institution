import React, { useState, useEffect } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import CertificateTable from '../components/certificates/CertificateTable.jsx'
import Button from '../components/ui/Button.jsx'
import { getCertificates } from '../api/certificates.js'
import toast from 'react-hot-toast'

const STATUS_FILTERS = ['all', 'verified', 'pending', 'flagged']

export default function AllCertificates() {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setLoading(true)
    getCertificates({ page, status: status === 'all' ? '' : status }).then(data => {
      setCerts(data.results)
      setTotalPages(data.totalPages || 1)
      setLoading(false)
    })
  }, [status, page])

  const filtered = search
    ? certs.filter(c =>
        c.studentName.toLowerCase().includes(search.toLowerCase()) ||
        c.id.toLowerCase().includes(search.toLowerCase())
      )
    : certs

  const handleRevoke = async (id) => {
    toast.success(`Certificate ${id} revoked`)
    setCerts(prev => prev.filter(c => c.id !== id))
  }

  return (
    <div className="space-y-6 fade-up">
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-1">Records</p>
        <h1 className="text-2xl font-bold text-white">All Certificates</h1>
        <p className="text-sm text-slate-500 mt-1">Browse and manage all issued credentials</p>
      </div>

      {/* Filter Bar */}
      <div
        className="rounded-2xl p-4"
        style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}
      >
        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search by name or cert ID…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 input-glow"
            />
          </div>

          {/* Status tabs */}
          <div className="flex items-center gap-1 bg-white/5 rounded-xl p-1">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1) }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  status === s
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}
      >
        <CertificateTable certificates={filtered} loading={loading} onRevoke={handleRevoke} />

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            className="flex items-center justify-between px-5 py-3 border-t"
            style={{ borderColor: 'rgba(37,99,168,0.12)' }}
          >
            <p className="text-xs text-slate-500">Page {page} of {totalPages}</p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                Previous
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}