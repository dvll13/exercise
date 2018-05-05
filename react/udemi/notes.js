{ // state - for managing some component's internal data; re-renders where necessary on changes
  // use it with care, because manipulating it makes the app unpredictable and hard to manage

  // setState runs asynchronously, so other setStates may finish earlier and this.state can be not the latest version, so the following can be used where prevState won't be mutated from elsewhere while we are in this.setState call
  this.setState((prevState, props) => {
    return {
        showMorePersons: !prevState.showMorePersons,
        toggleClicked: prevState.toggleClicked + 1
    }
  });

  const persons = [...this.state.persons];
  persons.splice(index, 1);
  this.setState({ persons: persons });
}

// it's called a container when extends Component; it has this.state and this.props; use it when you need to manage State or access Lifecycle Hooks
// containers should be as lean as possible mostly containing methods modifying the state
// the state should be changed in the main containers and passed down as props

// good practice in naming to add 'Handler'

// some hoc doesn't start with a capital letter because it doesn't qualify as a component since it returns a function, not JSX

// you should use function components instead of classes as often as possible,
// they are dynamic and just render smth, but don't change application's state, which is important as the app grows

{ //inline styles
  import Radium, {StyleRoot} from 'radium';
  // needed for advanced features like media-queries
  <StyleRoot></StyleRoot>
  export default Radium(App);

  // const style = {
  //     '@media (min-width: 500px)': {
  //         width: '450px'
  //     }
  // };
}

// import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
// Errors test:
// const rnd = Math.random();
// if (rnd > 0.7) {
//     throw new Error('Ops, something went wrong.');
// }

{ // avoid html wrapping el
  <React.Fragment></React.Fragment>
}

{ //common ops
  const textArray = this.state.userInput.split('');
  textArray.splice(index, 1);
  this.setState({ userInput: textArray.join('')});

  inputChangeHandler = (event) => { this.setState({ userInput: event.target.value }); };

  let textArray = this.state.userInput.split('');
  charComponents = textArray.map((char, index) => (
      <Char
          char={char}
          key={index}
          click={this.charClickHandler.bind(this, index)} />
    )
  );

  const sum = Object.keys(ingredients)
    .map(igKey => ingredients[igKey])
    .reduce((sum, el) => sum + el);

  let transformedIngredients = Object.keys(props.ingredients) // array of keys (ingredients)
    .map((ingredient) => { // for each ingredient
      return [...Array(props.ingredients[ingredient])].map((_, i) => { // [...Array(2)] -> [undefined, undefined]
        return <BurgerIngredient type={ingredient} key={ingredient+i}/>
      });
    })
    .reduce((arr, el) => { // strip empty array items
      return arr.concat(el); // array + empty_array = array
    }, []);
}

{ // Context API - for global values across components
export const AuthContext = React.createContext(false); // false - default auth value

<AuthContext.Provider value={this.state.authenticated}> {/*value is passed on all children levels*/}
  {morePersons}
</AuthContext.Provider>

//in children:
import {AuthContext} from "../../../containers/App";
<AuthContext.Consumer>
  {auth => auth ? <p>I'm authenticated</p> : null}
</AuthContext.Consumer>
}

{ //lifecycle hooks:
  class App extends Component {
    constructor(props) { //can be omitted (ES7)
      super(props);
      // this.state = ... - could be initialized here, but it's a bit old-school
    }

    // after all the elements of the page is rendered correctly, this method is called
    // is the perfect place, where we can call the setState() method to change the state of our application and render() the updated data loaded JSX. For example, we are going to fetch any data from an API then API call should be placed in this lifecycle method, and then we get the response, we can call the setState() method and render the element with updated data.
    componentDidMount() {}

    componentWillUnmount() {}

    // executes when props change
    // rarely used, e.g. if you want to update state on props change
    // static - method not attached to a single instance
    static getDerivedStateFromProps(newProps, prevState) {
      //merge newProps to the prevState and return this new state
      return prevState;
    }

    // fires before dom is updated
    getSnapshotBeforeUpdate() {}

    // fires after dom is updated
    componentDidUpdate() {}

    render () {} // everything within is executed on re-render
  }
}

{
  inputRef = React.createRef(); // reference: 1. init (only in stateful cmps)
  this.inputRef.current.focus(); //usage
  <input ref={this.inputRef}/> //reference: 2.point

  // in order to be able to forward refs:
  const WithClass = class extends Component {
    render() {
        return (
            <div className={className}>
                <WrappedComponent {...this.props} ref={this.props.forwardedRef} />
            </div>
        )
    }
  };
  return React.forwardRef((props, ref) => {
      return <WithClass {...props} forwardedRef={ref} />
  });
}

{ // onChange & value = two-way binding
  <input type="text" onChange={props.changed} value={props.name}/>
}

{
  import PropTypes from 'prop-types'; //for validation of class components
  
  Person.propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    click: PropTypes.func,
    type: PropTypes.string.isRequired
  };
}