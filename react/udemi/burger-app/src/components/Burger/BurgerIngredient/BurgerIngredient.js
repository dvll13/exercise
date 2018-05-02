import React, {Component} from 'react';
import classes from './BurgerIngredient.css';
import PropTypes from 'prop-types';

class BurgerIngredient extends Component {
  render() {
    let ingredient = null;

    switch (this.props.type) {
      case ('bread-bottom'):
        inredient = <div className={classes.BreadBottom}></div>;
        break;
      case ('bread-top'):
        ingredient = (
          <div className={classes.BreadTop}>
            <div className={classes.Seeds1}></div>
            <div className={classes.Seeds2}></div>
          </div>
        );
        break;
      case ('meat'):
        inredient = <div className={classes.Meat}></div>;
        break;
      case ('cheese'):
        inredient = <div className={classes.Cheese}></div>;
        break;
      case ('salad'):
        inredient = <div className={classes.Salad}></div>;
        break;
      case ('bacon'):
        inredient = <div className={classes.Bacon}></div>;
    }

    return ingredient;
  }
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
};

export default BurgerIngredient;