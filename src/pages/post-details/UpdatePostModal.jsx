import React, { useEffect, useState } from "react";
import "./update-post.css";
import { AiFillCloseCircle } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import toastOptions from "../../utils/toastOptions";
import { useDispatch } from "react-redux";
import { updatePost } from "../../redux/APIs/postsApiCall";
import Footer from "../../components/footer/Footer"

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const dispatch = useDispatch();
  const [category, setCategory] = useState(post.category);
  const [newTag, setNewTag] = useState("");
  const [text, setText] = useState("")

  // Handle Key Down
  const handleKeyDown = (e) => {
    e.preventDefault()
    const value = text
    if (!value.trim()) return 
    setCategory([...category, value])
    setText("")
  }

  // Remove Tag
  const removeTag = (index) => {
    setCategory(category.filter((el, i) => i !== index));
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (e.key === "Enter") return e.preventDefault();

    if (title === "") return toast.warn("Title Is Required", toastOptions);
    if (category.length === 0)
      return toast.warn("Category Is Required", toastOptions);
    if (category.length > 10)
      return toast.warn("Categories Must Be Less Than 10 Categories", toastOptions);
    if (description === "")
      return toast.warn("Description Is Required", toastOptions);
  
    const updatedCategories = [...category, newTag];
    const updatedCategoriesFilter = updatedCategories.filter((el) => el !== "")

    dispatch(updatePost({ title, category: updatedCategoriesFilter, description }, post?._id));
    setUpdatePost(false);
  };
  
  return (
    <>
      <section className="update-post">
        <div className="create-post-div">
          <h1 className="create-post-title">Update Your Post</h1>
          <form onSubmit={formSubmitHandler} className="create-post-form" style={{ position:"relative" }}>
            <abbr title="close">
              <AiFillCloseCircle
                onClick={() => setUpdatePost(false)}
                className="update-post-form-close"
              />
            </abbr>
            <input
              type="text"
              placeholder="Post Title"
              className="create-post-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              title="Write Your Post Title"
            />
            <div className="tags-input-container">
              {category.includes(",") ? category?.split(",").map((tag, index) => (
                <div className="tag-item" key={index}>
                  <span className="text">{tag}</span>
                  <span className="close" onClick={() => removeTag(index)}>&times;</span>
                </div> 
              )) : (
                category?.map((tag, index) => (
                  <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTag(index)}>&times;</span>
                  </div> 
                ))
              )}
              <input id="tag" value={text} onChange={(e) => setText(e.target.value)} type="text" className="tags-input" placeholder="Add New Category..." />
              <button className="tag-submit" onClick={handleKeyDown}>Add</button>
            </div>
            <textarea
              className="create-post-textarea"
              rows="5"
              placeholder="Post Desciption"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              title="Write Your Post Desciption"
            ></textarea>
            <button type="submit" className="create-post-btn">
              Update
            </button>
          </form>
        </div>
      </section>
      <ToastContainer />
      <Footer />
    </>
  );
};

export default UpdatePostModal;
