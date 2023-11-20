import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../../API/FetchWeather';
import {useDispatch, useSelector} from "react-redux";
import {fetchWeatherAsync} from "../../API/WeatherSlice";



export default function ForecastPage() {
    const dispatch = useDispatch()
    const lastsearch = useSelector((state)=> state.weather.lastSearch)
    const {today, weekly, status, error } = useSelector((state) => state.weather);

    useEffect(() => {
        try {
            //console.log("lastsearch",lastsearch)
            if (lastsearch) {
                //console.log("dispatch(fetchWeatherAsync(searchData.lat, searchData.lon)")
                const pos = { lat: lastsearch.value.lat, lon: lastsearch.value.lon };
                dispatch(fetchWeatherAsync(pos));
            }else {
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
                    //console.log(latitude, longitude);
                    const pos = { lat: latitude, lon: longitude };
                    dispatch(fetchWeatherAsync(pos));
                })
            }
        }catch (err) {
            console.error('Error fetching weather data:', err);
        }

    }, [dispatch,lastsearch]);
    //console.log(weekly)
    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!weekly || !today) {
        return <p>Loading....</p>;
    }
    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className={"font-bold text-2xl"}>Weekly Forecast</h2>
                    <p>Location: {today.name}</p>
                    <p>Current Weather: {today.weather[0].description}</p>
                    <p>Temperature: {today.main.temp} °C</p>
                    {weekly.list.map((forecastItem, index) => (
                        <div key={index}>
                            <img src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`} className="icon-small" alt="weather" />
                            <p>Date: {new Date(forecastItem.dt_txt).toLocaleDateString()}</p>
                            <p>Description: {forecastItem.weather[0].description}</p>
                            <p>Temperature: {forecastItem.main.temp} °C</p>
                            <hr />
                        </div>
                    ))}
                </div>

        </div>

    );
}
