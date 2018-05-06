import React from 'react';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients)
                  .map(igKey => <li key={igKey} style={{textTransform: 'capitalize'}}>{igKey}: {props.ingredients[igKey]}</li>)
  return (
    <React.Fragment>
      <h3>Your order</h3>
      <p>Ingredients:</p>
      <ul>
        {ingredientsSummary}
      </ul>
      <p>Continue to checkout?</p>
      <p><strong>Total price: ${props.price()}</strong></p>
      <Button type='Danger' click={props.purchaseCancelled}>CANCEL</Button>
      <Button type='Success' click={props.purchaseContinued}>CONTINUE</Button>
    </React.Fragment>
  );
}

export default OrderSummary;