# CLOSURE
_allows an inner function to to have access to the outer function's variables and use them as "private" ones_
```js
const getAdd = () => {
  let foo = 1
  
  return () => {
    foo = foo + 1
    return foo
  }
}

const add = getAdd()

OR:

const add = (const getAdd = () => {
  let foo = 1
  
  return () => {
    foo = foo + 1
    return foo
  }
})() // Immediately Invoked Function Expression (IIFE)

===

console.log(add()) // 2
console.log(add()) // 3
console.log(add()) // 4
```	
<br/><br/>


# VARS
- `let`, `const` -> scoped in the current context (block-scoped variables), unlike `var`  
- `var` variables can be redeclared multiple times without causing an error, unlike `let` and `const`; they have **global and function** scopes
<br/><br/>


# ARROW FUNCTIONS
_anonymous function assigned to a variable_

They don't have their own context (`this` points to the upper enclosing context).  
A function becomes a part of the global window context, so with an arrow function `this` points to it.

Arrow functions handle `this` in a different way from regular functions:
* Arrow function - `this` represents the object that **defined** the arrow function.  
* In regular functions this keyword represented the object that **called** the function (the executer), which could be the window, the document, or whatever.

In short , in arrow function this represents the **definition** context while in regular function this represents the **execution** context.

```js
const obj = {
  props: ['prop1', 'prop2'], 
  
  printProps: function() {
    console.log(this) // this -> obj (since the function is part of the object)
    
    setTimeout(function() { 
      console.log(this) // this -> window
    }, 1000)

    setTimeout(() => console.log(this), 2000) // this -> obj
  },

  printPropsA: () => {
    console.log(this) // this -> window
    
    setTimeout(function() { 
      console.log(this) // this -> window
    }, 1000)

    setTimeout(() => console.log(this), 2000) // this -> window
  }
}
```

> Arrow functions **CANNOT** be used as **constructors** : 
This is because of how Arrow Functions use the `this` keyword. JS will simply throw an error if it sees an arrow function being invoked as a "constructor".

```js
function personCreator(name) {
   this.name = name
}
const person1 = new personCreator('John') // personCreator {name: 'John'}
```

The `new` keyword do some of its magic and makes the `this` keyword that is inside of `personCreator` to be initially an empty object instead of referencing the global object. After that, a new property called `name` is created inside that empty this object, and its value will be `'John'`. At the end, the `this` object is returned.

As we see, the `new` keyword changed the value of `this` from referencing the `global` object to `now` be an empty object `{}`.

**Arrow functions do not allow their `this` object to be modified**. Their `this` object is **always** locked to the value of the `this` of the scope where they were statically **created**. This is called **Static Lexical Scope**. That is why you **cannot** do operations like `bind`, `apply`, or `call` with arrow functions. 

_A **lexical scope** is just the area where a function is created._

- `this` keywords specifics from above
- Also **no `arguments`** keyword  
- No **`new`** keyword

Arrow functions **don't have** their own `this` or `arguments` binding. Instead, those identifiers are resolved in the **lexical scope** like any other variable. That means that inside an arrow function, `this` and `arguments` refer to the values of `this` and `arguments` in the environment the arrow function is **defined**

<br/><br/>


# SPREAD
```js
someArray.push( ...items )
const copiedPerson = { ...person }
```
<br/><br/>


# REST (parameters)
```js
const fn = (...args) => {}
```
<br/><br/>


# DESTRUCTURING
```js
const [, secondElement] = [1, 2, 3] // 2 

//Can be also used with a DEFAULT value:
const { name: newNameVar, position, age = 55 } = user
```
<br/><br/>


# RESTRUCTURING
```js
const adventureClimbing = {
  name: 'Everest',
  height: 8848,
  output() {
    console.log(`Mt. ${this.name} is now ${this.height} meter tall.`)
  }
  // short for:
  output: function() {
    console.log(`Mt. ${this.name} is now ${this.height} meter tall.`)
  }
}
```
<br/><br/>


# CLASSES
_The **class** keyword in Javascript is just a Syntactic sugar. And under the hood it’s just a special function._

## Function analogue:
```js
function Holiday(destination, days) {
  this.destination = destination
  this.days = days
}

Holiday.prototype.info = function() { console.log(this.destination + ' | ' + this.days) }

const nepal = Holiday('Nepal', 30)
nepal.info() // 'Nepal | 30'
```


