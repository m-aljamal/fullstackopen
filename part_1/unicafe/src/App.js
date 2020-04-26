import React, { useState } from "react";
import "./App.css";
import Buttons from "./components/Buttons";
import Statistic from "./components/Statistic";
function App() {
  const [feedback, setfeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good * 100) / total;

  return (
    <div className="App">
      <h1>Give feedback</h1>
      <Buttons feedback={feedback} setfeedback={setfeedback} />
      <h1>Statistics</h1>
      {good === 0 && neutral === 0 && bad === 0 ? (
        <h2>No feedback given</h2>
      ) : (
        <table>
          <tr>
            <th>Statistic</th>
            <th>Value</th>
          </tr>
          <Statistic text="Good" value={good} />
          <Statistic text="Neutral" value={neutral} />
          <Statistic text="Bad" value={bad} />
          <Statistic text="All" value={total} />
          <Statistic text="Average" value={average.toFixed(3)} />
          <Statistic text="Positive" value={`${positive.toFixed(3)} % `} />
        </table>
      )}
    </div>
  );
}

export default App;
