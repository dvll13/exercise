import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {
    render () {
        return this.props.persons.map((person, index) => {
            return <Person
                key={person.id}
                name={person.name}
                gender={person.gender}
                clicked={() => this.props.clicked(index)}
                changed={(event) => this.props.changed(event, person.id)} />
        });
    }
}

export default Persons;