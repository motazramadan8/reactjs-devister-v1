import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CiUser } from "react-icons/ci"
import { BsFilePost, BsFillTagFill } from "react-icons/bs"
import { LiaCommentSolid } from "react-icons/lia"
import AddCategoryForm from './AddCategoryForm'
import { useDispatch, useSelector } from "react-redux"
import { fetchCategories } from '../../redux/APIs/categoryApiCall'
import { getUsersCount } from '../../redux/APIs/profileApiCall'
import { getPostsCount } from '../../redux/APIs/postsApiCall'
import { getAllComments } from '../../redux/APIs/commentApiCall'

const AdminMain = () => {
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.category)
  const { usersCount } = useSelector(state => state.profile)
  const { postsCount } = useSelector(state => state.post)
  const { comments } = useSelector(state => state.comment)

  useEffect(() => {
    dispatch(fetchCategories())
    dispatch(getUsersCount())
    dispatch(getPostsCount())
    dispatch(getAllComments())
  }, [])

  return (
    <div className="admin-main">
        <div className="admin-main-header">
          <div className="admin-main-card">
            <h5 className="admin-card-title">Users</h5>
            <div className="admin-card-count">{usersCount}</div>
            <div className="admin-card-link-wrapper">
              <Link 
                to="/admin-dashboard/users-table"
                className="admin-card-link"
              >
                See All Users
              </Link>
              <div className="admin-card-icon">
                <CiUser />
              </div>
            </div>
          </div>
          <div className="admin-main-card">
            <h5 className="admin-card-title">Posts</h5>
            <div className="admin-card-count">{postsCount}</div>
            <div className="admin-card-link-wrapper">
              <Link 
                to="/admin-dashboard/posts-table"
                className="admin-card-link"
              >
                See All Posts
              </Link>
              <div className="admin-card-icon">
                <BsFilePost />
              </div>
            </div>
          </div>
          <div className="admin-main-card">
            <h5 className="admin-card-title">Categories</h5>
            <div className="admin-card-count">
              {categories?.length}
            </div>
            <div className="admin-card-link-wrapper">
              <Link 
                to="/admin-dashboard/categories-table"
                className="admin-card-link"
              >
                See All Categories
              </Link>
              <div className="admin-card-icon">
                <BsFillTagFill />
              </div>
            </div>
          </div>
          <div className="admin-main-card">
            <h5 className="admin-card-title">Comments</h5>
            <div className="admin-card-count">{comments.length}</div>
            <div className="admin-card-link-wrapper">
              <Link 
                to="/admin-dashboard/comments-table"
                className="admin-card-link"
              >
                See All Comments
              </Link>
              <div className="admin-card-icon">
                <LiaCommentSolid />
              </div>
            </div>
          </div>
        </div>
        <AddCategoryForm />
    </div>
  )
}

export default AdminMain