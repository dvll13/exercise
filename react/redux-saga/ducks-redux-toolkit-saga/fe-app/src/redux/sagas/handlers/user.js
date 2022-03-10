import { call, put } from 'redux-saga/effects'
import { requestGetUser } from '../requests/user'
// import { setUser } from '../../ducks/user'
import { setUser } from '../../ducks/userSlice'

export function* handleGetUser(action) {
  try {
    console.log('handleGetUser param:', action)
    /*
    {
      payload: {id: 1}
      type: "user/getUser"
    }
    */

    const { id } = action.payload

    // wait for this call to finish before we move on
    const response = yield call(requestGetUser, id)
    const { data } = response
    // yield put(setUser(data))
    yield put(setUser({ ...data })) // dispatch redux action
  } catch (error) {
    console.log(error)
  }
}
