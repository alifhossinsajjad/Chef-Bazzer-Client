import React, { useState } from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrash, FaEdit, FaStar, FaQuoteLeft } from "react-icons/fa";
import { useParams } from "react-router";
import Loading from "../../Components/Loading/Loading";

const MyReview = () => {
  const {user} = useAuth()
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [editingReview, setEditingReview] = useState(null);
const [openModal, setOpenModal] = useState(false);


  const {
    data: reviews = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/reviews/${id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your review has been deleted.", "success");
          }
        } catch (error) {
          console.error("Error deleting review:", error);
          Swal.fire("Error", "Could not delete review.", "error");
        }
      }
    });
  };


const handleUpdateClick = (review) => {
  setEditingReview(review);
  setOpenModal(true);
};


const closeModal = () => {
  setOpenModal(false);
  setEditingReview(null);
};



  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;

    try {
      const res = await axiosSecure.patch(`/reviews/${editingReview._id}`, {
        rating,
        comment,
      });

       if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire("Success", "Review updated successfully", "success");
      closeModal();
    }
    } catch (error) {
      console.error("Error updating review:", error);
      Swal.fire("Error", "Could not update review.", "error");
    }
  };

  if (isLoading) {
    return <Loading/>
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        My Reviews <span className="text-orange-500">({reviews.length})</span>
      </h2>

      {reviews.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">You haven't posted any reviews yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="card bg-base-100 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="card-body">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="card-title text-orange-600 font-bold truncate w-2/3">
                    {review.mealTitle || review.mealName || "Meal Review"}
                  </h3>
                  <div className="flex items-center bg-yellow-100 px-2 py-1 rounded-full text-yellow-700 text-sm font-bold">
                    <FaStar className="mr-1" /> {review.rating}
                  </div>
                </div>

                <div className="relative pl-6 py-2">
                  <FaQuoteLeft className="absolute top-2 left-0 text-gray-300 text-xl" />
                  <p className="text-gray-600 italic line-clamp-3 text-sm">
                    {review.comment}
                  </p>
                </div>

                <div className="text-xs text-gray-400 mt-2">
                  {/* Assuming review has some date field, checking properties */}
                  Posted on:{" "}
                  {review.date
                    ? new Date(review.date).toLocaleDateString()
                    : "Unknown Date"}
                </div>

                <div className="card-actions justify-between mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <img src={user.photoURL} className="w-10 h-10 rounded-full" alt="" />
                    <p>Name : {review.reviewerName}</p>
                  </div>
                  <div>
                    <button
                    onClick={() => handleUpdateClick(review)}
                    className="btn btn-sm btn-ghost text-blue-600 hover:bg-blue-50"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="btn btn-sm btn-ghost text-red-600 hover:bg-red-50"
                  >
                    <FaTrash />
                  </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
    <dialog open={openModal} className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    
    <button
      className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
      onClick={closeModal}
    >
      ✕
    </button>

    <h3 className="font-bold text-lg mb-4 text-orange-600">
      Update Review
    </h3>

    {editingReview && (
      <form onSubmit={handleUpdateSubmit} className="space-y-4">

        <input
          type="number"
          name="rating"
          min="1"
          max="5"
          step="0.1"
          defaultValue={editingReview.rating}
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="comment"
          defaultValue={editingReview.comment}
          className="textarea textarea-bordered h-24"
          required
        ></textarea>

        <div className="modal-action">
          <button type="submit" className="btn bg-orange-500 text-white">
            Save Changes
          </button>
        </div>
      </form>
    )}
  </div>
</dialog>

    </div>
  );
};

export default MyReview;