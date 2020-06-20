const { Router } = require('express')
const bcrypt = require('bcryptjs')

const router = Router()

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
