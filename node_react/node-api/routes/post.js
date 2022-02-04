const express = require('express')
const { getPosts, createPost } = require('../controllers/post')
const { requireSignIn } = require('../controllers/auth')
const { userById } = require('../controllers/user')
const { createPostValidator } = require('../validator')

const router = express.Router()

router.get('/', getPosts)
router.post('/post', requireSignIn, createPostValidator, createPost) // post from FE to BE
// if the createPostValidator passes, then proceed to createPost

// for any route containing :userId, our app will first execute userById()
router.param('userId', userById)

module.exports = router
