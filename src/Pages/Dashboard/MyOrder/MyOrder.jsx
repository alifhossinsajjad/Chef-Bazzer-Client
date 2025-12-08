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

  const { data: orders = [], refetch } = useQuery({
    queryKey: ["myOrders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?email=${user?.email}`);
      console.log("Orders data:", res.data);
      return res.data;
    },

  });

  const handleParcelDelete = (id) => {
    console.log("delete parcel", id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/orders/${id}`).then((res) => {
          console.log(res.data);

          if (res.data.deletedCount > 0) {
            refetch();
            {
              Swal.fire("Deleted!", "Your parcel has been deleted.", "success");
            }
          }
        });
      }
    });
  };

  const haddlePayment = async (order) => {
    // Payment processing logic goes here
    const paymentInfo = {
      price: order.totalPrice || order.price, 
      orderId: order._id, 
      userEmail: order.userEmail || user?.email, 
      userName: order.userName || user?.displayName,
      mealName: order.mealName,
      trackingId: order.trackingId,
    };

    try {
      const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment initiation failed", error);
      Swal.fire("Error", "Could not initiate payment. Please try again.", "error");
    }
    // console.log(res.data);
  };

  return (
    <div>
      <div>
        <h2>add of my all parcels : {orders.length}</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead className="text-center">
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>price</th>
                <th>Payment Status</th>
                <th>Tracking Id</th>
                <th>Order Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <td>{order.mealName}</td>
                  <td>{order.price}</td>
                  {/* <td>{parcel.parcelType}</td> */}
                  <td>
                    {order.paymentStatus === "paid" ? (
                      <span className="text-green-800">Paid</span>
                    ) : (
                      // <Link to={`/dashboard/payment/${parcel._id}`}>
                      //   <button className="btn btn-primary btn-sm">Pay</button>
                      // </Link>


                      <button
                        onClick={() => haddlePayment(order)}
                        className="btn bg-amber-500 btn-sm"
                      >
                        pay
                      </button>
                    )}
                  </td>
                  <td>
                    <Link to={`/parcel-track/${order.trackingId}`}>
                      {order.trackingId}
                    </Link>
                  </td>
                  <td>{order.orderStatus}</td>
                  <td className="space-x-2">
                    <button className="btn btn-square hover:btn-primary">
                      <FaMagnifyingGlass />
                    </button>
                    <button
                      onClick={() => handleParcelDelete(order._id)}
                      className="btn btn-square hover:btn-primary"
                    >
                      <FaTrashCan />
                    </button>
                    <button className="btn btn-square hover:btn-primary">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
};

export default MyOrder;
