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

// when to use annotations
//   1) function that returns the 'any' type -
const json = '{"x": 10, "y": 20}'
const coordinates: { x: number; y: number } = JSON.parse(json)
console.log({ coordinates })

//   2) when we declare a variable on one line and initialize it later
const words = ['red', 'green', 'blue']
let foundWord // has 'any' type -> should be initialized or added a type annotation
for (let i = 0; i <= words.length; i++) {
  if (words[i] === 'blue') {
    foundWord = true
  }
}

//   3) var whose type cannot be inferred correctly
let numbers = [-10, -1, 12]
let numberAboveZero: boolean | number = false
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i]
  }
}
