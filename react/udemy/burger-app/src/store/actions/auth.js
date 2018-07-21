import axios from 'axios';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = authData => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        // firebase api key from its WEB SETUP section
        const apiKey = 'AIzaSyAV_YKxAHPeyQDaoHZPPikU0ZYIZibJPaE';
        // url from https://firebase.google.com/docs/reference/rest/auth/
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey;
        
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey;
        }

        axios.post(url, authData)
            .then(response => {
                console.log(response);
                /*
                    response.data:
                    {
                        email: ...,
                        expiresIn: [seconds],
                        idToken: ... (can be decrypted to a js object)
                        kind: ...
                        localId
                        refreshToken: (used to generate a new token by you or the app)
                    }
                 */
                dispatch(authSuccess(response.data));
            })
            .catch(err => {
                console.log(err);
                dispatch(authFail(err));
            })
    }
}