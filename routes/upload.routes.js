const cloudinary = require('cloudinary').v2
const config = require('config')
const fileupload = require('express-fileupload')
const { Router } = require('express')

const router = Router()

const fileFilter = file => {
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg']
  if (allowedTypes.includes(file.mimetype)) return true
}

cloudinary.config({
  cloud_name: config.get('cloud_name'),
  api_key: config.get('cloud_api_key'),
  api_secret: config.get('cloud_api_secret'),
})

router.post('/singleImage', fileupload({ useTempFiles: true }), (req, res) => {
  const file = req.files.photo

  if (!fileFilter(file))
    return res.status(200).json({
      err: true,
      data: 'Invalid file format. Try again',
    })

  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    if (err) throw err
    res.status(201).json({ data: result.url })
  })
})

module.exports = router
