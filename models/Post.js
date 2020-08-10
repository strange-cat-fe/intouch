const { Schema, model } = require('mongoose')
const { schema } = require('./Comment')

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
      img: String,
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
  comments: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  date: String,
})

post.methods.getComments = async function () {
  const comments = await this.comments.populate().execPopulate()
  return comments
}

module.exports = model('Post', post)
