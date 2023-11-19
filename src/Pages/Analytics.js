import NavBar from "../Components/NavBar";
import AnalyticsPage from "../Components/AnalyticsPage";


export default function Analytics(){
    return (
        <>
          <NavBar />
          <AnalyticsPage />
          <div>
            <h1 className="text-2xl font-bold mt-8 ">Welcome To Analytics</h1>
          </div>
          
          <div class= "grid grid-cols-4 grid-rows-4 gap-x-5 gap-y-5">
            <li class="bg-black rounded-lg shadow-xl col-span-2 row-span-2"><div class="h-40 text-white text-center">MAP</div></li>
            <li class="bg-black rounded-lg shadow-xl"><div class="h-40 text-white text-center">Wind</div ></li>
            <li class="bg-black rounded-lg shadow-xl"><div class="h-40 text-white text-center">Humid</div></li>
            <li class="bg-black rounded-lg shadow-xl col-span-2"><div class="h-40 text-white text-center">Sea level </div></li>
            <li class="bg-black rounded-lg shadow-xl col-span-2 row-span-2"><div class="h-20 text-white text-center">Air Pollution</div></li>
            <li class="bg-black rounded-lg shadow-xl col-span-2"><div class="h-40 text-white text-center">Presure</div></li>
          </div>
          
        </>
      );
}