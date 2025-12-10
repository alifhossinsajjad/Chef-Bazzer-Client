import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
    FaCheckCircle,
    FaTimesCircle,
    FaTruck,
    FaUtensils,
    FaUser,
    FaMapMarkerAlt,
    FaClock,
    FaMoneyBillWave,
    FaBan,
} from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";

const RequestOrder = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch ALL orders (not filtered by chefId yet - we'll show all for debugging)
    const { data: allOrders = [], isLoading,refetch } = useQuery({
        queryKey: ["chefOrders", user?.email],
        enabled: !!user,
        queryFn: async () => {
            // Get all orders (not just pending)
            const res = await axiosSecure.get(`/orders`);
            console.log("All orders:", res.data);
            return res.data;
        },
    });

    // Accept order mutation
    const acceptMutation = useMutation({
        mutationFn: async (orderId) => {
            const res = await axiosSecure.patch(`/orders/${orderId}/accept`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Order Accepted!",
                text: "The customer can now proceed with payment.",
                confirmButtonColor: "#10b981",
            });
            queryClient.invalidateQueries(["chefOrders"]);
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed to Accept",
                text: error.response?.data?.message || "Something went wrong!",
                confirmButtonColor: "#ef4444",
            });
        },
    });

    // Cancel order mutation
    const cancelMutation = useMutation({
        mutationFn: async (orderId) => {
            const res = await axiosSecure.patch(`/orders/${orderId}/cancel`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: "info",
                title: "Order Cancelled",
                text: "The order has been cancelled.",
                confirmButtonColor: "#3b82f6",
            });
            queryClient.invalidateQueries(["chefOrders"]);
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed to Cancel",
                text: error.response?.data?.message || "Something went wrong!",
                confirmButtonColor: "#ef4444",
            });
        },
    });

    // Deliver order mutation
    const deliverMutation = useMutation({
        mutationFn: async (orderId) => {
            const res = await axiosSecure.patch(`/orders/${orderId}/deliver`);
            return res.data;
        },
        onSuccess: () => {
            refetch()
            Swal.fire({
                icon: "success",
                title: "Order Delivered!",
                text: "The order has been marked as delivered.",
                confirmButtonColor: "#10b981",
            });
            queryClient.invalidateQueries(["chefOrders"]);
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed to Deliver",
                text: error.response?.data?.message || "Something went wrong!",
                confirmButtonColor: "#ef4444",
            });
        },
    });

    const handleAccept = (orderId) => {
        Swal.fire({
            title: "Accept this order?",
            text: "The customer will be able to pay after you accept.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, accept it!",
        }).then((result) => {
            if (result.isConfirmed) {
                acceptMutation.mutate(orderId);
            }
        });
    };

    const handleCancel = (orderId) => {
        Swal.fire({
            title: "Cancel this order?",
            text: "This action cannot be undone.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, cancel it!",
        }).then((result) => {
            if (result.isConfirmed) {
                cancelMutation.mutate(orderId);
            }
        });
    };

    const handleDeliver = (orderId) => {
        Swal.fire({
            title: "Mark as delivered?",
            text: "Confirm that this order has been delivered to the customer.",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delivered!",
        }).then((result) => {
            if (result.isConfirmed) {
                deliverMutation.mutate(orderId);
            }
        });
    };

    const getStatusBadge = (status) => {
        const badges = {
            "pending-chef-approval": { class: "badge-warning", text: "Pending Approval" },
            "accepted-by-chef": { class: "badge-success", text: "Accepted" },
            "rejected": { class: "badge-error", text: "Rejected" },
            "cancelled": { class: "badge-error", text: "Cancelled" },
            "pending-pickup": { class: "badge-info", text: "Pending Pickup" },
            "delivered": { class: "badge-success", text: "Delivered" },
        };
        const badge = badges[status] || { class: "badge-ghost", text: status };
        return <span className={`badge ${badge.class}`}>{badge.text}</span>;
    };

    const getPaymentBadge = (status) => {
        return status === "paid" ? (
            <span className="badge badge-success">Paid</span>
        ) : (
            <span className="badge badge-warning">Unpaid</span>
        );
    };

    if (isLoading) {
        return <Loading/>
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    Order Requests
                </h1>
                <p className="text-gray-600">
                    Manage all orders for your meals
                </p>
                <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Total Orders:</strong> {allOrders.length}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                        Showing all orders for debugging. Filter by chefId will be added after fixing the ID mismatch.
                    </p>
                </div>
            </div>

            {allOrders.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <FaUtensils className="text-6xl mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                        No Orders Yet
                    </h3>
                    <p className="text-gray-500">
                        No orders have been placed yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {allOrders.map((order) => {
                        const isAccepted = order.orderStatus === "accepted-by-chef" || order.orderStatus === "pending-pickup";
                        const isCancelled = order.orderStatus === "cancelled";
                        const isDelivered = order.orderStatus === "delivered";
                        const isPending = order.orderStatus === "pending-chef-approval";

                        return (
                            <div
                                key={order._id}
                                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
                            >
                                <div className="flex flex-col gap-6">
                                    {/* Order Details Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        <div className="flex items-start gap-3">
                                            <FaUtensils className="text-amber-500 text-xl mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Food Name</p>
                                                <p className="text-gray-800 font-bold">{order.FoodName}</p>
                                                <p className="text-xs text-gray-400 font-mono mt-1">
                                                    Chef ID: {order.chefId}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <FaMoneyBillWave className="text-amber-500 text-xl mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Price & Quantity</p>
                                                <p className="text-gray-800 font-bold">
                                                    ${order.price} × {order.quantity} = ${order.totalPrice}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="text-amber-500 text-xl mt-1">📊</div>
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Status</p>
                                                <div className="flex gap-2 mt-1">
                                                    {getStatusBadge(order.orderStatus)}
                                                    {getPaymentBadge(order.paymentStatus)}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <FaUser className="text-amber-500 text-xl mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Customer</p>
                                                <p className="text-gray-800 font-semibold">{order.userEmail}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <FaClock className="text-amber-500 text-xl mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Order Time</p>
                                                <p className="text-gray-800 font-semibold">
                                                    {new Date(order.orderTime).toLocaleString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <FaMapMarkerAlt className="text-amber-500 text-xl mt-1" />
                                            <div>
                                                <p className="text-sm text-gray-500 font-medium">Delivery Address</p>
                                                <p className="text-gray-800 text-sm">{order.userAddress}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                                        <button
                                            onClick={() => handleCancel(order._id)}
                                            disabled={isCancelled || isDelivered || cancelMutation.isLoading}
                                            className="btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none disabled:bg-gray-300"
                                        >
                                            <FaBan className="mr-2" />
                                            Cancel
                                        </button>

                                        <button
                                            onClick={() => handleAccept(order._id)}
                                            disabled={!isPending || acceptMutation.isLoading}
                                            className="btn btn-sm bg-green-500 hover:bg-green-600 text-white border-none disabled:bg-gray-300"
                                        >
                                            <FaCheckCircle className="mr-2" />
                                            Accept
                                        </button>

                                        <button
                                            onClick={() => handleDeliver(order._id)}
                                            disabled={!isAccepted || isDelivered || deliverMutation.isLoading}
                                            className="btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none disabled:bg-gray-300"
                                        >
                                            <FaTruck className="mr-2" />
                                            Deliver
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                <p className="text-sm text-amber-800">
                    <strong>Button Rules:</strong>
                </p>
                <ul className="text-xs text-amber-700 mt-2 space-y-1 list-disc list-inside">
                    <li><strong>Cancel:</strong> Available for all orders except cancelled/delivered</li>
                    <li><strong>Accept:</strong> Only for pending orders</li>
                    <li><strong>Deliver:</strong> Only for accepted/pending-pickup orders</li>
                </ul>
            </div>
        </div>
    );
};

export default RequestOrder;