import React from "react";

const Person = ({ person: { name, number, id }, deleteContact }) => {
  const handleDelete = () => {
    deleteContact(id, name);
  };

  return (
    <>
      <div style={{ margin: "20px" }}>
        <span style={{ marginRight: "15px" }}>
          {name} {number}
        </span>
        <button onClick={handleDelete}>delete</button>
      </div>
    </>
  );
};

export default Person;
