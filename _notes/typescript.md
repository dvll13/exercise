## typescript = js + a type system; a js superset  

## The TS Type System
- helps catch errors **during coding**
- uses 'types annotations' to analyze code
- only active *during development*
- doesn't provide *performance optimization*

<br/><br/>

# INIT
`npx create-react-app <app_name> --template typescript` - create react ts app

<br/><br/>

# TS compiler
## _ts -> compiler -> js_
<br/>

> **compiler watch mode** - `tsc app.ts --watch` or `tsc app.ts -w`  

> `tsc --init` - inits a project as TS project and creates a `tsconfig.json`. Now the `tsc` automatically compiles **all** ts files in the project to js.

`tsc index.ts` - ts compile and create `index.js`  
<br/><br/><br/>


## TS-NODE
`npm i -g typescript ts-node`

`ts-node index.ts` - compile `ts` to `js` and run it *(index.ts => index.js; node index.js)*  
`npm i -g parcel-bundler` - helps run TS in the browser
  * `parcel index.html` - starts the server and when it sees a ts file, it auto converts it to js  



<br/><br/>

# TS config

Some **`tsconfig.js` options** worth mentioning:
- **exclude** files from `tsc` compilation:
  ```json
  "exclude": [ "**/*.dev.ts" ]
  ```
- **include** files in the compilation process  
  ```json
  "include": [ "app.ts" ]

  "files": ["app.ts"] // can't specify folders
  ```
