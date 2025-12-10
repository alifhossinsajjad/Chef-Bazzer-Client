import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useRole from "../../../Hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import {
  FaUtensils,
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaPlus,
  FaList,
  FaChartLine,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";

const ChefDashboard = () => {
  const axiosSecure = useAxiosSecure();
  const { chefId } = useRole();

  // Fetch chef statistics
  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["chefStats", chefId],
    enabled: !!chefId,
    queryFn: async () => {
      const [mealsRes, ordersRes] = await Promise.all([
        axiosSecure.get(`/meals/chef/${chefId}`),
        axiosSecure.get(`/orders`),
      ]);

      const myMeals = mealsRes.data;
      const allOrders = ordersRes.data;
      const myOrders = allOrders.filter((order) => order.chefId === chefId);

      return {
        totalMeals: myMeals.length,
        totalOrders: myOrders.length,
        pendingOrders: myOrders.filter(
          (o) => o.orderStatus === "pending-chef-approval"
        ).length,
        completedOrders: myOrders.filter((o) => o.orderStatus === "delivered")
          .length,
        activeOrders: myOrders.filter(
          (o) =>
            o.orderStatus === "accepted-by-chef" ||
            o.orderStatus === "pending-pickup"
        ).length,
      };
    },
  });

  if (isLoading) {
    return<Loading/>
  }

  const statCards = [
    {
      title: "My Meals",
      value: stats.totalMeals,
      icon: FaUtensils,
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: FaShoppingCart,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      title: "Pending Orders",
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
  ];

  const quickActions = [
    {
      title: "Create New Meal",
      description: "Add a new meal to your menu",
      icon: FaPlus,
      link: "/dashboard/create-meals",
      color: "bg-gradient-to-r from-amber-500 to-orange-600",
    },
    {
      title: "My Meals",
      description: "Manage your meals",
      icon: FaList,
      link: "/dashboard/my-meals",
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Order Requests",
      description: `${stats.pendingOrders} pending requests`,
      icon: FaClock,
      link: "/dashboard/request-order",
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
      badge: stats.pendingOrders,
    },
    {
      title: "Performance",
      description: "View your statistics",
      icon: FaChartLine,
      link: "/dashboard",
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
  ];

  return (
    <div className="p-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Chef Dashboard
        </h1>
        <p className="text-gray-600">
          Welcome back, Chef! Here's an overview of your culinary business.
        </p>
        <div className="mt-3 inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
          Chef ID: {chefId}
        </div>
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
                  {action.badge > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                      {action.badge}
                    </span>
                  )}
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

      {/* Performance Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Performance Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
            <FaUtensils className="text-4xl text-amber-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-800">
              {stats.totalMeals}
            </p>
            <p className="text-sm text-gray-600 mt-1">Meals in Menu</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <FaClock className="text-4xl text-blue-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-800">
              {stats.activeOrders}
            </p>
            <p className="text-sm text-gray-600 mt-1">Active Orders</p>
          </div>
          <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-3" />
            <p className="text-3xl font-bold text-gray-800">
              {stats.completedOrders}
            </p>
            <p className="text-sm text-gray-600 mt-1">Completed Orders</p>
          </div>
        </div>

        {stats.pendingOrders > 0 && (
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <FaClock className="text-2xl text-amber-500" />
              <div>
                <p className="font-bold text-gray-800">
                  You have {stats.pendingOrders} pending order
                  {stats.pendingOrders > 1 ? "s" : ""}!
                </p>
                <p className="text-sm text-gray-600">
                  Review and respond to customer requests
                </p>
              </div>
              <Link
                to="/dashboard/request-order"
                className="ml-auto btn btn-sm bg-amber-500 hover:bg-amber-600 text-white border-none"
              >
                View Requests
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChefDashboard;
