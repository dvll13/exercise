> **Redux state** shouldn't be **mutated** because it will have the same reference as before and the pure/memo components won't re-render.

> **useCallback** - a react hook that returns a memorized callback when passed a function and a list of dependencies that set the parameters. It’s useful when a component is passing a callback to its child component in order to prevent rendering. It saves a reference to the function and only changes the callback when one of its dependencies is changed.

> **useMemo** - very similar to useCallback. It accepts a function and a list of dependencies, but the difference between useMemo and useCallback is that useMemo returns the memoized value returned by the passed function. It only recalculates the value when one of the dependencies changes. It’s very useful if you want to avoid expensive calculations on every render when the returned value isn’t changing.

> **useEffect** - accepts a function as a first parameter and a list of dependencies as a second parameter. When the dependencies change, it executes the passed function. The hook helps developers perform mutations, subscriptions, logging, and other side effects once all the components have been rendered

> **React.Memo()** - it signals the intent to resume code but doesn’t extend to functions passed as parameters. When a component is wrapped with useCallback, React saves a reference to the function. Passing this reference as a property to new components will shorten your rendering time


You should wrap functions with **useCallback** when passing **a function as a dependency** to other **hooks** or wrapping a **functional component in React.Memo()** that accepts your method as a property. You can use **useMemo** when you are working on functions where the inputs gradually change, where data values aren’t large enough to cause memory issues, or if the parameters are large enough so that the cost of comparison doesn’t outweigh the use of the wrapper.

**useCallback** works well in instances where the code would otherwise be **recompiled with every call**. Memorizing the results can decrease the cost of calling functions over and over again when the inputs change gradually over time


<br/><br/>

When **making a DOM change**, these things happen: 

- The browser parses the HTML to find the node with this id.
- It removes the child element of this specific element.
- Updates the element(DOM) with the ‘updated value’.
- Recalculates the CSS for the parent and child nodes.
- Update the layout.
- Finally, traverse the tree and paint it on the screen(browser) display.

**Virtual DOM**: React uses Virtual DOM exists which is like a **lightweight copy of the actual DOM**(a virtual representation of the DOM). So for every object that exists in the original DOM, there is an object for that in React Virtual DOM. It is exactly the same, but it does not have the power to directly change the layout of the document. Manipulating DOM is slow, but manipulating **Virtual DOM is fast as nothing gets drawn on the screen**. So each time there is a change in the state of our application, the **virtual DOM gets updated first** instead of the real DOM.

**How Virtual DOM actually make things faster**: When anything new is added to the application, **a virtual DOM is created** and it is represented as a tree. Each element in the application is a node in this tree. So, whenever there is a change in the state of any element, a new Virtual DOM tree is created. **This new Virtual DOM tree is then compared with the previous Virtual DOM tree and make a note of the changes**. After this, it finds the best possible ways to **make these changes to the real DOM**. Now **only the updated elements will get rendered** on the page again.

**How Virtual DOM helps React**: In react, everything is treated as a component be it a functional component or class component. A component can contain a state. Each time we change something in our JSX file or let’s put it in simple terms, whenever the state of any component is changed react updates its Virtual DOM tree. Though it may sound that it is ineffective but the cost is not much significant as updating the virtual DOM doesn’t take much time. React maintains **two Virtual DOM** at each time, **one contains the updated Virtual DOM and one which is just the pre-update version of this updated Virtual DOM**. Now it compares the pre-update version with the updated Virtual DOM and figures out what exactly has changed in the DOM like which components have been changed. This process of comparing the current Virtual DOM tree with the previous one is known as **‘diffing’**. Once React finds out what exactly has changed then it updated those objects only, on **real DOM**. React uses something called batch updates to update the real DOM. It just means that the changes to the real DOM are **sent in batches** instead of sending any update for a single change in the state of a component. We have seen that the **re-rendering of the UI is the most expensive part** and React manages to do this most efficiently by ensuring that the **Real DOM receives batch updates to re-render the UI**. This entire process of transforming changes to the real DOM is called **Reconciliation**

This significantly improves the performance and is the main reason why React and its Virtual DOM are much loved by developers all around.


