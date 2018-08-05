import React, { Component } from 'react';
import { Route, Redirect, Switch, withRouter } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import { Overview, Templates, Instances } from './containers';

class App extends Component {
    state = {
        selectedTab: 0,
        routes: [
            '/overview',
            '/templates',
            '/instances'
        ]
    };

    componentDidMount() {
        const initialTabToSelect = this.state.routes.findIndex(
            route => route === this.props.history.location.pathname
        );
        this.setState({ selectedTab: initialTabToSelect });
    }

    handleChange = (event, value) => {
        this.setState({ selectedTab: value });
        this.props.history.push(this.state.routes[value]);
    };

    render() {
        const { selectedTab } = this.state;
        
        return (
            <div className="App">
                <AppBar position="static">
                    <Tabs value={selectedTab} onChange={this.handleChange}>
                        <Tab label="Overview" />
                        <Tab label="Templates" />
                        <Tab label="Documents" />
                    </Tabs>
                </AppBar>

                <Typography component="div" style={{ padding: 8 * 3 }}>
                    <Switch>
                        <Route path='/overview' component={Overview} />
                        <Route path='/templates' component={Templates} />
                        <Route path='/instances' component={Instances} />
                        <Redirect to='/overview' />
                    </Switch>
                </Typography>
            </div>
        );
    }
}

export default withRouter(App);
