exports.createPostValidator = (request, response, next) => {
  request.check('title', 'The title cannot be empty!').notEmpty()
  request.check('title', 'The title must be between 4 and 150 characters!').isLength({
    min: 4,
    max: 150
  })
  
  request.check('body', 'The body cannot be empty!').notEmpty()
  request.check('body', 'The body must be between 4 and 2000 characters!').isLength({
    min: 4,
    max: 2000
  })

  // check for errors
  const errors = request.validationErrors()
  if (errors) {
    const firstError = errors[0].msg
    return response.status(400).json({ error: firstError })
  }

  // proceed to the next middleware
  next()
}