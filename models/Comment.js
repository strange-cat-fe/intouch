const { Schema, model } = require('mongoose')

const comment = new Schema({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: {
      username: String,
      _id: String,
      img: String,
    },
    required: true,
  },
  date: String,
})

module.exports = model('Comment', comment)
