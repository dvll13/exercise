import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

// added export in order to be able to test it
export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
    //     axios.get('https://react-my-burger-dvll.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients: response.data})
    //         })
    //         .catch(error => {
    //             this.setState({error: true});
    //         });

        this.props.onInitIngredients();
    }

    updatePurchaseState( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => ingredients[ igKey ] )
            .reduce( ( sum, el ) => sum + el );

        return sum > 0;
    }

    // addIngredientHandler = ( type ) => {
    //     const ingredients = { ...this.props.ings };
    //     let totalPrice = this.props.price;
    //
    //     ingredients[ type ]++;
    //     totalPrice += INGREDIENT_PRICES[ type ];
    //
    //     this.setState( { ingredients: ingredients, totalPrice: totalPrice } );
    //     this.updatePurchaseState( ingredients );
    // };
    //
    // removeIngredientHandler = ( type ) => {
    //     const ingredients = { ...this.props.ings };
    //     if ( ingredients[ type ] <= 0 ) return;
    //     let totalPrice = this.props.price;
    //
    //     ingredients[ type ]--;
    //     totalPrice -= INGREDIENT_PRICES[ type ];
    //
    //     this.setState( { ingredients: ingredients, totalPrice: totalPrice } );
    //     this.updatePurchaseState( ingredients );
    // };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState( { purchasing: true } );
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    };

    purchaseContinueHandler = () => {
        // const queryParams = [];
        // for ( let i in this.props.ings ) {
        //     queryParams.push( encodeURIComponent( i ) + '=' + encodeURIComponent( this.props.ings[ i ] ) );
        // }
        // queryParams.push( `price=${this.state.totalPrice}` );
        // const queryString = queryParams.join( '&' );
        //
        // this.props.history.push( {
        //     pathname: '/checkout',
        //     search: '?' + queryString
        // } );

        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    getPrice = () => this.props.price.toFixed( 2 );

    render() {
        const disabledButtons = { ...this.props.ings };
        for ( let ingredient in disabledButtons ) {
            disabledButtons[ ingredient ] = disabledButtons[ ingredient ] <= 0;
        }

        let orderSummary = null;

        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
        if ( this.props.ings ) {
            // these rely on this.props.ings which could be not yet fetched
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledButtons={disabledButtons}
                        price={this.getPrice}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        purchased={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated} />
                </React.Fragment>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.getPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ( ingName ) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: ( ingName ) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );