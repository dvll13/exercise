import * as actionTypes from './actions';

const initialState = {
    persons: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD:
            return {
                ...state,
                persons: state.counter + action.some_value
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