//creating a web server

const http = require('http')

const server = http.createServer((req, res) => {
    // execute this on any incoming request
    console.log(req)
})

server.listen(3000) // listen for incoming requests
