import React, { useState, useEffect } from "react";
import axios from "axios";
const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
      );
      setWeather(res.data.current);
    };
    getData();
  }, []);

  return (
    <div>
      <h3>Weather in {capital}</h3>
      {weather.weather_icons ? (
        <>
          <p>temperture: {weather.temperature} Celcius</p>
          <img
            src={weather.weather_icons[0]}
            alt={weather.weather_descriptions}
          />
          <p>
            wind: {weather.wind_speed} mph direction {weather.wind_dir}
          </p>
        </>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

export default Weather;
