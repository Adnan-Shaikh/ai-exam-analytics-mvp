// ...existing code...
import { generateRecommendations, getMotivationalMessage } from '../../utils/generateRecommendations'

export default function ResultsPage({ results = {}, examType, onRetakeTest, onBackToHome }) {
  const { 
    score = 0, 
    totalMarks = 0, 
    correctAnswers = 0, 
    totalQuestions = 0, 
    percentage = 0, 
    timeTaken = 0,
    topicWise = {},
    questions = [],
    userAnswers = []
  } = results || {}

  // Generate AI recommendations
  const recommendations = generateRecommendations(topicWise, examType) || []
  const motivationalMessage = getMotivationalMessage(percentage || 0)

  const handleSearchResource = (query) => {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query || '')}`
    window.open(searchUrl, '_blank')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Overall Score Card */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">Test Completed! 🎉</h1>
        <p className="text-blue-100 text-lg mb-4">{motivationalMessage}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-blue-200 text-sm mb-1">Score</p>
            <p className="text-4xl font-bold">{score}/{totalMarks}</p>
          </div>
          <div className="text-center">
            <p className="text-blue-200 text-sm mb-1">Percentage</p>
            <p className="text-4xl font-bold">{Number(percentage || 0).toFixed(1)}%</p>
          </div>
          <div className="text-center">
            <p className="text-blue-200 text-sm mb-1">Correct Answers</p>
            <p className="text-4xl font-bold">{correctAnswers}/{totalQuestions}</p>
          </div>
          <div className="text-center">
            <p className="text-blue-200 text-sm mb-1">Time Taken</p>
            <p className="text-4xl font-bold">{Math.floor(timeTaken / 60)}:{String(timeTaken % 60).padStart(2, '0')}</p>
          </div>
        </div>
      </div>

      {/* AI-Powered Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center mb-4">
            <svg className="w-6 h-6 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900">AI-Powered Study Recommendations</h2>
          </div>

          <div className="space-y-4">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`border-l-4 rounded-lg p-5 ${
                  rec.weaknessLevel === 'Critical' ? 'border-red-500 bg-red-50' :
                  rec.weaknessLevel === 'High' ? 'border-orange-500 bg-orange-50' :
                  'border-yellow-500 bg-yellow-50'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                        Priority {rec.priority} - {rec.weaknessLevel} Priority
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{rec.topic}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Current Performance: {rec.correct}/{rec.total} correct ({Number(rec.accuracy || 0).toFixed(0)}%)
                    </p>
                  </div>
                </div>

                {/* Study Plan */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white bg-opacity-60 rounded p-3">
                    <p className="text-sm text-gray-600">Recommended Practice</p>
                    <p className="text-lg font-semibold text-blue-600">{rec.practiceQuestions} questions</p>
                  </div>
                  <div className="bg-white bg-opacity-60 rounded p-3">
                    <p className="text-sm text-gray-600">Estimated Study Time</p>
                    <p className="text-lg font-semibold text-green-600">{rec.estimatedTime} hours</p>
                  </div>
                </div>

                {/* Study Resources */}
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">📚 Recommended Resources:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {(rec.studyResources || []).map((resource, idx) => (
                      <a
                        key={idx}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between bg-white p-3 rounded-lg hover:shadow-md transition-shadow border border-gray-200"
                      >
                        <div>
                          <p className="font-medium text-gray-900 text-sm">{resource.name}</p>
                          <p className="text-xs text-gray-500">{resource.type}</p>
                        </div>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Search Button */}
                <button
                  onClick={() => handleSearchResource(rec.searchQuery)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 rounded-lg hover:from-purple-700 hover:to-blue-700 font-medium flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search More Resources on Google
                </button>
              </div>
            ))}
          </div>

          {/* Overall Recommendation */}
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-indigo-600 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h4 className="font-semibold text-indigo-900 mb-1">Study Strategy</h4>
                <p className="text-sm text-indigo-700">
                  Focus on the topics marked as Critical and High priority first. 
                  Spend {Number(recommendations.reduce((sum, r) => sum + parseFloat(r.estimatedTime || 0), 0)).toFixed(1)} hours 
                  total on these areas for maximum improvement. Practice regularly and track your progress!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Topic-wise Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Topic-wise Performance</h2>
        <div className="space-y-3">
          {Object.entries(topicWise || {}).map(([topic, stats]) => (
            <div key={topic} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900">{topic}</h3>
                <span className={`font-bold ${ (stats?.accuracy || 0) >= 70 ? 'text-green-600' : (stats?.accuracy || 0) >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {Number(stats?.accuracy || 0).toFixed(0)}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{stats?.correct || 0}/{stats?.total || 0} correct</span>
                <span>{stats?.marks || 0}/{stats?.totalMarks || 0} marks</span>
              </div>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${(stats?.accuracy || 0) >= 70 ? 'bg-green-500' : (stats?.accuracy || 0) >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${stats?.accuracy || 0}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Solutions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Detailed Solutions</h2>
        <div className="space-y-4">
          {questions.map((q, index) => {
            const userAnswer = userAnswers[index]
            const isCorrect = userAnswer === q.correctAnswer
            
            return (
              <div key={q.id || index} className={`border-2 rounded-lg p-4 ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="font-bold text-gray-700">Q{index + 1}.</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                    <span className="text-xs text-gray-500">{q.topic} - {q.subtopic}</span>
                  </div>
                  <span className="text-gray-600 font-semibold">{isCorrect ? `+${q.marks}` : userAnswer !== null && userAnswer !== undefined ? '-1' : '0'} marks</span>
                </div>
                
                <p className="text-gray-900 mb-3">{q.question}</p>
                
                <div className="space-y-2">
                  {q.options.map((option, optIndex) => {
                    const isUserAnswer = userAnswer === optIndex
                    const isCorrectAnswer = q.correctAnswer === optIndex
                    
                    return (
                      <div
                        key={optIndex}
                        className={`p-3 rounded-lg ${
                          isCorrectAnswer ? 'bg-green-100 border-2 border-green-500' :
                          isUserAnswer ? 'bg-red-100 border-2 border-red-500' :
                          'bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center">
                          {isCorrectAnswer && (
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          {isUserAnswer && !isCorrectAnswer && (
                            <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                          <span className={`${isCorrectAnswer ? 'font-semibold text-green-900' : isUserAnswer ? 'font-semibold text-red-900' : 'text-gray-700'}`}>
                            {String.fromCharCode(65 + optIndex)}. {option}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={onRetakeTest}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Retake Test
        </button>
        <button
          onClick={onBackToHome}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 font-semibold"
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
// ...existing code...