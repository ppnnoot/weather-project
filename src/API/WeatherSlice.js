import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {fetchWeather} from "./FetchWeather";


export const fetchWeatherAsync = createAsyncThunk(
    'weather/fetchWeather',
    async (pos)=>{
        try {
            //console.log(pos)
            const data = await fetchWeather(pos.lat,pos.lon)
            //console.log(data)
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
        weekly: null,
        lastSearch: null,
        status: 'idle',
        error: null
    },
    reducers:{
        updateSearch:(state,action)=>{
            state.lastSearch = action.payload
        }
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
                state.weekly = action.payload.weekly;
            })
            .addCase(fetchWeatherAsync.rejected, (state, action) => {
                state.status = 'idle';
                state.error = action.error.message;
            });

    }
})

export const {updateSearch} = weatherSlice.actions;
export default weatherSlice.reducer