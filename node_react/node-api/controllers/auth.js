const jwt = require('jsonwebtoken')
const user = require('../models/user')
require('dotenv').config()
const expressJwt = require('express-jwt')
const User = require('../models/user')

exports.signUp = async (request, response) => {
  const userExists = await User.findOne({
    email: request.body.email
  })

  if (userExists)
    return response.status(403).json({
      // 403 - unauthorized
      error: 'A user with this email already exists!'
    })

  const user = await new User(request.body)
  await user.save()
  response.json({ message: `The signup for user ${user.name} is successful! Please login.` })
}

/*
  "email": "three@mail.com",
  "password": "eerhT1"
*/
exports.signIn = (request, response) => {
  // find the user based on email
  const { email, password } = request.body

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return response.status(401).json({ error: `User with such email doesn't exist!` }) // 401: unauthorized
    }

    if (!user.authenticate(password)) {
      // authenticate method from the User
      return response.status(401).json({ error: `Email and password do not match!` })
    }

    // generate a token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET) // generate a cookie based on the user id and .env secret

    // persist the token as 't' in a cookie with expiry date
    response.cookie('t', token, { expire: new Date() + 9999 }) // + seconds

    // return response with user and token to the frontend (can get the token from the response cookie or the json response)
    const { _id, name, email } = user
    return response.json({ token, user: { _id, name, email } })
  })
}

exports.signOut = (request, response) => {
  response.clearCookie()
  return response.json({ message: `Sign out successful!` })
}

// protected routes (checks for the user's secret key from the token, sent from the user's client app when he's signed in; the key should match with ours)
// this method can be used as a middleware for any of our routes
exports.requireSignIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  userProperty: 'auth' // if the token is valid, express-jwt ADDS the verified user's id in an AUTH key to the REQUEST object
})
