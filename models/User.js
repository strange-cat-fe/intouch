const { Schema, model } = require('mongoose')

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    dafault: false,
  },
})

module.exports = model('User', user)
