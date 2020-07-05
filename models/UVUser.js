const { Schema, model } = require('mongoose')

const uVUser = new Schema(
  {
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
    verifyKey: {
      type: String,
      default: '',
    },
  },
  { timestamps: true },
)
uVUser.index({ createdAt: 1 }, { expires: '48h' })
module.exports = model('UVUser', uVUser)
