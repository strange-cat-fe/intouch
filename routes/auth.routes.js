const { Router } = require('express')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const sendgrid = require('@sendgrid/mail')

const router = Router()

const User = require('../models/User')
const regEmail = require('../email/registration')

sendgrid.setApiKey(config.get('sendgridApi'))

router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body
    const candidate = await User.findOne({ email })
    if (candidate) {
      return res.status(200).json({
        data: 'User with this email already exists',
        error: true,
      })
    } else {
      const hashedPassword = await bcrypt.hash(password, 10)

      crypto.randomBytes(32, async (err, buffer) => {
        if (err) throw err

        const key = buffer.toString('hex')

        await sendgrid.send(regEmail(email, key))

        await User.create({
          username,
          email,
          password: hashedPassword,
          verifyKey: key,
        })
      })

      res.status(200).json({
        data: 'Please, verify your e-mail',
      })
    }
  } catch (e) {
    res.status(500).json({
      error: true,
      data: e.message,
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })

    if (candidate.verified) {
      const areSame = await bcrypt.compare(password, candidate.password)

      if (areSame) {
        const token = jwt.sign(
          { userId: candidate._id },
          config.get('jwtSecret'),
          {
            expiresIn: '1h',
          },
        )
        return res.status(200).json({
          data: {
            token,
            userId: candidate._id,
            username: candidate.username,
          },
        })
      } else {
        return res.status(200).json({
          data: 'Password is wrong. Try again',
          error: true,
        })
      }
    } else {
      res.status(200).json({
        data: "User with this email doesn't exist",
        error: true,
      })
    }
  } catch (e) {
    res.status(500).json({ data: e.message })
  }
})

router.get('/verify/:email/:verifyKey', async (req, res) => {
  try {
    const email = req.params.email
    const user = await User.findOne({ email })

    if (req.params.verifyKey == user.verifyKey) {
      user.verified = true

      await User.findByIdAndUpdate(user._id, { $unset: { verifyKey: '' } })

      await user.save()
      res.send(`
  <h1>Your email is verified!</h1>
  `)
    } else {
      res.status(404).json({ data: 'Bad request' })
    }
  } catch (e) {
    res.status(500).json({ data: e.message })
  }
})

module.exports = router
