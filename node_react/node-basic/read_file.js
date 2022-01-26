const fs = require('fs')

const fileName = 'watched_file.txt'

// synchronous blocking code
const data = fs.readFileSync(fileName)
console.log('synchronous data:', data.toString())

const errorHandler = (error) => console.log(error)
const dataHandler = (data) => console.log('asynchronous data:', data.toString())

// asynchronous
fs.readFile(fileName, (error, data) => {
  if (error) errorHandler(error)
  dataHandler(data)
})

console.log('Start async test')
