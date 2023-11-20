import axios from 'axios';

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
const FORECAST_API_URL = "https://api.openweathermap.org/data/2.5/forecast"
const GEO_API_URL = "https://api.openweathermap.org/geo/1.0/direct"
const WEATHER_API_KEY = "87c1389b96ffca4894593c489a3c30af"

export async function fetchLocation(input) {
    return new Promise( async (resolve,reject) =>{
        if(input === "")
            input = "thailand"

        try {

            const response = await axios.get(GEO_API_URL,{
                params:{
                    q: input,
                    appid: WEATHER_API_KEY,
                    limit: 10
                }
            });
            resolve(response.data)

        } catch (err) {
            reject(err)
        }
    })

}

export const fetchWeather = (latitude, longitude) => {
    return new Promise(async (resolve, reject) => {
        try {
            const [weatherRes, forecastRes] = await Promise.all([
                axios.get(WEATHER_API_URL, {
                    params: {
                        appid: WEATHER_API_KEY,
                        lat: latitude,
                        lon: longitude,
                        units: 'metric',
                        lang: 'th',
                    },
                }),
                axios.get(FORECAST_API_URL, {
                    params: {
                        appid: WEATHER_API_KEY,
                        lat: latitude,
                        lon: longitude,
                        units: 'metric',
                        lang: 'th',
                    },
                }),
            ]);
            const curDate = new Date()
            const curDateString = curDate.toISOString().split('T')[0]
            const filteredForcast = forecastRes.data.list.filter((item)=>{
                const forecastDate = item.dt_txt.split(' ')[0]

                return forecastDate === curDateString
            })

            const weatherData = { today: weatherRes.data, forecast: filteredForcast};
            console.log(weatherData);
            resolve(weatherData );
        } catch (error) {
            console.error('Error fetching weather data:', error);
            reject(error);
        }
    });
};




