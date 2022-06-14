// ### PROPERTIES
function LogProperty(target: any, propertyName: string | Symbol) {
  /* target:
    - for an instance of a property, it will be the prototype of the object that was created
    - for a static property - the constructor
  */
  console.log('Running property decorator', { target, propertyName })
}

// ### ACCESSORS (GETTERS/SETTERS)
// target: if it's an instance -> prototype; static one -> the constructor
function LogAccessor(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator:', { target, name, descriptor })
}

// ### METHODS
// target: instance -> prototype; static -> the constructor
function LogMethod(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator:', { target, name, descriptor })
}

// ### PARAMETERS
// target: instance -> prototype; static -> the constructor
function LogParameter(target: any, name: string | Symbol, argumentPosition: number) {
  console.log('Parameter decorator:', { target, name, argumentPosition })
}

class Product {
  @LogProperty // add a decorator to a PROPERTY
  title: string
  private _price: number

  @LogAccessor
  set price(value: number) {
    if (value > 0) {
      this._price = value
    } else {
      throw new Error('Invalid price - should be positive!')
    }
  }

  constructor(t: string, p: number) {
    this.title = t
    this._price = p
  }

  @LogMethod
  getPriceWithTax(@LogParameter tax: number) {
    return this._price * (1 + tax)
  }
}

// ### AUTOBIND decorator

// target: prototype || constructor
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  // we want to make sure that we'll always assign `this` to the obj this method belongs to
  const originalMethod = descriptor.value
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // execute some extra logic when the user tries to access this prop (add an extra getter layer)
    get() {
      const boundFn = originalMethod.bind(this) // this -> obj that defined the getter and triggers it
      return boundFn
    }
  }

  return adjustedDescriptor
}

class Printer {
  message = 'This works!'

  @Autobind
  showMessage() {
    console.log(this.message)
  }
}

const printer = new Printer()
const button = document.querySelector('button')!
// button.addEventListener('click', printer.showMessage) // logs 'undefined', because this -> button
// button.addEventListener('click', printer.showMessage.bind(printer)) // now this -> printer

// INSTEAD OF manually calling .bind(printer) every time, we can add an Autobind decorator
button.addEventListener('click', printer.showMessage) // this -> printer

// ### DECORATORS FOR VALIDATION

interface ValidatorConfig {
  [property: string]: {
    // class name
    [validatableProp: string]: string[] // ['required', 'positive', ...]
  }
}

const registeredValidators: ValidatorConfig = {}

function RequiredValue(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  }
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  }
}

function validate(obj: any) {
  const objValidatorConfig = registeredValidators[obj.constructor.name]
  if (!objValidatorConfig) {
    return true
  }

  let isValid = true
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]
          break
        case 'positive':
          isValid = isValid && obj[prop] > 0
          break
      }
    }
  }

  return isValid
}

class Course {
  @RequiredValue
  title: string
  @PositiveNumber
  price: number

  constructor(t: string, p: number) {
    this.title = t
    this.price = p
  }
}

const courseForm = document.querySelector('form')!
courseForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const titleEl = document.getElementById('title') as HTMLInputElement
  const priceEl = document.getElementById('price') as HTMLInputElement

  const title = titleEl.value
  const price = +priceEl.value

  const createdCourse = new Course(title, price)

  if (!validate(createdCourse)) {
    alert('Invalid input!')
    return
  }

  console.log(createdCourse)
})
