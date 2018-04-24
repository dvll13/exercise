// simply put, the component is a function, that returns JSX
// we are using a function and not extending the Component class, so no need to import it

// import React, { Component } from 'react'; //this if we use the class instead

import React from 'react'; // for the jsx syntax
import './Person.css';
// import Radium from 'radium';

// class Person extends Component {
//     name = ...;
//     render() {
//         return <p>My name is {this.props.name}</p>
//     }
// }

// OR:

// you should use function components instead of classes as often as possible,
// they are dynamic and just render smth, but don't change application's state, which is important as the app grows
const person = (props) => {
    // Radium:
    // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // };

    return (
        <div className='Person'>
            <p onClick={props.click}>
                I'm a {props.gender} person named {props.name} and I'm {Math.floor(Math.random() * 100)} years old.
            </p>
            <p>{props.children}</p>
            <input type="text" onChange={props.change} value={props.name}/> {/*onChange & value = two-way binding*/}
        </div>
    );
};

// React monitors 'state' and 'props' and re-renders when necessary

// export default Radium(person);
export default person;