// you can use blocks like the ones below ( { ... } ) instead of immediately executed functions ( (function(){})() )

const log = (...params /*to array*/) => console.log(...params /*split again*/),
      info = (title) => console.info('### ', title, ' ###');

{
    info('OBJECT [KEY] SETTINGS SYNTAX');

    let key = 'varKey';
    let obj = {
        key1: 'one',
        [key]: 'two'
    };
    log(obj); // {key1: "one", varKey: "two"}
}

{
    info('ARROW FUNCTIONS');

    let calcTotal = total => total * 1.2;
    log(calcTotal(10)); // 12

    let ct2 = (total, sum) => total * 1.2 + sum; // ~ function (total, sum) { return total * 1.2 + sum; }
    log(ct2(100, 5)); // 123

    // const fn = (param1, param2) => { fn body }
}

{
    info('QUICK INITIALIZATION OF OBJECTS FROM VARS');
    let a = 1, b = 2, c = 3;
    let obj = {a, b, c}
    log(obj); // {a: 1, b: 2, c: 3}
}

{
    info('find/findIndex');

    let ages = [12, 19, 6, 4];

    let firstAdult = ages.find(age => age >= 18);
    let firstAdultIndex = ages.findIndex(age => age >= 18);
    log(firstAdult, firstAdultIndex); // 19, 1
}

{
    info('TEMPLATE LITERALS');

    // Basic interpolation
    let obj = { x: 1, y: 2 };
    log(`Your total sum
        is: ${obj.x + obj.y}`);
    /* Your total sum
               is: 3*/
}

{
    info('DEFAULT ARGUMENT VALUES');

    function greet(name = 'Anon')
    {
        log(`Hello ${name}!`);
    };
    greet(); // Hello Anon!
    greet('Mieeen'); // Hello Mieeen!


    // You can have a function too!
    function greet2(name = 'Anon', callback = () => {}) {
      log(`Yo ${name}!`);

      // No more "callback && callback()" (no conditional) -> if (callback) callback()
      callback('greet2 callback', 1);
    }

    // Only set a default for one parameter
    greet2(); // Yo Anon!
    greet2(undefined, log); // Yo Anon! greet2 callback 1
}

{
    info('METHOD PROPERTIES (NO NEED FOR "FUNCTION" KEYWORD IN DECLARATION)');

    let obj = {
        a: 5,
        sayHello(name) {
            log(`Hello, ${name}!`);
        }
    }
    log(obj);
    obj.sayHello('bro');
}

{
    info('startsWith, endsWith, and includes');

    "MooTools".startsWith("Moo"); // true;
    "MooTools".startsWith("moo"); // false;
    "MooTools".endsWith("Tools"); // true;
    "MooTools".includes("oo"); // true;
}

{
    info('Object.assign() (let merged = Object.assign({}, defaults, params))');
    let defaults = {
            a: 1,
            b: 2,
            c: 3
        },
        params = {
            b: 3,
            c: null,
            d: 5
        }
    let merged = Object.assign({}, defaults, params);
    log(merged); // {a: 1, b: 3, c: null, d: 5}
}

{
    info('GENERATORS');

    // function *foo() {
    //     yield 1;
    //     yield 2;
    //     yield 3;
    // }

    // just calling foo() won't work, instead an iterator should be constructed to a var:
    let iterator = foo();
    log(iterator.next()); // {value: 1, done: false}
    log(iterator.next()); // {value: 2, done: false}
    log(iterator.next()); // {value: 3, done: false}
    log(iterator.next()); // {value: undefined, done: true}


    function *foo() {
        yield 1;
        yield 2;
        yield 3;
        return 4;
    }

    for (var v of foo()) {
        log( v );
    }
    // 1 2 3

    log( v ); // still `3`, not `4` :(
}

{
    info('CLASSES');

    class Tool {
        constructor() {
            this.madeOf = 'iron';
        }
    }

    class Cart extends Tool {
        constructor(total) {
            super();
            this._total = total;
        }

        get total() { return this._total; }
        set total(v) { this._total = Number(v); }
        get totalWithTax() { return this._total * 1.2 }
    }

    let cart = new Cart(100);
    log(cart);
    // log(cart.madeOf);
    // log(cart.totalWithTax);
}

{
    info('ES7 CLASSES (requires Babel currently)');
/*
    class Human {
        gender = 'female';
    
        print = prop => console.log(this[prop]);
    
        printGender = () => {
            this.print('gender');
        }
    }
    
    class Person extends Human {
        name = 'Slim';
        gender = 'male';

        whatsMyName = () => {
            this.print('name');
        }
    }
    
      const person = new Person();
      person.whatsMyName();
      person.printGender();
      */
}

{
    info('THE SPREAD & REST OPERATORS (...)');

    // Spread: extracts the values from an array/object
    let a1 = [1, 2, 3];
    let a2 = [0, ...a1, 4];
    log(a2); // [0, 1, 2, 3, 4]

    let o1 = {a: 1, b: 2, c: 3};
    let o2 = {...o1, c: 33, d: 4};
    log(o2); // {a: 1, b: 2, c: 33, d: 4}

    // Rest: merge a list of fn arguments into an array
    const filter = (...args) => args.filter(el => el === 1);
    log('rest filter', filter(1, 2)); // [1]
}

{
    info('ARRAY AND OBJECT DESTRUCTURING (pulling values from)');
    
    const numbers = [1, 2, 3];
    [num1, num2] = numbers;
    [n1, , n3] = numbers;
    log(num1, num2); // 1 2
    log(n1, n3); // 1 3

    {
        info('so we can swap two vars without using a third one: [a, b] = [b, a]');
        let a = 1, b = 2;
        [a, b] = [b, a];
        log(a, b); // 2, 1
    }

    // not yet supported:
    // {name} = {name: 'Max', age: 28};
    // log(name); // Max
    // log(age); // undefined
}

{
    info('PRIMITIVE AND REFERENCE TYPES');
    log('primitive vars (numbers, strings, booleans) store values which get copied to other vars');
    log('reference vars (arrays/objects) store pointers to a place in memory which pointers get copied to other vars');
    log('to workaround that and get a real copy of a reference var, we use the spread operator');

    const person = {name: 'Yo1'};
    
    // const secondPerson = person;
    // person.name = 'Yo2';
    // log(secondPerson.name); // Yo2
    
    const secondPerson = {...person};
    person.name = 'Yo2';
    log(secondPerson.name); // Yo1
}

{
    log('# Array.from() method creates a new Array instance from an array-like or iterable object.');
    log('# Array.map() method creates a new array with the results of calling a provided function on every element in the calling array.');
    log('# for (let key of array/string/map) { array[key] }');
    log('# for (var prop in object) { object[prop] }');
    log('# if (prop in obj) {}');
    log(`
    cfg = Object.assign(
		{a: 11, b: 22, c: 33, d: 44, e: 55}, //defaults
		cfg //new
	)`);
}