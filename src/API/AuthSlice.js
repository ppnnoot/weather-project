import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {checkAuth, createUser, loginUser} from "./AuthAPI";


const initialState = {
    loginUserToken : null,
    status: 'idle',
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
export const createUserAsync = createAsyncThunk(
    'user/create',
    async (data,{rejectValue})=>{
        try {
            const res = await createUser(data);
            return res
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
            .addCase(createUserAsync.pending,(state)=>{
                state.status = 'loading'
            })
            .addCase(createUserAsync.fulfilled,(state, action)=>{
                state.status = 'idle'
                state.loginUserToken = action.payload;
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

export default AuthSlice.reducer