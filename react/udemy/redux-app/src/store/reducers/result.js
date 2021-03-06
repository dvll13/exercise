import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    results: []
};

const deleteResult = (state, action) => {
    // v1:
    // const id = 2;
    // const newArr = [...state.results];
    // newArr.splice(id, 1);

    //v2:
    //reurns a new array
    const updatedArr = state.results.filter(result => result.id !== action.resultElId);
    return updateObject(state, { results: updatedArr });
}

const reducer = (state = initialState, action) => {
    // replace, but never MUTATE state data!
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            // put more logic here, a good place to modify the data before storing it in the state
            return updateObject(state, {
                // results: state.results.push(state.counter) // NO! modifies the state.results (MUTABLE)
                results: state.results.concat({ // returns a new array (IMMUTABLE)
                    id: new Date(), // not good practice
                    // value: state.counter // to get value from the global state, it should be passed as action payload
                    value: action.result
                })
            });
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
        default:
            return state;
    }
};

export default reducer;