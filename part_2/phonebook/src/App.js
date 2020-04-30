import React, { useState } from "react";
import "./App.css";
import Person from "./components/Person";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "04-09-255588" },
  ]);
  const [formData, setFormData] = useState({ name: "", number: "" });
  // const [newNumber, setNewNumber] = useState("");
  const { name, number } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkName = persons.find(
      (person) => person.name === name || person.number === number
    );
    checkName
      ? alert(`${name} ${number} is already added to phonebook`)
      : setPersons(persons.concat({ name, number }));
    setFormData({ name: "", number: "" });
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name:{" "}
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
      <h2>Numbers</h2>
      {persons &&
        persons.map((person) => <Person key={person.name} person={person} />)}
    </div>
  );
}

export default App;
