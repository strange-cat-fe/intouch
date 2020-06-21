const { Router } = require('express')

const paginatedResults = require('../middleware/pagination')
const User = require('../models/User')
const Post = require('../models/Post')

const router = Router()

router.get('/', paginatedResults(Post), (req, res) => {
  try {
    res.status(200).json({ data: res.paginatedResults })
  } catch (e) {
    res.status(500).json({ data: e.message })
  }
})

router.post('/new', async (req, res) => {
  try {
    const { text, date, img } = req.body
    const { username } = await User.findById(req.body.userId)

    const newPost = new Post({
      text,
      date,
      img,
      author: { username, _id: req.body.userId },
    })

    await newPost.save()
    res.status(201).json({ data: newPost })
  } catch (e) {
    res.status(500).json({ data: e.message })
  }
})

router.post('/:id/like', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const user = await User.findById(req.body.userId)

    const isLiked = post.likes.some(like => like.equals(user._id))
    if (isLiked) {
      post.likes.pull(user._id)
      res.status(200).json({ message: 'Disliked', likes: mapLikes(post.likes) })
    } else {
      post.likes.push(user)
      res.status(200).json({ message: 'Liked', likes: mapLikes(post.likes) })
    }
    await post.save()
  } catch (e) {
    res.status(500).json(e.message)
  }
})

module.exports = router
