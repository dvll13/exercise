const fs = require('fs')

const fileName = 'watched_file.txt'
const onFileChange = (event, fileName) => {
  console.log('file changed!!!', event, fileName)
}

fs.watch(fileName, onFileChange)
