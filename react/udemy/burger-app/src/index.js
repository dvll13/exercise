import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import BurgerBuilderReducer from './store/reducers/BurgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    burgerBuilder: BurgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk) // for async code
));

// Provider should wrap everything
// TODO: fix basename -> <BrowserRouter basename='burger'>
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
registerServiceWorker();
