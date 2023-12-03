import axios from "axios";
const CONTROL_API = 'https://dummyjson.com'
axios.defaults.baseURL = 'http://localhost:3001/'
export async function loginUser(loginInfo){
    try {
        console.log(loginInfo)
        const res = await axios.post('/api/login',loginInfo)
        const data = res.data
        console.log(data)
        if(data){
            localStorage.setItem('token',data.token)
            const userData = { username: data.user.username, role: data.user.role };
            localStorage.setItem('data', JSON.stringify(userData));
            return data
        }else {
            // ไม่สำเร็จ: แสดงข้อความผิดพลาด
            console.error(data.message);
        }
    }catch (err){
        console.error('Error during login:', err);
    }
}

export async function fetchLoggedInUser(){
    try {
        //const res = await axios.get('/api/own')
        return 'res'
    }catch (err) {
        
    }
}
export async function checkAuth() {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            //console.error('No token found in localStorage. User is not authenticated.');
            // Handle the case where there is no token (optional)
            return;
        }
        const response = await axios.get('/auth/check', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok) {
            const userData = await response.json();
            console.log('Authenticated User:', userData);
        } else {
            console.error('Authentication failed');
            // Clear the token from localStorage in case of authentication failure
            localStorage.removeItem('token');
        }
    } catch (error) {
        console.error('Error during authentication check:', error);
    }
}


