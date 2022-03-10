import { call, put, takeEvery } from 'redux-saga/effects'
import { getCatsFetch, getCatsSuccess } from './catState'

// call - call urls and apis
// put - call actions
// listens for actions and triggers a function when that action's been called

function* workGetCatsFetch(action) {
  const fetchAfter = action.payload ? action.payload.fetchAfter : 0

  const cats = yield call(() => fetch('https://api.thecatapi.com/v1/breeds'))
  const formattedCats = yield cats.json()
  const formattedCatsShortened = formattedCats.slice(fetchAfter, fetchAfter + 10)
  console.log({ formattedCatsShortened })
  yield put(getCatsSuccess(formattedCatsShortened))
}

function* catSaga() {
  yield takeEvery(getCatsFetch.type, workGetCatsFetch)
}

export default catSaga
