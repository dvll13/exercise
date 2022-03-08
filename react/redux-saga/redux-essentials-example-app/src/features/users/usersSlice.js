import { createAsyncThunk, createSlice, createEntityAdapter } from '@reduxjs/toolkit'
import { client } from '../../api/client'

// const initialState = []

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    // builder.addCase(fetchUsers.fulfilled, (state, action) => {
    //   return action.payload
    // })
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll) // always replaces the entire list
  }
})

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

// export const selectAllUsers = (state) => state.users
// export const selectUser = (id) => (state) => state.users.find((user) => user.id === id)
export const { selectAll: selectAllUsers, selectById: selectUserById } = usersAdapter.getSelectors(
  (state) => state.users
)

export default usersSlice.reducer
