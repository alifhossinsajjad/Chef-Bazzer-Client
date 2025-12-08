import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading/Loading";
import ForbiddenAccess from "../Components/ForbiddenAccess/ForbiddenAccess";



const AdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (role !== "admin") {
    return <ForbiddenAccess/>;
  }

  return children;
};

export default AdminRoute;
