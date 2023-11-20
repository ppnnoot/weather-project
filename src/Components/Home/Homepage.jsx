import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchWeatherAsync} from "../../API/WeatherSlice";

export default function Homepage(){
    const dispatch = useDispatch();
    const [position, setPosition] = useState(null)
    const { today, forecast, status, error } = useSelector((state) => state.weather);
    const lastsearch = useSelector((state)=> state.weather.lastSearch)

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
        <div>
            {/* Use today and forecast data here */}
            <p>Location: {today.name}</p>
            <p>Current Weather: {today.weather[0].description}</p>
            <p>Temperature: {today.main.temp} °C</p>

            <h2>Weekly Forecast</h2>
            {forecast.map((forecastItem, index) => (
                <div key={index}>
                    <img src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}/>
                    <p>Date: {forecastItem.dt_txt}</p>
                    <p>Description: {forecastItem.weather[0].description}</p>
                    <p>Temperature: {forecastItem.main.temp} °C</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};
