import React, { useEffect } from "react";
import AdminSidebr from "./AdminSidebar";
import "./admin-table.css";
import Footer from "../../components/footer/Footer";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, getAllComments } from "../../redux/APIs/commentApiCall";

const CommentsTable = () => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.comment);

  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  // Delete Comment Handler
  const deleteCommentHandler = (commentId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this commetn",
      icon: "warning",
      buttons: true,
      dangerMode: true,
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
    <>
      <section className="table-container">
        <AdminSidebr />
        <div className="table-wrapper">
          <h1 className="table-title">Commetns</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Count</th>
                <th>Users</th>
                <th>Comment Body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment, index) => (
                <tr key={comment._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src={comment.user.profilePhoto?.url}
                        alt="user"
                        className="table-user-image"
                      />
                      <span className="table-username">
                        {comment.user.username}
                      </span>
                    </div>
                  </td>
                  <td>{comment.text}</td>
                  <td>
                    <div className="table-button-group">
                      <button
                        className="delete-btn"
                        onClick={() => deleteCommentHandler(comment._id)}
                      >
                        Delete Comment
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CommentsTable;
