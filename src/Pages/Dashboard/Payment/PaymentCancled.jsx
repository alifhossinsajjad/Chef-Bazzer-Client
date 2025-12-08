import React from "react";
import { Link } from "react-router";
import { FaTimesCircle, FaArrowLeft } from "react-icons/fa";

const PaymentCancled = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl text-center">
        <div className="card-body items-center">
          <FaTimesCircle className="text-6xl text-error mb-4" />
          <h2 className="card-title text-2xl font-bold mb-2">Payment Cancelled</h2>
          <p className="text-gray-600 mb-6">
            The payment process was cancelled or failed. No charges were made.
          </p>

          <div className="card-actions justify-center w-full">
            <Link to="/dashboard/my-order" className="btn btn-primary text-white w-full">
              <FaArrowLeft /> Return to My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancled;
