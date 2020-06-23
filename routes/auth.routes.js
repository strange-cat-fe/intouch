const { Router } = require('express')
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

      await User.create({
        username,
        email,
        password: hashedPassword,
      })

      await sendgrid.send(regEmail(email))
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

router.get('/verify/:email', async (req, res) => {
  try {
    const email = req.params.email
    const user = await User.findOne({ email })

    user.verified = true
    await user.save()
    res.send(`
  <h1>Your email is verified!</h1>
  `)
  } catch (e) {
    res.status(500).json({ data: e.message })
  }
})

module.exports = router
