import React, { Component } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path='/' exact component={BurgerBuilder} />
                    <Route path='/checkout' component={Checkout} />
                    <Route path='/orders' component={Orders} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/auth' component={Auth} />
                    <Redirect to='/' />
                </Switch>
            </Layout>
        )
    }
}

export default App;
