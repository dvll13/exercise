const mongoose = require('mongoose')

// requirements
const { Schema } = mongoose
const postSchema = new Schema({
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
  },
  photo: {
    data: Buffer, // allocated space from nodejs core for binary data to be later stored in the db
    contentType: String
  },
  postedBy: {
    type: Schema.Types.ObjectId, // reference
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
})

// create and export a model
module.exports = mongoose.model('Post', postSchema)
