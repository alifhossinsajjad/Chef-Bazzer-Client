import React from "react";
import UseAxiosSecure from "./UseAxiosSecure";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
const useRole = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  const { isloading: roleLoading, data: role = "user" } = useQuery({
    queryKey: ["user-role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}/role`);
      return res.data?.role || "user";
    },
  });

  return { roleLoading, role };
};

export default useRole;
