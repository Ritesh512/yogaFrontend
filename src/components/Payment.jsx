import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const user = localStorage.getItem("user");
  const [formData, setFormData] = useState({
    name: JSON.parse(user).name,
    email: JSON.parse(user).email,
    upiID: "",
    mobileNo: "",
  });
  const {id} = useParams();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePayment = async () => {
    const userData = {
      email: JSON.parse(user).email,
      upiId: formData.upiID,
      batchId: id,
    };

    let result = await fetch("https://yogabackend.onrender.com/userPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
      });
    result  = await result.json();
    if(result.message==="ok"){
        localStorage.setItem("userPlan",JSON.stringify(result.userPlan));
        toast.success("Payment Successfully!", {
            position: toast.POSITION.TOP_RIGHT,
        });
        navigate('/');
    }else{
        toast.warning(result.error, {
            position: toast.POSITION.TOP_RIGHT,
        });
    }
      
  };

  return (
    <div>
      <h1>Payment Page</h1>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            disabled
          />
        </label>
        <br />

        <label>
          UPI ID:
          <input
            type="text"
            name="upiID"
            value={formData.upiID}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Mobile No:
          <input
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button type="button" onClick={handlePayment}>
          Make Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
