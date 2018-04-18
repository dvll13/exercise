/* http://javascriptissexy.com/javascript-objects-in-detail */


var obj1 = {
    30: 'number property test',
    'space test': 'test2'
}

console.log(['30']);
console.log(['space test']);


// One of the main differences between reference data type and primitive data types is reference data type’s value is stored as a reference, it is not stored directly on the variable, as a value, as the primitive data types are



// Creating Objects

// 1. Object Literals
// This is an empty object initialized using the object literal notation
var myBooks = {};
// This is an object with 2 items, again using object literal
var mango = {
    color: "yellow",
    shape: "round"
}

// 2. Object Constructor
var mango =  new Object ();
mango.color = "yellow";
mango.shape= "round";
// 1. Constructor Pattern for Creating Objects so don't repeat the same code for multiple objects
function Fruit(theColor, theSweetness)
{
    this.color = theColor;
    this.sweetness = theSweetness;
    this.prototype.protProp = 'defaultValue';
}
var mangoFruit = new Fruit ("Yellow", 8);
mangoFruit.sweetness = 7;
mangoFruit.newProp = 'newValue';

// 2. Prototype Pattern for Creating Objects
function Fruit() {}
Fruit.prototype.color = 'Red';
Fruit.prototype.sweetness = 6;
Fruit.prototype.showColor = function() { console.log(this.color); };

var mangoFruit = new Fruit();



// Objects have INHERITED properties and OWN properties. The own properties are properties that were defined on the object, while the inherited properties were inherited from the object’s Prototype object.

function addInheritedProp() { this.inheritetProp = 'test'; }

var school = new addInheritedProp();
school.schoolName = 'MIT';
school.schoolLocation = 'Massachusetts';

console.log( "schoolName" in school );  // true​
console.log( "toString" in school );  // true
console.log( school.hasOwnProperty('schoolName') );  // true
console.log( school.hasOwnProperty('toString') );  // false 
console.log( school.hasOwnProperty('inheritedProp') );  // false

// Enumerating - for/in loop or a general for loop

for (var eachItem in school)
{
    console.log(`${eachItem}: ${school[eachItem]}`);
    //inheritetProp: test
    //schoolName: MIT
    //schoolLocation: Massachusetts
}


// To DELETE a property from an object, you use the delete operator. You cannot delete properties that were inherited, nor can you delete properties with their attributes set to configurable. You must delete the inherited properties on the prototype object (where the properties were defined). Also, you cannot delete properties of the global object, which were declared with the var keyword. The delete operator returns true if the delete was successful. And surprisingly, it also returns true if the property to delete was nonexistent or the property could not be deleted (such as non-configurable or not owned by the object).

var christmasList = {mike:"Book", jason:"sweater" };
delete christmasList.mike; // deletes the mike property

// Here we call the toString method and it works just fine—wasn’t deleted
christmasList.toString(); //"[object Object]"

// You can delete a property of an instance if the property is an own property of that instance. For example, we can delete the educationLevel property from the school's object we created above because the educationLevel property is defined on the instance: we used the "this" keyword to define the property when we declare the HigherLearning function. We did not define the educationLevel property on the HigherLearning function's prototype.​
delete school.inheritedProp;  // false
delete school.schoolName;  // true

// Serialize and Deserialize Objects
var christmasList = { mike:"Book", jason:"sweater", chelsea:"iPad" };
JSON.stringify(christmasList); // "{"mike":"Book","jason":"sweater","chels":"iPad"}"  
JSON.parse(christmasListStr);  // { mike:"Book", ... }