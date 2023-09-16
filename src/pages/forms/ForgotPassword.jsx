import React, { useState } from 'react'
import Footer from "../../components/footer/Footer"
import "./form.css"
import { toast, ToastContainer } from "react-toastify"
import toastOptions from "../../utils/toastOptions"
import { useDispatch } from "react-redux"
import { forgotPassword } from '../../redux/APIs/passwordApiCall'

const ForgotPassword = () => {
  const [email,setEmail] = useState("");
  const dispatch = useDispatch()

  // Submit Form Handler
  const submitFormHandler = (e) => {
    e.preventDefault()

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (email.trim() === "") {
      return toast.warn('Email is required', toastOptions);
    } else if (!emailRegex.test(email.trim())) 
      return toast.warn(
        `Invalid Email.
         Email must be contain "@" and "." in their correct places and must be at least 6 characters `,
         toastOptions
      );

    console.table({ email })
    dispatch(forgotPassword(email))
  }
  
  return (
    <>
      <section className="form-container">
        <div className="form-container-group">
          <h1 className="form-title">Find Your Account</h1>
          <form onSubmit={submitFormHandler} className="form">
            <div className="form-group">
              <label 
                className="form-label" 
                htmlFor="email"
              >
                Enter your email address to search for your account.
              </label>
              <input 
                type="text"
                className="form-input"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="form-btn" type="submit">Search</button>
          </form>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  )

}

export default ForgotPassword