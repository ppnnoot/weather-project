import {configureStore} from "@reduxjs/toolkit"
import weatherReducer from '../API/WeatherSlice'
//import {weatherSlice} from "../API/WeatherSlice";


export const store = configureStore({
    reducer:{
        weather: weatherReducer
    }
})