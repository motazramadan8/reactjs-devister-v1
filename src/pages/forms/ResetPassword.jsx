import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import "./form.css";
import { toast, ToastContainer } from "react-toastify";
import toastOptions from "../../utils/toastOptions";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  getResetPassword,
  resetPassword,
} from "../../redux/APIs/passwordApiCall";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.password);
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, token));
  }, [userId, token]);

  // Submit Form Handler
  const submitFormHandler = (e) => {
    e.preventDefault();

    if (password.trim() === "") {
      return toast.warn("Password is required", toastOptions);
    }

    dispatch(resetPassword(password, { userId, token }));
    navigate("/login")
  };

  return (
    <>
      <section className="form-container">
        {isError ? (
          <h1 style={{ fontSize: "30px", textAlign: "center", color: "#F6BE00" }}>Not Found</h1>
        ) : (
          <>
            <div className="form-container-group">
              <h1 className="form-title">Reset Password</h1>
              <form onSubmit={submitFormHandler} className="form">
                <div className="form-group">
                  <label className="form-label" htmlFor="password">
                    New password
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    id="password"
                    name="password"
                    placeholder="Enter Your New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="form-btn" type="submit">
                  Submit
                </button>
              </form>
            </div>
          </>
        )}
      </section>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default ResetPassword;
