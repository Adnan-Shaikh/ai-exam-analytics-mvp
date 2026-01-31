import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Test() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/questions?exam=JEE&section=Physics")
      .then(res => setQuestions(res.data));
  }, []);

  const submitTest = async () => {
    const res = await api.post("/test/submit", {
      userId: "guest",
      examType: "JEE",
      section: "Physics",
      attempts: answers
    });
    navigate("/results", { state: res.data });
  };

  return (
    <div>
      {questions.map((q, i) => (
        <div key={q._id}>
          <p>{q.questionText}</p>
          {q.options.map(opt => (
            <button
              key={opt}
              onClick={() =>
                setAnswers([...answers, {
                  questionId: q._id,
                  topic: q.topic,
                  difficulty: q.difficulty,
                  selectedAnswer: opt,
                  isCorrect: opt === q.correctAnswer,
                  timeSpent: 60
                }])
              }
            >
              {opt}
            </button>
          ))}
        </div>
      ))}
      <button onClick={submitTest}>Submit</button>
    </div>
  );
}
