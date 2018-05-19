import React from 'react';
import classes from './DrawerToggle.css';
import IconButton from '@material-ui/core/IconButton';
import { Menu as MenuIcon } from '@material-ui/icons';

const DrawerToggle = props => (
    <IconButton className={classes.DrawerToggle} onClick={props.clicked}>
        <MenuIcon />
    </IconButton>
);

export default DrawerToggle;