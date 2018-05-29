const initialState = {
    counter: 0,
    results: []
}

const reducer = (state = initialState, action) => {
    // replace, but never MUTATE state data!
    switch (action.type) {
        //convention is UPPERCASE
        case 'INCREMENT':
            return {
                ...state,
                counter: state.counter + 1 //adds the property or replaces it if present in ...state
            }
        case 'DECREMENT':
            return {
                ...state,
                counter: state.counter - 1
            }
        case 'ADD':
            return {
                ...state,
                counter: state.counter + action.some_value
            }
        case 'SUBTRACT':
            return {
                ...state,
                counter: state.counter - action.some_value
            }
        case 'STORE_RESULT':
            return {
                ...state,
                // results: state.results.push(state.counter) // NO! modifies the state.results (MUTABLE)
                results: state.results.concat({ // returns a new array (IMMUTABLE)
                    id: new Date(),
                    value: state.counter
                }) 
            }
        default:
            return state;
    }
};

export default reducer;