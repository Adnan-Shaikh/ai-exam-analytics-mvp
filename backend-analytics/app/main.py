from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

# Import config first
from app.config import settings

# Import routers
from app.routes import analytics, upload
from app.database import engine, Base

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Exam Analytics API",
    description="ML-powered analytics engine for competitive exam performance",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS Configuration - Use the cors_origins_list property
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,  # Changed this line
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(upload.router, prefix="/api/upload", tags=["Upload"])

@app.get("/")
async def root():
    return {
        "message": "Exam Analytics API",
        "version": "1.0.0",
        "status": "operational",
        "docs": "/docs",
        "endpoints": {
            "upload_csv": "POST /api/upload/csv",
            "get_analytics": "GET /api/analytics/student/{student_id}",
            "get_students": "GET /api/analytics/students",
            "get_topics": "GET /api/analytics/topics/{student_id}",
            "stats_overview": "GET /api/analytics/stats/overview"
        }
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "analytics-backend",
        "database": "connected"
    }

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)