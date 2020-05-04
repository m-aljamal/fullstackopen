import React, { useState, useEffect } from "react";
import "./App.css";
import Person from "./components/Person";
import CreateNew from "./components/CreateNew";
import axios from "axios";

function App() {
  const [persons, setPersons] = useState([]);

  const [serchName, setSerchName] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("http://localhost:3001/persons");
      setPersons(res.data);
    };
    getData();
  }, []);

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