<br/><br/><br/><br/><br/>

// jshint ignore: start
/* eslint-disable */
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
  <input ref={this.inputRef}/> //reference: 2.point
  this.inputRef.current.focus(); //usage

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
    <input name="numberOfGuests" type="number" value={this.state.numberOfGuests} onChange={this.handleInputChange} />

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    state = {
        numberOfGuests: 2
    };

    <input type="text" onChange={props.changed} value={props.name}/>
}

{
  import PropTypes from 'prop-types'; //for validation of class components
  z
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
            orders: fetchedOrders,x
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

    // change page PROGRAMMATICALLY:
    // we have props.history, match (nearest matched route), location only if the component is loaded by a Route object
    // if not then we can use withRouter to pass them to the current component
    // this.props.history.push({ pathname: '/' + id }); or:
    this.props.history.push('/' + id); //set
    <Route path='/:my_id' exact component={FullPost}/>
    props.history.goBack();
    props.history.replace('/');
    props.match.params.my_id //get
    props.match.url // current url

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
    // more: Counter.js and reducers/*

    // 1. install redux and connect the redux store to the react app:
    //      npm install --save redux react-redux redux-thunk (middleware for dispatching async actions)
    // 2. store/actions.js, store/reducer.js
    // 3. add the actions and initial reducer stuff
    // 4. index.js: add { CreateStore }, <Provider>, reducer, store
    // 5. add action methods to the reducer
    // 6. use { connect }, mapStateToProps, mapDispatchToProps with components

    // middleware runs between the dispatching of the action and the point of time the action reaches the reducer

> **middleware** - a function that returns a function that returns a function ([exercise\react\typescript\jbook\packages\local-client\src\state\middlewares\persist-middleware.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-client%5Csrc%5Cstate%5Cmiddlewares%5Cpersist-middleware.ts))


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


## REDUX THUNK
[exercise\react\typescript\jbook\packages\local-client\src\state\action-creators\index.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-client%5Csrc%5Cstate%5Caction-creators%5Cindex.ts)
```ts
export const saveCells = () => {
  // getState - returns the current state out of a redux store so we could use props from it
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const {
      cells: { data, order }
    } = getState()

    const cells = order.map((id) => data[id])

    try {
      await axios.post('/cells', { cells })
    } catch (error: any) {
      dispatch({
        type: ActionType.SAVE_CELLS_ERROR,
        payload: error.message
      })
    }
  }
}
```


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

{ /* ANIMATIONS
    "display" can't be animated

    transition: all 300ms ease-out; ~ transition: all 0.3ms ease-out;

    animation: openModal 400ms forwards; // forwards - keep the final value when animation completes

    PURE CSS ANIMS LIMITATIONS:
    the html is always in the dom, not very reactish; but if we remove it, react doesn't wait for the anim to finish, to remove the el

    npm install react-transition-group --save

    <Transition>
    <CSSTransition>
    <TransitionGroup> - useful when using dynamic lists

ALTERNATIVES:
    react-motion (more css independent solution, emulates real-world physics)
    react-move (more complex)
    react router transition (creates transitions between routes)
        <Switch> -> <AnimatedSwitch>
*/}

{ // WORKING WITH WEBPACK
/*
    npm init

// --save-dev: mark deps as dev only deps, doesn't make an impact, just for clarification which deps are for dev purposes and which are required for running the app (production)

    npm install --save-dev webpack@3 webpack-dev-server
// @3 in order for the commands from the lectures to work

...

    //support draft features
    npm install --save-dev babel-presets-stage-2

    .babelrc file:
    {
        "presets": [
            ["env", {
                "targets": {
                    "browsers": [
                        ">1%", //market share
                        "last 2 versions"
                    ]
                }
            }],
            "stage-2"
            "react"
        ],
        "plugins": [
            "syntax-dynamic-import"
        ]
    }
*/
}



{ //SAGAs

//UDEMY
    // all side effects are moved to the sagas, so we have only pure action creators
    // yield - execute this and wait for it to finish
    // put - dispatches an action
    // takeEvery(actionToListenFor, sagaToExecute) - listen to certain actions and do smth when they occur

    /*
        > cmp dispatch action (actions/index.js)
        > action creator (w/wo payload)
        > watcher (sagas/index.js) intercepts it by actionType and starts the corresponding saga
        > saga after async operations put(action) for reducer
        > action creator (w/wo payload) for the reducer
        > reducer is triggered

        call makes generators testable, because you can really mock this, and don't execute this code
        can be used for localStorage, axios
        yield call([localStorage, 'removeItem'], 'token');

        pass here all the actions you want to yield
        yield all([
            // they run concurrently
            takeEvery( actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga ),
            takeEvery( actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga ),
            ...
        ]);
        you can pass multiple calls, axios requests, to execute them simultaneously

        takeLatest - cancel any previous ongoing executions of the saga, and execute only the latest one
    */


//DOG SAGA
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

    // base syntax:
    function* effects() {
        let result = yield call(fnToRun, optionalArgsToPasstoFn);
        yield put(actionToDispatch(result));
    }

    // others: fork, select, race, spawn, join, cancel


    // IN A NORMALIZED STATE
    // For example, an application that does a lot of editing of entities might want to keep two sets of "tables" in the state, one for the "current" item values and one for the "work-in-progress" item values. When an item is edited, its values could be copied into the "work-in-progress" section, and any actions that update it would be applied to the "work-in-progress" copy, allowing the editing form to be controlled by that set of data while another part of the UI still refers to the original version. "Resetting" the edit form would simply require removing the item from the "work-in-progress" section and re-copying the original data from "current" to "work-in-progress", while "applying" the edits would involve copying the values from the "work-in-progress" section to the "current" section.
}

{ //static context type
    // create auth-context.js
    export default React.createContext({
        isAuth: false,
        toggleAuth: () => {}
    })

    //then in the main provider
    import AuthContext from './auth-context'
    class StaticContextType extends Component {
    state = {
        isAuth: false
    }

    toggleAuth = () => {
        this.setState((prevState) => ({
            isAuth: !prevState.isAuth
        }))
    }

    render() {
        return (
            <AuthContext.Provider value={{isAuth: this.state.isAuth, toggleAuth: this.toggleAuth}}>
                <Child/>
            </AuthContext.Provider>
        )
    }

    //in the child consumer
    import AuthContext from '../auth-context'
    class Child extends React.Component {
        static contextType = AuthContext

        componentDidMount() {
            console.log(this.context)
            //{isAuth: false, toggleAuth: ƒ}
        }

        render() {
            return <button onClick={this.context.toggleAuth}>{this.context.isAuth ? 'Logout' : 'Login'}</button>
        }
    }
}

{ //React.memo()
    export default React.memo(SomeFunctionalComponent)
    //React.memo shallow-compares the old and new props and re-renders only when there is a change
    //no objects deep checks - so you should use immutable approach when updating objects in your props
    //use only if you want to filter re-renders (if there is a chance the new received props to be the same as the previous ones)
}

{ //React.lazy()
    //useful when we have bigger chunks of code

    const Posts = React.lazy(() => import('./containers/Posts'))

    <Route
        path="/posts"
        render={() => (
            <Suspense fallback={<div>Loading...</div>}>
                <Posts />
            </Suspense>
        )}
    />

    //or

    {this.state.showPosts ? (
        <Suspense fallback={<div>Loading...</div>}>
            <Posts />
        </Suspense>
    ) : (
        <User />
    )}
}


# REACT HOOKS
> In the **dependency array** we have to list things that are used in the effect function and are _declared in the component_ or _received as a prop_.
```
export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => {
    return bindActionCreators(actionCreators, dispatch)
  }, [dispatch])
```
    //REUSING hooks in different components
    //The state of these components is completely independent. Hooks are a way to reuse stateful logic, not state itself. In fact, each call to a Hook has a completely isolated state — so you can even use the same custom Hook twice in one component.
    //You can write custom Hooks that cover a wide range of use cases like form handling, animation, declarative subscriptions, timers,
    const useFriendStatus = (friendID) => {
        const [isOnline, setIsOnline] = useState(null)

        const handleStatusChange = (status) => {
            setIsOnline(status.isOnline)
        }

        useEffect(() => {
            ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange)
            return () => { //CLEANUP function - runs when the component unmounts
                ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange)
            }
        })

        return isOnline
    }

    const DemoComponent = (props) => {
        // !NB:
        // * Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.
        // * Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions. (There is just one other valid place to call Hooks — your own custom Hooks.)
        // * unlike this.setState in a class, updating a state variable always replaces it instead of merging it

        const [count, setCount] = useState(0)
        const [fruit] = useState('banana')
        // const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

        // you can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined
        // When you call useEffect, you’re telling React to run your “effect” function after flushing changes to the DOM.
        // By default, React runs the effects after every render — including the first render.

        //EFFECTS WITHOUT CLEANUP - Network requests, manual DOM mutations, and logging are common examples of effects that don’t require a cleanup
        //EFFECTS WITH CLEANUP - similar to componentDidMount and then componentWillUnmount. If your effect returns a function, React will run it when it is time to clean up. React also cleans up effects from the previous render before running the effects next time

        useEffect(() => {
            document.title = `You clicked ${count} times`
        })

        //OR
        useEffect(() => {
            document.title = `You clicked ${count} times`;
        }, [count]); // Only re-run the effect if count changes (~ shouldComponentUpdate). If there are multiple items in the array, React will re-run the effect even if just one of them is different.

        //If you want to run an effect and clean it up only once (on mount and unmount), you can pass an empty array ([]) as a second argument. This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run. While passing [] is closer to the familiar componentDidMount and componentWillUnmount mental model, we suggest not making it a habit because it often leads to bugs as mentioned above

        const isOnline = useFriendStatus('props.friend.id')

        return (
            <div>
                <p>You clicked {count} times</p>
                <p>
                    {fruit} - {count}
                </p>
                <p>{isOnline} - reuse hooks</p>
                <button onClick={() => setCount(count + 1)}>Click me</button>
            </div>
        )
    }

    // class component converted to functional with hooks example:
    class FriendStatusWithCounter extends React.Component {
        constructor(props) {
          super(props)
          this.state = { count: 0, isOnline: null }
          this.handleStatusChange = this.handleStatusChange.bind(this)
        }

        componentDidMount() {
          document.title = `You clicked ${this.state.count} times`
          ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
          )
        }

        componentDidUpdate() {
          document.title = `You clicked ${this.state.count} times`
        }

        componentWillUnmount() {
          ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
          )
        }

        handleStatusChange(status) {
          this.setState({
            isOnline: status.isOnline
          })
        }
        // ...
    }

    const FriendStatusWithCounter = (props) => {
        const [count, setCount] = useState(0)
        useEffect(() => {
          document.title = `You clicked ${count} times`
        })

        const [isOnline, setIsOnline] = useState(null)
        useEffect(() => {
          ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
          return () => {
            ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange)
          }
        })

        const handleStatusChange = (status) => {
          setIsOnline(status.isOnline)
        }
        // ...
    }

    //automatic effect with cleanup triggers when a prop is changed:
    // Mount with { friend: { id: 100 } } props
    ChatAPI.subscribeToFriendStatus(100, handleStatusChange);     // Run first effect

    // Update with { friend: { id: 200 } } props
    ChatAPI.unsubscribeFromFriendStatus(100, handleStatusChange); // Clean up previous effect
    ChatAPI.subscribeToFriendStatus(200, handleStatusChange);     // Run next effect

    // Update with { friend: { id: 300 } } props
    ChatAPI.unsubscribeFromFriendStatus(200, handleStatusChange); // Clean up previous effect
    ChatAPI.subscribeToFriendStatus(300, handleStatusChange);     // Run next effect

    // Unmount
    ChatAPI.unsubscribeFromFriendStatus(300, handleStatusChange); // Clean up last effect


    //Don’t forget that React defers running useEffect until after the browser has painted, so doing extra work is less of a problem.
    //Don’t call Hooks inside loops, conditions, or nested functions
    //Don’t call Hooks from regular JavaScript functions. Instead, you can:
    // *Call Hooks from React function components.
    // *Call Hooks from custom Hooks

    function Form() {
        // 1. Use the name state variable
        const [name, setName] = useState('Mary');

        // 2. Use an effect for persisting the form
        useEffect(function persistForm() {
          localStorage.setItem('formData', name);
        });

        // 3. Use the surname state variable
        const [surname, setSurname] = useState('Poppins');

        // 4. Use an effect for updating the title
        useEffect(function updateTitle() {
          document.title = name + ' ' + surname;
        });
      }
    //React relies on the order in which Hooks are called. Our example works because the order of the Hook calls is the same on every render:
    // ------------
    // First render
    // ------------
    useState('Mary')           // 1. Initialize the name state variable with 'Mary'
    useEffect(persistForm)     // 2. Add an effect for persisting the form
    useState('Poppins')        // 3. Initialize the surname state variable with 'Poppins'
    useEffect(updateTitle)     // 4. Add an effect for updating the title

    // -------------
    // Second render
    // -------------
    useState('Mary')           // 1. Read the name state variable (argument is ignored)
    useEffect(persistForm)     // 2. Replace the effect for persisting the form
    useState('Poppins')        // 3. Read the surname state variable (argument is ignored)
    useEffect(updateTitle)     // 4. Replace the effect for updating the title
    // ...

    useState('Mary')           // 1. Read the name state variable (argument is ignored)
    // useEffect(persistForm)  // 🔴 This Hook was skipped!
    useState('Poppins')        // 🔴 2 (but was 3). Fail to read the surname state variable
    useEffect(updateTitle)     // 🔴 3 (but was 4). Fail to replace the effect
    //React wouldn’t know what to return for the second useState Hook call. React expected that the second Hook call in this component corresponds to the persistForm effect, just like during the previous render, but it doesn’t anymore. From that point, every next Hook call after the one we skipped would also shift by one, leading to bugs.
    //This is why Hooks must be called on the top level of our components. If we want to run an effect CONDITIONALLY, we can put that condition INSIDE our Hook:
    //WRONG:
    if (name !== '') {
        useEffect(function persistForm() {
          localStorage.setItem('formData', name);
        });
      }

    //RIGHT:
    useEffect(function persistForm() {
        // 👍 We're not breaking the first rule anymore
        if (name !== '') {
          localStorage.setItem('formData', name);
        }
      });


      // CUSTOM HOOKS names should start with "use" too
      // Custom Hooks are a mechanism to reuse only stateful logic, not state data. Each call to a hook gets isolated state

      //If the new state is computed using the previous state, you can pass a function to setState.
      function Counter({initialCount}) {
        const [count, setCount] = useState(initialCount);
        return (
          <>
            Count: {count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
          </>
        );
      }


      //LAZY INITIAL STATE
      //The initialState argument is the state used during the initial render. In subsequent renders, it is disregarded. If the initial state is the result of an expensive computation, you may provide a function instead, which will be executed only on the initial render:

      function Table(props) {
        // ⚠️ createRows() is called on every render
        const [rows, setRows] = useState(someExpensiveComputation(props.count));
        // ...
      }

      function Table(props) {
        // ✅ createRows() is only called once
        const [rows, setRows] = useState(() => someExpensiveComputation(props.count));
        // ...
      }

      //If you update a State Hook to the SAME VALUE as the current state, React will bail out WITHOUT RENDERING the children or firing effects. (React uses the Object.is comparison algorithm.)

      //we recommend to split state into multiple state variables based on which values tend to change together.
      //   const [position, setPosition] = useState({ left: 0, top: 0 });
      //   const [size, setSize] = useState({ width: 100, height: 100 });
}


// Building the Burger Builder CSS code -> \exercise\html5 & css3\udemy\burger-builder-css\

{ //USEFUL LINKS
/*
    https://react.rocks/ - real world working examples
    gatsbyjs - static react projects
    react native - js apps for ios/android (2 CHECK!!!!!)
    preact - smaller react bundle/api, has leaner algorithm for updating the dom, tiny differences; react is a bit more preferred currently for larger project
*/
}


{ //TESTING

}
