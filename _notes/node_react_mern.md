- NODE - a platform that allows running javascript on a computer
- REPL - read evaluate print loop (node console)


# ENTER NODE CONSOLE
- type `node` in the normal console
- you have top level `global` and `process` objects
- entire app is running in the `process` module, so what's added to the `process.exports` object (private - can be checked by console.log(process) FROM the app) will be visible throughout the whole app


`npm init` - initialize a project and auto create a package.json  
`nodemon` package - reloading the server on file changes  
`express` - server  
`body-parser` - helps us parse the request body  
`uuid` - create timestamps, unique ids etc.  
`const crypto = require('crypto')` - nodejs cryptographic functionality  
`jsonwebtoken` - - create a web token and store it in the user's localStorage to keep him logged in  
`cookie-parser` - help us parse the request cookie  
`express-jwt` - helps protect routes  
`formidable` - for parsing form data, especially file uploads  
`cors` - when you have api and frontend on separate domains browsers will block the requests to another domain for security reasons. to fix this we'll use the cors npm package

> **NODE EVENT LOOP** (asynchronous programming) - single threaded non blocking model, callbacks, FIFO; the called callbacks get in the stack and get executed from there


`fs.watch(fileName, onFileChange)`
`fs.readFile(fileName, (error, data) => {})` - asynchronous
`const data = fs.readFileSync(fileName)` - synchronous, no callback


> **MIDDLEWARE** - something that's executed between the start and the end of a process
//middleware > routes > controllers
app.use(morgan('dev')) - HTTP request logger middleware for node.js
app.use(bodyParser.json()) - to be able to parse and see the request body
app.use(expressValidator()) - better validation error handling
app.use('/', postRoutes) > const postRoutes = express.Router() > controllers

//MODEL -> communication with the database
  // reference to another model
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'UserModel'
  },



//POSTMAN (request > route > controller (uses model))
  post url > body > raw > json
  POST request:
    Headers > content-type > application/json
  GET request:
    Headers > Authorization > Bearer <token> - test routes protected with token (with express-jwt)

  router.get('/users', allUsers)
  router.get('/user/:userId', requireSignIn, getUser)
  router.put('/user/:userId', requireSignIn, updateUser)
  router.post('/post', requireSignIn, createPostValidator, createPost) // post from FE to BE
  router.delete('/user/:userId', requireSignIn, deleteUser)

  FOR `FORMIDABLE` FORMS:
  post url > body > x-www-form-urlencoded



// CONTROLLER
  create post (postModel.save((error, result) => ...)
    if error -> return HTTP status code 400 with the error message
      else return 200 with eg. the created post
  
  HTTP status 200 is by DEFAULT returned by the Express frameworks so it can be omitted: response.status(200).json({posts}) -> response.json({posts})

  PostModel.find() - returns all records
  PostModel.find().select('_id title body') - select the fields to return

  VIRTUAL FIELDS - additional fields for a given model. Their values can be set manually or automatically with a defined functionality. Virtual properties (password) don't persist in the database (hashed_password will be instead). They only exist locally and are not written to the document's collection. (models/user.js)

  const userExists = await UserModel.findOne({
    email: request.body.email
  })
  const user = await new UserModel(request.body)
  await user.save()
  response.json({ message: `The signup for user ${user.name} is successful! Please login.` })

  // TOKEN IN A COOKIE
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET) // generate a cookie based on the user id and .env secret
  response.cookie('t', token, { expire: new Date() + 9999 }) // + seconds


  DELETE POST
    whenever there is a postId in the url
      execute postById() to get that post from the db
        also populate the user who created the post 
          and make the post available in the request


AUTHENTICATION - is the user logged in with his credentials

AUTHORIZATION
------------- 

  FIRST STEP
    A request is sent to profile update
      this is what the url looks like: http://localhost:8080/profile/userid4328512

    when there is a userId in the incoming request (url)
      based on the that userId our backend will make a query to the database and load that user information (name, email etc)
          then we'll add that info to the request object like so: req.profile = userInfo

  SECOND STEP
    add a property called auth in requireSignIn() so that we know the user is authenticated

  THIRD STEP
    create hasAuthorization()
      to make sure the req object has req.profile && req.auth && req.profile._id === req.auth._id






FRONTEND
================================================================

Material Design for Bootstrap

fetch('http://localhost:8080/signup', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(userData)
})
  .then((response) => response.json())
  .catch((error) => {
    console.log(error)
  })