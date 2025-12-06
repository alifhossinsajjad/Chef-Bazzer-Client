import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    isloading: roleLoading,
    data: userRoleInfo = { role: "user", status: "active" },
  } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return {
        role: res.data?.role || "user",
        status: res.data?.status || "active",
      };
    },
  });

  return { roleLoading, role: userRoleInfo.role, status: userRoleInfo.status };
};

export default useRole;
