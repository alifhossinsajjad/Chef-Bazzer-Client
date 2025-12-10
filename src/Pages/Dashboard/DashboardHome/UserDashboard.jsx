import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
    FaShoppingCart,
    FaClock,
    FaCheckCircle,
    FaUtensils,
    FaHeart,
    FaSearch,
    FaStar,
    FaTruck,
} from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";


const UserDashboard = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch user statistics
    const { data: stats = {}, isLoading } = useQuery({
        queryKey: ["userStats", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const [ordersRes, favoritesRes] = await Promise.all([
                axiosSecure.get(`/orders/user/${user.email}`),
                axiosSecure.get(`/favorites/${user.email}`),
            ]);

            const myOrders = ordersRes.data;

            return {
                totalOrders: myOrders.length,
                pendingOrders: myOrders.filter(
                    (o) =>
                        o.orderStatus === "pending-chef-approval" ||
                        o.orderStatus === "accepted-by-chef"
                ).length,
                completedOrders: myOrders.filter((o) => o.orderStatus === "delivered")
                    .length,
                favorites: favoritesRes.data.length || 0,
            };
        },
    });

    if (isLoading) {
        return <Loading/>
    }

    const statCards = [
        {
            title: "Total Orders",
            value: stats.totalOrders,
            icon: FaShoppingCart,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            iconColor: "text-blue-500",
        },
        {
            title: "Active Orders",
            value: stats.pendingOrders,
            icon: FaClock,
            color: "from-orange-500 to-red-600",
            bgColor: "bg-orange-50",
            iconColor: "text-orange-500",
        },
        {
            title: "Completed",
            value: stats.completedOrders,
            icon: FaCheckCircle,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            iconColor: "text-green-500",
        },
        {
            title: "Favorites",
            value: stats.favorites,
            icon: FaHeart,
            color: "from-pink-500 to-red-600",
            bgColor: "bg-pink-50",
            iconColor: "text-pink-500",
        },
    ];

    const quickActions = [
        {
            title: "Browse Meals",
            description: "Explore delicious meals",
            icon: FaSearch,
            link: "/meals",
            color: "bg-gradient-to-r from-amber-500 to-orange-600",
        },
        {
            title: "My Orders",
            description: "Track your orders",
            icon: FaShoppingCart,
            link: "/dashboard/my-order",
            color: "bg-gradient-to-r from-blue-500 to-blue-600",
        },
        {
            title: "Favorites",
            description: "Your saved meals",
            icon: FaHeart,
            link: "/dashboard/favorite",
            color: "bg-gradient-to-r from-pink-500 to-red-600",
        },
        {
            title: "All Meals",
            description: "View full menu",
            icon: FaUtensils,
            link: "/meals",
            color: "bg-gradient-to-r from-purple-500 to-purple-600",
        },
    ];

    return (
        <div className="p-6">
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    Welcome back, {user?.displayName || "Food Lover"}!
                </h1>
                <p className="text-gray-600">
                    Ready to discover your next delicious meal?
                </p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                                <stat.icon className={`text-2xl ${stat.iconColor}`} />
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                            </div>
                        </div>
                        <h3 className="text-gray-600 font-medium">{stat.title}</h3>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {quickActions.map((action, index) => (
                        <Link
                            key={index}
                            to={action.link}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:-translate-y-1 group relative overflow-hidden"
                        >
                            <div
                                className={`absolute inset-0 ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                            ></div>
                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-3">
                                    <div
                                        className={`p-3 rounded-xl ${action.color} text-white group-hover:scale-110 transition-transform`}
                                    >
                                        <action.icon className="text-2xl" />
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-1">
                                    {action.title}
                                </h3>
                                <p className="text-sm text-gray-600">{action.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Order Status Overview */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Order Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
                        <FaShoppingCart className="text-4xl text-blue-500 mx-auto mb-3" />
                        <p className="text-3xl font-bold text-gray-800">
                            {stats.totalOrders}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Total Orders</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200">
                        <FaTruck className="text-4xl text-orange-500 mx-auto mb-3" />
                        <p className="text-3xl font-bold text-gray-800">
                            {stats.pendingOrders}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">In Progress</p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
                        <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
                        <p className="text-3xl font-bold text-gray-800">
                            {stats.completedOrders}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Delivered</p>
                    </div>
                </div>
            </div>

            {/* Featured Section */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl shadow-lg p-8 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Hungry?</h2>
                        <p className="text-amber-100 mb-4">
                            Browse our delicious meals from local chefs
                        </p>
                        <Link
                            to="/meals"
                            className="btn bg-white text-amber-600 hover:bg-amber-50 border-none"
                        >
                            <FaUtensils className="mr-2" />
                            Explore Meals
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <FaUtensils className="text-8xl text-white opacity-20" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;