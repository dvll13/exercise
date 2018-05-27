// to run: node redux-basics.js

const redux = require('redux');
const createStre = redux.createStore;

const initialState = {
    counter: 0
}

// Reducer
const rootReducer = (state = initialState, action) => {
    if (action.type === 'INC_COUNTER') {
        // NEVER MUTATE any data!
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    
    if (action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
 
    return state;
}

// Store
const store = createStre(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
    console.log('[Subscription]', store.getState());
})

// Dispatching Action
// store.dispatch({type: 'INC_COUNTER', payload: { value: 1, ... }});
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());