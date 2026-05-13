import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, FilePlus, Files, Users,
  BarChart2, Settings, ChevronLeft, ChevronRight,
  Shield
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', route: '/institution/dashboard' },
  { icon: FilePlus, label: 'Issue Certificate', route: '/institution/issue' },
  { icon: Files, label: 'All Certificates', route: '/institution/certificates' },
  { icon: Users, label: 'Students', route: '/institution/students' },
  { icon: BarChart2, label: 'Analytics', route: '/institution/analytics' },
  { icon: Settings, label: 'Settings', route: '/institution/settings' },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className="fixed top-0 left-0 h-full z-50 flex flex-col transition-all duration-300"
      style={{
        width: collapsed ? '64px' : '240px',
        background: 'linear-gradient(180deg, #0A1628 0%, #060D1A 100%)',
        borderRight: '1px solid rgba(37, 99, 168, 0.15)',
        boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
      }}
    >
      {/* Logo Area */}
      <div
        className="flex items-center h-16 px-3 border-b"
        style={{ borderColor: 'rgba(37, 99, 168, 0.15)' }}
      >
        {/* Logo mark */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #2563A8, #0F6E56)',
              boxShadow: '0 4px 15px rgba(37, 99, 168, 0.4)',
            }}
          >
            <Shield size={18} className="text-white" strokeWidth={2.5} />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p
                className="font-bold text-white leading-none tracking-widest"
                style={{ fontSize: '15px', letterSpacing: '0.15em' }}
              >
                TRUE<span style={{ color: '#60A5FA' }}>CRED</span>
              </p>
              <p className="text-xs text-slate-500 leading-none mt-0.5 truncate">Institution Portal</p>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
        <div className="space-y-0.5 px-2">
          {menuItems.map(({ icon: Icon, label, route }) => (
            <NavLink
              key={route}
              to={route}
              className={({ isActive }) =>
                `flex items-center gap-3 px-2.5 py-2.5 rounded-lg transition-all duration-200 group relative overflow-hidden ${
                  isActive
                    ? 'sidebar-active'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`
              }
              title={collapsed ? label : ''}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-lg opacity-10"
                      style={{ background: 'linear-gradient(90deg, #2563A8, transparent)' }}
                    />
                  )}
                  <Icon
                    size={18}
                    className={`flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? 'text-blue-400' : ''}`}
                    strokeWidth={isActive ? 2.5 : 1.8}
                  />
                  {!collapsed && (
                    <span className="text-sm font-medium truncate leading-none">{label}</span>
                  )}
                  {/* Active indicator dot for collapsed */}
                  {collapsed && isActive && (
                    <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-blue-400" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div
        className="p-3 border-t"
        style={{ borderColor: 'rgba(37, 99, 168, 0.15)' }}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all text-xs font-medium"
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}