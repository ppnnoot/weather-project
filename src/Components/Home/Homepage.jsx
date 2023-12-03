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

    const update = () => {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var sec = currentDate.getSeconds();
        var formationDate = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes + ':' + sec;

        setDate(formationDate);
      }

    useEffect(() => {
        update();
        const intervalId = setInterval(update, 1000);
        return () => clearInterval(intervalId);
    }, []);


    function changeBackgroundColor(containerTop) {
        /*const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour < 16) {
            containerTop.style.backgroundColor = '#FFDB91';
        } else if (currentHour >= 16 && currentHour < 18) {
            containerTop.style.backgroundColor = '#FFDB91';
        } else {
            containerTop.style.backgroundColor = '#16171F';
            containerTop.style.color = 'white';
        }*/
    }

    //   #16171F กลางคืน
    //   #FFDB91 เช้า
    //   #BCA970 เย็น

      setInterval(changeBackgroundColor, 1000);


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
        <div className="container-weather">
            {/* Use today and forecast data here */}
            <div className = "container-top">
                <div className = "left-top">
                    <p>สภาพอากาศปัจจุบัน {date}</p>
                    <br/>
                    <div className = "pic-top">
                        <img className="weather-icon" src={`https://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}/>
                        <p className = "font-temp"> {today.main.temp} °C</p>
                    </div>

                </div>

                <div className = "right-top">
                    <div>
                        <p className = "font-weater">สภาพอากาศ</p>

                        <p className = "font-CurrentWeather">{today.weather[0].description}</p>
                    </div>
                    <div>
                    <a href='/analytics' className="font-details">
                        ลายละเอียดเพิ่มเติม <ChevronRightIcon className = "icon-right"/>
                    </a>
                    </div>
                </div>

            </div>
            <div className = "container-botton">
                {forecast.map((forecastItem, index) => (
                    <div key={index} className = "frame-time">
                        <div className = "top-box">
                            <img src={`https://openweathermap.org/img/wn/${forecastItem.weather[0].icon}@2x.png`}/>
                            <p>{forecastItem.dt_txt}</p>
                        </div>
                        <div className = "botton-box">
                            <div className = "weather-botton">
                                <p className = "font-weater-botton">สภาพอากาศ</p>
                                <p className = "font-weater-botton">{forecastItem.main.temp} °C</p>
                            </div>

                            <p className = "font-temp-button">{forecastItem.weather[0].description}</p>

                        </div>


                    </div>
                ))}
            </div>

        </div>
    );
};
