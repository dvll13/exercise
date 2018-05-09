import React from 'react';
import classes from './Layout.css';
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => (
  <React.Fragment>
    <Toolbar/>
    <SideDrawer/>
    <main className={classes.content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default Layout;