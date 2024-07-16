import React, { useState } from "react";
import {
  getWeather,
  WeatherData,
  getForecast,
  ForecastData,
} from "../services/weatherService";
import AnimatedBackground from "./AnimatedBackground";
import ComicSpeechBubble from "./ComicSpeechBubble";

// Hauptkomponente der Wetter-App
const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Handler für die Suchfunktion
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const weatherData = await getWeather(city);
      const forecastData = await getForecast(city);
      setWeather(weatherData);
      setForecast(forecastData);
      setSelectedDay(null);
    } catch (err) {
      setError("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Funktion zur Ermittlung des Wochentages
  const getDayOfWeek = (date: Date): string => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  };

  // Funktion zur Ermittlung der Hintergrundfarbe basierend auf der Temperatur
  const getBackgroundColor = (temp: number): string => {
    if (temp > 30) return "linear-gradient(135deg, #FF6B6B, #FFD93D)"; // Heiß
    if (temp > 20) return "linear-gradient(135deg, #FFD93D, #6BCB77)"; // Warm
    if (temp > 10) return "linear-gradient(135deg, #6BCB77, #4D96FF)"; // Mild
    if (temp > 0) return "linear-gradient(135deg, #4D96FF, #93BFCF)"; // Kühl
    return "linear-gradient(135deg, #93BFCF, #DDDDDD)"; // Kalt
  };

  const renderWeatherInfo = (data: WeatherData | ForecastData['list'][0], isCurrentDay: boolean = true) => (
    <div
      className="weather-info comic-panel"
      style={{ backgroundImage: getBackgroundColor(data.main.temp) }}
    >
      <h2 className="comic-text">
        {isCurrentDay
          ? (data as WeatherData).name
          : getDayOfWeek(new Date((data as ForecastData['list'][0]).dt * 1000))}
      </h2>
      <p className="comic-text large current-temp">
        {Math.round(data.main.temp)}°C
      </p>

      <div className="weather-grid">
        <div className="weather-item">
          <p className="comic-text">Feels like</p>
          <p className="comic-text large">
            {Math.round(data.main.feels_like)}°C
          </p>
        </div>
        <div className="weather-item">
          <p className="comic-text">Weather</p>
          <p className="comic-text">{data.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
            alt="Weather Icon"
            className="comic-icon large"
          />
        </div>
        <div className="weather-item">
          <p className="comic-text">Humidity</p>
          <p className="comic-text large">{data.main.humidity}%</p>
        </div>
        <div className="weather-item">
          <p className="comic-text">Wind Speed</p>
          <p className="comic-text large">
            {Math.round(data.wind.speed * 3.6)} km/h
          </p>
        </div>
        <div className="weather-item">
          <p className="comic-text">Pressure</p>
          <p className="comic-text large">{data.main.pressure} hPa</p>
        </div>
        <div className="weather-item">
          <p className="comic-text">Visibility</p>
          <p className="comic-text large">
            {data.visibility / 1000} km
          </p>
        </div>
        <div className="weather-item">
          <p className="comic-text">Cloudiness</p>
          <p className="comic-text large">{data.clouds.all}%</p>
        </div>
        <div className="weather-item">
          <p className="comic-text">High / Low</p>
          <p className="comic-text">
            {Math.round(data.main.temp_max)}°C /{" "}
            {Math.round(data.main.temp_min)}°C
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="weather-app comic-style">
      <AnimatedBackground />
      {!weather && !loading && <ComicSpeechBubble />}
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
          <button type="submit" className="comic-button">
            Search
          </button>
        </form>
      </div>

      {loading && <p className="comic-text">Loading...</p>}
      {error && <p className="comic-text error">{error}</p>}

    {weather && selectedDay === null && renderWeatherInfo(weather)}
    
      {forecast && selectedDay !== null && renderWeatherInfo(forecast.list[selectedDay * 8], false)}

      {forecast && (
        <div className="forecast-container">
          {forecast.list
            .filter((_, index) => index % 8 === 0)
            .map((day, index) => {
              const date = new Date(day.dt * 1000);
              return (
                <div
                  key={index}
                  className="forecast-item comic-panel"
                  style={{ backgroundImage: getBackgroundColor(day.main.temp) }}
                >
                  <p className="comic-text">{getDayOfWeek(date)}</p>
                  <img
                    src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="comic-icon"
                  />
                  <p className="comic-text">{Math.round(day.main.temp)}°C</p>
                  <p className="comic-text">{day.weather[0].description}</p>
                  <button
                    className="comic-button"
                    onClick={() => setSelectedDay(index)}
                  >
                    More Info
                  </button>
                </div>
              );
            })}
        </div>
      )}

      {selectedDay !== null && (
        <button className="comic-button" onClick={() => setSelectedDay(null)}>
          Back to Current Day
        </button>
      )}
    </div>
  );
};

export default WeatherApp;