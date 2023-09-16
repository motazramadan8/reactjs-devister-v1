import React, { useEffect, useState } from "react";
import "./create-post.css";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
import toastOptions from "../../utils/toastOptions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/APIs/postsApiCall";
import { CirclesWithBar } from "react-loader-spinner"
import { fetchCategories } from "../../redux/APIs/categoryApiCall";

const CreatePosts = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const { categories } = useSelector(state => state.category)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "")
      return toast.warn("Title Is Required", toastOptions);
    if (title.trim().length <= 2)
      return toast.warn("Title Must Be At Least 3 Character", toastOptions);
    if (title.trim().length >= 200)
      return toast.warn("Title Must Be Less Than 3 Character", toastOptions);
    
    if (description.trim() === "")
      return toast.warn("Description Is Required", toastOptions);
    if (description.trim().length <= 10)
      return toast.warn("Description Must Be At Least 11 Character", toastOptions);

    if (category.trim() === "")
      return toast.warn("Category Is Required", toastOptions);
    if (!file) 
      return toast.warn("Image Is Required", toastOptions);
    if (!file.type.startsWith("image")) 
      return toast.warn("Not Supported Format", toastOptions);
    if (file?.size >= 1024 * 1024) 
      return toast.warn("Image Size Must Be Less Than 1 MB", toastOptions);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);

    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/posts");
    }
  }, [isPostCreated, navigate]);

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  
  return (
    <>
      <section className="create-post">
        <div className="create-post-div">
          <h1 className="create-post-title">What are you thinking ?</h1>
          <form onSubmit={formSubmitHandler} className="create-post-form">
            <input
              type="text"
              placeholder="Post Title"
              className="create-post-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              title="Write Your Post Title"
            />
            <select
              className="create-post-input"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              title="Choose Your Post Category"
            >
              <option disabled value="">
                Select A Catefgory
              </option>
              {
                categories.map(category => (
                  <option key={category?._id} value={category?.title}>{category?.title}</option>
                ))
              }
            </select>
            <textarea
              className="create-post-textarea"
              rows="5"
              placeholder="Post Desciption"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              title="Write Your Post Desciption"
            ></textarea>
            <label htmlFor="file" className="create-post-upload">
              {file ? file.name : "Choose File"}
            </label>
            {
              file && (
                <img className="post-image" src={URL.createObjectURL(file)} alt="post" />
              )
            }
            <input
              type="file"
              name="file"
              id="file"
              className="create-post-upload"
              onChange={(e) => setFile(e.target.files[0])}
              title="Choose Your Post Image"
            />
            <button type="submit" className="create-post-btn">
              {loading ? (
                <CirclesWithBar
                  height="30"
                  width="30"
                  color="rgb(24,25,26)"
                  wrapperStyle={{ marginLeft: "calc(50% - 20px)" }}
                  wrapperClass=""
                  visible={true}
                  outerCircleColor=""
                  innerCircleColor=""
                  barColor=""
                  ariaLabel='circles-with-bar-loading'
                />
              ) : "Create"}
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default CreatePosts;
