import React, {Component} from 'react'
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom'
import './App.css'

import routes from './routes'

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <nav>
                        <ul>
                            {routes.map((route, i) => (
                                <li key={i}>
                                    <NavLink to={route.path}>{route.title}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <main>
                        <Switch>
                            {routes.map((route, i) => (
                                <Route path={route.path} component={route.component} key={i} />
                            ))}
                        </Switch>
                    </main>
                </div>
            </BrowserRouter>
        )
    }
}

export default App
