export default function TopicHeatmap({ topics }) {
  const getWeaknessColor = (level) => {
    switch (level) {
      case 'high':
        return 'bg-red-100 border-red-300 text-red-800'
      case 'medium':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800'
      case 'low':
        return 'bg-green-100 border-green-300 text-green-800'
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800'
    }
  }

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving':
        return (
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        )
      case 'declining':
        return (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
          </svg>
        )
    }
  }

  if (!topics || topics.length === 0) {
    return <p className="text-gray-500">No topic data available</p>
  }

  return (
    <div className="space-y-4">
      {topics.map((topic, index) => (
        <div
          key={index}
          className={`border-2 rounded-lg p-4 ${getWeaknessColor(topic.weakness_level)}`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <h3 className="text-lg font-semibold">{topic.topic}</h3>
              {topic.trend && getTrendIcon(topic.trend)}
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">{topic.accuracy.toFixed(1)}%</p>
              <p className="text-sm">{topic.correct_answers}/{topic.total_questions} correct</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {Object.entries(topic.difficulty_breakdown).map(([difficulty, stats]) => (
              <div key={difficulty} className="bg-white bg-opacity-50 rounded p-2">
                <p className="text-xs font-medium capitalize">{difficulty}</p>
                <p className="text-sm font-semibold">{stats.accuracy.toFixed(0)}%</p>
                <p className="text-xs text-gray-600">{stats.correct}/{stats.attempted}</p>
              </div>
            ))}
          </div>

          <div className="mt-3 text-sm">
            <p>Avg Time: <span className="font-semibold">{topic.avg_time_per_question.toFixed(0)}s</span> per question</p>
          </div>
        </div>
      ))}
    </div>
  )
}