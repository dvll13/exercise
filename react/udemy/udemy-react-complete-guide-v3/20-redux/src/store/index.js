import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counter'
import authReducer from './auth'

const store = configureStore({
  // reducer: counterSlice.reducer, // if it's only one slice
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
})

export default store

// import { createStore } from 'redux'

// const counterReducer = (state = initialState, action) => {
//   if (action.type === 'INCREMENT') {
//     return { ...state, counter: state.counter + 1 }
//   }

//   if (action.type === 'DECREMENT') {
//     return { ...state, counter: state.counter - 1 }
//   }

//   if (action.type === 'INCREASE') {
//     return { ...state, counter: state.counter + action.amount }
//   }

//   if (action.type === 'TOGGLE') {
//     return { ...state, showCounter: !state.showCounter }
//   }

//   return state
// }

// const store = createStore(counterReducer)
