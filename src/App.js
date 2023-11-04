
import './App.css';
import { DefaultSidebar } from './Components/Homepage';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Login from "./Components/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultSidebar />
    },
    {
        path:"/login",
        element: <Login />
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
