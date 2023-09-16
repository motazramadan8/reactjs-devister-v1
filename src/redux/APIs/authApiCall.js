import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastOptions";

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success(
        `Welcome Back ${data.username.split(" ")[0]?.toString()} ${
          data.username.split(" ")[1]
            ? data.username.split(" ")[1].toString()
            : ""
        }`,
        toastOptions
      );
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
    localStorage.removeItem("userInfo");
  };
}

// Register User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/register", user);
      dispatch(
        authActions.register(
          `${data.user.split(" ")[0].toString()}, ${data.msg}`
        )
      );
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Verify Email
export function verifyEmail(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified());
    } catch (error) {
      console.log(error);
    }
  };
}
