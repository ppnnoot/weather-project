import {configureStore} from "@reduxjs/toolkit"
import weatherReducer from '../API/WeatherSlice'
import authReducer from '../API/AuthSlice'
//import {weatherSlice} from "../API/WeatherSlice";


export const store = configureStore({
    reducer:{
        weather: weatherReducer,
        auth: authReducer
    }
})