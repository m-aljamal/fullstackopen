import React, { useState } from "react";
import "./App.css";
import Person from "./components/Person";
import CreateNew from "./components/CreateNew";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "04-09-255588" },
    { name: "Muhammed", number: "04-09-2777777" },
    { name: "Yassen", number: "08-09-255588" },
  ]);

  const [serchName, setSerchName] = useState([]);

  const handleSubmit = (value) => {
    const { name, number } = value;

    const checkName = persons.find(
      (person) => person.name === name || person.number === number
    );
    checkName
      ? alert(`${name} ${number} is already added to phonebook`)
      : setPersons(persons.concat({ name, number }));
  };

  const handleSerch = (e) => {
    const serchName = persons.filter((per) =>
      per.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    serchName && setSerchName(serchName);
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <div>
        Serch: <input type="text" onChange={handleSerch} />
      </div>
      <h3>Add new </h3>
      <CreateNew handleSubmit={handleSubmit} />

      <h2>Numbers</h2>

      {serchName.length > 0
        ? serchName.map((person) => (
            <Person key={person.name} person={person} />
          ))
        : persons &&
          persons.map((person) => <Person key={person.name} person={person} />)}
    </div>
  );
}

export default App;
