import React from 'react';
import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const SideDrawer = (props) => {
  
  return (
    <div className={classes.SideDrawer}>
      <Logo/>
      <NavigationItems/>
    </div>
  );
};

export default SideDrawer;