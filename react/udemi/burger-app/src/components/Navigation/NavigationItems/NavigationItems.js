import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <nav className={classes.NavigationItems}>
    <ul>
      <NavigationItem link='/' active>Burger Builder</NavigationItem>
      <NavigationItem link='/'>Checkout</NavigationItem>
    </ul>
  </nav>
);

export default NavigationItems;