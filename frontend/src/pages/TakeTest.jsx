import { useState } from 'react'
import ExamSelector from '../components/exam/ExamSelector'
import QuestionCard from '../components/exam/QuestionCard'
import Timer from '../components/exam/Timer'
import Navigator from '../components/exam/Navigator'
import ResultsPage from '../components/exam/ResultsPage'
import { getRandomQuestions } from '../data/sampleQuestions'

export default function TakeTest() {
  const [examType, setExamType] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
  const [testStartTime, setTestStartTime] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState(null)

  const TEST_DURATION = 600 // 10 minutes in seconds

  const handleStartTest = (selectedExamType) => {
    const selectedQuestions = getRandomQuestions(selectedExamType, 10)
    setExamType(selectedExamType)
    setQuestions(selectedQuestions)
    setAnswers(new Array(selectedQuestions.length).fill(null))
    setCurrentQuestion(0)
    setTestStartTime(Date.now())
    setShowResults(false)
  }

  const handleAnswerSelect = (answerIndex) => {
    const newAnswers = [...answers]
    newAnswers[currentQuestion] = answerIndex
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleQuestionSelect = (index) => {
    setCurrentQuestion(index)
  }

  const calculateResults = () => {
    const timeTaken = Math.floor((Date.now() - testStartTime) / 1000)
    let correctAnswers = 0
    let score = 0
    const topicWise = {}

    questions.forEach((q, index) => {
      const userAnswer = answers[index]
      const isCorrect = userAnswer === q.correctAnswer
      
      if (isCorrect) {
        correctAnswers++
        score += q.marks
      } else if (userAnswer !== null && examType === 'JEE') {
        score -= 1 // Negative marking for JEE
      }

      // Topic-wise stats
      if (!topicWise[q.topic]) {
        topicWise[q.topic] = {
          total: 0,
          correct: 0,
          marks: 0,
          totalMarks: 0
        }
      }
      topicWise[q.topic].total++
      topicWise[q.topic].totalMarks += q.marks
      if (isCorrect) {
        topicWise[q.topic].correct++
        topicWise[q.topic].marks += q.marks
      } else if (userAnswer !== null && examType === 'JEE') {
        topicWise[q.topic].marks -= 1
      }
    })

    // Calculate accuracy for each topic
    Object.keys(topicWise).forEach(topic => {
      topicWise[topic].accuracy = (topicWise[topic].correct / topicWise[topic].total) * 100
    })

    const totalMarks = questions.reduce((sum, q) => sum + q.marks, 0)
    const percentage = (correctAnswers / questions.length) * 100

    return {
      score: Math.max(0, score),
      totalMarks,
      correctAnswers,
      totalQuestions: questions.length,
      percentage,
      timeTaken,
      topicWise,
      questions,
      userAnswers: answers
    }
  }

  const handleSubmit = () => {
    const unanswered = answers.filter(a => a === null).length
    
    if (unanswered > 0) {
      const confirmSubmit = window.confirm(
        `You have ${unanswered} unanswered question(s). Are you sure you want to submit?`
      )
      if (!confirmSubmit) return
    }

    const calculatedResults = calculateResults()
    setResults(calculatedResults)
    setShowResults(true)
  }

  const handleTimeUp = () => {
    alert('Time is up! Test will be auto-submitted.')
    const calculatedResults = calculateResults()
    setResults(calculatedResults)
    setShowResults(true)
  }

  const handleRetakeTest = () => {
    handleStartTest(examType)
  }

  const handleBackToHome = () => {
    setExamType(null)
    setQuestions([])
    setAnswers([])
    setShowResults(false)
    setResults(null)
  }

  // Show exam selector
  if (!examType) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ExamSelector onStartTest={handleStartTest} />
      </div>
    )
  }

  // Show results
  if (showResults && results) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResultsPage 
          results={results}
          examType={examType}
          onRetakeTest={handleRetakeTest}
          onBackToHome={handleBackToHome}
        />
      </div>
    )
  }

  // Show test interface
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main question area */}
        <div className="lg:col-span-2 space-y-6">
          <Timer duration={TEST_DURATION} onTimeUp={handleTimeUp} />
          <QuestionCard
            question={questions[currentQuestion]}
            questionNumber={currentQuestion + 1}
            totalQuestions={questions.length}
            selectedAnswer={answers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
          />
        </div>

        {/* Navigator sidebar */}
        <div className="lg:col-span-1">
          <Navigator
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
            answers={answers}
            onQuestionSelect={handleQuestionSelect}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}