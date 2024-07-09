import React, { useState } from 'react';
import { getWeather, WeatherData, getForecast, ForecastData } from '../services/weatherService';

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeather(city);
      const forecastData = await getForecast(city);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getDayOfWeek = (date: Date): string => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const getBackgroundColor = (temp: number): string => {
    if (temp > 25) return '#FFB347'; // Warm orange
    if (temp < 10) return '#ADD8E6'; // Cool light blue
    return '#FFFFFF'; // Default white
  };

  return (
    <div className="weather-app comic-style">
      <div className="header">
        <h1 className="comic-title">Comic Weather</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
            className="comic-input"
          />
          <button type="submit" className="comic-button">Search</button>
        </form>
      </div>

      {loading && <p className="comic-text">Loading...</p>}
      {error && <p className="comic-text error">{error}</p>}
     
      {weather && (
        <div className="weather-info comic-panel" style={{backgroundColor: getBackgroundColor(weather.main.temp)}}>
          <h2 className="comic-text">{weather.name}</h2>
          <p className="comic-text">Temperature: {Math.round(weather.main.temp)}°C</p>
          <p className="comic-text">{weather.weather[0].description}</p>
          <p className="comic-text">Feels like: {Math.round(weather.main.feels_like)}°C</p>
          <p className="comic-text">Humidity: {weather.main.humidity}%</p>
          <p className="comic-text">Wind: {Math.round(weather.wind.speed * 3.6)} km/h</p>
          <p className="comic-text">H: {Math.round(weather.main.temp_max)}°C L: {Math.round(weather.main.temp_min)}°C</p>
        </div>
      )}

      {forecast && (
        <div className="forecast-container">
          {forecast.list.filter((_, index) => index % 8 === 0).slice(0, 5).map((day, index) => {
            const date = new Date(day.dt * 1000);
            return (
              <div key={index} className="forecast-item comic-panel" style={{backgroundColor: getBackgroundColor(day.main.temp)}}>
                <p className="comic-text">{getDayOfWeek(date)}</p>
                <img
                  src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                  alt="Weather Icon"
                  className="comic-icon"
                />
                <p className="comic-text">{Math.round(day.main.temp)}°C</p>
                <p className="comic-text">{day.weather[0].description}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;