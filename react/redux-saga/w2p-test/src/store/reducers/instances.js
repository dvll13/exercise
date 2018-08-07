import * as actionTypes from '../actions/types';

const initialState = {
    instancesByIds: {},
    latestInstancesIds: [],
    loading: false,
    error: null
}

const addInstances = (state, action) => {
    return {
        ...state,
        instancesByIds: action.instancesByIds,
        loading: true,
        error: null
    }
}

const fetchLatestInstancesStart = state => {
    return {
        ...state,
        loading: true,
        error: null
    }
}

const fetchLatestInstancesSuccess = (state, action) => {
    return {
        ...state,
        latestInstancesIds: action.latestInstancesIds,
        loading: false
    }
}

const fetchLatestInstancesFail = (state, action) => {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INSTANCES: return addInstances(state, action);
        case actionTypes.FETCH_LATEST_INSTANCES_START: return fetchLatestInstancesStart(state);
        case actionTypes.FETCH_LATEST_INSTANCES_SUCCESS: return fetchLatestInstancesSuccess(state, action);
        case actionTypes.FETCH_LATEST_INSTANCES_FAIL: return fetchLatestInstancesFail(state, action);
        default: return state;
    }
}

export default reducer;