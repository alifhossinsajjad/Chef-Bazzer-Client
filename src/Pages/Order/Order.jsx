import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaMapMarkerAlt,
  FaUtensils,
  FaUser,
  FaEnvelope,
  FaSortNumericUp,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FaBurger } from "react-icons/fa6";
import Loading from "../../Components/Loading/Loading";

const Order = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { status } = useRole();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  // Check if user is fraud
  useEffect(() => {
    if (status === "fraud") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Your account has been marked as fraud. You cannot place orders.",
        confirmButtonColor: "#ef4444",
      }).then(() => {
        navigate("/");
      });
    }
  }, [status, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      quantity: 1,
    },
  });

  const quantity = watch("quantity");

  // Fetch meal details
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals-details/${id}`);
      return res.data;
    },
  });

  // Update total price when quantity or meal price changes
  useEffect(() => {
    if (meal.Price && quantity) {
      setTotalPrice(meal.Price * quantity);
    }
  }, [meal.Price, quantity]);

  // Set default form values once data is loaded
  useEffect(() => {
    if (meal._id && user) {
      setValue("mealName", meal.ChefName);
      setValue("price", meal.Price);
      setValue("chefId", meal.ChefId);
      setValue("FoodName", meal.FoodName);
      setValue("userEmail", user.email);
    }
  }, [meal, user, setValue]);

  const onSubmit = (data) => {
    Swal.fire({
      title: "Confirm Order Request?",
      text: `Your total price is $${totalPrice}. This will send a request to the chef for approval.`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send request!",
    }).then((result) => {
      if (result.isConfirmed) {
        const orderData = {
          foodId: meal._id,
          mealName: meal.ChefName,
          FoodName: meal.FoodName,
          price: meal.Price,
          quantity: parseInt(data.quantity),
          totalPrice: totalPrice,
          chefId: meal.ChefId,
          userEmail: user.email,
          userAddress: data.userAddress,
          orderTime: new Date().toISOString(),
        };

        axiosSecure
          .post("/orders", orderData)
          .then((res) => {
            if (res.data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Order Request Sent!",
                text: "Your order request has been sent to the chef. You can pay after the chef accepts your order.",
                confirmButtonColor: "#f59e0b",
              });
              navigate("/dashboard/my-order");
            }
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong! Please try again.",
            });
          });
      }
    });
  };

  if (isLoading)
    return<Loading/>

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50 flex justify-center items-center px-4">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Image & Summary */}
        <div className="md:w-2/5 bg-gradient-to-br from-amber-500 to-orange-600 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-extrabold mb-2">Order Summary</h2>
            <p className="opacity-90 mb-8">Complete your purchase</p>

            <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 mb-6 border border-white/30">
              <img
                src={meal.FoodImage}
                alt={meal.ChefName}
                className="w-full h-40 object-cover rounded-xl mb-4 shadow-md"
              />
              <h3 className="text-xl font-bold mb-1">{meal.ChefName}</h3>
              <p className="text-white/80 text-sm">Chef ID: {meal.ChefId}</p>
            </div>

            <div className="mt-auto">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium opacity-80">
                  Total Payables
                </span>
                <span className="text-4xl font-bold">${totalPrice}</span>
              </div>
              <div className="h-1 w-full bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-3/5 p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center md:text-left">
            Delivery Details
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Meal Name (Read-only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                    <FaUtensils className="text-amber-500" /> Meal
                  </span>
                </label>
                <input
                  type="text"
                  {...register("mealName")}
                  readOnly
                  className="input input-bordered bg-gray-100 font-medium text-gray-500 focus:outline-none"
                />
              </div>

              {/* Price (Read-only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                    <FaMoneyBillWave className="text-amber-500" /> Unit Price
                  </span>
                </label>
                <input
                  type="number"
                  {...register("price")}
                  readOnly
                  className="input input-bordered bg-gray-100 font-medium text-gray-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Quantity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                    <FaSortNumericUp className="text-amber-500" /> Quantity
                  </span>
                </label>
                <input
                  type="number"
                  {...register("quantity", { required: true, min: 1 })}
                  className="input input-bordered focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-bold text-gray-800"
                  min="1"
                />
              </div>

              {/* Chef ID (Read-only) */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                    <FaUser className="text-amber-500" /> Chef ID
                  </span>
                </label>
                <input
                  type="text"
                  {...register("chefId")}
                  readOnly
                  className="input input-bordered bg-gray-100 font-medium text-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* User Email (Read-only) */}
            <div className="form-control ">
              <label className="label mr-2">
                <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                  <FaBurger className="text-amber-500" /> Food Name
                </span>
              </label>
              <input
                type="text"
                {...register("FoodName")}
                readOnly
                className="input input-bordered bg-gray-100 font-medium text-gray-500 focus:outline-none"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-600 flex items-center gap-2">
                  <FaEnvelope className="text-amber-500" /> Email
                </span>
              </label>
              <input
                type="email"
                {...register("userEmail")}
                readOnly
                className="input input-bordered bg-gray-100 font-medium text-gray-500 focus:outline-none"
              />
            </div>

            {/* User Address (Editable) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-amber-500" /> Delivery Address
                </span>
              </label>
              <textarea
                {...register("userAddress", { required: true })}
                className="textarea textarea-bordered h-24 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-800"
                placeholder="Enter your full delivery address here..."
              ></textarea>
              {errors.userAddress && (
                <span className="text-red-500 text-sm mt-1">
                  Address is required
                </span>
              )}
            </div>

            <button
              type="submit"
              className="btn w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl shadow-lg border-none text-lg mt-4 h-12"
            >
              Confirm Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Order;
