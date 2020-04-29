import React, { useState } from "react";
import "./App.css";
import Anecodtes from "./components/Anecodtes";
import { findMostVotes } from "./utils/findmost";
const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

function App() {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});
  const [mostVotes, setMostVotes] = useState(0);
  const handleClick = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length);
    while (randomNumber === selected) {
      randomNumber = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const selectedVot = points[selected] || 0;
    setPoints({ ...points, [selected]: selectedVot + 1 });
    if (!points[mostVotes] || selectedVot + 1 > points[mostVotes]) {
      setMostVotes(selected);
    }
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Next anecdote</button>
      <Anecodtes text={anecdotes[selected]} points={points[selected]} />
      <button onClick={handleVote}>Vote</button>
      <h2>Anecdote with most votes</h2>

      <Anecodtes text={anecdotes[mostVotes]} points={points[mostVotes]} />
    </div>
  );
}

export default App;
