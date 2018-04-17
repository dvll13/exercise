/*
console.log('a < b:', 'a' < 'b') //true
console.log('a < B:', 'a' < 'B') //false

console.log(null == undefined); // → true
console.log(null == 0); // → false
//That last piece of behavior is often useful. When you want to test whether a value has a real value instead of null or undefined, you can simply compare it to null with the == (or !=) operator.

console.log(Number('5')) //5
console.log(String(5)) //'5'


let a = 1;
{
  let b = 2;
  console.log(a, b) // 1 2
}
console.log(typeof b) // "undefined"



//closure - being able to reference a specific instance of local variables in an enclosing function
function wrapValue(n)
{
    var localVar = n;
    return function() {
        return localVar;
    }
}

var wrap1 = wrapValue(1),
    wrap2 = wrapValue(2);
console.log(wrap1()); // 1
console.log(wrap2()); // 2

var multiplier = function(factor)
{
    return function(number) {return factor * number}
}
var twice = multiplier(2);
console.log(twice(5)); // 10



//recursion - slower than a normal loop
function power(base, exponent)
{
    if (exponent == 0)
    {
        return 1
    }
    else
    {
        return base * power(base, exponent - 1)
    }
}
console.log(power(2, 3)) // 8

function findPath(target, multiplier = 2, adder = 1)
{
    function walk(start, history)
    {
        if (start == target)
        {
            return history;
        }
        else if (start > target)
        {
            return null;
        }
        else
        {
            return walk(start * multiplier, history + ' * ' + multiplier) || walk(start + adder, history + ' + ' + adder);
        }
    }
    
    console.log(walk(1, '1'));
}
findPath(10); //: "1 * 2 * 2 * 2 + 1 + 1"



function farmPrint(cows, chickens, pigs)
{
	function zeroPad(number, desiredLength)
	{
		let str = String(number);
		while (str.length < desiredLength)
		{
			str = 0 + str;
		}
		return str;
	}

	console.log(zeroPad(cows, 3) + ' cows')
	console.log(zeroPad(chickens, 3) + ' chickens')
	console.log(zeroPad(pigs, 3) + ' pigs')
}

farmPrint(5, 35, 130) //: 005 cows; 035 chickens; 130 pigs



function range(start, end, step = 1)
{
	let myArray = [];
	if (start > end) step = -Math.abs(step);
	for (var i = start; (i >= Math.min(start, end)) && (i <= Math.max(start, end)); i += step) // !!! step and condition
	{
		myArray.push(i);
	}
	return myArray;
}

function sum(myArray) 
{
	let sum = 0;
	for (let i = 0; i < myArray.length; i++)
	{
		sum += myArray[i];
	}
	return sum;
}

console.log(range(1, 10)); // → [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(sum(range(1, 10))); // → 55
console.log(range(2, 12, 2));
console.log(range(5, 2, -1)); // → [5, 4, 3, 2]


function reverseArray(oldArray)
{
	let newArray = [];
	for (let i = oldArray.length - 1; i >= 0; i--)
	{
		newArray.push(oldArray[i]);
	}
	return newArray;
}

function reverseArrayInPlace(oldArray)
{
	let half = Math.floor(oldArray.length) / 2;
	for (let i = 0; i < half; i++)
	{
		let tempItem = oldArray[i],
			rightIndex = oldArray.length - 1 - i;
		oldArray[i] = oldArray[rightIndex];
		oldArray[rightIndex] = tempItem;
	}
}

// console.log(reverseArray(["A", "B", "C"]));
var arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue); // → [5, 4, 3, 2, 1]


function arrayToList(myArray)
{
	let newEl = {};
	for (let i = myArray.length - 1; i >= 0; i--)
	{
		let currentValue = myArray[i],
			oldEl;

		if (i == myArray.length - 1)
		{
			newEl.value = currentValue;
			newEl.rest = null;
		}
		else
		{
			oldEl = newEl;
			newEl = {
				value: currentValue,
				rest: oldEl
			}
		}
	}
	
	return newEl;
}
// console.log(arrayToList([10, 20])); // → {value: 10, rest: {value: 20, rest: null}}

function listToArray(list)
{
	let valuesArray = [];
    
    // 1. recursion:
	
    // 	setValues = function(list) {
	// 		valuesArray.push(list.value);
	// 		if (list.rest) {
	// 			setValues(list.rest);
	// 		}
	// 	};
	// setValues(list);
    
    // or 2. walk a list with for loop:
    for (let node = list; node; node = node.rest) {

        valuesArray.push(node.value);
    }

	return valuesArray;
}
// console.log(listToArray(arrayToList([10, 20, 30]))); // → [10, 20, 30]

function prepend(el, list)
{
	return { value: el, rest: list }
}
// console.log(prepend(10, prepend(20, null))); // → {value: 10, rest: {value: 20, rest: null}}

function nth(list, number)
{
    if (!list)
    {
        return undefined;
    }
    else if (number === 0)
    {
        return list.value;
    }
    else
    {
        return nth(list.rest, number - 1)
    }
}
console.log(nth(arrayToList([10, 20, 30]), 1)); // → 20


function deepEqual(a, b)
{
    if (a === b) 
        return true;

    if (a === null || b === null || typeof a !== 'object' || typeof b !== 'object')
        return false;

    let countA = countB = 0;
    for (let prop in a)
    {
        countA++;
    }
    for (let prop in b)
    {
        countB++;
        if (!(prop in a) || !deepEqual(a[prop], b[prop]))
        {
            return false;
        }
    }

    return countA === countB;
}
var obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj), 'true'); // → true
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}), 'true'); // → true
console.log(deepEqual(obj, {here: {is: "an"}, object: 3}), 'false'); // → false
console.log(deepEqual(obj, {here: {is: "ana"}, object: 2}), 'false'); // → false
console.log(deepEqual(obj, {here: {is: "ana"}, object: 3}), 'false'); // → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2, test: 1}), 'false'); // → false
console.log(deepEqual(obj, {here: 1, object: 2}), 'false'); // → false

var string = JSON.stringify({name: "X", born: 1980});
console.log(string); // → {"name":"X","born":1980}
console.log(JSON.parse(string).born); // → 1980
*/


