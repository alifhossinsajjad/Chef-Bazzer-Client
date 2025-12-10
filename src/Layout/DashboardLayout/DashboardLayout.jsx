import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { BsBox } from "react-icons/bs";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaUsers,
  FaTasks,
  FaParachuteBox,
  FaSignOutAlt,
  FaHamburger,
  FaHeart,
} from "react-icons/fa";
import { FiGitPullRequest } from "react-icons/fi";
import { GiMeal } from "react-icons/gi";
import { GiFishCooked } from "react-icons/gi";
import {
  MdOutlinePayment,
  MdOutlineTaskAlt,
  MdAssignmentTurnedIn,
  MdDashboard,
  MdOutlineReviews,
} from "react-icons/md";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";
import logo from "../../assets/logo.png";
import { Archive, ArchiveRestore, Hamburger } from "lucide";

const DashBoardLayout = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
      isActive
        ? "bg-orange-600 text-white shadow-md shadow-orange-200"
        : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
    }`;

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Area */}
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="Logo"
              className="w-10 h-10 rounded-full shadow-sm"
            />
            <span className="text-xl font-bold text-gray-800">
              Chef<span className="text-orange-600">Corner</span>
            </span>
          </Link>
          <button
            onClick={closeSidebar}
            className="lg:hidden ml-auto text-gray-500 hover:text-orange-600"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
          {/* Common Links */}
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Menu
          </p>
          <NavLink
            to="/dashboard"
            end
            className={navLinkClasses}
            onClick={closeSidebar}
          >
            <MdDashboard className="text-xl" />
            <span>Overview</span>
          </NavLink>

          {/* User Links */}
          {role === "user" && (
            <>
              <NavLink
                to="/dashboard/my-order"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaParachuteBox className="text-xl" />
                <span>My Orders</span>
              </NavLink>
              <NavLink
                to="/dashboard/payment-history"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <MdOutlinePayment className="text-xl" />
                <span>Payment History</span>
              </NavLink>
              <NavLink
                to="/dashboard/review"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <MdOutlineReviews className="text-xl" />
                <span>My Review</span>
              </NavLink>
              <NavLink
                to="/dashboard/favorite"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaHeart className="text-xl" />
                <span>My Favorites</span>
              </NavLink>
              <NavLink
                to="/dashboard/profile"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaUser className="text-xl" />
                <span>Profile</span>
              </NavLink>
            </>
          )}

          {/* Chef Links */}
          {role === "chef" && (
            <>
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">
                Chef Zone
              </p>

              <NavLink
                to="/dashboard/request-order"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
               <FiGitPullRequest className="text-xl"/>
                <span>Request Order</span>
              </NavLink>
              <NavLink
                to="/dashboard/my-meals"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <GiMeal  className="text-xl"/>
                <span>My Meals</span>
              </NavLink>
              <NavLink
                to="/dashboard/create-meals"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
               <GiFishCooked className="text-xl"/>
                <span>Create Meals</span>
              </NavLink>

              <NavLink
                to="/dashboard/profile"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaUser className="text-xl" />
                <span>Profile</span>
              </NavLink>

              {/* <NavLink
                to="/dashboard/completed-deliveries"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <MdOutlineTaskAlt className="text-xl" />
                <span>Completed Deliveries</span>
              </NavLink> */}
            </>
          )}

          {/* Admin Links */}
          {role === "admin" && (
            <>
              <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-2">
                Admin Panel
              </p>
              <NavLink
                to="/dashboard/my-order"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <BsBox />
                <span>My Order</span>
              </NavLink>
              <NavLink
                to="/dashboard/payment-history"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <MdOutlinePayment className="text-xl" />
                <span>Payment History</span>
              </NavLink>
              <NavLink
                to="/dashboard/approve-chef"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaHamburger />
                <span>Chef Request</span>
              </NavLink>

              <NavLink
                to="/dashboard/users-management"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaUsers className="text-xl" />
                <span>Users Management</span>
              </NavLink>

              <NavLink
                to="/dashboard/profile"
                className={navLinkClasses}
                onClick={closeSidebar}
              >
                <FaUser className="text-xl" />
                <span>Profile</span>
              </NavLink>
            </>
          )}

          <div className="my-6 border-t border-gray-100"></div>

          {/* Home Link */}
          <NavLink to="/" className={navLinkClasses} onClick={closeSidebar}>
            <FaHome className="text-xl" />
            <span>Home</span>
          </NavLink>
        </div>

        {/* User Profile / Logout (Bottom) */}
        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <Link
            to="/profile"
            className="flex items-center gap-3 mb-4 px-2 hover:bg-gray-100 p-2 rounded-lg transition-colors group"
          >
            <img
              src={user?.photoURL || "https://i.ibb.co/1Jgq0jZ/user.png"}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-white shadow-sm group-hover:border-orange-200 transition-colors"
            />
            <div className="overflow-hidden">
              <h4 className="text-sm font-bold text-gray-800 truncate group-hover:text-orange-600 transition-colors">
                {user?.displayName || "User"}
              </h4>
              <span className="text-xs text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full capitalize">
                {role}
              </span>
            </div>
          </Link>
          <button
            onClick={() => {
              logOut();
            }}
            className="w-full flex items-center justify-center gap-2 bg-white border border-red-100 text-red-500 py-2.5 rounded-xl hover:bg-red-50 transition-colors font-medium text-sm"
          >
            <FaSignOutAlt />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 bg-white shadow-sm flex items-center justify-between px-4 z-30 sticky top-0">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-orange-600 p-1"
            >
              <FaBars size={24} />
            </button>
            <span className="font-bold text-lg text-gray-800">Dashboard</span>
          </div>
          <Link to="/">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
          </Link>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb / Title (Optional, visible on Desktop) */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  Welcome Back, {user?.displayName}!
                </h1>
                <p className="text-gray-500 text-sm mt-1">
                  Here's what's happening with your account today.
                </p>
              </div>
              <div className="text-sm text-gray-400">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>

            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
