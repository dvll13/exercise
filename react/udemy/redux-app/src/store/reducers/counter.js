import * as actionTypes from '../actions/actionTypes';

const initialState = {
    counter: 0
};

const reducer = (state = initialState, action) => {
    // replace, but never MUTATE state data!
    switch (action.type) {
        //convention is UPPERCASE
        case actionTypes.INCREMENT:
            return {
                ...state,
                counter: state.counter + 1 //adds the property or replaces it if present in ...state
            };
        case actionTypes.DECREMENT:
            return {
                ...state,
                counter: state.counter - 1
            };
        case actionTypes.ADD:
            return {
                ...state,
                counter: state.counter + action.some_value
            };
        case actionTypes.SUBTRACT:
            return {
                ...state,
                counter: state.counter - action.some_value
            };
        default:
            return state;
    }
};

export default reducer;