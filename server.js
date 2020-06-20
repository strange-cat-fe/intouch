const mongoose = require('mongoose')
const config = require('config')

const app = require('express')()

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
