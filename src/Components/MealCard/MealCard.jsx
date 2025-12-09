import React from "react";
import { MdFastfood } from "react-icons/md";
import { Link } from "react-router";

const MealCard = ({ meal }) => {
  const { ChefName, FoodImage, Price, Rating, DeliveryArea, ChefId, _id } =
    meal;


    console.log("delivery area from mealcard",DeliveryArea);
  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full border border-gray-100">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={FoodImage}
          alt={ChefName}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-md z-10">
          <span className="text-amber-600 font-bold text-lg">${Price}</span>
        </div>
        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow relative">
        {/* Rating Badge */}
        <div className="absolute -top-5 left-6 bg-amber-500 text-white px-3 py-1 rounded-lg shadow-md flex items-center gap-1 text-sm font-bold">
          <span>⭐</span> {Rating}
        </div>

        <div className="mt-2 mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-amber-600 transition-colors line-clamp-1">
            {ChefName}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            Chef ID:{" "}
            <span className="font-semibold text-gray-700">{ChefId}</span>
          </p>
        </div>

        {/* Delivery Tags */}
        <div className="mb-6 flex-grow">
          <div className="flex flex-wrap gap-2">
            {DeliveryArea?.slice(0, 5).map((area, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-600 text-xs font-semibold rounded-full"
              >
                {area}
              </span>
            ))}
            {DeliveryArea?.length > 3 && (
              <span className="px-3 py-1 bg-gray-50 border border-gray-200 text-gray-400 text-xs font-semibold rounded-full">
                +{DeliveryArea.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <Link
            to={`/meals-details/${_id}`}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-300 shadow-md group-hover:shadow-lg"
          >
            <span>View Details</span>
            <MdFastfood className="text-lg" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
