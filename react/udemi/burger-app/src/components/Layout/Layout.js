import React from 'react';
import classes from './Layout.css';

const Layout = (props) => (
  <React.Fragment>
    <div>Toolbar, Sidebar, Backdrop</div>
    <main className={classes.content}>
      {props.children}
    </main>
  </React.Fragment>
);

export default Layout;