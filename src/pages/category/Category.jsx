import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./category.css";
import Footer from "../../components/footer/Footer";
import PostList from "../../components/posts/PostList";
import { fetchPostsBasedOnCategory } from "../../redux/APIs/postsApiCall";
import SideProfile from "../profile/SideProfile";


const Category = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { postsCate } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchPostsBasedOnCategory(category));
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <>
      <section className="category">
        {postsCate.length === 0 ? (
          <div className="not-found">
            <h1 className="category-not-found">
              Posts With <span>{category}</span> Category Not Found
            </h1>
            <Link to="/posts" className="category-not-found-link">
              Go To Posts Page
            </Link>
          </div>
        ) : (
          <>
            <h1 className="category-title" style={{textTransform: "capitalize"}}>Posts Based On {category}</h1>
            <div className="category-container">
              {user && <SideProfile />}
              <PostList posts={postsCate} />
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Category;
