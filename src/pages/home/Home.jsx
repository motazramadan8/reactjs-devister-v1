import React, { useEffect } from 'react'
// Components
import PostList from '../../components/posts/PostList'
import Sidebar from '../../components/sidebar/Sidebar'
// Packeges
import { Link } from 'react-router-dom'
// css file
import "./home.css"
import Footer from "../../components/footer/Footer"
import SideProfile from '../profile/SideProfile'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPosts } from '../../redux/APIs/postsApiCall'

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0)
    dispatch(fetchPosts(1))
  }, [])

  return (
    <section className="home">
        <div className="home-latest-post">Latest Posts</div>
        <div className="home-container">
          {posts.length !== 0 ? (
            <>
              {user && <SideProfile />}
              <PostList posts={posts} />
              <Sidebar />
            </>
          ) : (
            <h1 className="not-found-posts">There are no posts. Be the first to write 🙁</h1>
          )}
        </div>
        <div className="home-see-posts-link">
          <Link to="/posts" className='home-link'>
            See All Posts
          </Link>
        </div>
        <Footer />
    </section>
  )
}

export default Home