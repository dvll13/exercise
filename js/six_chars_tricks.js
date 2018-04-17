console.log( 'test'[2] )
// 's'
console.log( (2756 + '')[3] )
// "6"
console.log( (2756 + '')[2] )
// "5"
console.log( +(2756 + '') )
// 2756
console.log( (2756 + [])[2] )
// "5"
console.log( +(2756 + [])[2] )
// 5
console.log( ![] )
// false
console.log( ![]+[] )
// "false"
console.log( !![] )
// true
console.log( +!![] )
// 1
console.log( +![] )
//0
console.log( (![]+[]) )
// "false"
console.log( (![]+[])[+!![]] )
// "a"
console.log( [2,1]["sort"]() ) // ~ [2, 1].sort(). in js .something ~ ['something']
// [1, 2]

true["constructor"] + [] === "function Boolean() { [native code] }"  
0["constructor"] + []    === "function Number() { [native code] }"  
""["constructor"] + []   === "function String() { [native code] }"
[]["constructor"] + []   === "function Array() { [native code] }"

console.log( (20).toString() )
// '20'

console.log( 20.toString() )
//error

(12)["toString"](10) === "12" // base 10 - normal to us
(12)["toString"](2) === "1100" // base 2, or binary, for 12
(12)["toString"](8) === "14" // base 8 (octonary) for 12
(12)["toString"](16) === "c" // hex for 12