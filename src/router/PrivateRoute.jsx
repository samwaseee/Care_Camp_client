import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children}) => {

    const {user,loading} = useAuth();
    const location = useLocation();

    // console.log('private',location);

    if(loading){
        return <div className="text-center my-52">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    }

    if (user){
        return children;
    }

    return (
        <Navigate state={location.pathname} to= "/signin"></Navigate>
    );
};

export default PrivateRoute;