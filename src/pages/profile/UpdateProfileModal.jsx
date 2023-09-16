import React, { useState } from "react"
import "./update-profile-modal.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { toast, ToastContainer } from "react-toastify"
import toastOptions from "../../utils/toastOptions"
import { useDispatch } from "react-redux"
import { updateProfile } from "../../redux/APIs/profileApiCall"

const UpdateProfileModal = ({ setUpdateProfile, profile }) => {
  const [username, setUsername] = useState(profile.username);
  const [bio, setBio] = useState(profile.bio);
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch()
  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    const updatedUser = {}

    if (username) {
      updatedUser.username = username
    }

    if (bio) {
      updatedUser.bio = bio
    } else {
      updatedUser.bio = " "
    }

    if (password.trim() !== "") {
      updatedUser.oldPassword = oldPassword
      updatedUser.password = password
    }

    if(updatedUser.oldPassword?.trim() === "") {
      return toast.warn("Old Password Is Required", toastOptions)
    }

    if (!updatedUser.username && !updatedUser.bio && !updatedUser.password)
      return toast.warn("You must fill out any field", toastOptions)

    if (bio.trim().length >= 100)
      return toast.warn("Bio Must Be Less Than 100 Character", toastOptions)

    dispatch(updateProfile(profile?._id, updatedUser))
    setUpdateProfile(false)
  }

  return (
    <>
        <div className="update-profile">
            <form onSubmit={formSubmitHandler} className="update-profile-form">
                <abbr title="close">
                    <AiFillCloseCircle 
                    onClick={() => setUpdateProfile(false)}
                    className="update-profile-form-close"
                    />
                </abbr>
                <h1 className="update-profile-title">Edit Profile</h1>
                <input 
                  type="text" 
                  className="update-profile-input" 
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                  type="text" 
                  className="update-profile-input" 
                  placeholder="Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
                <input 
                  type="password" 
                  className="update-profile-input" 
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <input 
                  type="password" 
                  className="update-profile-input" 
                  placeholder="New Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" title="Update Profile" className="update-profile-btn">
                    Update
                </button>
            </form>
        </div>
        <ToastContainer />
    </>
  )
}

export default UpdateProfileModal