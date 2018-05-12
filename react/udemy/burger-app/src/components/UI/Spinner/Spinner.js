import React from 'react';
import classes from './Spinner.css';
import { CircularProgress } from 'material-ui/Progress';

const Spinner = props => {
  const spinner = props.mui ? <CircularProgress className={classes.progress} style={{ color: 'purple' }} thickness={7} /> : <div className={classes.Spinner}>Loading...</div>;
  
  return spinner;
}

export default Spinner;