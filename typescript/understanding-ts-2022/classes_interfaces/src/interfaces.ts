interface Person {
  name: string
  age: number
  greet(phrase: string): void
}

let user1: Person

user1 = {
  name: 'Ivan',
  age: 11,
  greet(phrase) {
    console.log(phrase + ' ' + this.name)
  }
}

user1.greet('hey')

interface Named {
  readonly name: string
  outputName?: string
  myMethod?(): number
}
interface Greetable extends Named {
  greet(phrase: string): void
}

// a class can implement multiple interfaces
class SomePerson implements Greetable {
  name: string
  age = 30
  secondName?: string

  constructor(n: string, sn?: string) {
    this.name = n
    if (sn) {
      this.secondName = sn
    }
  }

  greet(phrase: string) {
    console.log(phrase + ' ' + this.name || 'stranger')
  }
}

// no error because the class structure satisfies the Greetable interface
let user2: Greetable
user2 = new SomePerson('Seth')
// user2.name = 'Test' // error
// user2.age = 3 // error
user2.greet('Yo')

// DEFINING FUNCTIONS
// type AddFn = (a: number, b: number) => number
interface AddFn {
  (a: number, b: number): number
}

let add: AddFn

add = (n1, n2) => {
  return n1 + n2
}
