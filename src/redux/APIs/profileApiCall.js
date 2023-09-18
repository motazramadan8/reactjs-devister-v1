import { profileActions } from "../slices/profileSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";
import toastOptions from "../../utils/toastOptions";
import { authActions } from "../slices/authSlice";

// Get User Profile
export function getUserProfile(userId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/users/profile/${userId}`);
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
      if (error.response.data.msg === "User Not Found") {
        dispatch(authActions.logout())
      }
    }
  };
}

// Upload Profile Photo
export function uploadProfilePhoto(newPhoto) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        "/api/users/profile/profile-photo-upload",
        newPhoto,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(profileActions.setProfilePhoto(data.profilePhoto));
      dispatch(authActions.setUserPhoto(data.profilePhoto));
      const user = JSON.parse(localStorage.getItem("userInfo"));
      toast.success(`${user.username}, ${data.msg}`);
      // Update User Photo In Local Storage
      user.profilePhoto = data?.profilePhoto;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Update Profile
export function updateProfile(userId, profile) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        profile,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.updateProfile(data));
      dispatch(authActions.setUsername(data.username));
      toast.success(`${data.username}, Your Account Updated Successfully`);
      // Update Username In Local Storage
      const user = JSON.parse(localStorage.getItem("userInfo"));
      user.username = data?.username;
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Delete Profile (Account)
export function deleteProfile(userId) {
  return async (dispatch, getState) => {
    dispatch(profileActions.setLoading());
    try {
      const { data } = await request.delete(`/api/users/profile/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setIsProfileDeleted());
      toast.success(data?.msg + "dddd", toastOptions);
      setTimeout(() => dispatch(profileActions.clearIsProfileDeleted()), 2000);
      window.location.reload()
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
      dispatch(profileActions.clearLoading());
    }
  };
}

// Toggle Follow Profile
export function toggleFollowProfile(profileId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `/api/users/follow/${profileId}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(profileActions.setFollowers(data));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Get All Profiles
export function getAllProfiles() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/profile`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setProfiles(data));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}

// Get Users Count => For Admin Dashboard
export function getUsersCount() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`/api/users/count`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(profileActions.setUsersCount(data));
    } catch (error) {
      toast.warn(error.response.data.msg, toastOptions);
    }
  };
}
