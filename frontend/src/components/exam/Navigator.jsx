export default function Navigator({ 
  currentQuestion, 
  totalQuestions, 
  answers, 
  onQuestionSelect, 
  onPrevious, 
  onNext,
  onSubmit 
}) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-semibold text-gray-900 mb-3">Question Palette</h3>
      
      {/* Question grid */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        {Array.from({ length: totalQuestions }, (_, i) => (
          <button
            key={i}
            onClick={() => onQuestionSelect(i)}
            className={`w-full aspect-square rounded-lg font-semibold text-sm transition-all ${
              i === currentQuestion
                ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                : answers[i] !== null
                ? 'bg-green-100 text-green-700 border border-green-300'
                : 'bg-gray-100 text-gray-600 border border-gray-300 hover:bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center">
          <div className="w-6 h-6 bg-green-100 border border-green-300 rounded mr-2" />
          <span className="text-gray-600">Answered ({answers.filter(a => a !== null).length})</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-gray-100 border border-gray-300 rounded mr-2" />
          <span className="text-gray-600">Not Answered ({answers.filter(a => a === null).length})</span>
        </div>
        <div className="flex items-center">
          <div className="w-6 h-6 bg-blue-600 rounded mr-2" />
          <span className="text-gray-600">Current</span>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onPrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            ← Previous
          </button>
          <button
            onClick={onNext}
            disabled={currentQuestion === totalQuestions - 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            Next →
          </button>
        </div>
        
        <button
          onClick={onSubmit}
          className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 font-semibold shadow-md"
        >
          Submit Test
        </button>
      </div>
    </div>
  )
}