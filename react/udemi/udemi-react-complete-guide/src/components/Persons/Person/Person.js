import React, {Component} from 'react';
import classes from './Person.css';

class Person extends Component {
    render() {
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