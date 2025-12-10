import React from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const TestimonialCard = ({ review }) => {
  const { reviewerName, comment, reviewerImage, rating } = review;
  return (
    <div >
      <div className="card w-full max-w-md bg-base-100 shadow-md rounded-xl py-12 px-7 ">
        <div className="flex items-start gap-3">
          <FaQuoteLeft className="text-2xl mb-4  text-orange-400" />

          <p className="text-sm ">{comment}</p>
        </div>

        <div className="divider my-4"></div>

        <div className="flex items-center gap-3">
          <div className="border-4 border-orange-400 rounded-full">
            <img src={reviewerImage} alt="" className="rounded-full w-14 " />
          </div>
          <div>
            <h2 className="font-semibold text-gray-800">{reviewerName}</h2>

            <p className="flex gap-2 justify-center items-center">
              {" "}
              Ratting : <FaStar className="text-orange-400"/>
              {rating}{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
