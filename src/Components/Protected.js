import {useSelector} from "react-redux";
import {selectLoginUser} from "../API/AuthSlice";
import {Navigate} from "react-router-dom";


export function Protected({children }){
    const user = useSelector(selectLoginUser)
    if(!user){
        return <Navigate to={'/login'} replace={true}></Navigate>
    }
    return children
}