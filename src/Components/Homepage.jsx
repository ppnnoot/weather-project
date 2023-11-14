import {useEffect} from "react";
import {fetchWeather} from "../API/FetchWeather";
import React, { useState } from 'react';

export function Homepage() {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWeather();
                setWeatherData(data);
            } catch (error) {
                console.error('Error fetching weather:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className={'container mx-auto'}>
            {weatherData === null ?(
                <p>Loading ...</p>
            ): (
                <div>
                    <p>Location: {weatherData.name}</p>
                    <p>สภาพอากาศ: {weatherData.weather[0].description}</p>
                    <p>อุณหภูมิ: {weatherData.main.temp} °C</p>
                </div>
            )}
        </div>
    ); 
  }