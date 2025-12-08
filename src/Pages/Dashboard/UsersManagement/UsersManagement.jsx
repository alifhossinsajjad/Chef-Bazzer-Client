import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import { BsFillShieldLockFill } from "react-icons/bs";

const UsersManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const { refetch, data: users = [] } = useQuery({
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
          title: `${user.displayName}Removed from Admin`,
          showConfirmButton: false,
          timer: 2500,
        });
      }
    });
  };



  return (
      <div>
      <h2 className="text-2xl text-center my-10">
        Manage Users : {users.length}
      </h2>

      <div className="flex justify-center items-center my-10">
        <label className="input">
          <FaSearch />
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="grow"
            placeholder="Search users"
          />
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>No</label>
              </th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Actions</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                      <div className="text-sm opacity-50">{user?.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-300"
                    >
                      <BsFillShieldLockFill/>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn bg-green-400"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <th>
                  <button className="btn btn-ghost btn-xs">Actions</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
