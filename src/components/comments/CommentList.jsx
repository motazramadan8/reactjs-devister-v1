import React, { useEffect, useState } from "react";
import "./comment-list.css";
import { BsPencilSquare, BsTrash3 } from "react-icons/bs";
import swal from "sweetalert";
import UpdateCommentModal from "./UpdateCommentModal";
import { Link } from "react-router-dom";
import Moment from "react-moment"
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getAllComments } from "../../redux/APIs/commentApiCall";

const CommentList = ({ postAuthor, comments }) => {
  const [updateComment, setUpdateComment] = useState(false);
  const [commentForUpdate, setCommentForUpdate] = useState(null);
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllComments());
  }, [])

  // Update Comment Handler
  const updateCommentHandler = (comment) => {
    setCommentForUpdate(comment)
    setUpdateComment(true)
  }

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Comment",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      closeOnClickOutside: true,
      closeOnEsc: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteComment(commentId))
        swal("Comment Has Been Deleted Successfully", {
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="comment-list">
      <h4 className="comment-list-count">
        {comments?.length === 0
          ? "There Is No Comments"
          : comments?.length === 1
          ? `${comments?.length} Comment`
          : `${comments?.length} Comments`}
      </h4>
      {comments?.map((comment) => (
          <div key={comment?._id} className="comment-item">
            <div className="comment-item-author">
              <div className="comment-item-author-info">
                <div className="comment-item-author-image">
                  <img
                    src={comment?.user?.profilePhoto?.url}
                    className="comment-item-author-image"
                    alt="user"
                    style={{ display:"none" }}
                  />
                </div>
                <div className="comment-item-author-username">
                  <Link style={{marginLeft: "-50px"}} to={`/profile/${comment?.user?._id}`}>{comment?.username}</Link>
                </div>
              </div>
              <div className="comment-item-author-time">
                <Moment fromNow ago>
                  {comment?.createdAt}
                </Moment>{" "}
                ago
              </div>
            </div>
            <p className="comment-item-text">
              {comment?.text}
            </p>
            {
              user?._id === comment?.user && (
                <div className="comment-item-icon-wrapper">
                  <BsPencilSquare
                    className="icon"
                    onClick={() => updateCommentHandler(comment)}
                  />
                  <BsTrash3 className="icon" onClick={() => deleteCommentHandler(comment?._id)} />
                </div>
              )
            }
            {user?._id === postAuthor || user?._id === comment?.user ? (
              <div className="comment-item-icon-wrapper">
                <BsTrash3 className="icon" onClick={() => deleteCommentHandler(comment?._id)} />
              </div>
            ) : (
              ""
            )}
          </div>
      ))}
      {updateComment && (
        <UpdateCommentModal 
          commentForUpdate={commentForUpdate} 
          setUpdateComment={setUpdateComment} 
        />
      )}
    </div>
  );
};

export default CommentList;
