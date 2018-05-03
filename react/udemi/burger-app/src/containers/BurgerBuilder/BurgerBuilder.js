import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/BuildControls/BuildControls';

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
    totalPrice: 4
  };

  addIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    let totalPrice = this.state.totalPrice;

    ingredients[type]++;
    totalPrice += INGREDIENT_PRICES[type];

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  };

  removeIngredientHandler = (type) => {
    const ingredients = {...this.state.ingredients};
    if (ingredients[type] <= 0) return;
    let totalPrice = this.state.totalPrice;

    ingredients[type]--;
    totalPrice -= INGREDIENT_PRICES[type];

    this.setState({ ingredients: ingredients, totalPrice: totalPrice });
  };

  render() {
    const disabledButtons = {...this.state.ingredients};
    for (let ingredient in disabledButtons) {
      disabledButtons[ingredient] = disabledButtons[ingredient] <= 0;
    }

    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabledButtons={disabledButtons}
          price={this.state.totalPrice}/>
      </React.Fragment>
    )
  }
}

export default BurgerBuilder;