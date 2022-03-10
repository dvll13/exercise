import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: {}
  },
  reducers: {
    getUser() {}, // so the action is created
    setUser(state, action) {
      const userData = action.payload
      state.data = {
        ...userData
      }
      // works with return instead if there was no data object in the state:
      // return {
      //   ...state,
      //   ...userData
      // }
    }
  }
})

export const { getUser, setUser } = userSlice.actions

export default userSlice.reducer
