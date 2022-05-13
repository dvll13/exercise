## typescript = js + a type system  

## The TS Type System
- helps catch errors **during coding**
- uses 'types annotations' to analyze code
- only active *during development*
- doesn't provide *performance optimization*

## ts -> compiler -> js

`npm i -g typescript ts-node`

`tsc index.ts` - ts compile and create `index.js`  
`ts-node index.ts` - compile `ts` to `js` and run it *(index.ts => index.js; node index.js)*  
`npm i -g parcel-bundler` - helps run TS in the browser
  * `parcel index.html` - starts the server and when it sees a ts file, it auto converts it to js  

`npx create-react-app <app_name> --template typescript` - create react ts app
<br/> <br/> 

**interface** - used to define the _structure of an object_; some of the props in an interface can be ignored. Can be _included_ in other interfaces.  

```
interface Todo {  // this is a type
  id: number
  title: string
  completed: string
}

interface BundlesState {
  [key: string]: {
    loading: boolean
    code: string
    error: string
  }
}

export interface Mappable {
  location: {
    lat: number
    lng: number
  }
  markerContent(): string
}
  ...

const todo = response.data as Todo
export class User implements Mappable {} // implements - optional, helps TS show better placed errors

const logToDo = (id: number, title: string, completed: boolean)

arg?: string //optional argument
```  
<br/><br/>  


# SYNTAX & FEATURES

**type** - easy way to refer to the different props & fns a value has, eg. string. every value has a type  
<br/><br/> 

**type annotation** - code *we* add to tell TS what type of value a variable will refer to. We should rely on it:
  - when we declare a var on one line then initialize it later
  - when we want the var to have a type that can be inferred
  - when a function returns the 'any' type and we want to clarify the value

**type inference** -  *TS* tries to figure out what type of value a variable refers to (*when the variable is initialized with a value/expression on the same line*). **We should rely on it whenever we can**  
<br/><br/>

**the 'any' type** - TS doesn't know what type the value is, we should **avoid** leaving 'any'. TS **can't** do any error checking around that value  


**functions** - TS tries to infer the *return* value type, but the *arguments* types **must** be specified by us


`// @ts-ignore` - ignore TS errors on the next line


> element `as` type:
```
editingContainer.current.contains(event.target)
// => TS error: Argument of type 'EventTarget' is not assignable to parameter of type 'Node'.

// WORKAROUND (when we are sure that elements are compatible):
editingContainer.current.contains(event.target as Node)
```
<br/><br/><br/>

# Type definition file (*.d.ts)  
*describes the different types of values, functions, classes that exist in a js library*  

