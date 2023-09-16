import React, { useEffect, useState } from "react";
import "./profile.css";
import { AiFillCamera } from "react-icons/ai";
import { BiSolidUserRectangle } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import FullPhoto from "./FullPhoto";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import toastOptions from "../../utils/toastOptions";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getUserProfile, setFollowingArray, toggleFollowProfile, uploadProfilePhoto } from "../../redux/APIs/profileApiCall";
import { useNavigate, useParams } from "react-router-dom";
import PostItem from "../../components/posts/PostItem";
import { CirclesWithBar } from "react-loader-spinner"
import { logoutUser } from "../../redux/APIs/authApiCall"

const Profile = () => {
  const [file, setFile] = useState(null);
  const [fullPhoto, setFullPhoto] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const { id } = useParams();
  const { profile, loading, isProfileDeleted } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (isProfileDeleted) {
      navigate("/")
      dispatch(logoutUser())
    }
  }, [navigate, isProfileDeleted]);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) 
      return toast.warn("Iamge Is Required", toastOptions);

    const formData = new FormData()
    formData.append("image", file)
    dispatch(uploadProfilePhoto(formData))
  };

  // Delete Account Handler
  const deleteAccountHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Profile",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id))
        dispatch(logoutUser())
        swal("Account Has Been Deleted Successfully", {
          icon: "success",
        });
        window.location.reload()
      }
    });
  };

  // Open Full Photo
  const openPhoto = () => {
    if (file) {
      setFullPhoto(true)
    } else if (profile?.profilePhoto.url !== "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png") {
      setFullPhoto(true)
    } else {
      toast.warn("There's no picture", toastOptions)
    }
  }

  const toggleFollow = () => {
    dispatch(toggleFollowProfile(profile?._id))
  }

  if (loading) {
    return (
      <div className="profile-loader">
        <CirclesWithBar
          height="120"
          width="120"
          color="red"
          wrapperStyle={{ color: "#F1BA00" }}
          wrapperClass=""
          visible={true}
          outerCircleColor=""
          innerCircleColor=""
          barColor=""
          ariaLabel='circles-with-bar-loading'
        />
      </div>
    )
  }
  
  return (
    <section className="profile">
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <img
            src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
            alt="user"
            className="profile-image"
            onClick={openPhoto}
          />
          {
            user?._id === profile?._id && (
              <form onSubmit={formSubmitHandler}>
                <abbr title="Choose Profile Photo">
                  <label htmlFor="file" className="upload-profile-photo-icon">
                    <AiFillCamera />
                  </label>
                </abbr>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                {file && (
                  <button className="upload-profile-photo-btn" type="submit">
                    Save
                  </button>
                )}
              </form>
            )
          }
        </div>
        <h1 className="profile-username" style={{ textTransform: "capitalize" }}>{profile?.username}</h1>
        <p className="profile-bio" style={{ marginBottom: user?._id !== profile?._id && "30px", marginTop: "0px" }}>{profile?.bio}</p>
        {
          user?._id !== id && (
            <button className="follow-btn" onClick={toggleFollow}>
              {profile?.followers?.includes(user?._id) ? (
                "Unfollow"
              ) : (
                "Follow"
              )}
            </button>
          )
        }
        {
          user?._id !== id ? (
            <i className="follow-count" style={{ marginTop: "0" }}>{profile?.followers?.length} Followers</i>
          ) : (
            <i className="follow-count" style={{ marginTop: user?._id !== profile?._id && "-20px" }}>{profile?.followers?.length} Followers</i>
          )
        }
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {user?._id === profile?._id && (
          <button
            className="profile-update-btn"
            onClick={() => setUpdateProfile(true)}
          >
            <BiSolidUserRectangle
              style={{ marginRight: "5px", marginBottom: "-2px" }}
            />
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2
          className="profile-posts-list-title"
          style={{ textTransform: "capitalize" }}
        >
          {profile?.username} Posts
        </h2>
        {
          profile?.posts?.map((post) => (
            <PostItem 
              key={post._id} 
              posts={post} 
              username={profile?.username}
              userId={profile?._id}
              profilePhoto={profile?.profilePhoto?.url}
            />
          ))
        }
      </div>
      {user?._id === profile?._id && (
        <div className="delete-account-container">
          <button className="delete-account-btn" onClick={() => deleteAccountHandler(profile?._id)}>
            Delete Account
          </button>
        </div>
      )}
      {fullPhoto && <FullPhoto profile={profile} setFullPhoto={setFullPhoto} file={file} />}
      {updateProfile && (
        <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile} />
      )}
      <ToastContainer />
    </section>
  );
};

export default Profile;
