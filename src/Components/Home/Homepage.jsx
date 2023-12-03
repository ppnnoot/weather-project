import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {fetchWeatherAsync} from "../../API/WeatherSlice";
import "./Homepage.css"
import { ChevronRightIcon } from '@heroicons/react/24/solid'

export default function Homepage(){
    const dispatch = useDispatch();
    const [position, setPosition] = useState(null)
    const { today, forecast, status, error } = useSelector((state) => state.weather);
    const lastsearch = useSelector((state)=> state.weather.lastSearch)
    const [date, setDate] = useState(" ")
    
    const updateAndChangeBackgroundColor = () => {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var sec = currentDate.getSeconds();
        var formationDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + sec;

        setDate(formationDate);
    
        const containerTop = document.querySelector('.container-top');
        if (containerTop && containerTop.style) {
            if (hours >= 6 && hours < 16) {
                containerTop.style.backgroundColor = '#FFDB91';
            } else if (hours >= 16 && hours < 18) {
                containerTop.style.backgroundColor = '#FFDB91';
            } else {
                containerTop.style.backgroundColor = '#16171F';
                containerTop.style.color = 'white';
            }
        }
    };
    
    useEffect(() => {
        updateAndChangeBackgroundColor();
        const intervalId = setInterval(updateAndChangeBackgroundColor, 1000);
        return () => clearInterval(intervalId);
    }, []); 
    
    

    
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
        <div class="container-weather">
            {/* Use today and forecast data here */}
            <div class = "container-top">
                <div class = "left-top">
                    <p>สภาพอากาศปัจจุบัน {date}</p>
                    <br/>
                    <div class = "pic-top">
                        <img class="weather-icon" src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}/>
                        <p class = "font-temp"> {today.main.temp} °C</p> 
                    </div>
                        
                </div>
                
                <div class = "right-top">  
                    <div>
                        <p class = "font-weater">สภาพอากาศ</p>
                            
                        <p class = "font-CurrentWeather">{today.weather[0].description}</p>
                    </div>
                    <div>
                    <a href='/analytics' class="font-details">
                        ลายละเอียดเพิ่มเติม <ChevronRightIcon class = "icon-right"/>
                    </a>
                    </div>
                </div>
            
            </div>
            <div class = "container-botton">
                {forecast.map((forecastItem, index) => (
                    <div key={index} class = "frame-time">
                        <div class = "top-box">
                            <img src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}/>
                            <p>{forecastItem.dt_txt}</p>
                        </div>
                        <div class = "botton-box">
                            <div class = "weather-botton">
                                <p class = "font-weater-botton">สภาพอากาศ</p>
                                <p class = "font-weater-botton">{forecastItem.main.temp} °C</p>
                            </div>
                            
                            <p class = "font-temp-button">{forecastItem.weather[0].description}</p>
                            
                        </div>
                        
                        
                    </div>
                ))}
            </div>
            
        </div>
    );
};
