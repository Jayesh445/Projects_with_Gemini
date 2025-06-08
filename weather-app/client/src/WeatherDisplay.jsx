import React from 'react';

const WeatherDisplay = ({ weatherData }) => {
  if (!weatherData) {
    return <div>Select a city to see the weather.</div>;
  }

  const { name, main, weather } = weatherData;

  // Function to determine weather icon based on weather condition
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Thunderstorm':
        return 'https://openweathermap.org/img/wn/11d@2x.png';
      case 'Drizzle':
        return 'https://openweathermap.org/img/wn/09d@2x.png';
      case 'Rain':
        return 'https://openweathermap.org/img/wn/10d@2x.png';
      case 'Snow':
        return 'https://openweathermap.org/img/wn/13d@2x.png';
      case 'Clear':
        return 'https://openweathermap.org/img/wn/01d@2x.png';
      case 'Clouds':
        return 'https://openweathermap.org/img/wn/03d@2x.png';
      default:
        return 'https://openweathermap.org/img/wn/01d@2x.png'; // Default to clear
    }
  };

  const iconUrl = getWeatherIcon(weather[0].main);

  return (
    <div>
      <h2>Weather in {name}</h2>
      <img src={iconUrl} alt="Weather Icon" />
      <p>Temperature: {main.temp}°C</p>
      <p>Description: {weather[0].description}</p>
    </div>
  );
};

export default WeatherDisplay;