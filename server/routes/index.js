module.exports = app => {
  //user部分
  require('./user/user')(app)
  const user = require('./user/user')
  app.use('/api', user)

  //上传部分
  const multer = require('multer')
  const upload = multer({dest: __dirname + '/../uploads'})

  app.post('/api/upload', upload.single('file'), async (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  //dynamic
  // require('./dynamic/dynamic')(app)
  const dynamic = require('./dynamic/dynamic')
  app.use('/api', dynamic)

}
