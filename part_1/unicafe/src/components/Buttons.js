import React from "react";

const Button = ({ feedback, setfeedback }) => {
  const handleGood = () => {
    setfeedback({ ...feedback, good: feedback.good + 1 });
  };
  const handleNeutral = () => {
    setfeedback({ ...feedback, neutral: feedback.neutral + 1 });
  };
  const handleBad = () => {
    setfeedback({ ...feedback, bad: feedback.bad + 1 });
  };
  return (
    <>
      <button onClick={handleGood}>Good</button>
      <button onClick={handleNeutral}>Neutral</button>
      <button onClick={handleBad}>Bad</button>
    </>
  );
};

export default Button;
