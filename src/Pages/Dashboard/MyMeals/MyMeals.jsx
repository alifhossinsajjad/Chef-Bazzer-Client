import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
    FaUtensils,
    FaEdit,
    FaTrash,
    FaStar,
    FaClock,
    FaUser,
} from "react-icons/fa";

const MyMeals = () => {
    // const { user } = useAuth();
    const { chefId } = useRole();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [editingMeal, setEditingMeal] = useState(null);
    const [uploading, setUploading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const imageUrl = watch("foodImage");

    // Fetch meals created by this chef
    const { data: meals = [], isLoading } = useQuery({
        queryKey: ["myMeals", chefId],
        enabled: !!chefId,
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/chef/${chefId}`);
            return res.data;
        },
    });

    // Delete mutation
    const deleteMutation = useMutation({
        mutationFn: async () => {
            const res = await axiosSecure.get(`/meals/chef/${chefId}`);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Deleted!",
                text: "Meal has been deleted successfully.",
                confirmButtonColor: "#10b981",
            });
            queryClient.invalidateQueries(["myMeals"]);
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed to Delete",
                text: error.response?.data?.message || "Something went wrong!",
                confirmButtonColor: "#ef4444",
            });
        },
    });

    // Update mutation
    const updateMutation = useMutation({
        mutationFn: async ({ mealId, mealData }) => {
            const res = await axiosSecure.patch(`/meals/${mealId}`, mealData);
            return res.data;
        },
        onSuccess: () => {
            Swal.fire({
                icon: "success",
                title: "Updated!",
                text: "Meal has been updated successfully.",
                confirmButtonColor: "#10b981",
            });
            queryClient.invalidateQueries(["myMeals"]);
            setEditingMeal(null);
            reset();
            document.getElementById("update_modal").close();
        },
        onError: (error) => {
            Swal.fire({
                icon: "error",
                title: "Failed to Update",
                text: error.response?.data?.message || "Something went wrong!",
                confirmButtonColor: "#ef4444",
            });
        },
    });

    const handleDelete = (meal) => {
        Swal.fire({
            title: "Delete this meal?",
            text: `Are you sure you want to delete "${meal.FoodName}"? This action cannot be undone.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                deleteMutation.mutate(meal._id);
            }
        });
    };

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
        document.getElementById("update_modal").showModal();
    };

    const onSubmitUpdate = async (data) => {
        try {
            setUploading(true);

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

            updateMutation.mutate({ mealId: editingMeal._id, mealData });
        } catch (error) {
            console.error("Error updating meal:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to Update",
                text: error.response?.data?.message || "Something went wrong!",
                confirmButtonColor: "#ef4444",
            });
        } finally {
            setUploading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-amber-500"></span>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">My Meals</h1>
                <p className="text-gray-600">
                    Manage all meals you've created ({meals.length} meals)
                </p>
            </div>

            {meals.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                    <div className="text-gray-400 mb-4">
                        <FaUtensils className="text-6xl mx-auto" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-700 mb-2">
                        No Meals Yet
                    </h3>
                    <p className="text-gray-500">
                        You haven't created any meals yet. Create your first meal to get started!
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {meals.map((meal) => (
                        <div
                            key={meal._id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            {/* Meal Image */}
                            <div className="relative h-48 bg-gray-200">
                                <img
                                    src={meal.FoodImage}
                                    alt={meal.FoodName}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1 rounded-full font-bold">
                                    ${meal.Price}
                                </div>
                            </div>

                            {/* Meal Details */}
                            <div className="p-5">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                    {meal.FoodName}
                                </h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaUser className="text-amber-500" />
                                        <span>{meal.ChefName}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaStar className="text-amber-500" />
                                        <span>Rating: {meal.Rating || 0}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <FaClock className="text-amber-500" />
                                        <span>{meal.DeliveryTime}</span>
                                    </div>

                                    <div className="text-sm text-gray-600">
                                        <strong>Chef ID:</strong>{" "}
                                        <span className="font-mono text-xs">{meal.ChefId}</span>
                                    </div>
                                </div>

                                {/* Ingredients */}
                                <div className="mb-4">
                                    <p className="text-sm font-semibold text-gray-700 mb-1">
                                        Ingredients:
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {meal.Ingredients?.slice(0, 3).map((ingredient, idx) => (
                                            <span
                                                key={idx}
                                                className="text-xs bg-gray-100 px-2 py-1 rounded"
                                            >
                                                {ingredient}
                                            </span>
                                        ))}
                                        {meal.Ingredients?.length > 3 && (
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                                +{meal.Ingredients.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-4 border-t border-gray-200">
                                    <button
                                        onClick={() => handleEdit(meal)}
                                        className="flex-1 btn btn-sm bg-blue-500 hover:bg-blue-600 text-white border-none"
                                    >
                                        <FaEdit /> Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(meal)}
                                        className="flex-1 btn btn-sm bg-red-500 hover:bg-red-600 text-white border-none"
                                    >
                                        <FaTrash /> Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Update Modal */}
            <dialog id="update_modal" className="modal">
                <div className="modal-box max-w-3xl">
                    <h3 className="font-bold text-2xl mb-4">Update Meal</h3>

                    <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-4">
                        {/* Food Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Food Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("foodName", { required: "Food name is required" })}
                                className="input input-bordered"
                            />
                            {errors.foodName && (
                                <span className="text-red-500 text-sm">{errors.foodName.message}</span>
                            )}
                        </div>

                        {/* Chef Name */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Chef Name</span>
                            </label>
                            <input
                                type="text"
                                {...register("chefName", { required: "Chef name is required" })}
                                className="input input-bordered"
                            />
                            {errors.chefName && (
                                <span className="text-red-500 text-sm">{errors.chefName.message}</span>
                            )}
                        </div>

                        {/* Food Image URL */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Food Image URL</span>
                            </label>
                            <input
                                type="url"
                                {...register("foodImage", {
                                    pattern: {
                                        value: /^https?:\/\/.+/,
                                        message: "Please enter a valid URL"
                                    }
                                })}
                                className="input input-bordered"
                                placeholder="https://example.com/image.jpg"
                            />
                            {errors.foodImage && (
                                <span className="text-red-500 text-sm">{errors.foodImage.message}</span>
                            )}
                            {imageUrl && (
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="mt-2 w-full max-w-xs h-32 object-cover rounded"
                                    onError={(e) => e.target.style.display = 'none'}
                                />
                            )}
                        </div>

                        {/* Price */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Price ($)</span>
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("price", { required: "Price is required" })}
                                className="input input-bordered"
                            />
                            {errors.price && (
                                <span className="text-red-500 text-sm">{errors.price.message}</span>
                            )}
                        </div>

                        {/* Ingredients */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Ingredients (comma-separated)</span>
                            </label>
                            <textarea
                                {...register("ingredients", { required: "Ingredients are required" })}
                                className="textarea textarea-bordered h-20"
                            ></textarea>
                            {errors.ingredients && (
                                <span className="text-red-500 text-sm">{errors.ingredients.message}</span>
                            )}
                        </div>

                        {/* Delivery Time */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Estimated Delivery Time</span>
                            </label>
                            <input
                                type="text"
                                {...register("estimatedDeliveryTime", { required: "Delivery time is required" })}
                                className="input input-bordered"
                            />
                            {errors.estimatedDeliveryTime && (
                                <span className="text-red-500 text-sm">{errors.estimatedDeliveryTime.message}</span>
                            )}
                        </div>

                        {/* Chef Experience */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-semibold">Chef Experience</span>
                            </label>
                            <textarea
                                {...register("chefExperience", { required: "Chef experience is required" })}
                                className="textarea textarea-bordered h-20"
                            ></textarea>
                            {errors.chefExperience && (
                                <span className="text-red-500 text-sm">{errors.chefExperience.message}</span>
                            )}
                        </div>

                        {/* Modal Actions */}
                        <div className="modal-action">
                            <button
                                type="button"
                                onClick={() => {
                                    document.getElementById("update_modal").close();
                                    reset();
                                }}
                                className="btn"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="btn bg-amber-500 hover:bg-amber-600 text-white"
                            >
                                {uploading ? (
                                    <>
                                        <span className="loading loading-spinner"></span>
                                        Updating...
                                    </>
                                ) : (
                                    "Update Meal"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyMeals;