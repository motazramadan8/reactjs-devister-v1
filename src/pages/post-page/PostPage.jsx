import React, { useEffect, useState } from 'react'
import "./post-page.css"
import PostList from "../../components/posts/PostList"
import Sidebar from "../../components/sidebar/Sidebar"
import Pagination from '../../components/pagination/Pagination'
import Footer from "../../components/footer/Footer"
import SideProfile from '../profile/SideProfile'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getPostsCount } from '../../redux/APIs/postsApiCall'
const POST_PER_POST = 10

const PostPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  const { postsCount, posts } = useSelector(state => state.post)
  const [currentPage, setCurrentPage] = useState(1)
  const pages = Math.ceil(postsCount / POST_PER_POST)

  useEffect(() => {
    dispatch(fetchPosts(currentPage))
    window.scrollTo(0, 0)
  }, [currentPage])

  useEffect(() => {
    dispatch(getPostsCount())
  }, [])

  return (
    <>
      <section className="posts-page">
        {posts.length !== 0 ? (
          <>
            {user && <SideProfile />}
            <PostList posts={posts} />
            <Sidebar />
          </>
        ) : (
          <h1 className="not-found-posts">There Is No Posts 🙁</h1>
        )}
      </section>
      <Pagination 
        pages={pages} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      <Footer />
    </>
  )
}

export default PostPage