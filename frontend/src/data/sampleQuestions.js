export const sampleQuestions = {
  JEE: {
    Physics: [
      {
        id: 'P001',
        question: 'A body of mass 5 kg is moving with a velocity of 10 m/s. What is its kinetic energy?',
        options: ['125 J', '250 J', '500 J', '750 J'],
        correctAnswer: 1,
        topic: 'Physics',
        subtopic: 'Mechanics',
        difficulty: 'easy',
        marks: 4
      },
      {
        id: 'P002',
        question: 'The first law of thermodynamics is based on the conservation of:',
        options: ['Mass', 'Energy', 'Momentum', 'Temperature'],
        correctAnswer: 1,
        topic: 'Physics',
        subtopic: 'Thermodynamics',
        difficulty: 'medium',
        marks: 4
      },
      {
        id: 'P003',
        question: 'A convex lens of focal length 20 cm forms an image at 40 cm. What is the object distance?',
        options: ['10 cm', '20 cm', '30 cm', '40 cm'],
        correctAnswer: 3,
        topic: 'Physics',
        subtopic: 'Optics',
        difficulty: 'hard',
        marks: 4
      },
    ],
    Chemistry: [
      {
        id: 'C001',
        question: 'What is the molecular formula of Glucose?',
        options: ['C6H12O6', 'C5H10O5', 'C6H10O6', 'C5H12O6'],
        correctAnswer: 0,
        topic: 'Chemistry',
        subtopic: 'Organic Chemistry',
        difficulty: 'easy',
        marks: 4
      },
      {
        id: 'C002',
        question: 'Which of the following is an aldehyde?',
        options: ['CH3COCH3', 'CH3CHO', 'CH3COOH', 'CH3OH'],
        correctAnswer: 1,
        topic: 'Chemistry',
        subtopic: 'Organic Chemistry',
        difficulty: 'medium',
        marks: 4
      },
      {
        id: 'C003',
        question: 'The pH of a 0.01 M HCl solution is:',
        options: ['1', '2', '3', '4'],
        correctAnswer: 1,
        topic: 'Chemistry',
        subtopic: 'Physical Chemistry',
        difficulty: 'medium',
        marks: 4
      },
    ],
    Mathematics: [
      {
        id: 'M001',
        question: 'What is the derivative of x²?',
        options: ['x', '2x', 'x²', '2x²'],
        correctAnswer: 1,
        topic: 'Mathematics',
        subtopic: 'Calculus',
        difficulty: 'easy',
        marks: 4
      },
      {
        id: 'M002',
        question: 'If sin θ = 1/2, what is the value of θ in the first quadrant?',
        options: ['30°', '45°', '60°', '90°'],
        correctAnswer: 0,
        topic: 'Mathematics',
        subtopic: 'Trigonometry',
        difficulty: 'easy',
        marks: 4
      },
      {
        id: 'M003',
        question: 'The integral of 1/x dx is:',
        options: ['ln|x| + C', 'x² + C', '1/x² + C', 'e^x + C'],
        correctAnswer: 0,
        topic: 'Mathematics',
        subtopic: 'Calculus',
        difficulty: 'medium',
        marks: 4
      },
    ]
  },
  NEET: {
    Physics: [
      {
        id: 'NP001',
        question: 'The SI unit of force is:',
        options: ['Joule', 'Newton', 'Watt', 'Pascal'],
        correctAnswer: 1,
        topic: 'Physics',
        subtopic: 'Mechanics',
        difficulty: 'easy',
        marks: 4
      },
    ],
    Chemistry: [
      {
        id: 'NC001',
        question: 'What is the atomic number of Carbon?',
        options: ['4', '6', '8', '12'],
        correctAnswer: 1,
        topic: 'Chemistry',
        subtopic: 'Inorganic Chemistry',
        difficulty: 'easy',
        marks: 4
      },
    ],
    Biology: [
      {
        id: 'B001',
        question: 'The powerhouse of the cell is:',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Golgi body'],
        correctAnswer: 1,
        topic: 'Biology',
        subtopic: 'Cell Biology',
        difficulty: 'easy',
        marks: 4
      },
      {
        id: 'B002',
        question: 'Photosynthesis occurs in:',
        options: ['Mitochondria', 'Chloroplast', 'Nucleus', 'Ribosome'],
        correctAnswer: 1,
        topic: 'Biology',
        subtopic: 'Botany',
        difficulty: 'easy',
        marks: 4
      },
      {
        id: 'B003',
        question: 'DNA stands for:',
        options: ['Deoxyribonucleic Acid', 'Diribonucleic Acid', 'Deoxyribose Acid', 'None'],
        correctAnswer: 0,
        topic: 'Biology',
        subtopic: 'Genetics',
        difficulty: 'easy',
        marks: 4
      },
    ]
  }
}

// Function to get random questions
export const getRandomQuestions = (examType, count = 10) => {
  const subjects = sampleQuestions[examType]
  if (!subjects) return []
  
  const allQuestions = []
  Object.values(subjects).forEach(subjectQuestions => {
    allQuestions.push(...subjectQuestions)
  })
  
  // Shuffle and take 'count' questions
  const shuffled = allQuestions.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, shuffled.length))
}