import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield, FaExclamationTriangle } from "react-icons/fa";
import Swal from "sweetalert2";
import { BsFillShieldLockFill } from "react-icons/bs";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const { refetch, data: users = [], isLoading } = useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const res = await axiosSecure.get(`users?search=${search}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to make this user an Admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make admin",
    }).then((result) => {
      if (result.isConfirmed) {
        const roleInfo = { role: "admin" };

        axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();

            Swal.fire({
              icon: "success",
              title: `${user.displayName} is now an Admin`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  const handleRemoveAdmin = (user) => {
    const roleInfo = { role: "user" };
    axiosSecure.patch(`/users/${user._id}/role`, roleInfo).then((res) => {
      if (res.data.modifiedCount) {
        console.log(res.data);
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} Removed from Admin`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };

  const handleMakeFraud = (user) => {
    Swal.fire({
      title: "Mark as Fraud?",
      text: `This will mark ${user.displayName} as a fraud user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, mark as fraud!",
    }).then((result) => {
      if (result.isConfirmed) {
        const statusInfo = { status: "fraud" };

        axiosSecure.patch(`/users/${user._id}/status`, statusInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              icon: "success",
              title: "User marked as fraud",
              text: `${user.displayName} has been marked as fraud and their actions are now restricted.`,
              showConfirmButton: false,
              timer: 2500,
            });
          }
        }).catch((error) => {
          console.error("Error marking user as fraud:", error);
          Swal.fire("Error!", "Failed to update user status.", "error");
        });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-6">
        Manage Users: {users.length}
      </h2>

      <div className="flex justify-center items-center mb-8">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
          <FaSearch />
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search users by name or email"
          />
        </label>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Admin Actions</th>
                <th>Fraud Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                            alt="User Avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user.displayName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge badge-primary capitalize">
                      {user.role || "user"}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${user.status === "fraud"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                        }`}
                    >
                      {user.status || "active"}
                    </span>
                  </td>
                  <td className="text-center">
                    {user.role === "admin" ? (
                      <button
                        onClick={() => handleRemoveAdmin(user)}
                        className="btn btn-sm bg-red-300 hover:bg-red-400"
                        title="Remove Admin"
                      >
                        <BsFillShieldLockFill />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-sm bg-green-400 hover:bg-green-500"
                        title="Make Admin"
                      >
                        <FaUserShield />
                      </button>
                    )}
                  </td>
                  <td className="text-center">
                    {user.role !== "admin" && user.status !== "fraud" && (
                      <button
                        onClick={() => handleMakeFraud(user)}
                        className="btn btn-sm btn-error text-white"
                        title="Mark as Fraud"
                      >
                        <FaExclamationTriangle /> Make Fraud
                      </button>
                    )}
                    {user.status === "fraud" && (
                      <span className="text-red-600 font-semibold">Fraud User</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersManagement;
