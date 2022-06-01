let userInput: unknown
let userInput2: any
let username: string

userInput = 5
userInput = 'Max'
userInput2 = 'test'

username = userInput2 // ok
username = userInput // Type 'unknown' is not assignable to type 'string'.ts(2322)

if (typeof userInput === 'string') {
  username = userInput // ok
}

function generateError(message: string, code: number): never {
  throw {
    message,
    errorCode: code
  }
}

generateError('An error ocurred', 500)
