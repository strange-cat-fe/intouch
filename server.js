const mongoose = require('mongoose')
const config = require('config')
const bodyParser = require('body-parser')

const app = require('express')()
const jsonParser = bodyParser.json()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  )
  next()
})

app.use(jsonParser)

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/posts', require('./routes/posts.routes'))

async function start() {
  try {
    await mongoose.connect(config.get('dbUri'), {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(config.get('port'), () =>
      console.log(`Server is running on port ${config.get('port')}`),
    )
  } catch (e) {
    console.log(e.message)
  }
}

start()
