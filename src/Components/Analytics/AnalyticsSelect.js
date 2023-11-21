import React from 'react';

const SelectableWeatherItem = ({ forecastItem, onSelect }) => {
  return (
    <div
      className='w-40 h-full bg-white p-2 rounded cursor-pointer'
      onClick={() => onSelect(forecastItem)}>
      <div key={forecastItem.dt} className="" style={{ width: '100px' }}>
        <img
          src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}
          className="icon-small shadow-md"
          alt="weather"
        />
        <p className='text-orange-300'>{new Date(forecastItem.dt_txt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
        <p>{new Date(forecastItem.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        <p>{forecastItem.main.temp} °C</p>
      </div>
    </div>
  );
};

export default SelectableWeatherItem;
