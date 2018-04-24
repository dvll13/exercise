import React, {Component} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'; // component names should start with a capital letter
import Cockpit from '../Cockpit/Cockpit';
// import Radium, {StyleRoot} from 'radium';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

// state - for managing some component's internal data; re-renders where necessary on changes
// use it with care, because manipulating it makes the app unpredictable and hard to manage

class App extends Component {
    // it's called a container when it has state
    // containers should be as lean as possible mostly containing methods modifying the state
    
    state = { // only for class based components
        persons: [
            {id: 'pid1', name: 'Stoyanka', gender: 'female'},
            {id: 'pid2', name: 'Stoyan', gender: 'male'}
        ],
        showPersons: false,
        showMorePersons: false
    };

    // good practice in naming to add 'Handler'
    switchNameHandler = (newName) => {
        // this - always the component object
        //DON'T DO THIS: this.state.persons[0].name = 'Ivanka Ivanova';

        this.setState({ // gets merged with the original one
            persons: [
                {name: newName, gender: 'male'},
                {name: 'Stoyan', gender: 'male'}
            ]
        });
    };

    changeNameHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex(person => person.id === id);
        const persons = [...this.state.persons];
        persons[personIndex].name = event.target.value;

        this.setState({persons: persons});
    };

    togglePersonsHandler = () => {
        this.setState({showPersons: !this.state.showPersons});
    };
    toggleMorePersonsHandler = () => {
        this.setState({showMorePersons: !this.state.showMorePersons});
    };

    deletePersonHandler = (index) => {
        // const persons = this.state.persons; // BAD - points to the original array and modifies it directly
        // const persons = this.state.persons.splice(); // BETTER - creates a new array
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({persons: persons});
    }

    //NOTE: don't use function()
    // switchNameHandler2 = function() {
    //     this - undefined
    // };

    render() { // everything within is executed on re-render
        // INLINE STYLES:
        // const btnShowMorePersonsStyle = {
        //     position: 'absolute',
        //     top: '5px',
        //     right: '5px',
        //     backgroundColor: 'green',
        //     color: 'white',
        //     font: 'inherit',
        //     border: '1px solid blue',
        //     padding: '8px',
        //     cursor: 'pointer'
        //     // ':hover': { //radium
        //     //     backgroundColor: 'lightgreen',
        //     //     color: 'black'
        //     // }
        // };

        let morePersons = null;
        if (this.state.showMorePersons) {
            morePersons = (
                <div>
                    <p>More persons:</p>
                    <Persons
                        persons={this.state.persons}
                        clicked={this.deletePersonHandler}
                        changed={this.changeNameHandler} />
                    {/* {this.state.persons.map((person, index) => { //create list
                        // return <ErrorBoundary key={person.id}>
                        return <Person
                                key={person.id} //unique key - needed for react to know which elements from the virtual (future) DOM to compare to which of the present one; should be on top when contained
                                name={person.name}
                                gender={person.gender}
                                click={() => this.deletePersonHandler(index)}
                                change={(event) => this.changeNameHandler(event, person.id)} />
                        // </ErrorBoundary>
                    })} */}
                </div>
            );
            // btnShowMorePersonsStyle.backgroundColor = 'red';
            // btnShowMorePersonsStyle[':hover'] = { //radium
            //     backgroundColor: 'salmon',
            //     color: 'black'
            // };
        }

        return (
            // needed for advanced features like media-queries
            //<StyleRoot>
                <div className={classes.App}> {/*.App*/}
                    <Cockpit
                        persons={this.state.persons}
                        showPersons={this.state.showPersons}
                        clickedPersonsToggle={this.togglePersonsHandler}
                        clickedMorePersonsToggle={this.toggleMorePersonsHandler}
                        clickedSwitchName={this.switchNameHandler}
                        changedName={this.changeNameHandler} />
                    {morePersons}
                </div>
            //</StyleRoot>
        );
    }
}

// export default Radium(App);
export default App;