## Class:
```js
// SUPER CLASS
class Holiday {  // has a function with a constructor underneath
  constructor(destination, days) { // sets the arguments as properties to the class
    this.destination = destination
    this.days = days
  }

  info() { console.log(this.destination + ' | ' + this.days)}
}

const trip = new Holiday('Nepal', 30)
trip.info() // 'Nepal | 30'


// SUB CLASS
class Expedition extends Holiday {
  constructor(destination, days, gear) {
    super(destination, days) // calling the parent class and passing the arguments to it
    this.gear = gear
  }

  info() {
    super.info() // calling the parent info() method
    console.log('Gear:', this.gear.join(' and '))
  }
}

const tripWithGear = new Expedition('Everest', 30, ['sunglasses', 'flags'])
tripWithGear.info() // '... Gear: sunglasses and flags'
```   

<br/>

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields
  
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

<br/>

> **Hoisting** - an important difference between function declarations and class declarations is that while functions can be called in code that appears before they are defined, classes must be defined before they can be constructed. 

> Methods can be **overridden**

<br/><br/>

## Getters and Setters
[exercise\typescript\understanding-ts-2022\classes\src\app.ts](..%5Ctypescript%5Cunderstanding-ts-2022%5Cclasses%5Csrc%5Capp.ts)
```ts
class AccountingDepartment extends Department {
  private lastReport

  // getter (allows access to a prop with additional logic) - later executed as a prop, not as a fn
  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport
    }
    throw Error('No reports found.')
  }
  
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error('Please pass in a valid value!')
    }
    this.addReport(value)
  }
  ...
}

// using getter and setter
accounting.mostRecentReport = ''
console.log(accounting.mostRecentReport)
```

<br/>

## Static properties

- allows adding properties and methods to classes which are not accessible to class instances but only inside the class itself.
- Usually for utility fns and global constants for a class. 
- Cannot be accessed by the non-static parts of the class. 
- in static methods `this` refers to the class, while in non-static methods `this` refers to the instance
- No need for calling `new`. 
- Example: Math.PI, Math.pow()  

```ts
class Department {
  static fiscalYear = 2022
  static createEmployee(name: string) {
    return { name }
  }

  constructor() {
    this.fiscalYear // cannot be accessed by the constructor
    Department.fiscalYear // now can be accessed
  }
} 

const employee1 = Department.createEmployee('Max')
console.log(employee1, Department.fiscalYear) // {name: 'Max'} 2022
```

<br/><br/><br/>

# Default parameters

A good practice is to keep all default parameters to the **right**:
```js
function add(a = 4, b) { // bad
function add(a, b = 4) { // good
```
<br/><br/>


# Swapping values
```js
let a = 5;
let b = 10;

[a, b] = [b, a]
```
<br/><br/>


# Generators
```js
function* numberGenerator() {
    yield 1;
    yield 2;
    return 3;
}

let generator = numberGenerator();

let one = generator.next();
let two = generator.next();
let last = generator.next();

console.log(one);    // { value: 1, done: false }
console.log(two);    // { value: 2, done: false }
console.log(last);   // { value: 3, done: true }
```
<br/><br/>



# ERRORS: when there's asynchronicity in a try-catch block
```js
try {
  setTimeout(() => {
    console.bla()
  }, 100)
} catch (e) {
  //...
}
```

_The try-catch block watches for an error in the block within only in the instant that it's executed. As soon as that code is executed, we exit the try-catch block and everything continues as usual. So when the ***asynchronously*** executed function runs, we are already outside of the try-catch block, which leads to an **Uncaught Error**._
<br/><br/>


## Catching uncaught errors (look also in the Promises section):
```js
// e.g. missed ASYNC errors
window.addEventListener('error', (event) => {
  event.preventDefault() // so the browser doesn't print the error
  console.log('[ERROR]', event.error.message)
})
```
<br/><br/>


# Promises
_JavaScript is a **single-threaded** language supporting synchronous and asynchronous operations. And promises are just a more elegant way to deal with these asynchronous tasks than callbacks. And a very handy way to avoid callback hell._

_A promise is an object representing the result of asynchronous tasks which are tasks that don’t block the execution until it is finished. This approach is great for time consuming tasks._
_The promise class constructor takes one argument which is a function with two arguments that will be passed to us _  

```js
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("resolved!"), 1000);
});

// resolve runs the first function in .then
promise.then(
  result => alert(result), // shows "done!" after 1 second
  error => alert(error) // doesn't run
);
```
<br/>

## Catching async errors (2):

[exercise\react\typescript\jbook\packages\local-api\src\index.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Clocal-api%5Csrc%5Cindex.ts)
```js
return new Promise<void>((resolve, reject) => {
  app.listen(port, resolve).on('error', reject)
})
```
And then in [exercise\react\typescript\jbook\packages\cli\src\commands\serve.ts](..%5Creact%5Ctypescript%5Cjbook%5Cpackages%5Ccli%5Csrc%5Ccommands%5Cserve.ts)
```js
//...
.action(async (filename = 'notebook.js', options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename)) // joins current path and relative path of the file (from current)
      await serve(parseInt(options.port), path.basename(filename), dir) // returns a custom Promise so we could catch any async error
    } catch (error) {
      console.log(`Here's the problem: ${error}`)
    }
  })
