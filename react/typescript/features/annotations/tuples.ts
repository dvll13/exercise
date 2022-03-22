const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
}
//           tuple
const pepsi: [string, boolean, number] = ['brown', true, 40]

// an alternative is by TYPE ALIAS (reusable):
type Drink = [string, boolean, number]
const cola: Drink = ['brown', true, 40]

// in most cases objects are more useful
const carSpecs: [number, number] = [400, 3354]

const carStats = {
  hp: 400,
  weight: 3354
}
