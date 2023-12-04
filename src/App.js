
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Forecast from "./Pages/Forecast";
import Analytics from "./Pages/Analytics";
import Register from "./Pages/Register";
import {Protected} from "./Components/Protected";
import LogoutPage from "./Components/LogoutPage";


const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <>
                <Home />
            </>
            )

    },
    {
        path:"/login",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Register />
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
    },
    {
        path: '/logout',
        element: <LogoutPage></LogoutPage>
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
