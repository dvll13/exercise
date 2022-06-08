// ### INTERSECTION TYPES / INTERFACES

// interface Admin {
type Admin = {
  name: string
  privileges: string[]
}

// interface Employee {
type Employee = {
  name: string
  startDate: Date
}

// interface ElevatedEmployee extends Admin, Employee {}
type ElevatedEmployee = Admin & Employee

const e1: ElevatedEmployee = {
  name: 'Peter',
  privileges: ['start-server'],
  startDate: new Date()
}

type Combinable = string | number
type Numeric = number | boolean

type Universal = Combinable & Numeric // number

// ### TYPE GUARDS
function add(a: Combinable, b: Combinable) {
  // type guard: typeof
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

type UnknownEmployee = Employee | Admin

function printEmployeeInformation(emp: UnknownEmployee) {
  console.log('Name:', emp.name)

  // console.log('Privileges:', emp.privileges) // TS error

  // type guard: prop in obj
  if ('privileges' in emp) {
    console.log('Privileges:', emp.privileges) // ok
  }
  if ('startDate' in emp) {
    console.log('startDate:', emp.startDate) // ok
  }
}
printEmployeeInformation(e1)

// ### TYPE GUARDS FOR CLASSES
class Car {
  drive() {
    console.log('Driving...')
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...')
  }

  loadCargo(amount: number) {
    console.log('Loading cargo', amount)
  }
}

type Vehicle = Car | Truck

function useVehicle(vehicle: Vehicle) {
  vehicle.drive()

  // type guard: prop in obj
  // if ('loadCargo' in vehicle) {
  //   vehicle.loadCargo(6)
  // }

  // better (since classes are compiled to constructor fns and js understands them):
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(6)
  }
}

const v1 = new Car()
const v2 = new Truck()

useVehicle(v1)
useVehicle(v2)

// ### DISCRIMINATED UNION PATTERN (common prop + switch) - useful when working with objects, union types and interfaces

interface Bird {
  type: 'bird' // we add some common prop
  flyingSpeed: number
}

interface Horse {
  type: 'horse'
  runningSpeed: number
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
  let speed
  switch (animal.type) {
    case 'bird': // TS detects and suggests cases
      speed = animal.flyingSpeed
      break
    case 'horse':
      speed = animal.runningSpeed
      break
  }

  console.log('Moving at speed: ' + speed)
}
moveAnimal({ type: 'bird', flyingSpeed: 30 })

// ### TYPE CASTING - tell TS what type to expect when it can't infer it correctly

// ! - tell TS that the expression in front of it will never yield null
const userInputElement = document.querySelector('#user-input')! as HTMLInputElement

// equivalent:
// const userInputElement = <HTMLInputElement>document.querySelector('#user-input')

userInputElement.value = 'test'

// ### INDEX PROPERTIES - in an object when we know the value type but we don't know the count and the names of the properties in it

interface ErrorContainer {
  id: string
  // id: number // nope - since it's defined as string below
  [prop: string]: string
}
// properties should be of type string and the values should be string

const error: ErrorContainer = {
  id: 'd1',
  email: 'Invalid email!',
  1: 'test' // ok
}

interface ErrorContainer2 {
  [key: number]: string
}
const error2: ErrorContainer2 = {
  1: 'test'
  // '1': 'test2' // error
}

// ### FUNCTION OVERLOADS - when TS can't infer the fn return type by it's own, we define the different combinations and what return value type they lead to

// TS merges all combinations with the function definition and now can predict correctly the return value type
function sum(a: number, b: number): number
function sum(a: string, b: string): string
function sum(a: number, b: string): string
function sum(a: number, b: number): string
function sum(a: Combinable, b: Combinable) {
  // type guard: typeof
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString()
  }
  return a + b
}

const result = sum(1, 5) // const result: number; function sum(a: number, b: number): number (+3 overloads)
const result2 = sum(4, 'a') // function sum(a: number, b: string): string (+3 overloads)

// ### OPTIONAL CHAINING

const fetchedUserData = {
  id: 1,
  name: 'Ivan',
  job: {
    title: 'CEO',
    description: 'My company'
  }
}
console.log(fetchedUserData?.job?.title)

// ### NULLISH COALESCING

// ?? - if it's null/undefined
// || - if it's falsy
const userInput = ''
console.log(userInput ?? 'DEFAULT') // ''
console.log(userInput || 'DEFAULT') // 'DEFAULT'
