import { takeLatest } from 'redux-saga/effects'
// import { GET_USER } from '../ducks/user'
import { getUser } from '../ducks/userSlice'
import { handleGetUser } from './handlers/user'

// the watcher saga runs constantly in the background and listens for any redux actions so that it can map them to its handlers
export function* watcherSaga() {
  //yield takeLatest(GET_USER, handleGetUser)
  yield takeLatest(getUser.type, handleGetUser)
  console.log('getUser.type:', getUser.type)
}
