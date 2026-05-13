import React, { useEffect, useState } from 'react'
import { FileBadge, CheckCircle, Clock, AlertTriangle, FilePlus, Upload, Download, ChevronRight, Calendar } from 'lucide-react'
import StatCard from '../components/ui/StatCard.jsx'
import CertificateTable from '../components/certificates/CertificateTable.jsx'
import Button from '../components/ui/Button.jsx'
import { getStats, getRecentCerts } from '../api/certificates.js'
import { useAuthStore } from '../store/authStore.js'
import { useNavigate } from 'react-router-dom'
import { formatDate } from '../utils/formatDate.js'

const upcomingExpirations = [
  { name: 'Arjun Sharma — B.Tech CSE', date: '2024-12-15' },
  { name: 'Priya Nair — M.Sc Physics', date: '2024-12-22' },
  { name: 'Vikram Singh — PhD Math', date: '2025-01-08' },
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const { institution } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([getStats(), getRecentCerts()]).then(([s, c]) => {
      setStats(s)
      setCerts(c)
      setLoading(false)
    })
  }, [])

  const statCards = [
    { title: 'Total Certificates Issued', value: stats?.total ?? '—', icon: FileBadge, color: 'blue', trend: 12 },
    { title: 'Verified This Month', value: stats?.verifiedThisMonth ?? '—', icon: CheckCircle, color: 'teal', trend: 8 },
    { title: 'Pending Review', value: stats?.pending ?? '—', icon: Clock, color: 'amber', trend: -3 },
    { title: 'Flagged / Forged', value: stats?.flagged ?? '—', icon: AlertTriangle, color: 'red', trend: -1 },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-start justify-between fade-up">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-1">Overview</p>
          <h1 className="text-2xl font-bold text-white">
            Welcome back, <span className="gradient-text">{institution?.adminName?.split(' ')[0] || 'Admin'}</span>
          </h1>
          <p className="text-sm text-slate-500 mt-1">{institution?.name} — Academic Portal</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
          <Calendar size={13} />
          {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <StatCard key={card.title} {...card} delay={i + 1} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Certs Table */}
        <div
          className="xl:col-span-2 rounded-2xl overflow-hidden fade-up-delay-2"
          style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'rgba(37,99,168,0.12)' }}>
            <div>
              <h2 className="text-sm font-semibold text-white">Recent Certificates</h2>
              <p className="text-xs text-slate-500 mt-0.5">Latest issued & activity</p>
            </div>
            <button
              onClick={() => navigate('/institution/certificates')}
              className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              View all <ChevronRight size={13} />
            </button>
          </div>
          <CertificateTable certificates={certs} loading={loading} />
        </div>

        {/* Quick Actions Panel */}
        <div className="space-y-4 fade-up-delay-3">
          {/* Actions */}
          <div
            className="rounded-2xl p-5"
            style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}
          >
            <h2 className="text-sm font-semibold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2.5">
              <Button
                className="w-full justify-start gap-3"
                onClick={() => navigate('/institution/issue')}
                icon={FilePlus}
              >
                Issue New Certificate
              </Button>
              <Button
                variant="secondary"
                className="w-full justify-start gap-3"
                icon={Upload}
              >
                Bulk Upload via CSV
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-3"
                icon={Download}
              >
                Download Report
              </Button>
            </div>
          </div>

          {/* Upcoming Expirations */}
          <div
            className="rounded-2xl p-5"
            style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}
          >
            <h2 className="text-sm font-semibold text-white mb-4">Upcoming Expirations</h2>
            <div className="space-y-3">
              {upcomingExpirations.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0 badge-pulse" />
                  <div className="min-w-0">
                    <p className="text-xs text-slate-300 font-medium leading-tight truncate">{item.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                      <Calendar size={10} /> {formatDate(item.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity snapshot */}
          <div
            className="rounded-2xl p-5"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,168,0.08), rgba(15,110,86,0.05))', border: '1px solid rgba(37,99,168,0.15)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-400">System Online</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Blockchain sync active. All certificates anchored to Ethereum testnet. Last sync 2 min ago.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}