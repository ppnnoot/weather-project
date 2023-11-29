
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Forecast from "./Pages/Forecast";
import Analytics from "./Pages/Analytics";
import Register from "./Pages/Register";
import {Protected} from "./Components/Protected";


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
        element: (
            <Protected>
                <Forecast />
            </Protected>
        ),
    },
    {
        path: "/analytics",
        element: (
            <Protected>
                <Analytics/>
            </Protected>
            ),
    },
    {
        path: "/register",
        element: <Register />
    }
])

function App() {
  return (
      <>
          <div className={'App'}>
              <RouterProvider router={router} />
          </div>
      </>

  );
}

export default App;
