import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserPlus, FaUserSlash } from "react-icons/fa";

const ApproveChef = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: chefs = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["chefs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/chefs");
      console.log(res.data);
      return res.data;
    },
  });

  const updateRequestStatus = (chef, status) => {
    const updateInfo = { status: status, email: chef.userEmail };
    axiosSecure
      .patch(`/chefs/${chef._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Request ${status} successfully! ${
              status === "approved"
                ? `User role updated to ${chef.requestType}`
                : ""
            }`,
            showConfirmButton: false,
            timer: 2500,
          });
        }
      })
      .catch((error) => {
        console.error("Update error:", error);
        Swal.fire("Error!", "Failed to update request status.", "error");
      });
  };

  const handleApproval = (chef) => {
    Swal.fire({
      title: "Approve Request?",
      text: `This will update ${chef.userName}'s role to ${chef.requestType}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#10b981",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, approve it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequestStatus(chef, "approved");
      }
    });
  };

  const handleRejection = (chef) => {
    Swal.fire({
      title: "Reject Request?",
      text: `${chef.userName}'s request will be rejected`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, reject it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRequestStatus(chef, "rejected");
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Manage Role Requests: {chefs.length}
      </h2>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : chefs.length === 0 ? (
        <p className="text-gray-500 text-center py-12">
          No requests available.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th>SN</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Request Type</th>
                <th>Request Time</th>
                <th>Request Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {chefs.map((chef, index) => (
                <tr key={chef._id}>
                  <td>{index + 1}</td>
                  <td>{chef.userName}</td>
                  <td>{chef.userEmail}</td>
                  <td>
                    <span className="badge badge-primary capitalize">
                      {chef.requestType}
                    </span>
                  </td>
                  <td>{new Date(chef.requestTime).toLocaleDateString()}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        chef.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : chef.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {chef.status}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleApproval(chef)}
                      disabled={
                        chef.status === "approved" || chef.status === "rejected"
                      }
                      className="btn btn-sm btn-success text-white"
                      title="Approve Request"
                    >
                      <FaUserPlus />
                    </button>
                    <button
                      onClick={() => handleRejection(chef)}
                      disabled={
                        chef.status === "approved" || chef.status === "rejected"
                      }
                      className="btn btn-sm btn-error text-white"
                      title="Reject Request"
                    >
                      <FaUserSlash />
                    </button>
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

export default ApproveChef;
