const express = require('express')
const { getPosts, createPost, postsByUser } = require('../controllers/post')
const { requireSignIn } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { createPostValidator } = require('../validator')

const router = express.Router()

router.get('/', getPosts)
router.post('/post/new/:userId', requireSignIn, createPost, createPostValidator) // post from FE to BE
// if the createPostValidator passes, then proceed to createPost
// createPost with `formidable` form data must be run before our validation in order for the latter to work
router.get('/posts/by/:userId', requireSignIn, postsByUser)

// for any route containing :userId, our app will first execute userById() and populate the request with the user data
router.param('userId', userById)

module.exports = router
