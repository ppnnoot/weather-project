import axios from "axios";
const CONTROL_API = 'https://dummyjson.com'
axios.defaults.baseURL = 'http://localhost:3001/'
export async function loginUser(loginInfo){
    try {
        const res = await axios.post('/api/login',loginInfo)
        return res.data
    }catch (err){

    }
}