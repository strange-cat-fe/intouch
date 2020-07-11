const { Router } = require('express')

const User = require('../models/User')
const Post = require('../models/Post')
const paginatedResults = require('../middleware/pagination')

const router = Router()

router.post('/changeAvatar', async (req, res) => {
  try {
    const user = res.user
    const img = req.body.img

    user.img = img
    await user.save()
    res.status(200)
  } catch (e) {
    res.status(500).json({ data: e })
  }
})

router.get('/:username/posts', paginatedResults(Post), async (req, res) => {
  try {
    const posts = res.paginatedResults

    if (posts) return res.status(200).json({ data: posts })
    res.status(200).json({ data: 'No posts' })
  } catch (e) {
    res.status(500).json({ data: e })
  }
})

router.get('/:username/info', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })

    res.status(200).json({
      data: {
        username: user.username,
        img: user.img,
      },
    })
  } catch (e) {
    res.status(500).json({ data: e })
  }
})

module.exports = router
