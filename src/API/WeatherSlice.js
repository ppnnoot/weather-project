import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchWeather} from "./FetchWeather";


export const fetchWeatherAsync = createAsyncThunk(
    'weather/fetchWeather',
    async ({latitude,longitude})=>{
        try {
            const data = await fetchWeather(latitude,longitude)
            console.log("data")
            return data
        }catch (err){
            console.error('Error fetching weather data:', err);
            throw err;
        }
    }
)

export const weatherSlice = createSlice({
    name: "weather",
    initialState:{
        today: null,
        forecast: null,
        status: 'idle',
        error: null
    },
    reducers:{
    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchWeatherAsync.pending, (state,action)=>{
                state.status = 'loading'
            })
            .addCase(fetchWeatherAsync.fulfilled,(state,action)=>{
                state.status = "idle";
                state.today = action.payload.today;
                state.forecast = action.payload.forecast;
            })
            .addCase(fetchWeatherAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
            });

    }
})

export default weatherSlice.reducer