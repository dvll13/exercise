import React from 'react';
import classes from './BuildControl.css';
import Button from "material-ui/Button";

const BuildControl = (props) => (
    <div className={classes.BuildControl}>

        <div className={classes.Label}>{props.label}</div>
        {/*<button*/}
        {/*className={classes.Less}*/}
        {/*onClick={props.removed}*/}
        {/*disabled={props.disabledButton}>Less</button>*/}
        {/*<button className={classes.More} onClick={props.added}>More</button>*/}

        <Button
            variant="raised"
            onClick={props.removed}
            disabled={props.disabledButton}>
            Less
        </Button>
        <Button
            variant="raised"
            onClick={props.added}>
            More
        </Button>
    </div>
);

export default BuildControl;