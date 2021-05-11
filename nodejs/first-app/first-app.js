// RUN a file in cmd: node first-app.js
// REPL: you can also write the following in cmd first entering "node" and then add it line by line,
//   which can be used as smth like a playground

// console.log('node test')

// file system
const fs = require('fs')

// create 'hello.txt' and add that content in it:
fs.writeFileSync('hello.txt', 'Test content!!!')
