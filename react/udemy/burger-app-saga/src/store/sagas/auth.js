import axios from 'axios';
import { delay } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import * as actions from '../actions';

export function* logoutSaga( action ) {
    // each step should be prefixed with 'yield'

    // yield localStorage.removeItem( 'token' );
    // yield localStorage.removeItem( 'expirationDate' );
    // yield localStorage.removeItem( 'userId' );

    // call makes generators testable, because you can really mock this, and don't execute this code
    // can be used for localStorage, axios
    yield call([localStorage, 'removeItem'], 'token');
    yield call([localStorage, 'removeItem'], 'expirationDate');
    yield call([localStorage, 'removeItem'], 'userId');

    // dispatch the action
    yield put( actions.logoutSucceed()) ;
}

export function* checkAuthTimeoutSaga( action ) {
    yield delay( action.expirationTime * 1000 );
    yield put( actions.logout() );
}

export function* authUserSaga( action ) {
    yield put( actions.authStart() );

    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }

    // firebase api key from its WEB SETUP section
    const apiKey = 'AIzaSyAV_YKxAHPeyQDaoHZPPikU0ZYIZibJPaE';
    // url from https://firebase.google.com/docs/reference/rest/auth/
    let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey;
    
    if (!action.isSignup) {
        url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey;
    }

    try {

        const response = yield axios.post(url, authData);
        console.log(response);
        /* response.data:
            {
                email: ...,
                expiresIn: [seconds],
                idToken: ... (can be decrypted to a js object)
                kind: ...
                localId: ...
                refreshToken: (used to generate a new token by you or the app; send it to a rest end point to get a new id token; for security reasons (xss) you can refresh it on every browser reload or signin)
            }
        */

        // the next few are synchronous, but for a consistency we can add yields
        const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

        yield localStorage.setItem('token', response.data.idToken);
        yield localStorage.setItem('expirationDate', expirationDate);
        yield localStorage.setItem('userId', response.data.localId);

        yield put( actions.authSuccess( response.data.idToken, response.data.localId ) );
        yield put( actions.checkAuthTimeout( response.data.expiresIn ) );
    
    } catch( error ) { 

        console.log(error);
        yield put( actions.authFail( error.response.data.error ) );

    }
}

export function* authCheckStateSaga( action ) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield put(actions.logout());
    } else {
        const expirationDate = yield new Date( localStorage.getItem('expirationDate') ); // convert the string to Date
        if (expirationDate <= new Date()) {
            yield put(actions.logout());
        } else {
            const userId = yield localStorage.getItem('userId');
            yield put(actions.authSuccess( token, userId) );
            yield put(actions.checkAuthTimeout( ( expirationDate.getTime() - new Date().getTime() ) / 1000 ) );
        }
    }
}