- **`target`** - to which JS versions to **transpile** (es5, es6, etc.)
- **`lib`** - which features to be available for the TS project (like DOM APIs, JS methods). Defaults: `"lib": ["dom", "es6", "dom.iterable", "scripthost"]
- **`allowJS`** - a js file will be compiled by TS even if it doesn't end with `.ts`
- **`checkJS`** - will check the syntax in JS files and report potential errors
- **`sourceMap`** - generates `.map` files which act as a bridge for the browser to connect the js files to the input files (the TS files in our case) and show the latter in the Sources panel for **debugging** purposes. _Required_ for debugging TS from the browser or the IDE
- **`outDir`** - where the created JS files should be stored (usually the `./dist` folder)
- **`rootDir`** - tells TS where the source files are located so it doesn't look anywhere else (usually `./src`). The compiler will keep the same project structure in the `outDir`
- **`removeComments`** - should comments be removed in the compiled files
- **`noEmit`** - don't generate JS files. good for dry runs to check for errors
- **`noEmitOnError`** - don't generate JS files if there is an error
- **`downlevelIteration`** - generates more verbose code. Should be turned on if there are loops and the generated code behaves differently than it should regarding those loops
- **`strict`** - enable all strict type-checking options:
  - **`noImplicitAny`** - requires all params to be typed (while some variables could be tracked and inferred by TS)
  - **`strictNullChecks`** - tells TS to be maximally strict when working with values that could potentially hold `null` values (like `document.getElementById('root')`), bypassed by an `!` if we are sure we have a value or adding additional checks
   - **`strictBindCallApply`** - checks if we pass the correct parameters with `bind()`, `call()`, `apply()`
   - **`alwaysStrict`** - adds `use strict` js rule to the generated files
 - **`noUnusedLocals`** - declared and unused local vars should trigger TS errors
 - **`noUnusedParameters`** - not used params trigger TS errors
 - **`noImplicitReturns`** - to fail if we have a function that sometimes returns and sometimes doesn't

<br/> <br/> 

> `document.getElementById("num1")! as HTMLInputElement` - the `!` tells TS that we are sure this will always yield a value !== null and that it will always be an HTMLInputElement

<br/><br/>



> **start script** for the ts app: `"tsc --watch --preserveWatchOutput"`  

> It is **not recommended to export** TS from an NPM module of any kind because it could be used in a JS-only package and this will cause errors. It should be transpiled to JS before exporting. TS -> TSC -> dist/index.js.  

<br/>


> In **npm** we publish the package compiled from TS to JS;  

<br/><br/>



# Type definition file (*.d.ts)  
> describes the different types of values, functions, classes that exist in a js library   

<br/>

If we are **not going to import** our package anywhere else:
- the type definition file is **not needed** (in `tsconfig.json` `declarationMap` key can stay commented)
- also in `package.json` we don't need a `main` key set in such case  
<br/><br/>

### TS -> Type definition file -> JS Library  
if a TDF is missing in a JS Lib (for which there's a warning), then it could be found and used from "Definitely Typed" (`@types/[js-lib-name]`)

`npm i @types/faker`
<br/><br/><br/><br/>


# SYNTAX & FEATURES

**type** - easy way to refer to the different props & fns a value has, eg. string. every value has a type. JS has **dynamic types** resolved at **runtime**, while TS has **static types** set during **development**
<br/><br/> 

**type annotation** - code *we* add to tell TS what type of value a variable will refer to. We should rely on it:
  - when we declare a var on one line then initialize it later
  - when we want the var to have a type that can be inferred
  - when a function returns the 'any' type and we want to clarify the value

**type inference** -  *TS* tries to figure out what type of value a variable refers to (*when the variable is initialized with a value/expression on the same line*). **We should rely on it whenever we can**  

```ts
const num1 = 5 // const num1: 5
let num2 = 5 // let num2: number
```

<br/><br/>

# CORE TYPES  
- **`number`**
- **`string`**
- **`boolean`**
- **`object`** || **`{...}`**
- **`Array`**
  ```ts
  let favoriteActivities: any[]
  let favoriteActivities: (string | number)[]
  ```
- **`Tuple`** - fixed length & type array _(`Array.push()` errors are not caught though)_
  ```ts
  role: [number, string]
  ```
- **`enum`** - automatically enumerated global constant identifiers. Behind the scenes every item **receives a number identifier**, starting from 0:
  ```ts
  enum Role { ADMIN, READ_ONLY, AUTHOR }
  console.log(Role.ADMIN, Role.READ_ONLY) // 0, 1

  // numbers can be changed:
  enum Role2 { ADMIN = 5, READ_ONLY, AUTHOR = 200, TEST = 'TEST' }
  console.log(Role2.ADMIN, Role2.READ_ONLY, Role2.AUTHOR, Role2.TEST) // 5, 6, 200, 'TEST'
  ```
- **`union`** - `string | number` - sometimes an additional check would be needed if we operate with the types inside the union, because TS doesn't check the types inside
- **`literal`** - `resultConversion: 'as-number' | 'as-string'`  - union of literals

---

- **type aliases**:
  ```ts
  type Combinable = number | string

  const input1: Combinable
  ```
- **functions** - TS tries to infer the *return* value type, but the *arguments* types **must** be specified by us. The return `void` type means that TS won't check it
  ```ts
  let combineValues: Function
  let combineValues2: (a: number, b: number) => number

  // arrow functions typing
  // TS requires the args with default values to be last
  const add = (a: number, b: number = 1) => a + b
  const printOutput: (a: number | string) => void = output => console.log(output)

  const add = (...numbers: number[]) => {
    numbers.reduce((currentResult, currentValue) => {
      return currentResult + currentValue
    }, 0)
  }
  ```
- **`any`** - TS doesn't know what type the value is, we should **avoid** leaving `any` if we can. TS **doesn't** do any error checking around that value
- **`unknown`** - a bit more restrictive than `any`. Requires additional type checks, and that makes it a **better choice** over `any`
  ```ts
  let userInput: unknown
  let userInput2: any
  let username: string

  userInput = 5
  userInput = 'Max'
  userInput2 = 'test'

  username = userInput2 // ok
  username = userInput // Type 'unknown' is not assignable to type 'string'.ts(2322)

  if (typeof userInput === 'string') {
    username = userInput // ok
  }
  ```
- **`never`** - specifies that this function is **intended** to never return anything

<br/><br/>

> `// @ts-ignore` - ignore TS errors on the next line  

<br/><br/>

