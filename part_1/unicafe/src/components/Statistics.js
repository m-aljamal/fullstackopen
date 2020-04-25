import React from "react";

const Info = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = (good * 100) / total;

  if (good === 0 && neutral === 0 && bad === 0) {
    return <h2>No feedback given</h2>;
  }
  return (
    <div>
     
      <p>Good {good}</p>
      <p>neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p style={{ color: "red" }}>all {total}</p>
      <p style={{ color: "red" }}>average {isNaN(average) ? "0" : average}</p>
      <p style={{ color: "red" }}>
        positive {isNaN(positive) ? "0" : positive}
      </p>
    </div>
  );
};

export default Info;
