var f = ['a', 'b', 'c'];

f.forEach(function(item, index, array)
{
  console.log(item, index, array);
});

for(let value of f) //also for string, map, ...
{
    console.log(value)
}


var associative_array = new Boolean();
associative_array["one"] = "Lorem";
associative_array["two"] = "Ipsum";
associative_array["three"] = "dolor";
for (var i in associative_array) { console.log(i) };
// one
// two
// three
// undefined

var a = new Object();
a.one = 'aaa';
a.two = 'bbb';
a.three = 'ccc';
for (var i in a) { //should not be used to iterate over an Array where the index order is important.
  console.log(i, a[i])
}


var menuConfig = {a: 1, b: 2, c: 3}

function createMenu(config)
{
	config = Object.assign(
		{a: 11, b: 22, c: 33, d: 44, e: 55}, //defaults:
		config //new
	);
	console.log(config);
}
createMenu(menuConfig);

// -> Object {a: 1, b: 2, c: 3, d: 44, e: 55}



// global vars are stored in the window global object:
var myVar = 10;
console.log("myVar" in window); // → true
console.log(window.myVar); // → 10


if (prop in obj) {}
for (let prop in obj) {}
// The in operator can be used to find out whether an object contains a property with a given name. The same keyword can also be used in a for loop (for (var name in object)) to loop over an object’s properties.