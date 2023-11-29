import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherAsync } from "../../API/WeatherSlice";
import { list } from '@material-tailwind/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "./AnalyStlye.css"

export default function AnalyticsPage() {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const { today, forecast, weekly, status, error } = useSelector((state) => state.weather);
  const lastsearch = useSelector((state) => state.weather.lastSearch)

  const handleClick = (forecastItem) => {
    setSelectedItem(forecastItem);
    console.log('Clicked on forecast item:', selectedItem);
  };

  const customMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/9356/9356230.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const lati = 13.736717
  const longti = 100.523186
  const current_Position = [lati, longti];

  const getWindDirection = (degrees) => {
    if (degrees >= 337.5 || degrees < 22.5) {
      return 'N';
    } else if (degrees >= 22.5 && degrees < 67.5) {
      return 'NE';
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return 'E';
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return 'SE';
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return 'S';
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return 'SW';
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return 'W';
    } else if (degrees >= 292.5 && degrees < 337.5) {
      return 'NW';
    }
  };

  useEffect(() => {
    try {
      if (lastsearch) {
        const pos = { lat: lastsearch.value.lat, lon: lastsearch.value.lon };
        setSelectedItem({});
        dispatch(fetchWeatherAsync(pos));
      } else {
        const positionProm = new Promise((posResolve, posReject) => {
          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
              (position) => posResolve(position.coords),
              (err) => posReject(new Error(err.message))
            );
          } else {
            posReject(new Error('Geolocation not supported'));
          }
        });

        positionProm.then(({ latitude, longitude }) => {
          const pos = { lat: latitude, lon: longitude };
          dispatch(fetchWeatherAsync(pos));
        })
      }
    } catch (err) {
      console.error('Error fetching weather data:', err);
    }

  }, [dispatch, lastsearch]);
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!today || !forecast) {
    return <p>Loading....</p>;
  }

  return (
    <>
      {error && <p className="text-red-500">Error: {error}</p>}
      {weekly.list.slice(0, 1).map((forecastItem) => (
        <div className='container'>
          <div className='top'>
            <div className='left'>
              <div className='map-generate'>
                <MapContainer
                  center={lastsearch ? [lastsearch.value.lat, lastsearch.value.lon] : current_Position}
                  zoom={13}
                  className="h-full w-full">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={lastsearch ? [lastsearch.value.lat, lastsearch.value.lon] : current_Position} icon={customMarkerIcon}>
                    <Popup>
                      <div >
                        <h2 clas="text-center">You were at</h2>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
            <div className='right'>
              <div className='right-container'>
                <div className='card'>
                  <p className='text-title'>Date and Time</p>
                  <p className='text-body'>{new Date(selectedItem.dt_txt ?? forecastItem.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</p>
                  <p className='text-body'>{new Date(selectedItem.dt_txt ?? forecastItem.dt_txt).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p>
                </div>
                <div className='card'>
                  <p className='text-title'>Temperature</p>
                  <p className='text-body'>Temp: {selectedItem.main?.temp ?? forecastItem.main.temp}°C</p>
                  <p className='text-body'>Temp Min: {selectedItem.main?.temp_min ?? forecastItem.main.temp_min}°C</p>
                  <p className='text-body'>Temp Max: {selectedItem.main?.temp_max ?? forecastItem.main.temp_max}°C</p>
                  <p className='text-body'>Feels Like: {selectedItem.main?.feels_like ?? forecastItem.main.feels_like}°C</p>
                </div>
              </div>
              <div className='right-container'>
                <div className='card'>
                  <p className='text-title'>Wind</p>
                  <p className='text-body'>Speed: {selectedItem.wind?.speed ?? forecastItem.wind.speed}</p>
                  <p className='text-body'>Direction: {getWindDirection(selectedItem.wind?.deg ?? forecastItem.wind.deg)}</p>
                  <p className='text-body'>Gust: {selectedItem.wind?.gust ?? forecastItem.wind.gust}</p>
                </div>
                <div className='card'>
                  <p className='text-title'> Atmosphere</p>
                  <p className='text-body'>Pressure: {selectedItem.main?.pressure ?? forecastItem.main.pressure}</p>
                  <p className='text-body'>Sea level: {selectedItem.main?.sea_level ?? forecastItem.main.sea_level}</p>
                  <p className='text-body'> Humidity: {selectedItem.main?.humidity ?? forecastItem.main.humidity}</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bottom'>
            <div className="h-full text-blue text-center flex space-x-3 overflow-x-hidden hover:overflow-x-scroll mb-3">
              {weekly.list.slice(0, forecastItem.count).map((forecastItem) => (
                <div className='w-40 h-full bg-white p-2 rounded cursor-pointer'
                  style={{ transform: `scale(${hoveredItem === forecastItem.dt ? '0.95' : '1'})`, transition: 'transform 0.2s' }}
                  onMouseEnter={() => setHoveredItem(forecastItem.dt)}
                  onMouseLeave={() => setHoveredItem(null)}>
                  <div key={forecastItem.dt} className="" style={{ width: '100px' }}
                    onClick={() => handleClick(forecastItem)}>
                    <img
                      src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}
                      alt="weather"
                    />
                    <p className='text-orange-300'>{new Date(forecastItem.dt_txt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</p>
                    <p>{new Date(forecastItem.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    <p>{forecastItem.main.temp} °C</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}