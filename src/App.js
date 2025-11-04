import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (city.trim() === "") {
      setError("⚠️ Please enter a city name!");
      setWeather(null);
      return;
    }

    try {
      setError("");
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=ea05112c7d79499fa89135627242312&q=${city}&aqi=no`
      );

      if (!response.ok) {
        throw new Error("City not found!");
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="app">
      <h1 className="title">🌦️ Weather Finder</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>
          <img
            src={weather.current.condition.icon}
            alt="Weather Icon"
            className="icon"
          />
          <h3>{weather.current.condition.text}</h3>
          <p>🌡️ Temperature: {weather.current.temp_c}°C</p>
          <p>💨 Wind: {weather.current.wind_kph} km/h</p>
          <p>💧 Humidity: {weather.current.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
