export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export const validateRollNo = (roll) => /^[A-Z]{2}\d{2}[A-Z]\d{3}$/.test(roll)

export const validateInstitutionCode = (code) => code && code.length >= 4

export const validatePassword = (pw) => pw && pw.length >= 6

export const validateCertForm = (data) => {
  const errors = {}
  if (!data.studentName) errors.studentName = 'Student name is required'
  if (!data.rollNo) errors.rollNo = 'Roll number is required'
  if (!data.degree) errors.degree = 'Degree is required'
  if (!data.department) errors.department = 'Department is required'
  if (!data.issueDate) errors.issueDate = 'Issue date is required'
  return errors
}