import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Loading/Loading";
import ForbiddenAccess from "../Components/ForbiddenAccess/ForbiddenAccess";

const ChefRoute = ({ children }) => {
  const { loading, user } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || !user || roleLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (role !== "chef") {
    return <ForbiddenAccess />;
  }

  return children;
};

export default ChefRoute;
