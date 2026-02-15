import pandas as pd
from datetime import datetime
from typing import Dict, List
from sqlalchemy.orm import Session
from app.models.attempt import Attempt

class DataProcessor:
    """Process and validate uploaded CSV data"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def validate_csv(self, df: pd.DataFrame) -> Dict:
        """Validate CSV structure and data"""
        required_columns = [
            'attempt_id', 'student_id', 'exam_type', 'test_number',
            'test_date', 'question_id', 'topic', 'subtopic', 
            'difficulty', 'is_correct', 'time_taken', 
            'total_marks', 'marks_obtained'
        ]
        
        # Check for missing columns
        missing_columns = set(required_columns) - set(df.columns)
        if missing_columns:
            return {
                "valid": False,
                "error": f"Missing required columns: {', '.join(missing_columns)}"
            }
        
        # Check for empty dataframe
        if df.empty:
            return {
                "valid": False,
                "error": "CSV file is empty"
            }
        
        # Check data types and values
        validation_errors = []
        
        # Check boolean column
        if not df['is_correct'].isin([True, False, 'true', 'false', 'True', 'False', 1, 0]).all():
            validation_errors.append("is_correct must be boolean (true/false)")
        
        # Check numeric columns
        numeric_columns = ['test_number', 'time_taken', 'total_marks', 'marks_obtained']
        for col in numeric_columns:
            if not pd.to_numeric(df[col], errors='coerce').notna().all():
                validation_errors.append(f"{col} must contain only numbers")
        
        # Check difficulty values
        valid_difficulties = ['easy', 'medium', 'hard']
        if not df['difficulty'].isin(valid_difficulties).all():
            validation_errors.append(f"difficulty must be one of: {', '.join(valid_difficulties)}")
        
        if validation_errors:
            return {
                "valid": False,
                "error": "; ".join(validation_errors)
            }
        
        return {"valid": True}
    
    def clean_data(self, df: pd.DataFrame) -> pd.DataFrame:
        """Clean and standardize data"""
        # Make a copy to avoid modifying original
        df = df.copy()
        
        # Remove duplicates based on attempt_id
        df = df.drop_duplicates(subset=['attempt_id'], keep='first')
        
        # Convert data types
        df['is_correct'] = df['is_correct'].astype(bool)
        df['test_number'] = df['test_number'].astype(int)
        df['time_taken'] = df['time_taken'].astype(int)
        df['total_marks'] = df['total_marks'].astype(int)
        df['marks_obtained'] = df['marks_obtained'].astype(int)
        
        # Convert test_date to date
        df['test_date'] = pd.to_datetime(df['test_date']).dt.date
        
        # Standardize string columns
        df['exam_type'] = df['exam_type'].str.strip().str.upper()
        df['topic'] = df['topic'].str.strip()
        df['subtopic'] = df['subtopic'].str.strip()
        df['difficulty'] = df['difficulty'].str.strip().str.lower()
        
        return df
    
    def store_data(self, df: pd.DataFrame) -> Dict:
        """Store cleaned data in database"""
        try:
            stored_count = 0
            skipped_count = 0
            
            for _, row in df.iterrows():
                # Check if attempt_id already exists
                existing = self.db.query(Attempt).filter(
                    Attempt.attempt_id == row['attempt_id']
                ).first()
                
                if existing:
                    skipped_count += 1
                    continue
                
                # Create new attempt
                attempt = Attempt(
                    attempt_id=row['attempt_id'],
                    student_id=row['student_id'],
                    exam_type=row['exam_type'],
                    test_number=row['test_number'],
                    test_date=row['test_date'],
                    question_id=row['question_id'],
                    topic=row['topic'],
                    subtopic=row['subtopic'],
                    difficulty=row['difficulty'],
                    is_correct=row['is_correct'],
                    time_taken=row['time_taken'],
                    total_marks=row['total_marks'],
                    marks_obtained=row['marks_obtained']
                )
                
                self.db.add(attempt)
                stored_count += 1
            
            # Commit all changes
            self.db.commit()
            
            return {
                "success": True,
                "stored": stored_count,
                "skipped": skipped_count,
                "total": len(df)
            }
            
        except Exception as e:
            self.db.rollback()
            return {
                "success": False,
                "error": str(e)
            }
    
    def process_csv(self, df: pd.DataFrame) -> Dict:
        """Main processing pipeline"""
        # Validate
        validation = self.validate_csv(df)
        if not validation["valid"]:
            return {
                "success": False,
                "error": validation["error"]
            }
        
        # Clean
        df_clean = self.clean_data(df)
        
        # Store
        result = self.store_data(df_clean)
        
        if result["success"]:
            # Get unique students
            students = df_clean['student_id'].unique().tolist()
            
            return {
                "success": True,
                "message": "CSV processed successfully",
                "records_processed": result["stored"],
                "records_skipped": result["skipped"],
                "total_records": result["total"],
                "students": students
            }
        else:
            return result