import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useRole from "../../../Hooks/useRole";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaUtensils,
  FaEdit,
  FaTrash,
  FaStar,
  FaClock,
  FaUser,
  FaDollarSign,
  FaImage,
  FaList,
  FaHistory,
  FaUserTie,
  FaTimes,
} from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";

const MyMeals = () => {
  const { chefId } = useRole();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState(null);
  const [isLoadingAction, setIsLoadingAction] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const imageUrl = watch("foodImage");

  // Fetch meals
  const {
    data: meals = [],
    isLoading: isLoadingMeals,
    refetch,
  } = useQuery({
    queryKey: ["myMeals", chefId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/chef/${chefId}`);
      return res.data;
    },
  });

  // Handle Delete
  const handleDelete = async (meal) => {
    const result = await Swal.fire({
      title: "Delete this meal?",
      text: `Are you sure you want to delete "${meal.FoodName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      background: "#1f2937",
      color: "#fff",
    });

    if (result.isConfirmed) {
      try {
        setIsLoadingAction(true);
        await axiosSecure.delete(`/meals/${meal._id}`);

        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Meal has been deleted successfully.",
          confirmButtonColor: "#10b981",
          background: "#1f2937",
          color: "#fff",
        });

        // Refresh the meals list
        refetch();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to Delete",
          text: error.response?.data?.message || "Something went wrong!",
          confirmButtonColor: "#ef4444",
          background: "#1f2937",
          color: "#fff",
        });
      } finally {
        setIsLoadingAction(false);
      }
    }
  };

  // Handle Edit - open modal with meal data
  const handleEdit = (meal) => {
    setEditingMeal(meal);

    // Pre-fill form
    setValue("foodName", meal.FoodName);
    setValue("chefName", meal.ChefName);
    setValue("foodImage", meal.FoodImage);
    setValue("price", meal.Price);
    setValue("ingredients", meal.Ingredients?.join(", ") || "");
    setValue("estimatedDeliveryTime", meal.DeliveryTime);
    setValue("chefExperience", meal.ChefExperience);

    // Open modal
    setIsModalOpen(true);
  };

  // Handle Update
  const handleUpdate = async (data) => {
    if (!editingMeal) return;

    try {
      setIsLoadingAction(true);

      // Parse ingredients
      const ingredientsArray = data.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      // Prepare updated meal data
      const mealData = {
        FoodName: data.foodName,
        ChefName: data.chefName,
        FoodImage: data.foodImage || editingMeal.FoodImage,
        Price: parseFloat(data.price),
        Ingredients: ingredientsArray,
        DeliveryTime: data.estimatedDeliveryTime,
        ChefExperience: data.chefExperience,
      };

      // Send PATCH request
      await axiosSecure.patch(`/meals/${editingMeal._id}`, mealData);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Meal has been updated successfully.",
        confirmButtonColor: "#10b981",
        background: "#1f2937",
        color: "#fff",
      });

      // Close modal and refresh data
      closeModal();
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to Update",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#ef4444",
        background: "#1f2937",
        color: "#fff",
      });
    } finally {
      setIsLoadingAction(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMeal(null);
    reset();
  };

  if (isLoadingMeals) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4 md:p-6">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-500/20 rounded-lg">
            <FaUtensils className="text-3xl text-amber-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            My Meals
          </h1>
        </div>
        <p className="text-gray-300">
          Manage all meals you've created
          <span className="ml-2 px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-sm font-semibold">
            {meals.length} {meals.length === 1 ? "meal" : "meals"}
          </span>
        </p>
      </div>

      {meals.length === 0 ? (
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-12 text-center">
          <div className="inline-block p-6 bg-amber-500/10 rounded-full mb-4">
            <FaUtensils className="text-6xl text-amber-500" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No Meals Yet</h3>
          <p className="text-gray-400 max-w-md mx-auto">
            You haven't created any meals yet. Create your first culinary
            masterpiece to get started!
          </p>
          <button className="mt-6 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Create First Meal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 overflow-hidden hover:border-amber-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            >
              {/* Meal Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={meal.FoodImage}
                  alt={meal.FoodName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  ${meal.Price}
                </div>
                <div className="absolute bottom-4 left-4">
                  <h3 className="text-xl font-bold text-white drop-shadow-lg">
                    {meal.FoodName}
                  </h3>
                </div>
              </div>

              {/* Meal Details */}
              <div className="p-5">
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                    <div className="p-2 bg-amber-500/20 rounded">
                      <FaUser className="text-amber-500" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Chef</p>
                      <p className="text-white font-medium">{meal.ChefName}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <div className="p-2 bg-amber-500/20 rounded">
                        <FaStar className="text-amber-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Rating</p>
                        <p className="text-white font-medium">
                          {meal.Rating || 0} ⭐
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-gray-700/30 rounded-lg">
                      <div className="p-2 bg-amber-500/20 rounded">
                        <FaClock className="text-amber-500" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Delivery</p>
                        <p className="text-white font-medium">
                          {meal.DeliveryTime}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FaList className="text-amber-500" />
                    <p className="text-sm font-semibold text-white">
                      Ingredients
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {meal.Ingredients?.slice(0, 4).map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full text-xs font-medium"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {meal.Ingredients?.length > 4 && (
                      <span className="px-3 py-1 bg-amber-500/20 text-amber-500 rounded-full text-xs font-medium">
                        +{meal.Ingredients.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-700">
                  <button
                    onClick={() => handleEdit(meal)}
                    disabled={isLoadingAction}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
                  >
                    {isLoadingAction ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaEdit /> Edit
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(meal)}
                    disabled={isLoadingAction}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-50 transition-all"
                  >
                    {isLoadingAction ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FaTrash /> Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto z-10">
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 shadow-2xl">
              {/* Modal Header */}
              <div className="sticky top-0 bg-gray-800/90 backdrop-blur-sm rounded-t-2xl p-6 border-b border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-amber-500/20 rounded-xl">
                      <FaEdit className="text-2xl text-amber-500" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Update Meal
                      </h2>
                      <p className="text-gray-400">Edit your meal details</p>
                    </div>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                    disabled={isLoadingAction}
                  >
                    <FaTimes className="text-xl text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleUpdate)} className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-5">
                    {/* Food Name */}
                    <div className="form-group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <FaUtensils className="text-amber-500" />
                        Food Name
                      </label>
                      <input
                        type="text"
                        {...register("foodName", {
                          required: "Food name is required",
                        })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="Enter food name"
                        disabled={isLoadingAction}
                      />
                      {errors.foodName && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          ⚠️ {errors.foodName.message}
                        </p>
                      )}
                    </div>

                    {/* Chef Name */}
                    <div className="form-group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <FaUserTie className="text-amber-500" />
                        Chef Name
                      </label>
                      <input
                        type="text"
                        {...register("chefName", {
                          required: "Chef name is required",
                        })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="Enter chef name"
                        disabled={isLoadingAction}
                      />
                      {errors.chefName && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          ⚠️ {errors.chefName.message}
                        </p>
                      )}
                    </div>

                    {/* Price */}
                    <div className="form-group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <FaDollarSign className="text-amber-500" />
                        Price ($)
                      </label>
                      <div className="relative">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                          $
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0.01"
                          {...register("price", {
                            required: "Price is required",
                            min: {
                              value: 0.01,
                              message: "Price must be greater than 0",
                            },
                          })}
                          className="w-full pl-10 pr-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                          placeholder="0.00"
                          disabled={isLoadingAction}
                        />
                      </div>
                      {errors.price && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          ⚠️ {errors.price.message}
                        </p>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <FaClock className="text-amber-500" />
                        Estimated Delivery Time
                      </label>
                      <input
                        type="text"
                        {...register("estimatedDeliveryTime", {
                          required: "Delivery time is required",
                        })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="e.g., 30-40 minutes"
                        disabled={isLoadingAction}
                      />
                      {errors.estimatedDeliveryTime && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          ⚠️ {errors.estimatedDeliveryTime.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="form-group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <FaImage className="text-amber-500" />
                        Food Image URL
                      </label>
                      <input
                        type="url"
                        {...register("foodImage", {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Please enter a valid URL",
                          },
                        })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                        placeholder="https://example.com/image.jpg"
                        disabled={isLoadingAction}
                      />
                      {errors.foodImage && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          ⚠️ {errors.foodImage.message}
                        </p>
                      )}
                      {imageUrl && (
                        <div className="mt-4">
                          <p className="text-sm text-gray-400 mb-2">
                            Image Preview:
                          </p>
                          <div className="relative w-full h-40 rounded-lg overflow-hidden border-2 border-gray-600">
                            <img
                              src={imageUrl}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200' viewBox='0 0 400 200'%3E%3Crect width='400' height='200' fill='%23374151'/%3E%3Ctext x='200' y='100' text-anchor='middle' fill='%239CA3AF' font-family='Arial' font-size='14'%3EImage not available%3C/text%3E%3C/svg%3E";
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Ingredients */}
                    <div className="form-group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <FaList className="text-amber-500" />
                        Ingredients (comma-separated)
                      </label>
                      <textarea
                        {...register("ingredients", {
                          required: "Ingredients are required",
                        })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all h-32 resize-none"
                        placeholder="e.g., Chicken, Rice, Spices, Vegetables, Olive Oil"
                        disabled={isLoadingAction}
                      />
                      {errors.ingredients && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          ⚠️ {errors.ingredients.message}
                        </p>
                      )}
                    </div>

                    {/* Chef Experience */}
                    <div className="form-group">
                      <label className="flex items-center gap-2 text-sm font-semibold text-white mb-3">
                        <FaHistory className="text-amber-500" />
                        Chef Experience
                      </label>
                      <textarea
                        {...register("chefExperience", {
                          required: "Chef experience is required",
                        })}
                        className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all h-32 resize-none"
                        placeholder="Share your experience with this dish, cooking techniques, special tips..."
                        disabled={isLoadingAction}
                      />
                      {errors.chefExperience && (
                        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
                          ⚠️ {errors.chefExperience.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end gap-4 pt-8 mt-8 border-t border-gray-700">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                    disabled={isLoadingAction}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoadingAction}
                    className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 transition-all flex items-center gap-2"
                  >
                    {isLoadingAction ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <FaEdit />
                        Update Meal
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMeals;
