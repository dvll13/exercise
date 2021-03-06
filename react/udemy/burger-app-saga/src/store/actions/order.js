import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
};

export const purchaseBurgerFail = error => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

export const purchaseBurger = (orderData, token) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        orderData,
        token
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrders = (token, userId) => {
    return {
        type: actionTypes.FETCH_ORDERS,
        token,
        userId
    }
}



// export const purchaseBurger = (orderData, token) => {
//     return dispatch => {
//         dispatch(purchaseBurgerStart()); // start loading

//         axios.post('/orders.json?auth=' + token, orderData)
//             .then(response => {
//                 console.log(response.data);
//                 dispatch(purchaseBurgerSuccess(response.data.name, orderData))
//             })
//             .catch(error => {
//                 dispatch(purchaseBurgerFail(error))
//             });
//     }
// };

// export const fetchOrders = (token, userId) => {
//     return (dispatch /*, getState */) => {
//         dispatch(fetchOrdersStart());
        
//         // get orders for a specific userId (firebase specific)
//         const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;

//         axios.get('/orders.json' + queryParams)
//             .then(res => {
//                 console.log('res.data:', res.data);
                
//                 const fetchedOrders = [];
//                 for (let key in res.data) {
//                     fetchedOrders.push({
//                         id: key,
//                         ...res.data[key]
//                     })
//                 }
//                 console.log('fetchedOrders:', fetchedOrders);
                
//                 dispatch(fetchOrdersSuccess(fetchedOrders));
//             })
//             .catch(err => {
//                 dispatch(fetchOrdersFail(err));
//             })
//     }
// }