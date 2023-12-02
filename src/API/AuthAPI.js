import axios from "axios";
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