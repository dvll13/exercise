import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  // initialState: 0,
  initialState: {
    count: 0
  },
  reducers: {
    // increment: (state) => state + 1,
    // decrement: (state) => state - 1
    increment: (state) => {
      state.count++
    },
    decrement: (state) => {
      state.count--
    },
    incrementByParam: (state, action) => {
      const { value } = action.payload
      state.count += value
    }
  }
})

export const { increment, decrement, incrementByParam } = counterSlice.actions

export default counterSlice.reducer
