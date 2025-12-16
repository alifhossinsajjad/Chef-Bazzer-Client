import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { FaEdit, FaEye, FaStreetView } from "react-icons/fa";
import { FaDeleteLeft, FaMagnifyingGlass, FaTrashCan } from "react-icons/fa6";

const MyOrder = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: orders = [] } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      console.log("Orders data:", res.data);
      return res.data;
    },
  });

  const haddlePayment = async (order) => {
   
    if (order.orderStatus !== "accepted-by-chef") {
      Swal.fire({
        icon: "warning",
        title: "Cannot Pay Yet",
        text: "Please wait for the chef to accept your order before making payment.",
        confirmButtonColor: "#f59e0b",
      });
      return;
    }

 
    const paymentInfo = {
      price: order.totalPrice || order.price,
      orderId: order._id,
      userEmail: order.userEmail || user?.email,
      userName: order.userName || user?.displayName,
      mealName: order.mealName,
      trackingId: order.trackingId,
    };

  
    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
      );
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      Swal.fire(
        "Error",
        "Could not initiate payment. Please try again.",
        "error"
      );
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Orders ({orders.length})
        </h2>
      </div>
      <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
        <table className="table table-zebra">
          {/* head */}
          <thead className="text-center bg-gray-100">
            <tr>
              <th>Food Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Payment Status</th>
              <th>Order Address</th>
              <th>Order Status</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.FoodName}</td>
                <td>${order.price}</td>
                <td>{order.quantity}</td>
                <td>
                  {order.paymentStatus === "paid" ? (
                    <span className="badge badge-success text-white">Paid</span>
                  ) : order.orderStatus === "pending-chef-approval" ? (
                    <span className="badge badge-warning p-5">
                      Waiting for Chef Approval
                    </span>
                  ) : order.orderStatus === "accepted-by-chef" ? (
                    <button
                      onClick={() => haddlePayment(order)}
                      className="btn bg-amber-500 hover:bg-amber-600 text-white btn-sm "
                    >
                      Pay Now
                    </button>
                  ) : order.orderStatus === "rejected" ? (
                    <span className="badge badge-error text-white p-4">
                      Order Rejected
                    </span>
                  ) : (
                    <span className="badge badge-info">
                      {order.orderStatus}
                    </span>
                  )}
                </td>

                <td>{order.userAddress}</td>
                <td>
                  {order.orderStatus === "pending-chef-approval" && (
                    <span className="badge badge-warning p-5">
                      Pending Approval
                    </span>
                  )}
                  {order.orderStatus === "accepted-by-chef" && (
                    <span className="badge badge-success">Accepted</span>
                  )}
                  {order.orderStatus === "rejected" && (
                    <span className="badge badge-error">Rejected</span>
                  )}
                  {order.orderStatus === "pending-pickup" && (
                    <span className="badge badge-info">Pending Pickup</span>
                  )}
                  {order.orderStatus === "delivered" && (
                    <span className="badge badge-success">Delivered</span>
                  )}
                  {!order.orderStatus && (
                    <span className="badge badge-warning">Pending</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrder;
