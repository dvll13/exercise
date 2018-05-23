import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Redirect, Switch } from "react-router-dom";

class App extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    {/* TODO: fix basename */}
                    <Route path='/' exact component={BurgerBuilder} />
                    <Route path='/checkout' component={Checkout} />
                    <Redirect to='/' />
                </Switch>
            </Layout>
        )
    }
}

export default App;
