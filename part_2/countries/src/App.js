import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import SerchForCountreis from "./components/SerchForCountreis";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [serchCountry, setSerchCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const res = await axios.get("https://restcountries.eu/rest/v2/all");
      setCountries(res.data);
    };
    getCountries();
  }, []);

  const handleChange = (value) => {
    const foundCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(value.toLowerCase())
    );
    foundCountries && setSerchCountries(foundCountries);
  };

  return (
    <div className="App">
      <SerchForCountreis handleChange={handleChange} />
      {serchCountry.length > 10 ? (
        <p>To many matches, specify another filter</p>
      ) : (
        serchCountry.map((country) => (
          <CountryList
            length={serchCountry.length}
            key={country.numericCode}
            country={country}
          />
        ))
      )}
    </div>
  );
}

export default App;
