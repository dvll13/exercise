// all of the annotations below can be omitted (type inference will guess the correct type). this happens when the variable's declaration and initialization are on the same line

let apples: number = 5
let speed: string = 'fast'
let hasName: boolean = true

let nothingMuch: null = null
let nothing: undefined = undefined

// Built in objects
let now: Date = new Date()

// Array
let colors: string[] = ['white', 'black']
let myNumbers: number[] = [2, 3, 4]
let truths: boolean[] = [true, false, true]

// Classes
class Car {}
let car: Car = new Car()

// Object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20
}

// Function
const logNumber: (i: number) => void = (i: number) => {
  console.log(i)
}
