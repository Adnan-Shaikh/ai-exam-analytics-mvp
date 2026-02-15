export const generateRecommendations = (topicWise, examType) => {
  const recommendations = []
  
  // Sort topics by accuracy (lowest first)
  const sortedTopics = Object.entries(topicWise).sort((a, b) => a[1].accuracy - b[1].accuracy)
  
  // Generate recommendations for weak topics (< 70% accuracy)
  sortedTopics.forEach(([topic, stats], index) => {
    if (stats.accuracy < 70) {
      const priority = index + 1
      const weaknessLevel = stats.accuracy < 40 ? 'Critical' : stats.accuracy < 60 ? 'High' : 'Medium'
      
      recommendations.push({
        priority,
        topic,
        accuracy: stats.accuracy,
        weaknessLevel,
        correct: stats.correct,
        total: stats.total,
        searchQuery: generateSearchQuery(topic, examType),
        studyResources: generateStudyResources(topic, examType),
        practiceQuestions: Math.ceil((100 - stats.accuracy) / 2), // More practice for weaker topics
        estimatedTime: calculateStudyTime(stats.accuracy, stats.total)
      })
    }
  })
  
  return recommendations
}

const generateSearchQuery = (topic, examType) => {
  // Generate optimized search query
  return `${examType} ${topic} concepts study material practice questions`
}

const generateStudyResources = (topic, examType) => {
  // Curated resource suggestions based on topic
  const resourceMap = {
    'Physics': {
      'JEE': [
        { name: 'Khan Academy Physics', url: 'https://www.khanacademy.org/science/physics', type: 'Video Lectures' },
        { name: 'Physics Wallah', url: 'https://www.pw.live/', type: 'Live Classes' },
        { name: 'HC Verma Concepts', url: '#', type: 'Book Reference' }
      ],
      'NEET': [
        { name: 'NCERT Physics', url: 'https://ncert.nic.in/', type: 'Textbook' },
        { name: 'Unacademy NEET', url: 'https://unacademy.com/goal/neet-ug', type: 'Online Course' }
      ]
    },
    'Chemistry': {
      'JEE': [
        { name: 'JEE Chemistry Master', url: 'https://www.khanacademy.org/science/chemistry', type: 'Video Tutorials' },
        { name: 'NCERT Chemistry Solutions', url: 'https://ncert.nic.in/', type: 'Study Material' }
      ],
      'NEET': [
        { name: 'NCERT Chemistry', url: 'https://ncert.nic.in/', type: 'Textbook' },
        { name: 'Chemistry Practice Questions', url: '#', type: 'Question Bank' }
      ]
    },
    'Mathematics': {
      'JEE': [
        { name: 'RD Sharma Solutions', url: '#', type: 'Problem Solving' },
        { name: 'Brilliant.org Math', url: 'https://brilliant.org/', type: 'Interactive Learning' }
      ]
    },
    'Biology': {
      'NEET': [
        { name: 'NCERT Biology', url: 'https://ncert.nic.in/', type: 'Textbook' },
        { name: 'Biology Diagrams & Notes', url: '#', type: 'Visual Learning' }
      ]
    }
  }
  
  return resourceMap[topic]?.[examType] || [
    { name: `${topic} Study Guide`, url: '#', type: 'General Resources' },
    { name: `${examType} ${topic} Practice`, url: '#', type: 'Practice Questions' }
  ]
}

const calculateStudyTime = (accuracy, totalQuestions) => {
  // Calculate recommended study time in hours
  const hoursPerQuestion = 0.15 // 9 minutes per concept
  const questionsToMaster = Math.ceil(totalQuestions * (100 - accuracy) / 100)
  return (questionsToMaster * hoursPerQuestion).toFixed(1)
}

export const getMotivationalMessage = (percentage) => {
  if (percentage >= 90) return "Outstanding performance! 🌟 You're almost ready!"
  if (percentage >= 75) return "Great job! 🎯 Keep up the momentum!"
  if (percentage >= 60) return "Good effort! 💪 Focus on weak areas to improve!"
  if (percentage >= 40) return "You're making progress! 📈 Consistent practice will help!"
  return "Don't give up! 🚀 Every expert was once a beginner!"
}