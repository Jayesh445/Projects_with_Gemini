import { useState, useEffect } from 'react';
import CityDropdown from './CityDropdown';
import WeatherDisplay from './WeatherDisplay';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (city) {
        try {
          const response = await fetch(`http://localhost:3001/api/weather/${city}`);
          const data = await response.json();
          setWeatherData(data);
        } catch (error) {
          console.error('Error fetching weather data:', error);
          setWeatherData(null);
        }
      }
    };

    fetchWeatherData();
  }, [city]);

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <CityDropdown onCityChange={handleCityChange} />
      <WeatherDisplay weatherData={weatherData} />
    </div>
  );
};

export default App;