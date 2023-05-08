## typescript = js + a type system; a js superset  

## The TS Type System
- helps catch errors **during coding**
- uses 'types annotations' to analyze code
- only active *during development*
- doesn't provide *performance optimization*

<br/><br/>


# INIT
`npx create-react-app <app_name> --template typescript` - create react ts app; if `<app_name>` is replaced with `.` then the project will be initialized in the current folder

> It's a good practice to install `typescript` to every project so that projects won't break if something changes with the globally installed TS.

<br/><br/>


# TS compiler
## _ts -> compiler -> js_
<br/>

`tsc index.ts` - ts compile and create `index.js`  

> **compiler watch mode** - `tsc app.ts --watch` or `tsc app.ts -w`  

> `tsc --init` - inits a project as TS project and creates a `tsconfig.json`. Now the `tsc` automatically compiles **all** ts files in the project to js: `tsc -w`

> **start script** for the ts app preserving console output: `"tsc --watch --preserveWatchOutput"`  

<br/><br/><br/>


# NODE

> Node doesn't execute TS.

`npm i -g typescript ts-node`

`ts-node index.ts` - compile `ts` to `js` and run it *(index.ts => index.js; node index.js)*. Good for **development**  
`npm i -g parcel-bundler` - helps run TS in the browser
  * `parcel index.html` - starts the server and when it sees a ts file, it auto converts it to js  

[exercise\typescript\understanding-ts-2022\node_express\src\app.ts](../typescript/understanding-ts-2022/node_express/src/app.ts)

`tsconfig.json:`
```json
{
  "target": "es2018",
  "moduleResolution": "node",
  "outDir": "./dist",
  "rootDir": "./src"
}
```

Required deps:
- `@types/node`
- `@types/express` - starts working if instead `require` we import express like `import express from 'express'` (thanks to TS, which converts it to `require()`)

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


> It is **not recommended to export** TS from an NPM module of any kind because it could be used in a JS-only package and this will cause errors. It should be transpiled to JS before exporting. TS -> TSC -> dist/index.js.  

<br/>


> In **npm** we publish the package compiled from TS to JS;  

<br/><br/>



# Type definition file (declaration file) (*.d.ts)
_Allows the usage of Vanilla JS libs in a TS project_

> They don't contain actual logic, but **instructions to TS** about how something works and what's included in its package: the different types of values, functions, classes 

<br/>

If we are **not going to import** our package anywhere else:
- the type definition file is **not needed** (in `tsconfig.json` `declarationMap` key can stay commented)
- also in `package.json` we don't need a `main` key set in such case  
<br/><br/>

