import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    showCounter: true,
  },
  reducers: {
    increment(state) {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value++
    },
    decrement(state) {
      state.value--
    },
    incrementByAmount(state, action) {
      state.value += action.payload
    },
    toggle(state) {
      state.showCounter = !state.showCounter
    },
  },
  // selectors: {
  //   selectCount: (counter) => counter.value,
  // },
})

export const { increment, decrement, incrementByAmount, toggle } = counterSlice.actions
// export const { selectCount } = counterSlice.selectors

export default counterSlice.reducer
