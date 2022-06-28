import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { persistMiddleware } from './middlewares/persist-middleware'
// import { ActionType } from './action-types'
import reducers from './reducers/index'

export const store = createStore(reducers, {}, applyMiddleware(persistMiddleware, thunk))

/* TESTS:
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code'
  }
})
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'text'
  }
})
store.dispatch({
  type: ActionType.INSERT_CELL_AFTER,
  payload: {
    id: null,
    type: 'code'
  }
})
/*
const state = store.getState()
console.log(state)
*/
