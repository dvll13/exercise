import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';

import * as actions from '../actions';
import { createIdsToObjects } from './utils';

export function* fetchLatestInstancesSaga(action) {
    yield put(actions.fetchLatestInstancesStart());

    try {

        const response = yield axios.get('/w2p/instances.json');
        console.log('[RESPONSE] fetched instances:', response.data);
        
        const adaptedData = createIdsToObjects(response.data);
        yield put(actions.addInstances( adaptedData.idsToObjects ));
        yield put(actions.fetchLatestInstancesSuccess( adaptedData.ids.slice(2) ));
    } catch(error) {
        yield put(actions.fetchLatestInstancesFail(error))
    }
}