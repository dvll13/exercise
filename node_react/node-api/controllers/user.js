const _ = require('lodash')
const User = require('../models/user')

exports.hasAuthorization = (request, response, next) => {
  const authorized = request.profile && request.auth && request.profile._id === request.auth._id
  if (!authorized) {
    return response.status(403).json({ error: `User not authorized to perform this action!` })
  }
}

exports.userById = (request, response, next, id) => {
  User.findById(id).exec((error, user) => {
    if (error || !user) {
      return response.status(404).json({ error: `User not found!` })
    }

    request.profile = user // add the user info to the request
    next()
  })
}

exports.allUsers = (request, response) => {
  User.find((error, users) => {
    if (error) {
      return response.status(400).json({ error })
    }

    return response.json({ users })
  }).select('name email updated created')
}

exports.getUser = (request, response) => {
  // hide password stuff
  request.profile.hashed_password = undefined
  request.profile.salt = undefined

  return response.json(request.profile)
}

exports.updateUser = (request, response, next) => {
  let user = request.profile
  user = _.extend(user, request.body) // similar to assign
  user.updated = Date.now()

  user.save((error) => {
    if (error) {
      return response.status(400).json({ error: `You are not authorized to perform this action!` })
    }

    // hide the salt and password
    user.salt = undefined
    user.hashed_password = undefined
    response.json({ user })
  })
}

exports.deleteUser = (request, response, next) => {
  let user = request.profile
  user.remove((error, deletedUser) => {
    if (error) {
      return response.status(400).json({ error })
    }

    response.json({ message: `The user ${user.name} has been deleted!` })
  })
}
