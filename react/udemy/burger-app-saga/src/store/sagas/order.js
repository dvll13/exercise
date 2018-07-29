import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

export function* purchaseBurgerSaga( action ) {
    yield put( actions.purchaseBurgerStart() ); // start loading

    try {
        const response = yield axios.post('/orders.json?auth=' + token, orderData);
        console.log(response.data);
        yield put( actions.purchaseBurgerSuccess(response.data.name, orderData) );
    } catch( error ) {
        yield put( actions.purchaseBurgerFail( error ) );
    }
}