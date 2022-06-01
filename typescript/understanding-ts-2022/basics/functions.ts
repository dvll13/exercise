function add(n1: number, n2: number) {
  return n1 + n2
}

function printResult(num: number): void {
  console.log('Result: ' + num)
}
function printResult2(num: number): void {
  console.log('Result: ' + num)
  return
}
function printResult3(num: number): undefined {
  console.log('Result: ' + num)
  return
}

printResult(add(3, 11))

let combineValues: (a: number, b: number) => number
combineValues = add
console.log(combineValues(5, 2))

function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
  const result = n1 + n2
  callback(result)
}

addAndHandle(5, 10, (result) => {
  console.log(result)
})
