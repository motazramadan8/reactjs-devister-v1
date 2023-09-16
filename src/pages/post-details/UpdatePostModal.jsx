import React, { useEffect, useState } from "react"
import "./update-post.css"
import { AiFillCloseCircle } from "react-icons/ai"
import { ToastContainer, toast } from "react-toastify"
import toastOptions from "../../utils/toastOptions"
import { useDispatch, useSelector } from "react-redux"
import { updatePost } from "../../redux/APIs/postsApiCall"
import { fetchCategories } from "../../redux/APIs/categoryApiCall"

const UpdatePostModal = ({ setUpdatePost, post }) => {
  const [title, setTitle] = useState(post.title);
  const [category, setCategory] = useState(post.category);
  const [description, setDescription] = useState(post.description);
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (title === "")
      return toast.warn("Title Is Required", toastOptions);
    if (category === "")
      return toast.warn("Category Is Required", toastOptions);
    if (description === "")
      return toast.warn("Description Is Required", toastOptions);
    
    dispatch(updatePost({ title, category, description }, post?._id))
    window.location.reload()
    setUpdatePost(false)
  }

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <>
        <div className="update-post">
            <form onSubmit={formSubmitHandler} className="update-post-form">
                <abbr title="close">
                    <AiFillCloseCircle 
                    onClick={() => setUpdatePost(false)}
                    className="update-post-form-close"
                    />
                </abbr>
                <h1 className="update-post-title">Edit Post</h1>
                <input 
                type="text" 
                className="update-post-input" 
                placeholder="Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <select 
                className="update-post-input"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="" disabled>
                        Select A Category
                    </option>
                    {categories.map((category) => (
                      <option key={category?._id} value={category?.title}>
                        {category?.title}
                      </option>
                    ))}
                </select>
                <textarea 
                className="update-post-textarea" 
                rows="5" 
                placeholder="Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button type="submit" title="Update Post" className="update-post-btn">
                    Update
                </button>
            </form>
        </div>
        <ToastContainer />
    </>
  )
}

export default UpdatePostModal