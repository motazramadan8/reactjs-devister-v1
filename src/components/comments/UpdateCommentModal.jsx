import React, { useState } from "react"
import "./update-comment.css"
import { ToastContainer, toast } from "react-toastify"
import { AiFillCloseCircle } from "react-icons/ai"
import toastOptions from "../../utils/toastOptions"
import { useDispatch } from "react-redux"
import { updateComment } from "../../redux/APIs/commentApiCall"

const UpdateCommentModal = ({ setUpdateComment, commentForUpdate }) => {

  const [text, setText] = useState(commentForUpdate?.text);
  const dispatch = useDispatch()
  
  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text === "")
      return toast.warn("Comment Is Required", toastOptions);
    
    dispatch(updateComment({ text }, commentForUpdate?._id))
    setUpdateComment(false)
  }

  return (
    <>
        <div className="update-comment">
            <form onSubmit={formSubmitHandler} className="update-comment-form">
                <abbr title="close">
                    <AiFillCloseCircle 
                    onClick={() => setUpdateComment(false)}
                    className="update-comment-form-close"
                    />
                </abbr>
                <h1 className="update-comment-title">Edit Comment</h1>
                <input 
                  type="text" 
                  className="update-comment-input" 
                  placeholder="Comment"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" title="Update Comment" className="update-comment-btn">
                    Edit
                </button>
            </form>
        </div>
        <ToastContainer />
    </>
  )
}

export default UpdateCommentModal
