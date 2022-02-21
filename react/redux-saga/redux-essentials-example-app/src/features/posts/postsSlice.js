import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!', userId: '1' },
  { id: '2', title: 'Second Post', content: 'More text', userId: '0' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId
          }
        }
      }
    },

    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.find((post) => post.id === id)

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    }
  }
})

export const selectPosts = (state) => state.posts
export const selectPost = (id) => (state) => state.posts.find((post) => post.id === id)

export const { postAdded, postUpdated } = postsSlice.actions

export default postsSlice.reducer
