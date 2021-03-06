const Post = require('../models/post')
const formidable = require('formidable')
const fs = require('fs')
const _ = require('lodash')

exports.postById = (request, response, next, id) => {
  Post.findById(id)
    .populate('postedBy', '_id name')
    .exec((error, post) => {
      if (error || !post) {
        response.status(400).json({ error })
      }

      request.post = post
      next()
    })
}

exports.getPosts = (request, response) => {
  // response.json({ posts: [{ title: 'First post' }, { title: 'Second post' }] })
  Post.find()
    .populate('postedBy', '_id name') // populate the field with the related properties from a DIFFERENT MODEL
    .select('_id title body created')
    .then((posts) => {
      response.json({ posts })
    })
    .catch((error) => console.log(error))
}

exports.createPost = (request, response, next) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(request, (error, fields, files) => {
    // gets the request and calls the callback with parsed data
    if (error) {
      return response.status(400).json({ error: `The image can't be uploaded!` })
    }

    let post = new Post(fields)

    request.profile.salt = undefined
    request.profile.hashed_password = undefined
    post.postedBy = request.profile

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path)
      post.photo.contentType = files.photo.type
    }

    post.save((error, result) => {
      if (error) {
        response.status(400).json({ error })
      }

      response.json(result)
    })
  })

  //console.log('CREATING POST:', post) //CREATING POST: { _id: new ObjectId("61f70b5d2d051ba91a2d107a") } (without body-parser)
  // console.log('CREATING POST:', request.body) // CREATING POST: { title: 'This is new post title', body: 'This is new post body text' }

  // const Post = new Post(request.body)

  // Post.save().then((result) => {
  //   response.status(200).json({ post: result })
  // })

  // Post.save((error, result) => {
  //   if (error) {
  //     return response.status(400).json({  // return the correct HTTP STATUS CODE with an error message
  //       error
  //     })
  //   }

  //   return response.status(200).json({
  //     post: result
  //   })
  // })
}

exports.postsByUser = (request, response) => {
  Post.find({ postedBy: request.profile._id })
    .populate('postedBy', '_id name')
    .sort('_created') //sort by a field
    .exec((error, posts) => {
      if (error) {
        response.status(400).json({ error })
      }

      response.json(posts)
    }) //execute a callback
}

exports.isPoster = (request, response, next) => {
  const isPoster = request.post && request.auth && request.post.postedBy._id.valueOf() === request.auth._id

  // console.log('p', request.post)
  // console.log('a', request.auth)
  // console.log('pid', request.post.postedBy._id.valueOf())
  // console.log('aid', request.auth._id)
  // console.log('is', isPoster)

  if (!isPoster) {
    return response.status(403).json({ error: `The user is not authorized!` })
  }
  next() // proceed to the next middleware
}

exports.updatePost = (request, response, next) => {
  let post = request.post
  post = _.extend(post, request.body)
  post.updated = Date.now()
  post.save((error) => {
    if (error) {
      response.status(400).json({ error })
    }
    response.json(post)
  })
}

exports.deletePost = (request, response) => {
  const post = request.post
  post.remove((error, post) => {
    if (error) {
      return response.status(400).json({ error })
    }

    response.json({ message: `The post was successfully deleted!` })
  })
}
