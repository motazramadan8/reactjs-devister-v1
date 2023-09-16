import React, { useEffect } from "react";
import AdminSidebr from "./AdminSidebar";
import "./admin-table.css";
import { Link } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import swal from "sweetalert";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, fetchAllPosts } from "../../redux/APIs/postsApiCall";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, []);

  // Delete Post Handler
  const deletePostHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deletePost(postId))
        swal("Post Has Been Deleted Successfully", {
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
          <h1 className="table-title">Posts</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Count</th>
                <th>Users</th>
                <th>Post Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, index) => (
                <tr key={post._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="table-image">
                      <img
                        src={post.user?.profilePhoto?.url}
                        alt="user"
                        className="table-user-image"
                      />
                      <span className="table-username">
                        {post.user.username}
                      </span>
                    </div>
                  </td>
                  <td>{post.title}</td>
                  <td>
                    <div className="table-button-group">
                      <button className="view-btn">
                        <Link to={`/posts/details/${post._id}`}>View Post</Link>
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deletePostHandler(post._id)}
                      >
                        Delete Post
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

export default PostsTable;
