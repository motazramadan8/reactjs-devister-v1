import React, { useState } from "react";
import "./add-comment.css";
import { toast, ToastContainer } from "react-toastify";
import toastOptions from "../../utils/toastOptions"
import { useDispatch } from "react-redux"
import { createComment } from "../../redux/APIs/commentApiCall";

const AddComment = ({ postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch()

  const formSubmitHandler = (e) => {
    e.preventDefault()

    if (text.trim() === "") 
      return toast.warn("Comment Is Required", toastOptions);

    dispatch(createComment({ text, postId}))
    window.location.reload()
    window.location.reload()
    setText("")
  };
  return (
    <>
      <form onSubmit={formSubmitHandler} className="add-comment">
        <input
          type="text"
          placeholder="Add A Comment"
          className="add-comment-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="add-comment-btn">
          Add
        </button>
      </form>
      <ToastContainer />
    </>
  );
};

export default AddComment;
