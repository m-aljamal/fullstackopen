import React, { useState } from "react";
import "./App.css";
import Person from "./components/Person";

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "04-09-255588" },
    { name: "Muhammed", number: "04-09-2777777" },
    { name: "Yassen", number: "08-09-255588" },
  ]);
  const [formData, setFormData] = useState({ name: "", number: "" });

  const { name, number } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [serchName, setSerchName] = useState([]);
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

  const handleSerch = (e) => {
    const serchName = persons.filter((per) =>
      per.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    serchName && setSerchName(serchName);
  };

  return (
    <div className="App">
      <h2>Phonebook</h2>
      <input type="text" onChange={handleSerch} />
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
