// decorator - a function you apply to something, e.g. a class in a certain way. Usually starts with a capital letter
function Logger(constructor: Function) {
  console.log('Logging...') //1
  console.log(constructor) //2
}

// decorators run when the class is defined, not when it's instantiated
@Logger
class Person {
  name = 'Al'
  constructor() {
    console.log('Creating person object...') //6
  }
}

// DECORATOR FACTORY - allows passing args

function LoggerWithArgs(logString: string) {
  console.log('LOGGER FACTORY') //3
  return function (constructor: Function) {
    console.log(logString) //7
    console.log(constructor) //8
  }
}

function WithTemplate(template: string, domElId: string) {
  console.log('TEMPLATE FACTORY') //4
  // `_` - tells TS you are aware of the arg but don't intend to use it
  // return function (_: Function) {

  // T is an object generated from a constructor that could accept any kind of arguments. the only certain property is `name`
  return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
    // RUNS ON DECORATOR FN EXECUTION (ON CLASS DEFINITION)

    // console.log('Rendering template...') //5

    // const hookEl = document.getElementById(domElId)
    // const p = new originalConstructor()
    // if (hookEl) {
    //   hookEl.innerHTML = template
    //   hookEl.querySelector('h1')!.textContent = p.name
    // }

    // extend and replace the current CONSTRUCTOR fn
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super() // saves the original class methods&props

        // RUNS ON INSTANTIATING THE CLASS
        console.log('Rendering template...') //5

        const hookEl = document.getElementById(domElId)
        // const p = new originalConstructor()
        if (hookEl) {
          hookEl.innerHTML = template
          hookEl.querySelector('h1')!.textContent = this.name
        }
      }
    }
  }
}

// EXECUTION ORDER: factories up-to-down, decorators in them down-to-up

@LoggerWithArgs('LOGGING - PERSON')
@WithTemplate('<h1>My person object</h1>', 'app')
class Person2 {
  name = 'Al'
  constructor() {
    console.log('Creating person object...')
  }
}

const p = new Person2() // decorator runs on instantiating now
