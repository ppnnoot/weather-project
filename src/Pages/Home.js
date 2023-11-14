import {Homepage} from "../Components/Homepage";
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