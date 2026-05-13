import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Lock, Building2, Eye, EyeOff, ArrowRight, Hexagon } from 'lucide-react'
import { loginInstitution } from '../api/auth.js'
import { useAuthStore } from '../store/authStore.js'
import toast from 'react-hot-toast'

export default function Login() {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuthStore()
  const [form, setForm] = useState({ code: '', password: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (isAuthenticated) navigate('/institution/dashboard', { replace: true })
  }, [isAuthenticated])

  useEffect(() => {
    const handleMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.code || !form.password) {
      toast.error('Please fill in all fields')
      return
    }
    setLoading(true)
    try {
      const { token, institution } = await loginInstitution(form.code, form.password)
      login(institution, token)
      toast.success(`Welcome, ${institution.name}`)
      navigate('/institution/dashboard')
    } catch {
      toast.error('Invalid institution code or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex relative overflow-hidden"
      style={{ background: '#060D1A' }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Radial glow spots */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{ background: 'radial-gradient(circle, #2563A8, transparent)' }} />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-8"
        style={{ background: 'radial-gradient(circle, #0F6E56, transparent)' }} />

      {/* Left Panel — branding + 3D hero */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center px-12 relative">
        {/* 3D floating logo cluster */}
        <div
          className="relative w-80 h-80 flex items-center justify-center"
          style={{
            transform: `perspective(1000px) rotateX(${mousePos.y * 0.3}deg) rotateY(${mousePos.x * 0.3}deg)`,
            transition: 'transform 0.1s ease',
          }}
        >
          {/* Orbit rings */}
          {[140, 110, 80].map((r, i) => (
            <div key={i} className="absolute rounded-full border"
              style={{
                width: r * 2, height: r * 2,
                borderColor: `rgba(37,99,168,${0.15 - i * 0.03})`,
                transform: `rotateX(${70 + i * 5}deg)`,
              }}
            />
          ))}

          {/* Orbiting dots */}
          <div className="absolute w-full h-full" style={{ animation: 'spin 12s linear infinite' }}>
            <div className="absolute w-2.5 h-2.5 rounded-full bg-blue-400 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-blue-400/50" />
          </div>
          <div className="absolute w-full h-full" style={{ animation: 'spin 18s linear infinite reverse' }}>
            <div className="absolute w-2 h-2 rounded-full bg-emerald-400 bottom-4 right-4 shadow-lg shadow-emerald-400/50" />
          </div>
          <div className="absolute w-3/4 h-3/4" style={{ animation: 'spin 8s linear infinite' }}>
            <div className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 top-0 right-0 shadow-lg shadow-amber-400/50" />
          </div>

          {/* Central logo mark */}
          <div
            className="relative z-10 w-28 h-28 rounded-3xl flex items-center justify-center float"
            style={{
              background: 'linear-gradient(135deg, #1B3A5C 0%, #0F2240 50%, #0A1628 100%)',
              border: '1px solid rgba(37,99,168,0.4)',
              boxShadow: '0 0 60px rgba(37,99,168,0.3), 0 0 120px rgba(37,99,168,0.1), inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
          >
            {/* Custom shield-hex logo */}
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <path d="M28 4L50 14V28C50 40.15 40.6 51.37 28 54C15.4 51.37 6 40.15 6 28V14L28 4Z"
                fill="url(#shieldGrad)" opacity="0.9" />
              <path d="M28 4L50 14V28C50 40.15 40.6 51.37 28 54C15.4 51.37 6 40.15 6 28V14L28 4Z"
                stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" fill="none" />
              {/* TC monogram */}
              <text x="28" y="33" textAnchor="middle" fill="white" fontSize="16" fontWeight="700"
                fontFamily="Sora, sans-serif" letterSpacing="0.05em">TC</text>
              <defs>
                <linearGradient id="shieldGrad" x1="6" y1="4" x2="50" y2="54" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2563A8" />
                  <stop offset="1" stopColor="#0F6E56" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Floating mini cards */}
          {[
            { top: '8%', left: '0%', label: 'Blockchain Secured', color: '#2563A8' },
            { top: '75%', right: '0%', label: 'Tamper-proof', color: '#0F6E56' },
          ].map(({ label, color, ...pos }, i) => (
            <div key={i} className={`absolute px-3 py-1.5 rounded-xl text-xs font-medium text-white float${i ? '-reverse' : ''}`}
              style={{
                ...pos,
                background: `${color}22`,
                border: `1px solid ${color}44`,
                backdropFilter: 'blur(8px)',
                animationDelay: `${i * 2}s`,
                whiteSpace: 'nowrap',
              }}>
              {label}
            </div>
          ))}
        </div>

        {/* Text */}
        <div className="text-center mt-8 space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-white">TRUE</span>
            <span className="gradient-text">CRED</span>
          </h1>
          <p className="text-slate-400 text-base max-w-xs leading-relaxed">
            Academic credential verification powered by blockchain immutability.
          </p>
          <div className="flex items-center justify-center gap-6 pt-2">
            {['SIH 2025', 'Team #67239', 'PS 25029'].map(tag => (
              <span key={tag} className="text-xs text-slate-600 font-mono">{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Login form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        <div
          className="w-full max-w-md fade-up"
          style={{ animationDuration: '0.8s' }}
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #2563A8, #0F6E56)' }}>
              <Shield size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-widest">
              TRUE<span className="text-blue-400">CRED</span>
            </span>
          </div>

          <div
            className="rounded-3xl p-8 relative overflow-hidden"
            style={{
              background: 'rgba(13, 27, 42, 0.8)',
              border: '1px solid rgba(37, 99, 168, 0.2)',
              backdropFilter: 'blur(24px)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 40px rgba(37,99,168,0.05)',
            }}
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,168,0.6), transparent)' }} />

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-1.5">Institution Login</h2>
              <p className="text-sm text-slate-500">Sign in to manage academic credentials</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Institution Code */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Institution Code
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type="text"
                    value={form.code}
                    onChange={e => setForm(f => ({ ...f, code: e.target.value }))}
                    placeholder="e.g. IIT-BOM-2024"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-500 input-glow transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Enter your password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-slate-500 input-glow transition-all"
                  />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Demo hint */}
              <div className="px-3 py-2 rounded-lg text-xs text-slate-500 code-display"
                style={{ background: 'rgba(37,99,168,0.06)', border: '1px solid rgba(37,99,168,0.1)' }}>
                Demo: any code + any password
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-white transition-all btn-glow disabled:opacity-60"
                style={{ background: 'linear-gradient(135deg, #2563A8, #1B3A5C)' }}
              >
                {loading ? (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <>Sign In <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            <p className="text-center text-xs text-slate-600 mt-6">
              Protected by TRUECRED Blockchain Verification Layer
            </p>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-8 right-8 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(15,110,86,0.4), transparent)' }} />
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </div>
  )
}