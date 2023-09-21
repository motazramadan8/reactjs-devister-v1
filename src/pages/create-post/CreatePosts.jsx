import React, { useEffect, useState } from "react";
import "./create-post.css";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../components/footer/Footer";
import toastOptions from "../../utils/toastOptions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../redux/APIs/postsApiCall";
import { CirclesWithBar } from "react-loader-spinner"

const CreatePosts = () => {
  const dispatch = useDispatch();
  const { loading, isPostCreated } = useSelector((state) => state.post);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([])
  const [file, setFile] = useState(null);

  // Handle Key Down
  const handleKeyDown = (e) => {
    if (e.key !== 'Enter') return;
    const value = e.target.value
    if (!value.trim()) return 
    setTags([...tags, value])
    e.target.value = ""
  }

  // Remove Tag
  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index))
  }

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (title.trim() === "")
      return toast.warn("Title Is Required", toastOptions);
    if (title.trim().length <= 2)
      return toast.warn("Title Must Be At Least 3 Character", toastOptions);
    if (title.trim().length >= 200)
      return toast.warn("Title Must Be Less Than 200 Character", toastOptions);
    
    if (description.trim() === "")
      return toast.warn("Description Is Required", toastOptions);
    if (description.trim().length <= 10)
      return toast.warn("Description Must Be At Least 11 Character", toastOptions);

    if (tags.length === 0)
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
    formData.append("category", tags);
    dispatch(createPost(formData));
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isPostCreated) {
      navigate("/posts");
    }
  }, [isPostCreated, navigate]);
  
  return (
    <>
      <section className="create-post">
        <div className="create-post-div">
          <h1 className="create-post-title">What are you thinking ?</h1>
          <form onSubmit={formSubmitHandler} className="create-post-form">
            <label className="create-post-label" htmlFor="title">Enter Your Post Title</label>
            <input
              type="text"
              placeholder="Post Title"
              className="create-post-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              title="Write Your Post Title"
              id="title"
            />
            <label className="create-post-label" htmlFor="tag">Press On Space To Add Tag</label>
            <div className="tags-input-container">
              {tags.map((tag, index) => (
                <div className="tag-item" key={index}>
                  <span className="text">{tag}</span>
                  <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div> 
              ))}
              <input id="tag" onKeyUp={handleKeyDown} type="text" className="tags-input" placeholder="Add New Category..." />
            </div>
            <label className="create-post-label" htmlFor="desc">Enter Your Post Description</label>
            <textarea
              className="create-post-textarea"
              rows="5"
              placeholder="Post Desciption"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              title="Write Your Post Desciption"
              id="desc"
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
