import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      institution: null,
      token: null,

      login: (institutionData, token) => set({
        isAuthenticated: true,
        institution: institutionData,
        token,
      }),

      logout: () => set({
        isAuthenticated: false,
        institution: null,
        token: null,
      }),
    }),
    {
      name: 'truecred-auth',
    }
  )
)