import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import Home from "../pages/home/Home";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import AVailableCamps from "../pages/availableCamps/AVailableCamps";
import CampDetails from "../pages/campDetails/CampDetails";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../layout/Dashboard";
import UpdateProfile from "../pages/dashboard/shared/UpdateProfile";
import Profile from "../pages/dashboard/shared/Profile";
import AddCamp from "../pages/dashboard/Admin/AddCamp";
import ManageRegCamps from "../pages/dashboard/Admin/ManageRegCamps";
import ManageCamps from "../pages/dashboard/Admin/ManageCamps";
import Annalytics from "../pages/dashboard/user/Annalytics";
import RegiCamps from "../pages/dashboard/user/RegiCamps";
import PaymentHistory from "../pages/dashboard/user/PaymentHistory";
import Payment from "../pages/dashboard/user/payment/Payment";

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
                path: "camps",
                element: <AVailableCamps></AVailableCamps>
            },
            {
                path: "camps/:id",
                loader: ({params}) => fetch(`http://localhost:5000/camps/${params.id}`),
                element: <PrivateRoute><CampDetails></CampDetails></PrivateRoute>
            },
            {
                path: 'signin',
                element: <SignIn></SignIn>
            },
            {
                path: 'signup',
                element: <SignUp></SignUp>
            }
        ]
    },
    {
        path: 'dashboard',
        element: <Dashboard></Dashboard>,
        children: [
            {
                path: 'organizerProfile',
                element: <Profile></Profile>
            },
            {
                path: 'updateProfile',
                element: <UpdateProfile></UpdateProfile>
            },
            {
                path: 'addCamp',
                element: <AddCamp></AddCamp>
            },
            {
                path: 'manageCamps',
                element: <ManageCamps></ManageCamps>
            },
            {
                path: 'manageRegCamps',
                element: <ManageRegCamps></ManageRegCamps>
            },


            //participant

            {
                path: 'participantProfile',
                element: <Profile></Profile>
            },
            {
                path: 'annalytics',
                element: <Annalytics></Annalytics>
            },
            {
                path: 'registeredCamps',
                element: <RegiCamps></RegiCamps>
            },
            {
                path: 'paymentHistory',
                element: <PaymentHistory></PaymentHistory>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            }
        ]
    }
]);


export default router;