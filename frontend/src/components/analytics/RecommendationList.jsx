export default function RecommendationList({ recommendations }) {
  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="mt-2 text-gray-500">Great job! No critical areas need attention right now.</p>
      </div>
    )
  }

  const getPriorityColor = (priority) => {
    if (priority === 1) return 'border-red-500 bg-red-50'
    if (priority === 2) return 'border-orange-500 bg-orange-50'
    if (priority === 3) return 'border-yellow-500 bg-yellow-50'
    return 'border-blue-500 bg-blue-50'
  }

  const getPriorityLabel = (priority) => {
    if (priority === 1) return 'Critical'
    if (priority === 2) return 'High'
    if (priority === 3) return 'Medium'
    return 'Low'
  }

  return (
    <div className="space-y-4">
      {recommendations.map((rec, index) => (
        <div
          key={index}
          className={`border-l-4 rounded-lg p-5 ${getPriorityColor(rec.priority)}`}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Priority {rec.priority} - {getPriorityLabel(rec.priority)}
                </span>
              </div>
              <h3 className="text-lg font-bold text-gray-900">
                {rec.topic} → {rec.subtopic}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Current</p>
              <p className="text-2xl font-bold text-red-600">{rec.current_accuracy.toFixed(1)}%</p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-sm text-gray-600">Predicted Improvement</p>
              <p className="text-lg font-semibold text-green-600">+{rec.predicted_improvement.toFixed(1)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Practice Needed</p>
              <p className="text-lg font-semibold text-blue-600">{rec.recommended_practice_count} questions</p>
            </div>
          </div>

          {/* Difficulty Progression */}
          <div className="mb-3">
            <p className="text-sm text-gray-600 mb-2">Difficulty Progression:</p>
            <div className="flex space-x-2">
              {rec.difficulty_progression.map((diff, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 rounded-full text-xs font-medium
                    ${diff === 'easy' ? 'bg-green-200 text-green-800' : 
                      diff === 'medium' ? 'bg-yellow-200 text-yellow-800' : 
                      'bg-red-200 text-red-800'}`}
                >
                  {diff}
                </span>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div className="bg-white bg-opacity-50 rounded p-3 mb-3">
            <p className="text-sm text-gray-700">
              <span className="font-semibold">Why:</span> {rec.reason}
            </p>
          </div>

          {/* Time Estimate */}
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Estimated time: {rec.estimated_time_hours} hours
          </div>
        </div>
      ))}
    </div>
  )
}