### TS -> Type definition file -> JS Library  
if a TDF is missing in a JS Lib (for which there's a warning), then it could be found and used from "Definitely Typed" (`npm i --save-dev @types/[js-lib-name]`)

`npm i @types/faker`

> You can search for such files like `jquery types`

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
// tells TS not to worry about this var, that's been declared globally in the html file; same with features and packages without types 
declare var GLOBAL: any

const num1 = 5 // const num1: 5
let num2 = 5 // let num2: number

function someFunc(_: Function, _2: string, _name: string) // _ - tell TS you are aware of the arg, but don't intend to use it
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
- **`Tuple`** - fixed length & type array _(`Array.push()` errors are **not caught** though)_
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
document.querySelector('#user-input')! as HTMLInputElement
```

<br/><br/><br/>

# CLASSES  
[exercise\typescript\understanding-ts-2022\classes_interfaces\src\classes.ts](../typescript/understanding-ts-2022/classes_interfaces/src/classes.ts)

> Every class automatically acts as a **type**.

> **modifiers** - `public`, `private`, `protected` _(by convention `public` methods must be put **before** `private` ones)_

> in an inherited class's constructor `this` **cannot be used** before the `super()` has finished running. `super()` must be **called first**

> **accessors** - `get` and `set` _(by convention they must be **between** the `props` and the `constructor`)_: [js.md](js.md)

> **`static`**: [js.md](js.md)

```ts
class Department {
  name: string // field or property

  // shortcut: adding a modifier to param in constructor's args - then the prop is automatically created and no need to add it explicitly like 'name'
  constructor(n: string, public lastName: string, private age: number) {
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

> `abstract` classes **cannot be instantiated**, only **inherited**, and the inheriting classes can then be instantiated

> used to **force certain methods to be implemented/overridden** in each extending class in its own way

> **cannot have** `private abstract` methods

```ts
  abstract class Department {
    abstract describe(this: Department): void
  }

  const finance = new Department(0, 'Finance') // ERROR: Cannot create an instance of an abstract class.ts

  // ok:
  class ITDepartment extends Department {
    describe() {...}
  // if describe is not defined we get a TS error: Non-abstract class 'ITDepartment' does not implement inherited abstract member 'describe' from class 'Department'.ts
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


// exercise\typescript\understanding-ts-2022\project_drag-drop\src\app.ts
interface Draggable {
  dragStartHandler(event: DragEvent): void
  dragEndHandler(event: DragEvent): void
}

interface DragTarget {
  // the browser needs to be notified that the thing we're dragging something over is a valid dropping target, so dropping should be permitted
  dragOverHandler(event: DragEvent): void
  dropHandler(event: DragEvent): void
  dragLeaveHandler(event: DragEvent): void
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {}



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
[exercise\typescript\understanding-ts-2022\advanced-types\src\app.ts](../typescript/understanding-ts-2022/advanced-types/src/app.ts)  
<br/>
- **Intersection types / interfaces**. Intersection of:
  - `object` types => combination of props
  - `union` types => the types they have in common

```ts
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
```

- **Type guards**
  - general checks:
    - `typeof`
    - prop `in` object

    ```ts
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
    ```

  - classes checks:
    - prop `in` object
    - `instanceof`

    ```ts
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
    ```

- **Discriminated union pattern** (common prop + switch) - useful when working with objects, union types and interfaces

```ts
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
```

- **Type casting** - tell TS what type to expect when it can't infer it correctly

```ts
const userInputElement = document.querySelector('#user-input')! as HTMLInputElement

// equivalent (for React projects this could be mistaken for a JSX element, so the `as` keyword case is more suitable there):
const userInputElement = <HTMLInputElement>document.querySelector('#user-input')


editingContainer.current.contains(event.target) // => TS error: Argument of type 'EventTarget' is not assignable to parameter of type 'Node'.

// WORKAROUND (when we are sure that elements are compatible):
editingContainer.current.contains(event.target as Node)
```

- **Index properties** - for an object, when we know the value type but we don't know the count and the names of the properties in it

```ts
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
```

- **Function overloads** - when TS can't infer the fn return type by it's own, we define the different combinations and what return value type they lead to

```ts
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
```

- **Optional chaining** - `a?.b`

```ts
const fetchedUserData = {
  id: 1,
  name: 'Ivan',
  // job: { title: 'CEO', ... }
}

console.log(fetchedUserData?.job?.title)
```

- **Nullish coalescing** - `a ?? b` - if `a` is `null` or `undefined` (`||` - for `falsy` value)

```ts
// ?? - if it's null/undefined
// || - if it's falsy
const userInput = ''
console.log(userInput ?? 'DEFAULT') // ''
console.log(userInput || 'DEFAULT') // 'DEFAULT'
```
<br/><br/><br/>



# GENERICS
> A type, connected to some other type and is really flexible regarding which type this other type is. It creates a component that can work with a variety of data types rather than a single data type.

```ts
function identity<T>(arg: T): T {    
    return arg;    
}    
let output1 = identity<string>("myString");    
let output2 = identity<number>( 100 );  
```

<br/>

- **built-in** generic types

```ts
// tell TS what type of data an array stores
const names: Array<string> = [] // === string[]
// names[0].split(' ') // string methods suggested

// tell TS what type of data a promise returns
// Promise<string> -> this is a promise that'll eventually yield a string
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => resolve('resolved!'), 1000)
})
promise.then((data) => {
  data.split(' ')
})
```

- **custom** generics (locks in the usage of the generic type inside the function/class):
  - GENERIC **FUNCTIONS**
  
  ```ts
  function merge(objA: object, objB: object) { // type object is too general
    return Object.assign(objA, objB)
  }
  const mergedObj = merge({ name: 'Ivan' }, { age: 21 })
  mergedObj.name // ERROR: Property 'name' does not exist on type 'object'.

  // by convention we start with T for a Type, and then continue with U and so on
  function merge<T, U>(objA: T, objB: U) {
    // return [objA, objB] // function merge<T, U>(objA: T, objB: U): (T | U)[]
    return Object.assign(objA, objB) // => function merge<T, U>(objA: T, objB: U): T & U
  }
  // we could specify the result type by `: T & U` but its not needed since TS infers it in this case

  const mergedObj = merge({ name: 'Ivan' }, { age: 21 }) // TS understands that T and U are of different types and infers them: const mergedObj { name: string } & { age: number }
  mergedObj.name // no error and (name | age) are auto-suggested

  const mergedObj2 = merge({ sex: 'm' }, { age: 45 }) // { sex: string } & { age: number }
  const mergedObj3 = merge<string, number>('test', 45) // we could also fill in different values for U and T types for different function calls if TS doesn't infer them

  // ### CONSTRAINTS

  function merge<T extends object, U extends object | number>(objA: T, objB: U) {
    return Object.assign(objA, objB)
  }

  // here we only care that we receive an element with a length property and return a tuple:
  interface Lengthy {
    length: number
  }
  function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let description = 'Got no value.'
    if (element.length === 1) {
      description = `Got 1 element.`
    } else if (element.length > 1) {
      description = `Got ${element.length} elements.`
    }
    return [element, description]
  }
  console.log(countAndDescribe('Hey you!'))

  // ### THE keyof CONSTRAINT

  // `U extends keyof T` - U should be a key, present in the T object
  function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]
  }
  extractAndConvert({}, 'name') // ERROR
  extractAndConvert({ name: 'Al' }, 'name') // ok
  ```

  - GENERIC **CLASSES**
  
  ```ts
  // define some generic type we use for storing our data
  class DataStorage<T extends string | number | boolean> {
    private data: T[] = []

    addItem(item: T) {
      this.data.push(item)
    }

    removeItem(item: T) {
      if (this.data.indexOf(item) === -1) {
        return
      }
      this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
      return [...this.data]
    }
  }

  const textStorage = new DataStorage<string>()
  textStorage.addItem('test') // TS: addItem(item: string): void
  // textStorage.addItem(1) // ERROR

  const numberStorage = new DataStorage<number | string>()
  numberStorage.addItem(4) // (method) DataStorage<string | number>.addItem(item: string | number): void
  ```

  - **GENERIC** UTILITY TYPES
  - `Partial` - TEMPORARY wrap the Type and turn it into a type where all the props are OPTIONAL

  ```ts
  function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {} // Partial - tells TS that this is an object that in the end will be of CourseGoal type

    courseGoal.title = title
    courseGoal.description = description
    courseGoal.completeUntil = date

    return courseGoal as CourseGoal // cast back from Partial to CourseGoal
  }
  ```

  - **Readonly** - makes an `array` or an `object` readonly
  ```ts
  const names: Readonly<string[]> = ['a', 'b']
  names.push() // error
  names.pop() // error
  ```
<br/><br/><br/>  

# DECORATORS

_uncomment `experimentalDecorators` in `tsconfig.js` first and set `"target": "es6"`_  

> A **Decorator** is a special kind of declaration that can be **attached** to a `class` declaration, `method`, `accessor`, `property`, or `parameter`. Decorators provide a way to add both **annotations** and a **meta-programming** syntax for class declarations and members. Decorators use the form `@expression`, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration. They can **return** a value.

> *Note:* A Declarator automatically **binds** the `this` keyword.

<br/><br/>

- USAGE IN **CLASSES**
[exercise\typescript\understanding-ts-2022\decorators\src\for-classes.ts](../typescript/understanding-ts-2022/decorators/src/for-classes.ts)

```ts
// decorator - a function you apply to something, e.g. a class in a certain way. Usually starts with a capital letter
function Logger(constructor: Function) {
  console.log('Logging...') //1
  console.log(constructor) //2
}

