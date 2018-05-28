const initialState = {
    counter: 0
}

const reducer = (state = initialState, action) => {
    // replace, but never MUTATE state data!

                        //convention is UPPERCASE
    if (action.type === 'INCREMENT') {
        return {
            //since we only have 1 property
            counter: state.counter + 1
        }
    }
    if (action.type === 'DECREMENT') {
        return {
            counter: state.counter - 1
        }
    }
    if (action.type === 'ADD') {
        return {
            counter: state.counter + 5
        }
    }
    if (action.type === 'SUBTRACT') {
        return {
            counter: state.counter - 5
        }
    }

    return state;
};

export default reducer;