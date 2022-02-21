import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postAdded } from './postsSlice'
import { selectUsers } from '../users/usersSlice'

const AddPostForm = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const onSave = () => {
    if (!title || !content) return
    dispatch(postAdded(title, content, userId))
    setTitle('')
    setUserId('')
    setContent('')
  }

  const usersOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ))

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

  return (
    <section>
      <h2>Add a new post</h2>
      <form action="">
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />

        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>

        <label htmlFor="postContent">Post Content:</label>
        <input type="text" id="postContent" name="postContent" value={content} onChange={onContentChanged} multiple />

        <button type="button" onClick={onSave} disabled={!canSave}>
          Save post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
