import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherAsync } from "../../API/WeatherSlice";
import { list } from '@material-tailwind/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


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


    useEffect(() => {
        try {
            if (lastsearch) {
                const pos = { lat: lastsearch.value.lat, lon: lastsearch.value.lon };
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
            <div className="m-3 h-full">
                {error && <p className="text-red-500">Error: {error}</p>}
                {weekly.list.slice(0, 1).map((forecastItem) => (
                    <div key={forecastItem.dt}>
                        <div className="grid grid-cols-4 grid-rows-3 gap-5">
                            <div className="bg-gray-800 rounded-lg shadow-xl col-span-2 row-span-2  items-center justify-center p-4">
                                <div className="h-full text-white text-center col-span-2 row-span-2">
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
                                                    {/* <p>latitude:{lati} , longtitude{longti}</p> */}
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg flex items-center justify-center p-4">
                <div className="h-40 text-white text-center" style={{ fontSize: '18px', lineHeight: '24px' }}>
                  Date and Time<br />
                  {selectedItem.dt_txt ?? forecastItem.dt_txt}
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-xl flex items-center justify-center p-4">
                <div className="h-40 text-white text-center" style={{ fontSize: '18px', lineHeight: '24px' }}>
                  Temperature <br />
                  Temp: {selectedItem.main?.temp ?? forecastItem.main.temp}°C <br />
                  Temp Min: {selectedItem.main?.temp_min ?? forecastItem.main.temp_min}°C<br />
                  Temp Max: {selectedItem.main?.temp_max ?? forecastItem.main.temp_max}°C<br />
                  Feels Like: {selectedItem.main?.feels_like ?? forecastItem.main.feels_like}°C
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-xl col-span-1 flex items-center justify-center p-4">
                <div className="h-40 text-white text-center" style={{ fontSize: '18px', lineHeight: '24px' }}>
                  Wind <br />
                  Speed: {selectedItem.wind?.speed ?? forecastItem.wind.speed}<br />
                  Deg: {selectedItem.wind?.deg ?? forecastItem.wind.deg}<br />
                  Gust: {selectedItem.wind?.gust ?? forecastItem.wind.gust}
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-xl col-span-1 flex items-center justify-center p-4">
                <div className="h-40 text-white text-center" style={{ fontSize: '18px', lineHeight: '24px' }}>
                  Atmosphere <br />
                  Pressure: {selectedItem.main?.pressure ?? forecastItem.main.pressure} <br />
                  Sea level: {selectedItem.main?.sea_level ?? forecastItem.main.sea_level}<br />
                  Humidity: {selectedItem.main?.humidity ?? forecastItem.main.humidity}
                </div>
              </div>
              <div className="bg-gray-800  rounded-lg shadow-xl col-span-4 p-4">
                <div className="h-full text-blue text-center flex space-x-3 overflow-x-hidden hover:overflow-x-scroll mb-3">
                  {weekly.list.slice(0, forecastItem.count).map((forecastItem) => (
                    <div className='w-40 h-full bg-white p-2 rounded cursor-pointer'
                    style={{transform: `scale(${hoveredItem === forecastItem.dt ? '0.95' : '1'})`,transition: 'transform 0.2s'}}
                    onMouseEnter={() => setHoveredItem(forecastItem.dt)}
                    onMouseLeave={() => setHoveredItem(null)}>
                      <div key={forecastItem.dt} className="" style={{width: '100px'}}
                        onClick={() => handleClick(forecastItem)}>
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
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}