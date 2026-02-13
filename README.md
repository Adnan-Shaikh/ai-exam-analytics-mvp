# 🎓 AI-Powered Competitive Exam Performance Analytics Platform

**Loop Hackathon 2026 - Track 2: Human + Machine Decision Systems**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://exam-analytics.vercel.app) Its just a LLM generated readme for now

---

## 🎯 Problem Statement

Students preparing for competitive exams struggle to:
- Identify weak topics accurately across multiple test attempts
- Understand granular performance patterns (speed vs accuracy, difficulty-wise trends)
- Receive personalized, actionable study recommendations
- Track improvement over time with predictive insights

**Our Solution:** An AI-powered analytics platform that transforms raw exam data into personalized insights and combines it with targeted practice opportunities.

---

## ✨ Key Features

### 📊 **Analytics Engine (Python ML)**
- CSV upload for historical exam data analysis
- Topic-wise performance heatmaps
- AI-powered weakness detection algorithm
- Difficulty-wise accuracy breakdown
- Speed vs accuracy pattern analysis
- Personalized study recommendations
- Score prediction using ML models

### 📝 **Exam Delivery System (Real-time Practice)**
- Practice test interface for JEE/NEET/CAT
- 500+ curated questions by topic & difficulty
- Real-time timer and auto-submit
- Instant scoring and detailed results
- Performance tracking across attempts
- Adaptive question difficulty

### 📈 **Integrated Experience**
- Seamless flow: Analyze → Practice → Improve
- Historical trend visualization
- Improvement tracking over multiple tests
- Exportable performance reports

---

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────┐
│         FRONTEND (React + Vite)                 │
│         https://exam-analytics.vercel.app       │
└────────────┬───────────────────┬────────────────┘
             │                   │
             ▼                   ▼
┌─────────────────────┐ ┌──────────────────────┐
│  Python FastAPI     │ │  Node.js Express     │
│  (Analytics Engine) │ │  (Exam Delivery)     │
│  ML + Data Science  │ │  Real-time Testing   │
└──────────┬──────────┘ └──────────┬───────────┘
           │                       │
           ▼                       ▼
┌──────────────────┐    ┌─────────────────────┐
│   PostgreSQL     │    │   MongoDB Atlas     │
│ (Analytics Data) │    │  (Question Bank)    │
└──────────────────┘    └─────────────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18 + Vite
- **UI Library:** Tailwind CSS
- **Charts:** Recharts
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Routing:** React Router v6

### Backend - Analytics
- **Framework:** Python FastAPI
- **ML/Data:** pandas, numpy, scikit-learn
- **Database:** PostgreSQL + SQLAlchemy
- **Validation:** Pydantic

### Backend - Exam
- **Framework:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Validation:** Joi

### Deployment
- **Frontend:** Vercel
- **Backends:** Render
- **Databases:** Supabase (PostgreSQL), MongoDB Atlas

---


## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL (or use Supabase)
- MongoDB (or use Atlas)

### Setup
```bash
# Clone repository
git clone https://github.com/Adnan-Shaikh/ai-exam-analytics-mvp.git
cd ai-exam-analytics-mvp

# Setup analytics backend
cd backend-analytics
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your database URL
uvicorn app.main:app --reload

# Setup exam backend
cd ../backend-exam
npm install
cp .env.example .env
# Edit .env with MongoDB URI
npm run dev

# Setup frontend
cd ../frontend
npm install
cp .env.example .env
# Edit .env with backend URLs
npm run dev
```

Access the application at `http://localhost:5173`

---

## 📊 Sample Data

Generate sample exam data for testing:
```bash
cd data/sample_data
python generate_sample_data.py
# Creates student_attempts.csv with 750+ realistic records
```

---

## 🎬 Demo

**Live Application:** [exam-analytics.vercel.app](https://exam-analytics.vercel.app)

**Demo Video:** [Watch on YouTube](#)

**API Documentation:**
- Analytics API: [exam-api.onrender.com/docs](https://exam-api.onrender.com/docs)
- Exam API: [exam-delivery.onrender.com/api-docs](https://exam-delivery.onrender.com/api-docs)

---

## 📝 Project Status

- [x] Project setup & architecture
- [x] Sample data generation
- [x] Analytics backend (Python FastAPI)
- [x] Exam backend (Node.js Express)
- [x] Frontend dashboard
- [x] Integration & testing
- [x] Deployment
- [x] Documentation

---

## 🏆 Hackathon Highlights

**Innovation:**
- Hybrid dual-backend architecture (Python ML + Node.js real-time)
- Seamless integration of analytics and practice
- Explainable AI recommendations

**Technical Depth:**
- Machine learning for weakness detection & prediction
- Real-time exam delivery with auto-scoring
- Comprehensive data visualization

**Completeness:**
- Fully deployed production application
- Interactive API documentation
- Clean, maintainable codebase

---

Built for **Loop Hackathon 2026** by Team CodeCrest

**⭐ If you find this project helpful, please star the repository!**

*Last Updated: February 14, 2026*
EOF
