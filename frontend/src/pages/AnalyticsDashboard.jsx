import { useState, useEffect } from 'react'
import UploadCSV from '../components/analytics/UploadCSV'
import StudentSelector from '../components/analytics/StudentSelector'
import Dashboard from '../components/analytics/Dashboard'

export default function AnalyticsDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleUploadSuccess = (result) => {
    setUploadSuccess(true)
    // Auto-select first student if available
    if (result.students && result.students.length > 0) {
      setSelectedStudent(result.students[0])
    }
    
    // Trigger student selector refresh
    setRefreshKey(prev => prev + 1)
    
    // Clear success message after 5 seconds
    setTimeout(() => setUploadSuccess(false), 5000)
  }

  const handleClearData = () => {
    // Clear selected student
    setSelectedStudent(null)
    // Trigger student selector refresh
    setRefreshKey(prev => prev + 1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
      <p className="text-gray-600 mb-8">Upload data and view detailed performance analytics</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Upload Section */}
        <div className="lg:col-span-2">
          <UploadCSV 
            onUploadSuccess={handleUploadSuccess}
            onClearData={handleClearData}
          />
        </div>

        {/* Student Selector */}
        <div className="lg:col-span-1">
          <StudentSelector 
            key={refreshKey}
            onStudentSelect={setSelectedStudent}
            selectedStudent={selectedStudent}
          />
        </div>
      </div>

      {/* Success Message */}
      {uploadSuccess && (
        <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="ml-3 text-sm text-green-700 font-medium">
              Data uploaded successfully! Select a student to view analytics.
            </p>
          </div>
        </div>
      )}

      {/* Analytics Display */}
      {selectedStudent ? (
        <Dashboard studentId={selectedStudent} />
      ) : (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No Student Selected</h3>
          <p className="mt-2 text-sm text-gray-500">
            Upload exam data and select a student to view their analytics
          </p>
        </div>
      )}
    </div>
  )
}