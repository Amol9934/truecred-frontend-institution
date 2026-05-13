import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Sidebar from './Sidebar.jsx'

export default function PageWrapper() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="min-h-screen" style={{ background: '#060D1A' }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <Navbar sidebarCollapsed={collapsed} setSidebarCollapsed={setCollapsed} />
      <main
        className="transition-all duration-300 min-h-screen"
        style={{
          marginLeft: collapsed ? '64px' : '240px',
          paddingTop: '64px',
        }}
      >
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}