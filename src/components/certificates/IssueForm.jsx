import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, User, GraduationCap, CheckCircle, ChevronRight, ChevronLeft, FileText } from 'lucide-react'
import Button from '../ui/Button.jsx'
import { validateCertForm } from '../../utils/validators.js'
import toast from 'react-hot-toast'
import { issueCertificate } from '../../api/certificates.js'

const steps = [
  { id: 1, label: 'Student Info', icon: User },
  { id: 2, label: 'Upload Doc', icon: Upload },
  { id: 3, label: 'Preview & Confirm', icon: CheckCircle },
]

const DEGREES = ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'MBA', 'MCA', 'B.Com', 'PhD', 'B.A', 'M.A']
const DEPTS = ['Computer Science', 'Electronics', 'Mechanical', 'Civil', 'Physics', 'Mathematics', 'Management', 'Commerce', 'Humanities']

export default function IssueForm({ onSuccess }) {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [issued, setIssued] = useState(null)
  const [form, setForm] = useState({
    studentName: '',
    rollNo: '',
    email: '',
    degree: '',
    department: '',
    issueDate: new Date().toISOString().split('T')[0],
    cgpa: '',
  })
  const [errors, setErrors] = useState({})

  const onDrop = useCallback((accepted) => {
    if (accepted[0]) setFile(accepted[0])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'image/*': ['.jpg', '.png'] },
    maxFiles: 1,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }))
  }

  const handleNext = () => {
    if (step === 1) {
      const errs = validateCertForm(form)
      if (Object.keys(errs).length) { setErrors(errs); return }
    }
    if (step === 2 && !file) {
      toast.error('Please upload a document')
      return
    }
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const result = await issueCertificate(form)
      setIssued(result)
      toast.success('Certificate issued successfully!')
      onSuccess?.(result)
    } catch (e) {
      toast.error('Failed to issue certificate')
    } finally {
      setLoading(false)
    }
  }

  if (issued) {
    return (
      <div className="text-center py-8 space-y-4">
        <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mx-auto">
          <CheckCircle size={32} className="text-emerald-400" />
        </div>
        <div>
          <p className="text-lg font-semibold text-white mb-1">Certificate Issued!</p>
          <p className="code-display text-blue-300 text-base">{issued.id}</p>
        </div>
        <Button onClick={() => { setIssued(null); setStep(1); setForm({ studentName:'',rollNo:'',email:'',degree:'',department:'',issueDate:new Date().toISOString().split('T')[0],cgpa:'' }); setFile(null) }}>
          Issue Another
        </Button>
      </div>
    )
  }

  return (
    <div>
      {/* Step Indicator */}
      <div className="flex items-center gap-0 mb-8">
        {steps.map((s, i) => {
          const Icon = s.icon
          const active = step === s.id
          const done = step > s.id
          return (
            <React.Fragment key={s.id}>
              <div className="flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  done ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                  active ? 'bg-accent/20 text-blue-400 border border-accent/40' :
                  'bg-white/5 text-slate-500 border border-white/10'
                }`}>
                  {done ? <CheckCircle size={16} /> : <Icon size={16} />}
                </div>
                <span className={`text-xs hidden sm:block ${active ? 'text-blue-400 font-medium' : done ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 mb-5 transition-all ${done ? 'bg-emerald-500/40' : 'bg-white/10'}`} />
              )}
            </React.Fragment>
          )
        })}
      </div>

      {/* Step 1: Student Info */}
      {step === 1 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 fade-up">
          {[
            { name: 'studentName', label: 'Student Full Name', type: 'text', placeholder: 'e.g. Arjun Sharma', full: true },
            { name: 'rollNo', label: 'Roll Number', type: 'text', placeholder: 'e.g. CS20B001' },
            { name: 'email', label: 'Email Address', type: 'email', placeholder: 'student@email.com' },
            { name: 'cgpa', label: 'CGPA / Grade', type: 'text', placeholder: 'e.g. 8.7' },
            { name: 'issueDate', label: 'Issue Date', type: 'date' },
          ].map(({ name, label, type, placeholder, full }) => (
            <div key={name} className={full ? 'sm:col-span-2' : ''}>
              <label className="block text-xs font-medium text-slate-400 mb-1.5">{label}</label>
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`w-full bg-white/5 border rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 input-glow transition-all
                  ${errors[name] ? 'border-red-500/50' : 'border-white/10'}`}
              />
              {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
            </div>
          ))}
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Degree</label>
            <select name="degree" value={form.degree} onChange={handleChange}
              className={`w-full bg-white/5 border rounded-lg px-3 py-2.5 text-sm text-white input-glow transition-all ${errors.degree ? 'border-red-500/50' : 'border-white/10'}`}>
              <option value="" className="bg-dark-surface">Select degree</option>
              {DEGREES.map(d => <option key={d} value={d} className="bg-dark-surface">{d}</option>)}
            </select>
            {errors.degree && <p className="text-xs text-red-400 mt-1">{errors.degree}</p>}
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1.5">Department</label>
            <select name="department" value={form.department} onChange={handleChange}
              className={`w-full bg-white/5 border rounded-lg px-3 py-2.5 text-sm text-white input-glow transition-all ${errors.department ? 'border-red-500/50' : 'border-white/10'}`}>
              <option value="" className="bg-dark-surface">Select department</option>
              {DEPTS.map(d => <option key={d} value={d} className="bg-dark-surface">{d}</option>)}
            </select>
            {errors.department && <p className="text-xs text-red-400 mt-1">{errors.department}</p>}
          </div>
        </div>
      )}

      {/* Step 2: Upload */}
      {step === 2 && (
        <div className="fade-up">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
              isDragActive ? 'border-accent bg-accent/10' : 'border-white/15 hover:border-accent/50 hover:bg-accent/5'
            }`}
          >
            <input {...getInputProps()} />
            <Upload size={32} className="mx-auto mb-3 text-slate-500" />
            <p className="text-sm text-slate-300 font-medium mb-1">
              {isDragActive ? 'Drop file here…' : 'Drag & drop certificate document'}
            </p>
            <p className="text-xs text-slate-500">PDF, JPG, PNG — up to 10MB</p>
          </div>
          {file && (
            <div className="mt-4 flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <FileText size={16} className="text-emerald-400 flex-shrink-0" />
              <span className="text-sm text-emerald-300 truncate">{file.name}</span>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Preview */}
      {step === 3 && (
        <div className="fade-up space-y-4">
          <div className="rounded-xl p-5 space-y-3" style={{ background: '#0A1628', border: '1px solid rgba(37,99,168,0.2)' }}>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Certificate Preview</p>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(form).filter(([, v]) => v).map(([k, v]) => (
                <div key={k}>
                  <p className="text-xs text-slate-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-sm text-white font-medium">{v}</p>
                </div>
              ))}
            </div>
            {file && (
              <div className="flex items-center gap-2 pt-2 border-t border-white/5">
                <FileText size={14} className="text-blue-400" />
                <span className="text-xs text-slate-400">Document: {file.name}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-500">
            ⚠ Once issued, this certificate will be immutably recorded on the blockchain. Verify all details before confirming.
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10">
        <Button variant="ghost" onClick={() => setStep(s => s - 1)} icon={ChevronLeft}
          className={step === 1 ? 'invisible' : ''}>
          Back
        </Button>
        {step < 3
          ? <Button onClick={handleNext} icon={ChevronRight}>Next Step</Button>
          : <Button onClick={handleSubmit} loading={loading} variant="success">Issue Certificate</Button>
        }
      </div>
    </div>
  )
}