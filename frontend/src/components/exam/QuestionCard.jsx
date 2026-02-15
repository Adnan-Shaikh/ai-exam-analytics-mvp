export default function QuestionCard({ question, questionNumber, selectedAnswer, onAnswerSelect, totalQuestions }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
            Question {questionNumber} / {totalQuestions}
          </span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {question.topic} - {question.subtopic}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            question.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
            question.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
            'bg-red-100 text-red-700'
          }`}>
            {question.difficulty}
          </span>
        </div>
        <span className="text-gray-600 font-semibold">{question.marks} marks</span>
      </div>

      {/* Question */}
      <div className="mb-6">
        <p className="text-lg text-gray-900 leading-relaxed">{question.question}</p>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedAnswer === index
                ? 'border-blue-600 bg-blue-50 shadow-md'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                selectedAnswer === index
                  ? 'border-blue-600 bg-blue-600'
                  : 'border-gray-300'
              }`}>
                {selectedAnswer === index && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <span className={`flex-1 ${selectedAnswer === index ? 'font-semibold text-blue-900' : 'text-gray-700'}`}>
                {String.fromCharCode(65 + index)}. {option}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}