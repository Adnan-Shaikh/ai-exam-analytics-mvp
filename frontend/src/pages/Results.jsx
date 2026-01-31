import { useLocation } from "react-router-dom";

export default function Results() {
  const { state } = useLocation();

  return (
    <div>
      <h2>Score: {state.score}</h2>
      <p>Accuracy: {state.accuracy.toFixed(2)}%</p>
      <p>Avg Time: {state.avgTime}s</p>

      <h3>Recommendations</h3>
      <ul>
        {state.recommendations.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}
