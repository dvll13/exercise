import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/types';
import { fetchLatestTemplatesSaga } from './templates';
import { fetchLatestInstancesSaga } from './instances';

export function* watchTemplates() {
    yield takeLatest(actionTypes.FETCH_LATEST_TEMPLATES, fetchLatestTemplatesSaga);
}

export function* watchInstances() {
    yield takeLatest(actionTypes.FETCH_LATEST_INSTANCES, fetchLatestInstancesSaga);
}