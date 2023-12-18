import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function formatDate(inputDate) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const date = new Date(inputDate);
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const UserBatch = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);
  const [batch, setBatch] = useState();
  const [payment, setPayment] = useState();
  const [isRegistered, setIsRegistered] = useState(false);

  const batches = {
    1: "6-7AM",
    2: "7-8AM",
    3: "8-9AM",
    4: "5-6PM",
  };

  useEffect(() => {
    async function fetchBatchDetails() {
      try {
        let result = await fetch("https://yogabackend.onrender.com/getUserPlan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });

        result = await result.json();

        if (result.message === "ok") {
          const formattedDate = formatDate(result.userPlan.validTill);
          const paymentDate = formatDate(result.userPlan.registrationDate);

          setIsRegistered(true);

          setBatch({ batchTime: batches[result.userPlan.batchId], validTill: formattedDate });

          setPayment({ amount: 500, date: paymentDate, refNo: result.userPlan.refNo });
        } else {
          toast.warning(result.error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        toast.error("An error occurred while fetching batch details", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }

    fetchBatchDetails();

  }, []);

  return (
    <div className="user-batch-container">
    <h1>Your Plan Details</h1>
      {isRegistered ? (
        <>
          <div className="user-details">
            <h2>User Details</h2>
            <p>Name : {user.name}</p>
            <p>Email : {user.email}</p>
            <p>Age : {user.age}</p>
          </div>

          <div className="batch-details">
            <h2>Batch Details</h2>
            <p>Batch Time : {batch.batchTime}</p>
            <p>Valid Till : {batch.validTill}</p>
          </div>

          <div className="payment-details">
            <h2>Payment Details</h2>
            <p>Amount Paid : {payment.amount}</p>
            <p>Payment Date : {payment.date}</p>
            <p>Reference No. : {payment.refNo}</p>
            {/* Add more payment details as needed */}
          </div>
        </>
      ) : (
        <p>User has not registered for a batch yet.</p>
      )}
    </div>
  );
};

export default UserBatch;
