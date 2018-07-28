import React from 'react';
import classes from './Logo.css';
// that's the way to use images. point their path to webpack and it optimizes and copies them in production
import logo from '../../assets/images/burger-logo.png';

const Logo = (props) => (
    <div className={classes.Logo}>
        <img src={logo} alt='MyBurger'/>
    </div>
);

export default Logo;