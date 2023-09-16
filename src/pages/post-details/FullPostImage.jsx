import React from 'react'
import "../profile/full-photo.css"
import { AiFillCloseCircle } from "react-icons/ai"

const FullPostImage = ({ setFullPhoto, post, file }) => {
  return (
    <div className="full-body">
        <abbr title="close">
            <AiFillCloseCircle 
                onClick={() => setFullPhoto(false)}
                className="update-comment-form-close"
            />
        </abbr>
        <img src={file ? URL.createObjectURL(file) : post.image.url} alt="post" />
    </div>
  )
}

export default FullPostImage