import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";

const Profile = () => {

    const { user } = useAuth();
    const [isAdmin] = useAdmin();

    return (
        <div className="card lg:w-1/2  my-24 mx-auto bg-base-100 shadow-xl">
            <figure><img src={user?.photoURL} alt={user?.displayName} className="w-1/3"/></figure>
            <div className="card-body">
                <h2 className="card-title">
                    {user?.displayName}
                    {
                        isAdmin &&
                        <div className="badge badge-secondary">Admin</div>
                    }
                </h2>
                <p>{user?.email}</p>
                <div className="card-actions justify-end">
                    <Link to={'/dashboard/updateProfile'}><div className="badge badge-outline btn min-h-0 h-fit p-1 hover:scale-125">Update Profile</div></Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;