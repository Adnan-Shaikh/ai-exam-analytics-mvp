import { useState, useEffect } from 'react'
import { analyticsService } from '../../services/analyticsService'
import PerformanceChart from './PerformanceChart'
import TopicHeatmap from './TopicHeatmap'
import RecommendationList from './RecommendationList'

export default function Dashboard({ studentId }) {
  const [analytics, setAnalytics] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (studentId) {
      fetchAnalytics()
    }
  }, [studentId])

  const fetchAnalytics = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await analyticsService.getStudentAnalytics(studentId)
      setAnalytics(data)
    } catch (err) {
      setError(err.detail || err.message || 'Failed to load analytics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 m-4">
        <h3 className="text-red-800 font-semibold mb-2">Error Loading Analytics</h3>
        <p className="text-red-600">{error}</p>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 m-4">
        <p className="text-yellow-800">No analytics data available</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Overall Accuracy</p>
          <p className="text-3xl font-bold text-blue-600">{analytics.overall_accuracy.toFixed(1)}%</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Total Questions</p>
          <p className="text-3xl font-bold text-gray-900">{analytics.total_questions}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Tests Taken</p>
          <p className="text-3xl font-bold text-gray-900">{analytics.total_tests}</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500 text-sm">Predicted Next Score</p>
          <p className="text-3xl font-bold text-green-600">
            {analytics.predicted_next_score ? `${analytics.predicted_next_score.toFixed(1)}%` : 'N/A'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Performance Overview</h2>
        <PerformanceChart analytics={analytics} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Topic-wise Performance</h2>
        <TopicHeatmap topics={analytics.topic_performance} />
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Personalized Recommendations</h2>
        <RecommendationList recommendations={analytics.recommendations} />
      </div>

      {analytics.improvement_rate !== null && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Improvement Trend</h3>
          <p className="text-gray-600">
            You're improving at a rate of{' '}
            <span className={`font-bold ${analytics.improvement_rate > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {analytics.improvement_rate > 0 ? '+' : ''}{analytics.improvement_rate.toFixed(2)}%
            </span>{' '}
            per test
          </p>
        </div>
      )}
    </div>
  )
}