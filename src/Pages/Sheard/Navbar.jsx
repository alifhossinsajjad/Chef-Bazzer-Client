import React from "react";
import { Link, NavLink } from "react-router";

import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink to={"/meals"}>Meals</NavLink>
      </li>
      {/* <li>
        <NavLink to={"/coverage"}>Coverage Areas</NavLink>
      </li>
      <li>
        <NavLink to={"/rider"}>Be A Rider</NavLink>
      </li> */}

      {user && (
        <>
          {/* <li>
            <NavLink to={"/dashboard/my-parcels"}>My Parcels</NavLink>
          </li> */}
          <li>
            <NavLink to={"/dashboard"}>DashBoard</NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to={"/about"}>About us</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow "
            >
              {links}
            </ul>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex cursor-pointer gap-5">
          <ul className="menu menu-horizontal px-1">{links}</ul>
          <div className="hidden md:block">
            {/* Avatar */}
            <img
              className="rounded-full"
              referrerPolicy="no-referrer"
              src={user && user.photoURL ? user.photoURL : name}
              alt="profile"
              height="30"
              width="30"
            />
          </div>
        </div>
        <div className="navbar-end ">
          {user ? (
            <a onClick={handleLogOut} className="btn">
              Log Out
            </a>
          ) : (
            <Link to={"/login"} className="btn">
              Login
            </Link>
          )}
          <Link to={"/rider"} className="btn bg-primary text-black mx-4">
            Be a rider
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
