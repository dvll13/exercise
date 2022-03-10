const express = require('express')
const cors = require('cors')

const app = express()
const port = 8081

// apply whitelisted domains CORS rules to any endpoints from our backend
const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions)) // use middleware in express

app.get('/', (req, res) => {
  res.send('Hello World!!!')
})
app.get('/test', (req, res) => {
  res.send('Hello from the test endpoint!')
})
app.get('/user', (req, res) => {
  res.send({
    id: 1,
    firstName: 'Ivan',
    lastName: 'Ivanov'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
