const { Schema, model } = require('mongoose')

const Post = require('../models/Post')

const user = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
  img: {
    type: String,
    default: '',
  },
  theme: {
    type: String,
    default: 'light',
  },
})

user.methods.getPosts = async function () {
  const posts = await Post.find({ 'author._id': this._id })
  return posts
}

module.exports = model('User', user)
