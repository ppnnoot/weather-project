
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Test from "./Pages/Test";
import Forecast from "./Pages/Forecast";
import Analytics from "./Pages/Analytics";
import Register from "./Pages/Register";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path:"/login",
        element: <Login />
    },
    {
        path: '/forecast',
        element: <Forecast />
    },
    {
        path: "/analytics",
        element: <Analytics/>
    },
    {
        path: "/register",
        element: <Register />
    }
])

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
