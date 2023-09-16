import React from 'react'
// Compenents
import PostItem from './PostItem'
// Css File
import "./posts.css"

const PostList = ({ posts }) => {
  return (
    <div className="post-list">
        {posts.map((item => <PostItem posts={item} key={item._id} /> ))}
    </div>
  )
}

export default PostList