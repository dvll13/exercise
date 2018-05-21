import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const CheckoutSummary = (props) => (
    <div className={classes.CheckoutSummary}>
        <h1>Леко, да не се задавиш!</h1>
        <div className={classes.BurgerCt}>
            <Burger ingredients={props.ingredients} />
        </div>
        <Button type='Danger'>CANCEL</Button>
        <Button type='Success'>CONTINUE</Button>
    </div>
);

export default CheckoutSummary;