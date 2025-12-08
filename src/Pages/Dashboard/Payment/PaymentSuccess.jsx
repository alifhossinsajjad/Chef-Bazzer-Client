import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import {
  FaCheckCircle,
  FaHome,
  FaBoxOpen,
  FaTimesCircle,
  FaArrowLeft,
} from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log("payment success update", res.data);
          if (res.data.error || res.data.success === false) {
            setError(res.data.message || "Payment confirmation failed");
          } else {
            setPaymentInfo({
              transactionId: res.data.transactionId,
              trackingId: res.data.trackingId,
              paymentId: res.data.paymentId,
            });
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Something went wrong confirming your payment.");
          setLoading(false);
        });
    } else {
      setError("No session ID found.");
      setLoading(false);
    }
  }, [sessionId, axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="card bg-base-100 w-full max-w-md shadow-xl text-center">
          <div className="card-body items-center">
            <FaTimesCircle className="text-6xl text-error mb-4" />
            <h2 className="card-title text-2xl font-bold mb-2">
              Verification Failed
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="card-actions justify-center w-full">
              <Link
                to="/dashboard/my-order"
                className="btn btn-primary text-white w-full"
              >
                <FaArrowLeft /> Return to My Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl text-center">
        <div className="card-body items-center">
          <FaCheckCircle className="text-6xl text-success mb-4" />
          <h2 className="card-title text-2xl font-bold mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your payment has been processed
            successfully.
          </p>

          <div className="bg-gray-100 p-4 rounded-lg w-full mb-6 text-left space-y-2">
            <div>
              <span className="font-semibold text-gray-500 text-sm">
                Transaction ID
              </span>
              <p className="font-mono text-sm break-all">
                {paymentInfo?.transactionId || "N/A"}
              </p>
            </div>
            {paymentInfo?.trackingId && (
              <div>
                <span className="font-semibold text-gray-500 text-sm">
                  Tracking ID
                </span>
                <p className="font-mono text-sm font-bold text-primary">
                  {paymentInfo.trackingId}
                </p>
              </div>
            )}
          </div>

          <div className="card-actions justify-center w-full gap-4">
            <Link
              to="/dashboard/my-order"
              className="btn btn-outline btn-primary flex-1"
            >
              <FaBoxOpen /> My Orders
            </Link>
            <Link to="/" className="btn btn-primary flex-1 text-white">
              <FaHome /> Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
