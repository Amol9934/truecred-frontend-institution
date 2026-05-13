import React, { useState } from 'react'
import { Bell, Search, LogOut, ChevronDown, Shield } from 'lucide-react'
import { useAuthStore } from '../../store/authStore.js'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

export default function Navbar({ sidebarCollapsed, setSidebarCollapsed }) {
  const { institution, logout } = useAuthStore()
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false)
  const [notifications] = useState(3)

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <nav
      className="fixed top-0 right-0 z-40 flex items-center justify-between px-4 md:px-6"
      style={{
        left: sidebarCollapsed ? '64px' : '240px',
        height: '64px',
        background: 'rgba(6, 13, 26, 0.9)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(37, 99, 168, 0.15)',
        transition: 'left 0.3s ease',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Left: Logo mark on mobile / search */}
      <div className="flex items-center gap-4 flex-1">
        {/* Search */}
        <div className="relative hidden sm:block max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
          <input
            type="text"
            placeholder="Search student, cert ID…"
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-slate-300 placeholder-slate-500 input-glow transition-all focus:bg-white/8"
          />
        </div>
      </div>

      {/* Right: notifications + avatar */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Notification Bell */}
        <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <Bell size={18} />
          {notifications > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full ring-2 ring-dark-bg animate-pulse" />
          )}
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-all"
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ background: 'linear-gradient(135deg, #2563A8, #0F6E56)' }}
            >
              {institution?.name?.[0] || 'A'}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-semibold text-white leading-tight truncate max-w-[120px]">
                {institution?.name || 'Institution'}
              </p>
              <p className="text-xs text-slate-500 leading-tight">Admin</p>
            </div>
            <ChevronDown size={14} className="text-slate-500" />
          </button>

          {showProfile && (
            <div
              className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-50"
              style={{
                background: '#0D1B2A',
                border: '1px solid rgba(37, 99, 168, 0.2)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              }}
            >
              <div className="px-4 py-3 border-b border-dark-border">
                <p className="text-xs text-slate-500">Signed in as</p>
                <p className="text-sm font-semibold text-white truncate">{institution?.email || 'admin@institution.ac.in'}</p>
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Backdrop to close dropdown */}
      {showProfile && (
        <div className="fixed inset-0 z-40" onClick={() => setShowProfile(false)} />
      )}
    </nav>
  )
}