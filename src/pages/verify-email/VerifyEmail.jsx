import React, { useEffect } from "react";
import Footer from "../../components/footer/Footer";
import "./verify-email.css";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { verifyEmail } from "../../redux/APIs/authApiCall";

const VerifyEmail = () => {
  const { isEmailVerified } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { userId, token } = useParams();

  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [userId, token]);

  return (
    <>
      <section className="verify-email">
        {isEmailVerified ? (
          <>
            <BsFillPatchCheckFill className="verify-email-icon" />
            <h1 className="verify-email-title">
              Your Email Has Been Successfully Verified
            </h1>
            <Link to="/login" className="verify-email-link">
              Go To Login Page
            </Link>
          </>
        ) : (
          <>
            <h1 className="verify-email-not-found">Not Found</h1>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default VerifyEmail;
