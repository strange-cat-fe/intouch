const { Router } = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

const router = Router()

const User = require('../models/User')

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
      res.status(200).json({
        data: 'User created',
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

    if (candidate) {
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

module.exports = router
