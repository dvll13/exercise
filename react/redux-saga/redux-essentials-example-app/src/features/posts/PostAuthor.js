import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../users/usersSlice'

const PostAuthor = ({ userId }) => {
  const author = useSelector(selectUser(userId))

  return <span>by {author ? author.name : 'Unknown author'}</span>
}

export default PostAuthor
