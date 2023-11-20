import React, { useEffect, useState } from 'react';
import { fetchWeather } from '../../API/FetchWeather';

export default function AnalyticsPage() {
    const [weekForecast, setWeekForecast] = useState({});
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
        <div className="flex min-h-full flex-1 flex-col justify-center lg:px-8">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="m-3">
                    {error && <p>Error: {error}</p>}
                    {weekForecast.list.slice(0, 1).map((forecastItem) => (
                        <div key={forecastItem.dt}>
                            <div class="grid grid-cols-4 grid-rows-4 gap-x-5 gap-y-5">
                                <li class="bg-black rounded-lg shadow-xl col-span-2 row-span-2">
                                    <div className="h-40 max-h-full text-white text-center row-span-2">
                                    </div>
                                </li>
                                <li class="bg-black rounded-lg shadow-xl">
                                    <div class="h-40 text-white text-center">Wind Speed: {forecastItem.wind.speed}</div >
                                </li>
                                <li class="bg-black rounded-lg shadow-xl">
                                    <div class="h-40 text-white text-center">Humidity: {forecastItem.main.humidity}</div>
                                </li>
                                <li class="bg-black rounded-lg shadow-xl col-span-2">
                                    <div class="h-40 text-white text-center">Sea level: {forecastItem.main.sea_level}</div>
                                </li>
                                <li class="bg-black rounded-lg shadow-xl col-span-2 row-span-2">
                                    <div class="h-20 text-white text-center">Air Pollution</div>
                                </li>
                                <li class="bg-black rounded-lg shadow-xl col-span-2">
                                    <div class="h-40 text-white text-center">Pressure: {forecastItem.main.pressure}</div>
                                </li>
                            </div>      
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
