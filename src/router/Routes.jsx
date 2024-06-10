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
import Feedback from "../pages/dashboard/user/Feedback";
import AdminRoute from "./AdminRoute";
import Feedbacks from "../pages/feedbacksandRating/Feedbacks";
import OurWork from "../pages/ourWork/OurWork";
import Error from "../pages/error/Error";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App></App>,
        errorElement: <Error />,
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
                loader: ({params}) => fetch(`https://care-camp-server-alpha.vercel.app/camps/${params.id}`),
                element: <PrivateRoute><CampDetails></CampDetails></PrivateRoute>
            },
            {
                path: 'feedbacksandRating',
                loader: ()=> fetch('https://care-camp-server-alpha.vercel.app/feedbacks'),
                element: <Feedbacks></Feedbacks>
            },
            {
                path: 'ourWork',
                element: <OurWork></OurWork>
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
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: 'organizerProfile',
                element: <AdminRoute><Profile></Profile></AdminRoute>
            },
            {
                path: 'updateProfile',
                element: <AdminRoute><UpdateProfile></UpdateProfile></AdminRoute>
            },
            {
                path: 'addCamp',
                element: <AdminRoute><AddCamp></AddCamp></AdminRoute>
            },
            {
                path: 'manageCamps',
                element: <AdminRoute><ManageCamps></ManageCamps></AdminRoute>
            },
            {
                path: 'manageRegCamps',
                element: <AdminRoute><ManageRegCamps></ManageRegCamps></AdminRoute>
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
                path: 'feedback/:id',
                element: <Feedback></Feedback>
            },
            {
                path: 'payment/:id',
                element: <Payment></Payment>
            }
        ]
    }
]);


export default router;