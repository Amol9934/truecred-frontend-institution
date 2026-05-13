import React from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Shield } from 'lucide-react'

export default function QRPreview({ certId, studentName }) {
  const verifyUrl = `https://truecred.verify/${certId || 'preview'}`

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-2xl"
      style={{ background: '#0A1628', border: '1px solid rgba(37,99,168,0.2)' }}>
      <div className="p-3 bg-white rounded-xl shadow-lg">
        <QRCodeSVG value={verifyUrl} size={140} level="H" includeMargin={false} />
      </div>
      <div className="text-center">
        <div className="flex items-center gap-1.5 justify-center mb-1">
          <Shield size={12} className="text-emerald-400" />
          <span className="text-xs text-emerald-400 font-medium">TRUECRED Verified</span>
        </div>
        {studentName && <p className="text-sm text-white font-semibold">{studentName}</p>}
        <p className="text-xs text-slate-500 mt-1 code-display">{certId || 'TC-XXXX-XXX'}</p>
      </div>
    </div>
  )
}