import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {checkAuth, fetchLoggedInUser, loginUser} from "./AuthAPI";


const initialState = {
    loginUserToken : null,
    userInfo: null,
    status: 'idle',
    error: null,
    userChecked: false,
}

export const loginUserAsync = createAsyncThunk(
    'user/loginUser',
    async (loginInfo,{rejectValue})=>{
        try {
            const res = await loginUser(loginInfo);
            return res
        }catch (err) {
            console.log(err);
            return rejectValue(err);
        }
    }
)

export const checkedAsync = createAsyncThunk(
    'user/checked',
    async ()=>{
        try {
            const response = await checkAuth();
            return response.data;
        } catch (error) {
            console.log(error);
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
            .addCase(checkedAsync.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(checkedAsync.fulfilled,(state, action)=>{
                state.status = 'idle'
                state.loginUserToken = action.payload
                state.userChecked = true
            })
            .addCase(checkedAsync.rejected,(state, action)=>{
                state.status = 'idle'
                state.userChecked = true
            })
    }
})

export const selectLoginUser = (state) => state.auth.loginUserToken;
export const selectUserChecked = (state)=> state.auth.userChecked

export default AuthSlice.reducer