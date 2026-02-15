import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function PerformanceChart({ analytics }) {
  if (!analytics || !analytics.topic_performance) {
    return <p className="text-gray-500">No data available</p>
  }

  // Prepare data for chart
  const chartData = analytics.topic_performance.map(topic => ({
    name: topic.topic,
    accuracy: parseFloat(topic.accuracy.toFixed(1)),
    avgTime: parseFloat(topic.avg_time_per_question.toFixed(1)),
    questions: topic.total_questions
  }))

  return (
    <div className="space-y-6">
      {/* Accuracy Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Accuracy by Topic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="accuracy" fill="#3B82F6" name="Accuracy %" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Time Analysis Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Average Time per Question</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'Time (seconds)', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="avgTime" fill="#10B981" name="Avg Time (s)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}