import * as actionTypes from './actionTypes';

export const saveResult = (res) => {
    // a possible place to modify the data before storing it in the state
    // but better separate the logic: async stuff here and possibly prepare and clean data, then pass it for the actual modifications to the reducer
    // const updatedResult = res * 2;
    return {
        type: actionTypes.STORE_RESULT,
        result: res
    }
}

export const storeResult = (res) => {
    // simulating asynchrony (a delayed server response)
    return (dispatch, getState) => {
        // the best place to fetch data
        setTimeout(() => {
            // const oldCounter = getState().ctr.counter;
            // console.log('oldCounter:', oldCounter);
            // don't overuse getState, you can instead pass what you need as a 'export const storeResult = (res, someStateProperty) => {'
            dispatch(saveResult(res));
        }, 2000)
    }

    // return {
    //     type: STORE_RESULT,
    //     result: result
    // }
};

export const deleteResult = (resultElId) => {
    return {
        type: actionTypes.DELETE_RESULT,
        resultElId: resultElId
    }
};