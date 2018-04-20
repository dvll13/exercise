import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'; // component names should start with a capital letter


// state - for managing some component internal data; re-renders where necessary on changes
// use it with care, because manipulating it makes the app unpredictable and hard to manage

class App extends Component {
    // it's called a container when it has state
    state = { // only for class based components
        persons: [
            { name: 'Ivanka', gender: 'female'},
            { name: 'Stoyan', gender: 'male'}
        ],
        showPersons: false
    };

    // good practice in naming to add 'Handler'
    switchNameHandler = (newName) => {
        // console.log(this); // App object
        //DON'T DO THIS: this.state.persons[0].name = 'Ivanka Ivanova';

        this.setState({ // gets merged with the original one
            persons: [
                { name: newName, gender: 'male'},
                { name: 'Stoyan', gender: 'male'}
            ]
        });
    };

    changeNameHandler = (event) => {
        this.setState({
            persons: [
                { name: 'Stoyan', gender: 'male'},
                { name: event.target.value, gender: 'unknown'}
            ]
        });
    };

    togglePersonsHandler = () => {
        this.setState({ showPersons: !this.state.showPersons });
    };

    //NOTE: don't use function()
    // switchNameHandler2 = function() {
    //     console.log(this); // undefined
    //     console.log('was clicked');
    // };

    render() {
        const btnStyle = {
            backgroundColor: 'white',
            font: 'inherit',
            border: '1px solid blue',
            padding: '8px',
            cursor: 'pointer'
        };

        return (
            <div className="App">
                <h1 onClick={() => console.log('aaa')}>React App header</h1>

                <button onClick={this.togglePersonsHandler}>Toggle persons</button>

                {
                    this.state.showPersons ?
                        <div>
                            {/*bind - recommended than () => ... from below*/}
                            <button
                                style={btnStyle}
                                onClick={this.switchNameHandler.bind(this, 'NewName1')}>Change name</button>

                            <Person
                                name={this.state.persons[0].name}
                                gender={this.state.persons[0].gender} />
                            <Person
                                name={this.state.persons[1].name}
                                gender={this.state.persons[1].gender}
                                // click - custom attr used to pass reference to a parent method to be later called in Person; the other components should not have direct access to the State, but call only methods defined in the States' container
                                // () => ... - this is not recommended, use bind instead
                                click={() => this.switchNameHandler('NewName2')}
                                change={this.changeNameHandler}>
                                    <i>{/*passing structured html:*/} My hobbies:</i> racing
                            </Person>
                            <Person />
                        </div>
                    :
                        null
                }
            </div>
        );
    }
}

export default App;