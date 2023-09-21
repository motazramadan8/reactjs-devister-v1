import React, { useEffect, useState } from 'react'
// Packeges
import { Link } from "react-router-dom"
import FullPostImage from '../../pages/post-details/FullPostImage'
import Moment from 'react-moment'
import { useSelector, useDispatch } from 'react-redux'
import { getAllComments } from '../../redux/APIs/commentApiCall'
import { toggleLikePost } from '../../redux/APIs/postsApiCall'

const PostItem = ({ posts, username, userId, profilePhoto }) => {
  const dispatch = useDispatch();
  const [fullPhoto, setFullPhoto] = useState(false)
  const profileLink = userId ? `/profile/${userId}` : `/profile/${posts?.user?._id}`
  const { comments } = useSelector((state) => state.comment);
  const postComments = comments?.filter((el) => el.postId === posts._id)
  const [like, setLike] = useState(false)
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(getAllComments());
  }, []);

  const toggleLike = () => {
    dispatch(toggleLikePost(posts?._id))
    setLike(prev => !prev)
  }

  return (
    <div className="post-item" style={{ height: posts?.description.length > 80 ? "640px" : posts?.description.length > 43 ? "550px" : "" }}>
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
                    <h4 className='post-item-title'>
                        <Link to={`/posts/details/${posts?._id}`} style={{fontWeight:"400"}}>
                            {posts?.title}
                        </Link>
                    </h4>
                    {
                        posts?.category?.map((item, index) => (
                            <Link className='post-item-category' key={index} to={`/posts/category/${item}`}>
                                {item}
                            </Link>
                        ))
                    }
                </div>
                <p className="post-item-description">
                    {posts?.description}
                </p>
                {
                    posts?.description.length > 80 && (
                        <Link className='post-item-link' to={`/posts/details/${posts?._id}`}>
                            Read More...
                        </Link>
                    )
                }
            </div>
        </div>
        <div className="post-item-image-wrapper">
            <img 
              src={posts?.image?.url}
              alt="post"
              className='post-item-image'
              onClick={() => setFullPhoto(true)}
              style={{ cursor: "pointer", marginTop: posts?.description.length < 80 ? "-20px" : "-5px", marginBottom: posts?.description.length > 80 && "15px" }}
            />
        </div>
        {fullPhoto  && <FullPostImage setFullPhoto={setFullPhoto} post={posts} />}
        <div className="post-reach">
            <div className="comments-length">
                <Link style={{color:"#B0B3B8"}} to={`/posts/details/${posts?._id}`}>
                    {postComments.length} comments
                </Link>
            </div>
            <div className="post-details-iconn-wrapper">
                <div onClick={toggleLike} style={{cursor:"pointer"}}>
                    {
                        like ? (
                            <>
                                {posts?.likes?.includes(user?._id) ? (
                                    <small>{posts?.likes?.length - 1} likes</small>
                                ) : (
                                    <small>{posts?.likes?.length + 1} likes</small>
                                )}
                            </>
                        ) : (
                            <small>{posts?.likes?.length} likes</small>
                        )
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostItem
