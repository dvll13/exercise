import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';

//capitals for global constants
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => ingredients[igKey])
      .reduce((sum, el) => sum + el);

    this.setState({ purchasable: sum > 0 });
  }

  addIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    let totalPrice = this.state.totalPrice;

    ingredients[type]++;
    totalPrice += INGREDIENT_PRICES[type];

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
    this.updatePurchaseState(ingredients);
  };

  removeIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    if (ingredients[type] <= 0) return;
    let totalPrice = this.state.totalPrice;

    ingredients[type]--;
    totalPrice -= INGREDIENT_PRICES[type];

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
    this.updatePurchaseState(ingredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    
    // in a real env calculations should be done on the server so that they cannot be manipulated
    const order = {
      ingredients: this.state.ingredients,
      price: this.getPrice(),
      customer: {
        name: 'Customer One',
        address: {
          street: 'Street One',
          zipCode: '1234',
          country: 'Bulgaria'
        },
        email: 'test@test.com',
        deliveryMethod: 'fastest'
      }
    }

    axios.post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch(error => {
        this.setState({ loading: false, purchasing: false });
        console.log(error);
      });
  }

  getPrice = () => this.state.totalPrice.toFixed(2);

  render() {
    const disabledButtons = {...this.state.ingredients};
    for (let ingredient in disabledButtons) {
      disabledButtons[ingredient] = disabledButtons[ingredient] <= 0;
    }

    let orderSummary = <OrderSummary
      ingredients={this.state.ingredients}
      price={this.getPrice}
      purchaseCancelled={this.purchaseCancelHandler}
      purchaseContinued={this.purchaseContinueHandler}/>;
    
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} cancel={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledButtons={disabledButtons}
          price={this.getPrice}
          purchasable={this.state.purchasable}
          purchased={this.purchaseHandler}/>
      </React.Fragment>
    )
  }
}

export default BurgerBuilder;