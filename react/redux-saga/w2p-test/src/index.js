import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import App from './App';

import templatesReducer from './store/reducers/templates';
import instancesReducer from './store/reducers/instances';

import { watchTemplates, watchInstances } from './store/sagas';

const rootReducer = combineReducers({
    templates: templatesReducer,
    instances: instancesReducer
});

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development'
                            ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                            : null 
                                || compose;

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(watchTemplates);
sagaMiddleware.run(watchInstances);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
