var f = ['a', 'b', 'c']

f.forEach(function(item, index, array) {
    console.log(item, index, array)
})

for (let value of f) {
    //also for string, map, ...
    console.log(value)
}

var associative_array = new Boolean()
associative_array['one'] = 'Lorem'
associative_array['two'] = 'Ipsum'
associative_array['three'] = 'dolor'
for (var i in associative_array) {
    console.log(i)
}
// one
// two
// three
// undefined

// hacky
{
    let arr = [1, 2, 3]
    arr.length = 2 // [1, 2]
    arr.length = 4 // [1, 2, undefined, undefined]
}

{
    // more useful methods
    let a = []

    a.filter((age) => age > 18)
    // Creates a new array based on whether the items of an array pass a certain condition.

    a.map((number) => '$' + number)
    // Creates a new array by manipulating the values in another array. Great for data manipulation and it is often used in React because it is an immutable method

    a.reduce((accumulator, currentValue) => accumulator + currentValue)
    // This often overlooked method uses an accumulator to reduce all items in an array to a single value. Great for calculating totals. The returned value can be of any type (i.e. object, array, string, integer)

    a.forEach((emotion) => console.log(emotion))
    // Applies a function on each item in an array

    a.some((element) => element === 'admin')
    // Checks if any item in an array passes the condition. A good use case would be checking for user privileges. It can also be used similarly to a .forEach() where you would perform an action on each array item and break out of the loop once a truthy value is returned

    a.every((rating) => rating >= 3)
    // Similar to .some(), but checks if all items in an array pass a condition

    a.includes('waldo')
    // Checks if an array contains a certain value. It’s similar to .some(), but instead of looking for a condition to pass, it looks if the array contains a specific value
}

{
    // ARRAY SPREAD
    //Spreading arrays using the spread operator (…) allows you to expand the elements in an array. It’s useful when concatenating a bunch of arrays together. It’s also a good way to avoid using the splice() method when looking to remove certain elements from an array because it can be combined with the slice() method to prevent direct mutation of an array.

    // example: combine two arrays
    const spreadableOne = [1, 2, 3, 4]
    const spreadableTwo = [5, 6, 7, 8]

    const combined = [...spreadableOne, ...spreadableTwo]
    // combined will be equal to [1, 2, 3, 4, 5, 6, 7, 8]

    // example: remove an array element without mutating the original array
    const animals = ['squirrel', 'bear', 'deer', 'salmon', 'rat']
    const mammals = [...animals.slice(0, 3), ...animals.slice(4)]
    // mammals will be equal to ['squirrel', 'bear', 'deer', 'rat']
}

var a = new Object()
a.one = 'aaa'
a.two = 'bbb'
a.three = 'ccc'
for (var i in a) {
    //should not be used to iterate over an Array where the index order is important.
    console.log(i, a[i])
}

var menuConfig = {a: 1, b: 2, c: 3}

function createMenu(config) {
    config = Object.assign(
        {a: 11, b: 22, c: 33, d: 44, e: 55}, //defaults:
        config //new
    )
    console.log(config)
}
createMenu(menuConfig)

// -> Object {a: 1, b: 2, c: 3, d: 44, e: 55}

// global vars are stored in the window global object:
var myVar = 10
console.log('myVar' in window) // → true
console.log(window.myVar) // → 10

if (prop in obj) {
}
for (let prop in obj) {
}
// The in operator can be used to find out whether an object contains a property with a given name. The same keyword can also be used in a for loop (for (var name in object)) to loop over an object’s properties.

{
    // useful methods
    let o = {},
        o2 = {}

    o.values()
    // Return an array of the values of an object

    o.keys()
    // Return an array of the keys of an object

    o.entries()
    // Creates an array which contains arrays of key/value pairs of an object

    Object.freeze(o)
    // Prevents you from modifying existing object properties or adding new properties and values to an object. It’s often what people think const does, however const allows you to modify an object.

    Object.seal(o)
    // Stops any new properties from being added to an object, but still allows for existing properties to be changed.

    Object.assign(o, o2)
    // Allows for objects to be combined together. This method is no longer needed because you can use the object spread syntax instead. Like the object spread operator, Object.assign() does not do deep cloning. Lodash is your best friend when it comes to deep cloning objects.
}

{
    // OBJECT SPREAD
    // Spreading an object allows for the addition of new properties and values to an object without mutations (i.e. a new object is created) and it can also be used to combine multiple objects together. It should be noted that spreading objects does not do nested copying

    // Example: Add a new object property and value without mutating the original object
    const spreadableObject = {
        name: 'Robert',
        phone: 'iPhone'
    }

    const newObject = {
        ...spreadableObject,
        carModel: 'Volkswagen'
    }
    // newObject will be equal to
    // { carModel: 'Volkswagen', name: 'Robert', phone: 'iPhone' }
}

{
    // FUNCTION REST
    // Functions can use the rest parameter syntax to accept any number of arguments as an array.

    // Example: Display the array of passed arguments
    function displayArgumentsArray(...theArguments) {
        console.log(theArguments)
    }

    displayArgumentsArray('hi', 'there', 'bud')
    // Will print ['hi', 'there', 'bud']
}

{
    //OBJECT PROPERTIES ORDER:
    const obj = {
        '2': 'integer: 2',
        foo: 'string: foo',
        '01': 'string: 01',
        1: 'integer: 1',
        [Symbol('first')]: 'symbol: first'
    }

    obj['0'] = '0'
    obj[Symbol('last')] = 'symbol: last'
    obj['veryLast'] = 'string: very last'

    console.log(Reflect.ownKeys(obj))
    // [ "0", "1", "2", "foo", "01", "veryLast", Symbol(first), Symbol(last) ]
    // -> 1. integers in numeric order
    // -> 2. strings in chronological order
    // -> 3. Symbols in chronological order
}

{
    // Object prototype, super
    let person = {
        getGreeting() {
            return 'hello'
        }
    }
    let dog = {
        getGreeting() {
            return 'woof'
        }
    }

    // prototype
    Object.getPrototypeOf(person) === dog // false
    Object.setPrototypeOf(person, dog)
    Object.getPrototypeOf(person) === dog // true

    // super
    let friend = {
        getGreeting() {
            return super.getGreeting() + ', hi'
        }
    }

    Object.setPrototypeOf(friend, person)
    console.log(friend.getGreeting()) // hello, hi
}
