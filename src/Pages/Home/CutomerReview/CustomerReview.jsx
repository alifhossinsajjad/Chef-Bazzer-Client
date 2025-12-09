import React, { useState, useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaUserCircle,
} from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";

const CustomerReview = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        handleNext();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, reviews.length]);

  const handleNext = () => {
    if (!isAnimating && reviews.length > 0) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const handlePrev = () => {
    if (!isAnimating && reviews.length > 0) {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const goToSlide = (index) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-amber-500"></span>
      </div>
    );
  }

  if (reviews.length === 0) {
    return null;
  }

  // Show 3 reviews at a time
  const visibleReviews = [];
  for (let i = 0; i < 3; i++) {
    const index = (currentIndex + i) % reviews.length;
    visibleReviews.push(reviews[index]);
  }

  return (
    <div className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-amber-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-amber-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-amber-800 px-4 py-2 rounded-full mb-4 shadow-md">
            <FaStar className="text-amber-500" />
            <span className="font-semibold text-sm">TESTIMONIALS</span>
          </div>
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            What Our <span className="text-amber-500">Customers</span> Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real experiences from food lovers who've tried our amazing meals
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white hover:bg-amber-500 text-gray-800 hover:text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <FaChevronLeft className="text-xl group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white hover:bg-amber-500 text-gray-800 hover:text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          >
            <FaChevronRight className="text-xl group-hover:scale-110 transition-transform" />
          </button>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-12">
            {visibleReviews.map((review, index) => (
              <div
                key={`${review._id}-${index}`}
                className={`transform transition-all duration-500 ${
                  isAnimating ? "scale-95 opacity-50" : "scale-100 opacity-100"
                } ${index === 1 ? "md:scale-105" : ""}`}
              >
                <div className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative group hover:-translate-y-2">
                  {/* Quote Icon */}
                  <div className="absolute top-6 right-6 text-amber-100 group-hover:text-amber-200 transition-colors">
                    <FaQuoteLeft className="text-5xl" />
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4 relative z-10">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-xl ${
                          i < (review.rating || 5)
                            ? "text-amber-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-base leading-relaxed mb-6 relative z-10 line-clamp-4">
                    "
                    {review.reviewText ||
                      review.comment ||
                      "Amazing food and great service!"}
                    "
                  </p>

                  {/* Reviewer Info */}
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md">
                      {review.userPhoto ? (
                        <img
                          src={review.reviewerImage}
                          alt={review.reviewerName}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <FaUserCircle className="text-3xl" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800">
                        {review.userName || "Happy Customer"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {review.foodName || "Food Lover"}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Element */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-b-3xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-8 h-3 bg-amber-500"
                    : "w-3 h-3 bg-gray-300 hover:bg-amber-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <div className="text-4xl font-bold text-amber-500 mb-2">
              {reviews.length}+
            </div>
            <div className="text-gray-600 font-medium">Happy Customers</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <div className="text-4xl font-bold text-amber-500 mb-2">
              {(
                reviews.reduce((sum, r) => sum + (r.rating || 5), 0) /
                reviews.length
              ).toFixed(1)}
            </div>
            <div className="text-gray-600 font-medium">Average Rating</div>
          </div>
          <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md">
            <div className="text-4xl font-bold text-amber-500 mb-2">100%</div>
            <div className="text-gray-600 font-medium">Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerReview;
