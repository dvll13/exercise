import React, { Component } from 'react';

import axios from '../../axios-orders'; // the instance
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions';

//capitals for global constants
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    };

    // componentDidMount() {
    //     axios.get('https://react-my-burger-dvll.firebaseio.com/ingredients.json')
    //         .then(response => {
    //             this.setState({ingredients: response.data})
    //         })
    //         .catch(error => {
    //             this.setState({error: true});
    //         });
    // }

    updatePurchaseState( ingredients ) {
        const sum = Object.keys( ingredients )
            .map( igKey => ingredients[ igKey ] )
            .reduce( ( sum, el ) => sum + el );

        this.setState( { purchasable: sum > 0 } );
    }

    // addIngredientHandler = ( type ) => {
    //     const ingredients = { ...this.props.ings };
    //     let totalPrice = this.state.totalPrice;
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
    //     let totalPrice = this.state.totalPrice;
    //
    //     ingredients[ type ]--;
    //     totalPrice -= INGREDIENT_PRICES[ type ];
    //
    //     this.setState( { ingredients: ingredients, totalPrice: totalPrice } );
    //     this.updatePurchaseState( ingredients );
    // };

    purchaseHandler = () => {
        this.setState( { purchasing: true } );
    };

    purchaseCancelHandler = () => {
        this.setState( { purchasing: false } );
    };

    purchaseContinueHandler = () => {
        const queryParams = [];
        for ( let i in this.props.ings ) {
            queryParams.push( encodeURIComponent( i ) + '=' + encodeURIComponent( this.props.ings[ i ] ) );
        }
        queryParams.push( `price=${this.state.totalPrice}` );
        const queryString = queryParams.join( '&' );

        this.props.history.push( {
            pathname: '/checkout',
            search: '?' + queryString
        } );
    };

    getPrice = () => this.state.totalPrice.toFixed( 2 );

    render() {
        const disabledButtons = { ...this.props.ings };
        for ( let ingredient in disabledButtons ) {
            disabledButtons[ ingredient ] = disabledButtons[ ingredient ] <= 0;
        }

        let orderSummary = null;

        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner/>;
        if ( this.props.ings ) {
            // these rely on this.props.ings which could be not yet fetched
            burger = (
                <React.Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabledButtons={disabledButtons}
                        price={this.getPrice}
                        purchasable={this.state.purchasable}
                        purchased={this.purchaseHandler}/>
                </React.Fragment>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.getPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        if ( this.state.loading ) {
            orderSummary = <Spinner/>;
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
        ings: state.ingredients
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ( ingName ) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredientName: ingName
        }),
        onIngredientRemoved: ( ingName ) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredientName: ingName
        })
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( withErrorHandler( BurgerBuilder, axios ) );