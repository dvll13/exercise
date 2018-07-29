import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (idToken, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: idToken,
        userId: userId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    //side effects are moved to logoutSaga
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');

    return {
        type: actionTypes.AUTH_INITIATE_LOGOUT
    }
}

export const logoutSucceed = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return {
        type: actionTypes.AUTH_CHECK_TIMEOUT,
        expirationTime
    }
}

export const auth = (email, password, isSignup) => {
    return {
        type: actionTypes.AUTH_USER,
        email,
        password,
        isSignup
    }
}

export const setAuthRedirectPath = path => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return {
        type: actionTypes.AUTH_CHECK_STATE
    }
}



// goes to checkAuthTimeoutSaga()
// export const checkAuthTimeout = (expirationTime) => {
//     return dispatch => {
//         setTimeout(() => {
//             dispatch( logout() );
//         }, expirationTime * 1000)
//     }
// }

// export const auth = (email, password, isSignup) => {
//     return dispatch => {
//         dispatch( authStart() );

//         const authData = {
//             email: email,
//             password: password,
//             returnSecureToken: true
//         }

//         // firebase api key from its WEB SETUP section
//         const apiKey = 'AIzaSyAV_YKxAHPeyQDaoHZPPikU0ZYIZibJPaE';
//         // url from https://firebase.google.com/docs/reference/rest/auth/
//         let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey;
        
//         if (!isSignup) {
//             url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey;
//         }

//         axios.post(url, authData)
//             .then(response => {
//                 console.log(response);
//                 /*
//                     response.data:
//                     {
//                         email: ...,
//                         expiresIn: [seconds],
//                         idToken: ... (can be decrypted to a js object)
//                         kind: ...
//                         localId: ...
//                         refreshToken: (used to generate a new token by you or the app; send it to a rest end point to get a new id token; for security reasons (xss) you can refresh it on every browser reload or signin)
//                     }
//                  */

//                 const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);

//                 localStorage.setItem('token', response.data.idToken);
//                 localStorage.setItem('expirationDate', expirationDate);
//                 localStorage.setItem('userId', response.data.localId);

//                 dispatch( authSuccess( response.data.idToken, response.data.localId ) );
//                 dispatch( checkAuthTimeout( response.data.expiresIn ) );
//             })
//             .catch(err => {
//                 console.log(err);
//                 dispatch( authFail( err.response.data.error ) );
//             })
//     }
// }

// export const authCheckState = () => {
//     return dispatch => {
//         const token = localStorage.getItem('token');
//         if (!token) {
//             dispatch(logout());
//         } else {
//             const expirationDate = new Date( localStorage.getItem('expirationDate') ); // convert the string to Date
//             if (expirationDate <= new Date()) {
//                 dispatch( logout() );
//             } else {
//                 const userId = localStorage.getItem('userId');
//                 dispatch( authSuccess( token, userId) );
//                 dispatch( checkAuthTimeout( ( expirationDate.getTime() - new Date().getTime() ) / 1000 ) );
//             }
//         }
//     }
// }