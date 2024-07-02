import React, { useState } from 'react';
import { getWeather, WeatherData } from '../services/weatherService';

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (err) {
      setError('Fehler beim Abrufen der Wetterdaten. Bitte versuchen Sie es erneut.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Wetter App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Stadt eingeben"
        />
        <button type="submit">Suchen</button>
      </form>

      {loading && <p>Laden...</p>}
      {error && <p className="error">{error}</p>}
      
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperatur: {weather.main.temp}°C</p>
          <p>Luftfeuchtigkeit: {weather.main.humidity}%</p>
          <p>Beschreibung: {weather.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
            alt="Wetter Icon"
          />
        </div>
      )}
    </div>
  );
};

export default WeatherApp;