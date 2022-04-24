# CLOSURE
_allows an inner function to to have access to the outer function's variables and use them as "private" ones_
```
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
_let, const -> scoped in the current context (block-scoped variables), unlike var_
<br/><br/>


# ARROW FUNCTIONS
_anonymous function assigned to a variable_

They don't have their own context (`this` points to the upper enclosing context).  
A function becomes a part of the global window context, so with an arrow function `this` points to it.

Arrow functions handle `this` in a different way from regular functions:
* Arrow function - `this` represents the object that **defined** the arrow function.  
* In regular functions this keyword represented the object that **called** the function (the executer), which could be the window, the document, or whatever.

In short , in arrow function this represents the **definition** context while in regular function this represents the **execution** context.

```
const obj = {
  props: ['prop1', 'prop2'], 
  
  printProps: function() {
    console.log(this) // this -> obj (since the function is part of the object)
    
    setTimeout(function() { 
      console.log(this) // this -> window
    }, 2000)

    setTimeout(() => console.log(this), 2000) // this -> obj
  }
}
```
<br/><br/>


# DESTRUCTURING
`const [, secondElement] = [1, 2, 3] // 2` 

Can be also used with a **default** value:
`const { name, age = 55 } = user`
<br/><br/>


# RESTRUCTURING
```
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
```
function Holiday(destination, days) {
  this.destination = destination
  this.days = days
}

Holiday.prototype.info = function() { console.log(this.destination + ' | ' + this.days) }

const nepal = Holiday('Nepal', 30)
nepal.info() // 'Nepal | 30'
```


## Class:
```
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

Modifiers (keywords):
  * **private** - can only be called by *other methods* in *this* class
  * **protected** - can be called by other methods in *this* class, or by other methods in *child* classes
  * **public** *(default)* - can be called _anywhere_
<br/><br/>


# Default parameters
A good practice is to keep all default parameters to the **right**:
```
function add(a = 4, b) { // bad
function add(a, b = 4) { // good
```
<br/><br/>


# Swapping values
```
let a = 5;
let b = 10;

[a, b] = [b, a]
```
<br/><br/>


# Generators
```
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


# Promises
_JavaScript is a **single-threaded** language supporting synchronous and asynchronous operations. And promises are just a more elegant way to deal with these asynchronous tasks than callbacks. And a very handy way to avoid callback hell._

_A promise is an object representing the result of asynchronous tasks which are tasks that don’t block the execution until it is finished. This approach is great for time consuming tasks._  

```
let promise = new Promise(function(resolve, reject) {
  setTimeout(() => resolve("resolved!"), 1000);
});

// resolve runs the first function in .then
promise.then(
  result => alert(result), // shows "done!" after 1 second
  error => alert(error) // doesn't run
);
```
<br/><br/>


# Exponential operator (ES7)
```
let a = 2 ** 3
let b = 3 ** 3
console.log(a === Math.pow(2, 3)) // true
console.log(b === Math.pow(3, 3)) // true
```
<br/><br/>


# Asynchronicity in a try-catch block
```
try {
  setTimeout(() => {
    console.bla()
  }, 100)
} catch (e) {
  ...
}
```

_The try-catch block watches for an error in the block within only in the instant that it's executed. As soon as that code is executed, we exit the try-catch block and everything continues as usual. So when the ***asynchronously*** executed function runs, we are already outside of the try-catch block, which leads to an **Uncaught Error**_
<br/><br/>


# IFRAMES

**Direct access between frames is allowed when:**  
 * the iframe element does not have a `sandbox` property or has a `'sandbox="allow-same-origin"` property  

**AND**

 * we fetch the _parent html doc_ and the _frame html doc_ from the **exact same**:
   * domain
   * port
   * protocol  

