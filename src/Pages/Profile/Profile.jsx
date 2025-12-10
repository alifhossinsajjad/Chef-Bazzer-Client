import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading"
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaIdBadge,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const Profile = () => {
  const { user } = useAuth();
  const { role, status, roleLoading ,address} = useRole();

  const axiosSecure = useAxiosSecure();

  const handleRequest = async (data) => {
    const requestData = {
      userName: user?.displayName,
      userEmail: user?.email,
      requestType: data,
      requestStatus: "pending",
      requestTime: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/chefs", requestData);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Request Sent",
          text: `Your request to become a ${data} has been submitted successfully!`,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Pending Request",
          text: res.data.message,
        });
      }
    } catch (error) {
      console.error("Request failed", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
      });
    }
  };

  if (roleLoading) {
    return <Loading/>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
        {/* Header / Cover */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
            <div className="avatar">
              <div className="w-32 rounded-full ring ring-white ring-offset-base-100 ring-offset-2 overflow-hidden bg-white">
                <img
                  src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                  alt="User Profile"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-1">
            {user?.displayName}
          </h2>
          <p className="text-gray-500 flex items-center justify-center gap-2 mb-6">
            <FaEnvelope /> {user?.email}
          </p>

          <div className="bg-gray-100 rounded-lg p-6 text-left space-y-4 shadow-inner">
            {/* Role & Status */}
            <div className="flex justify-between items-center border-b border-gray-200 pb-3">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  Role
                </span>
                <span className="font-medium text-gray-800 capitalize flex items-center gap-2">
                  <FaUser className="text-blue-500" /> {role}
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  Status
                </span>
                <span
                  className={`font-medium capitalize flex items-center gap-2 justify-end ${
                    status === "active" ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {status === "active" ? (
                    <FaCheckCircle />
                  ) : (
                    <FaExclamationTriangle />
                  )}{" "}
                  {status}
                </span>
              </div>
            </div>

            {/* Chef ID if applicable */}
            {role === "/chef" || role === "/admin" ? (
              <div className="border-b border-gray-200 pb-3">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                  Chef ID
                </span>
                <p className="font-mono text-gray-800 flex items-center gap-2">
                  <FaIdBadge className="text-orange-500" />{" "}
                  {user?.uid?.slice(0, 10)}...
                </p>
              </div>
            ) : null}

            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider block">
                Address
              </span>
              <p className="text-gray-800 flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                {address|| "No address provided"}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {status !== "fraud" && (
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              {role !== "admin" && role !== "chef" && (
                <button
                  onClick={() => handleRequest("chef")}
                  className="btn bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white flex-1 border-none shadow-lg transform hover:-translate-y-1 transition-all"
                >
                  <FaUser className="mr-2" /> Be a Chef
                </button>
              )}

              {role !== "admin" && (
                <button
                  onClick={() => handleRequest("admin")}
                  className="btn bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white flex-1 border-none shadow-lg transform hover:-translate-y-1 transition-all"
                >
                  <FaIdBadge className="mr-2" /> Be an Admin
                </button>
              )}
            </div>
          )}

          {status === "fraud" && (
            <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center font-semibold flex items-center justify-center gap-2">
                <FaExclamationTriangle /> Your account has been marked as fraud.
                Role requests are disabled.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
