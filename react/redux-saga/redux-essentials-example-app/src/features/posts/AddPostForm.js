import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { nanoid } from '@reduxjs/toolkit'
import { addPost } from './postsSlice'

const AddPostForm = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onSave = () => {
    if (!title || !content) return
    dispatch(addPost({ id: nanoid(), title, content }))
    setTitle('')
    setContent('')
  }

  return (
    <section>
      <h2>Add a new post</h2>
      <form action="">
        <label htmlFor="postTitle">Post Title:</label>
        <input type="text" id="postTitle" name="postTitle" value={title} onChange={onTitleChanged} />

        <label htmlFor="postContent">Post Content:</label>
        <input type="text" id="postContent" name="postContent" value={content} onChange={onContentChanged} multiple />

        <button type="button" onClick={onSave}>
          Save post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
