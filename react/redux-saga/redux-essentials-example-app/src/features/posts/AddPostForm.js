import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

const AddPostForm = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)

  const onSavePostClicked = async () => {
    if (!canSave) return

    try {
      setAddRequestStatus('pending')
      await dispatch(addNewPost({ title, content, user: userId })).unwrap()
      setTitle('')
      setUserId('')
      setContent('')
    } catch (error) {
      console.log('Failed to save the post:', error)
    } finally {
      setAddRequestStatus('idle')
    }

    // if (!title || !content) return
    // dispatch(addNewPost(title, content, userId))
    // setTitle('')
    // setUserId('')
    // setContent('')
  }

  const usersOptions = users.map((user) => (
    <option value={user.id} key={user.id}>
      {user.name}
    </option>
  ))

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

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

        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
