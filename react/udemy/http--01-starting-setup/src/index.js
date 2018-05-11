import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
// other defaults examples:
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

// covers all
axios.interceptors.request.use(requestCfg => {
    console.log('###interceptor.request:', requestCfg);
    // requestCfg can be edited here
    return requestCfg; //otherwise you are blocking the request
}, error => { // request send error
    console.log('###interceptor.request error:', error);
    return Promise.reject(error); // forward it to be handled locally also
});

axios.interceptors.response.use(responseCfg => {
    console.log('###interceptor.response:', responseCfg);
    // requestCfg can be edited here
    return responseCfg; //otherwise you are blocking the request
}, error => { // request send error
    console.log('###interceptor.response error:', error);
    return Promise.reject(error); // forward it to be handled locally also
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