### TS -> Type definition file -> JS Library  
if a TDF is missing in a JS Lib (for which there's a warning), then it could be found and used from "Definitely Typed" (`@types/[js-lib-name]`)

`npm i @types/faker`
<br/><br/><br/><br/>


# CLASSES  

modifiers (keywords):
  * **private** - can only be called by other methods in _this class_
  * **protected** - can be called by other methods in _this class_, or by other methods in _child classes_
  * **public** *(default)* - can be called _anywhere_
<br/><br/><br/><br/>


# REACT + TS  

`React.FC` ~ `React.FunctionComponent`  
<br/>

## PROPS 

[react\typescript\2_react-ts\src\state](..%5Creact%5Ctypescript%5C2_react-ts%5Csrc%5Cprops):
```
interface ChildProps {
  color: string
  onClick: () => void
}

export const Child = (props: ChildProps) => {...}
export const Child = ({ color, onClick }: ChildProps) => {...}

//BETTER: 
export const ChildAsRFC: React.FC<ChildProps> = ({ color, onClick }) => {...}
```

Using the _second_ approach TS recognizes this as a _React Function Component_, so that:
- might have props like `propTypes`, `contextTypes`, `displayName`, etc.
- `<SomePropsInterface>` - tells what props types will be received
- _expects a `children` prop by default - after **react 18** they make you include children in each FC interface:_
```
interface ResizableProps {
  direction: 'horizontal' | 'vertical'
  children?: React.ReactNode
}
```
<br/><br/>

## STATE  

[react\typescript\2_react-ts\src\state\GuestList.tsx](..%5Creact%5Ctypescript%5C2_react-ts%5Csrc%5Cstate%5CGuestList.tsx):
```
  const [guests, setGuests] = useState([]) // TS assumes that the array will be forever empty -> guests: never[]
  const [guests, setGuests] = useState<string[]>([]) // now all is good

  const [user, setUser] = useState<{ name: string; age: number } | undefined>()
```  
<br/><br/>

## EVENTS
[react\typescript\2_react-ts\src\events\EventComponent.tsx](..%5Creact%5Ctypescript%5C2_react-ts%5Csrc%5Cevents%5CEventComponent.tsx):
```
// TS knows what `e` is because it's an onChange callback
<input type="text" onChange={(e) => console.log(e)} />

==============


// TS know doesn't know what `e` is -> e: any, so it must be specified
const onChange = (e) => {...}

<input type="text" onChange={onChange} />

--------------------------------

// the type can be copied from the onChange tooltip:
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {...}

--------------------------------

const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {...}

<div draggable onDragStart={onDragStart}>Drag me!</div>
```
<br/><br/>

## CLASS COMPONENTS
[react\typescript\2_react-ts\src\classes\UserSearch.tsx](..%5Creact%5Ctypescript%5C2_react-ts%5Csrc%5Cclasses%5CUserSearch.tsx):
```
interface User {
  name: string
  age: number
}

interface UserSearchProps {
  users: User[]
}

interface UserSearchState {
  name: string
  user: User | undefined
}

class UserSearch extends Component<UserSearchProps> {
  state: UserSearchState = {
    name: '',
    user: undefined
  }

  ...
}
```
<br/><br/>

## REFS
[react\typescript\2_react-ts\src\refs\UserSearch.tsx](..%5Creact%5Ctypescript%5C2_react-ts%5Csrc%5Crefs%5CUserSearch.tsx):
```
const inputRef = useRef<HTMLInputElement | null>(null)
// we tell TS that we start with a `null` value and at some point in time we could change it to HTML element 
// the other HTML element interfaces can be seen by Ctrl+click on HTMLInputElement

// CAN BE USED JUST TO AVOID THE REF ERRORS:
const inputRef = useRef<any>(null)

useEffect(() => {
  if (!inputRef.current) {
    return
  }
  
  inputRef.current.focus()
}, [])
```
<br/><br/><br/><br/>  



# REDUX
[react\typescript\3_redux-ts\src\state](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Cstate):
```
interface RepositoriesState {
  loading: boolean
  error: string | null
  data: string[]
}

interface SearchRepositoriesAction {
  type: ActionType.SEARCH_REPOSITORY
}

interface SearchRepositoriesSuccessAction {
  type: ActionType.SEARCH_REPOSITORY_SUCCESS
  payload: string[]
}

interface SearchRepositoriesErrorAction {
  type: ActionType.SEARCH_REPOSITORY_ERROR
  payload: string
}

type Action = SearchRepositoriesAction | SearchRepositoriesSuccessAction | SearchRepositoriesErrorAction

enum ActionType {
  SEARCH_REPOSITORY = 'search_repositories',
  SEARCH_REPOSITORY_SUCCESS = 'search_repositories_success',
  SEARCH_REPOSITORY_ERROR = 'search_repositories_error'
}

const reducer = (state: RepositoriesState, action: Action): RepositoriesState => {
  //switch cases act also as type guards
  switch (action.type) {
    case ActionType.SEARCH_REPOSITORY:
      return { ...state, loading: true, error: null, data: [] }

    case ActionType.SEARCH_REPOSITORY_SUCCESS:
      return { ...state, loading: false, error: null, data: action.payload }

    case ActionType.SEARCH_REPOSITORY_ERROR:
      return { ...state, loading: false, error: action.payload, data: [] }

    default:
      return state
  }
}
```  
<br/>

## specific parts:
```
const container = document.getElementById('root')!


// !!! ONE INDEX.TS FILE TO EXPORT EVERYTHING FROM state/*:
export * from './store'
export * as actionCreators from './action-creators'
export * from './reducers'
```

[react\typescript\3_redux-ts\src\state\action-creators\index.ts](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Cstate%5Caction-creators%5Cindex.ts)
```
import { Dispatch } from 'redux'
import { Action } from '../actions'

...

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    // a fn that can only be called with an argument, matching Action; now TS knows what the type and payload below can be in each case

    dispatch({ type: ActionType.SEARCH_REPOSITORY })
    ...

  }
}
```
<br/>  

[react\typescript\3_redux-ts\src\state\actions\index.ts](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Cstate%5Cactions%5Cindex.ts)
```
import { ActionType } from '../action-types'

interface SearchRepositoriesAction {
  type: ActionType.SEARCH_REPOSITORY
}

interface SearchRepositoriesSuccessAction {
  type: ActionType.SEARCH_REPOSITORY_SUCCESS
  payload: string[]
}

interface SearchRepositoriesErrorAction {
  type: ActionType.SEARCH_REPOSITORY_ERROR
  payload: string
}

export type Action = SearchRepositoriesAction | SearchRepositoriesSuccessAction | SearchRepositoriesErrorAction
```
<br/>

[react\typescript\3_redux-ts\src\state\reducers\repositoriesReducer.ts](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Cstate%5Creducers%5CrepositoriesReducer.ts)
```
import { ActionType } from '../action-types'
import { Action } from '../actions'

export interface RepositoriesState {
  loading: boolean
  error: string | null
  data: string[]
}

const initialState = {
  loading: false,
  error: null,
  data: []
}

const reducer = (state: RepositoriesState = initialState, action: Action): RepositoriesState => {
  //switch cases act also as type guards
  switch (action.type) {
    case ActionType.SEARCH_REPOSITORY:
      return { ...state, loading: true, error: null, data: [] }
    ...
  }
}
```
<br/>

[react\typescript\3_redux-ts\src\state\reducers\index.ts](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Cstate%5Creducers%5Cindex.ts)
```
import { combineReducers } from 'redux'
import repositoriesReducer from './repositoriesReducer'

const reducers = combineReducers({ repositories: repositoriesReducer })

export default reducers

export type RootState = ReturnType<typeof reducers>

// ReturnType: TS builtin helper, that receives a function and returns the type that the function returns:
/*
  type RootState = {
      readonly [$CombinedState]?: undefined;
  } & {
      repositories: RepositoriesState;
  }
*/
```
<br/>  


[react\typescript\3_redux-ts\src\hooks\useActions.ts](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Chooks%5CuseActions.ts)
```
import { bindActionCreators } from 'redux'
import { actionCreators } from '../state'

export const useActions = () => {
  const dispatch = useDispatch()

  return bindActionCreators(actionCreators, dispatch)
  // => { searchRepositories: dispatch(searchRepositories(), ... }
}
```
<br/>  


[react\typescript\3_redux-ts\src\hooks\useTypedSelector.ts](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Chooks%5CuseTypedSelector.ts)
```
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../state'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
```
<br/>


[react\typescript\3_redux-ts\src\components\RepositoriesList.tsx](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Ccomponents%5CRepositoriesList.tsx)
```
import { useActions } from '../hooks/useActions'
import { useTypedSelector } from './../hooks/useTypedSelector'

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState('')
  // const dispatch = useDispatch()
  const { searchRepositories } = useActions()
  const { data, error, loading } = useTypedSelector((state) => state.repositories)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // dispatch(actionCreators.searchRepositories(term))
    searchRepositories(term)
  }
  ...
}
```