import React, { Component } from 'react';

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

//new
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions';

class Counter extends Component {
    render() {
        return (
            <div>
                <CounterOutput value={this.props.counter}/>
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter}/>
                <CounterControl label="Decrement" clicked={this.props.onDecrementCounter}/>
                <CounterControl label="Add 15" clicked={this.props.onAddCounter}/>
                <CounterControl label="Subtract 10" clicked={this.props.onSubtractCounter}/>
                <hr/>
                <button onClick={() => this.props.onStoreResult( this.props.counter )}>Store result</button>
                <ul>
                    {this.props.storedResults.map( storedResult => (
                        <li key={storedResult.id}
                            onClick={() => this.props.onDeleteResult( storedResult.id )}>{storedResult.value}</li>
                    ) )}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    // ctr property -> redux store state value
    return {
        counter: state.ctr.counter,
        storedResults: state.res.results
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // property               // fn assinged to it
        // onIncrementCounter: () => dispatch( { type: actionTypes.INCREMENT } ),
        // onDecrementCounter: () => dispatch( { type: actionTypes.DECREMENT } ),
        // onAddCounter: () => dispatch( { type: actionTypes.ADD, some_value: 20 } ),
        // onSubtractCounter: () => dispatch( { type: actionTypes.SUBTRACT, some_value: 10 } ),
        // onStoreResult: ( result ) => dispatch( { type: actionTypes.STORE_RESULT, result: result } ),
        // onDeleteResult: ( id ) => dispatch( { type: actionTypes.DELETE_RESULT, resultElId: id } )
        onIncrementCounter: () => dispatch( actionCreators.increment() ),
        onDecrementCounter: () => dispatch( actionCreators.decrement() ),
        onAddCounter: () => dispatch( actionCreators.add(15) ),
        onSubtractCounter: () => dispatch( actionCreators.subtract(10) ),
        onStoreResult: ( result ) => dispatch( actionCreators.storeResult(result) ),
        onDeleteResult: ( id ) => dispatch( actionCreators.deleteResult(id) )
    }
};

export default connect( mapStateToProps, mapDispatchToProps )( Counter );