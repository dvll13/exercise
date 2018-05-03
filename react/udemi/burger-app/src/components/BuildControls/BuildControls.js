import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>Total price: <strong>${props.price.toFixed(2)}</strong></p>
    {controls.map((control) => <BuildControl
                                 label={control.label}
                                 key={control.label}
                                 added={() => props.ingredientAdded(control.type)}
                                 removed={() => props.ingredientRemoved(control.type)}
                                 disabledButton={props.disabledButtons[control.type]} />)}
  </div>
);

export default BuildControls;