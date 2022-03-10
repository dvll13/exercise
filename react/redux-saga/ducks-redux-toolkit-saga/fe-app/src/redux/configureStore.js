import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import counterReducer from './ducks/counter'
import userReducer from './ducks/userSlice'
import { watcherSaga } from './sagas/rootSaga'

const rootReducer = {
  counter: counterReducer,
  user: userReducer
}

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})
console.log({ store })

// the saga is async, doesn't block the app
sagaMiddleware.run(watcherSaga)

export default store
