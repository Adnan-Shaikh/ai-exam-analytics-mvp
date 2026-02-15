from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
import pandas as pd
import io

from app.database import get_db
from app.services.data_processor import DataProcessor
from app.models.schemas import CSVUploadResponse

router = APIRouter()

@router.post("/csv", response_model=CSVUploadResponse)
async def upload_csv(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload CSV file with exam attempt data
    
    Required CSV columns:
    - attempt_id, student_id, exam_type, test_number, test_date
    - question_id, topic, subtopic, difficulty, is_correct
    - time_taken, total_marks, marks_obtained
    """
    # Validate file type
    if not file.filename.endswith('.csv'):
        raise HTTPException(
            status_code=400,
            detail="Only CSV files are allowed"
        )
    
    try:
        # Read CSV
        contents = await file.read()
        df = pd.read_csv(io.StringIO(contents.decode('utf-8')))
        
        # Process with DataProcessor
        processor = DataProcessor(db)
        result = processor.process_csv(df)
        
        if not result["success"]:
            raise HTTPException(
                status_code=400,
                detail=result.get("error", "Unknown error processing CSV")
            )
        
        return CSVUploadResponse(
            message=result["message"],
            records_processed=result["records_processed"],
            students=result["students"]
        )
        
    except pd.errors.EmptyDataError:
        raise HTTPException(status_code=400, detail="CSV file is empty")
    except pd.errors.ParserError:
        raise HTTPException(status_code=400, detail="Invalid CSV format")
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error processing CSV: {str(e)}"
        )

@router.get("/sample")
async def get_sample_csv():
    """Get sample CSV format for reference"""
    return {
        "message": "Sample CSV format",
        "columns": [
            "attempt_id", "student_id", "exam_type", "test_number",
            "test_date", "question_id", "topic", "subtopic",
            "difficulty", "is_correct", "time_taken",
            "total_marks", "marks_obtained"
        ],
        "sample_row": {
            "attempt_id": "ATT_00001",
            "student_id": "STU_0001",
            "exam_type": "JEE",
            "test_number": 1,
            "test_date": "2026-02-01",
            "question_id": "Q_0001",
            "topic": "Physics",
            "subtopic": "Mechanics",
            "difficulty": "medium",
            "is_correct": True,
            "time_taken": 85,
            "total_marks": 4,
            "marks_obtained": 4
        }
    }