import React, { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts'
import { TrendingUp, Award } from 'lucide-react'

const monthlyData = [
  { month: 'Jul', issued: 65, verified: 58, flagged: 3 },
  { month: 'Aug', issued: 78, verified: 72, flagged: 2 },
  { month: 'Sep', issued: 90, verified: 85, flagged: 4 },
  { month: 'Oct', issued: 112, verified: 104, flagged: 5 },
  { month: 'Nov', issued: 145, verified: 138, flagged: 3 },
  { month: 'Dec', issued: 93, verified: 88, flagged: 2 },
  { month: 'Jan', issued: 120, verified: 115, flagged: 1 },
]

const statusData = [
  { name: 'Verified', value: 1156, color: '#0F6E56' },
  { name: 'Pending', value: 68, color: '#BA7517' },
  { name: 'Flagged', value: 24, color: '#993C1D' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl p-3 text-xs" style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.3)' }}>
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function Analytics() {
  const [range, setRange] = useState('6m')

  return (
    <div className="space-y-6 fade-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-1">Insights</p>
          <h1 className="text-2xl font-bold text-white">Analytics</h1>
          <p className="text-sm text-slate-500 mt-1">Verification trends and certificate statistics</p>
        </div>
        <div className="flex gap-1 bg-white/5 rounded-xl p-1">
          {['3m', '6m', '1y'].map(r => (
            <button key={r} onClick={() => setRange(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                range === r ? 'bg-accent text-white' : 'text-slate-400 hover:text-white'
              }`}>{r}
            </button>
          ))}
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area chart */}
        <div className="lg:col-span-2 rounded-2xl p-5"
          style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}>
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={15} className="text-blue-400" />
            <h2 className="text-sm font-semibold text-white">Monthly Verification Trend</h2>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gradIssued" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563A8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2563A8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradVerified" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0F6E56" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#0F6E56" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(37,99,168,0.08)" />
              <XAxis dataKey="month" tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6B7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="issued" name="Issued" stroke="#2563A8" strokeWidth={2} fill="url(#gradIssued)" />
              <Area type="monotone" dataKey="verified" name="Verified" stroke="#0F6E56" strokeWidth={2} fill="url(#gradVerified)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="rounded-2xl p-5"
          style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}>
          <div className="flex items-center gap-2 mb-5">
            <Award size={15} className="text-blue-400" />
            <h2 className="text-sm font-semibold text-white">Status Distribution</h2>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={statusData} cx="50%" cy="50%" innerRadius={55} outerRadius={75}
                paddingAngle={4} dataKey="value">
                {statusData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-3">
            {statusData.map(s => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: s.color }} />
                  <span className="text-xs text-slate-400">{s.name}</span>
                </div>
                <span className="text-xs font-semibold text-white">{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Avg. Verification Time', value: '1.4s', sub: 'blockchain' },
          { label: 'Success Rate', value: '98.1%', sub: 'all time' },
          { label: 'Unique Verifiers', value: '2,340', sub: 'this month' },
          { label: 'Flagged Rate', value: '0.3%', sub: 'total' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="rounded-2xl p-4"
            style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}>
            <p className="text-xs text-slate-500 mb-1">{label}</p>
            <p className="text-xl font-bold text-white">{value}</p>
            <p className="text-xs text-slate-600 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}