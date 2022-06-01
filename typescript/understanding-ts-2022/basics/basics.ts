function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  const result = n1 + n2

  if (showResult) {
    console.log(phrase + result)
  } else {
    return result
  }
}

const num1 = 5
const num2 = 2.4
const printResult = true // const printResult: true
let resultPhrase = 'Result: ' // let resultPhrase: string

add(num1, num2, printResult, resultPhrase)
