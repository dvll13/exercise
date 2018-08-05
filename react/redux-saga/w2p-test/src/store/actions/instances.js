import * as actionTypes from './actionTypes';

export const fetchInstances = () => {
    return {
        type: actionTypes.FETCH_INSTANCES
    }
}

export const fetchInstancesStart = () => {
    return {
        type: actionTypes.FETCH_INSTANCES_START
    }
}

export const fetchInstancesSuccess = instances => {
    return {
        type: actionTypes.FETCH_INSTANCES_SUCCESS,
        instances
    }
}

export const fetchInstancesFail = error => {
    return {
        type: actionTypes.FETCH_INSTANCES_FAIL,
        error
    }
}