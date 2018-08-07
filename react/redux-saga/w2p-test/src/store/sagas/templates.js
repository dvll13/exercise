import { put } from 'redux-saga/effects';
import axios from '../../axios-instance';

import * as actions from '../actions';
import { createIdsToObjects } from './utils';

export function* fetchLatestTemplatesSaga(action) {
    yield put(actions.fetchLatestTemplatesStart());

    try {

        const response = yield axios.get('/w2p/templates.json');
        console.log('[RESPONSE] fetched templates:', response.data);

        const adaptedData = createIdsToObjects(response.data);
        yield put(actions.addTemplates( adaptedData.idsToObjects ));
        yield put(actions.fetchLatestTemplatesSuccess( adaptedData.ids.slice(3) ));
    } catch (error) {
        yield put(actions.fetchLatestTemplatesFail(error))
    }
}