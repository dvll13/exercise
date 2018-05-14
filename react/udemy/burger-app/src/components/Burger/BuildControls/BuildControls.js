import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';
import Button from "material-ui/Button";

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const BuildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Total price: <strong>${props.price()}</strong></p>

        {controls.map((control) => <BuildControl
            label={control.label}
            key={control.label}
            added={() => props.ingredientAdded(control.type)}
            removed={() => props.ingredientRemoved(control.type)}
            disabledButton={props.disabledButtons[control.type]}/>)}

        <Button
            variant="raised"
            className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.purchased}>
            ORDER NOW
        </Button>
    </div>
);

export default BuildControls;