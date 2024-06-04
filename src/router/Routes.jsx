import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import AVailableCamps from "../pages/availableCamps/AVailableCamps";
import CampDetails from "../pages/campDetails/CampDetails";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/camps",
                element: <AVailableCamps></AVailableCamps>
            },
            {
                path: "/camps/:id",
                loader: ({params}) => fetch(`http://localhost:5000/camps/${params.id}`),
                element: <CampDetails></CampDetails>
            },
            {
                path: '/signin',
                element: <SignIn></SignIn>
            },
            {
                path: '/signup',
                element: <SignUp></SignUp>
            }
        ]
    },
]);


export default router;