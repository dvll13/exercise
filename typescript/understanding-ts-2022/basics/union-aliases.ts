type Combinable = number | string
type ConversionDescriptor = 'as-number' | 'as-string'

function combine(input1: Combinable, input2: Combinable, resultConversion: ConversionDescriptor) {
  // result = input1 + input2 // TS complains since it doesn't check what types are there in the union. hence:
  let result
  if ((typeof input1 === 'number' && typeof input2 === 'number') || resultConversion === 'as-number') {
    result = +input1 + +input2
  } else {
    result = input1.toString() + input2.toString()
  }

  return result
  // if (resultConversion === 'as-number') {
  //   return +result
  // } else {
  //   return result.toString()
  // }
}

const combineAges = combine(30, 32, 'as-number')
const combineStringAges = combine('30', '32', 'as-number')
const combineNames = combine('Anna', 'Ivan', 'as-string')

console.log({ combineAges, combineStringAges, combineNames })
