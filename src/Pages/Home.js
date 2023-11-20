import {Homepage} from "../Components/Home/Homepage";
import NavBar from "../Components/Navbar/NavBar";
import {SearchResultList} from "../Components/Navbar/SearchResultList";


export default function Home(){
    return(
        <div>
            <NavBar/>
            <SearchResultList />
            <Homepage />
        </div>
    )
}