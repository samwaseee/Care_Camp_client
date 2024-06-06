import { VscThreeBars } from "react-icons/vsc";
import useAuth from "../hooks/useAuth";
import { NavLink, Outlet } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {

    const { user } = useAuth();
    const [isAdmin] = useAdmin();

    return (
        <>
            <div className="drawer">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <div className="w-full bg-second flex gap-4 items-center p-2">
                        <div className="flex-1">
                            <label htmlFor="my-drawer" className="btn drawer-button"> <VscThreeBars size={30} /> </label>
                        </div>
                        <p className="">{user?.displayName}</p>
                        <img src={user?.photoURL} alt="no image" width={'48px'} />
                    </div>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side z-50">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-neutral-800 text-neutral-50 space-y-2">

                        {
                            isAdmin ?
                                <>
                                    <li> <NavLink to='/dashboard/organizerProfile'>Organizer Profile</NavLink> </li>
                                    <li> <NavLink to='/dashboard/addCamp'>Add Camp</NavLink> </li>
                                    <li> <NavLink to='/dashboard/manageCamps'>Manage Camps</NavLink> </li>
                                    <li> <NavLink to='/dashboard/manageRegCamps'>Manage Registered Camps</NavLink> </li>

                                </>
                                :
                                <>
                                    <li> <NavLink to='/dashboard/participantProfile'>Profile</NavLink> </li>
                                    <li> <NavLink to='/dashboard/annalytics'>Annalytics</NavLink> </li>
                                    <li> <NavLink to='/dashboard/registeredCamps'>Registered Camps</NavLink> </li>
                                    <li> <NavLink to='/dashboard/paymentHistory'>Payment History</NavLink> </li>

                                </>
                        }
                        <div className="divider bg-second h-1"></div>
                        <li>
                            <NavLink to="/">
                                <FaHome></FaHome>
                                Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/camps">
                                <FaSearch></FaSearch>
                                All Camps</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">
                                <FaEnvelope></FaEnvelope>
                                Contact</NavLink>
                        </li>
                    </ul>


                </div >
            </div >

        </>
    );
};

export default Dashboard;