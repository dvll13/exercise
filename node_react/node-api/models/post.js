const mongoose = require('mongoose')

// requirements
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
    // required: "The title is required!", // removed after the added validation
    // minlength: 4,
    // maxlength: 150
  },
  body: {
    type: String,
    required: true
    // required: "The title is required!",
    // minlength: 4,
    // maxlength: 2000
  }
})

// create and export a model 
module.exports = mongoose.model('Post', postSchema)