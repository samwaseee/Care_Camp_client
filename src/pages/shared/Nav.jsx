import { Navbar } from "@nextui-org/react";
import { FaHandHoldingMedical } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {

    const links = <>
        <li>
            <NavLink to="/" className="rounded-sm" style={({ isActive, isTransitioning }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#f5333f" : "black",
                    backgroundColor: isActive ? "transparent" : "",
                    boxShadow: isActive ?  "0 2px 4px rgba(0, 0, 0, 0.2)" : "",
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
                    boxShadow: isActive ?  "0 2px 4px rgba(0, 0, 0, 0.2)" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                };
            }}>Available Camps
            </NavLink>
        </li>
        <li>
            <NavLink to="/dashboard" className="rounded-sm" style={({ isActive, isTransitioning }) => {
                return {
                    fontWeight: isActive ? "bold" : "",
                    color: isActive ? "#f5333f" : "black",
                    backgroundColor: isActive ? "transparent" : "",
                    borderLeft: isActive ? "solid #f5333f" : "",
                    borderRight: isActive ? "solid #f5333f" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                };
            }}>DashBoard
            </NavLink>
        </li>
    </>

    return (
        <Navbar shouldHideOnScroll className="fixed z-10 w-full">
            <div className="navbar bg-opacity-30 bg-second">
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
                    <a className="btn text-blood rounded-none font-taj text-lg"><FaHandHoldingMedical /> Join us</a>
                </div>
            </div>
        </Navbar>
    );
};

export default Nav;