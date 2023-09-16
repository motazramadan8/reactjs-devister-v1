import React, { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import toastOptions from "../../utils/toastOptions"
import { useDispatch, useSelector } from "react-redux"
import { addCategory, fetchCategories } from '../../redux/APIs/categoryApiCall'
import { useNavigate } from 'react-router-dom'

const AddCategoryForm = () => {
  const [title, setTitle] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault()
    if (title.trim() === "")
      return toast.warn("Title Is Required", toastOptions)

    dispatch(addCategory({ title }))
    setTitle("")
    navigate("/admin-dashboard/categories-table")
  }
  return (
    <div className="add-category">
        <h6 className="add-category-title">Add New Category</h6>
        <form onSubmit={formSubmitHandler}>
            <div className="add-category-form-group">
                <label htmlFor="title">Category Title</label>
                <input 
                  type="text" 
                  id="title"
                  placeholder="Enter Category Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <button className="add-category-btn" type="submit">
                Add
            </button>
        </form>
        <ToastContainer />
    </div>
  )
}

export default AddCategoryForm