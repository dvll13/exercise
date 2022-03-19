// const add = (a: number, b: number): number => {
//   return a + b
// }

// could be shortened to:

const add = (a: number, b: number) => {
  return a + b
}

//better to add the return annotation because, in the following the TS won't throw an error:
const subtract_wrong = (a: number, b: number) => {
  a - b
}

const subtract_right = (a: number, b: number): number => {
  return a - b
}

function divide(a: number, b: number): number {
  return a / b
}

const multiply = function (a: number, b: number): number {
  return a * b
}

const logger = (message: string): void => {
  console.log(message)
}

// never - we never actually gonna reach the end of the function
const throwError = (message: string): never => {
  throw new Error(message)
}
const throwError2 = (message: string): string => {
  if (!message) {
    throw new Error(message)
  }

  return message
}
// we are never returning anything and there's just a change of not reaching the end of the function:
const throwError3 = (message: string): void => {
  if (!message) {
    throw new Error(message)
  }
}

// DESTRUCTURING:
const todaysWeather = {
  date: new Date(),
  weather: 'sunny'
}

// const logWeather = (forecast: { date: Date; weather: string }): void => {
const logWeather = ({ date, weather }: { date: Date; weather: string }): void => {
  console.log(date)
  console.log(weather)
}
logWeather(todaysWeather)
