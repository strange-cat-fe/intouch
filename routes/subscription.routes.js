const { Router } = require('express')

const Subscription = require('../models/Subscription')
const User = require('../models/User')

const router = Router()

router.post('/:username', async (req, res) => {
  try {
    const { username, _id } = await User.findOne({
      username: req.params.username,
    })
    const profile = { username, _id }
    const subscriber = { username: res.user.username, _id: res.user._id }

    const checkSubscription = await Subscription.findOne({
      subscriber,
      profile,
    })

    if (!checkSubscription) {
      await Subscription.create({
        subscriber,
        profile,
      })
    } else {
      await Subscription.findOneAndDelete({
        subscriber,
        profile,
      })
    }
    res.status(201)
  } catch (e) {
    res.status(500).json({ data: e })
  }
})

//router.post('/:username/remove', (req, res) => {})

module.exports = router
