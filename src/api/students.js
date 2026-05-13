const mockStudents = [
  { id: 'STU-001', name: 'Arjun Sharma', email: 'arjun@email.com', rollNo: 'CS20B001', department: 'CSE', year: 2024, certs: 2 },
  { id: 'STU-002', name: 'Priya Nair', email: 'priya@email.com', rollNo: 'PH21M002', department: 'Physics', year: 2024, certs: 1 },
  { id: 'STU-003', name: 'Rohit Mehta', email: 'rohit@email.com', rollNo: 'MB22P003', department: 'Management', year: 2024, certs: 1 },
  { id: 'STU-004', name: 'Sneha Patel', email: 'sneha@email.com', rollNo: 'BC20B004', department: 'Commerce', year: 2024, certs: 1 },
  { id: 'STU-005', name: 'Vikram Singh', email: 'vikram@email.com', rollNo: 'MA19D005', department: 'Mathematics', year: 2024, certs: 3 },
  { id: 'STU-006', name: 'Ananya Reddy', email: 'ananya@email.com', rollNo: 'EC21B006', department: 'ECE', year: 2024, certs: 1 },
]

export const getStudents = async (search = '') => {
  let students = search
    ? mockStudents.filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.rollNo.toLowerCase().includes(search.toLowerCase()))
    : mockStudents
  return { results: students, count: students.length }
}

export const getStudentById = async (id) => {
  return mockStudents.find(s => s.id === id)
}