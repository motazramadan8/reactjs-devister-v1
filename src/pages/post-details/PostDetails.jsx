import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { BsPencilSquare, BsTrash3, BsImageFill} from "react-icons/bs"
import "./post-details.css"
import { toast, ToastContainer } from "react-toastify"
import AddComment from '../../components/comments/AddComment'
import CommentList from '../../components/comments/CommentList'
import swal from "sweetalert"
import UpdatePostModal from './UpdatePostModal'
import FullPostImage from './FullPostImage'
import toastOptions from "../../utils/toastOptions"
import { useDispatch, useSelector } from "react-redux"
import { deletePost, getSinglePost, toggleLikePost, updatePostImage } from '../../redux/APIs/postsApiCall'
import Moment from 'react-moment'

const PostDetails = () => {
  const { id } = useParams()
  const { post } = useSelector(state => state.post)
  const { user } = useSelector(state => state.auth)
  const [file, setFile] = useState(null)
  const [updatePost, setUpdatePost] = useState(false)
  const [fullPhoto, setFullPhoto] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(getSinglePost(id))
  }, [id])

  // Update Image Submit Handler
  const updateImagesubmitHandler = (e) => {
    e.preventDefault();
    if (!file)
      return toast.warn("Choose Any Image To Update", toastOptions)
    
    const formData = new FormData();
    formData.append("image", file);

    dispatch(updatePostImage(formData, post?._id))
  }

  // Delete Post Handler
  const deletePostHandler = () => {
    swal({
        title: "Are you sure?",
        text: "Once Deleted, You Will Not Be Able To Recover This Post",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        closeOnClickOutside: true,
        closeOnEsc: true,
      })
      .then((isOk) => {
        if (isOk) {
          dispatch(deletePost(post?._id))
          swal("Post Has Been Deleted Successfully", {
            icon: "success",
          });
          navigate("/posts")
        }
      });
  }
  const toggleLike = () => {
    dispatch(toggleLikePost(post?._id))
  }

  return (
    <>
        <section className="post-details">
            <div className="post-details-user-info">
                <img src={post?.user?.profilePhoto.url} alt="user" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link className='profile-link' to={`/profile/${post?.user?._id}`}>{post?.user?.username}</Link>
                    </strong>
                    <span>
                      <Moment fromNow>
                        {post?.createdAt}
                      </Moment>
                    </span>
                </div>
            </div>
            <h1 className="post-details-title">{post?.title}</h1>
            <p className="post-details-description">
              {
                post?.description?.split(" ").map((word, index) => {
                  try {
                    const url = new URL(word);
                    return (
                      <a key={index} style={{ textDecoration: "underline", color:"#F6BE00" }} href={url.href} rel="noreferrer" target="_blank">{word.replace("\n","")}</a>
                    );
                  } catch {
                    return word + " ";
                  }
                })
              }
            </p>
            <div className="post-details-icon-wrapper">
                <div>
                    {user ? (
                      !post?.likes?.includes(user?._id) ? (
                        <AiOutlineLike onClick={toggleLike} className='icon' />
                      ) : (
                        <AiFillLike onClick={toggleLike} className='icon' style={{ color: "rgb(246,190,0)" }} />
                      )
                    ): (
                      <h1 style={{fontSize:"15px",color:"red",fontWeight:"300",margin:"0"}}>Please Login To Add Like</h1>
                    )}
                    <small>{post?.likes?.length} likes</small>
                </div>
                {
                  user?._id === post?.user?._id && (
                    <div>
                      <BsPencilSquare 
                        className='icon' 
                        onClick={() => setUpdatePost(true)} 
                        title="Edit Post"
                      />
                      <BsTrash3 
                        className='icon' 
                        onClick={deletePostHandler} 
                        title="Delete Post"
                      />
                    </div>
                  )
                }
            </div>
            <div className="post-details-image-wrapper">
                <img 
                  src={file ? URL.createObjectURL(file) : post?.image?.url} 
                  alt="post" 
                  className="post-details-image"
                  onClick={() => setFullPhoto(true)}
                />
                {
                  user?._id === post?.user?._id && (
                    <form onSubmit={updateImagesubmitHandler} className="update-post-image-form">
                      <label htmlFor="file" className="update-post-label">
                          <BsImageFill className="icon" />
                          Select New Image
                      </label>
                      <input 
                        style={{ display: "none" }} 
                        type="file" 
                        name="file" 
                        id="file" 
                        onChange={e => setFile(e.target.files[0])}
                      />
                      <button type="submit">upload</button>
                    </form>
                  )
                }
            </div>
            {
              user ? (
                <AddComment postId={post?._id} />
              ) : (
                <h1 style={{fontSize:"15px",color:"red",fontWeight:"300",margin:"0"}}>Please Login To Add Comment</h1>
              )
            }
            <CommentList comments={post?.comments} postAuthor={post?.user?.id} />
            {fullPhoto  && <FullPostImage setFullPhoto={setFullPhoto} post={post} file={file} />}
            {updatePost  && <UpdatePostModal post={post} setUpdatePost={setUpdatePost} />}
        </section>
        <ToastContainer />
    </>
  )
}

export default PostDetails
