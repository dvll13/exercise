import { configureStore } from '@reduxjs/toolkit'
import counterSliceReducer from './counterSlice'

const rootReducer = {
  counter: counterSliceReducer
}

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false })
})

export default store
