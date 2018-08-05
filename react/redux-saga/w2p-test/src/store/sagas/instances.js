import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';

import * as actions from '../actions';

export function* fetchInstancesSaga(action) {
    yield put(actions.fetchInstancesStart());

    try {

        const response = yield axios.get('/w2p/instances.json');
        console.log('[fetch instances response data]', response.data);
        
        yield put(actions.fetchInstancesSuccess(response.data));

    } catch(error) {
        yield put(actions.fetchInstancesFail(error))
    }
}