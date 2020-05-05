import React, { useState } from "react";
import Country from "./Country";

const CountryList = ({ country, length }) => {
  const [show, setShow] = useState(false);
  return (
    <div>
      {length === 1 ? (
        <Country country={country} />
      ) : (
        <div>
          <span>{country.name}</span>
          <button onClick={() => setShow(!show)} style={{ marginLeft: "10px" }}>
            show
          </button>
        </div>
      )}
      {show && <Country country={country} />}
    </div>
  );
};

export default CountryList;
