import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

//new
import {connect} from 'react-redux';

class Counter extends Component {
    render () {
        return (
            <div>
                <CounterOutput value={this.props.ctr} />
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}  />
                <CounterControl label="Add 5" clicked={this.props.onAddCounter}  />
                <CounterControl label="Subtract 5" clicked={this.props.onSubtractCounter}  />
            </div>
        );
    }
}

const mapStateToProps = state => {
    // ctr property -> redux store state value
    return {
        ctr: state.counter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // property         // fn assinged to it
        onIncrementCounter: () => dispatch({ type: 'INCREMENT' }),
        onDecrementCounter: () => dispatch({ type: 'DECREMENT' }),
        onAddCounter: () => dispatch({ type: 'ADD' }),
        onSubtractCounter: () => dispatch({ type: 'SUBTRACT' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);