var ANCESTRY_FILE = "[\n  " + [
  '{"name": "Carolus Haverbeke", "sex": "m", "born": 1832, "died": 1905, "father": "Carel Haverbeke", "mother": "Maria van Brussel"}',
  '{"name": "Emma de Milliano", "sex": "f", "born": 1876, "died": 1956, "father": "Petrus de Milliano", "mother": "Sophia van Damme"}',
  '{"name": "Maria de Rycke", "sex": "f", "born": 1683, "died": 1724, "father": "Frederik de Rycke", "mother": "Laurentia van Vlaenderen"}',
  '{"name": "Jan van Brussel", "sex": "m", "born": 1714, "died": 1748, "father": "Jacobus van Brussel", "mother": "Joanna van Rooten"}',
  '{"name": "Philibert Haverbeke", "sex": "m", "born": 1907, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"}',
  '{"name": "Jan Frans van Brussel", "sex": "m", "born": 1761, "died": 1833, "father": "Jacobus Bernardus van Brussel", "mother":null}',
  '{"name": "Pauwels van Haverbeke", "sex": "m", "born": 1535, "died": 1582, "father": "N. van Haverbeke", "mother":null}',
  '{"name": "Clara Aernoudts", "sex": "f", "born": 1918, "died": 2012, "father": "Henry Aernoudts", "mother": "Sidonie Coene"}',
  '{"name": "Emile Haverbeke", "sex": "m", "born": 1877, "died": 1968, "father": "Carolus Haverbeke", "mother": "Maria Sturm"}',
  '{"name": "Lieven de Causmaecker", "sex": "m", "born": 1696, "died": 1724, "father": "Carel de Causmaecker", "mother": "Joanna Claes"}',
  '{"name": "Pieter Haverbeke", "sex": "m", "born": 1602, "died": 1642, "father": "Lieven van Haverbeke", "mother":null}',
  '{"name": "Livina Haverbeke", "sex": "f", "born": 1692, "died": 1743, "father": "Daniel Haverbeke", "mother": "Joanna de Pape"}',
  '{"name": "Pieter Bernard Haverbeke", "sex": "m", "born": 1695, "died": 1762, "father": "Willem Haverbeke", "mother": "Petronella Wauters"}',
  '{"name": "Lieven van Haverbeke", "sex": "m", "born": 1570, "died": 1636, "father": "Pauwels van Haverbeke", "mother": "Lievijne Jans"}',
  '{"name": "Joanna de Causmaecker", "sex": "f", "born": 1762, "died": 1807, "father": "Bernardus de Causmaecker", "mother":null}',
  '{"name": "Willem Haverbeke", "sex": "m", "born": 1668, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
  '{"name": "Pieter Antone Haverbeke", "sex": "m", "born": 1753, "died": 1798, "father": "Jan Francies Haverbeke", "mother": "Petronella de Decker"}',
  '{"name": "Maria van Brussel", "sex": "f", "born": 1801, "died": 1834, "father": "Jan Frans van Brussel", "mother": "Joanna de Causmaecker"}',
  '{"name": "Angela Haverbeke", "sex": "f", "born": 1728, "died": 1734, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"}',
  '{"name": "Elisabeth Haverbeke", "sex": "f", "born": 1711, "died": 1754, "father": "Jan Haverbeke", "mother": "Maria de Rycke"}',
  '{"name": "Lievijne Jans", "sex": "f", "born": 1542, "died": 1582, "father":null, "mother":null}',
  '{"name": "Bernardus de Causmaecker", "sex": "m", "born": 1721, "died": 1789, "father": "Lieven de Causmaecker", "mother": "Livina Haverbeke"}',
  '{"name": "Jacoba Lammens", "sex": "f", "born": 1699, "died": 1740, "father": "Lieven Lammens", "mother": "Livina de Vrieze"}',
  '{"name": "Pieter de Decker", "sex": "m", "born": 1705, "died": 1780, "father": "Joos de Decker", "mother": "Petronella van de Steene"}',
  '{"name": "Joanna de Pape", "sex": "f", "born": 1654, "died": 1723, "father": "Vincent de Pape", "mother": "Petronella Wauters"}',
  '{"name": "Daniel Haverbeke", "sex": "m", "born": 1652, "died": 1723, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
  '{"name": "Lieven Haverbeke", "sex": "m", "born": 1631, "died": 1676, "father": "Pieter Haverbeke", "mother": "Anna van Hecke"}',
  '{"name": "Martina de Pape", "sex": "f", "born": 1666, "died": 1727, "father": "Vincent de Pape", "mother": "Petronella Wauters"}',
  '{"name": "Jan Francies Haverbeke", "sex": "m", "born": 1725, "died": 1779, "father": "Pieter Bernard Haverbeke", "mother": "Livina de Vrieze"}',
  '{"name": "Maria Haverbeke", "sex": "m", "born": 1905, "died": 1997, "father": "Emile Haverbeke", "mother": "Emma de Milliano"}',
  '{"name": "Petronella de Decker", "sex": "f", "born": 1731, "died": 1781, "father": "Pieter de Decker", "mother": "Livina Haverbeke"}',
  '{"name": "Livina Sierens", "sex": "f", "born": 1761, "died": 1826, "father": "Jan Sierens", "mother": "Maria van Waes"}',
  '{"name": "Laurentia Haverbeke", "sex": "f", "born": 1710, "died": 1786, "father": "Jan Haverbeke", "mother": "Maria de Rycke"}',
  '{"name": "Carel Haverbeke", "sex": "m", "born": 1796, "died": 1837, "father": "Pieter Antone Haverbeke", "mother": "Livina Sierens"}',
  '{"name": "Elisabeth Hercke", "sex": "f", "born": 1632, "died": 1674, "father": "Willem Hercke", "mother": "Margriet de Brabander"}',
  '{"name": "Jan Haverbeke", "sex": "m", "born": 1671, "died": 1731, "father": "Lieven Haverbeke", "mother": "Elisabeth Hercke"}',
  '{"name": "Anna van Hecke", "sex": "f", "born": 1607, "died": 1670, "father": "Paschasius van Hecke", "mother": "Martijntken Beelaert"}',
  '{"name": "Maria Sturm", "sex": "f", "born": 1835, "died": 1917, "father": "Charles Sturm", "mother": "Seraphina Spelier"}',
  '{"name": "Jacobus Bernardus van Brussel", "sex": "m", "born": 1736, "died": 1809, "father": "Jan van Brussel", "mother": "Elisabeth Haverbeke"}'
].join(",\n  ") + "\n]";
var ancestry = JSON.parse(ANCESTRY_FILE);
/*
//array filter value(s):
console.log(ancestry.filter(function(person) {
  return person.father == "Carel Haverbeke";
}));
*/
/*
function consoleIt(el)
{
  console.log(el);
}
function forEach(array, action)
{
  for (let i = 0; i < array.length; i++)
  {
    action(array[i]);
  }
}
forEach(ancestry, consoleIt);

//standard array method:
ancestry.forEach(function(item) {
  console.log(item)
})


function greaterThan(n) {
  return function(m) { return m > n; };
}
var greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

function higherOrder(func)
{
  return function(arg)
  {
    var val = func(arg);
    return val;
  }
}
console.log(higherOrder(Boolean)(1)) //: true

function unless(test, then)
{
  if (!test) {then()}
}
function repeat(times, body)
{
  for (var i = 0; i < times; i++)
  {
    body(i);
  }
}

repeat(3, function(index) {console.log('wazaaa No' + (index + 1) + '!')})
repeat(5, function(n) {
    unless(n % 2, function() {
      console.log(n + ' is even')
    })
  }
) //: 0 is even; 2 is even; ...


function noisy(f) {
  return function(arg, arg2) {
    var val = f(arg, arg2);
    console.log("called with", arg, "- got", val);
    return val;
  };
}
function noisy2(f) {
  return function() {
    return f.apply(null, arguments);
  }
}
function test()
{
  console.log('test:', arguments);
  return false
}

noisy(test)(2, 3, 4)
//> test: {0: 2, 1: 3}
//> called with 2 - got false
noisy2(test)(2, 3, 4)
//> test: {0: 2, 1: 3, 2: 4}



var string = JSON.stringify({name: "X", born: 1980});
console.log(string); // → {"name":"X","born":1980}
console.log(JSON.parse(string).born); // → 1980

var over90 = ancestry.filter(function(person) {
  return person.died - person.born > 90;
});

function map(array, transform)
{
  var mapped = [];
  array.forEach(function(person) {
    mapped.push(transform(person));
  })
  return mapped;
}


console.log(map(over90, function(person) {
  return person.name;
}));
console.log(over90.map(function(person) {return person.name}))

console.log(ancestry.reduce(function(min, cur) {
  if (min.born < cur.born) return min
    else return cur;
}))
//> returns the el with min born value


function average(array) {
  function sum() {return array.reduce(function(a, b) {return a + b})};
  return sum() / array.length;
}

function age(person)
{
  return person.died - person.born;
}
function male(person)
{
  return person.sex == 'm';
}
function female(person)
{
  return person.sex == 'f';
}

console.log(average(ancestry.filter(male).map(age)));
console.log(average(ancestry.filter(female).map(age)));
*/