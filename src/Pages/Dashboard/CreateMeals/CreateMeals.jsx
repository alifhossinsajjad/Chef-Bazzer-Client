import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaUtensils, FaImage, FaStar, FaClock, FaUser } from "react-icons/fa";

const CreateMeals = () => {
  const { user } = useAuth();
  const { chefId } = useRole();
  const axiosSecure = useAxiosSecure();
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const imageUrl = watch("foodImage");

  const onSubmit = async (data) => {
    try {
      setUploading(true);

      // Parse ingredients (comma-separated)
      const ingredientsArray = data.ingredients
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
      const deliveryArea = data.deliveryArea
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);

      // Prepare meal data
      const mealData = {
        FoodName: data.foodName,
        ChefName: data.chefName,
        FoodImage: data.foodImage,
        Price: parseFloat(data.price),
        Rating: 0,
        Ingredients: ingredientsArray,
        DeliveryTime: data.estimatedDeliveryTime,
        ChefExperience: data.chefExperience,
        ChefId: chefId,
        DeliveryArea: deliveryArea || "Local",
        userEmail: user.email,
        createdAt: new Date().toISOString(),
      };

      // Send to backend
      const response = await axiosSecure.post("/meals", mealData);

      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Meal Created!",
          text: "Your meal has been added successfully.",
          confirmButtonColor: "#10b981",
        });
        reset();
      }
    } catch (error) {
      console.error("Error creating meal:", error);
      Swal.fire({
        icon: "error",
        title: "Failed to Create Meal",
        text: error.response?.data?.message || "Something went wrong!",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Create New Meal
        </h1>
        <p className="text-gray-600">Add a new delicious meal to your menu</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Food Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2 mr-3">
                <FaUtensils className="text-amber-500" /> Food Name
              </span>
            </label>
            <input
              type="text"
              {...register("foodName", { required: "Food name is required" })}
              className="input input-bordered focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="Grilled Chicken Salad"
            />
            {errors.foodName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.foodName.message}
              </span>
            )}
          </div>

          {/* Chef Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2 mr-3">
                <FaUser className="text-amber-500" /> Chef Name
              </span>
            </label>
            <input
              type="text"
              {...register("chefName", { required: "Chef name is required" })}
              className="input input-bordered focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="Your name"
            />
            {errors.chefName && (
              <span className="text-red-500 text-sm mt-1">
                {errors.chefName.message}
              </span>
            )}
          </div>

          {/* Food Image URL */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-2 mr-3">
                <FaImage className="text-amber-500" /> Food Image URL
              </span>
            </label>
            <input
              type="url"
              {...register("foodImage", {
                required: "Image URL is required",
                pattern: {
                  value: /^https?:\/\/.+/,
                  message: "Please enter a valid URL",
                },
              })}
              className="input input-bordered focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="https://example.com/image.jpg"
            />
            {errors.foodImage && (
              <span className="text-red-500 text-sm mt-1">
                {errors.foodImage.message}
              </span>
            )}
            {imageUrl && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full max-w-md h-64 object-cover rounded-xl border-2 border-gray-200"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Price and Rating */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 mb-3">
                  Price ($)
                </span>
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0.01, message: "Price must be greater than 0" },
                })}
                className="input input-bordered focus:border-amber-500 focus:ring-1 focus:ring-amber-500 "
                placeholder="12.99"
              />
              {errors.price && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700 flex items-center gap-2">
                  <FaStar className="text-amber-500" /> Initial Rating
                </span>
              </label>
              <input
                type="text"
                value="0 (Will be updated by customer reviews)"
                disabled
                className="input input-bordered bg-gray-100"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 mr-2">
                Ingredients
              </span>
            </label>
            <textarea
              {...register("ingredients", {
                required: "Ingredients are required",
              })}
              className="textarea textarea-bordered h-24 focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="Chicken breast, Lettuce, Tomatoes, Cucumber, Olive oil (comma-separated)"
            ></textarea>
            
            {errors.ingredients && (
              <span className="text-red-500 text-sm mt-1">
                {errors.ingredients.message}
              </span>
            )}
          </div>

          {/* Estimated Delivery Time */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 flex items-center gap-3 mr-2">
                <FaClock className="text-amber-500" /> Estimated Delivery Time
              </span>
            </label>
            <input
              type="text"
              {...register("estimatedDeliveryTime", {
                required: "Delivery time is required",
              })}
              className="input input-bordered focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="e.g., 30 minutes"
            />
            {errors.estimatedDeliveryTime && (
              <span className="text-red-500 text-sm mt-1">
                {errors.estimatedDeliveryTime.message}
              </span>
            )}
          </div>

          {/* Delivery Area */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 mr-3">
                Delivery Area
              </span>
            </label>
            <input
              type="text"
              {...register("deliveryArea")}
              className="input input-bordered focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder="e.g., Downtown, City Center (optional)"
            />
          </div>

          {/* Chef Experience */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold text-gray-700 mr-3">
                Chef's Experience
              </span>
            </label>
            <textarea
              {...register("chefExperience", {
                required: "Chef experience is required",
              })}
              className="textarea textarea-bordered  focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
              placeholder=" 5 years of experience in Mediterranean cuisine"
            ></textarea>
            {errors.chefExperience && (
              <span className="text-red-500 text-sm mt-1">
                {errors.chefExperience.message}
              </span>
            )}
          </div>

          {/* Chef ID and Email (Read-only) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-600">
                  Chef ID
                </span>
              </label>
              <input
                type="text"
                value={chefId || "Not assigned"}
                disabled
                className="input input-bordered bg-gray-100 font-mono"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-600">
                  User Email
                </span>
              </label>
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="input input-bordered bg-gray-100"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={uploading || !chefId}
              className="btn w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none rounded-xl text-lg h-14 shadow-lg disabled:bg-gray-300"
            >
              {uploading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating...
                </>
              ) : (
                "Create Meal"
              )}
            </button>
            {!chefId && (
              <p className="text-red-500 text-sm mt-2 text-center">
                You need to be approved as a chef to create meals
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateMeals;
