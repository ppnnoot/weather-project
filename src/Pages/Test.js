import TestPage from "../Components/TestPage";
import NavBar from "../Components/Navbar/NavBar";
import React from "react";
import {Homepage} from "../Components/Home/Homepage";


export default function Test(){
    return(
        <div>
            <NavBar>
            </NavBar>
            <Homepage />
        </div>
    )
}