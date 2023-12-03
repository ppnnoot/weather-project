import {Link, Navigate} from "react-router-dom";

export default function LogoutPage(){
    localStorage.removeItem('token')
    const token = localStorage.getItem('token')
    return <>{!token && <Navigate to="/login" replace={true}></Navigate>}</>;
}