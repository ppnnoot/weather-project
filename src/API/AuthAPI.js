import axios from "axios";
const CONTROL_API = 'https://dummyjson.com'
axios.defaults.baseURL = 'http://localhost:3001/'
export async function loginUser(loginInfo){
    try {
        console.log(loginInfo)
        const res = await axios.post('/api/login',loginInfo)
        return res.data
    }catch (err){

    }
}

export async function fetchLoggedInUser(){
    try {
        const res = await axios.get('/api/own')
        return res.data
    }catch (err) {
        
    }
}
export async function checkAuth() {
    try {
        const response = await axios.get('/auth/check');

        if (response.status === 200) {
            return { data: response.data };
        } else {
            return (`Error: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        throw new Error(error.message || 'An error occurred while checking authentication.');
    }
}
