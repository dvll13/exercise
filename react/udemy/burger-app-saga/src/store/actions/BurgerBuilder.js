import * as actionTypes from './actionTypes';

export const addIngredient = name => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
};

export const removeIngredient = name => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
};

// synchronous action creator
export const setIngredients = ingredients => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

export const initIngredients = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS
    }
};

// export const initIngredients = () => {
//     return dispatch => { // available due to thunk
//         axios.get('https://react-my-burger-dvll.firebaseio.com/ingredients.json')
//             .then(response => {
//                 dispatch(setIngredients(response.data));
//             })
//             .catch(error => {
//                 dispatch(fetchIngredientsFailed());
//             });
//     }
// };