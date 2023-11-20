import Homepage from "../Components/Home/Homepage";
import NavBar from "../Components/Navbar/NavBar";
import {useState} from "react";



export default function Home(){
    return(
        <div>
            <NavBar />
            <Homepage />
        </div>
    )
}