import React, {Component} from 'react';
import classes from  './App.css';
// import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person'; // component names should start with a capital letter


// state - for managing some component's internal data; re-renders where necessary on changes
// use it with care, because manipulating it makes the app unpredictable and hard to manage

class App extends Component {
    // it's called a container when it has state
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
                    {this.state.persons.map((person, index) => { //create list
                        return <Person
                            name={person.name}
                            gender={person.gender}
                            click={() => this.deletePersonHandler(index)}
                            change={(event) => this.changeNameHandler(event, person.id)}
                            key={person.id}/> //unique key - needed for react to know which elements from the virtual (future) DOM to compare to which of the present one
                    })}
                </div>
            );
            // btnShowMorePersonsStyle.backgroundColor = 'red';
            // btnShowMorePersonsStyle[':hover'] = { //radium
            //     backgroundColor: 'salmon',
            //     color: 'black'
            // };
        }

        let assignedClasses = [];
        if (this.state.persons.length <= 1) {
            assignedClasses.push(classes.red);
        }
        if (this.state.persons.length === 0) {
            assignedClasses.push(classes.bold);
        }

        return (
            // needed for advanced features like media-queries
            //<StyleRoot>
                <div className={classes.App}> {/*.App*/}
                    <h1 className='unscopedClsTest'>App header (with unscoped className)</h1>
                    <p className={assignedClasses.join(' ')}>Sub-header text</p>

                    {/* CONDITIONALS v1: */}
                    <button className={classes.Red} onClick={this.togglePersonsHandler}>Toggle persons</button>
                    {
                        this.state.showPersons ?
                            <div>
                                {/*bind - recommended than () => ... from below*/}
                                <button onClick={this.switchNameHandler.bind(this, 'NewName1')}>Change name</button>

                                <Person
                                    name={this.state.persons[0].name}
                                    gender={this.state.persons[0].gender}/>
                                <Person
                                    name={this.state.persons[1].name}
                                    gender={this.state.persons[1].gender}
                                    // click - custom attr used to pass reference to a parent method to be later called in Person; the other components should not have direct access to the State, but call only methods defined in the States' container
                                    // () => ... - this is not recommended, use bind instead
                                    click={() => this.switchNameHandler('NewName2')}
                                    change={this.changeNameHandler}>
                                    <i>{/*passing structured html:*/} My hobbies:</i> racing
                                </Person>
                            </div>
                            :
                            null
                    }

                    {/* CONDITIONALS v2 (preferred): */}
                    <button
                        // style={btnShowMorePersonsStyle}
                        className={classes.absBtn}
                        onClick={this.toggleMorePersonsHandler}>
                        Toggle persons 2 (cleaner, with variable + list)
                    </button>
                    {morePersons}
                </div>
            //</StyleRoot>
        );
    }
}

// export default Radium(App);
export default App;