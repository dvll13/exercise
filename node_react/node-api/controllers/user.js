const UserModel = require('../models/user')

exports.userById = (request, response, next, id) => {
  UserModel.findById(id).exec((error, user) => {
    if (error || !user) {
      return response.status(404).json({ error: `User not found!` })
    }

    request.profile = user // add the user info to the request
    next()
  })
}

exports.hasAuthorization = (request, response, next) => {
  const authorized = request.profile && request.auth && request.profile._id === request.auth._id
  if (!authorized) {
    return response.status(403).json({ error: `User not authorized to perform this action!` })
  }
}
