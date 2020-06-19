import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `https://restcountries.eu/rest/v2/name/${name}`
        );

        setCountry(res.data);
      } catch (error) {
        console.log(error.response.data);
        setCountry(error.response.data);
      }
    };
    getData();
  }, [name]);

  return country;
};

const Country = ({ country }) => {
  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div>
      <img src={country.flag} height="100" alt={`flag of ${country.name}`} />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
  };
  const countryFound = () => {
    if (country && country.status !== 404) {
      return country.map((c) => <Country country={c} />);
    } else if (country && country.status === 404) {
      return <p>Not fount</p>;
    } else {
      return <p>Enter value</p>;
    }
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      {countryFound()}
    </div>
  );
};

export default App;
