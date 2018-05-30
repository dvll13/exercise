{ // state - for managing some component's internal data; re-renders where necessary on changes
  // use it with care, because manipulating it makes the app unpredictable and hard to manage

  // setState runs asynchronously, so other setStates may finish earlier and this.state can be not the latest version, so the following can be used where prevState won't be mutated from elsewhere while we are in this.setState call, so if we plan to USE THE state IN setState:
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

{
    // updating a state value which is a few levels down
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm //not a deep level copy, so we should manually clone the next level
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        this.setState({orderForm: updatedOrderForm});
    };
}

// BEWARE if shouldComponentUpdate() filters some state passed down in props

// componentDidMount() -> componentWillMount() {this.setState(...)} { changed in order to load the state before the child cmps are rendered

{
// that's the way to use images. point their path to webpack and it optimizes and copies them in production
  import logo from '../../assets/images/burger-logo.png';
  <img src={logo}/>
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

  // object to array
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

//alternative:
for (let ingredientName in props.ingredients) {
    ingredients.push({
        name: ingredientName,
        amount: props.ingredients[ingredientName]
    })
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
    // good place for fetching data
    componentDidMount() {}

    componentWillUnmount() {}

    // executes when props change
    // rarely used, e.g. if you want to update state on props change
    // static - method not attached to a single instance, no access to 'this'
    // The function is used when a component is updated but also when it is mounted, right after the constructor was called, so you no longer need to use constructor or class property form of state if you want to set initial state from props.
    static getDerivedStateFromProps(newProps, prevState) {
      //merge newProps to the prevState and return this new state
      return prevState;
    }

    // fires before dom is updated
    getSnapshotBeforeUpdate(prevProps, prevState) {}

    // fires after dom is updated, good place to call after we receive a new prop
    // DON'T UPDATE THE STATE HERE since it will trigger a re-render and may cause infinite loop
    componentDidUpdate(prevProps, prevState, snapshot) {}

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

{
  // passing boolean true values shorthand
  <NavigationItem active></NavigationItem>
}

{ // AXIOS
    axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

    axios.get('/orders.json')
    .then(res => {
        console.log('res.data:', res.data);
        for (let key in res.data) {
            fetchedOrders.push({
                id: key,
                ...res.data[key]
            })
        }
        this.setState({
            orders: fetchedOrders,
            loading: false
        });
    })
    .catch(error => {
        this.setState({loading: false});
    })

    // axios.defaults.headers.common['Authorization'], axios.defaults.headers.post['Content-Type'], ...
    let i = axios.interceptors.request/response.use(requestCfg => { /*...;*/ return requestCfg; }, error => {return Promise.reject(error);})
    axios.interceptors.request.eject(i); //remove interceptor to prevent memory leaks
    /*You can add interceptors to a custom instance of axios.
      const instance = axios.create();
      instance.interceptors.request.use(function () {...}); */

    // using different axios instances ([axios.js and Blog.js] override defaults)
    const instance = axios.create({})

    // axios.post, axios.get, axios.delete
    // .then(response => {}), .catch(error => {})
}

{ // ROUTES
    // npm install --save react-router react-router-dom
    // wrap whatever needs to use routing in the application:
    // <BrowserRouter basename='/my-app'> - if the root of the app is different from '/'
    <BrowserRouter>
    </BrowserRouter>

    import {Route, /*Link*/ NavLink, Switch, Redirect} from 'react-router-dom';

    // we can render as many routes as we want, every route that matches its path gets rendered
    <Route path='/' render={() => <h1>Home</h1>}/> // will always be rendered
    <Route path='/' exact render={() => <h2>Home 2</h2>}/>
    <Route path='/new-post' render={() => <h1>NewPost</h1>}/>
    <Route path='/:my_id' exact component={FullPost}/> // overrides the similar ones above it, should be last, in order for the similar ones to be possible to be reached


    // render only the first matched route
    <Switch>
        <Route/>
        <Redirect from='/' to='/posts'/>
        {/* OR */}
        <Route render={() => <h1>404: Not found!</h1>}/> {/*catch anything else route (404)*/}
    </Switch>

    // can be put conditionally in jsx to forward after some change in state
    <Redirect to='/posts'/>
    // or:
    //this.props.history.push('/posts'); - adds a new history entry
    //this.props.history.replace('/posts'); replaces like <Redirect/>

    <Link to='/'>Home</Link>
    <Link to={{
        pathname: '/new-post', // absolute path
        //pathname: this.props.match.url + /new-post - relative path
        hash: '#submit',
        search: '?quick-submit=true'
    }}>New Post</Link>
    <NavLink 
        to='/' 
        exact
        activeClassName='my-active'
        activeStyle={{textDecoration: 'underline'}}>Home</NavLink>

    // change page PROGRAMATICALLY:
    // we have props.history, match (nearest matched route), location only if the component is loaded by a Route object
    // if not then we can use withRouther to pass them to the current component
    // this.props.history.push({ pathname: '/' + id }); or:
    this.props.history.push('/' + id); //set
    <Route path='/:my_id' exact component={FullPost}/>
    this.props.history.goBack();
    this.props.history.replace('/');
    this.props.match.params.my_id //get
    this.props.match.url // current url

    // adding to current url and passing props to routed component ({...props} should pass the router data then)
    <Route
        path={this.props.match.path + '/contact-data'}
        // component={ContactData}/>
        render={ (props) => (<ContactData ingredients={this.state.ingredients} {...props}/>) }/>

    // pass down router props to "non-routed" children
    import {withRouter} from 'react-router-dom';
    export default withRouter(Cmp);

    // PASSING MORE query params
    const queryParams = [];
    for (let i in this.state.ingredients) {
        queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    const queryString = queryParams.join('&');
    this.props.history.push({
        pathname: '/checkout',
        search: '?' + queryString
    });

    // EXTRACTING query params:
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        
        for (let param of query.entries()) {
            // param = ['salad', '1']
            ingredients[param[0]] = +param[1];
        }

        this.setState({ingredients: ingredients});
    }

    // fragment:
    <Link to="/my-path#start-position">Go to Start</Link> 
    // -> props.location.hash

    // guard examples
    componentDidMount() {
        // if (!this.state.auth) this.props.history.replace('/posts')
    }
    //  this.state.auth ? <Route path='...'/> : null;
}

{ // ROUTES LAZY LOADING
  //1. create hoc/asyncComponent
  //2. usage:

  import asyncComponent from "../../hoc/asyncComponent";

  const AsyncNewPost = asyncComponent(() => {
      // whatever is in the () will be only imported when the anonymous fn is executed
      return import('./NewPost/NewPost');
  });

  <Route path='/new-post' component={AsyncNewPost}/>
}

// VALIDATION: in ContactData.js and Input.js

// REDUX
{ 
    // redux-basics.js - basic example
    // more: Counter.js and reducer.js

    //npm install --save redux
    
    // /store/reducer.js
    {
        const initialState = {
            counter: 0
        }
        
        const reducer = (state = initialState, action) => {
            // replace but NEVER MUTATE state data!

            //7
        switch (action.type) {
                //convention is UPPERCASE
            case 'STORE_RESULT':
            return {
                ...state,
                // results: state.results.push(state.counter) // NO! modifies the state.results (MUTABLE)
                results: state.results.concat({ // returns a new array (IMMUTABLE)
                    id: new Date(),
                    value: state.counter
                }) 
            }
        default:
            return state;
        };
    }

    // index.js:
    {
        import { createStore } from 'redux';
        import reducer from './store/reducer';

        const store = createStore(reducer);

        // connect the redux store to the react app
        // npm install --save react-redux

        import {Provider} from 'react-redux';

        ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
    }

    // then in a container (e.g. Counter.js):
    {
        //1
        import {connect} from 'react-redux'; // it's a function that returns a hoc fn

        //4
        <CounterOutput value={this.props.ctr} /> // this.props.ctr -> initialState.counter

        //6
        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />

        //2
        const mapStateToProps = state => {
            // ctr (property) -> state.container (redux store state value)
            return {
                ctr: state.counter
            }
        }

        //5
        const mapDispatchToProps = dispatch => {
            return {
                // property         // fn assinged to it
                onIncrementCounter: () => dispatch({ type: 'INCREMENT' })
            }
        }

        export default connect(mapStateToProps, mapDispatchToProps)(Counter)
        // export default connect(null, mapDispatchToProps)(Counter)
    }
}