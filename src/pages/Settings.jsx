import React, { useState } from 'react'
import { Save, Key, RefreshCw, Eye, EyeOff, Shield, Building2 } from 'lucide-react'
import Button from '../components/ui/Button.jsx'
import { useAuthStore } from '../store/authStore.js'
import toast from 'react-hot-toast'

export default function Settings() {
  const { institution } = useAuthStore()
  const [profile, setProfile] = useState({
    name: institution?.name || '',
    email: institution?.email || '',
    adminName: institution?.adminName || '',
    phone: '',
    address: '',
    website: '',
  })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [showKey, setShowKey] = useState(false)
  const [saving, setSaving] = useState(false)
  const apiKey = 'tc_live_sk_7f2e9a1b3c4d5e6f7a8b9c0d1e2f3a4b'

  const handleSaveProfile = async () => {
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    toast.success('Profile updated')
  }

  const handleChangePassword = async () => {
    if (passwords.next !== passwords.confirm) {
      toast.error("Passwords don't match")
      return
    }
    setSaving(true)
    await new Promise(r => setTimeout(r, 800))
    setSaving(false)
    toast.success('Password changed')
    setPasswords({ current: '', next: '', confirm: '' })
  }

  return (
    <div className="max-w-3xl space-y-6 fade-up">
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-1">Configuration</p>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage institution profile and security</p>
      </div>

      {/* Profile Form */}
      <div className="rounded-2xl p-6" style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}>
        <div className="flex items-center gap-2 mb-5">
          <Building2 size={15} className="text-blue-400" />
          <h2 className="text-sm font-semibold text-white">Institution Profile</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { name: 'name', label: 'Institution Name', full: true },
            { name: 'email', label: 'Admin Email', type: 'email' },
            { name: 'adminName', label: 'Admin Name' },
            { name: 'phone', label: 'Phone Number', type: 'tel' },
            { name: 'website', label: 'Website', type: 'url' },
            { name: 'address', label: 'Address', full: true },
          ].map(({ name, label, type = 'text', full }) => (
            <div key={name} className={full ? 'sm:col-span-2' : ''}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
              <input
                type={type}
                value={profile[name]}
                onChange={e => setProfile(p => ({ ...p, [name]: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 input-glow"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <Button icon={Save} loading={saving} onClick={handleSaveProfile}>Save Profile</Button>
        </div>
      </div>

      {/* API Key Management */}
      <div className="rounded-2xl p-6" style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}>
        <div className="flex items-center gap-2 mb-5">
          <Key size={15} className="text-blue-400" />
          <h2 className="text-sm font-semibold text-white">API Key Management</h2>
        </div>
        <div className="rounded-xl p-4" style={{ background: '#0A1628', border: '1px solid rgba(37,99,168,0.15)' }}>
          <p className="text-xs text-slate-500 mb-2">Live Secret Key</p>
          <div className="flex items-center gap-3">
            <p className="code-display text-blue-300 flex-1 truncate text-xs">
              {showKey ? apiKey : apiKey.replace(/[a-z0-9]/g, '•')}
            </p>
            <button onClick={() => setShowKey(!showKey)} className="p-1.5 text-slate-400 hover:text-white transition-colors">
              {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>
        <div className="mt-3 flex gap-2">
          <Button variant="secondary" size="sm" icon={RefreshCw}>Regenerate Key</Button>
          <Button variant="ghost" size="sm">View Docs</Button>
        </div>
      </div>

      {/* Password Change */}
      <div className="rounded-2xl p-6" style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}>
        <div className="flex items-center gap-2 mb-5">
          <Shield size={15} className="text-blue-400" />
          <h2 className="text-sm font-semibold text-white">Change Password</h2>
        </div>
        <div className="space-y-4 max-w-sm">
          {[
            { key: 'current', label: 'Current Password' },
            { key: 'next', label: 'New Password' },
            { key: 'confirm', label: 'Confirm New Password' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
              <input
                type="password"
                value={passwords[key]}
                onChange={e => setPasswords(p => ({ ...p, [key]: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white input-glow"
              />
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <Button variant="secondary" onClick={handleChangePassword}>Update Password</Button>
        </div>
      </div>
    </div>
  )
}