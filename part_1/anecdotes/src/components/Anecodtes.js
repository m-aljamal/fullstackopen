import React from "react";

const Anecodtes = ({ text, points }) => {
  return (
    <div>
      <p>{text}</p>
      <p style={{ color: "red" }}>
        Has{" "}
        {points === 0
          ? " no votes"
          : points === 1
          ? "1 vote"
          : `${points} votes`}
      </p>
    </div>
  );
};

export default Anecodtes;
