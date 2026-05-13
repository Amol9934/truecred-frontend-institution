import { create } from 'zustand'

export const useCertStore = create((set, get) => ({
  certificates: [],
  stats: {
    total: 0,
    verifiedThisMonth: 0,
    pending: 0,
    flagged: 0,
  },
  loading: false,

  setCertificates: (certs) => set({ certificates: certs }),
  setStats: (stats) => set({ stats }),
  setLoading: (loading) => set({ loading }),

  addCertificate: (cert) => set((state) => ({
    certificates: [cert, ...state.certificates],
    stats: { ...state.stats, total: state.stats.total + 1 }
  })),
}))