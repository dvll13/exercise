import React, {Component} from 'react';
import classes from './Person.css';

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
            <div className={classes.Person}>
                <p onClick={this.props.clicked}>
                    I'm a {this.props.gender} person named {this.props.name} and I'm {Math.floor(Math.random() * 100)} years old.
                </p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} value={this.props.name}/>
            </div>
        )
    }
}

export default Person;