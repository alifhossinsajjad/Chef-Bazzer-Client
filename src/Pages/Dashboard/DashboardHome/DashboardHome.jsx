import React from "react";
import useRole from "../../../Hooks/useRole";
import Loading from "../../../Components/Loading/Loading";
import AdminDashboard from "./AdminDashboard";
import ChefDashboard from "./ChefDashboard";
import UserDashboard from "./UserDashboard";

const DashboardHome = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "admin") {
    return <AdminDashboard />;
  } else if (role === "chef") {
    return <ChefDashboard />;
  } else {
    return <UserDashboard />;
  }
};

export default DashboardHome;
