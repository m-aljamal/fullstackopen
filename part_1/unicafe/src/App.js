import React, { useState } from "react";
import "./App.css";
import Buttons from "./components/Buttons";
import Statistics from "./components/Statistics";

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
      <Statistics feedback={feedback} />
    </div>
  );
}

export default App;
