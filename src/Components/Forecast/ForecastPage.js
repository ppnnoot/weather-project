import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../../API/FetchWeather';



export default function ForecastPage() {
    const [weekForecast, setWeekForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = React.useState(1);

    const handleOpen = (value) => setOpen(open === value ? 0 : value);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchWeather();
                setWeekForecast(data.forecast);
            } catch (error) {
                console.error('Error fetching weather:', error);
                setError('Failed to fetch weather data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {error && <p>Error: {error}</p>}
                    <h2 className={"font-bold text-2xl"}>Weekly Forecast</h2>
                    {weekForecast.list.map((forecastItem) => (
                        <div key={forecastItem.id}>
                            <img src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`} className="icon-small" alt="weather" />
                            <p>Date: {new Date(forecastItem.dt_txt).toLocaleDateString()}</p>
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
