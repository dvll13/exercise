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
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter} />
                <CounterControl label="Add 20" clicked={this.props.onAddCounter} />
                <CounterControl label="Subtract 10" clicked={this.props.onSubtractCounter} />
                <hr/>
                <button onClick={this.props.onStoreResult}>Store result</button>
                <ul>
                    {this.props.storedResults.map(storedResult => (
                        <li key={storedResult.id} onClick={ () => this.props.onDeleteResult(storedResult.id) }>{storedResult.value}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // ctr property -> redux store state value
    return {
        ctr: state.counter,
        storedResults: state.results
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // property               // fn assinged to it
        onIncrementCounter: () => dispatch({ type: 'INCREMENT' }),
        onDecrementCounter: () => dispatch({ type: 'DECREMENT' }),
        onAddCounter: () => dispatch({ type: 'ADD', some_value: 20 }),
        onSubtractCounter: () => dispatch({ type: 'SUBTRACT', some_value: 10 }),
        onStoreResult: () => dispatch({ type: 'STORE_RESULT'}),
        onDeleteResult: (id) => dispatch({ type: 'DELETE_RESULT', resultElId: id })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);