import React, { useState } from "react";
import {
  getWeather,
  WeatherData,
  getForecast,
  ForecastData,
} from "../services/weatherService";
import AnimatedBackground from "./AnimatedBackground";
import ComicSpeechBubble from "./ComicSpeechBubble";

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

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

  const getBackgroundColor = (temp: number): string => {
    if (temp > 30) return "linear-gradient(135deg, #FF6B6B, #FFD93D)"; // Hot
    if (temp > 20) return "linear-gradient(135deg, #FFD93D, #6BCB77)"; // Warm
    if (temp > 10) return "linear-gradient(135deg, #6BCB77, #4D96FF)"; // Mild
    if (temp > 0) return "linear-gradient(135deg, #4D96FF, #93BFCF)"; // Cool
    return "linear-gradient(135deg, #93BFCF, #DDDDDD)"; // Cold
  };

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

      {weather && (
        <div
          className="weather-info comic-panel"
          style={{ backgroundImage: getBackgroundColor(weather.main.temp) }}
        >
          <h2 className="comic-text">{weather.name}</h2>
          <p className="comic-text large current-temp">
            {Math.round(weather.main.temp)}°C
          </p>

          <div className="hourly-forecast-container">
            <div className="hourly-forecast">
              {forecast &&
                forecast.list.slice(0, 24).map((item, index) => (
                  <div key={index} className="hourly-item">
                    <p className="comic-text">
                      {new Date(item.dt * 1000).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <img
                      src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                      alt="Weather Icon"
                      className="comic-icon"
                    />
                    <p className="comic-text">{Math.round(item.main.temp)}°C</p>
                  </div>
                ))}
            </div>
          </div>

          <div className="weather-grid">
            <div className="weather-item">
              <p className="comic-text">Feels like</p>
              <p className="comic-text large">
                {Math.round(weather.main.feels_like)}°C
              </p>
            </div>
            <div className="weather-item">
              <p className="comic-text">Weather</p>
              <p className="comic-text">{weather.weather[0].description}</p>
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
                className="comic-icon large"
              />
            </div>
            <div className="weather-item">
              <p className="comic-text">Humidity</p>
              <p className="comic-text large">{weather.main.humidity}%</p>
            </div>
            <div className="weather-item">
              <p className="comic-text">Wind Speed</p>
              <p className="comic-text large">
                {Math.round(weather.wind.speed * 3.6)} km/h
              </p>
            </div>
            <div className="weather-item">
              <p className="comic-text">Pressure</p>
              <p className="comic-text large">{weather.main.pressure} hPa</p>
            </div>
            <div className="weather-item">
              <p className="comic-text">Visibility</p>
              <p className="comic-text large">{weather.visibility / 1000} km</p>
            </div>
            <div className="weather-item">
              <p className="comic-text">Cloudiness</p>
              <p className="comic-text large">{weather.clouds.all}%</p>
            </div>
            <div className="weather-item">
              <p className="comic-text">High / Low</p>
              <p className="comic-text">
                {Math.round(weather.main.temp_max)}°C /{" "}
                {Math.round(weather.main.temp_min)}°C
              </p>
            </div>
          </div>
        </div>
      )}

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

      {selectedDay !== null && forecast && (
        <div
          className="day-details comic-panel"
          style={{
            backgroundImage: getBackgroundColor(
              forecast.list[selectedDay * 8].main.temp
            ),
          }}
        >
          <h3 className="comic-text">
            {getDayOfWeek(new Date(forecast.list[selectedDay * 8].dt * 1000))}
          </h3>
          <div className="weather-grid">
            {forecast.list
              .slice(selectedDay * 8, (selectedDay + 1) * 8)
              .map((item, index) => (
                <div key={index} className="weather-item">
                  <p className="comic-text">
                    {new Date(item.dt * 1000).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                    alt="Weather Icon"
                    className="comic-icon"
                  />
                  <p className="comic-text">{Math.round(item.main.temp)}°C</p>
                  <p className="comic-text">{item.weather[0].description}</p>
                </div>
              ))}
          </div>
          <button className="comic-button" onClick={() => setSelectedDay(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;