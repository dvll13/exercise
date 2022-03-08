import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { postUpdated, selectPostById } from './postsSlice'

const EditPostForm = () => {
  const navigate = useNavigate()
  const params = useParams()
  const postId = params.postId
  const post = useSelector((state) => selectPostById(state, postId))
  const dispatch = useDispatch()

  const [title, setTitle] = useState(post.title || '')
  const [content, setContent] = useState(post.content || '')

  const onSavePostClicked = () => {
    if (!title || !content) return

    dispatch(postUpdated({ id: postId, title, content }))
    navigate(`/posts/${postId}`)
  }

  return (
    <section>
      <h2>Edit post</h2>

      <form>
        <label htmlFor="postTitle">Post title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
          }}
        />

        <label htmlFor="postContent">Post content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => {
            setContent(e.target.value)
          }}
        />
      </form>

      <button type="button" onClick={onSavePostClicked}>
        Save post
      </button>
    </section>
  )
}

export default EditPostForm
