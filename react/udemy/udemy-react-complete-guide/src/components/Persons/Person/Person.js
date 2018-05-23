import React, {Component} from 'react';
import classes from './Person.css';
// import WithCls from '../../../hoc/WithCls';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types'; //for validation of class components
import {AuthContext} from "../../../containers/App";

class Person extends Component {
    inputRef = React.createRef(); // reference: 1. init (only in stateful cmps)

    constructor(props) {
        super(props);
        console.log('[Person] constructor()', props);
    }

    //deprecated
    // componentWillMount() {
    //     console.log('[Person] componentWillMount()');
    // }

    componentDidMount() {
        console.log('[Person] componentDidMount()');
        if (this.props.personIndex === 0) {
            this.focus();
        }
    }

    componentWillUnmount() {
        console.log('[Person] componentWillUnmount()');
    }


    focus() {
        this.inputRef.current.focus();
    }


    render() {
        console.log('[Person] render()');

        return (
            // <WithCls classes={classes.Person}>
            <React.Fragment>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm authenticated</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.clicked}>
                    I'm a {this.props.gender} person named {this.props.name} and I'm {this.props.age} years old.
                </p>
                <p>{this.props.children}</p>
                <input
                    ref={this.inputRef} //reference: 2.point
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />  {/*onChange & value = two-way binding*/}
            </React.Fragment>
            // </WithCls>
        )
        // can put in return an array with elements with keys WITHOUT A WRAPPING EL OR use React.Fragment
    }
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    click: PropTypes.func,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);