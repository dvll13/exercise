import { DELETE_RESULT, SUBTRACT } from "./udemy/redux-app/src/store/actions/actionTypes";
import * as actionTypes from "./dog-saga/src/store/actionTypes";

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



{ // show error shortcut:

    {error && <p>Error!</p>
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


// INSERTING AND REMOVING ARRAY ITEMS IMMUTABLY
{
    function insertItem(array, action) {
        return [
            ...array.slice(0, action.index),
            action.item,
            ...array.slice(action.index)
        ]
    }

    function removeItem(array, action) {
        return array.filter( (item, index) => index !== action.index);
    }

    function removeItemAlt(array, action) {
        return [
            ...array.slice(0, action.index),
            ...array.slice(action.index + 1)
        ];
    }
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

    shouldComponentUpdate(nextProps, nextState) {};

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
    import {withRouter} from 'C:/Users/dvll/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react-router-dom';
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
    // more: Counter.js and reducers/*

    // 1. install redux and connect the redux store to the react app:
    //      npm install --save redux react-redux redux-thunk (middleware for dispatching async actions)
    // 2. store/actions.js, store/reducer.js
    // 3. add the actions and initial reducer stuff
    // 4. index.js: add { CreateStore }, <Provider>, reducer, store
    // 5. add action methods to the reducer
    // 6. use { connect }, mapStateToProps, mapDispatchToProps with components

    // middleware runs between the dispatching of the action and the point of time the action reaches the reducer


    // /store/actions.js
    {
        export const INCREMENT = 'INCREMENT';
        export const DECREMENT = 'DECREMENT';
        // ...

        // action creators (useful for async/synchronous code):
        // useful because only synchronous actions can manage the store
        export const subtract = (value) => {
            return {
                type: SUBTRACT,
                some_value: value
            }
        };

        export const saveResult = (res) => {
            // a possible place to modify the data before storing it in the state
            // but better separate the logic: async stuff here and possibly prepare and clean data, then pass it for the actual modifications to the reducer
            // const updatedResult = res * 2;
            const updatedResult = res * 2;
            return {
                type: actionTypes.STORE_RESULT,
                result: updatedResult
            }
        }
        export const storeResult = (res) => {
            // simulating asynchrony (a delayed server response)
            return (dispatch, getState) => {
                // the best place to fetch data
                setTimeout(() => {
                    // const oldCounter = getState().ctr.counter;
                    // console.log('oldCounter:', oldCounter);
// NB!!!:
                    //don't overuse getState, you can instead pass what you need as a 'export const storeResult = (res, someStateProperty) => {'
                    dispatch(saveResult(res));
                }, 2000)
            }
        };

        export const deleteResult = (resultElId) => {
            return {
                type: DELETE_RESULT,
                resultElId: resultElId
            }
        };
    }

    // /store/result.js
    {
        import * as actionTypes from '../actions';

        const initialState = {
            results: []
        };
        
        const reducer = (state = initialState, action) => {
            // replace but NEVER MUTATE state data!

            //7
            switch (action.type) {
                //convention is UPPERCASE
                case actionTypes.STORE_RESULT:
                    // put more logic here, a good place to modify the data before storing it in the state
                    return updateObject(state, {
                        // results: state.results.push(state.counter) // NO! modifies the state.results (MUTABLE)
                        results: state.results.concat({ // returns a new array (IMMUTABLE)
                            id: new Date(), // not good practice
                            // value: state.counter // to get value from the global state, it should be passed as action payload
                            value: action.result
                        })
                    });
                case actionTypes.DELETE_RESULT:
                    // v1:
                    // const id = 2;
                    // const newArr = [...state.results];
                    // newArr.splice(id, 1);
        
                    //v2:
                    //reurns a new array
                    const updatedArr = state.results.filter(result => result.id !== action.resultElId);
                    return updateObject(state, { results: updatedArr });
                default:
                    return state;
            }
    };

    // index.js:
    {
        import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
        
        import counterReducer from './store/reducers/counter';
        import resultReducer from './store/reducers/result';

        import {Provider} from 'react-redux';

        const rootReducer = combineReducers({
            ctr: counterReducer,
            res: resultReducer
        });

        //MIDDLEWARE
        const logger = store => {
            return next => {
                return action => {
                    console.log('[Middleware] Dispatching', action);
                    const result = next(action); // pass the action to continue to to the reducer
                    console.log('[Middleware] next state', store.getState());
                    return result;
                }
            }
        };

        // for the redux devtools:
        const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
        
        const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

        const app = (
            <Provider store={store}> /* should wrap everything */
                <BrowserRouter/* basename='burger'*/>
                    <App/>
                </BrowserRouter>
            </Provider>
        );
    }

    // then in a container (e.g. Counter.js):
    {
        import {connect} from 'react-redux'; // it's a function that returns a hoc fn
        import * as actionTypes from '../../store/actions';

        <CounterOutput value={this.props.counter} /> // this.props.counter -> initialState.counter
        <CounterControl label="Increment" clicked={this.props.onIncrementCounter} />
        <button onClick={() => this.props.onStoreResult(this.props.counter)}>Store result</button>
        {this.props.storedResults.map(storedResult => (
            <li key={storedResult.id} onClick={ () => this.props.onDeleteResult(storedResult.id) }>{storedResult.value}</li>
        ))}

        const mapStateToProps = state => {
            // ctr property -> redux store state value
            return {
                counter: state.ctr.counter,
                storedResults: state.res.results
            }
        };

        const mapDispatchToProps = dispatch => {
            return {
                // property               // fn assinged to it
                onIncrementCounter: () => dispatch({ type: actionTypes.INCREMENT }),
                onAddCounter: () => dispatch({ type: actionTypes.ADD, some_value: 20 }),
                onStoreResult: (result) => dispatch({ type: actionTypes.STORE_RESULT, result: result}),
                onDeleteResult: (id) => dispatch({ type: actionTypes.DELETE_RESULT, resultElId: id })
            }
        }

        export default connect(mapStateToProps, mapDispatchToProps)(Counter)
        //skipping state: export default connect(null, mapDispatchToProps)(Counter)
    }


    // WRONG (MUTATION):
    
    // example 1
    {
        let nestedState = state.nestedState;
        // ERROR: this directly modifies the existing object reference - don't do this!
        nestedState.nestedField = action.data;
    
        return {
            ...state,
            nestedState
        };
    }

    // example 2
    {
        // Problem: this only does a shallow copy!
        let newState = {...state};

        // ERROR: nestedState is still the same object!
        newState.nestedState.nestedField = action.data;
        return newState;
    }

    // RIGHT (try to nest less levels of data):
    {
        function updateVeryNestedField(state, action) {
            return {
                ...state,
                first : {
                    ...state.first,
                    second : {
                        ...state.first.second,
                        [action.someId] : {
                            ...state.first.second[action.someId],
                            fourth : action.someValue
                        }
                    }
                }
            }
    }
}


{ //SAGAs
    // actionTypes.js
    // reducer.js

    // sagas.js
    // watcher saga: watches for actions dispatched to the store, starts worker saga
    export function* watcherSaga() {
        yield takeLatest(actionTypes.API_CALL_REQUEST, workerSaga)
    }

    // worker saga: makes the api call when the watcher saga sees the action
    function* workerSaga() {
        try {
            const response = yield call(axios({
                method: 'get',
                url: 'https://dog.ceo/api/breeds/image/random'
            }));
            const dog = response.data.message;

            // dispatch a success action to the store with the new dog
            yield put({
                type: actionTypes.API_CALL_SUCCESS,
                dog
            });
        } catch (error) {
            // dispatch a failure action to the store with error
            yield put({
                type: actionTypes.API_CALL_FAILURE,
                error
            });
        }
    }

    // takeEvery - takes every matching action and runs the instructed saga, can run concurrent tasks
    // takeLatest - takes every matching action and runs the instructed saga but cancels any previous saga tasks if it is still running

    // call - runs a function, if it returns a promise, pauses the saga until the promise is resolved
    // put - dispatches an action

    function* effects() {
        let result = yield call(fnToRun, optionalArgsToPasstoFn);
        yield put(actionToDispatch(result));
    }

    // others: fork, select, race, spawn, join, cancel
}