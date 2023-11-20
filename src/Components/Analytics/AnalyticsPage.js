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
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {error && <p>Error: {error}</p>}
                    {weekForecast.list.map((forecastItem) => (
                        <div key={forecastItem.id === 1}>
                            <div>
                                <h1 className="text-2xl font-bold mt-8 ">Welcome To Analytics</h1>
                            </div>
                            <div class="grid grid-cols-4 grid-rows-4 gap-x-5 gap-y-5">
                                <li class="bg-black rounded-lg shadow-xl col-span-2 row-span-2"><div class="h-40 text-white text-center">MAP</div></li>
                                <li class="bg-black rounded-lg shadow-xl"><div class="h-40 text-white text-center">Wind Speed :{forecastItem.wind.speed}</div ></li>
                                <li class="bg-black rounded-lg shadow-xl"><div class="h-40 text-white text-center">Humid</div></li>
                                <li class="bg-black rounded-lg shadow-xl col-span-2"><div class="h-40 text-white text-center">Sea level </div></li>
                                <li class="bg-black rounded-lg shadow-xl col-span-2 row-span-2"><div class="h-20 text-white text-center">Air Pollution</div></li>
                                <li class="bg-black rounded-lg shadow-xl col-span-2"><div class="h-40 text-white text-center">Presure</div></li>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            )}

        </div>


    );
}
