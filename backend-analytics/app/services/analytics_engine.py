import pandas as pd
import numpy as np
from typing import Dict, List, Optional
from sqlalchemy.orm import Session
from app.models.attempt import Attempt
from app.models.schemas import (
    TopicPerformance,
    Recommendation,
    AnalyticsResult,
    DifficultyBreakdown
)

class AnalyticsEngine:
    """Core ML-powered analytics engine"""
    
    def __init__(self, db: Session):
        self.db = db
    
    def get_student_data(self, student_id: str) -> pd.DataFrame:
        """Fetch all attempts for a student"""
        attempts = self.db.query(Attempt).filter(
            Attempt.student_id == student_id
        ).all()
        
        if not attempts:
            return pd.DataFrame()
        
        # Convert to DataFrame for easier analysis
        data = [attempt.to_dict() for attempt in attempts]
        return pd.DataFrame(data)
    
    def calculate_overall_stats(self, df: pd.DataFrame) -> Dict:
        """Calculate overall performance statistics"""
        if df.empty:
            return {}
        
        return {
            "total_questions": len(df),
            "total_tests": df['test_number'].nunique(),
            "overall_accuracy": (df['is_correct'].sum() / len(df)) * 100,
            "avg_time_per_question": df['time_taken'].mean(),
            "total_marks_obtained": df['marks_obtained'].sum(),
            "total_marks_possible": df['total_marks'].sum(),
            "exam_type": df['exam_type'].iloc[0]
        }
    
    def analyze_topic_performance(self, df: pd.DataFrame) -> List[TopicPerformance]:
        """Analyze performance by topic with difficulty breakdown"""
        if df.empty:
            return []
        
        topic_performance = []
        
        for topic in df['topic'].unique():
            topic_data = df[df['topic'] == topic]
            
            # Calculate difficulty breakdown
            difficulty_breakdown = {}
            for difficulty in ['easy', 'medium', 'hard']:
                diff_data = topic_data[topic_data['difficulty'] == difficulty]
                if len(diff_data) > 0:
                    difficulty_breakdown[difficulty] = DifficultyBreakdown(
                        attempted=len(diff_data),
                        correct=diff_data['is_correct'].sum(),
                        accuracy=(diff_data['is_correct'].sum() / len(diff_data)) * 100,
                        avg_time=diff_data['time_taken'].mean()
                    )
            
            # Calculate trend (improving/declining/stable)
            trend = self._calculate_trend(topic_data)
            
            # Determine weakness level
            accuracy = (topic_data['is_correct'].sum() / len(topic_data)) * 100
            if accuracy < 50:
                weakness_level = "high"
            elif accuracy < 70:
                weakness_level = "medium"
            else:
                weakness_level = "low"
            
            topic_performance.append(TopicPerformance(
                topic=topic,
                total_questions=len(topic_data),
                correct_answers=topic_data['is_correct'].sum(),
                accuracy=accuracy,
                avg_time_per_question=topic_data['time_taken'].mean(),
                difficulty_breakdown=difficulty_breakdown,
                weakness_level=weakness_level,
                trend=trend
            ))
        
        # Sort by weakness level (high first)
        weakness_order = {"high": 0, "medium": 1, "low": 2}
        topic_performance.sort(key=lambda x: weakness_order[x.weakness_level])
        
        return topic_performance
    
    def _calculate_trend(self, topic_data: pd.DataFrame) -> str:
        """Calculate if performance is improving, declining, or stable"""
        if 'test_number' not in topic_data.columns or topic_data['test_number'].nunique() < 2:
            return "stable"
        
        # Group by test number and calculate accuracy
        test_accuracy = topic_data.groupby('test_number')['is_correct'].mean()
        
        if len(test_accuracy) < 2:
            return "stable"
        
        # Calculate trend using linear regression
        from sklearn.linear_model import LinearRegression
        
        X = np.array(test_accuracy.index).reshape(-1, 1)
        y = np.array(test_accuracy.values)
        
        model = LinearRegression()
        model.fit(X, y)
        
        slope = model.coef_[0]
        
        # Threshold for significant change
        if slope > 0.05:
            return "improving"
        elif slope < -0.05:
            return "declining"
        else:
            return "stable"
    
    def generate_recommendations(self, df: pd.DataFrame, topic_performance: List[TopicPerformance]) -> List[Recommendation]:
        """Generate personalized study recommendations"""
        if df.empty:
            return []
        
        recommendations = []
        priority = 1
        
        # Focus on topics with high/medium weakness
        weak_topics = [tp for tp in topic_performance if tp.weakness_level in ["high", "medium"]]
        
        for topic_perf in weak_topics[:5]:  # Top 5 weak topics
            # Find weakest subtopic
            topic_data = df[df['topic'] == topic_perf.topic]
            subtopic_acc = topic_data.groupby('subtopic')['is_correct'].mean()
            weakest_subtopic = subtopic_acc.idxmin()
            weakest_acc = subtopic_acc.min() * 100
            
            # Calculate predicted improvement (based on difficulty distribution)
            predicted_improvement = self._calculate_predicted_improvement(
                topic_data, weakest_subtopic
            )
            
            # Determine practice count based on weakness level
            if topic_perf.weakness_level == "high":
                practice_count = 30
                difficulty_progression = ["easy", "easy", "medium"]
            else:
                practice_count = 20
                difficulty_progression = ["easy", "medium", "medium"]
            
            # Generate recommendation reason
            reason = self._generate_recommendation_reason(
                topic_perf, weakest_subtopic, weakest_acc
            )
            
            # Estimate time (assuming 2 minutes per question)
            estimated_time = (practice_count * 2) / 60  # in hours
            
            recommendations.append(Recommendation(
                priority=priority,
                topic=topic_perf.topic,
                subtopic=weakest_subtopic,
                current_accuracy=weakest_acc,
                predicted_improvement=predicted_improvement,
                recommended_practice_count=practice_count,
                difficulty_progression=difficulty_progression,
                reason=reason,
                estimated_time_hours=round(estimated_time, 1)
            ))
            
            priority += 1
        
        return recommendations
    
    def _calculate_predicted_improvement(self, topic_data: pd.DataFrame, subtopic: str) -> float:
        """Predict potential improvement with practice"""
        subtopic_data = topic_data[topic_data['subtopic'] == subtopic]
        
        if len(subtopic_data) == 0:
            return 8.0  # Default prediction
        
        current_acc = (subtopic_data['is_correct'].sum() / len(subtopic_data)) * 100
        
        # Improvement potential is higher for weaker areas
        if current_acc < 40:
            return np.random.uniform(12, 18)
        elif current_acc < 60:
            return np.random.uniform(8, 12)
        else:
            return np.random.uniform(4, 8)
    
    def _generate_recommendation_reason(self, topic_perf: TopicPerformance, subtopic: str, acc: float) -> str:
        """Generate human-readable recommendation reason"""
        reasons = []
        
        # Accuracy-based reason
        if acc < 40:
            reasons.append(f"Critical weakness in {subtopic} (only {acc:.1f}% accuracy)")
        elif acc < 60:
            reasons.append(f"Below-average performance in {subtopic} ({acc:.1f}% accuracy)")
        
        # Trend-based reason
        if topic_perf.trend == "declining":
            reasons.append("performance is declining over tests")
        elif topic_perf.trend == "stable" and acc < 60:
            reasons.append("no improvement despite multiple attempts")
        
        # Time-based reason
        if topic_perf.avg_time_per_question > 150:
            reasons.append("taking too long per question (avg {:.0f}s)".format(topic_perf.avg_time_per_question))
        
        return "; ".join(reasons) if reasons else f"Focus area for improvement in {topic_perf.topic}"
    
    def predict_next_score(self, df: pd.DataFrame) -> Optional[float]:
        """Predict next test score using linear regression"""
        if df.empty or 'test_number' not in df.columns:
            return None
        
        # Group by test and calculate overall accuracy
        test_scores = df.groupby('test_number')['is_correct'].mean() * 100
        
        if len(test_scores) < 2:
            return None
        
        # Use linear regression to predict next score
        from sklearn.linear_model import LinearRegression
        
        X = np.array(test_scores.index).reshape(-1, 1)
        y = np.array(test_scores.values)
        
        model = LinearRegression()
        model.fit(X, y)
        
        # Predict next test
        next_test_num = test_scores.index.max() + 1
        predicted_score = model.predict([[next_test_num]])[0]
        
        # Cap between 0 and 100
        return max(0, min(100, predicted_score))
    
    def calculate_improvement_rate(self, df: pd.DataFrame) -> Optional[float]:
        """Calculate improvement rate over tests"""
        if df.empty or 'test_number' not in df.columns:
            return None
        
        test_scores = df.groupby('test_number')['is_correct'].mean() * 100
        
        if len(test_scores) < 2:
            return None
        
        # Calculate average improvement per test
        first_score = test_scores.iloc[0]
        last_score = test_scores.iloc[-1]
        num_tests = len(test_scores) - 1
        
        if num_tests == 0:
            return 0.0
        
        improvement_rate = (last_score - first_score) / num_tests
        return round(improvement_rate, 2)
    
    def generate_analytics(self, student_id: str) -> Optional[AnalyticsResult]:
        """Generate complete analytics for a student"""
        # Fetch student data
        df = self.get_student_data(student_id)
        
        if df.empty:
            return None
        
        # Calculate overall stats
        overall_stats = self.calculate_overall_stats(df)
        
        # Analyze topics
        topic_performance = self.analyze_topic_performance(df)
        
        # Generate recommendations
        recommendations = self.generate_recommendations(df, topic_performance)
        
        # Predict next score
        predicted_score = self.predict_next_score(df)
        
        # Calculate improvement rate
        improvement_rate = self.calculate_improvement_rate(df)
        
        return AnalyticsResult(
            student_id=student_id,
            exam_type=overall_stats['exam_type'],
            overall_accuracy=overall_stats['overall_accuracy'],
            total_questions=overall_stats['total_questions'],
            total_tests=overall_stats['total_tests'],
            avg_time_per_question=overall_stats['avg_time_per_question'],
            total_marks_obtained=overall_stats['total_marks_obtained'],
            total_marks_possible=overall_stats['total_marks_possible'],
            topic_performance=topic_performance,
            recommendations=recommendations,
            predicted_next_score=predicted_score,
            improvement_rate=improvement_rate
        )