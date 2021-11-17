/*
const http = require('http') //require core node module

const server = http.createServer((request, response) => {
    response.end('response test message 11')
})

server.listen(5000)
console.log('Server initiated.')
*/

/*
const express = require('express')
const app = express()

app.get('/', (request, response) => { // listens for requests
    response.send('some express response 2')
})
app.get('/test', (request, response) => { // listens for requests
    response.send('some express response test')
})

app.listen(5000)
*/

const fs = require('fs')

const fileName = 'watched_file.txt'
const onFileChange = (event, fileName) => {
  console.log('file changed!!!', event, fileName)
}

fs.watch(fileName, onFileChange)
