import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import IssueCertificate from './pages/IssueCertificate.jsx'
import AllCertificates from './pages/AllCertificates.jsx'
import Students from './pages/Students.jsx'
import Analytics from './pages/Analytics.jsx'
import Settings from './pages/Settings.jsx'
import PageWrapper from './components/layout/PageWrapper.jsx'
import { useAuthStore } from './store/authStore.js'

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0D1B2A',
            color: '#E2E8F0',
            border: '1px solid #1E3A5F',
            fontFamily: 'Sora, sans-serif',
            fontSize: '14px',
          },
          success: { iconTheme: { primary: '#0F6E56', secondary: '#fff' } },
          error: { iconTheme: { primary: '#993C1D', secondary: '#fff' } },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/institution/dashboard" replace />} />
        <Route
          path="/institution"
          element={
            <ProtectedRoute>
              <PageWrapper />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="issue" element={<IssueCertificate />} />
          <Route path="certificates" element={<AllCertificates />} />
          <Route path="students" element={<Students />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}