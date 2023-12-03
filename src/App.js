
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Forecast from "./Pages/Forecast";
import Analytics from "./Pages/Analytics";
import Register from "./Pages/Register";
import {Protected} from "./Components/Protected";
import {useSelect} from "@material-tailwind/react";
import {useDispatch, useSelector} from "react-redux";
import {
    checkedAsync,
    checkedUserAsync,
    fetchLoggedInUserAsync,
    selectLoginUser,
    selectUserChecked
} from "./API/AuthSlice";
import {useEffect} from "react";
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
    const dispatch = useDispatch()
    const user = useSelector(selectLoginUser)
    const userChecked = useSelector(selectUserChecked)
    useEffect(()=>{
        dispatch(checkedAsync())
    },[dispatch]);

    useEffect(()=>{
        if(user){
            dispatch(fetchLoggedInUserAsync())
        }
    },[dispatch,user])
  return (
      <>
          <div className={'App'}>
              {!userChecked ||(
                  <RouterProvider router={router} />
              )}
          </div>
      </>

  );
}

export default App;