> **!** - tell TS that the expression in front of `!` will never yield null
```ts
document.querySelector('#user-input')!
```

<br/><br/><br/>

# CLASSES  
[exercise\typescript\understanding-ts-2022\classes\src\app.ts](..%5Ctypescript%5Cunderstanding-ts-2022%5Cclasses%5Csrc%5Capp.ts)


```ts
class Department {
  name: string // field or property

  constructor(n: string) {
    this.name = n
  }

  describe(this: Department) {
    // `this` is not required to be passed when describe is executed, but adding `this` as a param tells TS that the usage of `this` inside of the fn must refer to the Department object and TS will notify if it's not used correctly or doesn't refer to it
    console.log('Department:', this.name)
  }
}

const accountingCopy = { describe: accounting.describe }
// if `this` is added as a `describe` param, then TS will warn about this:
console.log(accountingCopy.describe()) // Department: undefined (`this` refers to the thing, responsible for calling the method, in this case accountingCopy)

// if we add a `name` prop to the accountingCopy object, then there'll be no errors

```

## Modifiers (keywords) for properties and methods:
  * **private** - can only be called by *other methods* in *this* class (internal access)
  * **protected** - can be called by other methods in *this* class, or by other methods in *child* classes (internal access in inherited classes)
  * **public** *(default, can be omitted)* - can be called _anywhere_  

<br/><br/>

## Abstract classes  

> used to **force certain methods to be implemented/overridden** in each extending class in its own way

> abstract classes **cannot be instantiated**, only inherited, and the inheriting classes can be instantiated

```ts
  abstract class Department {
    abstract describe(this: Department): void
  }

  const finance = new Department(0, 'Finance') // ERROR: Cannot create an instance of an abstract class.ts(2511)

  // ok:
  class ITDepartment extends Department {
    describe() {...}
  // if describe is not defined we get a TS error: Non-abstract class 'ITDepartment' does not implement inherited abstract member 'describe' from class 'Department'.ts(2515)
  }
```

<br/><br/>

## Private Constructors

> **Singleton pattern** - to ensure that you have **only one** instance/object based on a certain class  

```ts
class AccountingDepartment extends Department {
  private static instance: AccountingDepartment

  private constructor() {...} // private ensures we can't call `new` on the class any more

  static getInstance() {
    // in static methods `this` refers to the class, while in non-static methods `this` refers to the instance

    // this = AccountingDepartment since it's a static method
    
    if (AccountingDepartment.instance) {
      return this.instance
    }

    this.instance = new AccountingDepartment(5, [])
    return this.instance
  }
}
```

<br/><br/><br/>

# Interfaces

> used to define the **structure of an object or class**; some of the props in an interface can be ignored. Can be _included_ in other interfaces.  

```ts
// type Todo = {
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
  //...

const todo = response.data as Todo
export class User implements Mappable {} // implements - optional, helps TS show better placed errors

const logToDo = (id: number, title: string, completed: boolean)


// a class can implement multiple interfaces
class SomeClass implements Interface1, Interface2 {}


interface Person {
  readonly id: number // can have readonly
  name: string
  age: number
  greet(phrase: string): void
}

let user1: Person

user1 = {
  name: 'Ivan',
  age: 11,
  greet(phrase) {
    console.log(phrase + ' ' + this.name)
  }
}



interface Named {
  readonly name: string
  // optionals:
  outputName?: string
  myMethod?(): number
}

// INTERFACE INHERITANCE
interface Greetable extends Named, SomeOtherInterface {
  greet(phrase: string): void
}


class SomePerson implements Greetable {
  name: string
  age = 30
  secondName?: string

  constructor(n: string, sn?:string) {
    this.name = n
    if (sn) {
      this.secondName = sn
    }
  }

  greet(phrase: string) {...}
}

// no error because the class structure satisfies the Greetable interface
let user2: Greetable
user2 = new SomePerson('Seth')
user2.name = 'Test' // error


// DEFINING FUNCTIONS
// type AddFn = (a: number, b: number) => number
interface AddFn {
  (a: number, b: number): number
}

let add: AddFn

add = (n1, n2) => {
  return n1 + n2
}
``` 

