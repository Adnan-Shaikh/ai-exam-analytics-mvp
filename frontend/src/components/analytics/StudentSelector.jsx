import { useState, useEffect } from 'react'
import { analyticsService } from '../../services/analyticsService'

export default function StudentSelector({ onStudentSelect, selectedStudent }) {
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [examFilter, setExamFilter] = useState(null)

  useEffect(() => {
    fetchStudents()
  }, [examFilter])

  const fetchStudents = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await analyticsService.getAllStudents(examFilter)
      setStudents(data)
    } catch (err) {
      setError(err.message || 'Failed to load students')
    } finally {
      setLoading(false)
    }
  }

  const handleStudentChange = (e) => {
    const studentId = e.target.value
    if (studentId && onStudentSelect) {
      onStudentSelect(studentId)
    }
  }

  const handleExamFilterChange = (e) => {
    const examType = e.target.value || null
    setExamFilter(examType)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500">Loading students...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Select Student</h2>
      
      <div className="space-y-4">
        {/* Exam Type Filter */}
        <div>
          <label htmlFor="exam-filter" className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Exam Type
          </label>
          <select
            id="exam-filter"
            value={examFilter || ''}
            onChange={handleExamFilterChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Exams</option>
            <option value="JEE">JEE Only</option>
            <option value="NEET">NEET Only</option>
          </select>
        </div>

        {/* Student Selector */}
        <div>
          <label htmlFor="student-select" className="block text-sm font-medium text-gray-700 mb-2">
            Student ID ({students.length} students)
          </label>
          <select
            id="student-select"
            value={selectedStudent || ''}
            onChange={handleStudentChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a student --</option>
            {students.map((student) => (
              <option key={student} value={student}>
                {student}
              </option>
            ))}
          </select>
        </div>

        {/* Info */}
        {students.length === 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <p className="text-sm text-yellow-700">
              No students found. Please upload exam data first.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}