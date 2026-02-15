import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import random

# Configuration
INPUT_FILE = 'StudentsPerformance.csv'
OUTPUT_FILE = 'student_attempts.csv'

# Exam configuration - Map to JEE/NEET structure
EXAM_TYPES = {
    'JEE': {
        'topics': {
            'Physics': ['Mechanics', 'Thermodynamics', 'Electromagnetism', 'Optics', 'Modern Physics'],
            'Chemistry': ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'],
            'Mathematics': ['Algebra', 'Calculus', 'Trigonometry', 'Coordinate Geometry', 'Probability']
        },
        'questions_per_topic': 10
    },
    'NEET': {
        'topics': {
            'Physics': ['Mechanics', 'Thermodynamics', 'Optics', 'Modern Physics'],
            'Chemistry': ['Physical Chemistry', 'Organic Chemistry', 'Inorganic Chemistry'],
            'Biology': ['Botany', 'Zoology', 'Genetics', 'Ecology', 'Human Physiology']
        },
        'questions_per_topic': 10
    }
}

DIFFICULTIES = ['easy', 'medium', 'hard']

def load_kaggle_data():
    """Load the original Kaggle dataset"""
    try:
        df = pd.read_csv(INPUT_FILE)
        print(f"✅ Loaded {len(df)} students from Kaggle dataset")
        return df
    except FileNotFoundError:
        print(f"❌ Error: {INPUT_FILE} not found!")
        print("Please download from: https://www.kaggle.com/datasets/spscientist/students-performance-in-exams")
        return None

def score_to_accuracy(score):
    """Convert 0-100 score to boolean accuracy"""
    # Scores > 60 are considered "correct" for that topic
    return score > 60

def score_to_difficulty(score):
    """Infer difficulty based on score"""
    if score >= 75:
        return 'easy'
    elif score >= 50:
        return 'medium'
    else:
        return 'hard'

def estimate_time_taken(difficulty, is_correct):
    """Estimate realistic time taken per question"""
    base_times = {
        'easy': (30, 90),      # 30-90 seconds
        'medium': (60, 150),   # 1-2.5 minutes
        'hard': (90, 240)      # 1.5-4 minutes
    }
    
    min_time, max_time = base_times[difficulty]
    time = random.randint(min_time, max_time)
    
    # Incorrect answers take longer (thinking/confusion)
    if not is_correct:
        time = int(time * random.uniform(1.2, 1.8))
    
    return min(time, 300)  # Cap at 5 minutes

def transform_to_exam_format(df):
    """Transform Kaggle data to our exam attempts format"""
    
    all_attempts = []
    attempt_counter = 1
    
    for idx, student in df.iterrows():
        student_id = f"STU_{idx+1:04d}"
        
        # Randomly assign exam type based on subject scores
        # Higher math/science → JEE, Higher biology correlation → NEET
        if student['math score'] + student['reading score'] > student['writing score'] * 1.5:
            exam_type = 'JEE'
        else:
            exam_type = random.choice(['JEE', 'NEET'])
        
        exam_config = EXAM_TYPES[exam_type]
        
        # Generate 3 test attempts per student (showing progression)
        num_tests = 3
        
        for test_num in range(1, num_tests + 1):
            test_date = datetime.now() - timedelta(days=(num_tests - test_num) * 7)
            
            # Map Kaggle scores to our topics
            subject_scores = {
                'Physics': student['reading score'],  # Reading → Physics (comprehension)
                'Chemistry': student['writing score'],  # Writing → Chemistry (formulas/equations)
                'Mathematics': student['math score'],
            }
            
            # Add Biology for NEET
            if exam_type == 'NEET':
                # Average of reading and writing as Biology proxy
                subject_scores['Biology'] = (student['reading score'] + student['writing score']) / 2
                subject_scores.pop('Mathematics', None)  # NEET doesn't have math
            
            question_id_counter = 1
            
            # Generate questions for each topic
            for topic, base_score in subject_scores.items():
                subtopics = exam_config['topics'][topic]
                questions_per_topic = exam_config['questions_per_topic']
                
                # Distribute questions across subtopics
                for subtopic in subtopics:
                    # 2-3 questions per subtopic
                    num_questions = random.randint(2, 3)
                    
                    for _ in range(num_questions):
                        # Add some variation to base score (student performance varies)
                        score_variation = random.uniform(-15, 15)
                        question_score = max(0, min(100, base_score + score_variation))
                        
                        # Improve over tests (learning effect)
                        improvement = (test_num - 1) * random.uniform(2, 8)
                        question_score = min(100, question_score + improvement)
                        
                        # Determine difficulty and correctness
                        difficulty = score_to_difficulty(question_score)
                        is_correct = score_to_accuracy(question_score)
                        
                        # Estimate time taken
                        time_taken = estimate_time_taken(difficulty, is_correct)
                        
                        # Marks calculation (JEE has negative marking)
                        total_marks = 4
                        if is_correct:
                            marks_obtained = 4
                        else:
                            marks_obtained = -1 if exam_type == 'JEE' else 0
                        
                        # Create attempt record
                        attempt = {
                            'attempt_id': f"ATT_{attempt_counter:05d}",
                            'student_id': student_id,
                            'exam_type': exam_type,
                            'test_number': test_num,
                            'test_date': test_date.strftime('%Y-%m-%d'),
                            'question_id': f"Q_{question_id_counter:04d}",
                            'topic': topic,
                            'subtopic': subtopic,
                            'difficulty': difficulty,
                            'is_correct': is_correct,
                            'time_taken': time_taken,
                            'total_marks': total_marks,
                            'marks_obtained': marks_obtained
                        }
                        
                        all_attempts.append(attempt)
                        attempt_counter += 1
                        question_id_counter += 1
    
    return pd.DataFrame(all_attempts)

