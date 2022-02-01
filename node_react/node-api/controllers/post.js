const PostModel = require('../models/post');

exports.getPosts = (request, response) => {
  response.json(
    {
      posts: [
        {
          title: 'First post'
        },
        {
          title: 'Second post'
        },
      ],
    }
  )
}

exports.createPost = (request, response) => {
  //console.log('CREATING POST:', post) //CREATING POST: { _id: new ObjectId("61f70b5d2d051ba91a2d107a") } (without bdoy-parser)
  console.log('CREATING POST:', request.body) // CREATING POST: { title: 'This is new post title', body: 'This is new post body text' }

  const postModel = new PostModel(request.body)

  postModel.save().then(result => {
    response.status(200).json({post: result})
  })
  
  // postModel.save((error, result) => {
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