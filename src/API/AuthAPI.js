
const CONTROL_API = 'https://dummyjson.com'
export function loginUser(loginInfo){
    return new Promise(async (resolve,reject)=>{
        try {
            console.log(loginInfo)
            const response = await fetch(`https://dummyjson.com/auth/login`,{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: loginInfo.email,
                    password: loginInfo.password
                })
            });
            if(response.ok){
                const data = await response.json()
                //console.log(data)
                resolve({data});
            }
            const err = await response.text()
            reject(err)
        }catch (err) {
            reject(err)
            
        }
    })
}