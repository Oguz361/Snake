import { useEffect, useState } from 'react';
import './App.css';
import DataService from './DataService';

function App() {
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [city, setCity] = useState('Berlin');
  const [searchQuery, setSearchQuery] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataService = new DataService();
        const data = await dataService.getWeatherData(city);
        setWeatherData(data);
      } catch (error) {
        console.error(error);
        setWeatherData(null);
      }
    };

    if (city) { 
      fetchData();
    }
  }, [city]); 

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value); 
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCity(searchQuery); 
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Stadt eingeben..." />
        <button type="submit">Suchen</button>
      </form>

      {weatherData ? (
        <div>
          <h1>Wetter in {weatherData.name}</h1>
          <p>Temperatur: {weatherData.main.temp} °C</p>
          <p>Beschreibung: {weatherData.weather[0].description}</p>
        </div>
      ) : (
        <p>{city ? 'Wetterdaten werden geladen...' : 'Bitte geben Sie eine Stadt ein'}</p> 
      )}
    </div>
  );
}

export default App;
