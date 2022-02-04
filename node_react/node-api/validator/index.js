exports.createPostValidator = (request, response, next) => {
  request.check('title', 'The title cannot be empty!').notEmpty()
  request.check('title', 'The title must be between 4 and 150 characters!').isLength({ min: 4, max: 150 })

  request.check('body', 'The body cannot be empty!').notEmpty()
  request.check('body', 'The body must be between 4 and 2000 characters!').isLength({ min: 4, max: 2000 })

  // check for errors
  const errors = request.validationErrors()
  if (errors) {
    const firstError = errors[0].msg
    return response.status(400).json({ error: firstError })
  }

  // proceed to the next middleware
  next()
}

exports.userSignupValidator = (request, response, next) => {
  request.check('name', 'The name is required!').notEmpty()

  request
    .check('email', 'The email must be between 5 and 2000 characters!')
    .matches(/.+\@.+\..+/)
    .withMessage('The email must contain a @ character!')
    .isLength({ min: 5, max: 2000 })

  request.check('password', 'The password is required!').notEmpty()
  request
    .check('password')
    .isLength({ min: 6 })
    .withMessage('The password must contain at least 6 characters!')
    .matches(/\d/) // at least 1 digit
    .withMessage('The password must contain a digit!')

  const errors = request.validationErrors()
  if (errors) {
    const firstError = errors[0].msg
    return response.status(400).json({ error: firstError })
  }

  next()
}
