import { createSlice, /*nanoid,*/ createAsyncThunk, createSelector, createEntityAdapter } from '@reduxjs/toolkit'
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

// const initialState = {
//   posts: [],
//   status: 'idle',
//   error: null
// }

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  status: 'idle', // add additional fields to the normalized state
  error: null
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            date: new Date().toISOString(),
            title,
            content,
            userId
          }
        }
      }
    },

    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      // const existingPost = state.posts.find((post) => post.id === id)
      const existingPost = state.entities[id]

      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },

    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      // const existingPost = state.posts.find((post) => post.id === postId)
      const existingPost = state.entities[postId]

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
        // state.posts = state.posts.concat(action.payload)
        postsAdapter.upsertMany(state, action.payload) // Use the `upsertMany` reducer as a mutating update utility, merges payload to the state based on matching ids
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      // .addCase(addNewPost.fulfilled, (state, action) => {
      //   state.posts.push(action.payload)
      // })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne) // We can use the adapter functions as reducers directly, so we'll pass postsAdapter.addOne as the reducer function to handle that action
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
// export const selectAllPosts = (state) => state.posts.posts
// export const selectPostById = (id) => (state) => state.posts.posts.find((post) => post.id === id)

// Export the generated customized selectors for this adapter using `getSelectors`
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state) => state.posts)

// createSelector API - exported from the 'reselect' lib. It generates memoized selector functions and takes one or more "input selector" functions as argument, plus an "output selector" function. When we call selectPostsByUser(state, userId), createSelector will pass all the arguments into each of our input selectors. Whatever those input selectors return becomes the arguments for the output selector.`
//If we try calling selectPostsByUser multiple times, it will only re-run the output selector if either posts or userId has changed
export const selectPostsByUser = createSelector([selectAllPosts, (state, userId) => userId], (posts, userId) =>
  posts.filter((post) => post.user === userId)
)

export const { postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
