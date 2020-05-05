import React from "react";

const SerchForCountreis = ({ handleChange }) => {
  const handleInput = (e) => {
    handleChange(e.target.value);
  };

  return (
    <div>
      find countries
      <input type="text" onChange={handleInput} />
    </div>
  );
};

export default SerchForCountreis;
