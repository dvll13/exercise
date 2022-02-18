import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      /*
      console.log({ action }):
      {
          "type": "posts/addPost",
          "payload": {
            "title": "test",
            "content": "test text"
          }
        }
       */
      state.push(action.payload)
    }
  }
})

export const selectPosts = (state) => state.posts

export const { addPost } = postsSlice.actions

export default postsSlice.reducer
