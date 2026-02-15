from sqlalchemy import Column, String, Integer, Boolean, Float, Date
from app.database import Base

class Attempt(Base):
    """Student exam attempt model"""
    __tablename__ = "attempts"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    attempt_id = Column(String, unique=True, index=True, nullable=False)
    student_id = Column(String, index=True, nullable=False)
    exam_type = Column(String, nullable=False)
    test_number = Column(Integer, nullable=False)
    test_date = Column(Date, nullable=False)
    question_id = Column(String, nullable=False)
    topic = Column(String, index=True, nullable=False)
    subtopic = Column(String, nullable=False)
    difficulty = Column(String, nullable=False)
    is_correct = Column(Boolean, nullable=False)
    time_taken = Column(Integer, nullable=False)  # in seconds
    total_marks = Column(Integer, nullable=False)
    marks_obtained = Column(Integer, nullable=False)
    
    def __repr__(self):
        return f"<Attempt {self.attempt_id} - {self.student_id}>"
    
    def to_dict(self):
        """Convert to dictionary"""
        return {
            "attempt_id": self.attempt_id,
            "student_id": self.student_id,
            "exam_type": self.exam_type,
            "test_number": self.test_number,
            "test_date": str(self.test_date),
            "question_id": self.question_id,
            "topic": self.topic,
            "subtopic": self.subtopic,
            "difficulty": self.difficulty,
            "is_correct": self.is_correct,
            "time_taken": self.time_taken,
            "total_marks": self.total_marks,
            "marks_obtained": self.marks_obtained
        }