// decorators run when the class is defined, not when it's instantiated
@Logger
class Person {
  name = 'Al'
  constructor() {
    console.log('Creating person object...') //6
  }
}

// DECORATOR FACTORY - allows passing args

function LoggerWithArgs(logString: string) {
  console.log('LOGGER FACTORY') //3
  return function (constructor: Function) {
    console.log(logString) //7
    console.log(constructor) //8
  }
}

function WithTemplate(template: string, domElId: string) {
  console.log('TEMPLATE FACTORY') //4
  // `_` - tells TS you are aware of the arg but don't intend to use it
  // return function (_: Function) {
  return function (constructor: any) {
    console.log('Rendering template...') //5

    const hookEl = document.getElementById(domElId)
    const p = new constructor()
    if (hookEl) {
      hookEl.innerHTML = template
      hookEl.querySelector('h1')!.textContent = p.name
    }
  }
}

// EXECUTION ORDER: factories up-to-down, decorators in them down-to-up

@LoggerWithArgs('LOGGING - PERSON')
@WithTemplate('<h1>My person object</h1>', 'app')
class Person2 {
  name = 'Al'
  constructor() {
    console.log('Creating person object...')
  }
}
```

<br/>

- OTHER USAGES (`properties`, `accessors` (get/set), `methods`, `parameters`)

```ts
  /* target:
    - for an instance of a property, it will be the prototype of the object that was created
    - for a static property - the constructor
  */
