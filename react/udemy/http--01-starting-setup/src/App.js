import React, {Component} from 'react';
import {BrowserRouter} from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
    render() {
        return (
            // wrap whatever needs to use routing in the application
            <BrowserRouter>
                <div className="App">
                    <Blog/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
