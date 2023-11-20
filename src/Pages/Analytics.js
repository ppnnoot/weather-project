import NavBar from "../Components/Navbar/NavBar";
import AnalyticsPage from "../Components/Analytics/AnalyticsPage";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const customMarkerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/9356/9356230.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const lati = 13.736717
const longti = 100.523186
const current_Position = [lati,longti];


export default function Analytics() {
  return (
    <>
      <NavBar />
      <AnalyticsPage />
      <div>
        <h1 className="text-2xl font-bold mt-8 ">Welcome To Analytics</h1>
      </div>

      <div className="grid grid-cols-4 grid-rows-4 gap-x-5 gap-y-5">
        <li className="bg-black rounded-lg shadow-xl col-span-2 row-span-2">
          <div className="h-40 text-white text-center col-span-2 row-span-2">
            <p>Map</p>
            <MapContainer
              center={current_Position}
              zoom={13}
              style={{ height: '200%', width: '100%' }}
              
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={current_Position} icon={customMarkerIcon}>
                <Popup>
                  <div >
                    <h2 clas="text-center">You were at</h2>
                    <p>latitude:{lati} , longtitude{longti}</p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </li>
        <li className="bg-black rounded-lg shadow-xl">
          <div className="h-40 text-white text-center">Wind</div>
        </li>
        <li className="bg-black rounded-lg shadow-xl">
          <div className="h-40 text-white text-center">Humid</div>
        </li>
        <li className="bg-black rounded-lg shadow-xl col-span-2">
          <div className="h-40 text-white text-center">Sea level </div>
        </li>
        <li className="bg-black rounded-lg shadow-xl col-span-2 row-span-2">
          <div className="h-20 text-white text-center">Air Pollution</div>
        </li>
        <li className="bg-black rounded-lg shadow-xl col-span-2">
          <div className="h-40 text-white text-center">Pressure</div>
        </li>
      </div>
    </>
  );
}
