// takeEvery - listen to certain actions and do smth when they occur
import { takeEvery, takeLatest, all } from 'redux-saga/effects';

import * as actionTypes from '../actions/actionTypes';
import {
    logoutSaga,
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga
} from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './order';

// add listeners

export function* watchAuth() {
    // not executed in this order, the second one doesn't wait for the first one
    // yield takeEvery( actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga );
    // yield takeEvery( actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga );
    // yield takeEvery( actionTypes.AUTH_USER, authUserSaga );
    // yield takeEvery( actionTypes.AUTH_CHECK_STATE, authCheckStateSaga );

    yield all([ // pass here all the actions you want to yield
        // they run concurrently
        takeEvery( actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga ),
        takeEvery( actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga ),
        takeEvery( actionTypes.AUTH_USER, authUserSaga ),
        takeEvery( actionTypes.AUTH_CHECK_STATE, authCheckStateSaga )
    ]);
    // you can pass multiple calls, axios requests, tasks, to execute them simultaneously
}

export function* watchBurgerBuilder() {
    yield takeEvery( actionTypes.INIT_INGREDIENTS, initIngredientsSaga );
}

export function* watchOrder() {
    yield takeLatest( actionTypes.PURCHASE_BURGER, purchaseBurgerSaga );
    yield takeEvery( actionTypes.FETCH_ORDERS, fetchOrdersSaga );
}