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
    <div>
      <h1 className="text-5xl text-secondary">
        {" "}
        peyments history : {payments.length}
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Paid At</th>
              <th>Transaction Id</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.name}</td>
                <td>${payment.amount}</td>
                <td>{payment.paidAt}</td>
                <td>{payment.transactionId}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsHistory;