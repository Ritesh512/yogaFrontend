import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(storedUser);

  const [classes, setClasses] = useState([
    { srNo: 1, batchTime: "6-7AM", cost: 500 },
    { srNo: 2, batchTime: "7-8AM", cost: 500 },
    { srNo: 3, batchTime: "8-9AM", cost: 500 },
    { srNo: 4, batchTime: "5-6PM", cost: 500 },
  ]);
  const [active, setActive] = useState(false);
  const [activeId, setActiveId] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchBatchDetails() {
      let result = await fetch("https://yogabackend.onrender.com/getUserPlan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: user.email }),
      });
      result = await result.json();
      if (result.message === "ok") {
        setActive(result.userPlan.isActive);
        setActiveId(Number(result.userPlan.batchId));
      }
    }

    async function validateUserPlan() {
      try {
        let res = await fetch("https://yogabackend.onrender.com/checkAndDeleteUserPlan", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: user.email }),
        });
        res = await res.json();
        if (res.message === "ok" || res.message === "UserPlan not found") {
          toast.success("Add New Plan", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }else if(res.message !== "UserPlan is still valid"){
          throw new Error(res.message);
        }
      } catch (error) {
        toast.success("Resgister For a Batch", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      fetchBatchDetails();
    }
    localStorage.getItem("user")?validateUserPlan():navigate("/signup");
  }, []);

  const handleJoinClick = (srNo) => {
    navigate(`/payment/batch/${srNo}`);
  };

  return (
    <div>
      <h1>Yoga Classes</h1>
      <table>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Batch Time</th>
            <th>Cost</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((yogaClass) => (
            <tr key={yogaClass.srNo}>
              <td>{yogaClass.srNo}</td>
              <td>{yogaClass.batchTime}</td>
              <td>{yogaClass.cost}</td>
              <td>
                <button
                  disabled={active ? activeId !== yogaClass.srNo : false}
                  style={{
                    pointerEvents:
                      active || activeId === yogaClass.srNo ? "none" : "auto",
                  }}
                  onClick={() => {
                    handleJoinClick(yogaClass.srNo);
                  }}
                >
                  {active
                    ? activeId !== yogaClass.srNo
                      ? "Inactive"
                      : "Active"
                    : "Join"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
