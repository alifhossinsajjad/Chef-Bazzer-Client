import React, { useState } from "react";
import { useParams, Link } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { FaStar, FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../Components/Loading/Loading";

const MealsDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);

  // Fetch Meal Details
  const { data: meal = {}, isLoading } = useQuery({
    queryKey: ["meal", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals-details/${id}`);
      return res.data;
    },
  });

  // Fetch Reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
  });

  // Check if meal is favorited
  const { data: favoriteStatus = {}, refetch: refetchFavorite } = useQuery({
    queryKey: ["favorite-status", user?.email, id],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/favorites/${user.email}/${id}`);
      return res.data;
    },
  });

  // Mutation for adding review
  const { mutate: addReview } = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axiosSecure.post("/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Review submitted successfully!", "success");
      queryClient.invalidateQueries(["reviews", id]);
    },
  });

  // Mutation for adding to favorites
  const { mutate: addToFavorite } = useMutation({
    mutationFn: async (favoriteData) => {
      const res = await axiosSecure.post("/favorites", favoriteData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.message === "Already in favorites") {
        Swal.fire("Info", "This meal is already in your favorites.", "info");
      } else {
        Swal.fire("Success", "Added to favorites!", "success");
        refetchFavorite();
      }
    },
  });

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!user) return Swal.fire("Error", "Please login to review", "error");
    const form = e.target;
    const comment = form.comment.value;

    const reviewData = {
      foodId: id,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      rating,
      comment,
      email: user.email,
      date: new Date().toISOString(),
    };
    addReview(reviewData);
    form.reset();
  };

  const handleAddToFavorite = () => {
    if (!user)
      return Swal.fire("Error", "Please login to add to favorites", "error");
    const favoriteData = {
      userEmail: user.email,
      mealId: meal._id,
      mealName: meal.ChefName,
      chefId: meal.ChefId,
      chefName: meal.ChefName,
      price: meal.Price,
      addedTime: new Date().toISOString(),
    };

    addToFavorite({ ...favoriteData, mealName: meal.title || meal.ChefName });
  };



  if (isLoading)
    return<Loading/>

  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Top Section: Meal Info */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          {/* Image Side */}
          <div className="lg:w-1/2 relative h-96 lg:h-auto">
            <img
              src={meal.FoodImage}
              alt={meal.ChefName}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <button
                onClick={handleAddToFavorite}
                className={`btn btn-circle bg-white/80 hover:bg-white border-none shadow-lg text-xl ${favoriteStatus.isFavorite ? "text-red-500" : "text-gray-400"
                  }`}
                title={favoriteStatus.isFavorite ? "Already in favorites" : "Add to favorites"}
              >
                {favoriteStatus.isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </div>
          </div>

          {/* Details Side */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Chef ID: {meal.ChefId}
              </span>
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <FaStar /> {meal.Rating}
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              {meal.ChefName}
            </h1>{" "}
            {/* Displaying ChefName as main title per previous pattern, or maybe it IS the food name? */}
            <p className="text-gray-600 text-lg mb-6 leading-relaxed line-clamp-3">
              A culinary masterpiece by{" "}
              <span className="font-bold text-gray-800">{meal.ChefName}</span>.
              Experience the authentic flavors and premium ingredients.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm font-semibold uppercase">
                  Price
                </span>
                <span className="text-3xl font-bold text-gray-900">
                  ${meal.Price}
                </span>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm font-semibold uppercase">
                  Prep Time
                </span>
                <span className="text-lg font-bold text-gray-800">
                  25-30 min
                </span>
              </div>
              <div className="divider divider-horizontal"></div>
              <div className="flex flex-col">
                <span className="text-gray-400 text-sm font-semibold uppercase">
                  Delivery
                </span>
                <span className="text-lg font-bold text-gray-800">Free</span>
              </div>
            </div>
            <div className="flex gap-4 mt-auto">
              <Link
                to={`/order/${meal._id}`}
                className="flex-1 btn bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white border-none rounded-xl text-lg h-14 shadow-lg shadow-orange-500/30"
              >
                Order Now <FaShoppingCart className="ml-2" />
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Ingredients
            </h3>
            <div className="flex flex-wrap gap-3">
              {meal.ingredients ? (
                meal.ingredients.map((ing, i) => (
                  <span
                    key={i}
                    className="badge badge-lg badge-outline p-4 text-gray-600"
                  >
                    {ing}
                  </span>
                ))
              ) : (
                <>
                  <span className="badge badge-lg badge-outline p-4 text-gray-600">
                    Fresh Spices
                  </span>
                  <span className="badge badge-lg badge-outline p-4 text-gray-600">
                    Premium Meat
                  </span>
                  <span className="badge badge-lg badge-outline p-4 text-gray-600">
                    Organic Vegetables
                  </span>
                  <span className="badge badge-lg badge-outline p-4 text-gray-600">
                    Chefs Secret Sauce
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Delivery Areas
            </h3>
            <div className="flex flex-wrap gap-3">
              {meal.DeliveryArea?.map((area, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-green-50 text-green-700 rounded-lg font-semibold text-sm border border-green-100"
                >
                  📍 {area}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="mt-16 bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Customer Reviews
              </h2>
              <p className="text-gray-500 mt-1">
                What others are saying about this meal
              </p>
            </div>
            <div className="bg-amber-50 px-6 py-3 rounded-2xl flex items-center gap-3">
              <span className="text-4xl font-extrabold text-amber-500">
                {meal.Rating}
              </span>
              <div className="flex flex-col">
                <div className="rating rating-sm">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <input
                      key={star}
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-amber-400"
                      checked={Math.round(meal.Rating) >= star}
                      readOnly
                    />
                  ))}
                </div>
                <span className="text-xs text-amber-700 font-bold mt-1">
                  Overall Rating
                </span>
              </div>
            </div>
          </div>

          {/* Existing Reviews List */}
          <div className="space-y-6 mb-12">
            {reviews.length > 0 ? (
              reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100"
                >
                  <img
                    src={
                      review.reviewerImage ||
                      "https://i.ibb.co/1Jgq0jZ/user.png"
                    }
                    alt={review.reviewerName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-gray-900">
                        {review.reviewerName}
                      </h4>
                      <span className="text-gray-400 text-xs">
                        {new Date(review.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="rating rating-xs my-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <input
                          key={s}
                          type="radio"
                          className={`mask mask-star-2 ${s <= review.rating ? "bg-amber-400" : "bg-gray-300"
                            }`}
                          checked
                          readOnly
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-2xl border-dashed border-2 border-gray-200">
                <p className="text-gray-500 italic">
                  No reviews yet. Be the first to taste and tell!
                </p>
              </div>
            )}
          </div>

          {/* Add Review Form */}
          <div className="border-t border-gray-200 pt-10">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Leave a Review
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="rating rating-lg gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <input
                      key={star}
                      type="radio"
                      name="rating-9"
                      className="mask mask-star-2 bg-amber-400"
                      checked={rating === star}
                      onChange={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Your Feedback
                </label>
                <textarea
                  name="comment"
                  className="textarea textarea-bordered w-full h-32 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  placeholder="Tell us what you loved about this meal..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="btn bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-8 shadow-lg"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealsDetails;
