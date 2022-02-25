import { put, takeEvery, all, call } from 'redux-saga/effects'

export const delay = (ms) => new Promise((res) => setTimeout(res, ms))

function* helloSaga() {
  console.log('Hello Sagas!')
}

// Our worker Saga: will perform the async increment task
function* incrementAsync() {
  yield call(delay, 1000) // => { CALL: {fn: delay, args: [1000]}}
  yield put({ type: 'INCREMENT' }) // => { PUT: {type: 'INCREMENT'} }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()])
}
