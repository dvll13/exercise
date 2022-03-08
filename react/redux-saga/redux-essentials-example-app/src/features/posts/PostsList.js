import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectPostIds, selectPostById, fetchPosts, selectPostStatus, selectPostError } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { Spinner } from '../../components/Spinner'

const PostExcerpt = ({ postId }) => {
  const post = useSelector((state) => selectPostById(state, postId))
  return (
    <article className="post-excerpt">
      <h3>{post.title}</h3>
      <div>
        <PostAuthor userId={post.user} />
        <TimeAgo timestamp={post.date} />
      </div>
      <p className="post-content">{post.content.substring(0, 100)}</p>
      <ReactionButtons post={post} />
      <Link to={`/posts/${postId}`} className="button muted-button">
        View post
      </Link>
    </article>
  )
}

const PostsList = () => {
  const dispatch = useDispatch()
  // const posts = useSelector((state) => state.posts)
  // const posts = useSelector(selectAllPosts)
  const orderedPostIds = useSelector(selectPostIds)
  const postStatus = useSelector(selectPostStatus)
  const postError = useSelector(selectPostError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  let content
  if (postStatus === 'loading') {
    content = <Spinner text="Loading..." />
  } else if (postStatus === 'succeeded') {
    // const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date)) // make a copy & order it by datetime string DESC
    // content = orderedPosts.map((post) => <PostExcerpt post={post} key={post.id} />)
    content = orderedPostIds.map((postId) => <PostExcerpt postId={postId} key={postId} />)
  } else if (postStatus === 'failed') {
    content = <div>{postError}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
