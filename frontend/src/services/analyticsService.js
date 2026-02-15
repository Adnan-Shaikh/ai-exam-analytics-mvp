import { analyticsAPI } from './api'

export const analyticsService = {
  // Upload CSV
  uploadCSV: async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    
    const response = await analyticsAPI.post('/api/upload/csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Get all students
  getAllStudents: async (examType = null) => {
    const params = examType ? { exam_type: examType } : {}
    const response = await analyticsAPI.get('/api/analytics/students', { params })
    return response.data
  },

  // Get student analytics
  getStudentAnalytics: async (studentId) => {
    const response = await analyticsAPI.get(`/api/analytics/student/${studentId}`)
    return response.data
  },

  // Get topic analysis
  getTopicAnalysis: async (studentId) => {
    const response = await analyticsAPI.get(`/api/analytics/topics/${studentId}`)
    return response.data
  },

  // Get platform statistics
  getOverviewStats: async () => {
    const response = await analyticsAPI.get('/api/analytics/stats/overview')
    return response.data
  },

  // Health check
  healthCheck: async () => {
    const response = await analyticsAPI.get('/health')
    return response.data
  },

  clearAllData: async () => {
    const response = await analyticsAPI.delete('/api/upload/clear')
    return response.data
  },
}