const { Schema, model } = require('mongoose')

const post = new Schema({
  text: {
    type: String,
    default: '',
  },
  img: {
    type: String,
    default: '',
  },
  author: {
    type: {
      username: String,
      _id: String,
    },
    required: true,
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    default: [],
  },
  date: String,
})

module.exports = model('Post', post)