<br/><br/>

# Advanced typing concepts
[exercise\typescript\understanding-ts-2022\advanced-types\src\app.ts](..%5Ctypescript%5Cunderstanding-ts-2022%5Cadvanced-types%5Csrc%5Capp.ts)  
<br/>
- **Intersection types / interfaces**. Intersection of:
  - `object` types => combination of props
  - `union` types => the types they have in common
- **Type guards**
  - general checks:
    - `typeof`
    - prop `in` object
  - classes checks:
    - prop `in` object
    - `instanceof`
- **Discriminated union pattern** (common prop + switch)
- **Type casting** - tell TS what type to expect when it can't infer it correctly
- **Index properties** - for an object, when we know the value type but we don't know the count and the names of the properties in it
- **Function overloads** - when TS can't infer the fn return type by it's own, we define the different combinations and what return value type they lead to
- **Optional chaining** - `a?.b`
- **Nullish coalescing** - `a ?? b` - if `a` is `null` or `undefined` (`||` - for `falsy` value)

```ts
// ### INTERSECTION TYPES / INTERFACES

// interface Admin {
type Admin = {
  name: string
  privileges: string[]
}

// interface Employee {
type Employee = {
  name: string
  startDate: Date
}

// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
  name: 'Peter',
  privileges: ['start-server'],
  startDate: new Date()
}

type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric // number



// ### TYPE GUARDS

function add(a: Combinable, b: Combinable) {
  // type guard: typeof
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

type UnknownEmployee = Employee | Admin

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name:', this.name)
  
  // console.log('Privileges:', emp.privileges) // TS error

  // type guard: prop in obj
  if ('privileges' in emp) {
    console.log('Privileges:', emp.privileges) // ok
  }
}



// ### TYPE GUARDS FOR CLASSES
class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }

  loadCargo(amount: number) {
    console.log('Loading cargo', amount)
  }
}

type Vehicle = Car | Truck

const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()

  // type guard: prop in obj
  // if ('loadCargo' in vehicle) {
  //   vehicle.loadCargo(6)
  // }

  // better (since classes are compiled to constructor fns and js understands them):
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(6)
  }
}



// ### DISCRIMINATED UNION PATTERN (common prop + switch) - useful when working with objects, union types and interfaces

interface Bird {
  type: 'bird' // we add some common prop
  flyingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
  let speed
  switch (animal.type) {
    case 'bird': // TS detects and suggests cases
      speed = animal.flyingSpeed
      break
    case 'horse':
      speed = animal.runningSpeed
      break
  }

  console.log('Moving at speed: ' + speed)
}



// ### TYPE CASTING - tell TS what type to expect when it can't infer it correctly

const userInputElement = document.querySelector('#user-input')! as HTMLInputElement

// equivalent (for React projects this could be mistaken for a JSX element, so the `as` keyword case is more suitable there):
const userInputElement = <HTMLInputElement>document.querySelector('#user-input')



// ### INDEX PROPERTIES - in an object when we know the value type but we don't know the count and the names of the properties in it

interface ErrorContainer {
  id: string
  // id: number // nope - since it's defined as string below
  [prop: string]: string
}
// properties should be of type string and the values should be string

const error: ErrorContainer = {
  id: 'd1',
  email: 'Invalid email!',
  1: 'test' // ok
}

interface ErrorContainer2 {
  [key: number]: string
}
const error2: ErrorContainer2 = {
  1: 'test'
  // '1': 'test2' // error
}



// ### FUNCTION OVERLOADS - when TS can't infer the fn return type by it's own, we define the different combinations and what return value type they lead to

// TS merges all combinations with the function definition and now can predict correctly the return value type
function sum(a: number, b: number): number
function sum(a: string, b: string): string
function sum(a: number, b: string): string
function sum(a: number, b: number): string
function sum(a: Combinable, b: Combinable) {
  // type guard: typeof
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

const result = sum(1, 5) // const result: number; function sum(a: number, b: number): number (+3 overloads)
const result2 = sum(4, 'a') // function sum(a: number, b: string): string (+3 overloads)



// ### OPTIONAL CHAINING

const fetchedUserData = {
  id: 1,
  name: 'Ivan',
  // job: { title: 'CEO', ... }
}

console.log(fetchedUserData?.job?.title)



// ### NULLISH COALESCING

// ?? - if it's null/undefined
// || - if it's falsy
const userInput = ''
console.log(userInput ?? 'DEFAULT') // ''
console.log(userInput || 'DEFAULT') // 'DEFAULT'
```
<br/>





