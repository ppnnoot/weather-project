import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../API/FetchWeather';

export function Homepage() {
    const [todayWeather, setTodayWeather] = useState(null);
    const [weekForecast, setWeekForecast] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWeather();
                setTodayWeather(data.weather);
                setWeekForecast(data.forecast)
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        };

        fetchData();
    }, []);
    console.log(weekForecast)
    return (
        <div className={'container mx-auto'}>
            {todayWeather === null ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p>Location: {todayWeather.name}</p>
                    <p>Current Weather: {todayWeather.weather[0].description}</p>
                    <p>Temperature: {todayWeather.main.temp} °C</p>
                </div>
            )}

            {weekForecast === null ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Weekly Forecast</h2>
                    {weekForecast.list.map((forecastItem, index) => (
                        <div key={index}>
                            <p>Date: {forecastItem.dt_txt}</p>
                            <p>Description: {forecastItem.weather[0].description}</p>
                            <p>Temperature: {forecastItem.main.temp} °C</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
