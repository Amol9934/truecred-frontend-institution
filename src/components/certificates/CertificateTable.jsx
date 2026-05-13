import React, { useState } from 'react'
import { Eye, Download, Trash2, QrCode } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import Button from '../ui/Button.jsx'
import Modal from '../ui/Modal.jsx'
import { formatDate } from '../../utils/formatDate.js'
import { QRCodeSVG } from 'qrcode.react'

export default function CertificateTable({ certificates, loading, onRevoke }) {
  const [viewCert, setViewCert] = useState(null)
  const [qrCert, setQrCert] = useState(null)

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(37, 99, 168, 0.15)' }}>
              {['Cert ID', 'Student Name', 'Degree', 'Issue Date', 'Status', 'Actions'].map(h => (
                <th key={h} className="text-left py-3 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="py-3 px-4">
                        <div className="h-4 rounded bg-white/5 animate-pulse" style={{ width: `${50 + Math.random() * 40}%` }} />
                      </td>
                    ))}
                  </tr>
                ))
              : certificates.map((cert) => (
                  <tr key={cert.id} className="table-row-hover border-b border-white/5 last:border-0">
                    <td className="py-3 px-4">
                      <span className="code-display text-blue-300">{cert.id}</span>
                    </td>
                    <td className="py-3 px-4 text-white font-medium">{cert.studentName}</td>
                    <td className="py-3 px-4 text-slate-400">{cert.degree}</td>
                    <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{formatDate(cert.issueDate)}</td>
                    <td className="py-3 px-4">
                      <Badge status={cert.status} />
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setViewCert(cert)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 transition-all"
                          title="View"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => setQrCert(cert)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all"
                          title="QR Code"
                        >
                          <QrCode size={14} />
                        </button>
                        <button
                          onClick={() => onRevoke?.(cert.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-400/10 transition-all"
                          title="Revoke"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <Modal isOpen={!!viewCert} onClose={() => setViewCert(null)} title="Certificate Details">
        {viewCert && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Certificate ID', value: viewCert.id, mono: true },
                { label: 'Student Name', value: viewCert.studentName },
                { label: 'Degree', value: viewCert.degree },
                { label: 'Issue Date', value: formatDate(viewCert.issueDate) },
                { label: 'Status', value: <Badge status={viewCert.status} /> },
              ].map(({ label, value, mono }) => (
                <div key={label}>
                  <p className="text-xs text-slate-500 mb-1">{label}</p>
                  {mono
                    ? <p className="code-display text-blue-300">{value}</p>
                    : <div className="text-sm text-white font-medium">{value}</div>
                  }
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* QR Modal */}
      <Modal isOpen={!!qrCert} onClose={() => setQrCert(null)} title="Certificate QR Code" size="sm">
        {qrCert && (
          <div className="flex flex-col items-center gap-4 py-2">
            <div className="p-4 bg-white rounded-xl">
              <QRCodeSVG
                value={`https://truecred.verify/${qrCert.id}`}
                size={180}
                level="H"
              />
            </div>
            <p className="text-xs text-slate-500 text-center">
              Scan to verify <span className="code-display text-blue-300">{qrCert.id}</span>
            </p>
            <Button variant="outline" size="sm" icon={Download}>
              Download QR
            </Button>
          </div>
        )}
      </Modal>
    </>
  )
}