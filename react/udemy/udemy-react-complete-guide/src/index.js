import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App title='App header (with un-scoped className)' />, document.getElementById('root'));
registerServiceWorker(); // pre-caches the script files
