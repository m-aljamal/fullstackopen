import React from "react";
import Weather from "./Weather";

const Country = ({
  country: { name, capital, population, languages, flag },
}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital {capital}</p>
      <p>Population {population}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((lang, index) => (
          <li key={index}>{lang.name}</li>
        ))}
      </ul>
      <img src={flag} alt={name} style={{ width: "280px" }} />
      <Weather capital={capital} />
    </div>
  );
};

export default Country;
