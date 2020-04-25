import React from "react";

const Info = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const total = good + neutral + bad;
  const average = (good - bad) / total
  const positive = (good * 100) / total
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p style={{ color: "red" }}>all {total}</p>
      <p style={{ color: "red" }}>average {isNaN(average) ? "0" : average }</p>
      <p style={{ color: "red" }}>positive {isNaN(positive) ? "0" : positive }</p>
    </div>
  );
};

export default Info;
