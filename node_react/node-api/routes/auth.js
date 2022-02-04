const express = require('express')
const { signUp, signIn, signOut } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { userSignupValidator } = require('../validator')

const router = express.Router()

router.post('/signup', userSignupValidator, signUp)
router.post('/signin', signIn)
router.post('/signout', signOut)

// looking for a parameter in incoming request url
// so every time there is a parameter userId we'll execute a method that gets user info from the db based on the userId and append it to the request object
router.param('userId', userById)

module.exports = router
