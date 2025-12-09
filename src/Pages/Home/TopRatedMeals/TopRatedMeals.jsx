import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaStar, FaClock, FaFire, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import Loading from "../../../Components/Loading/Loading";

const TopRatedMeals = () => {
  const axiosSecure = useAxiosSecure();

  const { data: data = {}, isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const topMeals =
    data.meals?.sort((a, b) => (b.Rating || 0) - (a.Rating || 0)).slice(0, 6) ||
    [];

  return (
    <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full mb-4">
            <FaFire className="text-amber-500" />
            <span className="font-semibold text-sm">TRENDING NOW</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            Top Rated <span className="text-amber-500">Meals</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover our most loved dishes, handcrafted by talented local chefs
          </p>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {topMeals.map((meal, index) => (
            <Link
              key={meal._id}
              to={`/meals-details/${meal._id}`}
              className="group"
            >
              <div className="bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2">
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={meal.FoodImage}
                    alt={meal.FoodName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-full flex items-center gap-1 shadow-lg">
                    <FaStar className="text-amber-500 text-sm" />
                    <span className="font-bold text-gray-800">
                      {meal.Rating || "4.5"}
                    </span>
                  </div>

                  {/* Rank Badge */}
                  {index < 3 && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-4 left-4 bg-amber-500 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                    ${meal.Price}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-amber-500 transition-colors">
                    {meal.FoodName}
                  </h3>

                  <p className="text-gray-600 mb-4 flex items-center gap-2">
                    <span className="font-semibold">By</span> {meal.ChefName}
                  </p>

                  {/* Delivery Time */}
                  <div className="flex items-center gap-2 text-gray-500 mb-4">
                    <FaClock className="text-amber-500" />
                    <span className="text-sm">
                      {meal.DeliveryTime || "30-40 mins"}
                    </span>
                  </div>

                  {/* Ingredients Preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {meal.Ingredients?.slice(0, 3).map((ingredient, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                      >
                        {ingredient}
                      </span>
                    ))}
                    {meal.Ingredients?.length > 3 && (
                      <span className="text-xs bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-semibold">
                        +{meal.Ingredients.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Order Button */}
                  <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-3 rounded-xl hover:from-amber-600 hover:to-orange-700 transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg">
                    Order Now
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/meals"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold px-8 py-4 rounded-full hover:from-amber-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            View All Meals
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopRatedMeals;
