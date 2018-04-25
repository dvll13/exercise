import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log('[Persons] constructor()', props);
    }

    componentWillMount() {
        console.log('[Persons] componentWillMount()');
    }

    componentDidMount() {
        console.log('[Persons] componentDidMount()');
    }

    componentWillUnmount() {
        console.log('[Persons] componentWillUnmount()');
    }

    componentWillReceiveProps(nextProps) {
        console.log('[Persons] UPDATE componentWillReceiveProps()', nextProps);
    }

    //UPDATING triggered from the outside (props changes)

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons] UPDATE shouldComponentUpdate()', nextProps, nextState);
        // return true; // false - don't reach render method
        return nextProps.persons !== this.props.persons ||
            nextProps.changed !== this.props.changed ||
            nextProps.clicked !== this.props.clicked; // PERFORMANCE: you can use this to make it render only if a certain props change -> PureComponent does this automatically (use them ONLY when you know updates may not be required)
        // usually not needed if you have a PureComponent on an upper lever of the component tree, which filters the state/props updates which may come to the current components
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('[Persons] UPDATE componentWillUpdate()', nextProps, nextState);
    }

    componentDidUpdate() {
        console.log('[Persons] UPDATE componentDidUpdate()');
    }


    render () {
        console.log('[Persons] render()');

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