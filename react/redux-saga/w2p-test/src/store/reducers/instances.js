import * as actionTypes from '../actions/actionTypes';

const initialState = {
    instances: [],
    loading: false,
    error: null
}

const fetchInstancesStart = state => {
    return {
        ...state,
        loading: true
    }
}

const fetchInstancesSuccess = (state, action) => {
    return {
        ...state,
        instances: action.instances,
        loading: false
    }
}

const fetchInstancesFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_INSTANCES_START: return fetchInstancesStart(state);
        case actionTypes.FETCH_INSTANCES_SUCCESS: return fetchInstancesSuccess(state, action);
        case actionTypes.FETCH_INSTANCES_FAIL: return fetchInstancesFail(state, action);
        default: return state;
    }
}

export default reducer;