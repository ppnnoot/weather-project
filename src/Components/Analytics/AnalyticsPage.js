import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeatherAsync } from "../../API/WeatherSlice";
import { list } from '@material-tailwind/react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';


export default function AnalyticsPage() {
    const dispatch = useDispatch();
    const [position, setPosition] = useState(null)
    const { today, forecast, weekly, status, error } = useSelector((state) => state.weather);
    const lastsearch = useSelector((state) => state.weather.lastSearch)

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
                            <div className="bg-gray-800 rounded-lg shadow-xl col-span-2 row-span-2 flex items-center justify-center p-4">
                                <div className="h-40 text-white text-center col-span-2 row-span-2">
                                    <MapContainer
                                        center={current_Position}
                                        zoom={13}
                                        style={{ height: '220%', width: '100%' }}

                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={current_Position} icon={customMarkerIcon}>
                                            <Popup>
                                                <div >
                                                    <h2 clas="text-center">You were at</h2>
                                                    <p>latitude:{lati} , longtitude{longti}</p>
                                                </div>
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg shadow-xl flex items-center justify-center p-4">
                                <div className="h-40 text-white text-center">
                                    Date <br />
                                    {forecastItem.dt_txt}
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg shadow-xl flex items-center justify-center p-4">
                                <div className="h-40 text-white text-center">
                                    Temp: {forecastItem.main.temp}°C <br />
                                    Temp Min/Max: <br />
                                    {forecastItem.main.temp_min}°C/{forecastItem.main.temp_max}°C
                                    <br />
                                    Feels Like: {forecastItem.main.feels_like}°C
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg shadow-xl col-span-1 flex items-center justify-center p-4">
                                <div className="h-40 text-white text-center">
                                    Wind <br />
                                    Speed: {forecastItem.wind.speed}<br />
                                    Deg: {forecastItem.wind.deg}<br />
                                    Gust: {forecastItem.wind.gust}
                                </div>
                            </div>
                            <div className="bg-gray-800 rounded-lg shadow-xl col-span-1 flex items-center justify-center p-4">
                                <div className="h-40 text-white text-center">
                                    Pressure: {forecastItem.main.pressure} <br />
                                    Sea level: {forecastItem.main.sea_level}<br />
                                    Humidity: {forecastItem.main.humidity}
                                </div>
                            </div>
                            <div className="bg-gray-800  rounded-lg shadow-xl col-span-4 p-4">
                                <div className="h-full text-blue text-center flex space-x-3 overflow-hidden hover:overflow-x-scroll mb-3">
                                    {weekly.list
                                        .slice(0, forecastItem.count)
                                        .map((forecastItem) => (
                                            <div className='w-40 h-full bg-white p-2 rounded'>
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
