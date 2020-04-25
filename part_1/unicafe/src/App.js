import React, { useState } from "react";
import "./App.css";
import Buttons from "./components/Buttons";

function App() {
  const [feedback, setfeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  return (
    <div className="App">
      <Buttons feedback={feedback} setfeedback={setfeedback} />
      <h1>Statistics</h1>
      <p>Good {feedback.good}</p>
      <p>neutral {feedback.neutral}</p>
      <p>Bad {feedback.bad}</p>
    </div>
  );
}

export default App;
