import axios from 'axios'

// API Base URLs
const ANALYTICS_API_URL = import.meta.env.VITE_ANALYTICS_API_URL || 'http://localhost:8000'
const EXAM_API_URL = import.meta.env.VITE_EXAM_API_URL || 'http://localhost:5000'

// Create axios instances
export const analyticsAPI = axios.create({
  baseURL: ANALYTICS_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const examAPI = axios.create({
  baseURL: EXAM_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Response interceptor for error handling
const handleError = (error) => {
  if (error.response) {
    console.error('API Error:', error.response.data)
    throw error.response.data
  } else if (error.request) {
    console.error('Network Error:', error.request)
    throw new Error('Network error - please check your connection')
  } else {
    console.error('Error:', error.message)
    throw error
  }
}

analyticsAPI.interceptors.response.use(
  (response) => response,
  handleError
)

examAPI.interceptors.response.use(
  (response) => response,
  handleError
)