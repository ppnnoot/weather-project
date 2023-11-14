import axios from 'axios';

const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather"
const WEATHER_API_KEY = "87c1389b96ffca4894593c489a3c30af"

export async function getCurLocation(){
    try {
        if (navigator.geolocation) {
            return navigator.geolocation.getCurrentPosition;
        } else {
            return "Geolocation is not supported by this browser.";
        }

    }catch (e) {

    }
}

export async function fetchLocation() {
    try {
        const response = await axios.get('https://opend.data.go.th/get-ckan/datastore_search', {
            params: {
                resource_id: '48039a2a-2f01-448c-b2a2-bb0d541dedcd'
            },
            headers: {
                'api-key': 'SaUHKkyfVLjb7u6mCSO0ziXXAeDyuGOu',
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
        });

        console.log(JSON.stringify(response.data)); // ทำอย่างอื่นกับข้อมูลที่ได้รับได้ที่นี่
        return response.data; // ส่งข้อมูลออกไป
    } catch (error) {
        console.log(error);
        throw error; // โยน error ออกไปสำหรับการจัดการที่ตัวเรียกฟังก์ชัน fetchLocation
    }
}

export async function fetchWeather() {
    return new Promise(async (resolve, reject) => {
        try {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const { latitude, longitude } = position.coords;
                        const response = await axios.get(WEATHER_API_URL, {
                            params: {
                                'appid': WEATHER_API_KEY,
                                'lat': latitude,
                                'lon': longitude,
                                'units': 'metric',
                                'lang': 'th'
                            }
                        });

                        resolve(response.data);
                    },
                    (error) => {
                        reject(new Error('Error getting geolocation: ' + error.message));
                    }
                );
            } else {
                reject(new Error('Geolocation not supported'));
            }
        } catch (error) {
            reject(error);
        }
    });
}


