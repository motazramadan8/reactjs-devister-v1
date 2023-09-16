import { passwordActions } from "../slices/passwordSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastOptions";

// Forgot Password
export function forgotPassword(email) {
  return async () => {
    try {
      const { data } = await request.post("/api/password/reset-password-link", {
        email,
      });
      toast.success(data.msg, toastOptions);
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Get Reset Password
export function getResetPassword(userId, token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      console.log(error);
      dispatch(passwordActions.setError());
    }
  };
}

// Reset The Password
export function resetPassword(newPassword, user) {
  return async () => {
    try {
      const { data } = await request.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        {
          password: newPassword,
        }
      );
      toast.success(data.msg, toastOptions)
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}
