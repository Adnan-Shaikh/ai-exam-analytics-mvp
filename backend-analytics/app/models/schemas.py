from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import date

# Request Schemas
class AttemptCreate(BaseModel):
    """Schema for creating a new attempt"""
    attempt_id: str
    student_id: str
    exam_type: str
    test_number: int
    test_date: date
    question_id: str
    topic: str
    subtopic: str
    difficulty: str
    is_correct: bool
    time_taken: int
    total_marks: int
    marks_obtained: int

class CSVUploadResponse(BaseModel):
    """Response after CSV upload"""
    message: str
    records_processed: int
    students: List[str]

# Analytics Response Schemas
class DifficultyBreakdown(BaseModel):
    """Performance breakdown by difficulty"""
    attempted: int
    correct: int
    accuracy: float
    avg_time: float

class TopicPerformance(BaseModel):
    """Topic-wise performance analysis"""
    topic: str
    total_questions: int
    correct_answers: int
    accuracy: float
    avg_time_per_question: float
    difficulty_breakdown: Dict[str, DifficultyBreakdown]
    weakness_level: str  # "high", "medium", "low"
    trend: Optional[str] = None  # "improving", "declining", "stable"

class Recommendation(BaseModel):
    """Personalized study recommendation"""
    priority: int
    topic: str
    subtopic: str
    current_accuracy: float
    predicted_improvement: float
    recommended_practice_count: int
    difficulty_progression: List[str]
    reason: str
    estimated_time_hours: float

class AnalyticsResult(BaseModel):
    """Complete analytics for a student"""
    student_id: str
    exam_type: str
    overall_accuracy: float
    total_questions: int
    total_tests: int
    avg_time_per_question: float
    total_marks_obtained: int
    total_marks_possible: int
    topic_performance: List[TopicPerformance]
    recommendations: List[Recommendation]
    predicted_next_score: Optional[float] = None
    improvement_rate: Optional[float] = None
    
class Config:
    from_attributes = True