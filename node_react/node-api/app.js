const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
// const dotenv = require('dotenv')
// dotenv.config() //load .env contents into process.env
require('dotenv').config()

// DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then(() => console.log('DB Connected'))

mongoose.connection.on('error', (error) => {
  console.log(`DB connection error: ${error.message}`)
})

// ROUTES
const postRoutes = require('./routes/post')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')

// MIDDLEWARE
const myTestMiddleware = (request, response, next) => {
  console.log('My test middleware is called!')
  next() //node process will continue to the next phase
}
app.use(myTestMiddleware)

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use('/', postRoutes) //any request will be forwarded to the postRoutes and then to the controller
app.use('/', authRoutes)
app.use('/', userRoutes)
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ error: 'Unauthorized!' }) // invalid token
  }
})

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`The Node JS API is listening on port ${port}...`))
