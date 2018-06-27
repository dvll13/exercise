import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    // replace, but never MUTATE state data!
    switch (action.type) {
        //convention is UPPERCASE
        case actionTypes.INCREMENT:
            return updateObject(state, {counter: state.counter + 1});
        case actionTypes.DECREMENT:
            return updateObject(state, {counter: state.counter - 1});
        case actionTypes.ADD:
            return updateObject(state, {counter: state.counter + action.some_value});
        case actionTypes.SUBTRACT:
            return updateObject(state, {counter: state.counter - action.some_value});
        default:
            return state;
    }
};

export default reducer;