<br/><br/><br/> <br/><br/><br/>  

----
<br/><br/><br/>  


> element `as` type:
```ts
editingContainer.current.contains(event.target)
// => TS error: Argument of type 'EventTarget' is not assignable to parameter of type 'Node'.

// WORKAROUND (when we are sure that elements are compatible):
editingContainer.current.contains(event.target as Node)
```

<br/><br/>

# REACT + TS  

`React.FC` ~ `React.FunctionComponent`  
<br/>

## PROPS 

[react\typescript\2_react-ts\src\state](..%5Creact%5Ctypescript%5C2_react-ts%5Csrc%5Cprops):
```ts
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
```ts
interface ResizableProps {
  direction: 'horizontal' | 'vertical'
  children?: React.ReactNode
}
```
<br/><br/>

## STATE  

[react\typescript\2_react-ts\src\state\GuestList.tsx](..%5Creact%5Ctypescript%5C2_react-ts%5Csrc%5Cstate%5CGuestList.tsx):
```ts
  const [guests, setGuests] = useState([]) // TS assumes that the array will be forever empty -> guests: never[]
  const [guests, setGuests] = useState<string[]>([]) // now all is good

  const [user, setUser] = useState<{ name: string; age: number } | undefined>()
```  
<br/><br/>

## EVENTS
[react\typescript\2_react-ts\src\events\EventComponent.tsx](..%5Creact%5Ctypescript%5C2_react-ts%5Csrc%5Cevents%5CEventComponent.tsx):
```ts
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
```ts
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

  //...
}
```
<br/><br/>

## REFS
[react\typescript\2_react-ts\src\refs\UserSearch.tsx](..%5Creact%5Ctypescript%5C2_react-ts%5Csrc%5Crefs%5CUserSearch.tsx):
```ts
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
```ts
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
```ts
const container = document.getElementById('root')!


// !!! ONE INDEX.TS FILE TO EXPORT EVERYTHING FROM state/*:
export * from './store'
export * as actionCreators from './action-creators'
export * from './reducers'
```

[react\typescript\3_redux-ts\src\state\action-creators\index.ts](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Cstate%5Caction-creators%5Cindex.ts)
```ts
import { Dispatch } from 'redux'
import { Action } from '../actions'

//...

export const searchRepositories = (term: string) => {
  return async (dispatch: Dispatch<Action>) => {
    // a fn that can only be called with an argument, matching Action; now TS knows what the type and payload below can be in each case

    dispatch({ type: ActionType.SEARCH_REPOSITORY })
    //...

  }
}
```
<br/>  

[react\typescript\3_redux-ts\src\state\actions\index.ts](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Cstate%5Cactions%5Cindex.ts)
```ts
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
```ts
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
    //...
  }
}
```
<br/>

[react\typescript\3_redux-ts\src\state\reducers\index.ts](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Cstate%5Creducers%5Cindex.ts)
```ts
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
```ts
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
```ts
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../state'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
```
<br/>


[react\typescript\3_redux-ts\src\components\RepositoriesList.tsx](..%5Creact%5Ctypescript%5C3_redux-ts%5Csrc%5Ccomponents%5CRepositoriesList.tsx)
```ts
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
  //...
}
```

```ts
state.data = action.payload.reduce((acc, cell) => {
  acc[cell.id] = cell
  return acc
}, {} as CellsState['data'])
```