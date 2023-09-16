import React, { useState } from 'react'
import Footer from "../../components/footer/Footer"
import { Link, useNavigate } from 'react-router-dom'
import "./form.css"
import { toast, ToastContainer } from "react-toastify"
import toastOptions from "../../utils/toastOptions"
import { useDispatch, useSelector } from "react-redux"
import { registerUser } from '../../redux/APIs/authApiCall'

const Register = () => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const dispatch = useDispatch()
  const { registerMessage } = useSelector(state => state.auth)

  // Submit Form Handler
  const submitFormHandler = (e) => {
    e.preventDefault()

    if (username.trim() === "" || username.trim().length <= 2 || username.trim().length >= 100) 
      return toast.warn(
      `Invalid Username.
       It must be at least 3 characters 
       and must be less than 100 characters`,
       toastOptions
      );

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (email.trim() === "") {
      return toast.warn('Email is required', toastOptions);
    } else if (!emailRegex.test(email.trim())) 
      return toast.warn(
        `Invalid Email.
         Email must be contain "@" and "." in their correct places and must be at least 6 characters `,
         toastOptions
      );
    if (email.trim().includes("yahoo")) {
      return toast.warn(
        `Invalid Email.
         Please Register With Gmail Account`,
         toastOptions
      );
    }

    if (password.trim() === "") {
      return toast.warn('Password is required', toastOptions);
    }

    dispatch(registerUser({ username, email, password }))
  }
  const navigate = useNavigate()
  if (registerMessage) {
    toast.success(registerMessage, toastOptions)
    navigate("/login")
  }

  return (
    <>
      <section className="form-container">
        <div className="form-container-group">
          <h1 className="form-title">Register Now</h1>
          <form onSubmit={submitFormHandler} className="form">
            <div className="form-group">
              <label className="form-label" htmlFor="username">username</label>
              <input 
                type="text"
                className="form-input"
                id="username"
                name="username"
                placeholder="Enter Your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
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
            <button className="form-btn" type="submit">Register</button>
          </form>
          <div className="form-footer">
            Already Have An Account?
            <Link className="form-footer-link" to="/login" style={{ marginLeft: "5px" }}>Login</Link>
          </div>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  )

}

export default Register