function LogProperty(target: any, propertyName: string | Symbol) {
  console.log('Running property decorator', { target, propertyName })
}

// target: instance -> prototype; static -> the constructor
function LogAccessor(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator:', { target, name, descriptor })
}

// target: instance -> prototype; static -> the constructor
function LogMethod(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator:', { target, name, descriptor })
}

// target: instance -> prototype; static -> the constructor
function LogParameter(target: any, name: string | Symbol, argumentPosition: number) {
  console.log('Parameter decorator:', { target, name, argumentPosition })
}

class Product {
  @LogProperty // add a decorator to a PROPERTY
  title: string
  private _price: number

  @LogAccessor
  set price(value: number) {
    if (value > 0) {
      this._price = value
    } else {
      throw new Error('Invalid price - should be positive!')
    }
  }

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  @LogMethod
  getPriceWithTax(@LogParameter tax: number) {
    return this._price * (1 + tax)
  }
}
```

- you can **return**
  - a function that can replace the **constructor** and thus override class's behavior
  
  ```ts
  function WithTemplate(template: string, domElId: string) {
    console.log('TEMPLATE FACTORY') //4
    // `_` - tells TS you are aware of the arg but don't intend to use it
    // return function (_: Function) {

    // T is an object generated from a constructor that could accept any kind of arguments. the only certain property is `name`
    return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
      // RUNS ON DECORATOR FN EXECUTION (ON CLASS DEFINITION)

      // console.log('Rendering template...') //5

      // const hookEl = document.getElementById(domElId)
      // const p = new originalConstructor()
      // if (hookEl) {
      //   hookEl.innerHTML = template
      //   hookEl.querySelector('h1')!.textContent = p.name
      // }

      // extend and replace the current CONSTRUCTOR fn
      return class extends originalConstructor {
        constructor(..._: any[]) {
          super() // saves the original class methods&props

          // RUNS ON INSTANTIATING THE CLASS
          console.log('Rendering template...') //5

          const hookEl = document.getElementById(domElId)
          // const p = new originalConstructor()
          if (hookEl) {
            hookEl.innerHTML = template
            hookEl.querySelector('h1')!.textContent = this.name
          }
        }
      }
    }
  }

  // EXECUTION ORDER: factories up-to-down, decorators in them down-to-up

  @LoggerWithArgs('LOGGING - PERSON')
  @WithTemplate('<h1>My person object</h1>', 'app')
  class Person2 {
    name = 'Al'
    constructor() {
      console.log('Creating person object...')
    }
  }

  const p = new Person2() // decorator runs on instantiating now
  ```

  - for **methods** and **accessors** - a new `PropertyDescriptor` could be returned

<br/>

- **AUTOBIND** decorator - adds an extra getter layer, that binds `this` in a called from outside method to the class instance (by using `PropertyDescriptor`)

```ts
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // we want to make sure that we'll always assign `this` to the obj this method belongs to
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // execute some extra logic when the user tries to access this prop (add an extra getter layer)
    get() {
      const boundFn = originalMethod.bind(this) // this -> obj that defined the getter and triggers it
      return boundFn
    }
  }

  return adjustedDescriptor
}

class Printer {
  message = 'This works!'

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}

const printer = new Printer()
const button = document.querySelector('button')!
// button.addEventListener('click', printer.showMessage) // logs 'undefined', because this -> button
// button.addEventListener('click', printer.showMessage.bind(printer)) // now this -> printer
// INSTEAD OF manually calling .bind(printer) every time, after adding Autobind decorator:
button.addEventListener('click', printer.showMessage) // this -> printer
```
<br/>

- decorators for **VALIDATION**

```ts
interface ValidatorConfig {
  [className: string]: {
    [validatableProp: string]: string[] // ['required', 'positive', ...]
  }
}

