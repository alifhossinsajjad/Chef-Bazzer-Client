import React from "react";

import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";


const PaymentsHistory = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
 queryKey: ["paymentsHistory", user?.email],
    queryFn: async () => {
      
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  return (
   <div className="p-6">
  <h1 className="text-3xl font-bold text-orange-500 mb-6">
    Payment History <span className="text-gray-600">({payments.length})</span>
  </h1>

  <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200 bg-white">
    <table className="table">
      {/* head */}
      <thead className="bg-orange-500 text-white">
        <tr className="text-center">
          <th>#</th>
          <th>Name</th>
          <th>Amount</th>
          <th>Paid At</th>
          <th>Transaction ID</th>
        </tr>
      </thead>

      <tbody>
        {payments.map((payment, index) => (
          <tr key={payment._id} className="text-center hover:bg-gray-50">
            <td className="font-semibold">{index + 1}</td>
            <td className="font-medium">{payment.name}</td>

            <td className="text-green-600 font-bold">
              ${payment.amount}
            </td>

            <td className="text-gray-600">
              {new Date(payment.paidAt).toLocaleDateString()} <br />
              <span className="text-xs text-gray-500">
                {new Date(payment.paidAt).toLocaleTimeString()}
              </span>
            </td>

            <td>
              <span className="badge badge-outline badge-primary px-3 py-2">
                {payment.transactionId}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default PaymentsHistory;