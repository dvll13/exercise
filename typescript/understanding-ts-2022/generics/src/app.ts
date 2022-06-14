// tell TS what type of data an array stores
const names: Array<string> = [] // === string[]
// names.push('test')
// names[0].split(' ') // string methods suggested

// tell TS what type of data a promise returns
// Promise<string> -> this is a promise that'll eventually yield a string
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => resolve('resolved!'), 1000)
})
promise.then((data) => {
  data.split(' ')
})

// GENERIC FUNCTION

// function merge(objA: object, objB: object) { // type object is too general
//   return Object.assign(objA, objB)
// }
// const mergedObj = merge({ name: 'Ivan' }, { age: 21 })
// mergedObj.name // ERROR: Property 'name' does not exist on type 'object'.

// by convention we start with T for a Type, and then continue with U and so on
function merge<T, U>(objA: T, objB: U) {
  // return [objA, objB] // function merge<T, U>(objA: T, objB: U): (T | U)[]
  return Object.assign(objA, objB) // => function merge<T, U>(objA: T, objB: U): T & U
}
// we could specify the result type by `: T & U` but its not needed since TS infers it in this case

const mergedObj = merge({ name: 'Ivan' }, { age: 21 }) // TS understands that T and U are of different types and infers them: const mergedObj { name: string } & { age: number }
mergedObj.name // no error and (name | age) are auto-suggested

const mergedObj2 = merge({ sex: 'm' }, { age: 45 }) // { sex: string } & { age: number }
const mergedObj3 = merge<string, number>('test', 45) // we could also fill in different values for U and T types for different function calls if TS doesn't infer them

// ### CONSTRAINTS

function merge2<T extends object, U extends object | number>(objA: T, objB: U) {
  return Object.assign(objA, objB)
}

// here we only care that we receive an element with a length property and return a tuple:
interface Lengthy {
  length: number
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let description = 'Got no value.'
  if (element.length === 1) {
    description = `Got 1 element.`
  } else if (element.length > 1) {
    description = `Got ${element.length} elements.`
  }
  return [element, description]
}
// console.log(countAndDescribe('Hey you!'))

// ### THE keyof CONSTRAINT

// `U extends keyof T` - U should be a key, present in the T object
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key]
}
// extractAndConvert({}, 'name') // ERROR
// extractAndConvert({ name: 'Al' }, 'name') // ok

// ### GENERIC CLASSES

// define some generic type we use for storing our data
class DataStorage<T extends string | number | boolean> {
  private data: T[] = []

  addItem(item: T) {
    this.data.push(item)
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return
    }
    this.data.splice(this.data.indexOf(item), 1)
  }

  getItems() {
    return [...this.data]
  }
}

const textStorage = new DataStorage<string>()
textStorage.addItem('test') // TS: addItem(item: string): void
// textStorage.addItem(1) // ERROR

const numberStorage = new DataStorage<number | string>()
numberStorage.addItem(4) // (method) DataStorage<string | number>.addItem(item: string | number): void

// const objStorage = new DataStorage<object>()
// const obj1 = { name: 'Al' }
// objStorage.addItem({ name: 'Al' })
// objStorage.addItem({ name: 'Alex' })
// objStorage.removeItem(obj1)
// console.log(objStorage.getItems())

// GENERIC UTILITY TYPES

interface CourseGoal {
  title: string
  description: string
  completeUntil: Date
}

// Partial - TEMPORARY wrap the Type and turn it into a type where all the objects are OPTIONAL
function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {} // Partial - tells TS that this is an object that in the end will be of CourseGoal type

  courseGoal.title = title
  courseGoal.description = description
  courseGoal.completeUntil = date

  return courseGoal as CourseGoal // cast back from Partial to CourseGoal
}

// Readonly - makes array or object readonly
{
  const names: Readonly<string[]> = ['a', 'b']
  // names.push() // error
  // names.pop() // error
}
