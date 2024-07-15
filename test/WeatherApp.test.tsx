/** @jsxImportSource react */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeatherApp from '../src/components/WeatherApp';
import * as weatherService from '../src/services/weatherService';

jest.mock('../src/services/weatherService', () => ({
  getWeather: jest.fn(),
  getForecast: jest.fn(),
}));

beforeAll(() => {

  (globalThis as any).importMeta = {
    env: {
      VITE_WEATHER_API_KEY: 'test_api_key'
    }
  };
});

const mockWeatherData: weatherService.WeatherData = {
  main: {
    temp: 15,
    humidity: 50,
    temp_max: 20,
    temp_min: 10,
    feels_like: 14,
    pressure: 1012,
  },
  weather: [{
    description: 'clear sky',
    icon: '01d'
  }],
  wind: {
    speed: 5,
  },
  name: 'Berlin',
  visibility: 10000,
  clouds: {
    all: 0,
  },
};

const mockForecastData: weatherService.ForecastData = {
  list: Array(40).fill({
    dt: 1605182400,
    main: {
      temp: 15,
    },
    weather: [{
      description: 'clear sky',
      icon: '01d'
    }],
  }).map((item, index) => ({
    ...item,
    dt: 1605182400 + index * 3 * 3600, // 3 Stunden Intervall
  })),
};

describe('WeatherApp', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    render(<WeatherApp />);
    expect(screen.getByPlaceholderText(/Enter city/i)).toBeInTheDocument();
  });

  it('should fetch and display weather data for a city', async () => {
    (weatherService.getWeather as jest.Mock).mockResolvedValue(mockWeatherData);
    (weatherService.getForecast as jest.Mock).mockResolvedValue(mockForecastData);

    render(<WeatherApp />);

    fireEvent.change(screen.getByPlaceholderText(/Enter city/i), { target: { value: 'Berlin' } });
    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() => {
      expect(weatherService.getWeather).toHaveBeenCalledWith('Berlin');
      expect(weatherService.getForecast).toHaveBeenCalledWith('Berlin');
    });

    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    const tempElements = screen.getAllByText(/15°C/i);
    expect(tempElements[0]).toBeInTheDocument();
    const clearSkyElements = screen.getAllByText(/clear sky/i);
    expect(clearSkyElements[0]).toBeInTheDocument();
  });

  it('should display an error message if fetching weather data fails', async () => {
    (weatherService.getWeather as jest.Mock).mockRejectedValue(new Error('Error fetching weather data'));
    (weatherService.getForecast as jest.Mock).mockRejectedValue(new Error('Error fetching forecast data'));

    render(<WeatherApp />);

    fireEvent.change(screen.getByPlaceholderText(/Enter city/i), { target: { value: 'Berlin' } });
    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() => {
      expect(screen.getByText(/Error fetching weather data. Please try again./i)).toBeInTheDocument();
    });
  });

  it('should render the hourly forecast', async () => {
    (weatherService.getWeather as jest.Mock).mockResolvedValue(mockWeatherData);
    (weatherService.getForecast as jest.Mock).mockResolvedValue(mockForecastData);

    render(<WeatherApp />);

    fireEvent.change(screen.getByPlaceholderText(/Enter city/i), { target: { value: 'Berlin' } });
    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() => {
      expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
    });

    const hourlyItems = screen.getAllByText(/15°C/i);
    expect(hourlyItems.length).toBeGreaterThan(1);
  });

  it('should display an error message if the city is not found', async () => {
    (weatherService.getWeather as jest.Mock).mockRejectedValue(new Error('City not found'));
    (weatherService.getForecast as jest.Mock).mockRejectedValue(new Error('City not found'));

    render(<WeatherApp />);

    fireEvent.change(screen.getByPlaceholderText(/Enter city/i), { target: { value: 'UnknownCity' } });
    fireEvent.click(screen.getByText(/Search/i));

    await waitFor(() => {
      expect(screen.getByText(/Error fetching weather data. Please try again./i)).toBeInTheDocument();
    });
  });

  it('should render initial state correctly', () => {
    render(<WeatherApp />);
    expect(screen.getByPlaceholderText(/Enter city/i)).toBeInTheDocument();
    expect(screen.queryByText(/Berlin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/15°C/i)).not.toBeInTheDocument();
  });


  it('should display loading indicator while fetching data', async () => {
    (weatherService.getWeather as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockWeatherData), 100)));
    (weatherService.getForecast as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockForecastData), 100)));

    render(<WeatherApp />);

    fireEvent.change(screen.getByPlaceholderText(/Enter city/i), { target: { value: 'Berlin' } });
    fireEvent.click(screen.getByText(/Search/i));

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
    });

    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
  });

});