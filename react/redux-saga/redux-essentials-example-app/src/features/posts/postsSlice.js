import { createSlice, /*nanoid,*/ createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'
// import { sub } from 'date-fns'

// {
//   id: '1',
//   date: sub(new Date(), { minutes: 10 }).toISOString(),
//   title: 'First Post!',
//   content: 'Hello!',
//   userId: '1',
//   reactions: {
//     thumbsUp: 0,
//     hooray: 0,
//     heart: 0,
//     rocket: 0,
//     eyes: 0
//   }
// },
// {
//   id: '2',
//   date: sub(new Date(), { minutes: 5 }).toISOString(),
//   title: 'Second Post',
//   content: 'More text',
//   userId: '0',
//   reactions: {
//     thumbsUp: 0,
//     hooray: 2,
//     heart: 0,
//     rocket: 1,
//     eyes: 0
//   }
// }

const initialState = {
  posts: [],
  status: 'idle',
  error: null
}

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // postAdded: {
    //   reducer(state, action) {
    //     state.posts.push(action.payload)
    //   },
    //   prepare(title, content, userId) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         date: new Date().toISOString(),
    //         title,
    //         content,
    //         userId
    //       }
    //     }
    //   }
    // },

    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const existingPost = state.posts.find((post) => post.id === id)

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const existingPost = state.posts.find((post) => post.id === postId)

      if (existingPost) {
        existingPost.reactions[reaction]++
      }
    }
  },

  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      })
  }
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
  // The payload creator receives the partial `{title, content, user}` object
  const response = await client.post('fakeApi/posts', initialPost)
  // The response includes the complete post object, including unique ID from the server
  return response.data
})

export const selectPostStatus = (state) => state.posts.status
export const selectPostError = (state) => state.posts.error
export const selectAllPosts = (state) => state.posts.posts
export const selectPostById = (id) => (state) => state.posts.posts.find((post) => post.id === id)

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
