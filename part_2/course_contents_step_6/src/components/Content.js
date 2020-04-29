import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  return (
    <div>
      {parts ? (
        parts.map((part) => <Part key={part.id} part={part} />)
      ) : (
        <h3>No parts found</h3>
      )}
    </div>
  );
};

export default Content;
