# AI-Powered Competitive Exam Performance Analytics (MVP)

## 📌 Overview

This project is a **web-based MVP** built for a **national-level hackathon** under the theme of **AI-powered performance analytics for competitive exams**.

The platform conducts mock/practice exams, tracks detailed user performance, and generates **intelligent, explainable, rule-based insights** to help students improve their preparation.

This is a **fully functional MVP**, not just a concept or UI mock.

---

## ✨ Key Features

### 🎓 Test Taking Module
- **Smart Timer:** Color-coded countdown with progress bar (green → yellow → red)
- **Question Navigator:** Visual palette showing answered/unanswered questions
- **Flexible Navigation:** Jump to any question, navigate forward/backward
- **Auto-Submit:** Automatic submission when time expires with confirmation
- **Negative Marking:** JEE-specific scoring system (-1 for wrong answers)
- **Real-time Tracking:** Live progress tracking with answer status indicators

### 📊 AI-Powered Analytics
- **Performance Analysis:** Topic-wise and difficulty-wise breakdowns
- **Weakness Detection:** Automatically identifies topics with <70% accuracy
- **Priority System:** Critical/High/Medium weakness classification
- **Study Time Estimation:** Calculates recommended practice hours per topic
- **Speed vs Accuracy:** Analyzes time management patterns
- **Detailed Solutions:** Question-by-question review with explanations

### 🎯 Personalized Recommendations
- **Smart Resource Curation:** Khan Academy, NCERT, Physics Wallah, Unacademy
- **Priority-Based Study Plans:** Focus areas ranked by weakness level
- **Practice Question Calculator:** Recommends specific number of questions to practice
- **Google Search Integration:** One-click search for additional study materials
- **Motivational Feedback:** Performance-based encouragement messages
- **Estimated Study Time:** Hours needed to master weak topics

### 📈 Detailed Results
- **Comprehensive Scoring:** Total marks, percentage, correct answers, time taken
- **Visual Solutions:** Color-coded correct/incorrect answers with explanations
- **Topic Performance:** Individual subject/topic accuracy tracking
- **Progress Bars:** Visual representation of performance metrics
- **Retake Options:** Restart tests with different question sets

---

## 🎯 Problem Statement

Students preparing for competitive exams face difficulty in:

- Identifying weak topics accurately
- Understanding performance trends across attempts
- Managing time effectively during exams
- Receiving personalized, actionable preparation guidance

### This platform solves the problem by:

- Conducting mock/practice tests with realistic exam conditions
- Tracking accuracy, difficulty-wise and topic-wise performance
- Analyzing speed vs accuracy patterns
- Providing personalized study recommendations with curated resources
- Offering one-click access to learning materials

---

## 🧠 What "AI" Means in This Project

This MVP uses **rule-based intelligent analytics**, not heavy machine learning.

AI features include:

- **Topic-wise strength & weakness detection** using performance thresholds
- **Difficulty-wise accuracy analysis** with pattern recognition
- **Time management and speed insights** based on question timing data
- **Personalized preparation recommendations** using algorithmic logic
- **Resource matching** based on exam type and weak topics
- **Priority scoring** for study focus areas
- **Explainable outputs** (important for hackathon evaluation)

The system is designed to be transparent and actionable, not a "black box."

---

## 📋 Question Strategy

- All questions are **preloaded** into the database
- No file uploads required
- Questions are randomly selected per test
- Each question is tagged with:
  - `examType` (JEE, NEET, etc.)
  - `section` (Physics, Chemistry, etc.)
  - `topic` (Mechanics, Organic Chemistry, etc.)
  - `subtopic` (specific concepts)
  - `difficulty` (easy / medium / hard)
  - `correctAnswer` (index of correct option)
  - `marks` (weightage)

---

## 📁 Project Structure

```
ai-exam-analytics-mvp/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # MongoDB connection
│   │   ├── routes/
│   │   │   ├── questionRoutes.js        # Question API endpoints
│   │   │   └── testRoutes.js            # Test submission endpoints
│   │   ├── models/
│   │   │   ├── Question.js              # Question schema
│   │   │   └── TestAttempt.js           # Test attempt schema
│   │   ├── controllers/
│   │   │   ├── questionController.js    # Question logic
│   │   │   └── testController.js        # Test logic
│   │   ├── seed/
│   │   │   └── seedQuestions.js         # Database seeding script
│   │   └── server.js                    # Express server setup
│   ├── .env.example                     # Environment template
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── exam/
│   │   │   │   ├── ExamSelector.jsx     # Exam type selection
│   │   │   │   ├── Timer.jsx            # Countdown timer
│   │   │   │   ├── QuestionCard.jsx     # Question display
│   │   │   │   ├── Navigator.jsx        # Question palette
│   │   │   │   └── ResultsPage.jsx      # Results & recommendations
│   │   │   └── layout/
│   │   │       ├── Navbar.jsx           # Navigation bar
│   │   │       └── Footer.jsx           # Footer component
│   │   ├── pages/
│   │   │   ├── Home.jsx                 # Landing page
│   │   │   ├── TakeTest.jsx             # Main test interface
│   │   │   └── Dashboard.jsx            # Analytics dashboard
│   │   ├── data/
│   │   │   └── sampleQuestions.js       # Sample question data
│   │   ├── utils/
│   │   │   └── generateRecommendations.js  # AI recommendation logic
│   │   ├── services/
│   │   │   └── api.js                   # API client
│   │   ├── App.jsx                      # Main app component
│   │   ├── main.jsx                     # Entry point
│   │   └── index.css                    # Global styles
│   ├── .env.example                     # Environment template
│   ├── .gitignore
│   ├── vite.config.js                   # Vite configuration
│   ├── tailwind.config.js               # Tailwind configuration
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=http://localhost:5000
```

