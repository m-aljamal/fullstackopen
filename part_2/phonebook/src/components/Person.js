import React from "react";

const Person = ({ person: { name } }) => {
  return (
    <div>
      <p>{name}</p>
    </div>
  );
};

export default Person;
