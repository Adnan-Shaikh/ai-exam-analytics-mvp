# AI-Powered Competitive Exam Performance Analytics (MVP)

## 📌 Overview

This project is a **web-based MVP** built for a **national-level hackathon** under the theme of **AI-powered performance analytics for competitive exams**.

The platform conducts mock/practice exams, tracks detailed user performance, and generates **intelligent, explainable, rule-based insights** to help students improve their preparation.

This is a **fully functional MVP**, not just a concept or UI mock.

---

## 🎯 Problem Statement

Students preparing for competitive exams face difficulty in:
- Identifying weak topics accurately
- Understanding performance trends across attempts
- Managing time effectively during exams
- Receiving personalized, actionable preparation guidance

### This platform solves the problem by:
- Conducting mock/practice tests
- Tracking accuracy, difficulty-wise and topic-wise performance
- Analyzing speed vs accuracy patterns
- Providing personalized study recommendations

---

## 🧠 What “AI” Means in This Project

This MVP uses **rule-based intelligent analytics**, not heavy machine learning.

AI features include:
- Topic-wise strength & weakness detection
- Difficulty-wise accuracy analysis
- Time management and speed insights
- Personalized preparation recommendations
- Explainable outputs (important for hackathon evaluation)

---

## 🧪 Exam Domains Supported

### Primary (Full Scope)
- **JEE**
  - Physics
  - Chemistry
  - Mathematics

### Secondary (Minimal Scope)
- Aptitude
- IELTS
- GATE

---

## 📋 Question Strategy

- All questions are **preloaded** into the database
- No file uploads
- Questions are randomly selected per test
- Each question is tagged with:
  - `examType`
  - `section`
  - `topic`
  - `difficulty` (easy / medium / hard)
  - `correctAnswer`

---

## 🧩 User Flow (End-to-End)

1. User opens the website
2. Selects exam type and test mode
3. System serves randomized questions
4. User attempts the test
5. System records:
   - Selected answers
   - Correct / incorrect responses
   - Time spent per question
6. User submits the test
7. Backend calculates:
   - Score
   - Topic-wise accuracy
   - Difficulty-wise accuracy
   - Average time per question
   - Speed vs accuracy patterns
8. Analytics engine generates:
   - Strengths & weaknesses
   - Time management insights
   - Personalized recommendations
9. User views performance dashboard

---
![flowchart](https://github.com/user-attachments/assets/ed0c9d38-a253-4092-adef-1937935386c1)
![flowchart](https://github.com/user-attachments/assets/24240b99-2284-45ee-89ab-5f6b3918ee9d)

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- Chart.js / Recharts (dashboard)
- Runs on `localhost:5173`

### Backend
- Node.js
- Express.js
- REST APIs
- Mongoose
- Runs on `localhost:5000`

### Database
- MongoDB Atlas (Cloud)
- Stores:
  - Questions
  - Test attempts
  - Performance history

---

## 📁 Project Structure

ai-exam-analytics-mvp/
│
├── backend/
│ ├── src/
│ │ ├── config/
│ │ │ └── db.js
│ │ ├── routes/
│ │ ├── models/
│ │ ├── seed/
│ │ │ └── seedQuestions.js
│ │ └── server.js
│ ├── .env.example
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── services/
│ │ ├── App.jsx
│ │ └── main.jsx
│ ├── .env.example
│ └── package.json
│
├── .gitignore
└── README.md

## ⚙️ Environment Variables

### Backend (`backend/.env`)

PORT=5000
MONGO_URI=your_mongodb_atlas_uri_here


### Frontend (`frontend/.env`)
VITE_API_BASE_URL=http://localhost:5000


⚠️ **Never commit `.env` files**  
Use `.env.example` as reference.

---

## 🚀 How to Run the Project (Complete Setup)

### 1️⃣ Clone the Repository

git clone <repository-url>
cd ai-exam-analytics-mvp


---

### 2️⃣ Backend Setup

cd backend
npm install
cp .env.example .env


Add your MongoDB Atlas URI to `.env`.

#### Run backend

node src/server.js


Expected output:
Server running on port 5000
MongoDB connected


#### Test backend API
GET http://localhost:5000/api/questions

Should return a JSON array of questions.

---

### 3️⃣ Seed Questions (if database is empty)
node src/seed/seedQuestions.js


---

### 4️⃣ Frontend Setup
cd ../frontend
npm install
cp .env.example .env
npm run dev

## 🚧 Current Status & Known Issues

### ✅ Working
- MongoDB Atlas connection established
- Backend server runs successfully
- Questions stored in database
- APIs respond correctly in Postman
- Environment variables configured

### ❌ Not Fully Working Yet
- Frontend UI does not display data
- Frontend ↔ backend integration incomplete

### 🔍 Suspected Causes
- Incorrect frontend API base URL
- Missing or incorrect Vite proxy configuration
- Frontend not calling APIs properly
- CORS or fetch/axios issues
- Data fetched but not rendered

---
## 🎯 What Needs to Be Fixed (For Contributors)

1. Verify frontend API calls hit: http://localhost:5000/api/questions
2. Check browser console for errors
3. Confirm backend routes match frontend requests
4. Fix frontend data fetching logic
5. Render questions on UI
6. (Optional) Add analytics dashboard visuals

---

## 🏁 MVP Completion Goal

To finalize the MVP:
- Display questions on frontend
- Enable test submission
- Show basic analytics summary
- Add simple charts for dashboard
- Prepare a clean demo flow for judges

---

## 🧑‍💻 Contribution Notes

This project prioritizes:
- Clarity
- Explainability
- Real usability

Please avoid heavy ML or over-engineering.  
Simple, clear logic is preferred for hackathon evaluation.

---

## 📣 Final Note

This is a **deployable, realistic MVP** designed for hackathon qualification and demonstration.

The core backend and database logic exist; remaining work is primarily **frontend wiring and UI rendering**.

