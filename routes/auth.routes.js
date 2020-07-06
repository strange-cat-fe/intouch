const { Router } = require('express')
const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const sendgrid = require('@sendgrid/mail')

const router = Router()

const User = require('../models/User')
const UVUser = require('../models/UVUser')
const regEmail = require('../email/registration')

sendgrid.setApiKey(config.get('sendgridApi'))

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body)
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

        await UVUser.create({
          username,
          email,
          password: hashedPassword,
          verifyKey: key,
        })
      })
      res.status(200).json({
        data: 'Please, verify your e-mail in one hour',
      })
    }
  } catch (e) {
    res.status(500).json({
      data: e,
    })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const candidate = await User.findOne({ email })

    if (candidate) {
      const areSame = await bcrypt.compare(password, candidate.password)

      if (areSame) {
        const refreshToken = jwt.sign(
          {
            email: candidate.email,
            password: candidate.password,
          },
          config.get('jwtSecret'),
          {
            expiresIn: '30d',
          },
        )
        return res.status(200).json({
          data: refreshToken,
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
    res.status(500).json({ data: e })
  }
})

router.get('/verify/:email/:verifyKey', async (req, res) => {
  try {
    const email = req.params.email
    const candidate = await UVUser.findOne({
      email,
    })
    if (candidate) {
      if (req.params.verifyKey == candidate.verifyKey) {
        const user = new User({
          username: candidate.username,
          email,
          password: candidate.password,
        })
        await UVUser.findByIdAndDelete(candidate._id)

        await user.save()
        res.send(`<h1>Your email is verified!</h1>`)
      } else {
        res.status(404).json({ data: 'Bad request' })
      }
    } else {
      res.send(`<h1>Token expired, retry the verification<h1>`)
    }
  } catch (e) {
    res.status(500).json({ data: e })
  }
})

router.post('/accessToken', async (req, res) => {
  try {
    const decodedRefreshToken = jwt.verify(
      req.body.refreshToken,
      config.get('jwtSecret'),
    )

    if (decodedRefreshToken) {
      const user = await User.findOne({
        email: decodedRefreshToken.email,
        password: decodedRefreshToken.password,
      })

      if (user) {
        const accessToken = jwt.sign(
          {
            userId: user._id,
            username: user.username,
          },
          config.get('jwtSecret'),
          {
            expiresIn: '2d',
          },
        )

        return res.status(200).json({
          data: accessToken,
        })
      } else {
        res.status(200).json({
          err: true,
          data: 'Wrong refresh token',
        })
      }
    } else {
      res.status(200).json({
        err: true,
        data: "Refresh token doesn't exist",
      })
    }
  } catch (e) {
    res.status(500).json({ data: e.message })
  }
})

module.exports = router
