from fastapi import APIRouter, HTTPException, Depends, Query
from typing import Optional, List
from sqlalchemy.orm import Session

from app.database import get_db
from app.services.analytics_engine import AnalyticsEngine
from app.models.schemas import AnalyticsResult, TopicPerformance

router = APIRouter()

@router.get("/student/{student_id}", response_model=AnalyticsResult)
async def get_student_analytics(
    student_id: str,
    db: Session = Depends(get_db)
):
    """
    Get comprehensive analytics for a student
    
    Returns:
    - Overall performance stats
    - Topic-wise breakdown
    - Personalized recommendations
    - Score predictions
    """
    engine = AnalyticsEngine(db)
    result = engine.generate_analytics(student_id)
    
    if not result:
        raise HTTPException(
            status_code=404,
            detail=f"No data found for student {student_id}"
        )
    
    return result

@router.get("/students", response_model=List[str])
async def get_all_students(
    db: Session = Depends(get_db),
    exam_type: Optional[str] = Query(None, description="Filter by exam type (JEE/NEET)")
):
    """Get list of all student IDs"""
    from app.models.attempt import Attempt
    
    query = db.query(Attempt.student_id).distinct()
    
    if exam_type:
        query = query.filter(Attempt.exam_type == exam_type.upper())
    
    students = [row[0] for row in query.all()]
    
    return students

@router.get("/topics/{student_id}", response_model=List[TopicPerformance])
async def get_topic_analysis(
    student_id: str,
    db: Session = Depends(get_db)
):
    """Get detailed topic-wise performance analysis"""
    engine = AnalyticsEngine(db)
    df = engine.get_student_data(student_id)
    
    if df.empty:
        raise HTTPException(
            status_code=404,
            detail=f"No data found for student {student_id}"
        )
    
    topic_performance = engine.analyze_topic_performance(df)
    return topic_performance

@router.get("/stats/overview")
async def get_overview_stats(db: Session = Depends(get_db)):
    """Get platform-wide statistics"""
    from app.models.attempt import Attempt
    from sqlalchemy import func
    
    total_attempts = db.query(func.count(Attempt.id)).scalar()
    total_students = db.query(func.count(Attempt.student_id.distinct())).scalar()
    total_tests = db.query(func.count(Attempt.test_number.distinct())).scalar()
    
    avg_accuracy = db.query(func.avg(Attempt.is_correct.cast(db.bind.dialect.NUMERIC))).scalar()
    
    return {
        "total_attempts": total_attempts,
        "total_students": total_students,
        "total_tests": total_tests,
        "average_accuracy": round(float(avg_accuracy or 0) * 100, 2)
    }