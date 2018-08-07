import * as actionTypes from './types';

export const addInstances = instancesByIds => {
    return {
        type: actionTypes.ADD_INSTANCES,
        instancesByIds
    }
}

export const fetchLatestInstances = () => {
    return {
        type: actionTypes.FETCH_LATEST_INSTANCES
    }
}

export const fetchLatestInstancesStart = () => {
    return {
        type: actionTypes.FETCH_LATEST_INSTANCES_START
    }
}

export const fetchLatestInstancesSuccess = latestInstancesIds => {
    return {
        type: actionTypes.FETCH_LATEST_INSTANCES_SUCCESS,
        latestInstancesIds
    }
}

export const fetchLatestInstancesFail = error => {
    return {
        type: actionTypes.FETCH_LATEST_INSTANCES_FAIL,
        error
    }
}