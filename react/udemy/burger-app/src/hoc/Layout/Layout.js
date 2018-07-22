import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.css';
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerToggleHandler = () => {
        this.setState(prevState => {
            return { showSideDrawer: !prevState.showSideDrawer }
        });
    };

    render() {
        return (
            <React.Fragment>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler} />
                
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    show={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}

// use this instead of transforming functional components to classes in order to be able to connect to store
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect( mapStateToProps )( Layout );