const express = require('express')
const postController = require('../controllers/post')
const validator = require('../validator')

const router = express.Router()

router.get('/', postController.getPosts)
router.post('/post', validator.createPostValidator, postController.createPost) // post from FE to BE
// if the createPostValidator passes, then proceed to createPost

module.exports = router