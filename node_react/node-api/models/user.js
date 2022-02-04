const mongoose = require('mongoose')
const { v1: uuidv1 } = require('uuid')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  hashed_password: {
    type: String,
    required: true
  },
  salt: String,
  created: {
    type: Date,
    default: Date.now // mongoose syntax
  },
  updated: Date
})

// virtual field (to hash the password)
userSchema
  .virtual('password') // get the plain password and set the hashed_password
  .set(function (password) {
    // create a temp var
    this._password = password
    // generate a timestamp
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function () {
    return this._password
  })

// add methods to the schema
userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password
  },

  encryptPassword: function (password) {
    if (!password) return ''
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex')
    } catch (e) {
      return ''
    }
  }
}

module.exports = mongoose.model('User', userSchema)
