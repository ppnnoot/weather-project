import axios from "axios";
<<<<<<< HEAD
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
=======
const CONTROL_API = 'https://localhost:3000/api/login'


export function loginUser(loginInfo){
    return new Promise(async (resolve,reject)=>{
        try {
            console.log(loginInfo)
            const response = await fetch(CONTROL_API,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: loginInfo.username,
                    password: loginInfo.password
                })
            });
            if(response.ok){
                const data = await response.json()
                console.log(data)
                resolve({data});
            }
            const err = await response.text()
            reject(err) 
        }catch (err) {
            reject(err)
            
        }
    })
}
>>>>>>> ef7ac1ae9e251871c67d3109433c42e150f15dfb
