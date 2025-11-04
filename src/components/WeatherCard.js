import React from "react";
import "./WeatherCard.css";

function WeatherCard({ data }) {
  const { location, current } = data;
  const iconUrl = current.condition.icon.startsWith("//")
    ? "https:" + current.condition.icon
    : current.condition.icon;

  return (
    <div className="weather-card">
      <h2>{location.name}, {location.country}</h2>
      <img src={iconUrl} alt={current.condition.text} />
      <h3>{current.temp_c}°C</h3>
      <p>{current.condition.text}</p>
      <p>💧 Humidity: {current.humidity}%</p>
      <p>🌬 Wind: {current.wind_kph} km/h</p>
    </div>
  );
}

export default WeatherCard;
