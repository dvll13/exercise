import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// saga init:
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { Provider } from "react-redux";

import { reducer } from './store/reducer';
import { watcherSaga } from "./store/sagas";

const sagaMiddleware = createSagaMiddleware();

// dev tools middleware
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// create a redux store with our reducer above and middleware
let store = createStore(
    reducer,
    compose( applyMiddleware( sagaMiddleware ), reduxDevTools )
);

// run the saga
sagaMiddleware.run( watcherSaga );


ReactDOM.render( <Provider store={store}><App/></Provider>, document.getElementById( 'root' ) );
registerServiceWorker();
