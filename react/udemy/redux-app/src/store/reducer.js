const initialState = {
    counter: 0,
    results: []
};

const reducer = (state = initialState, action) => {
    // replace, but never MUTATE state data!
    switch (action.type) {
        //convention is UPPERCASE
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1 //adds the property or replaces it if present in ...state
            };
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            };
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.some_value
            };
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.some_value
            };
        case 'STORE_RESULT':
            return {
                ...state,
                // results: state.results.push(state.counter) // NO! modifies the state.results (MUTABLE)
                results: state.results.concat({ // returns a new array (IMMUTABLE)
                    id: new Date(),
                    value: state.counter
                })
            };
        case 'DELETE_RESULT':
            // v1:
            // const id = 2;
            // const newArr = [...state.results];
            // newArr.splice(id, 1);

            //v2:
            //reurns a new array
            const updatedArr = state.results.filter(result => result.id !== action.resultElId);

            return {
                ...state,
                results: updatedArr
            };
        default:
            return state;
    }
};

export default reducer;