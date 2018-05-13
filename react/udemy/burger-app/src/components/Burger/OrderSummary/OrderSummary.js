import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
  // this doesn't need to be a class component
  componentWillUpdate() {
    console.log('[OrderSummary] componentWillUpdate');
  }

  render() {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map(igKey => <li key={igKey} style={{textTransform: 'capitalize'}}>{igKey}: {this.props.ingredients[igKey]}</li>);

    return(
      <React.Fragment>
        <h3>Your order</h3>
        <p>Ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p>Continue to checkout?</p>
        <p><strong>Total price: ${this.props.price()}</strong></p>
        <Button type='Danger' click={this.props.purchaseCancelled}>CANCEL</Button>
        <Button type='Success' click={this.props.purchaseContinued}>CONTINUE</Button>
      </React.Fragment>
    )
  }
};

export default OrderSummary;