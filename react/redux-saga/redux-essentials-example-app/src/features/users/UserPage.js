import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from './usersSlice'
import { selectAllPosts } from '../posts/postsSlice'

const UserPage = () => {
  const params = useParams()
  const userId = params.userId
  const user = useSelector(selectUser(userId))

  const postsForUser = useSelector((state) => {
    const allPosts = selectAllPosts(state)
    return allPosts.filter((post) => post.user === userId)
  })

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
