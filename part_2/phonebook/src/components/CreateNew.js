import React, { useState } from "react";

const CreateNew = ({ handleSubmit }) => {
  const [formData, setFormData] = useState({ name: "", number: "" });
  const { name, number } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const createNew = (e) => {
    e.preventDefault();
    handleSubmit(formData);
    setFormData({ name: "", number: "" });
  };

  return (
    <form onSubmit={createNew}>
      <div>
        Name:{" "}
        <input type="text" value={name} name="name" onChange={handleChange} />
      </div>
      <div>
        Number:{" "}
        <input
          type="text"
          value={number}
          name="number"
          onChange={handleChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default CreateNew;
