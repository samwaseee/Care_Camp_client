import { FaHandHoldingMedical } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAdmin from "../../hooks/useAdmin";

const Nav = () => {

    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    const [position, setPosition] = useState(window.scrollY);
    const [visible, setVisible] = useState(true);

    const handleSignout = () => {
        logOut()
            .then(() => {
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        const handleScroll = () => {
            let moving = window.scrollY;
            setVisible(position > moving || moving < 10);
            setPosition(moving);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [position]);

    const navbarClass = visible ? "top-0 transition-down" : "-top-80 transition-top ";

    const links = <>
        <li>
            <NavLink to="/" className="rounded-sm" style={({ isActive, isTransitioning }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#f5333f" : "black",
                    backgroundColor: isActive ? "transparent" : "",
                    boxShadow: isActive ? "0 2px 4px rgba(0, 0, 0, 0.2)" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                };
            }}>Home
            </NavLink>
        </li>
        <li>
            <NavLink to="/camps" className="rounded-sm" style={({ isActive, isTransitioning }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#f5333f" : "black",
                    backgroundColor: isActive ? "transparent" : "",
                    boxShadow: isActive ? "0 2px 4px rgba(0, 0, 0, 0.2)" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                };
            }}>Available Camps
            </NavLink>
        </li>
        <li>
            {
                user && 
            <NavLink to={isAdmin ? '/dashboard/organizerProfile' : '/dashboard/participantProfile'} className="rounded-sm" style={({ isActive, isTransitioning }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#f5333f" : "black",
                    backgroundColor: isActive ? "transparent" : "",
                    borderLeft: isActive ? "solid #f5333f" : "",
                    borderRight: isActive ? "solid #f5333f" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                };
            }}>Dashboard
            </NavLink>
            }
        </li>
    </>

    return (
            <div className={`navbar bg-opacity-70 bg-second ${navbarClass} fixed w-full z-50`}>
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <div>
                        <Link to={'/'} className="flex">
                            <img src="../../../../public/health-podcast.png" alt="" className="w-12" />
                            <p className="text-3xl btn btn-ghost font-taj">Camp care</p>
                        </Link>
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <details className="dropdown">
                            <summary className="m-1 btn rounded-none btn-ghost relative overflow-visible hover:-translate-y-1 shadow-xl after:content-[''] after:absolute after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"> <img src={user.photoURL} alt="no image" width={'40px'}/> </summary>
                            <ul className="p-2 shadow menu dropdown-content z-[1] bg-second bg-opacity-80 right-0">
                                <li className="m-2 w-max">{user.displayName}</li>
                                <li><button onClick={handleSignout} className="rounded-none text-blood">Sign Out</button></li>
                            </ul>
                        </details> :
                            <Link to={'/signin'} onClick={() => window.reload()} className="btn text-blood rounded-none font-taj text-lg relative overflow-visible hover:-translate-y-1 shadow-xl bg-background/30 after:content-[''] after:absolute after:inset-0 after:bg-background/40 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"><FaHandHoldingMedical /> Join us</Link>
                    }
                </div>
            </div>
    );
};

export default Nav;