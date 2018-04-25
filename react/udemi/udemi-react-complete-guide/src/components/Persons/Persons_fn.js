import React from 'react';
import Person from './Person/Person';

const Persons = (props) => props.persons.map((person, index) => { //create list
        return <Person
            key={person.id}
            name={person.name}
            gender={person.gender}
            clicked={() => props.clicked(index)}
            changed={(event) => props.changed(event, person.id)} />
});

export default Persons;