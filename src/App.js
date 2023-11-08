
import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Test from "./Pages/Test";
import Forecast from "./Pages/Forecast";
import Analytics from "./Pages/Analytics";

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
        path: '/test',
        element: <Test />
    },
    {
        path: '/forecast',
        element: <Forecast />
    },
    {
        path: "/analytics",
        element: <Analytics/>
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
