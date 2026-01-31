import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>AI Exam Analytics</h1>
      <button onClick={() => navigate("/test")}>Start Test</button>
    </div>
  );
}
