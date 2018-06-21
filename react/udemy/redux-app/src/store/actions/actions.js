export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const STORE_RESULT = 'STORE_RESULT';
export const DELETE_RESULT = 'DELETE_RESULT';


// action creators:

export const increment = () => {
    return {
        type: INCREMENT
    }
};

export const decrement = () => {
    return {
        type: DECREMENT
    }
};

export const add = (value) => {
    return {
        type: ADD,
        some_value: value
    }
};

export const subtract = (value) => {
    return {
        type: SUBTRACT,
        some_value: value
    }
};

export const storeResult = (result) => {
    // simulating asynchrony (a delayed server response)
    return dispatch => {
        setTimeout(() => {
            dispatch();
        }, 2000)
    }

    // return {
    //     type: STORE_RESULT,
    //     result: result
    // }
};

export const deleteResult = (resultElId) => {
    return {
        type: DELETE_RESULT,
        resultElId: resultElId
    }
};