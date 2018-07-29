import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
//1. saga middleware
import createSagaMiddleware from 'redux-saga';

import registerServiceWorker from './registerServiceWorker';
import './index.css';
import App from './App';
import BurgerBuilderReducer from './store/reducers/BurgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
//2. sagas
import { watchAuth, watchBurgerBuilder, watchOrder } from './store/sagas';

// only use in dev mode
const composeEnhancers = process.env.NODE_ENV === 'development'
                            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                            : null 
                                || compose;

const rootReducer = combineReducers({
    burgerBuilder: BurgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});

//3
const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware) // for async code
));

//4 run watchers
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);

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
