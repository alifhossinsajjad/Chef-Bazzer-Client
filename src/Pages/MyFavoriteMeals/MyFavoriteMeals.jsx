import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import useAuth from '../../Hooks/useAuth';

import Swal from 'sweetalert2';
import { FaTrash, FaUtensils } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';

const MyFavoriteMeals = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: favoriteMeals = [], isLoading, refetch } = useQuery({
        queryKey: ["favoriteMeals", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/favorites/${user.email}`);
            return res.data;
        },
    });

    const handleDelete = (favoriteId, mealName) => {
        Swal.fire({
            title: "Remove from Favorites?",
            text: `Do you want to remove "${mealName}" from your favorites?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#ef4444",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, remove it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/favorites/${user.email}/${favoriteId}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire("Removed!", "Meal removed from favorites successfully.", "success");
                    }
                } catch (error) {
                    console.error("Error deleting favorite:", error);
                    Swal.fire("Error", "Could not remove from favorites.", "error");
                }
            }
        });
    };

    if (isLoading) {
        return<Loading/>
    }

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
                My Favorite Meals <span className="text-orange-500">({favoriteMeals.length})</span>
            </h2>

            {favoriteMeals.length === 0 ? (
                <div className="text-center text-gray-500 py-12">
                    <FaUtensils className="mx-auto text-6xl text-gray-300 mb-4" />
                    <p className="text-lg">You haven't added any favorite meals yet.</p>
                    <p className="text-sm mt-2">Start exploring and add your favorite dishes!</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
                    <table className="table w-full">
                        <thead>
                            <tr className="text-center bg-gray-50">
                                <th>SN</th>
                                <th>Meal Name</th>
                                <th>Chef Name</th>
                                <th>Price</th>
                                <th>Date Added</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favoriteMeals.map((favorite, index) => (
                                <tr key={favorite._id} className="text-center hover:bg-gray-50">
                                    <td>{index + 1}</td>
                                    <td className="font-semibold text-gray-800">
                                        {favorite.mealName || "N/A"}
                                    </td>
                                    <td>{favorite.chefName || "N/A"}</td>
                                    <td className="font-bold text-orange-600">
                                        ${favorite.price || "N/A"}
                                    </td>
                                    <td className="text-sm text-gray-500">
                                        {favorite.addedTime
                                            ? new Date(favorite.addedTime).toLocaleDateString()
                                            : "Unknown"}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(favorite.mealId, favorite.mealName)}
                                            className="btn btn-sm btn-error text-white"
                                            title="Remove from Favorites"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyFavoriteMeals;