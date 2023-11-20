import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchWeatherAsync} from "../../API/WeatherSlice";
import { list } from '@material-tailwind/react';

export default function AnalyticsPage() {
    const dispatch = useDispatch();
    const [position, setPosition] = useState(null)
    const { today, forecast,weekly, status, error } = useSelector((state) => state.weather);
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
        <>
           
                <div className="m-3 h-full">
                    {error && <p>Error: {error}</p>}
                    {weekly.list.slice(0,1).map((forecastItem) => (
                        <div key={forecastItem.dt}>
                            
                            <div class="grid grid-cols-4 grid-rows-3 gap-x-5 gap-y-5">
                                <div class="bg-black rounded-lg shadow-xl col-span-2 row-span-2">
                                    <div className="h-40 max-h-full text-white text-center row-span-2">
                                    </div>
                                </div>
                                <div class="bg-black rounded-lg shadow-xl">
                                    <div class="h-40 text-white text-center">Temp at {forecastItem.dt_txt} <br></br> {forecastItem.main.temp}°C </div >
                                </div>
                                <div class="bg-black rounded-lg shadow-xl">
                                    <div class="h-40 text-white text-center">Temp Min/Max <br></br> {forecastItem.main.temp_min}°C/{forecastItem.main.temp_max}°C</div>
                                </div>
                                <div class="bg-black rounded-lg shadow-xl col-span-2">
                                    <div class="h-40 text-white text-center">Sea level: {forecastItem.main.sea_level}</div>
                                </div>
                                {/* <div class="bg-black rounded-lg shadow-xl col-span-2">
                                    <div class="h-20 text-white text-center">Air Pollution</div>
                                </div>
                                <div class="bg-black rounded-lg shadow-xl col-span-2">
                                    <div class="h-40 text-white text-center">Pressure: {forecastItem.main.pressure}</div>
                                </div> */}
                                <div class="bg-black rounded-lg shadow-xl col-span-4 ">

                                    <div class="h-20 text-blue text-center flex flex-onwrap">{weekly.list.slice(0,(forecastItem.count)).map((forecastItem) => (
                                        <div key={forecastItem.dt}>
                                            <div class="h-full m-2 bg-white">
                                                {forecastItem.main.temp}
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
