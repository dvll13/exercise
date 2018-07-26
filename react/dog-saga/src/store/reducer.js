import * as actionTypes from './actionTypes';

// reducer with initial state
const initialState = {
    fetching: false,
    dog: null,
    error: null
};

export const reducer = (state = initialState, action) => {
    switch( action.type ) {
        case actionTypes.API_CALL_REQUEST:
            return {
                ...state,
                fetching: true,
                error: null
            };

        case actionTypes.API_CALL_SUCCESS:
            return {
                ...state,
                fetching: false,
                dog: action.dog
            };

        case actionTypes.API_CALL_FAILURE:
            return {
                ...state,
                fetching: false,
                dog: null,
                error: action.error
            };

        default: return state;
    }
};