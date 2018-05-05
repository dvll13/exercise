import React from 'react';

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
    </React.Fragment>
  );
}

export default OrderSummary;