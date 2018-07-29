import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

import * as actions from '../actions';

export function* purchaseBurgerSaga( action ) {
    yield put( actions.purchaseBurgerStart() ); // start loading

    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData);
        console.log(response.data);
        
        yield put( actions.purchaseBurgerSuccess(response.data.name, action.orderData) );
    } catch( error ) {
        yield put( actions.purchaseBurgerFail( error ) );
    }
}

export function* fetchOrdersSaga( action ) {
    yield put( actions.fetchOrdersStart() );
        
    // get orders for a specific userId (firebase specific)
    const queryParams = `?auth=${action.token}&orderBy="userId"&equalTo="${action.userId}"`;
    
    try {
        const response = yield axios.get('/orders.json' + queryParams);
        console.log('res.data:', response.data);
        const fetchedOrders = [];
        for (let key in response.data) {
            fetchedOrders.push({
                id: key,
                ...response.data[key]
            })
        }
        console.log('fetchedOrders:', fetchedOrders);
        
        yield put( actions.fetchOrdersSuccess( fetchedOrders ) );
    } catch (error) {
        yield put( action.fetchOrdersFail( error ) );
    }
}