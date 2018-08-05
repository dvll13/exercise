import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';

import * as actions from '../actions';

export function* fetchTemplatesSaga(action) {
    yield put(actions.fetchTemplatesStart());

    try {

        const response = yield axios.get('/w2p/templates.json');
        console.log('[fetch templates response data]', response.data);
        
        yield put(actions.fetchTemplatesSuccess(response.data));

    } catch(error) {
        yield put(actions.fetchTemplatesFail(error))
    }
}