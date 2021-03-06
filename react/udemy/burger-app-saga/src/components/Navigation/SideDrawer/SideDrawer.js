import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
    const attachedClasses = [classes.SideDrawer, props.show ? classes.Open : classes.Close];

    return (
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <NavigationItems isAuthenticated={props.isAuth}/>
            </div>
        </React.Fragment>
    );
};

export default SideDrawer;