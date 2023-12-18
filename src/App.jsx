import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Payment from "./components/Payment";
import PageNotFound from "./components/PageNotFound";
import Navbar from "./components/Navbar";
import UserBatch from "./components/userBatch";
import Private from "./components/Private";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route elements={<Private />}>
            <Route index element={<Home />} />
            <Route path="/payment/batch/:id" element={<Payment />} />
            <Route path="/batch" element={<UserBatch />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
