import React, {Component} from 'react';

import Person from '../components/Person/Person';
import AddPerson from '../components/AddPerson/AddPerson';

// new
import * as actionTypes from "../store/actions";
import {connect} from 'react-redux';

class Persons extends Component {
    // state = {
    //     persons: []
    // }

    // personAddedHandler = () => {
    //     const newPerson = {
    //         id: Math.random(), // not really unique but good enough here!
    //         name: 'Max',
    //         age: Math.floor( Math.random() * 40 )
    //     }
    //
    //     this.setState( ( prevState ) => {
    //         return { persons: prevState.persons.concat(newPerson)}
    //     } );
    // }

    // personDeletedHandler = (personId) => {
    //     this.setState( ( prevState ) => {
    //         return { persons: prevState.persons.filter(person => person.id !== personId)}
    //     } );
    // }

    render() {
        return (
            <div>
                <AddPerson personAdded={this.props.onAddedPerson}/>
                {/*{this.state.persons.map(person => (*/}
                {this.props.prs.map(person => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        // clicked={() => this.personDeletedHandler(person.id)}/>
                        clicked={() => this.props.onDeletedPerson(person.id)}/>
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        prs: state.persons
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onAddedPerson: (name, age) => dispatch({type: actionTypes.ADD, personData: {name: name, age: age}}),
        onDeletedPerson: (id) => dispatch({type: actionTypes.DELETE, id: id})
    }
};

// export default Persons;
export default connect(mapStateToProps, mapDispatchToProps)(Persons);