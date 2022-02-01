const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const dotenv = require('dotenv')
dotenv.config() //load .env contents into process.env

// DB
mongoose.connect(
  process.env.MONGO_URI,
  {useNewUrlParser: true}
)
  .then(() => console.log('DB Connected'))

mongoose.connection.on('error', error => {
  console.log(`DB connection error: ${error.message}`)
})


// ROUTES
const postRoutes = require('./routes/post')


// MIDDLEWARE
const myTestMiddleware = (request, response, next) => {
  console.log('My test middleware is called!')
  next() //node process will continue to the next phase
}
app.use(myTestMiddleware)

app.use(morgan('dev'));
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/', postRoutes) //any request will be forwarded to the postRoutes and then to the controller

const port = process.env.PORT || 8080
app.listen(port, ()=> console.log(`The Node JS API is listening on port ${port}...`))