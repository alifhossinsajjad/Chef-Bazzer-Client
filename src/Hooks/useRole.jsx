import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
const useRole = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    isloading: roleLoading,
    data: userRoleInfo = { role: "user", status: "active", chefId: null,  },
  } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return {
        role: res.data?.role || "user",
        status: res.data?.status || "active",
        chefId: res.data?.chefId || null,
        address : res.data?.address,
      };
    },
  });

  return {
    roleLoading,
    role: userRoleInfo.role,
    status: userRoleInfo.status,
    chefId: userRoleInfo.chefId,
    address : userRoleInfo.address,
  };
};

export default useRole;
