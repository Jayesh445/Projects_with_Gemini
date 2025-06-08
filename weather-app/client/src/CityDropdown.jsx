import React from 'react';

const CityDropdown = ({ onCityChange }) => {
  const cities = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Kolkata',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Surat',
    'Lucknow'
  ];

  const handleChange = (event) => {
    onCityChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="city">Select a city:</label>
      <select id="city" onChange={handleChange}>
        <option value="">--Select City--</option>
        {cities.map((city) => (
          <option key={city} value={city}>{city}</option>
        ))}
      </select>
    </div>
  );
};

export default CityDropdown;