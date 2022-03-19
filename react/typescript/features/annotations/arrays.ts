const carMakers = ['toyota', 'ford', 'chevy']
const carMakers2: string[] = []

const dates = [new Date(), new Date()] //inferred -> const dates: Date[]

const carsByMake = [['corolla'], ['f150'], ['camaro']] // const carsByMake: string[][] - 2D array

// helps with inference when extracting values from the
const car1 = carMakers[0] // const car1: string
const car2 = carMakers.pop() // const car2: string

// prevents incompatible values
carMakers.push(100) // Argument of type 'number' is not assignable to parameter of type 'string'

carMakers.map((car) => {
  return car.toUpperCase() // TS helps IDE know it's string so the latter adds string autocomplete fns to `car`
})

// Flexible types
const importantDates = [new Date(), '2030-10-15'] // const importantDates: (string | Date)[]
