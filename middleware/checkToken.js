const config = require('config')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
  try {
    if (req.originalUrl.includes('/api/auth')) return next()

    const token = req.query.token
    if (token) {
      const decodedToken = jwt.verify(token, config.get('jwtSecret'))

      const user = await User.findById(decodedToken.userId)
      if (user) {
        res.user = user
        return next()
      }
    }
    res.status(404).json({ data: 'Bad request' })
  } catch (e) {
    res.status(500).json({ data: e })
  }
}
