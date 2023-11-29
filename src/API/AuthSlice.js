import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {loginUser} from "./AuthAPI";



const initialState = {
    loginUserToken : null,
    status: 'idle',
    error: null,
    userChecked: false,
}

export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo,{rejectValue})=>{
        try {
            const res = await loginUser(loginInfo);
            return res.data
        }catch (err) {
            console.log(err);
            return rejectValue(err);
        }
    }
)

export const AuthSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(loginUserAsync.pending,(state,action)=>{
            state.status = 'loading'
        })
            .addCase(loginUserAsync.fulfilled,(state,action)=>{
                state.status = 'idle'
                state.loginUserToken = action.payload;
            })
            .addCase(loginUserAsync.rejected,(state, action)=>{
                state.status = 'idle';
                state.error = action.payload
            })
    }
})

export const selectLoginUser = (state) => state.auth.loginUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state)=> state.auth.userChecked

export default AuthSlice.reducer