def generate_statistics(df):
    """Generate and display statistics about the transformed data"""
    print("\n" + "="*60)
    print("📊 TRANSFORMED DATASET STATISTICS")
    print("="*60)
    
    print(f"\n✅ Total Records: {len(df):,}")
    print(f"👥 Total Students: {df['student_id'].nunique()}")
    print(f"📝 Total Tests: {df.groupby('student_id')['test_number'].max().sum()}")
    print(f"❓ Total Questions: {df['question_id'].nunique()}")
    
    print(f"\n📚 Exam Types:")
    for exam_type, count in df['exam_type'].value_counts().items():
        pct = (count / len(df)) * 100
        print(f"   {exam_type}: {count:,} attempts ({pct:.1f}%)")
    
    print(f"\n📖 Topics:")
    for topic, count in df['topic'].value_counts().items():
        pct = (count / len(df)) * 100
        accuracy = (df[df['topic'] == topic]['is_correct'].sum() / count) * 100
        print(f"   {topic}: {count:,} questions ({pct:.1f}%) - Accuracy: {accuracy:.1f}%")
    
    print(f"\n⚡ Difficulty Distribution:")
    for diff, count in df['difficulty'].value_counts().items():
        pct = (count / len(df)) * 100
        accuracy = (df[df['difficulty'] == diff]['is_correct'].sum() / count) * 100
        print(f"   {diff.capitalize()}: {count:,} ({pct:.1f}%) - Accuracy: {accuracy:.1f}%")
    
    print(f"\n🎯 Overall Performance:")
    print(f"   Average Accuracy: {(df['is_correct'].sum() / len(df)) * 100:.1f}%")
    print(f"   Average Time per Question: {df['time_taken'].mean():.0f} seconds")
    print(f"   Total Marks Possible: {df['total_marks'].sum():,}")
    print(f"   Total Marks Obtained: {df['marks_obtained'].sum():,}")
    
    print("\n" + "="*60)

def main():
    print("🚀 Starting Kaggle Dataset Transformation...")
    print("="*60)
    
    # Load original data
    df_original = load_kaggle_data()
    if df_original is None:
        return
    
    print(f"\n📋 Original Dataset Preview:")
    print(df_original.head())
    print(f"\nColumns: {list(df_original.columns)}")
    
    # Transform
    print(f"\n🔄 Transforming data to exam attempts format...")
    df_transformed = transform_to_exam_format(df_original)
    
    # Generate statistics
    generate_statistics(df_transformed)
    
    # Preview transformed data
    print(f"\n📋 Transformed Dataset Preview:")
    print(df_transformed.head(10))
    
    # Save to CSV
    df_transformed.to_csv(OUTPUT_FILE, index=False)
        
    duplicates = df_transformed['attempt_id'].duplicated().sum()
    print(f"   Duplicate attempt_ids: {duplicates} {'✅' if duplicates == 0 else '❌'}")


if __name__ == "__main__":
    main()