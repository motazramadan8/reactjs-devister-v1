import React, { useState } from 'react'
// Packeges
import { Link } from "react-router-dom"
import FullPostImage from '../../pages/post-details/FullPostImage'
import Moment from 'react-moment'

const PostItem = ({ posts, username, userId, profilePhoto }) => {
  const [fullPhoto, setFullPhoto] = useState(false)
  const profileLink = userId ? `/profile/${userId}` : `/profile/${posts?.user?._id}`

  return (
    <div className="post-item">
        <div className="post-item-info-wrapper">
            <div className="post-item-info">
                <Link to={profileLink} className="post-item-author">
                    <img src={profilePhoto ? profilePhoto : posts?.user?.profilePhoto?.url} alt="user" className="post-details-user-image" />
                    <Link className='post-item-username' to={`/profile/${posts?.user?._id}`}>
                        {username ? username : posts?.user?.username}
                    </Link>
                </Link>
                <div className="post-item-date">
                    <Moment fromNow>
                        {posts?.createdAt}
                    </Moment>{" "}
                </div>
                <div className="post-item-details">
                    <h4 className='post-item-title'>{posts?.title}</h4>
                    <Link className='post-item-category' to={`/posts/category/${posts?.category}`}>
                        {posts?.category}
                    </Link>
                </div>
                <p className="post-item-description">
                    {posts?.description}
                </p>
                <Link className='post-item-link' to={`/posts/details/${posts?._id}`}>
                    Read More...
                </Link>
            </div>
        </div>
        <div className="post-item-image-wrapper">
            <img 
              src={posts?.image?.url}
              alt="post"
              className='post-item-image'
              onClick={() => setFullPhoto(true)}
              style={{ cursor: "pointer" }}
            />
        </div>
        {fullPhoto  && <FullPostImage setFullPhoto={setFullPhoto} post={posts} />}
    </div>
  )
}

export default PostItem