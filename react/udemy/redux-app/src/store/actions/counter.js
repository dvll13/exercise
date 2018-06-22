import * as actionTypes from './actionTypes';

// action creators:

export const increment = () => {
    return {
        type: actionTypes.INCREMENT
    }
};

export const decrement = () => {
    return {
        type: actionTypes.DECREMENT
    }
};

export const add = (value) => {
    return {
        type: actionTypes.ADD,
        some_value: value
    }
};

export const subtract = (value) => {
    return {
        type: actionTypes.SUBTRACT,
        some_value: value
    }
};