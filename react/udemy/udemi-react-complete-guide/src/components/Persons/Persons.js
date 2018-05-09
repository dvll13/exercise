import React, {PureComponent} from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    lastPersonRef = React.createRef();

    // life cycle hooks:
    constructor(props) {
        super(props);
        console.log('[Persons] constructor()', props);
    }

    //deprecated
    // componentWillMount() {
    //     console.log('[Persons] componentWillMount()');
    // }

    componentDidMount() {
        console.log('[Persons] componentDidMount()');
        this.lastPersonRef.current.focus(); // the HOC inbetween prevents this from working
    }

    componentWillUnmount() {
        console.log('[Persons] componentWillUnmount()');
    }

    //deprecated
    // componentWillReceiveProps(nextProps) {
    //     console.log('[Persons] UPDATE componentWillReceiveProps()', nextProps);
    // }

    //UPDATING triggered from the outside (props changes)

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons] UPDATE shouldComponentUpdate()', nextProps, nextState);
        // return true; // false - don't reach render method
        return nextProps.persons !== this.props.persons ||
            nextProps.changed !== this.props.changed ||
            nextProps.clicked !== this.props.clicked; // PERFORMANCE: you can use this to make it render only if a certain props change -> PureComponent does this automatically (use them ONLY when you know updates may not be required)
        // usually not needed if you have a PureComponent on an upper lever of the component tree, which filters the state/props updates which may come to the current components
    }

    //deprecated
    // componentWillUpdate(nextProps, nextState) {
    //     console.log('[Persons] UPDATE componentWillUpdate()', nextProps, nextState);
    // }

    componentDidUpdate() {
        console.log('[Persons] UPDATE componentDidUpdate()');
    }


    render () {
        console.log('[Persons] render()');

        return this.props.persons.map((person, index) => { //create list
            return <Person
                key={person.id}  //unique key - needed for react to know which elements from the virtual (future) DOM to compare to which of the present one; should be on top when contained
                ref={this.lastPersonRef}
                personIndex={index}
                name={person.name}
                gender={person.gender}
                age={person.age}
                clicked={() => this.props.clicked(index)}
                changed={(event) => this.props.changed(event, person.id)} />
        });
    }
}

export default Persons;