⚠️ **Never commit `.env` files**  
Use `.env.example` as reference.

---

## 🚀 How to Run the Project (Complete Setup)

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (free tier works)
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Adnan-Shaikh/ai-exam-analytics-mvp.git
cd ai-exam-analytics-mvp
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Add your MongoDB Atlas URI to `.env`:
```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/examdb
NODE_ENV=development
```

#### Run backend server

```bash
npm start
# OR for development with nodemon
npm run dev
```

Expected output:
```
Server running on port 5000
MongoDB connected successfully
```

#### Test backend API

Open browser or Postman:
```
GET http://localhost:5000/api/questions
```

Should return a JSON array of questions.

---

### 3️⃣ Seed Questions (First Time Setup)

If database is empty, run the seed script:

```bash
node src/seed/seedQuestions.js
```

This will populate the database with sample JEE and NEET questions.

---

### 4️⃣ Frontend Setup

Open a new terminal:

```bash
cd frontend
npm install
```

Create `.env` file:
```bash
cp .env.example .env
```

Verify `.env` contains:
```env
VITE_API_BASE_URL=http://localhost:5000
```

#### Run frontend development server

```bash
npm run dev
```

Expected output:
```
VITE v5.x.x ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

---

### 5️⃣ Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🚧 Current Status

### ✅ Fully Implemented & Working

**Backend:**
- ✅ MongoDB Atlas connection established
- ✅ Backend server runs successfully
- ✅ Questions stored in database with proper schema
- ✅ REST APIs functional (GET questions, POST test results)
- ✅ Environment variables configured
- ✅ Seed script for sample questions
- ✅ Error handling and validation

**Frontend:**
- ✅ Complete test-taking interface with timer
- ✅ Question navigation palette with answer tracking
- ✅ Real-time answer selection and validation
- ✅ Auto-submit on timeout with confirmation dialogs
- ✅ Detailed results page with visual solutions
- ✅ Topic-wise performance analysis with charts
- ✅ AI-powered study recommendations engine
- ✅ Curated learning resources (Khan Academy, NCERT, etc.)
- ✅ Google search integration for additional resources
- ✅ Motivational messages based on performance
- ✅ Negative marking system for JEE exams
- ✅ Responsive design with Tailwind CSS
- ✅ Frontend ↔ Backend integration complete

### 🎯 MVP Status: **COMPLETE & DEMO-READY**


## 📸 Screenshots

### Landing Page
![alt text](LandingPage.png)

### Test Interface
![alt text](TestPage.png)

### AI Recommendations
![alt text](Recommend.png)

### Anlytics Dashboard
![alt text](DBone.png)
![alt text](DBtwo.png)
![alt text](DBthree.png)
---

## ⚠️ Current Limitations (MVP Scope)

These are **intentional scope decisions** for MVP demonstration:

- Question bank limited to sample data (10-20 questions per exam type)
- No user authentication/login system yet
- No test history persistence across sessions
- Basic analytics (no ML predictions or trend analysis yet)
- Mock data only - not connected to real exam boards
- Single-user mode (no multi-user support or profiles)
- Limited to JEE and NEET (other exams planned)

**Note:** These limitations are by design for hackathon MVP scope. The architecture supports easy expansion of all these features.

---

## 🔮 Future Enhancements

### Short-term (Post-Hackathon)
- [ ] User authentication and profiles
- [ ] Test history and progress tracking
- [ ] More question banks (100+ questions per exam)
- [ ] Performance trend graphs over time
- [ ] Mobile app version
- [ ] Share results on social media

### Medium-term
- [ ] ML-based difficulty prediction
- [ ] Adaptive testing (questions adjust to user level)
- [ ] Peer comparison and leaderboards
- [ ] Study groups and collaboration features
- [ ] Integration with more learning platforms
- [ ] Video solutions for complex questions

### Long-term
- [ ] AI tutor chatbot for doubt solving
- [ ] Custom test creation by educators
- [ ] Live proctored exams
- [ ] Scholarship and opportunity matching
- [ ] Multi-language support
- [ ] Offline mode with sync

---


---
## 🐛 Troubleshooting

### Backend Issues

**Problem:** MongoDB connection fails
```
Solution: 
1. Check MongoDB Atlas IP whitelist
2. Verify MONGO_URI in .env
3. Ensure network connectivity
```

**Problem:** Port 5000 already in use
```
Solution:
1. Change PORT in .env to 5001
2. Update VITE_API_BASE_URL in frontend .env
3. Restart backend server
```

### Frontend Issues

**Problem:** Cannot fetch questions
```
Solution:
1. Verify backend is running on localhost:5000
2. Check VITE_API_BASE_URL in .env
3. Check browser console for CORS errors
4. Ensure questions exist in database
```

**Problem:** Timer not working
```
Solution:
1. Clear browser cache
2. Check browser console for errors
3. Verify React state updates
```

---

### Current State:
- ✅ Complete test-taking flow
- ✅ AI-powered recommendations
- ✅ Real-time analytics
- ✅ Professional UI/UX
- ✅ Integration with learning resources
- ✅ Scalable architecture

**The MVP is complete and all major features are operational.**

---

