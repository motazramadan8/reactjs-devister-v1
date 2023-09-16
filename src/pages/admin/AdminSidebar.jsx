import React from 'react'
import { Link } from 'react-router-dom'
import { RiDashboardLine } from "react-icons/ri"
import { CiUser } from "react-icons/ci"
import { BsFilePost, BsFillTagFill } from "react-icons/bs"
import { LiaCommentSolid } from "react-icons/lia"

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar">
        <Link to="/admin-dashboard" className="admin-sidebar-title">
            <RiDashboardLine className="icon" />
            Dashboard
        </Link>
        <ul className="admin-dashboard-list">
            <Link className="admin-sidebar-link" to="/admin-dashboard/users-table">
                <CiUser className="icon" />
                Users
            </Link>
            <Link className="admin-sidebar-link" to="/admin-dashboard/posts-table">
                <BsFilePost className="icon" />
                Posts
            </Link>
            <Link className="admin-sidebar-link" to="/admin-dashboard/categories-table">
                <BsFillTagFill className="icon" />
                Categories
            </Link>
            <Link className="admin-sidebar-link" to="/admin-dashboard/comments-table">
                <LiaCommentSolid className="icon" />
                Comments
            </Link>
        </ul>
    </div>
  )
}

export default AdminSidebar