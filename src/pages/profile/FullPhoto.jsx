import React from 'react'
import "./full-photo.css"
import { AiFillCloseCircle } from "react-icons/ai"

const FullPhoto = ({ setFullPhoto, file, profile }) => {
  return (
    <div className="full-body">
        <abbr title="close">
            <AiFillCloseCircle 
                onClick={() => setFullPhoto(false)}
                className="update-comment-form-close"
            />
        </abbr>
        <img src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url} alt="full-user" />
    </div>
  )
}

export default FullPhoto