```
<br/><br/>


# Optional chaining
```js
a?.b // if a ...
```
<br/><br/>


# Nullish coalescing (??)
```js
// ?? - if it's null/undefined
// || - if it's falsy
const userInput = ''
console.log(userInput ?? 'DEFAULT') // ''
console.log(userInput || 'DEFAULT') // 'DEFAULT'
```
<br/><br/>


# Exponential operator (ES7)
```js
let a = 2 ** 3
let b = 3 ** 3
console.log(a === Math.pow(2, 3)) // true
console.log(b === Math.pow(3, 3)) // true
```
<br/><br/>



# IFRAMES

**Direct access between frames is allowed when:**  
 * the iframe element does not have a `sandbox` property or has a `'sandbox="allow-same-origin"` property  

**AND**

 * we fetch the _parent html doc_ and the _frame html doc_ from the **exact same**:
   * domain
   * port
   * protocol  
<br/>

`srcDoc` attribute - specifies the HTML content of the page to show in the inline frame. _Caution: its length could be limited/not allowed in some browsers._

```
<iframe src="data:...untrusted content" sandbox /> <- Secure in modern browsers, insecure in legacy browsers with no sandbox support

<iframe srcDoc="...untrusted content" sandbox /> <- Secure in modern browsers, secure (though non-functional) in legacy browsers
```

`window.postMessage(message, domainsToReceiveIt)` - safely enables **cross-origin communication** between Window objects; e.g., between a page and a pop-up that it spawned, or between a page and an iframe embedded within it.

```
// in the parent:
window.addEventListener('message', event => console.log(event), false)

// in the child iframe:
parent.postMessage('hello!', '*')

// log from the parent's listener:
MessageEvent {
  ...
  data: 'hello!'
}
```
<br/><br/>


# DOM

`container.current.contains(event.target)` - check if an element is inside another element
<br/><br/>


# USEFUL

## Debounce by useEffect
```
  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input)
      setCode(output)
    }, 1000)

    // the cleanup fn will be called the next time the useEffect is called and will clear the previous timer
    return () => {
      clearTimeout(timer)
    }
  }, [input])
```
<br/><br/>


## Random ID generation
```
const randomId = () => Math.random().toString(36).substring(2, 7)
```

<br/>

## Convert to number
`+var`

<br/>

## Property descriptors
> they allow to define an object property in more detail.  

<br/>

> `Object.defineProperty(obj1, prop, descriptor): obj1` - This method allows a precise **addition to or modification of a property** on an object. Normal property addition through assignment creates properties which show up during property enumeration (`for...in` loop or `Object.keys` method), whose values may be changed, and which may be deleted. This method allows these extra details to be changed from their defaults. By default, values added using `Object.defineProperty()` are immutable and not enumerable.



```js
const object1 = {};

Object.defineProperty(object1, 'property1', {
  value: 42,
  writable: false
});

object1.property1 = 77;
// throws an error in strict mode

console.log(object1.property1);
// expected output: 42
```
<br/>

Property descriptors present in objects come in two main flavors: **data descriptors** and **accessor descriptors**. A data descriptor is a property that has a value, which may or may not be writable. An accessor descriptor is a property described by a getter-setter pair of functions.  
<br/>

Both data and accessor descriptors are objects. They share the following **optional keys**:
- `configurable` [false]
  - the **type** of this property cannot be changed between data property and accessor property
  - the property may not be **deleted**
  - other **attributes of its descriptor** cannot be changed (however, if it's a data descriptor with `writable: true`, the value can be changed, and `writable` can be changed to `false`).
- `enumerable` [false] - should this property shows up during enumeration of the properties on the corresponding object
- `value` [undefined] - the value of the property
- `writable` - should the value associated with the property may be changed with an assignment operator  

**Accessor** descriptor **additional** keys:
- `get`
- `set`

```js
const o = {}; 
const bValue = 38;

Object.defineProperty(o, 'b', {
  get() { return bValue; },
  set(newValue) { bValue = newValue; },
  enumerable: true,
  configurable: true
});

o.b; // 38
o.b = 22 // Uncaught TypeError: Assignment to constant variable.
```
> A **method** is a property with a function as a value.
```js
{ get: function()  <=> get() {} }
```
<br/><br/>

## Bind
```js
class Printer {
  message = 'This works!'

  showMessage() {
    console.log(this.message)
  }
}

const printer = new Printer()
const button = document.querySelector('button')!
// button.addEventListener('click', printer.showMessage) // logs 'undefined', because this -> button
button.addEventListener('click', printer.showMessage.bind(printer)) // now this -> printer
```