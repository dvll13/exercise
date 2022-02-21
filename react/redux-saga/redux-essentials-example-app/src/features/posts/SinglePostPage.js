import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPost } from './postsSlice'
import PostAuthor from './PostAuthor'

const SinglePostPage = () => {
  const params = useParams()
  //  const post = useSelector((state) => state.posts.find(post.id === params.postId))
  const post = useSelector(selectPost(params.postId))

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <PostAuthor userId={post.userId} />
        <p className="post-content">{post.content}</p>
        <Link to={`/editPost/${post.id}`} className="button">
          Edit post
        </Link>
      </article>
    </section>
  )
}

export default SinglePostPage
