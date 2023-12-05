import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../../API/FetchWeather';
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherAsync } from "../../API/WeatherSlice";
import "./ForecastPage.css"


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

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
            <div className="mt-3 sm:mx-auto sm:w-full sm:max-w-sm">

                <div className="weather">
                    <div className="top">
                        <div>

                            <p className={"city"}>{today.name}</p>
                            <p className={"weather-detail"}>{today.weather[0].description}</p>

                        </div>
                        <img src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`} className="icon-small" alt="weather" />
                    </div>

                    <p className="temperature">{today.main.temp} °C</p>
                </div>
                <br></br>

              
            </div>
            <p className={"hourhead"}>3 Hour Forecast</p>
                <br></br>

                {weekly.list.map((forecastItem, index) => (
                    
                    <div key={index}>
                        <div className= "daily-item">
                         <img src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`} className="icon-small2" alt="weather" />
                         <label className='day'>{new Date(forecastItem.dt_txt).toLocaleDateString('th-TH', { weekday: 'long' })}

                         <label className='time'>{new Date(forecastItem.dt_txt).toLocaleTimeString('th-TH', { hour: 'numeric', minute: 'numeric' })} น.</label>
                         </label>
                         <label className='description'>{forecastItem.weather[0].description}</label>
                         <label className='min-max'>{forecastItem.main.temp} °C</label>

                        <hr />
                        </div>
                    </div>
                ))}
           

        </div>

    );
}
