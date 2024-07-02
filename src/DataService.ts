class DataService {
  async getWeatherData(city: string): Promise<any> { 
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('Fehler bei der API-Anfrage');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default DataService; 