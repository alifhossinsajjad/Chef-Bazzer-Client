import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import logo from "../../assets/logo.png";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaTachometerAlt,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role, status } = useRole();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle theme change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogOut = () => {
    logOut()
      .then((result) => {
        console.log("Logged out successfully", result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const navLinkStyles = ({ isActive }) =>
    `text-lg font-medium transition-all duration-300 hover:text-orange-500 ${
      isActive
        ? "text-orange-500 font-bold border-b-2 border-orange-500"
        : "text-gray-700"
    }`;

  const links = (
    <>
      <li>
        <NavLink to={"/"} className={navLinkStyles}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to={"/meals"} className={navLinkStyles}>
          Meals
        </NavLink>
      </li>

      <li>
        <NavLink to={"/about"} className={navLinkStyles}>
          About Us
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink to={"/profile"} className={navLinkStyles}>
            profile
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/70 backdrop-blur-lg shadow-sm border-b border-white/20 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container bg-transparent mx-auto px-4 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 group">
          <img
            src={logo}
            alt="ChefCorner Logo"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md transform transition group-hover:scale-110"
          />
          <h2
            className={`text-2xl font-bold tracking-tight ${
              scrolled ? "text-gray-800" : "text-gray-800"
            }`}
          >
            Chef<span className="text-orange-500">Corner</span>
          </h2>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex items-center gap-8">{links}</ul>
        </div>

        {/* Action Buttons & Profile */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-xl"
          >
            {theme === "light" ? (
              <FaMoon className="text-gray-600" />
            ) : (
              <FaSun className="text-yellow-400" />
            )}
          </button>

          {/* <Link
            to={"/chef"}
            className="px-5 py-2 rounded-full border border-orange-500 text-orange-600 font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-sm"
          >
            Be a Chef
          </Link> */}

          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border-2 border-orange-200"
              >
                <Link to={"/profile"} className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    src={user?.photoURL || "https://i.ibb.co/1Jgq0jZ/user.png"}
                    alt="User Profile"
                    className="rounded-full w-10 h-10"
                  />
                </Link>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-gray-100"
              >
                <li className="mb-2 px-2">
                  <div className="flex flex-col items-start gap-1 p-0 hover:bg-transparent cursor-default">
                    <span className="font-bold text-gray-800">
                      {user?.displayName}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        status === "active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-orange-600"
                  >
                    <FaUserCircle /> Profile
                  </Link>
                </li>

                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 py-2 text-gray-700 hover:text-orange-600"
                  >
                    <FaTachometerAlt /> Dashboard
                  </Link>
                </li>
                <li>
                  <div className="divider my-0"></div>
                </li>
                <li>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center gap-2 py-2 text-red-500 hover:bg-red-50"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="btn btn-primary bg-orange-600 hover:bg-orange-700 border-none text-white px-6 rounded-full shadow-lg transform hover:-translate-y-0.5 transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 gap-4 transition-all duration-300 ease-in-out border-t`}
        >
          <ul className="flex flex-col items-center gap-4 w-full">
            <li className="w-full text-center">
              <NavLink
                to={"/"}
                className="block py-2 text-lg font-medium text-gray-700 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li className="w-full text-center">
              <NavLink
                to={"/meals"}
                className="block py-2 text-lg font-medium text-gray-700 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Meals
              </NavLink>
            </li>
            <li className="w-full text-center">
              <NavLink
                to={"/about"}
                className="block py-2 text-lg font-medium text-gray-700 hover:text-orange-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to={"/profile"} className={navLinkStyles}>
                  Profile
                </NavLink>
              </li>
            )}

            {user && (
              <li className="w-full text-center">
                <NavLink
                  to={"/dashboard"}
                  className="block py-2 text-lg font-medium text-gray-700 hover:text-orange-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
          <div className="flex flex-col gap-3 w-full px-6 mt-4">
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center gap-2 py-2 rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              {theme === "light" ? (
                <>
                  <FaMoon /> Switch to Dark Mode
                </>
              ) : (
                <>
                  <FaSun className="text-yellow-500" /> Switch to Light Mode
                </>
              )}
            </button>
            {/* <Link
              to={"/chef"}
              className="btn btn-outline border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white w-full rounded-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Be a Chef
            </Link> */}
            {user ? (
              <button
                onClick={() => {
                  handleLogOut();
                  setIsMobileMenuOpen(false);
                }}
                className="btn bg-red-500 hover:bg-red-600 text-white w-full rounded-full border-none"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="btn bg-orange-600 hover:bg-orange-700 text-white w-full rounded-full border-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
