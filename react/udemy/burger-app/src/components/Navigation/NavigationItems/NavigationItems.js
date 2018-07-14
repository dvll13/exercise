import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
    <nav className={[classes.NavigationItems, props.cls].join(' ')}>
        <ul>
            <NavigationItem link='/' exact>Burger Builder</NavigationItem>
            <NavigationItem link='/orders'>Orders</NavigationItem>
            <NavigationItem link='/auth'>Authenticate</NavigationItem>
        </ul>
    </nav>
);

export default NavigationItems;