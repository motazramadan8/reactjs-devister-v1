import React, { useState } from 'react'
import Footer from "../../components/footer/Footer"
import { Link } from 'react-router-dom'
import "./form.css"
import { toast, ToastContainer } from "react-toastify"
import { useDispatch } from "react-redux"
import { loginUser } from '../../redux/APIs/authApiCall'
import toastOptions from "../../utils/toastOptions"

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
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

    if (password.trim() === "") {
      return toast.warn('Password is required', toastOptions);
    }

    dispatch(loginUser({ email, password }))
  }
  
  return (
    <>
      <section className="form-container">
        <div className="form-container-group">
          <h1 className="form-title">Welcome Back</h1>
          <form onSubmit={submitFormHandler} className="form">
            <div className="form-group">
              <label className="form-label" htmlFor="email">email</label>
              <input 
                type="email"
                noValidate
                className="form-input"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password">password</label>
              <input 
                type="password"
                className="form-input"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="form-btn" type="submit">Login</button>
          </form>
          <div className="form-footer">
            Did You Forgot Your Password? 
            <Link className="form-footer-a" to="/forgot-password" style={{ marginLeft: "5px" }}>Forgot Password</Link>
          </div>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  )

}

export default Login