import React from 'react'
import { FilePlus } from 'lucide-react'
import IssueForm from '../components/certificates/IssueForm.jsx'
import QRPreview from '../components/certificates/QRPreview.jsx'

export default function IssueCertificate() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 fade-up">
      <div>
        <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-1">Credentials</p>
        <h1 className="text-2xl font-bold text-white">Issue Certificate</h1>
        <p className="text-sm text-slate-500 mt-1">Register a new academic credential on the blockchain</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 rounded-2xl p-6"
          style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}>
          <IssueForm />
        </div>

        {/* Side info */}
        <div className="space-y-4">
          <div className="rounded-2xl p-5"
            style={{ background: '#0D1B2A', border: '1px solid rgba(37,99,168,0.15)' }}>
            <h3 className="text-sm font-semibold text-white mb-3">How it works</h3>
            <div className="space-y-3">
              {[
                { step: '01', text: 'Enter student information and details' },
                { step: '02', text: 'Upload the original certificate document' },
                { step: '03', text: 'Preview and confirm all details' },
                { step: '04', text: 'Certificate is anchored to blockchain' },
              ].map(({ step, text }) => (
                <div key={step} className="flex items-start gap-3">
                  <span className="text-xs font-bold text-blue-500 code-display flex-shrink-0 w-6">{step}</span>
                  <p className="text-xs text-slate-400 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <QRPreview certId={null} studentName={null} />
        </div>
      </div>
    </div>
  )
}