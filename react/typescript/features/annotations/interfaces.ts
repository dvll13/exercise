// interface Vehicle {
//   name: string
//   year: number
//   checked: Date
//   broken: boolean
//   summary(): string
// }

interface Reportable {
  summary(): string
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  checked: new Date(),
  broken: true,
  summary(): string {
    return `Name is ${this.name}.`
  }
}

const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40,
  summary(): string {
    return `My drink has ${this.sugar}gr of sugar.`
  }
}

const printItem = (item: Reportable): void => {
  // console.log(`Is vehicle ${vehicle.name} from ${vehicle.year} broken? - ${vehicle.broken}`)
  console.log(item.summary())
}

printItem(oldCivic)
printItem(drink)
