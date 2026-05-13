import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export const loginInstitution = async (institutionCode, password) => {
  // Mock response for demo — replace with real API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (institutionCode && password) {
        resolve({
          token: 'mock-jwt-token-xyz',
          institution: {
            id: '1',
            name: 'Indian Institute of Technology',
            code: institutionCode,
            logo: null,
            adminName: 'Dr. Rajesh Kumar',
            email: 'admin@iit.ac.in',
          }
        })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 1200)
  })
}

export const logoutInstitution = async () => {
  // POST /api/auth/logout/
  return Promise.resolve()
}