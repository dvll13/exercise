import React from 'react';
import classes from './DrawerToggle.css';
import Icon from 'material-ui/Icon';

const DrawerToggle = props => (
    <Icon className={classes.DrawerToggle} onClick={props.clicked}>menu</Icon>
);

export default DrawerToggle;