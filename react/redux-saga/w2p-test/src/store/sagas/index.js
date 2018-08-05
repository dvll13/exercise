import { takeLatest } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import { fetchTemplatesSaga } from './templates';
import { fetchInstancesSaga } from './instances';

export function* watchTemplates() {
    yield takeLatest(actionTypes.FETCH_TEMPLATES, fetchTemplatesSaga);
}

export function* watchInstances() {
    yield takeLatest(actionTypes.FETCH_INSTANCES, fetchInstancesSaga);
}