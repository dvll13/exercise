/* http://javascriptissexy.com/understand-javascripts-this-with-clarity-and-master-it */

//All functions in JavaScript have properties, just as objects have properties. And when a function executes, it gets the this property - a variable with the value of the object that invokes the function where this is used.

//If you understand this one principle of JavaScript’s this, you will understand the “this” keyword with clarity: this is not assigned a value until an object invokes the function where this is defined.

//In the global scope, when the code is executing in the browser, all global variables and functions are defined on the window object.

var obj1 = {
	prop1: 'o1p1',
	showProp1: function()
	{
		console.log(this.prop1);
	}
};

//We can use the APPLY method to set the "this" value explicitly, the apply value becomes the context
/*
var obj2 = { prop1: 'o2p1' }

obj1.showProp1.apply(obj2); //: 'o2p1'

//Fix this when used in a method passed as a CALLBACK
button.onclick = obj1.showProp1.bind(obj1); //: o1p1

//Fix this inside CLOSURE: assign this to a var (e.g. me) before referencing it in the inner function

// Fix this when method is assigned to a VARIABLE:
var data = { name: '1' };
var user = {
  data: { name: '2' },
  showData: function() { console.log('data:', this.data.name) }
}
var showUserData = user.showData;
var showUserDataFixed = user.showData.bind(user);

console.clear(); 
user.showData(); //2
showUserData(); //1
showUserDataFixed(); //2


// Fix this when BORROWING METHODS
*/
//TODO
var obj1 = {
        name: 'obj1',
        number: 1,
        double: null
    },
    obj2 = {
        name: 'obj2',
        number: 2,
        double: null,
        setDouble: function() {
            this.double = this.number * 2;
        }
    };

console.clear();

//obj1.double = obj2.setDouble();
obj2.setDouble.apply(obj1, obj1.number);

console.log(obj1, obj2)