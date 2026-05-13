import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Mock data for demo
const mockCerts = [
  { id: 'TC-2024-001', studentName: 'Arjun Sharma', degree: 'B.Tech CSE', issueDate: '2024-05-15', status: 'verified' },
  { id: 'TC-2024-002', studentName: 'Priya Nair', degree: 'M.Sc Physics', issueDate: '2024-05-18', status: 'pending' },
  { id: 'TC-2024-003', studentName: 'Rohit Mehta', degree: 'MBA Finance', issueDate: '2024-04-22', status: 'verified' },
  { id: 'TC-2024-004', studentName: 'Sneha Patel', degree: 'B.Com Hons', issueDate: '2024-04-10', status: 'flagged' },
  { id: 'TC-2024-005', studentName: 'Vikram Singh', degree: 'PhD Mathematics', issueDate: '2024-03-28', status: 'verified' },
  { id: 'TC-2024-006', studentName: 'Ananya Reddy', degree: 'B.Tech ECE', issueDate: '2024-03-14', status: 'verified' },
  { id: 'TC-2024-007', studentName: 'Kabir Das', degree: 'MCA', issueDate: '2024-02-20', status: 'pending' },
  { id: 'TC-2024-008', studentName: 'Meera Krishnan', degree: 'B.Sc Chemistry', issueDate: '2024-02-05', status: 'verified' },
]

export const getStats = async () => {
  return { total: 1248, verifiedThisMonth: 93, pending: 17, flagged: 4 }
}

export const getRecentCerts = async () => {
  return mockCerts.slice(0, 8)
}

export const getCertificates = async ({ page = 1, status = '' } = {}) => {
  let filtered = status ? mockCerts.filter(c => c.status === status) : mockCerts
  return { results: filtered, count: filtered.length, totalPages: Math.ceil(filtered.length / 10) }
}

export const issueCertificate = async (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: `TC-2024-${String(Math.floor(Math.random() * 900) + 100)}`,
        ...data,
        issueDate: new Date().toISOString().split('T')[0],
        status: 'verified',
        qrData: `https://truecred.verify/${Date.now()}`,
      })
    }, 1500)
  })
}

export const revokeCertificate = async (id) => {
  return Promise.resolve({ id, status: 'revoked' })
}