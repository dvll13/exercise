import React, {Component} from 'react';
import classes from './Person.css';
// import WithCls from '../../../hoc/WithCls';
import withClass from '../../../hoc/withClass';
import PropTypes from 'prop-types';

class Person extends Component {
    constructor(props) {
        super(props);
        console.log('[Person] constructor()', props);
    }

    componentWillMount() {
        console.log('[Person] componentWillMount()');
    }

    componentDidMount() {
        console.log('[Person] componentDidMount()');
    }

    componentWillUnmount() {
        console.log('[Person] componentWillUnmount()');
    }

    render() {
        console.log('[Person] render()');

        return (
            // <WithCls classes={classes.Person}>
            <React.Fragment>
                <p onClick={this.props.clicked}>
                    I'm a {this.props.gender} person named {this.props.name} and I'm {this.props.age} years old.
                </p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
            </React.Fragment>
            // </WithCls>
        )

        // can return array with elements with keys WITHOUT WRAPPING EL
    }
}

Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    click: PropTypes.func,
    changed: PropTypes.func
};

export default withClass(Person, classes.Person);