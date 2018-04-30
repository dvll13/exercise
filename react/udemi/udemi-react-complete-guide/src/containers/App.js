import React, {PureComponent} from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons'; // component names should start with a capital letter
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
// import Radium, {StyleRoot} from 'radium';
// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
// import Auxilliary from '../../hoc/Auxilliary';

// state - for managing some component's internal data; re-renders where necessary on changes
// use it with care, because manipulating it makes the app unpredictable and hard to manage

// Context API - for global values across components
export const AuthContext = React.createContext(false); // false - default auth value

class App extends PureComponent {
    // it's called a container when extends Component; it has this.state and this.props; use it when you need to manage State or access Lifecycle Hooks
    // containers should be as lean as possible mostly containing methods modifying the state
    // the state should be changed in the main containers and passed down as props

    constructor(props) { //can be omitted (ES7)
        super(props);
        console.log('[App] constructor()', props);
        // this.state = ... - could be initialized here, but it's a bit old-school
    }

    //deprecated
    // componentWillMount() {
    //     console.log('[App] componentWillMount()', arguments);
    // }

    componentDidMount() {
        console.log('[App] componentDidMount()', arguments);
    }

    // UPDATE hooks, triggered from internal changes (setState)

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('[App] UPDATE shouldComponentUpdate()', nextProps, nextState);
    //     return nextState.showPersons !== this.state.showPersons ||
    //         nextState.persons !== this.state.persons;
    // }

    //deprecated
    // componentWillUpdate(nextProps, nextState) {
    //     console.log('[App] UPDATE componentWillUpdate()', nextProps, nextState);
    // }

    // executes when props change
    // rarely used, e.g. if you want to update state on props change
    // static - method not attached to a single instance
    static getDerivedStateFromProps(newProps, prevState) {
        console.log('[App] UPDATE getDerivedStateFromProps()', newProps, prevState);
        //merge newProps to the prevState and return this new state
        return prevState;
    }

    // fires before dom is updated
    getSnapshotBeforeUpdate() {
        console.log('[App] UPDATE getSnapshotBeforeUpdate()');
    }

    // fires after dom is updated
    componentDidUpdate() {
        console.log('[App] UPDATE componentDidUpdate()');
    }


    state = { // only for class based components
        persons: [
            {id: 'pid1', name: 'Stoyanka', gender: 'female', age: 32},
            {id: 'pid2', name: 'Stoyan', gender: 'male', age: 35}
        ],
        showPersons: false,
        showMorePersons: false,
        toggleClicked: 0,
        authenticated: false
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

        this.setState({ persons: persons });
    };

    togglePersonsHandler = () => {
        this.setState({ showPersons: !this.state.showPersons });
    };
    toggleMorePersonsHandler = () => {
        // this.setState({
        //     showMorePersons: !this.state.showMorePersons,
        //     toggleClicked: this.state.toggleClicked + 1
        // });
        // setState runs asynchronously, so other setStates may finish earlier and this.state can be not the latest version, so the following can be used where prevState won't be mutated from elsewhere while we are in this.setState call
        this.setState((prevState, props) => {
            return {
                showMorePersons: !prevState.showMorePersons,
                toggleClicked: prevState.toggleClicked + 1
            }
        });
    };

    deletePersonHandler = (index) => {
        // const persons = this.state.persons; // BAD - points to the original array and modifies it directly
        // const persons = this.state.persons.splice(); // BETTER - creates a new array
        const persons = [...this.state.persons];
        persons.splice(index, 1);
        this.setState({ persons: persons });
    };

    loginHandler = () => {
        this.setState({ authenticated: true });
    };

    //NOTE: don't use function()
    // switchNameHandler2 = function() {
    //     this - undefined
    // };

    render() { // everything within is executed on re-render
        console.log('[App] render()', arguments);
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
                // <div className={classes.App}> {/*.App*/}
                <React.Fragment> {/* or custom <Auxilliary> - avoid html wrapping element*/}
                    <button onClick={() => {this.setState({showMorePersons: true})}}>Always show persons</button>
                    <Cockpit
                        appTitle={this.props.title}
                        persons={this.state.persons}
                        showPersons={this.state.showPersons}
                        clickedPersonsToggle={this.togglePersonsHandler}
                        clickedMorePersonsToggle={this.toggleMorePersonsHandler}
                        clickedSwitchName={this.switchNameHandler}
                        changedName={this.changeNameHandler}
                        login={this.loginHandler}/>

                    <AuthContext.Provider value={this.state.authenticated}> {/*value is passed on all children levels*/}
                        {morePersons}
                    </AuthContext.Provider>
                </React.Fragment>
            //</StyleRoot>
        );
    }
}

// export default Radium(App);
export default withClass(App, classes.App);