const registeredValidators: ValidatorConfig = {}

function RequiredValue(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if (!objValidatorConfig) {
    return true
  }

  let isValid = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
          break
        case 'positive':
          isValid = isValid && obj[prop] > 0
          break
      }
    }
  }

  return isValid
}

class Course {
  @RequiredValue
  title: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value

  const createdCourse = new Course(title, price)

  if (!validate(createdCourse)) {
    alert('Invalid input!')
    return
  }

  console.log(createdCourse)
})
```

<br/>

## Usage of decorators
- `class-validator`
- `nestjs` - node.js framework for SSR apps with TS out-of-the-box
- `angular`

<br/><br/><br/> 

# Code splitting

- **Namespaces** (TS feature) and **File Bundling** (not recommended, some imports could be dangerously missed)
  - use `namespace` code syntax to group code
  - **per-file** or **bundled** compilation is possible (less imports to manage)
  ```json
  // tsconfig.json
  {
  "module": "amd",
  "outFile": "./dist/bundle.js" // bundles all code, including namespaces together so in the bundled js everything is accessible
  }
  ```

  ```ts
  // drag-drop-interfaces.ts
  namespace App {
    export interface Draggable {
      dragStartHandler(event: DragEvent): void
      dragEndHandler(event: DragEvent): void
    }

    export interface DragTarget {
      // the browser needs to be notified that the thing we're dragging something over is a valid dropping target, so dropping should be permitted
      dragOverHandler(event: DragEvent): void
      dropHandler(event: DragEvent): void
      dragLeaveHandler(event: DragEvent): void
    }
  }
  ```

  ```ts
  // App.ts
  /// <reference path="drag-drop-interfaces.ts" />

  namespace App {
    ...
  }
  ```

  ```html
  <script src="dist/bundle.js" defer></script>
  ```

- **ES6 Modules (imports/exports)** (the more modern and preferred alternative, supported by TS and modern browsers natively)
  - uses ES6 import/export syntax
  - per-file compilation but a single `<script type="module">` import
  - **bundling** via 3rd-party tools like Webpack is possible

```json
{
  "module": "es2015",
  //  "outFile": ""
}
```

```html
<script type="module" src="dist/app.js"></script>
```

```ts
// NOTE: file extension must be added!
import { ProjectInput } from './components/project-input.js'
```
> The **file extension** may be **omitted** if we use Webpack or another **bundler**, but if we rely on the **browser** to import our files, then we **need** the **extensions**.

> On page load the **browser** starts from the main file, and then **makes a request** for each file, based on the imports chain.

<br/><br/><br/> 


# Exercise TS projects
- **Drag & Drop** ([exercise\typescript\understanding-ts-2022\project_drag-drop\src](../typescript/understanding-ts-2022/project_drag-drop/src)) - OOP, decorators (autobind, validation), generics, singleton, static, project state management via a class, abstract class for inheritance, accessors, webpack, ES6 modules
  - `tsconfig.json` settings for running `Webpack`:
  
  ```json
  {
    "target": "es6",
    "module": "es2015",
    "outDir": "./dist",
    "sourceMap": true,
    // "rootDir": "./src"  // not needed any more since Webpack will determine where the src files are
  }
  ```

  - add a `webpack.config.js` file (uses `node.js` syntax - `modules.exports = {...}`)

  - `package.json`:
  
  ```json
  { "scripts": {
    "start": "webpack serve",
    "build": "webpack --config webpack.config.prod.js" 
  } }
  ```

- **Address to Google location** ([exercise\typescript\understanding-ts-2022\project_adress-to-location](../typescript/understanding-ts-2022/project_adress-to-location))

- Todo list ([exercise\typescript\understanding-ts-2022\react-ts\src](../typescript/understanding-ts-2022/react-ts/src))

- **Node & Express simple REST API (CRUD operations with routes & controllers)** [exercise\typescript\understanding-ts-2022\node_express\src](../typescript/understanding-ts-2022/node_express/src)

<br/><br/><br/> 




<br/><br/><br/><br/><br/><br/>  

----
<br/><br/><br/>  


# REACT + TS  

`React.FC` ~ `React.FunctionComponent` 
`React.ClassicComponent` - class components 
<br/>

## PROPS 

[exercise\typescript\React and Typescript Build a Portfolio Project\2_react-ts\src\state](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/2_react-ts/src/props):
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

[exercise\typescript\React and Typescript Build a Portfolio Project\2_react-ts\src\state\GuestList.tsx](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/2_react-ts/src/state/GuestList.tsx):
```ts
  const [guests, setGuests] = useState([]) // TS assumes that the array will be forever empty -> guests: never[]
  const [guests, setGuests] = useState<string[]>([]) // now all is good

  const [user, setUser] = useState<{ name: string; age: number } | undefined>()
