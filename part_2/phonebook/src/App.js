import React, { useState, useEffect } from "react";
import "./App.css";
import Person from "./components/Person";
import CreateNew from "./components/CreateNew";
import backend from "./components/backend";

function App() {
  const [persons, setPersons] = useState([]);

  const [serchName, setSerchName] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const res = await backend.getAll();
      setPersons(res);
    };
    getData();
  }, []);

  const handleSubmit = async (value) => {
    const { name, number } = value;

    const checkName = persons.find((person) => person.name === name);

    if (checkName) {
      const confirm = window.confirm(
        `${name} is already added to phonebook, replace the old number with new one? `
      );
      if (confirm) {
        try {
          const res = await backend.update(checkName.id, { name, number });
          setPersons(
            persons.map((person) => (person.id !== checkName.id ? person : res))
          );
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      try {
        const res = await backend.create({ name, number });
        setPersons(persons.concat(res));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleSerch = (e) => {
    const serchName = persons.filter((per) =>
      per.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    serchName && setSerchName(serchName);
  };

  const deleteContact = (id, name) => {
    const confirm = window.confirm(`delete ${name} ?`);
    if (confirm) {
      backend
        .remove(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
        ? serchName.map((person) => <Person key={person.id} person={person} />)
        : persons &&
          persons.map((person) => (
            <Person
              key={person.id}
              person={person}
              deleteContact={deleteContact}
            />
          ))}
    </div>
  );
}

export default App;
