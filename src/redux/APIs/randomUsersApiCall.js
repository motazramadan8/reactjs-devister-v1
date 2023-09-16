import { randomUsersActions } from "../slices/randomUsersSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastOptions";

// Get Random Users
export function getRandomUsers() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/random-users`);
      dispatch(randomUsersActions.setRandomProfiles(data));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}