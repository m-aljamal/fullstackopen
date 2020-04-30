import React, { useState } from "react";
import "./App.css";
import Person from "./components/Person";

function App() {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkName = persons.find((person) => person.name === newName);
    checkName
      ? alert(`${newName} is already added to phonebook`)
      : setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" value={newName} onChange={handleChange} />
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
