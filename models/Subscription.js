const { Schema, model } = require('mongoose')

const subscription = new Schema({
  profile: {
    type: {
      username: String,
      _id: String,
    },
  },
  subscriber: {
    type: {
      username: String,
      _id: String,
    },
  },
})

module.exports = model('Subscription', subscription)
