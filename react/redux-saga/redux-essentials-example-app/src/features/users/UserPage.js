import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'

const UserPage = () => {
  const params = useParams()
  const userId = params.userId
  const user = useSelector((state) => selectUserById(state, userId))

  // const postsForUser = useSelector((state) => {
  //   const allPosts = selectAllPosts(state)
  //   return allPosts.filter((post) => post.user === userId)
  // }) USE MEMOIZED SELECTOR INSTEAD:
  // const postsForUser = useSelector((state) => selectPostsByUser(state, userId))
  const postsForUser = useSelector((state) => selectPostsByUser(state, userId))

  const postsTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postsTitles}</ul>
    </section>
  )
}

export default UserPage
