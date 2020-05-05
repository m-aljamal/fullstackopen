import React from "react";

const CountryList = ({
  country: { name, capital, population, languages, flag },
  length,
}) => {
  return (
    <div>
      {length === 1 ? (
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
        </div>
      ) : (
        <p>{name}</p>
      )}
    </div>
  );
};

export default CountryList;
