const { Router } = require('express')

const User = require('../models/User')
const Subscription = require('../models/Subscription')

const router = Router()

const mapFollowing = subscriptions => {
  return subscriptions.map(s => ({
    ...s.profile,
  }))
}
const mapFollowers = subscriptions => {
  return subscriptions.map(s => ({
    ...s.subscriber,
  }))
}

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

router.get('/:username/info', async (req, res) => {
  try {
    const { username, _id } = await User.findOne({
      username: req.params.username,
    })
    const profile = { username, _id }

    const followers = await Subscription.find({ profile })
    const following = await Subscription.find({ subscriber: profile })

    res.status(200).json({
      data: {
        username: profile.username,
        img: profile.img,
        following: mapFollowing(following),
        followers: mapFollowers(followers),
      },
    })
  } catch (e) {
    res.status(500).json({ data: e })
  }
})

module.exports = router