```  
<br/><br/>

## EVENTS
[exercise\typescript\React and Typescript Build a Portfolio Project\2_react-ts\src\events\EventComponent.tsx](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/2_react-ts/src/events/EventComponent.tsx):
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
[exercise\typescript\React and Typescript Build a Portfolio Project\2_react-ts\src\classes\UserSearch.tsx](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/2_react-ts/src/classes/UserSearch.tsx):
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
[exercise\typescript\React and Typescript Build a Portfolio Project\2_react-ts\src\refs\UserSearch.tsx](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/2_react-ts/src/refs/UserSearch.tsx):
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
[exercise\typescript\React and Typescript Build a Portfolio Project\3_redux-ts\src\state](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/3_redux-ts/src/state):
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

[exercise\typescript\React and Typescript Build a Portfolio Project\3_redux-ts\src\state\action-creators\index.ts](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/3_redux-ts/src/state/action-creators/index.ts)
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

[exercise\typescript\React and Typescript Build a Portfolio Project\3_redux-ts\src\state\actions\index.ts](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/3_redux-ts/src/state/actions/index.ts)
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

[exercise\typescript\React and Typescript Build a Portfolio Project\3_redux-ts\src\state\reducers\repositoriesReducer.ts](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/3_redux-ts/src/state/reducers/repositoriesReducer.ts)
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

[exercise\typescript\React and Typescript Build a Portfolio Project\3_redux-ts\src\state\reducers\index.ts](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/3_redux-ts/src/state/reducers/index.ts)
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


[exercise\typescript\React and Typescript Build a Portfolio Project\3_redux-ts\src\hooks\useActions.ts](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/3_redux-ts/src/hooks/useActions.ts)
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


[exercise\typescript\React and Typescript Build a Portfolio Project\3_redux-ts\src\hooks\useTypedSelector.ts](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/3_redux-ts/src/hooks/useTypedSelector.ts)
```ts
import { useSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../state'

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
```
<br/>


[exercise\typescript\React and Typescript Build a Portfolio Project\3_redux-ts\src\components\RepositoriesList.tsx](../typescript/React%20and%20Typescript%20Build%20a%20Portfolio%20Project/3_redux-ts/src/components/RepositoriesList.tsx)
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

### `satisfies` operator
```ts
type MyState = StateName | StateCordinates;
type StateName = "Washington" | "Detriot" | "New Jersey";
type StateCordinates = {
  x: number;
  y: number;
};
type User = {
  birthState: MyState;
  currentState: MyState;
};
const user = {
  birthState: "Washington",
  currentState: { x: 8, y: 7 },
} satisfies User;
user.birthState.toUpperCase(); // error if satisfies is not used "property toUpperCase() does not exist on type MyState and property to uppercase does not exist on type StateCordinates"
```

```ts
type Keys = 'FirstName' |"LastName"| "age"|"school"| "email"
const student = {
  FirstName: "Temitope",
  LastName: "Oyedele",
  age: 36,
  school:"oxford",
} satisfies Partial<Record<Keys, string | number>>;

student.FirstName.toLowerCase();
student.age.toFixed();
```

```ts
type Keys = 'FirstName' |"LastName"| "age"|"school"

const student = {
  FirstName: "Temitope",
  LastName: "Oyedele",
  age: 36,
  school:"oxford",
} satisfies Record<Keys, string | number>;

student.age.toFixed(); // if 'age' was '36' then there would be a TS error here
student.school.toLowerCase();
```

```ts
type Book = { author: string; title: string; year: number }

const library = {
  book1: { title: 'Things fall apart', author: 'Chinua Achebe', year: 1958 },
  book2: { title: 'Lord of the flies', author: 'William Golding', year: 1993 },
  book3: { title: 'Harry Potter', author: 'J.k Rowling', year: '1997' }, // Error (Type 'string' is not assignable to type 'number'
} satisfies Record<string, Book>
```
