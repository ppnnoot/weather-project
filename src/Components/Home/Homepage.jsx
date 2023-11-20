import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchWeatherAsync} from "../../API/WeatherSlice";

export const Homepage = (searchData) => {
    const dispatch = useDispatch();
    //const todayWeather = useSelector((state) => state.weather.today);
    //const weekForecast = useSelector((state) => state.forecast);
    const { today, forecast, status, error } = useSelector((state) => state.weather);
    //const [today, forecast] = fetchWeather(13.708,100.5831)
    //console.log(today)

    useEffect(() => {
            try {
                if (searchData.lat !== undefined && searchData.lon !== undefined) {
                    //dispatch(fetchWeatherAsync(searchData.lat, searchData.lon));
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
                        console.log(latitude, longitude);
                        let location = {latitude,longitude}
                        dispatch(fetchWeatherAsync(location));
                    })
                }
            }catch (err) {
                    console.error('Error fetching weather data:', err);
                }

    }, [dispatch,searchData]);
    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!today || !forecast) {
        return <p>No weather data available.</p>;
    }
    //console.log({"วันนี้": todayWeather})

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
