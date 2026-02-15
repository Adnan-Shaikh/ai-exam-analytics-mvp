export default function ExamSelector({ onStartTest }) {
  const examTypes = [
    { id: 'JEE', name: 'JEE (Joint Entrance Examination)', subjects: 'Physics, Chemistry, Mathematics', questions: 10 },
    { id: 'NEET', name: 'NEET (Medical Entrance)', subjects: 'Physics, Chemistry, Biology', questions: 10 }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Take Practice Test</h1>
      <p className="text-gray-600 mb-8">Select an exam type to start your practice test</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {examTypes.map((exam) => (
          <div key={exam.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-blue-600">{exam.id}</h2>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                {exam.questions} Questions
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{exam.name}</h3>
            <p className="text-gray-600 mb-4">Subjects: {exam.subjects}</p>
            
            <div className="space-y-2 mb-6 text-sm text-gray-600">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Auto-submit after time
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Instant results & explanations
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Topic-wise performance
              </div>
            </div>

            <button
              onClick={() => onStartTest(exam.id)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 font-semibold transition-colors"
            >
              Start {exam.id} Test
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <svg className="w-6 h-6 text-yellow-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h3 className="text-yellow-800 font-semibold mb-1">Mock Test - For Practice Only</h3>
            <p className="text-yellow-700 text-sm">
              This is a sample test with limited questions for demonstration purposes. 
              In production, this would connect to a full question bank with thousands of questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}