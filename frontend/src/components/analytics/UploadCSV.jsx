import { useState, useEffect } from 'react'
import { analyticsService } from '../../services/analyticsService'

export default function UploadCSV({ onUploadSuccess, onClearData }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [uploadedFileInfo, setUploadedFileInfo] = useState(null)
  const [clearing, setClearing] = useState(false)

  // Load upload state from localStorage on mount
  useEffect(() => {
    const savedUploadInfo = localStorage.getItem('uploadedFileInfo')
    if (savedUploadInfo) {
      setUploadedFileInfo(JSON.parse(savedUploadInfo))
    }
  }, [])

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'text/csv') {
      setFile(selectedFile)
      setError(null)
    } else {
      setError('Please select a valid CSV file')
      setFile(null)
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file first')
      return
    }

    setUploading(true)
    setError(null)
    setSuccess(null)

    try {
      const result = await analyticsService.uploadCSV(file)
      const uploadInfo = {
        filename: file.name,
        size: file.size,
        timestamp: new Date().toISOString(),
        recordsProcessed: result.records_processed,
        studentsCount: result.students.length
      }
      
      setSuccess(`Successfully uploaded ${result.records_processed} records for ${result.students.length} students`)
      setUploadedFileInfo(uploadInfo)
      
      // Save to localStorage for persistence
      localStorage.setItem('uploadedFileInfo', JSON.stringify(uploadInfo))
      
      setFile(null)
      document.getElementById('csv-upload').value = ''
      
      if (onUploadSuccess) {
        onUploadSuccess(result)
      }
    } catch (err) {
      setError(err.detail || err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleClearData = async () => {
    if (!window.confirm('Are you sure you want to clear all uploaded data? This will remove all students and analytics from the database.')) {
      return
    }

    setClearing(true)
    setError(null)

    try {
      // Call backend to clear data (we'll implement this endpoint)
      await analyticsService.clearAllData()
      
      // Clear local state
      setUploadedFileInfo(null)
      setSuccess(null)
      setFile(null)
      localStorage.removeItem('uploadedFileInfo')
      
      // Clear file input
      const fileInput = document.getElementById('csv-upload')
      if (fileInput) {
        fileInput.value = ''
      }
      
      // Notify parent
      if (onClearData) {
        onClearData()
      }

      setSuccess('All data cleared successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.message || 'Failed to clear data')
    } finally {
      setClearing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Upload Exam Data</h2>
        {uploadedFileInfo && (
          <button
            onClick={handleClearData}
            disabled={clearing}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
          >
            {clearing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Clearing...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear All Data
              </>
            )}
          </button>
        )}
      </div>

      {/* Show uploaded file info if exists */}
      {uploadedFileInfo && (
        <div className="mb-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="ml-3 flex-1">
              <p className="text-sm font-medium text-blue-800">Data Currently Loaded</p>
              <div className="mt-2 text-sm text-blue-700">
                <p><strong>File:</strong> {uploadedFileInfo.filename}</p>
                <p><strong>Size:</strong> {(uploadedFileInfo.size / 1024).toFixed(2)} KB</p>
                <p><strong>Records:</strong> {uploadedFileInfo.recordsProcessed.toLocaleString()}</p>
                <p><strong>Students:</strong> {uploadedFileInfo.studentsCount}</p>
                <p><strong>Uploaded:</strong> {new Date(uploadedFileInfo.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {/* File Input */}
        <div>
          <label htmlFor="csv-upload" className="block text-sm font-medium text-gray-700 mb-2">
            {uploadedFileInfo ? 'Upload New File (will replace existing data)' : 'Select CSV File'}
          </label>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100
              cursor-pointer"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {file.name} ({(file.size / 1024).toFixed(2)} KB)
            </p>
          )}
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full py-2 px-4 rounded-md text-white font-medium
            ${!file || uploading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {uploading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Uploading...
            </span>
          ) : (
            uploadedFileInfo ? 'Replace Data' : 'Upload CSV'
          )}
        </button>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Info */}
        {!uploadedFileInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <p className="text-sm text-blue-700">
              <strong>CSV Format Required:</strong> attempt_id, student_id, exam_type, test_number, test_date, question_id, topic, subtopic, difficulty, is_correct, time_taken, total_marks, marks_obtained
            </p>
          </div>
        )}
      </div>
    </div>
  )
}