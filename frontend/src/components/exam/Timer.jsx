import { useState, useEffect } from 'react'

export default function Timer({ duration, onTimeUp }) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, onTimeUp])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  const getColorClass = () => {
    if (timeLeft > 60) return 'text-green-600'
    if (timeLeft > 30) return 'text-yellow-600'
    return 'text-red-600 animate-pulse'
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-gray-700 font-medium">Time Remaining:</span>
        </div>
        <div className={`text-2xl font-bold ${getColorClass()}`}>
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-1000 ${
            timeLeft > 60 ? 'bg-green-500' : timeLeft > 30 ? 'bg-yellow-500' : 'bg-red-500'
          }`}
          style={{ width: `${(timeLeft / duration) * 100}%` }}
        />
      </div>
    </div>
  )
}